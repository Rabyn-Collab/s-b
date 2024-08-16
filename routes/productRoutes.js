import express from "express";
import { addProduct, getProducts, removeProduct } from "../controllers/productController.js";
import { notAllowed } from "../utils/shareFunc.js";
import { validFile } from "../middlewares/fileValid.js";
import { adminCheck, checkUser } from "../middlewares/userCheck.js";


const router = express.Router();


router.route('/').get(getProducts).post(checkUser, adminCheck, validFile, addProduct).all(notAllowed);

router.route('/:id').delete(checkUser, adminCheck, removeProduct).all(notAllowed);


export default router;