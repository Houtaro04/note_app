import express from 'express';
import http, { get } from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { resolvers } from './Resolver/index.js';
import { typeDefs } from './Schemas/index.js';
import './firebaseConfig.js';
import { getAuth } from 'firebase-admin/auth'

import 'dotenv/config'
const app = express();
const httpServer = http.createServer(app);

//connect to database
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@note-app.8i7eajr.mongodb.net/?retryWrites=true&w=majority&appName=note-app`
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start();

const authorizationJWT = async (req, res, next) => {
  if (req.path === '/favicon.ico') {
    return res.sendStatus(204); // No Content
  }
  const authorizationHeader = req.headers.authorization;
  console.log({authorization: req.headers.authorization});

  if(authorizationHeader) {
    const accessToken = authorizationHeader.split(' ')[1];
    getAuth()
      .verifyIdToken(accessToken)
      .then(decodedToken => {
        console.log({decodedToken});
        res.locals.uid = decodedToken.uid;
        next();
      })
      .catch(err => {
        console.log({err})
        return res.status(403).json({message: 'Forbidden', error: err});
      })
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

app.use(cors(), authorizationJWT, bodyParser.json(), expressMiddleware(server, {
  context: async({req, res}) => {
    return { uid: res.locals.uid }
  }
}));

mongoose.set('strictQuery', false);
mongoose.connect(URI).then(async () => {
  console.log('Connected to database')
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log('🚀 Server ready at http://localhost:4000/graphql');
});




