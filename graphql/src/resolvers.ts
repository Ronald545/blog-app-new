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
    },
    deletePost: async (_: any, { input } : { input: String }) => {
      await Post.deleteOne({ _id : input })
      return `Post ${input} deleted`
    },
    editPost: async (_: any, { input } : { input: IPost }) => {
      let err: any, post: any = await Post.findOne({ _id: input._id })
      if (err) throw err
      post.title = input.title
      post.body = input.body
      await post.save()
      return post 
    }
  }
}
