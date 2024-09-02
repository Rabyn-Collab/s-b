import { Product } from "../models/Product.js"
import fs from 'fs';
import mongoose from "mongoose";


export const getProducts = async (req, res) => {

  try {
    const excludeObj = ['sort', 'page', 'search', 'fields', 'limit'];

    const queryObj = { ...req.query };

    excludeObj.forEach((q) => {
      delete queryObj[q]
    });

    if (req.query.search) {
      queryObj.title = { $regex: req.query.search, $options: 'i' }
    }

    let qStr = JSON.stringify(queryObj);
    qStr = qStr.replace(/\b(gte|gt|lte|lt|eq)\b/g, match => `$${match}`);

    let query = Product.find(JSON.parse(qStr));


    if (req.query.sort) {
      const sorting = req.query.sort.split(',').join('').trim().split(/[\s,\t,\n]+/).join(' ');
      query.sort(sorting);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join('').trim().split(/[\s,\t,\n]+/).join(' ');
      query.select(fields);
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const skip = (page - 1) * limit;


    const products = await query.skip(skip).limit(limit);

    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
}


export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).select('-createdAt -updatedAt -__v');
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



export const addReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    if (mongoose.isValidObjectId(id)) {
      const isExist = await Product.findById(id);
      if (isExist) {
        const review = {
          user: req.userId,
          name: req.user.fullname,
          rating: Number(rating),
          comment
        }
        isExist.reviews.push(review);
        await isExist.save();
        return res.status(200).json({ message: 'review added successfully' });
      }
    }
    return res.status(400).json({ message: 'please provide valid id' });
  } catch (err) {
    return res.status(400).json({ error: `${err}` });
  }
} 