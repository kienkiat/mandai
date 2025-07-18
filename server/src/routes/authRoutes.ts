import express from 'express';
import { signUp, login } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { signUpSchema, loginSchema } from '../validators/authValidators';

const router = express.Router();

router.post('/signup', validate(signUpSchema), signUp);
router.post('/login', validate(loginSchema), login);

export default router;
