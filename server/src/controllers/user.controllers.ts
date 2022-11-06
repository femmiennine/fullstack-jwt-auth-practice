import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dev from '../config/index';
import { hashedPassword, comparePassword } from '../helper/password';
import User from '../models/user.schema';
import { ICustomRequest, IJWTToken } from '../middlewares/auth';
import { sendVerificationEmail } from '../util/sendVerficationEmail';

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

    const userData = await newUser.save();

    if (!userData) {
      return res.status(400).send({
        success: false,
        message: 'User unsucessfully registered',
      });
    }

    if (userData) {
      sendVerificationEmail(userData.email, userData.name, userData._id);
      res.status(201).send({
        message: 'Registration successful! Please verify your email address before login',
      });
    } else {
      res.status(404).send({ message: 'Route not found' });
    }
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
    //id can be named anything like access_key
    const token = jwt.sign({ id: user._id }, String(dev.app.jwt), { algorithm: 'HS256', expiresIn: '38s' });
    console.log(token);

    // pass the token inside the cookie parser
    res.cookie(String(user._id), token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 35),
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

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.cookie) {
      return res.status(404).send({
        message: 'No cookie found',
      });
    }

    const token = req.headers.cookie.split('=')[1];

    if (!token) {
      return res.status(404).send({
        message: 'No token found',
      });
    }
    //verify the token
    //TYPESCRIPT GUIDE https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1
    jwt.verify(token, String(dev.app.jwt), function (error, decoded) {
      if (error) {
        console.log(error);
      }
      console.log(decoded);
      // clear the cookie
      res.clearCookie(`${(decoded as IJWTToken).id}`);
    });

    res.status(200).send({
      message: 'User logged out',
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

// regenerate the token
// export const getRefreshToken = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (!req.headers.cookie) {
//       return res.status(404).send({
//         message: 'No cookie found',
//       });
//     }
//     // other option req.headers.cookie.access_token
//     const oldToken = req.headers.cookie.split('=')[1];

//     if (!oldToken) {
//       return res.status(404).send({
//         message: 'No token found',
//       });
//     }
//     //verify the token
//     //TYPESCRIPT GUIDE https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1
//     jwt.verify(oldToken, String(dev.app.jwt), function (error, decoded) {
//       if (error) {
//         console.log(error);
//         return res.status(403).send({
//           message: 'Authentication failed',
//         });
//       }
//       //resetting the cookies in the response and request
//       req.cookies[`${(decoded as IJWTToken).id}`] = '';
//       res.clearCookie(`${(decoded as IJWTToken).id}`);

//       // generate a new token
//       const newToken = jwt.sign({ user: {_id, name} }, String(dev.app.jwt), { algorithm: 'HS256', expiresIn: '35s' });
//       console.log(newToken);

//       console.log('refresh token', newToken);
//       // pass the new token to the cookie
//       res.cookie(String(_id), newToken, {
//         path: '/',
//         expires: new Date(Date.now() + 1000 * 32),
//         httpOnly: true,
//         sameSite: 'lax',
//       });
//       (req as ICustomRequest).id = (decoded as IJWTToken).id;
//       next();
//     });
//   } catch (error: any) {
//     return res.status(500).send({
//       message: error.message,
//     });
//   }
// };
