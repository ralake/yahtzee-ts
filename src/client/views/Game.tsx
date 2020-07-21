import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../components/Header'
import PageWrapper from '../components/PageWrapper'
import useSocket from '../hooks/useSocket'

import { Game, Events, RouteParams, NullableGame } from '../../types'

export default function Game () {
  const params: RouteParams = useParams()
  const [game, setGame] = useState<NullableGame>(null)
  const socket = useSocket()
  const { gameId } = params

  useEffect(() => {
    socket.emit(Events.JoinGame, { gameId })
    socket.on(Events.LoadGame, setGame)

    return () => {
      socket.emit(Events.LeaveGame, { gameId })
    }
  }, [])

  return (
    <PageWrapper>
      <Header />
      {!!game && game.gameId}
      {!!game && game.players.map(p => <p>{p.name}</p>)}
    </PageWrapper>
  )
}
