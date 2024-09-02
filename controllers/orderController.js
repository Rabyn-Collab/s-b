import { Order } from "../models/Order.js"
import mongoose from "mongoose";



export const addOrder = async (req, res) => {
  const { totalAmount, products } = req.body;
  try {
    await Order.create({
      totalAmount,
      products,
      userId: req.userId
    });
    return res.status(200).json('added succesfully');
  } catch (err) {
    return res.status(400).json(`${err}`);
  }
}


export const getOrderByUser = async (req, res) => {

  try {
    if (req.isAdmin) {
      const orders = await Order.find({}).sort('-createdAt');
      return res.status(200).json(orders);
    } else {
      const orders = await Order.find({ userId: req.userId });
      return res.status(200).json(orders);
    }


  } catch (err) {
    return res.status(400).json(`${err}`);
  }
}


export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.isValidObjectId(id)) {
      const order = await Order.findById(id).populate('products.product').populate({
        path: 'userId',
        select: 'fullname email'
      });
      return res.status(200).json(order);
    } else {
      return res.status(400).json('please provide valid id');
    }

  } catch (err) {
    return res.status(400).json(`${err}`);
  }
}