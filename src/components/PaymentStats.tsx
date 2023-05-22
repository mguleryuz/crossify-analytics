'use client'

import {
  Box,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Stack,
} from '@chakra-ui/react'
import { Line, Bar, Pie } from 'react-chartjs-2'
import { PaymentStats } from '@/app/api/payments/getStats/route'
import { Chart, registerables } from 'chart.js'
import { compressAddress } from '@/lib/utils'

Chart.register(...registerables)

const PaymentStatsComponent = ({ stats }: { stats: PaymentStats }) => {
  console.log(stats)

  const paymentsOverTimeData = {
    labels: stats?.paymentsOverTime?.map((payment) => payment.date),
    datasets: [
      {
        data: stats?.paymentsOverTime?.map((payment) => payment.count),
        label: 'Weeks',
      },
    ],
  }

  const totalFiatPaymentAmountsData = {
    labels: stats?.totalFiatPaymentAmounts?.map((payment) => payment.currency),
    datasets: [
      {
        data: stats?.totalFiatPaymentAmounts?.map((payment) => payment.total),
        label: 'Fiat',
      },
    ],
  }

  const totalTokenPaymentAmountsData = {
    labels: stats?.totalTokenPaymentAmounts?.map(
      (token) => compressAddress(token.tokenAddress) + ' / ' + token.chainId
    ),
    datasets: [
      {
        data: stats?.totalTokenPaymentAmounts?.map((payment) => payment.total),
        label: 'Token / Chain',
      },
    ],
  }

  const topTokensData = {
    labels: stats?.topTokens?.map(
      (token) => compressAddress(token.tokenAddress) + ' / ' + token.chainId
    ),
    datasets: [
      {
        data: stats?.topTokens?.map((token) => token.count),
        label: 'Token / Chain',
      },
    ],
  }

  const paymentCountPerCreatorData = {
    labels: stats?.paymentCountPerCreator?.map((payment) =>
      compressAddress(payment.creatorAddress)
    ),
    datasets: [
      {
        data: stats?.paymentCountPerCreator?.map((payment) => payment.count),
        label: 'Count',
      },
    ],
  }

  if (
    !stats ||
    !stats?.statusBreakdown ||
    !stats?.typeBreakdown ||
    !stats?.paymentsOverTime
  )
    return null

  return (
    <Stack p={5} spacing={5}>
      <SimpleGrid columns={2} spacing={10}>
        <Stat>
          <StatLabel>Total Payments</StatLabel>
          <StatNumber>{stats.total}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Average Visit Count</StatLabel>
          <StatNumber>{stats.averageVisitCount}</StatNumber>
        </Stat>
      </SimpleGrid>
      <Box>
        <Text fontSize="xl" mb={2}>
          Status Breakdown
        </Text>
        <SimpleGrid columns={3} spacing={10}>
          {Object.entries(stats.statusBreakdown).map(([status, count]) => (
            <Stat key={status}>
              <StatLabel>{status}</StatLabel>
              <StatNumber>{count}</StatNumber>
            </Stat>
          ))}
        </SimpleGrid>
      </Box>
      <Box>
        <Text fontSize="xl" mb={2}>
          Type Breakdown
        </Text>
        <SimpleGrid columns={3} spacing={10}>
          {Object.entries(stats.typeBreakdown).map(([type, count]) => (
            <Stat key={type}>
              <StatLabel>{type}</StatLabel>
              <StatNumber>{count}</StatNumber>
            </Stat>
          ))}
        </SimpleGrid>
      </Box>
      <Box mt={5}>
        <Text fontSize="xl" mb={2}>
          Payments Over Weeks
        </Text>
        <Line data={paymentsOverTimeData} />
      </Box>
      <Box>
        <Text fontSize="xl" mb={2}>
          Total Fiat Payment Amounts
        </Text>
        <Bar data={totalFiatPaymentAmountsData} />
      </Box>
      <Box>
        <Text fontSize="xl" mb={2}>
          Total Token Payment Amounts
        </Text>
        <Bar data={totalTokenPaymentAmountsData} />
      </Box>
      <Box>
        <Text fontSize="xl" mb={2}>
          Top Tokens
        </Text>
        <Line data={topTokensData} />
      </Box>
      <Box>
        <Text fontSize="xl" mb={2}>
          Payment Count Per Creator
        </Text>
        <Pie data={paymentCountPerCreatorData} />
      </Box>
    </Stack>
  )
}

export default PaymentStatsComponent
