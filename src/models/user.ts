import {Schema, model, Document, Types} from 'mongoose'

interface UserSchema extends Document {
  id: string
  username: string
  password: string
  creationDate: number // Timestamp in minutes
}

const UserSchema: Schema = new Schema(
  {
    id: {type: Types.ObjectId, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    creationDate: {type: Number, required: true}
  },
  {versionKey: false}
)

export default model<UserSchema>('User', UserSchema)
