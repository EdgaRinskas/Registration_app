const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', async (req, res) => {
  try {
    const users = await userController.getAllUsers(req, res);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.delete('/users/:id', userController.deleteUser);
router.put('/users/:id', userController.updateUser);

module.exports = router;
