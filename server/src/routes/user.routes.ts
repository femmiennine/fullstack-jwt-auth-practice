import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controllers';
import { registerUserValidator } from '../validator/user.validator';

const router = express.Router();

router.post('/register', registerUserValidator, registerUser);
router.post('/login', loginUser);

export default router;
