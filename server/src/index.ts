import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.routes';
import dev from './config/index';
import connectDB from './config/db';

const app = express();
const port = dev.app.port || 4008;

//middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

//routes
app.use('/api/users', userRouter);

//test route
app.get('/', (req, res) => {
  res.send('Welcome to the Server!');
});

//error handler middleware
app.use((req, res, next) => {
  res.status(404).send('Route not found!');
});
app.use((req, res, next) => {
  res.status(500).send('Something broke!');
});

//port and DB
app.listen(port, async () => {
  console.log(`Server is running at port http://localhost:${port}`);
  await connectDB();
});
