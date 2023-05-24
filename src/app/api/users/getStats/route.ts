import { connectDB } from '@/lib'
import { UserResponseDTO, UserStatus } from '@/types/data-contracts'
import { Collection } from 'mongoose'
import { NextResponse } from 'next/server'

export type UserStats = {
  totalUserCount: number
  userDistributionByStatus: {
    status: any
    count: any
  }[]
  userCountOverTime: {
    date: string
    count: any
  }[]
  userConversionRate: number
  userGrowthRate: number
  userRetentionRate: number
}

export async function GET(request: Request) {
  const currentDate = new Date()
  const previousPeriodEndDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 1
  )
  const previousPeriodStartDate = new Date(
    previousPeriodEndDate.getFullYear(),
    previousPeriodEndDate.getMonth(),
    previousPeriodEndDate.getDate() - 30
  )
  const startOfCurrentPeriod = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )
  const endOfCurrentPeriod = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  )
  const startOfPreviousPeriod = new Date(
    previousPeriodStartDate.getFullYear(),
    previousPeriodStartDate.getMonth(),
    1
  )
  const endOfPreviousPeriod = previousPeriodEndDate
  const { searchParams } = new URL(request.url),
    dbName = searchParams.get('dbName')
  if (!dbName)
    return NextResponse.json(
      { message: 'dbName could not be found!' },
      { status: 400 }
    )

  const db = await connectDB(dbName),
    User = db?.connection.collection('users') satisfies
      | Collection<UserResponseDTO>
      | undefined

  if (!User)
    return NextResponse.json(
      { message: 'User collection not found!' },
      { status: 400 }
    )

  const totalUserCount = await User.countDocuments()

  const userDistributionByStatus = await User.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]).toArray()

  const userCountOverTime = (
    await User.aggregate([
      {
        $group: {
          _id: {
            week: {
              $week: {
                date: {
                  $toDate: { $multiply: ['$date', 1000] },
                },
                timezone: 'America/New_York', // Specify your timezone here
              },
            },
            year: {
              $year: {
                date: {
                  $toDate: { $multiply: ['$date', 1000] },
                },
                timezone: 'America/New_York', // Specify your timezone here
              },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.week': 1,
        },
      },
    ]).toArray()
  )?.map((i) => ({
    date: `Week ${i._id.week}, ${i._id.year}`,
    count: i.count,
  }))

  const inactiveToActiveCount = await User.countDocuments({
    status: UserStatus.ACTIVE,
    $or: [{ status: UserStatus.INACTIVE }, { status: UserStatus.BLOCKED }],
  })

  const userConversionRate = (inactiveToActiveCount / totalUserCount) * 100

  const currentPeriodUserCount = await User.countDocuments({
    date: { $gte: startOfCurrentPeriod, $lt: endOfCurrentPeriod },
  })
  const previousPeriodUserCount = await User.countDocuments({
    date: { $gte: startOfPreviousPeriod, $lt: endOfPreviousPeriod },
  })

  const userGrowthRate =
    ((currentPeriodUserCount - previousPeriodUserCount) /
      previousPeriodUserCount) *
    100

  const currentPeriodActiveUsers = await User.countDocuments({
    status: UserStatus.ACTIVE,
    date: { $gte: startOfCurrentPeriod, $lt: endOfCurrentPeriod },
  })
  const previousPeriodActiveUsers = await User.countDocuments({
    status: UserStatus.ACTIVE,
    date: { $gte: startOfPreviousPeriod, $lt: endOfPreviousPeriod },
  })

  const userRetentionRate =
    (currentPeriodActiveUsers / previousPeriodActiveUsers) * 100

  const response = {
    totalUserCount,
    userDistributionByStatus: userDistributionByStatus.map((item) => ({
      status: item._id,
      count: item.count,
    })),
    userCountOverTime,
    userConversionRate,
    userGrowthRate,
    userRetentionRate,
  }

  return NextResponse.json(response, { status: 200 })
}
