import {connect, mongo} from 'mongoose'
import logger from './logger'

// MongoDB
const init = async () => {
  try {
    const connection = await connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    logger.info('Successfully connected with Mongo database!')
    return connection
  } catch (e) {
    logger.error(`Failed to connect with Mongo database, reason: ${e}`)
    process.exit(1)
  }
}

const nextID = () => new mongo.ObjectId()

export {init, nextID}
