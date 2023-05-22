import { connectDB } from '@/lib'
import { UserResponseDTO, UserStatus } from '@/types/data-contracts'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url),
    dbName = searchParams.get('dbName')
  if (!dbName)
    return NextResponse.json(
      { message: 'dbName could not be found!' },
      { status: 400 }
    )

  const db = await connectDB(dbName),
    result = (await db?.connection.collection('users').find({}).toArray()) as
      | UserResponseDTO[]
      | []

  return NextResponse.json(
    {
      total: result?.length,
      active: result?.filter((user) => user.status === UserStatus.ACTIVE)
        .length,
      inactive: result?.filter((user) => user.status === UserStatus.INACTIVE)
        .length,
      data: result,
    },
    { status: 200 }
  )
}
