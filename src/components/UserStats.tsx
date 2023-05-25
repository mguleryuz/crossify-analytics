'use client'

import {
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  Stack,
  Heading,
  Wrap,
  HStack,
} from '@chakra-ui/react'
import { Line } from 'react-chartjs-2'
import { UserStats } from '@/app/api/users/getStats/route'
import { useEffect, useState } from 'react'

const statStyle = {
  p: 3,
  border: '1px',
  borderColor: 'gray.200',
  borderRadius: 'md',
}

async function getData() {
  const res = await fetch(`/api/users/getStats?dbName=crossifyDev`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json() as Promise<UserStats>
}

const UserStatsComponent = () => {
  const [stats, setStats] = useState<UserStats>()
  const userCountOverTime = {
    labels: stats?.userCountOverTime?.map((user) => user.date),
    datasets: [
      {
        data: stats?.userCountOverTime?.map((user) => user.count),
        label: 'Weeks',
      },
    ],
  }

  useEffect(() => {
    getData().then(setStats)
  }, [])

  return (
    <Stack p={5} spacing={3}>
      <Heading>User Stats</Heading>

      <Wrap gap={3}>
        <Stat {...statStyle}>
          <StatLabel>Total Users</StatLabel>
          <StatNumber>{stats?.totalUserCount}</StatNumber>
        </Stat>
        <Box {...statStyle} width={['full', 'initial']}>
          <Heading size="md" mb={3}>
            User Status Breakdown
          </Heading>
          <HStack spacing={3}>
            {stats?.userDistributionByStatus.map((i) => (
              <Stat key={i.status}>
                <StatLabel>{i.status}</StatLabel>
                <StatNumber>{i.count}</StatNumber>
              </Stat>
            ))}
          </HStack>
        </Box>
      </Wrap>

      <Box mt={5}>
        <Text fontSize="xl" mb={2}>
          User Count Over Weeks
        </Text>
        <Line data={userCountOverTime} />
      </Box>
    </Stack>
  )
}

export default UserStatsComponent
