import express from 'express'
import logger from 'better-logging'
import {config} from 'dotenv'
import {join} from 'path'
config()

const app = express()
const port = process.env.PORT || 5000

// Custom console
logger(console, {saveToFile: join(__dirname, '..', 'logs', `${Date.now()}.log`)}) // @ts-ignore
app.use(logger.expressMiddleware(console))

// Template engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views', join(__dirname, '..', 'views'))

app.get('/', (req, res) => {
  res.render('index', {page: 'start'})
})

// app.get('/tracks/:track', (req, res) => {
//   if (!req.params.track) res.sendStatus(400).json('Please provide track number.')

//   res.set('content-type', 'audio/mp3')
//   res.set('accept-ranges', 'bytes')

//   const stream = createReadStream(join(__dirname, '..', 'public', 'songs', `${req.params.track}.mp3`), {autoClose: false, highWaterMark: 1 << 25, emitClose: false})
//   stream.on('data', (chunk) => res.write(chunk))
// })

app.listen(port, () => console.info(`Started new express server on port: ${port}`))
