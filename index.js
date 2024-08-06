import express from "express";
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { expressJoiValidations } from "express-joi-validations";

const port = 5000;

const app = express();
app.use(express.json());
app.use(expressJoiValidations({}));



app.get('/', (req, res) => {
  return res.status(200).json({ data: 'hello jee' });
});


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);



app.listen(port, (e) => {
  console.log('connected');
});
