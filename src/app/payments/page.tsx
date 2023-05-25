import baseApiUrl from '@/lib/contants/baseApiUrl'
import { PaymentStats } from '../api/payments/getStats/route'
import PaymentStatsComponent from '@/components/PaymentStats'

async function getData() {
  const res = await fetch(
    `${baseApiUrl}/api/payments/getStats?dbName=crossifyDev`,
    { cache: 'no-store' }
  )
  if (!res.ok) console.error('Failed to fetch data')
  return res.json() as Promise<PaymentStats>
}

export default async function Page() {
  const data = await getData()
  return <PaymentStatsComponent stats={data} />
}
