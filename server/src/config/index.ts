import * as dotenv from 'dotenv';
dotenv.config();

const dev = {
  db: {
    url: process.env.MONGO_DB || '',
  },
  app: {
    port: process.env.SERVER_PORT || 4004,
    jwt: process.env.JWT_PRIVATE_KEY,
    auth_password: process.env.AUTH_PASSWORD,
    auth_email: process.env.AUTH_EMAIL,
    client_url: process.env.CLIENT_URL,
  },
};

export default dev;
