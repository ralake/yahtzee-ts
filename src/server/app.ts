
import path from 'path'
import express from 'express'
import Router from 'express-promise-router'

import * as handlers from './handlers'

const app = express()
const router = Router()

app.set('port', process.env.PORT || 2001)
app.use(router)
app.use(express.static('public'))

router.post('/api/games', handlers.createGame)
router.get('/api/games/:gameId', handlers.getGame)

app.get(['/', '/*'], (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'))
})

export default app
