import express from "express";
import { getProducts } from "../controllers/productController.js";


const router = express.Router();


router.route('/api/products').get(getProducts);


export default router;