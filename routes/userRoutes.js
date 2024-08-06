import express from "express";
import { getAllUsers, loginUser } from "../controllers/orderController.js";


const router = express.Router();



router.route('/').get(getAllUsers);
router.route('/login').post(loginUser);


export default router;

