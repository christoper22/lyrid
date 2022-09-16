const router = require('express').Router();
const {
  loginUser,
  registerUser,
  loginOrRegisterUserOauth,
} = require('../controllers/user.controller');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/register/outhgoogle', loginOrRegisterUserOauth);

module.exports = router;
