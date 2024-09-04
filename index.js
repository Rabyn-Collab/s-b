import express from "express";
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/mongoose'
import { Product } from "./models/Product.js";
import { User } from "./models/User.js";
import { Order } from "./models/Order.js";

const port = 5000;
// AdminJS.registerAdapter({
//   Database,
//   Resource
// });
const app = express();


mongoose.connect('mongodb+srv://rabyn900:moles900@cluster0.ikwdezp.mongodb.net/ShopUs').then((val) => {
  app.listen(port, (e) => {
    console.log('connected');
  });

}).catch((err) => {
  console.log(err);
});


app.use(express.json());
app.use(cors({ origin: '*', }));
app.use('/uploads', express.static('uploads'))
app.use(morgan('dev'));

app.use(fileUpload({
  limits: { fileSize: 1 * 1024 * 1024 },
  abortOnLimit: true
}));


// const admin = new AdminJS({
//   resources: [
//     {
//       resource: Product,
//       options: {
//         properties: {
//           createdAt: { isVisible: false },
//           updatedAt: { isVisible: false },
//         }
//       }
//     },
//     {
//       resource: User,
//       options: {
//         properties: {
//           createdAt: { isVisible: false },
//           updatedAt: { isVisible: false },
//         }
//       }
//     },
//     {
//       resource: Order,
//       options: {
//         properties: {
//           createdAt: { isVisible: false },
//           updatedAt: { isVisible: false },
//         }
//       }
//     }
//   ]
// })

// const adminRouter = AdminJSExpress.buildRouter(admin)

// app.use(admin.options.rootPath, adminRouter);


app.get('/', (req, res) => {
  return res.status(200).json({ message: 'welcome to shopus' });
});


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);


