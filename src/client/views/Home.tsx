import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from '@material-ui/core'

import Header from '../components/Header'
import PageWrapper from '../components/PageWrapper'

import { Events, Game, NullableString } from '../../types'

type HomeProps = {
  socket: SocketIOClient.Socket
}

export default function Home (props: HomeProps) {
  const { socket } = props
  const [gameId, setGameId] = useState<NullableString>(null)

  useEffect(() => {
    socket.on(Events.LoadGame, (game: Game) => setGameId(game.gameId))
  }, [])

  function handleNewGameClick () {
    socket.emit(Events.CreateGame)
  }

  if (gameId) return <Redirect to={`/games/${gameId}`} />

  return (
    <PageWrapper>
      <Header />
      Home

      <Button
        variant='outlined'
        onClick={handleNewGameClick}
      >
        New game
      </Button>
    </PageWrapper>
  )
}
