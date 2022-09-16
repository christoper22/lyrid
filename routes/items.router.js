const router = require('express').Router();
const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} = require('../controllers/items.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, getItems);
router.post('/', verifyToken, addItem);
router.patch('/:iditem', verifyToken, updateItem);
router.delete('/:iditem', verifyToken, deleteItem);

module.exports = router;
