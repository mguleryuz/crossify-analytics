import baseApiUrl from '@/lib/contants/baseApiUrl'
import { ReceiptStats } from '../api/receipts/getStats/route'
import ReceiptStatsComponent from '@/components/ReceiptStats'

async function getData() {
  const res = await fetch(
    `${baseApiUrl}/api/receipts/getStats?dbName=crossifyDev`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json() as Promise<ReceiptStats>
}

export default async function Page() {
  const data = await getData()
  return <ReceiptStatsComponent stats={data} />
}
