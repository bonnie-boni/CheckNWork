import jwt from 'jsonwebtoken'
import Customer from '../models/Customer'
import Worker from '../models/signup_workers'
// import passport from 'passport'
// import GoogleOAuth20 from 'passport-google-oauth20'

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    console.log(token);
    if (customer) {
      req.token = token;
      req.customer = customer;
      next();
    }
    if (!customer) {
      const worker = await Worker.findOne({
        _id: decoded._id,
        'tokens.token': token,
      });
      if (!worker) {
        throw new Error();
      }
      req.token = token;
      req.worker = worker;
      next();
    }
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

export default {auth}