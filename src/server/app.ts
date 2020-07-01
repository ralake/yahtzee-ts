import express from 'express'

const app = express()

app.set('port', process.env.PORT || 2001)
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index.html'))

export default app
