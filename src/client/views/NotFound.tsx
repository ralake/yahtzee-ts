import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from '@material-ui/core'

import PageWrapper from '../components/PageWrapper'
import Header from '../components/Header'

export default function NotFound () {
  const [homeClicked, setHomeClicked] = useState(false)

  function handleHomeClick () {
    setHomeClicked(true)
  }

  if (homeClicked) return <Redirect to='/' />

  return (
    <PageWrapper>
      <Header />
      Page not found

      <Button
        variant='outlined'
        onClick={handleHomeClick}
      >
        Home
      </Button>
    </PageWrapper>
  )
}
