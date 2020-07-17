import React from 'react'
import { Link, useParams, useRouteMatch } from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import shortid from 'shortid'

import type RouteParams from './RouteParams'

export default function Header () {
  const params: RouteParams = useParams()

  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h6'>
          Yahtzee
        </Typography>
        {params.gameId
          ? <Link to='/'>Home</Link>
          : <Link to={`/games/${shortid.generate()}`}>New game</Link>
        }
      </Toolbar>
    </AppBar>
  )
}
