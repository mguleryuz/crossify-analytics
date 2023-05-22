'use client'

import { ReceiptStats } from '@/app/api/receipts/getStats/route'
import { compressAddress } from '@/lib/utils'
import {
  Box,
  Heading,
  Flex,
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
} from '@chakra-ui/react'
import { Chart, registerables } from 'chart.js'
import { Doughnut, Line } from 'react-chartjs-2'

Chart.register(...registerables)

const ReceiptStatsComponent = ({ stats }: { stats: ReceiptStats }) => {
  console.log(stats)

  const transactionsOverTimeData = {
    labels: stats.transactionsOverTime?.map((d) =>
      new Date(d.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Transactions Over Time',
        data: stats.transactionsOverTime?.map((d) => d.count),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  }

  const transactionStatusBreakdownData = {
    labels: Object.keys(stats.transactionStatusBreakdown || {}),
    datasets: [
      {
        data: Object.values(stats.transactionStatusBreakdown || {}),
        hoverOffset: 4,
      },
    ],
  }

  return (
    <Box p={5}>
      <Heading mb={5}>Receipt Stats</Heading>

      <Stack>
        <Flex gap={2}>
          <Stat p={5} border="1px" borderColor="gray.200" borderRadius="md">
            <StatLabel>Total Transactions</StatLabel>
            <StatNumber>{stats.totalTransactions}</StatNumber>
          </Stat>
          <Stat p={5} border="1px" borderColor="gray.200" borderRadius="md">
            <StatLabel>Total Value Transacted (USD)</StatLabel>
            <StatNumber>{stats.totalValueTransactedUSD}</StatNumber>
          </Stat>
        </Flex>

        <Flex gap={2}>
          <Stat p={5} border="1px" borderColor="gray.200" borderRadius="md">
            <StatLabel>Total Platform Fees (USD)</StatLabel>
            <StatNumber>{stats.totalPlatformFeesUSD}</StatNumber>
          </Stat>
          <Stat p={5} border="1px" borderColor="gray.200" borderRadius="md">
            <StatLabel>Average Transaction Value (USD)</StatLabel>
            <StatNumber>{stats.averageTransactionValueUSD}</StatNumber>
          </Stat>
        </Flex>

        <Flex>
          <Stat p={5} border="1px" borderColor="gray.200" borderRadius="md">
            <StatLabel>Total Gas Fees (USD)</StatLabel>
            <StatNumber>{stats.totalGasFeesUSD}</StatNumber>
          </Stat>
        </Flex>
      </Stack>

      <Heading size="md" my={5}>
        Transaction Status Breakdown
      </Heading>
      <Doughnut data={transactionStatusBreakdownData} />

      <Heading size="md" my={5}>
        Transactions Over Time
      </Heading>
      <Line data={transactionsOverTimeData} />

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
          {stats.topTokensTransacted?.map((t, index) => (
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
          {stats.geographicDistribution?.map((g, index) => (
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
          {stats.transactionsByChainId?.map((c, index) => (
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
          {stats.receiptPaymentRatio?.map((r, index) => (
            <Tr key={index}>
              <Td>{r.paymentId}</Td>
              <Td>{r.ratio}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default ReceiptStatsComponent
