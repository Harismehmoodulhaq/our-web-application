import jwt from 'jsonwebtoken';

const SECRET = 'secretkey';

export const getUser = async (req: any) => {
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