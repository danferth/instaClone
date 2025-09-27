import React from 'react'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="bg-slate-950">
      <body className="bg-slate-950">
        <main>
          <div className="container mx-auto max-w-[48rem] bg-slate-950">{children}</div>
        </main>
      </body>
    </html>
  )
}
