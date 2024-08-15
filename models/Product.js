import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    enum: ['samsung', 'apple', 'dolce'],
    required: true
  },
  category: {
    type: String,
    enum: ['clothes', 'tech'],
    required: true
  },
  stock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);