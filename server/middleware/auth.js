const jwt = require("jsonwebtoken");
require("dotenv").config()


const verifyToken = (req, res, next) => {
  const token = req.cookies['APP_AUTH']??req.headers['x-api-key']
  if (token != undefined) {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (new Date(decodedToken.expire) < new Date(Date.now())) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    try {
      req.currentUser = decodedToken;
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } else {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

};

module.exports = verifyToken;