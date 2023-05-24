import { connectDB } from '@/lib'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url),
    dbName = searchParams.get('dbName'),
    address = searchParams.get('address')
  if (!dbName || !address)
    return NextResponse.json(
      { message: 'dbName | address could not be found!' },
      { status: 400 }
    )

  const db = await connectDB(dbName),
    User = db?.connection.collection('users')

  const role = await User?.findOne({ address }, { projection: { role: 1 } })

  return NextResponse.json(role, { status: 200 })
}
