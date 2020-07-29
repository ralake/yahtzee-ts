import React from 'react'

type PageWrapperProps = {
  children: React.ReactNode
}

export default function PageWrapper (props: PageWrapperProps) {
  const { children } = props

  return (
    <div style={{ marginTop: '75px' }}>
      {children}
    </div>
  )
}
