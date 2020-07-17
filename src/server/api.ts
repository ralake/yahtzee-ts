import express from 'express'
import shortid from 'shortid'

export function createGame (req: express.Request, res: express.Response<any>) {
  res.json({ gameId: shortid.generate() })
}
