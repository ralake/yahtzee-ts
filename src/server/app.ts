
import path from 'path'
import express from 'express'

const app = express()

app.set('port', process.env.PORT || 2001)
app.use(express.static('public'))

app.get(['/', '/*'], (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'))
})

export default app
