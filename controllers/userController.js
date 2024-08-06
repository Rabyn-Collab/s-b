

export const getAllUsers = (req, res) => {
  return res.status(200).json({});
}


export const loginUser = (req, res) => {
  console.log(req.body);
  return res.status(200).json({});
}