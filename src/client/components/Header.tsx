import React, { useState } from 'react'
import { Link, useParams, Redirect } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

import useRequest, { Method } from '../hooks/useRequest'
import type RouteParams from '../RouteParams'

export default function Header () {
  const params: RouteParams = useParams()
  const [gameId, setGameId] = useState(null)
  const createGameRequest = useRequest({
    url: '/api/games',
    method: Method.POST,
    lazy: true,
    onSuccess: (data) => setGameId(data.gameId)
  })

  if (gameId) {
    return <Redirect to={`/games/${gameId}`} />
  }

  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h6'>
          Yahtzee
        </Typography>
        {params.gameId
          ? <Link to='/'>Home</Link>
          : <Button
            disabled={createGameRequest.loading}
            variant='outlined'
            onClick={() => createGameRequest.makeRequest()}
          >
            New game
          </Button>
        }
      </Toolbar>
    </AppBar>
  )
}
