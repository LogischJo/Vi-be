import express from 'express'
import logger from 'better-logging'
import {config} from 'dotenv'
import {join} from 'path'
import {createReadStream} from 'fs'
import ytdl from 'ytdl-core'
config()

const app = express()
const port = process.env.PORT || 5000

app.use(
  express.urlencoded({
    extended: true
  })
)

// Custom console
logger(console, {saveToFile: join(__dirname, '..', 'logs', `${Date.now()}.log`)}) // @ts-ignore
app.use(logger.expressMiddleware(console))

// Template engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views', join(__dirname, '..', 'views'))

app.get('/', (req, res) => {
  res.render('login')
})

app.post('/submit-login', (req, res) => {
  const login: {user: string; password: string} = req.body
})

app.get('/tracks/:track', (req, res) => {
  if (!req.params.track || parseInt(req.params.track) > 5 || parseInt(req.params.track) < 1) return res.send('<h1>Invalid track ID. Please select number between 1 and 5.</h1>')

  res.set('content-type', 'audio/mp3')
  res.set('accept-ranges', 'bytes')

  const stream = createReadStream(join(__dirname, '..', 'public', 'songs', `${req.params.track}.mp3`), {autoClose: false, highWaterMark: 1 << 25, emitClose: false})
  stream.on('data', (chunk) => res.write(chunk))

  stream.on('end', () => console.warn(`Finished song! Destroyed player. Played: ${req.params.track}.mp3`))
})

app.get('/test/:youtubeVideoID', async (req, res) => {
  if (!req.params.youtubeVideoID) return res.send('<h1>Please provide an youtube URL.</h1>')

  res.set('content-type', 'audio/mp3')
  res.set('accept-ranges', 'bytes')

  const video = await ytdl.getBasicInfo(`https://www.youtube.com/watch?v=${req.params.youtubeVideoID}`)
  if (!video) return res.send('<h1>Provided youtube video ID is invalid.</h1>')

  const stream = ytdl(video.videoDetails.video_url, {highWaterMark: 1 << 25, filter: 'audioonly'})
  stream.on('data', (chunk) => res.write(chunk))

  stream.on('close', () => console.warn(`Finished song! Destroyed player. Played from youtube: ${video.videoDetails.title}`))
})

app.listen(port, () => console.info(`Started new express server on port: ${port}`))
