import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const auth = async (req, res, next) => {
   try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      console.error('User not found');
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ message: 'Please authenticate.' });
  }
};

export default auth;
