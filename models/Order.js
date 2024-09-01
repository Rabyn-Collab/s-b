import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  products: {
    type: [
      {
        qty: {
          type: Number,
          required: true
        },
        product: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
          required: true
        }
      }
    ],
    validate: v => Array.isArray(v) && v.length > 0,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);