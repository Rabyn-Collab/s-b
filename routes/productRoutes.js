import express from "express";
import { addProduct, getProducts } from "../controllers/productController.js";
import { notAllowed } from "../utils/shareFunc.js";


const router = express.Router();


router.route('/').get(getProducts).post(addProduct).all(notAllowed);


export default router;