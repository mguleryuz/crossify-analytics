import { currentUnixTime } from '@/lib/utils'
import { ChainsResponse } from '@lifi/types'
import { useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

async function handleLifiChains(
  skip: boolean,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>,
  setChains: React.Dispatch<
    React.SetStateAction<{
      data: ChainsResponse['chains']
      updatedAt: number
    }>
  >
) {
  if (skip) return

  try {
    setIsFetching(true)
    let url = `https://li.quest/v1/chains`
    const response = await fetch(url, {
      method: 'GET',
    })
    const lifiChains: ChainsResponse['chains'] = (await response.json())?.chains

    setChains({
      data: lifiChains,
      updatedAt: currentUnixTime(),
    })

    setIsFetching(false)
  } catch (error) {
    console.error('Error fetching Lifi tokens:', error)
    setIsFetching(false)
  }
}

export default function useLocalChains() {
  const [isFetching, setIsFetching] = useState(false)
  const [chains, setChains] = useLocalStorageState<{
    data: ChainsResponse['chains']
    updatedAt: number
  }>('chains', {
    defaultValue: {
      data: [],
      updatedAt: 0,
    },
  })
  const skip = currentUnixTime() - chains.updatedAt < 60 * 60 /* * 24 * 3 */ // 3 day Local Cache

  useEffect(() => {
    handleLifiChains(skip, setIsFetching, setChains)
  }, [setChains, skip])

  const getChains = () => chains.data
  const isLoading = isFetching

  return { getChains, isLoading }
}
