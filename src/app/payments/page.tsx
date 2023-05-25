import baseApiUrl from '@/lib/contants/baseApiUrl'
import { PaymentStats } from '../api/payments/getStats/route'
import PaymentStatsComponent from '@/components/PaymentStats'

async function getData() {
  const res = await fetch(
    `${baseApiUrl}/api/payments/getStats?dbName=crossifyDev`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json() as Promise<PaymentStats>
}

export default async function Page() {
  const data = await getData()
  if (!data) return <div>Failed to load data</div>
  return <PaymentStatsComponent stats={data} />
}
