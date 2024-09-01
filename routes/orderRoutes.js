import express from "express";
import { notAllowed } from "../utils/shareFunc.js";
import { checkUser } from "../middlewares/userCheck.js";
import { addOrder, getOrderByUser } from "../controllers/orderController.js";


const router = express.Router();


router.route('/').post(checkUser, addOrder).all(notAllowed);
router.route('/users').get(checkUser, getOrderByUser).all(notAllowed);



export default router;