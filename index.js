import express from "express";
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";

const port = 5000;

const app = express();


mongoose.connect('mongodb+srv://rabyn900:moles900@cluster0.ikwdezp.mongodb.net/ShopUs').then((val) => {
  app.listen(port, (e) => {
    console.log('connected');
  });

}).catch((err) => {
  console.log(err);
});


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use(morgan('dev'));

app.use(fileUpload({
  limits: { fileSize: 1 * 1024 * 1024 },
  abortOnLimit: true
}));



app.get('/', (req, res) => {
  return res.status(200).json({ data: 'hello jee' });
});


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);


