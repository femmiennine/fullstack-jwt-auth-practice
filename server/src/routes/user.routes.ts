import express from 'express';
import { registerUser, loginUser, userProfile, logoutUser, forgotPassword } from '../controllers/user.controllers';
import { isAuthorized } from '../middlewares/auth';
import { registerUserValidator } from '../validator/user.validator';
import upload from '../middlewares/fileUpload';

const router = express.Router();

router.post('/register', upload.single('image'), registerUserValidator, registerUser);
router.post('/login', loginUser);
router.get('/profile', isAuthorized, userProfile);
// router.get('/refresh', getRefreshToken, isAuthorized, userProfile);
router.post('/logout', isAuthorized, logoutUser);
router.post('/forget-password', forgotPassword);

export default router;
