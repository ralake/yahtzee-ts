import React, { useState, useEffect } from 'react'
import { Link, useParams, Redirect } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, TextField } from '@material-ui/core'

import useSocket from '../hooks/useSocket'
import { Game, Events, NullableString, RouteParams } from '../../types'

export default function Header () {
  const params: RouteParams = useParams()
  const [playerName, setPlayerName] = useState('')
  const [gameId, setGameId] = useState<NullableString>(null)
  const socket = useSocket()

  useEffect(() => {
    socket.on(Events.LoadGame, (game: Game) => setGameId(game.gameId))
  }, [])

  function handleAddPlayerClick () {
    socket.emit(Events.AddPlayer, playerName, params.gameId)
    setPlayerName('')
  }

  function handlePlayerNameChange (e: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(e.target.value)
  }

  if (gameId) {
    return <Redirect to={`/games/${gameId}`} />
  }

  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h6'>
          Yahtzee
        </Typography>
        {!params.gameId && (
          <Button
            variant='outlined'
            onClick={() => {
              socket.emit(Events.CreateGame)
            }}
          >
            New game
          </Button>
        )}
        {params.gameId && (
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
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}
