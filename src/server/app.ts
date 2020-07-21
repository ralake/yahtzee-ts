
import path from 'path'
import express from 'express'
import Router from 'express-promise-router'
import createSocket from 'socket.io'

import * as api from './api'
import { Events, Player } from '../types'

const app = express()

export const http = require('http').createServer(app)
export const port = process.env.PORT || 2001

const io = createSocket(http)
const router = Router()

app.use(router)
app.use(express.static('public'))

app.get(['/', '/*'], (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'))
})

io.on('connection', socket => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })

  socket.on(Events.CreateGame, () => {
    const game = api.createGame()
    socket.emit(Events.LoadGame, game)
  })

  socket.on(Events.JoinGame, ({ gameId }) => {
    const game = api.getGame(gameId)
    socket.join(gameId)
    io.to(gameId).emit(Events.LoadGame, game)
  })

  socket.on(Events.LeaveGame, ({ gameId }) => {
    socket.leave(gameId)
  })

  socket.on(Events.AddPlayer, (playerName: Player["name"], gameId: string) => {
    const game = api.addPlayerToGame(playerName, gameId)
    io.to(gameId).emit(Events.LoadGame, game)
  })
})
