import path from 'path';

const supportedExts = ['.jpg', '.png', '.jpeg', '.webp'];

export const validFile = (req, res, next) => {
  const imageFile = req.files?.image;
  //file check
  if (!imageFile) return res.status(400).json({ message: 'please provide image file' });
  const extType = path.extname(imageFile.name);

  //file extension check
  if (supportedExts.includes(extType)) {
    //image move func
    imageFile.mv(`./uploads/${imageFile.name}`, (err) => {
      if (err) return res.status(400).json({ message: err });
      req.imagePath = `/uploads/${imageFile.name}`;
      next();
    });

  } else {
    return res.status(400).json({ message: 'please provide valid image' });
  }

}



export const updateFile = (req, res, next) => {
  const imageFile = req.files?.image;

  //file check
  if (!imageFile) return next();

  const extType = path.extname(imageFile.name);

  //file extension check
  if (supportedExts.includes(extType)) {
    //image move func
    imageFile.mv(`./uploads/${imageFile.name}`, (err) => {
      if (err) return res.status(400).json({ message: err });
      req.imagePath = `/uploads/${imageFile.name}`;
      next();
    });

  } else {
    return res.status(400).json({ message: 'please provide valid image' });
  }

}