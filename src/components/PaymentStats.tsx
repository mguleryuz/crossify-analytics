'use client'

import {
  Box,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Stack,
  Heading,
} from '@chakra-ui/react'
import { Line, Bar, Pie } from 'react-chartjs-2'
import { PaymentStats } from '@/app/api/payments/getStats/route'
import { compressAddress } from '@/lib/utils'
import { useEffect, useState } from 'react'
import baseApiUrl from '@/lib/contants/baseApiUrl'

const statStyle = {
  p: 3,
  border: '1px',
  borderColor: 'gray.200',
  borderRadius: 'md',
}

async function getData() {
  const res = await fetch(
    `${baseApiUrl}/api/payments/getStats?dbName=crossifyDev`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json() as Promise<PaymentStats>
}

const PaymentStatsComponent = () => {
  const [stats, setStats] = useState<PaymentStats>()
  const paymentsOverTimeData = {
    labels: stats?.paymentsOverTime?.map((payment) => payment.date),
    datasets: [
      {
        data: stats?.paymentsOverTime?.map((payment) => payment.count),
        label: 'Payments',
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

  useEffect(() => {
    getData().then(setStats)
  }, [])

  return (
    <Stack p={5} spacing={3}>
      <Heading>Payment Stats</Heading>

      <SimpleGrid columns={2} spacing={3}>
        <Stat {...statStyle}>
          <StatLabel>Total Payments</StatLabel>
          <StatNumber>{stats?.total}</StatNumber>
        </Stat>
        <Stat {...statStyle}>
          <StatLabel>Average Visit Count</StatLabel>
          <StatNumber>{stats?.averageVisitCount}</StatNumber>
        </Stat>
      </SimpleGrid>
      <Box {...statStyle}>
        <Heading size="md" mb={3}>
          Status Breakdown
        </Heading>
        <SimpleGrid columns={3} spacing={10}>
          {!!stats?.statusBreakdown &&
            Object.entries(stats?.statusBreakdown).map(([status, count]) => (
              <Stat key={status}>
                <StatLabel>{status}</StatLabel>
                <StatNumber>{count}</StatNumber>
              </Stat>
            ))}
        </SimpleGrid>
      </Box>
      <Box {...statStyle}>
        <Heading size="md" mb={3}>
          Type Breakdown
        </Heading>
        <SimpleGrid columns={3} spacing={10}>
          {!!stats?.typeBreakdown &&
            Object.entries(stats?.typeBreakdown).map(([type, count]) => (
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
        <Heading size="md" mb={3}>
          Total Fiat Payment Amounts
        </Heading>
        <Bar data={totalFiatPaymentAmountsData} />
      </Box>
      <Box>
        <Heading size="md" mb={3}>
          Total Token Payment Amounts
        </Heading>
        <Bar data={totalTokenPaymentAmountsData} />
      </Box>
      <Box>
        <Heading size="md" mb={3}>
          Top Tokens
        </Heading>
        <Line data={topTokensData} />
      </Box>
      <Box>
        <Heading size="md" mb={3}>
          Payment Count Per Creator
        </Heading>
        <Pie data={paymentCountPerCreatorData} />
      </Box>
    </Stack>
  )
}

export default PaymentStatsComponent
