import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRouter from './routes/user.routes';

const app = express();
const port = 3001;

app.use(cors());
app.use(morgan('dev'));

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

app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});
