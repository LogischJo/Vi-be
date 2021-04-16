import express from 'express'
import logger from 'better-logging'
import {config} from 'dotenv'
import {join} from 'path'
import {createReadStream} from 'fs'
import ytdl from 'ytdl-core'
import {connect} from 'mongoose'
import bcrypt from 'bcrypt'
import userDB from './models/user'
config()

const app = express()
const port = process.env.PORT || 5000
app.use(express.urlencoded({extended: true}))


// MongoDB
const connectWithDatabase = async () => {
  try {
    await connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    console.info('Successfully connected with Mongo database!')
  } catch (e) {
    console.error(`Failed to connect with Mongo database, reason: ${e}`)
    process.exit(1)
  }
}

connectWithDatabase()

// Custom console
logger(console, {saveToFile: join(__dirname, '..', 'logs', `${Date.now()}.log`)}) // @ts-ignore
app.use(logger.expressMiddleware(console))

// Template engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views', join(__dirname, '..', 'views'))

app.get('/', (req, res) => res.render('login'))

app.get('/register', (req, res) => res.render('register'))

app.post('/login', (req, res) => {
  const {user, pass}: {user: string; pass: string} = req.body
})

app.post('/register', async (req, res) => {
  const {user, pass, key}: {user: string; pass: string; key: string} = req.body

  if (key !== process.env.ADMIN_KEY) return res.render('register', {error: '✖ Provided key is invalid.'})

  const exist = await userDB.findOne({username: user}, {}, {lean: true})
  if (exist) return res.render('register', {error: '✖ This username is already used.'})

  try {
    const hashedPass = await bcrypt.hash(pass, 10)

    userDB.create({
      username: user,
      password: hashedPass,
      creationDate: Math.round(Date.now() / 1000 / 60)
    })

  } catch {}
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
