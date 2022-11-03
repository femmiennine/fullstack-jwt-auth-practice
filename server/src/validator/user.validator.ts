import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const registerUserValidator = [
  check('name').notEmpty().withMessage('Name is missing'),
  check('email').normalizeEmail().isEmail().withMessage('Not a valid email'),
  check('password').notEmpty().withMessage('Password is missing'),
  check('phone').notEmpty().withMessage('Phone is missing'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
  //   (req: Request, res: Response, next: NextFunction) => {
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty()) {
  //       const validationErrors = {};
  //       const allErrors = errors.array();
  //       allErrors.forEach((error: any) => {
  //         //@ts-ignore
  //         validationErrors[error.param] = error.message;
  //       });

  //       return res.status(400).json({
  //         validationErrors,
  //       });
  //     }
  //     return next();
  //   },
];
