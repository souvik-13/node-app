import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import process from 'node:process';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { middleWare } from './middleware';


const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(express.static('public'))
  app.use(middleWare);

  app.listen(3000);
  console.log(`Worker ${process.pid} started`);
}
