import { connectDB } from '@/lib'
import { ReceiptResponseDTO } from '@/types/data-contracts'
import { Collection } from 'mongoose'
import { NextResponse } from 'next/server'

export type ReceiptStats = {
  totalTransactions?: number
  transactionStatusBreakdown?: {
    failed: number
    success: number
    pending: number
  }
  totalValueTransactedUSD?: number
  totalPlatformFeesUSD?: number
  averageTransactionValueUSD?: number
  totalGasFeesUSD?: number
  topTokensTransacted?: {
    tokenAddress: string
    chainId: number
    count: number
  }[]
  transactionsOverTime?: { date: Date; count: number }[]
  geographicDistribution?: { country: string; count: number }[]
  transactionsByChainId?: { chainId: number; count: number }[]
  receiptPaymentRatio?: { paymentId: string; ratio: number }[]
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
    Receipt = db?.connection.collection('receipts') satisfies
      | Collection<ReceiptResponseDTO>
      | undefined

  const totalTransactions = await Receipt?.countDocuments()

  const transactionStatusBreakdown = (
    await Receipt?.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]).toArray()
  )?.reduce(
    (acc, i) => ({ ...acc, [i._id.toLowerCase()]: i.count }),
    {}
  ) as ReceiptStats['transactionStatusBreakdown']

  const totalValueTransactedUSD = await Receipt?.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$amountUSD' },
      },
    },
  ])
    .next()
    .then((res) => Number(res?.total?.toFixed(2)))

  const totalPlatformFeesUSD = await Receipt?.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: { $multiply: ['$amountUSD', '$percentagePlatformFee'] },
        },
      },
    },
  ])
    .next()
    .then((res) => Number(res?.total?.toFixed(2)))

  const averageTransactionValueUSD = await Receipt?.aggregate([
    {
      $group: {
        _id: null,
        average: { $avg: '$amountUSD' },
      },
    },
  ])
    .next()
    .then((res) => Number(res?.average?.toFixed(2)))

  const totalGasFeesUSD = await Receipt?.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$gasFeeUSD' },
      },
    },
  ])
    .next()
    .then((res) => res?.total)

  const topTokensTransacted = (
    await Receipt?.aggregate([
      {
        $group: {
          _id: { tokenAddress: '$fromTokenAddress', chainId: '$fromChainId' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          tokenAddress: '$_id.tokenAddress',
          chainId: '$_id.chainId',
          count: '$count',
        },
      },
      {
        $sort: { count: -1 },
      },
    ]).toArray()
  )?.map((i) => ({
    tokenAddress: i.tokenAddress,
    chainId: i.chainId,
    count: i.count,
  }))

  const transactionsOverTime = (
    await Receipt?.aggregate([
      {
        $group: {
          _id: { $toDate: { $multiply: ['$date', 1000] } },
          count: { $sum: 1 },
        },
      },
    ]).toArray()
  )?.map((i) => ({ date: i._id, count: i.count }))

  const geographicDistribution = (
    await Receipt?.aggregate([
      {
        $match: {
          'fields.country': { $exists: true },
        },
      },
      {
        $group: {
          _id: '$fields.country',
          count: { $sum: 1 },
        },
      },
    ]).toArray()
  )?.map((i) => ({ country: i._id, count: i.count }))

  const transactionsByChainId = (
    await Receipt?.aggregate([
      {
        $group: {
          _id: '$fromChainId',
          count: { $sum: 1 },
        },
      },
    ]).toArray()
  )?.map((i) => ({ chainId: i._id, count: i.count }))

  const receiptPaymentRatio = (
    await db?.connection
      .collection('payments')
      .aggregate([
        {
          $lookup: {
            from: 'receipts',
            localField: 'uid',
            foreignField: 'paymentId',
            as: 'receipt',
          },
        },
        { $unwind: '$receipt' },
        {
          $match: {
            'currency.fiat': { $exists: true },
            'receipt.amountReceiverFiat': { $exists: true },
          },
        },
        {
          $project: {
            _id: 0,
            paymentId: '$uid',
            ratio: {
              $divide: ['$receipt.amountReceiverFiat', '$currency.amount'],
            },
          },
        },
      ])
      .toArray()
  )?.map((i) => ({ paymentId: i.paymentId, ratio: i.ratio }))

  const response: ReceiptStats = {
    totalTransactions,
    transactionStatusBreakdown,
    totalValueTransactedUSD,
    totalPlatformFeesUSD,
    averageTransactionValueUSD,
    totalGasFeesUSD,
    topTokensTransacted,
    transactionsOverTime,
    geographicDistribution,
    transactionsByChainId,
    receiptPaymentRatio,
  }

  return NextResponse.json(response, { status: 200 })
}
