'use client'

import { LinkIcon } from '@chakra-ui/icons'
import { Button, Flex, IconButton, Image, Skeleton } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function ConnectButtonC() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading'
        const isAuthenticated =
          !authenticationStatus || authenticationStatus === 'authenticated'
        const connected = ready && account && chain && isAuthenticated

        return (
          <div>
            {(() => {
              if (!ready)
                return <Skeleton borderRadius={'xl'} w={'160px'} h={8} />

              if (!connected)
                return (
                  <Button onClick={openConnectModal}>Connect Wallet</Button>
                )

              if (chain.unsupported)
                return <Button onClick={openChainModal}>Wrong network</Button>

              return (
                <Flex gap={3}>
                  <Button onClick={openAccountModal}>
                    {!account.hasPendingTransactions
                      ? account.displayName
                      : 'Pending Tx...'}
                  </Button>
                  <IconButton
                    borderRadius={'full'}
                    aria-label={chain.name + 'icon'}
                    onClick={openChainModal}
                    icon={
                      <Image
                        borderRadius={'full'}
                        alt=""
                        src={chain?.iconUrl}
                        fallback={<LinkIcon />}
                        height={30}
                        width={30}
                      />
                    }
                  />
                </Flex>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
