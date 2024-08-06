import express from "express";
import { getAllUsers, loginUser } from "../controllers/userController.js";
import { notAllowed } from "../utils/shareFunc.js";

import { Joi, validateBody } from "express-joi-validations";

const router = express.Router();

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});



router.route('/').get(getAllUsers);
router.route('/login').post(validateBody(loginSchema), loginUser).all(notAllowed);


export default router;

