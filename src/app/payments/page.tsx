import { PaymentStats } from '../api/payments/getStats/route'
import PaymentStatsComponent from '@/components/PaymentStats'

async function getData() {
  const res = await fetch(
    'http://localhost:3000/api/payments/getStats?dbName=crossifyDev'
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json() as Promise<PaymentStats>
}

export default async function Page() {
  const data = await getData()
  return <PaymentStatsComponent stats={data} />
}
