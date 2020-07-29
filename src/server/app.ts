
import path from 'path'
import express from 'express'
import createSocket from 'socket.io'

import * as api from './api'
import { Events, Player } from '../types'

const app = express()

export const http = require('http').createServer(app)
export const port = process.env.PORT || 2001

const io = createSocket(http)
const html = `${process.env.NODE_ENV}-index.html`

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', html))
})

app.get('/games/:gameId', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', html))
})

io.on('connection', socket => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })

  socket.on(Events.CreateGame, () => {
    const game = api.createGame()
    console.log(`A user created game ${game.gameId}`)
    socket.emit(Events.LoadGame, game)
  })

  socket.on(Events.JoinGame, ({ gameId }) => {
    const game = api.getGame(gameId)
    socket.join(gameId)
    console.log(`A user joined game ${gameId}`)
    io.to(gameId).emit(Events.LoadGame, game)
  })

  socket.on(Events.LeaveGame, ({ gameId }) => {
    socket.leave(gameId)
    console.log(`A user left game ${gameId}`)
  })

  socket.on(Events.AddPlayer, (playerName: Player["name"], gameId: string) => {
    const game = api.addPlayerToGame(playerName, gameId)
    console.log(`${playerName} was added to game ${gameId}`)
    io.to(gameId).emit(Events.LoadGame, game)
  })
})
