import mongoose, { Document } from 'mongoose';

export type UserDocument = Document & {
  name: string;
  email: string;
  password: string;
  image: string;
  isAdmin: number;
  isVerified: number;
  token: string;
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    trim: true,
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [8, 'Password should be greater than 8 characters'],
    select: false,
  },

  phone: {
    type: String,
    required: [true, 'Please enter your phone number'],
  },

  // image: {
  //   type: String,
  //   required: [true, 'Image is required'],
  // },

  // isAdmin: {
  //   type: Number,
  //   required: [true, 'isAdmin is required'],
  // },

  // isVerified: {
  //   type: Number,
  //   default: 0,
  // },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  // token: {
  //   type: String,
  //   default: '',
  // },
});

export default mongoose.model<UserDocument>('User', userSchema);
