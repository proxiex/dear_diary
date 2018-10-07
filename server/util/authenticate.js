import jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;

const Authenticate = {

  createToken: (payload) => {
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: 60 * 60 * 24 // Token expires in 24 hours
    });
    return token;
  },

  Verify: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers.token;
    if (!token) {
      return res.status(401).send({
        message: 'Unauthorised User! Please provide a valid token'
      });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Token could not be authenticated'
        });
      }
      req.decoded = decoded;
      next();
    });
  }
};

export default Authenticate;
