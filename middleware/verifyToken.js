const UsersTable = require('../db/models/users.model');
const jwt = require('jsonwebtoken');

async function secret(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({
      message: 'Acces Denied',
    });
  }
  // verify token using jwt
  try {
    const token = authorization.split(' ')[1]; // ['Bearer', '<token>']
    const verifikasi = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(verifikasi);
    // console.log(verifikasi.userName)
    const user = await UsersTable.findOne({
      where: { id: verifikasi.id },
    });
    if (!user) {
      return res.status(401).json({
        message: 'username notfound!!',
      });
    } else {
      req.userAfterVerifikation = user.id;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'invalid token',
    });
  }
}

module.exports = secret;
