import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, gql } from 'apollo-server-core'
import express from 'express'
import http from 'http'

// graphql type definition
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  input BookInput {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(input: BookInput!): [Book]
  }
`

// mock data
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

interface Book {
  title: string;
  author: string;
}

// functions that return data
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook: (_ : any, {input}: {input : Book}) => {
      books.push(input)
      return books
    }
  }
}

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()
  server.applyMiddleware({
    app,
    path: '/'
  })

  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)
