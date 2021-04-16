import express from 'express'
import cookieParser from 'cookie-parser'
import {config} from 'dotenv'
import {join} from 'path'
import bcrypt from 'bcrypt'
import userDB from './models/user'
import logger from './logger'
import * as db from './db'
import Auth from './auth'
config()

// Initialize
const app = express()
const port = process.env.PORT || 5000
const auth = new Auth()
db.init()

// Middlewares
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

// Template engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views', join(__dirname, '..', 'views'))


// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️


app.get('/', (req, res) => res.render('login'))

app.get('/register', (req, res) => res.render('register'))

app.post('/', async (req, res) => {
  const {user, pass}: {user: string; pass: string} = req.body

  const member = await userDB.findOne({username: user}, {}, {lean: true})
  if (!member) return res.render('login', {extra: '✖ Invalid username or password.'})

  if (bcrypt.compareSync(pass, member.password)) return res.send('<h1>Success</h1>')
  else return res.render('login', {extra: '✖ Invalid username or password.'})
})

app.post('/register', async (req, res) => {
  const {user, pass, key}: {user: string; pass: string; key: string} = req.body

  if (key !== process.env.ADMIN_KEY) return res.render('register', {extra: '✖ Provided key is invalid.'})

  const exist = await userDB.findOne({username: user}, {}, {lean: true})
  if (exist) return res.render('register', {extra: '✖ This username is already used.'})

  try {
    const member = await userDB.create({
      username: user,
      password: await bcrypt.hash(pass, 10)
    })

    const refreshToken = auth.createAccess(member._id)

    return res.cookie('token', refreshToken, {secure: true, }).render('login', {extra: '✓ Successfully created. Log in.'})
  } catch (err) {
    logger.error(err)
    return res.render('register', {extra: '✖ Something went wrong. Try again.'})
  }
})

// app.get('/tracks/:track', (req, res) => {
//   if (!req.params.track || parseInt(req.params.track) > 5 || parseInt(req.params.track) < 1) return res.send('<h1>Invalid track ID. Please select number between 1 and 5.</h1>')

//   res.set('content-type', 'audio/mp3')
//   res.set('accept-ranges', 'bytes')

//   const stream = createReadStream(join(__dirname, '..', 'public', 'songs', `${req.params.track}.mp3`), {autoClose: false, highWaterMark: 1 << 25, emitClose: false})
//   stream.on('data', (chunk) => res.write(chunk))

//   stream.on('end', () => console.warn(`Finished song! Destroyed player. Played: ${req.params.track}.mp3`))
// })

// app.get('/test/:youtubeVideoID', async (req, res) => {
//   if (!req.params.youtubeVideoID) return res.send('<h1>Please provide an youtube URL.</h1>')

//   res.set('content-type', 'audio/mp3')
//   res.set('accept-ranges', 'bytes')

//   const video = await ytdl.getBasicInfo(`https://www.youtube.com/watch?v=${req.params.youtubeVideoID}`)
//   if (!video) return res.send('<h1>Provided youtube video ID is invalid.</h1>')

//   const stream = ytdl(video.videoDetails.video_url, {highWaterMark: 1 << 25, filter: 'audioonly'})
//   stream.on('data', (chunk) => res.write(chunk))

//   stream.on('close', () => console.warn(`Finished song! Destroyed player. Played from youtube: ${video.videoDetails.title}`))
// })

app.listen(port, () => logger.info(`Started new server on port: ${port}`))
