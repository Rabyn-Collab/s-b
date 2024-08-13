import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAllUsers = (req, res) => {
  return res.status(200).json({});
}


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isExist = await User.findOne({ email });
    if (!isExist) return res.status(404).json({ message: 'user doesn\'t exist' });

    const pass = bcrypt.compareSync(password, isExist.password);
    if (!pass) return res.status(401).json({ message: 'invalid credential' });

    const token = jwt.sign({
      id: isExist._id,
      isAdmin: isExist.isAdmin
    }, 'secret');

    return res.status(200).json({
      token,
      email: isExist.email,
      fullname: isExist.fullname,
      isAdmin: isExist.isAdmin
    })
  } catch (err) {
    return res.status(400).json({ error: `${err}` });
  }


}


export const registerUser = async (req, res) => {
  const { email, password, fullname } = req.body;

  try {
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const hashPass = bcrypt.hashSync(password, 10);
    await User.create({
      email,
      password: hashPass,
      fullname
    });
    return res.status(201).json({ message: 'successfully registered' });
  } catch (err) {
    return res.status(400).json({ error: `${err}` });
  }


}