import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from './Home'
import Game from './Game'

export default function Yahtzee () {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/games/:gameId'>
          <Game />
        </Route>
      </Switch>
    </Router>
  )
}
