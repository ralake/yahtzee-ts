
import path from 'path'
import express from 'express'

import * as api from './api'

const app = express()

app.set('port', process.env.PORT || 2001)
app.use(express.static('public'))

app.post('/api/games', api.createGame)

app.get(['/', '/*'], (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'))
})

export default app
