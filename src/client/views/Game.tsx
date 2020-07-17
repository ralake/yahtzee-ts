import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../components/Header'
import PageWrapper from '../components/PageWrapper'

import type RouteParams from '../RouteParams'

export default function Game () {
  const params: RouteParams = useParams()

  return (
    <PageWrapper>
      <Header />
      Game: {params.gameId}
    </PageWrapper>
  )
}
