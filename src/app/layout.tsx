import React from 'react'
import { Providers } from './providers'
import '@rainbow-me/rainbowkit/styles.css'
import ClientLayout from '@/components/ClientLayout'

export const metadata = {
  title: 'Analytics | Crossify',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  )
}
