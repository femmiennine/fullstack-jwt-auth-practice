import express from 'express';
import { registerUser, loginUser, userProfile } from '../controllers/user.controllers';
import { isAuthorized } from '../middlewares/auth';
import { registerUserValidator } from '../validator/user.validator';

const router = express.Router();

router.post('/register', registerUserValidator, registerUser);
router.post('/login', loginUser);
router.get('/profile', isAuthorized, userProfile);

export default router;
