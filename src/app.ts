import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import { htmlcontent } from './app/types/htmlcontent';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const app: Application = express();
const server = createServer(app);
const io = new Server(server);

// parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/v1/', router);

//Not Found

app.get('/', (req: Request, res: Response) => {
  res.send(htmlcontent);
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.use(globalErrorHandler);

app.use(notFound);
export default app;
