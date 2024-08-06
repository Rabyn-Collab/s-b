
export const notAllowed = (req, res) => {
  return res.status(405).json({ message: 'http method not allowed' });
}

