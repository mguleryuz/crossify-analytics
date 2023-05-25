import UserStatsComponent from '@/components/UserStats'
import { UserStats } from './api/users/getStats/route'
import baseApiUrl from '@/lib/contants/baseApiUrl'

async function getData() {
  const res = await fetch(
    `${baseApiUrl}/api/users/getStats?dbName=crossifyDev`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json() as Promise<UserStats>
}

export default async function Page() {
  const data = await getData()
  return <UserStatsComponent stats={data} />
}
