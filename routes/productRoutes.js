import express from "express";
import { getProducts } from "../controllers/productController.js";
import { notAllowed } from "../utils/shareFunc.js";


const router = express.Router();


router.route('/api/products').get(getProducts).all(notAllowed);


export default router;