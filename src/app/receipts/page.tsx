import { ReceiptStats } from '../api/receipts/getStats/route'
import ReceiptStatsComponent from '@/components/ReceiptStats'

async function getData() {
  const res = await fetch(
    'http://localhost:3000/api/receipts/getStats?dbName=crossifyDev'
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json() as Promise<ReceiptStats>
}

export default async function Page() {
  const data = await getData()
  return <ReceiptStatsComponent stats={data} />
}
