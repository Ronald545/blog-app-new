import { Document, Schema } from 'mongoose'

export interface IPost extends Document {
  _id: Schema.Types.ObjectId
  title: String,
  body: String,
  author: String,
  dateCreated: String
}
