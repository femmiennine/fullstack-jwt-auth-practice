import express from 'express';

const app = express();

const port = 3001;

app.get('/', (req, res) => {
  res.send('Welcome to the Server!');
});

app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});
