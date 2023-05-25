'use client'

import { ReceiptStats } from '@/app/api/receipts/getStats/route'
import { compressAddress } from '@/lib/utils'
import {
  Box,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Stack,
  SimpleGrid,
  GridItem,
  Divider,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

const statStyle = {
  p: 3,
  border: '1px',
  borderColor: 'gray.200',
  borderRadius: 'md',
}

async function getData() {
  const res = await fetch(`/api/receipts/getStats?dbName=crossifyDev`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json() as Promise<ReceiptStats>
}

const ReceiptStatsComponent = () => {
  const [stats, setStats] = useState<ReceiptStats>()
  const transactionsOverTimeData = {
    labels: stats?.transactionsOverTime?.map((transaction) => transaction.date),
    datasets: [
      {
        data: stats?.transactionsOverTime?.map(
          (transaction) => transaction.count
        ),
        label: 'Weeks',
      },
    ],
  }

  useEffect(() => {
    getData().then(setStats)
  }, [])

  return (
    <Stack p={5} spacing={5}>
      <Heading>Receipt Stats</Heading>

      <SimpleGrid columns={2} row={2} spacing={3}>
        {!!stats?.transactionStatusBreakdown && (
          <GridItem colSpan={2} {...statStyle}>
            <Heading size="md" mb={3}>
              Status Breakdown
            </Heading>
            <Divider mb={2} />
            {Object.entries(stats?.transactionStatusBreakdown).map(
              ([status, count]) => (
                <Stat key={status}>
                  <StatLabel>{status}</StatLabel>
                  <StatNumber>{count}</StatNumber>
                </Stat>
              )
            )}
          </GridItem>
        )}

        <Stat {...statStyle}>
          <StatLabel>Total Transactions</StatLabel>
          <StatNumber>{stats?.totalTransactions}</StatNumber>
        </Stat>
        <Stat {...statStyle}>
          <StatLabel>Total Value Transacted (USD)</StatLabel>
          <StatNumber>{stats?.totalValueTransactedUSD}</StatNumber>
        </Stat>
        <Stat {...statStyle}>
          <StatLabel>Total Platform Fees (USD)</StatLabel>
          <StatNumber>{stats?.totalPlatformFeesUSD}</StatNumber>
        </Stat>
        <Stat {...statStyle}>
          <StatLabel>Average Transaction Value (USD)</StatLabel>
          <StatNumber>{stats?.averageTransactionValueUSD}</StatNumber>
        </Stat>
        <GridItem colSpan={2}>
          <Stat {...statStyle}>
            <StatLabel>Total Gas Fees (USD)</StatLabel>
            <StatNumber>{stats?.totalGasFeesUSD}</StatNumber>
          </Stat>
        </GridItem>
      </SimpleGrid>

      <Box>
        <Heading size="md" mb={3}>
          Transactions Over Times
        </Heading>
        <Line data={transactionsOverTimeData} />
      </Box>

      <Heading size="md" my={5}>
        Top Tokens Transacted
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Token Address</Th>
            <Th>Chain ID</Th>
            <Th>Count</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stats?.topTokensTransacted?.map((t, index) => (
            <Tr key={index}>
              <Td>{compressAddress(t.tokenAddress)}</Td>
              <Td>{t.chainId}</Td>
              <Td>{t.count}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Heading size="md" my={5}>
        Geographic Distribution
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Country</Th>
            <Th>Count</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stats?.geographicDistribution?.map((g, index) => (
            <Tr key={index}>
              <Td>{g.country}</Td>
              <Td>{g.count}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Heading size="md" my={5}>
        Transactions By Chain ID
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Chain ID</Th>
            <Th>Count</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stats?.transactionsByChainId?.map((c, index) => (
            <Tr key={index}>
              <Td>{c.chainId}</Td>
              <Td>{c.count}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Heading size="md" my={5}>
        Receipt Payment Ratio
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Payment ID</Th>
            <Th>Ratio</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stats?.receiptPaymentRatio?.map((r, index) => (
            <Tr key={index}>
              <Td>{r.paymentId}</Td>
              <Td>{r.ratio}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  )
}

export default ReceiptStatsComponent
