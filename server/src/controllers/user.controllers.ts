import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dev from '../config/index';
import { hashedPassword, comparePassword } from '../helper/password';
import User from '../models/user.schema';
import { ICustomRequest } from '../middlewares/auth';

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

    return res.status(201).send({
      success: true,
      message: 'User successfully registered',
    });
  } catch (error: any) {
    return res.status(500).send({
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
        message: 'Invalid credentials',
      });
    }

    // generate JWT token and usual expiration should be 1 day
    const token = jwt.sign({ id: user._id }, String(dev.app.jwt), { algorithm: 'HS256', expiresIn: '40s' });
    console.log(token);

    // send the token inside the cookie parser
    res.cookie(String(user._id), token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 37),
      httpOnly: true,
      sameSite: 'lax',
    });

    return res.status(200).send({
      success: true,
      message: 'User successfully login',
      token,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export const userProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log(req.headers.cookie);
    const user = await User.findOne({ _id: (req as ICustomRequest).id }, { password: 0 });

    if (!user) {
      return res.status(404).send({
        message: 'No user exist with this id',
      });
    }

    res.status(200).json({
      message: 'User info returned successfully',
      user,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
