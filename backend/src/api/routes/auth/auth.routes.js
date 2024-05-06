import express from 'express';

import { loginUser, registerUser } from '../../controllers/auth/index.js';
import validateBody from '../../../middlewares/validateBody.js';
import { loginUserSchemaValidator, registerUserSchemaValidator } from '../../../validators/userSchema.validator.js';

const router = express.Router();

// for new user registration
router.route('/register').post(validateBody(registerUserSchemaValidator), registerUser);

//  for user login
router.route('/login').post(validateBody(loginUserSchemaValidator), loginUser)

export default router;