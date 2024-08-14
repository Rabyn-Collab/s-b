import { Product } from "../models/Product.js"






export const getProducts = async (req, res) => {

  try {
    const products = await Product.find({});
    return res.status(200).json({
      products,
    });
  } catch (er) {
    return res.status(400).json({ error: `${err}` });
  }
}



export const addProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.files?.image);
  try {
    return res.status(200).json({});
  } catch (er) {
    return res.status(400).json({ error: `${err}` });
  }
} 