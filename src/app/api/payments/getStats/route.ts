import { connectDB } from '@/lib'
import { PaymentResponseDTO } from '@/types/data-contracts'
import { Collection } from 'mongoose'
import { NextResponse } from 'next/server'

export type PaymentStats = {
  total?: number
  statusBreakdown?: {
    awaiting: number
    open: number
    completed: number
    canceled: number
    deleted: number
  }
  typeBreakdown?: {
    pos: number
    product: number
    donation: number
  }
  topTokens?: { tokenAddress: string; chainId: number; count: number }[]
  totalFiatPaymentAmounts?: { currency: string; total: number }[]
  totalTokenPaymentAmounts?: {
    tokenAddress: string
    chainId: number
    total: number
  }[]
  geographicDistribution?: { country: string; count: number }[]
  paymentCountPerCreator?: { creatorAddress: string; count: number }[]
  paymentsOverTime?: { date: string; count: number }[]
  averageVisitCount?: number
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url),
    dbName = searchParams.get('dbName')
  if (!dbName)
    return NextResponse.json(
      { message: 'dbName could not be found!' },
      { status: 400 }
    )

  const db = await connectDB(dbName),
    Payment = db?.connection.collection('payments') satisfies
      | Collection<PaymentResponseDTO>
      | undefined

  // Total number of payments
  const total = await Payment?.countDocuments()

  // Breakdown by status
  const statusAgg = await Payment?.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]).toArray()

  let statusBreakdown = statusAgg?.reduce(
    (acc, curr) => ({ ...acc, [curr._id.toLowerCase()]: curr.count }),
    {}
  ) as PaymentStats['statusBreakdown']

  // Breakdown by type
  const typeAgg = await Payment?.aggregate([
    { $group: { _id: '$type', count: { $sum: 1 } } },
  ]).toArray()

  let typeBreakdown = typeAgg?.reduce(
    (acc, curr) => ({ ...acc, [curr._id.toLowerCase()]: curr.count }),
    {}
  ) as PaymentStats['typeBreakdown']

  // Top tokens used
  const topTokensAgg = await Payment?.aggregate([
    { $match: { tokenAddress: { $exists: true, $ne: null } } },
    {
      $group: {
        _id: { tokenAddress: '$tokenAddress', chainId: '$chainId' },
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]).toArray()

  let topTokens = topTokensAgg?.map((doc) => ({
    tokenAddress: doc._id.tokenAddress,
    chainId: doc._id.chainId,
    count: doc.count,
  }))

  // Total amount of payments for each type of fiat currency
  const totalFiatPaymentAmountsAgg = await Payment?.aggregate([
    {
      $match: {
        'currency.currencyType': 'FIAT',
        'currency.fiat': { $exists: true },
      },
    },
    { $group: { _id: '$currency.fiat', total: { $sum: '$currency.amount' } } },
  ]).toArray()

  let totalFiatPaymentAmounts = totalFiatPaymentAmountsAgg?.map((doc) => ({
    currency: doc._id,
    total: doc.total,
  }))

  // Total payment amounts for each token (tokenAddress and chainId)
  const totalTokenPaymentAmountsAgg = await Payment?.aggregate([
    {
      $match: {
        tokenAddress: { $exists: true, $ne: null },
        'currency.currencyType': 'TOKEN',
      },
    },
    {
      $group: {
        _id: { tokenAddress: '$tokenAddress', chainId: '$chainId' },
        total: { $sum: '$currency.amount' },
      },
    },
  ]).toArray()

  let totalTokenPaymentAmounts = totalTokenPaymentAmountsAgg?.map((doc) => ({
    tokenAddress: doc._id.tokenAddress,
    chainId: doc._id.chainId,
    total: doc.total,
  }))

  // Geographic distribution (assuming country field exists in shippingAddress)
  const geographicDistribution = (await Payment?.aggregate([
    { $group: { _id: '$fields.country', count: { $sum: 1 } } },
  ]).toArray()) as PaymentStats['geographicDistribution']

  // Payment count per creator
  const paymentCountPerCreator = (
    await Payment?.aggregate([
      { $group: { _id: '$creatorAddress', count: { $sum: 1 } } },
    ]).toArray()
  )?.map((i) => ({ creatorAddress: i._id, count: i.count }))

  // Payments over time
  const paymentsOverTime = (
    await Payment?.aggregate([
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

  // Average visit count
  const averageVisitCountAgg = await Payment?.aggregate([
    { $group: { _id: null, avgVisits: { $avg: '$visitCount' } } },
  ]).toArray()

  let averageVisitCount = averageVisitCountAgg?.[0]?.avgVisits

  const response: PaymentStats = {
    total,
    statusBreakdown,
    typeBreakdown,
    topTokens,
    totalFiatPaymentAmounts,
    totalTokenPaymentAmounts,
    geographicDistribution,
    paymentCountPerCreator,
    paymentsOverTime,
    averageVisitCount,
  }

  return NextResponse.json(response, { status: 200 })
}
