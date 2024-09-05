import express from "express";
import { addProduct, addReview, getProductById, getProducts, removeProduct, updateProduct } from "../controllers/productController.js";
import { notAllowed } from "../utils/shareFunc.js";
import { updateFile, validFile } from "../middlewares/fileValid.js";
import { adminCheck, checkUser } from "../middlewares/userCheck.js";


const router = express.Router();


router.route('/').get(getProducts).post(validFile, addProduct).all(notAllowed);


router.route('/reviews/:id').post(checkUser, addReview).all(notAllowed);

router.route('/:id').get(getProductById).patch(checkUser, adminCheck, updateFile, updateProduct).delete(checkUser, adminCheck, removeProduct).all(notAllowed);


export default router;