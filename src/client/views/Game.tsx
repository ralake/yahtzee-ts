import React, { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, TextField } from '@material-ui/core'

import Header from '../components/Header'
import PageWrapper from '../components/PageWrapper'

import { Game, Events, RouteParams, NullableGame } from '../../types'

type GameProps = {
  socket: any // figure this out
}

export default function Game (props: GameProps) {
  const { socket } = props
  const params: RouteParams = useParams()
  const [game, setGame] = useState<NullableGame>(null)
  const [gameNotExists, setGameNotExists] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const { gameId } = params

  useEffect(() => {
    socket.emit(Events.JoinGame, { gameId })
    socket.on(Events.LoadGame, (game: Game) => {
      !game ? setGameNotExists(true) : setGame(game)
    })

    return () => {
      socket.emit(Events.LeaveGame, { gameId })
    }
  }, [])

  function handleAddPlayerClick () {
    socket.emit(Events.AddPlayer, playerName, params.gameId)
    setPlayerName('')
  }

  function handlePlayerNameChange (e: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(e.target.value)
  }

  if (gameNotExists) return <Redirect to='/' />

  return (
    <PageWrapper>
      <Header />
      {!game && 'Loading...'}
      {!!game && (
        <div>
          <TextField
            value={playerName || ''}
            onChange={handlePlayerNameChange}
          />
          <Button
            disabled={!playerName}
            onClick={handleAddPlayerClick}
          >
            Add player
          </Button>
          {game.players.map(p => <p>{p.name}</p>)}
        </div>
      )}
    </PageWrapper>
  )
}
