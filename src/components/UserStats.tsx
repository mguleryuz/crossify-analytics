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
import { Line } from 'react-chartjs-2'
import { UserStats } from '@/app/api/users/getStats/route'

const statStyle = {
  p: 3,
  border: '1px',
  borderColor: 'gray.200',
  borderRadius: 'md',
}

const UserStatsComponent = ({ stats }: { stats: UserStats }) => {
  console.log(stats)

  const userCountOverTime = {
    labels: stats?.userCountOverTime?.map((user) => user.date),
    datasets: [
      {
        data: stats?.userCountOverTime?.map((user) => user.count),
        label: 'Weeks',
      },
    ],
  }

  return (
    <Stack p={5} spacing={3}>
      <Heading>User Stats</Heading>

      <SimpleGrid columns={2} spacing={3}>
        <Stat {...statStyle}>
          <StatLabel>Total Users</StatLabel>
          <StatNumber>{stats?.totalUserCount}</StatNumber>
        </Stat>
      </SimpleGrid>
      <Box {...statStyle}>
        <Heading size="md" mb={3}>
          User Status Breakdown
        </Heading>
        <SimpleGrid
          columns={stats.userDistributionByStatus.length}
          spacing={10}
        >
          {stats.userDistributionByStatus.map((i) => (
            <Stat key={i.status}>
              <StatLabel>{i.status}</StatLabel>
              <StatNumber>{i.count}</StatNumber>
            </Stat>
          ))}
        </SimpleGrid>
      </Box>
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
