import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  scalar Date

  type Post {
    _id: String
    title: String
    body: String
    author: String
    dateCreated: Date
  }

  input PostInput {
    title: String
    body: String
    author: String
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    addPost(input: PostInput!): Post
  }
`
