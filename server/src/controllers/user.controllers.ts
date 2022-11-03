import { Request, Response, NextFunction } from 'express';
import { hashedPassword } from '../helper/password';
import User from '../models/user.schema';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
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

export default registerUser;
