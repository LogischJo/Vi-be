import {Schema, model, Document, Types} from 'mongoose'

interface UserSchema extends Document {
  _id: string
  username: string
  password: string
  creationDate: number // Timestamp in minutes
}

const UserSchema: Schema = new Schema(
  {
    username: {type: String, required: true},
    password: {type: String, required: true},
    creationDate: {type: Number, required: true, default: Math.round(Date.now() / 1000 / 60)},
    volume: {type: Number, required: true, default: 100}
  },
  {versionKey: false}
)

export default model<UserSchema>('User', UserSchema)
