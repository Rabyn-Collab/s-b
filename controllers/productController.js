import { Product } from "../models/Product.js"
import fs from 'fs';
import mongoose from "mongoose";


export const getProducts = async (req, res) => {

  try {
    const product = await Product.find({});
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
}


export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    return res.status(200).json(product);
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
      price: Number(price),
      stock: Number(stock)
    });
    return res.status(200).json({ message: 'product added succesfully' });
  } catch (err) {
    fs.unlink(`.${req.imagePath}`, (err) => {
      // console.log(err);
    });
    return res.status(400).json({ message: `${err}` });
  }
}



export const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {

    if (mongoose.isValidObjectId(id)) {
      const isExist = await Product.findById(id);
      if (isExist) {
        const updateObj = {
          title: req.body.title || isExist.title,
          brand: req.body.brand || isExist.brand,
          category: req.body.category || isExist.category,
          description: req.body.description || isExist.description,
          stock: Number(req.body.stock) || isExist.stock,
          price: Number(req.body.price) || isExist.price,
        };
        if (req.imagePath) {
          await isExist.updateOne({
            ...updateObj,
            image: req.imagePath
          });
          fs.unlink(`.${isExist.image}`, (err) => {

          });
        } else {
          await isExist.updateOne(updateObj);
        }


        return res.status(200).json({ message: 'succesfully updated' });
      }

    }

    if (req.imagePath) fs.unlink(`.${req.imagePath}`, (err) => {

    });
    return res.status(400).json({ message: 'please provide valid id' });



  } catch (err) {
    if (req.imagePath) fs.unlink(`.${req.imagePath}`, (err) => {

    });
    return res.status(400).json({ message: `${err}` });
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

    return res.status(400).json({ error: `${err}` });
  }
} 