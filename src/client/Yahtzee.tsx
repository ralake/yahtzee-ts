/* globals DOMAIN */
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import io from 'socket.io-client'

import Home from './views/Home'
import Game from './views/Game'
import NotFound from './views/NotFound'

declare global { const DOMAIN: string }
const socket = io(DOMAIN)

export default function Yahtzee () {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home socket={socket} />
        </Route>
        <Route path='/games/:gameId'>
          <Game socket={socket} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}
