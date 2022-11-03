import * as dotenv from 'dotenv';
dotenv.config();

const dev = {
  db: {
    url: process.env.MONGO_DB || '',
  },
  app: {
    port: process.env.SERVER_PORT || 4004,
  },
};

export default dev;
