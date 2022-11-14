import express from 'express';
import {
  registerUser,
  loginUser,
  userProfile,
  logoutUser,
  forgetPassword,
  resetPassword,
  getAllUsers,
  deleteUser,
  updateUser,
} from '../controllers/user.controllers';
import { isAuthorized } from '../middlewares/auth';
import { registerUserValidator } from '../validator/user.validator';
import upload from '../middlewares/fileUpload';

const router = express.Router();

router.get('/', getAllUsers);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);
router.post('/register', upload.single('image'), registerUserValidator, registerUser);
router.post('/login', loginUser);
router.get('/profile', isAuthorized, userProfile);
// router.get('/refresh', getRefreshToken, isAuthorized, userProfile);
router.post('/logout', isAuthorized, logoutUser);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);

export default router;
