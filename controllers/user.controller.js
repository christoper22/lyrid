const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsersTable = require('../db/models/users.model');
const { connection } = require('../db/models/sequelize');
const { generateAccessToken } = require('../utils/helper');

const loginUser = async (req, res, next) => {
  try {
    const bodies = req.body;

    const isUserExist = await UsersTable.findOne({
      where: { email: bodies.email },
      exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
    });

    if (!isUserExist) {
      return res.status(400).json({
        code: 400,
        message: 'user not found',
      });
    }

    const comparePassword = await bcrypt.compare(
      bodies.password,
      isUserExist.password
    );

    if (!comparePassword) {
      return res.status(401).json({
        code: 401,
        message: 'wrong password',
      });
    }

    const token = `Bearer ${generateAccessToken({
      id: isUserExist.id,
    })}`;

    return res.status(200).json({
      code: 200,
      message: 'login succesfull',
      token: token.split(' ')[1],
      data: {
        email: isUserExist.email,
        first_name: isUserExist.first_name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const bodies = req.body;

    const isUserExist = await UsersTable.findOne({
      where: {
        email: bodies.email,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    });

    if (isUserExist) {
      throw {
        code: 400,
        message: 'Email already exist',
      };
    }

    const hasedPassword = bcrypt.hashSync(bodies.password, 12);

    const user = await UsersTable.create({
      email: bodies.email,
      first_name: bodies.first_name,
      last_name: bodies.last_name,
      password: hasedPassword,
    });

    return res.status(200).json({
      code: 200,
      message: 'Success create user',
      data: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginOrRegisterUserOauth = async (req, res, next) => {
  try {
    const { displayName, emails } = req.user;
    const email = emails[0].value;
    const myArray = displayName.split(' ');
    // eslint-disable-next-line prefer-const
    let user = await UsersTable.findOne({ where: { email: email } });

    console.log(myArray);
    console.log(user);
    if (!user) {
      user = await UsersTable.create({
        email,
        first_name: myArray[0],
        last_name: myArray[myArray.length - 1],
        is_email_verified: emails[0].verified,
      });
    }

    const token = `Bearer ${generateAccessToken({
      id: user.id,
    })}`;

    return res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  loginOrRegisterUserOauth,
};
