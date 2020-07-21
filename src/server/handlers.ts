import express from 'express'

import * as api from './api'

export async function createGame (req: express.Request, res: express.Response<any>) {
  const game = await api.createGame()
  res.json({ game })
}

export async function getGame (req: express.Request, res: express.Response<any>) {
  const game = await api.getGame(req.params.gameId)
  res.json({ game })
}
