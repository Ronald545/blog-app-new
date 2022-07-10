import mongoose from 'mongoose'
import type { IPost } from '../interfaces'

const blogPostSchema = new mongoose.Schema<IPost>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  dateCreated: { type: String, required: true }
})

export const Post = mongoose.model<IPost>('Post', blogPostSchema)
