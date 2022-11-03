import express from 'express';
import registerUser from '../controllers/user.controllers';
import { registerUserValidator } from '../validator/user.validator';

const router = express.Router();

router.post('/register', registerUserValidator, registerUser);

export default router;
