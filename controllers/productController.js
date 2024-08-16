import { Product } from "../models/Product.js"
import fs from 'fs';
import mongoose from "mongoose";


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
    await Product.create({
      title,
      brand,
      category,
      description,
      image: req.imagePath,
      price,
      stock
    });
    return res.status(200).json({ message: 'product added succesfully' });
  } catch (err) {
    fs.unlink(`.${req.imagePath}`, (err) => {
      // console.log(err);
    });
    return res.status(400).json({ error: `${err}` });
  }
}




export const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {

    if (mongoose.isValidObjectId(id)) {
      const isExist = await Product.findById(id);
      if (isExist) {
        await isExist.deleteOne();
        fs.unlink(`.${isExist.image}`, (err) => {

        });
        return res.status(200).json({ message: 'succesfully deleted' });
      }

    }


    return res.status(400).json({ message: 'please provide valid id' });

  } catch (err) {
    // fs.unlink(`.${req.imagePath}`, (err) => {
    //   // console.log(err);
    // });
    return res.status(400).json({ error: `${err}` });
  }
} 