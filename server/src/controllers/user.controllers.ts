import { Request, Response, NextFunction } from 'express';
import { hashedPassword, comparePassword } from '../helper/password';
import User from '../models/user.schema';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).send({
        success: false,
        message: 'Please provide a name, email, phone, and password',
      });
    }

    if (password.length < 8) {
      return res.status(400).send({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).send({
        success: false,
        message: 'User already exists',
      });
    }

    const hashPassword = await hashedPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      phone,
    });

    //NOTE: Add email verification in the main FS project

    const userData = await newUser.save();
    if (!userData) {
      return res.status(400).send({
        success: false,
        message: 'User unsucessfully registered',
      });
    }

    // NOTE: Here you can choose to not send password with the userData.

    res.status(201).send({
      success: true,
      message: 'User successfully registered',
      userData,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send({
        success: false,
        message: 'Please provide both email and password',
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'No user exist with this email and password',
      });
    }
    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) {
      return res.status(406).send({
        success: false,
        message: 'Invalid credentials. Email and Password is incorrect.',
      });
    }
    return res.status(200).send({
      success: true,
      message: 'User successfully logged in',
      user,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
