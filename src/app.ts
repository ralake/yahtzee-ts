import express from 'express'

const app = express()

app.set('port', process.env.PORT || 2001)
app.get('/', (req, res) => res.send('Hello world!'))

export default app
