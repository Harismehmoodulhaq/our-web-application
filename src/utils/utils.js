import jwt from 'jsonwebtoken';
const SECRET = 'secretkey';

export const getUserInfoFromAuthToken = async (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      return await jwt.verify(token, SECRET);
    } catch (e) {
      throw new Error('Session expired');
    }
  }
  return null;
};