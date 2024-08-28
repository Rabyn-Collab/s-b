import { getAllUsers, loginUser, registerUser, updateUser } from "../controllers/userController.js";
import express from "express";
import { notAllowed } from "../utils/shareFunc.js";
import Joi from 'joi';
import expressJoi from 'express-joi-validation';
import { checkUser } from "../middlewares/userCheck.js";

const validatior = expressJoi.createValidator({});

// const loginSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().pattern(/^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{6,16}$/).required().messages({
//     'string.pattern.base': `provide strong password that have number special character`,
//   })
// });

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(50).required(),
  fullname: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(50).required(),
});

const router = express.Router();


router.route('/').get(getAllUsers);

router.route('/login').post(validatior.body(loginSchema), loginUser).all(notAllowed);
router.route('/register').post(validatior.body(registerSchema), registerUser).all(notAllowed);
router.route('/:id').patch(checkUser, updateUser).all(notAllowed);


export default router;

