import express from 'express'
import logger from 'better-logging'
import {config} from 'dotenv'
import {join} from 'path'

logger(console, {saveToFile: `./logs/${Date.now()}.log`})
config()

const app = express()
const port = process.env.PORT || 5000

// Template engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views', join(__dirname, '..', 'views'))

// Navigation
app.get('/:song', (req, res) => {
  res.render('index', {song: req.params.song})
  console.log('Server got:', req.params.song)
})

app.listen(port, () => console.info(`Started new express server on port: ${port}`))
