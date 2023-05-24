import UserStatsComponent from '@/components/UserStats'
import { UserStats } from './api/users/getStats/route'

async function getData() {
  const res = await fetch(
    'http://localhost:3000/api/users/getStats?dbName=crossifyDev'
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json() as Promise<UserStats>
}

export default async function Page() {
  const data = await getData()
  return <UserStatsComponent stats={data} />
}
