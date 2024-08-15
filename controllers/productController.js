import { Product } from "../models/Product.js"
import fs from 'fs';


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
  const { title, brand, category,
    description, stock,
    price } = req.body;
  try {
    // await Product.create({
    //   title,
    //   brand,
    //   category,
    //   description,
    //   image: req.imagePath,
    //   price,
    //   stock
    // });
    return res.status(200).json({ message: 'product added succesfully' });
  } catch (err) {
    fs.unlink(`.${req.imagePath}`, (err) => {
      // console.log(err);
    });
    return res.status(400).json({ error: `${err}` });
  }
}




export const removeProduct = async (req, res) => {

  try {

    return res.status(200).json({});
  } catch (err) {
    // fs.unlink(`.${req.imagePath}`, (err) => {
    //   // console.log(err);
    // });
    return res.status(400).json({ error: `${err}` });
  }
} 