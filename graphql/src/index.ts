import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import http from 'http'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
dotenv.config()

async function startApolloServer (typeDefs: any, resolvers: any) {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  mongoose.connect(process.env.MONGODB!, async (err) => {
    if (err) throw err
    console.log('Mongodb Started')
    await server.start()
    server.applyMiddleware({
      app,
      path: '/'
    })

    await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve))
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  })
}

startApolloServer(typeDefs, resolvers)
