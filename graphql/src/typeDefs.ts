import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  scalar Date

  type Post {
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
