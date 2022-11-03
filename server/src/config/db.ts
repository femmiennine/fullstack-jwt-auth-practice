import mongooes from 'mongoose';
import dev from './index';

const connectDB = async () => {
  try {
    await mongooes.connect(dev.db.url);
    console.log('DB CONNECTED');
  } catch (error: any) {
    console.log('DB NOT CONNECTED' + error.message);
    process.exit(1);
  }
};

export default connectDB;
