require('dotenv').config();

const express = require('express');

// express group install first npm
require('express-group-routes');

const app = express();
const session = require('express-session');

// router
const userRouter = require('./routes/users.router');
const itemRouter = require('./routes/items.router');
const outhGoogleRouter = require('./routes/googleauth.router');

// passport for oauth
const passportOauth = require('./utils/passport-oauth-google.helper');

// parse file json and urlencoded for req body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passportOauth.initialize());
app.use(passportOauth.session());

app.group('/ecommerce', (router) => {
  router.use('/google', outhGoogleRouter);
  router.use('/users', userRouter);
  router.use('/items', itemRouter);
});

// error handler for unknown endpoint
// eslint-disable-next-line arrow-body-style, no-unused-vars
app.use('*', (req, res, next) => {
  return res.status(404).json({
    message: 'endpoint not found',
  });
});

// error handler for unexpected error
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.code || 500;
  const message = err.message || 'internal server error';
  return res.status(status).json({
    message,
  });
});

// send an event to Sentry

module.exports = {
  app,
};
