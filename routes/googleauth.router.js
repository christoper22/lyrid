const router = require('express').Router();
const passportOauth = require('../utils/passport-oauth-google.helper');

router.get(
  '/oauth',
  passportOauth.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/callback',
  passportOauth.authenticate('google', {
    successRedirect: '/ecommerce/users/register/outhgoogle',
    failureRedirect: '/ecommerce/users/login',
  })
);

module.exports = router;
