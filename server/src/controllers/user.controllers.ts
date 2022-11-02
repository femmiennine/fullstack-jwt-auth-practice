import { Request, Response, NextFunction } from 'express';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('user is registered');
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export default registerUser;
