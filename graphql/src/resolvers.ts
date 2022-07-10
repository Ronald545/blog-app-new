import { Post } from './models/blog-model'
import { IPost } from './interfaces'

export const resolvers = {
  Query: {
    posts: async () => {
      const post : any = await Post.find({})
      return post
    }
  },
  Mutation: {
    addPost: async (_: any, { input } : {input: IPost}) => {
      input.dateCreated = Date.now().toString()
      const post : any = new Post(input)
      await post.save()
      return post
    }
  }
}
