const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

// Route handlers
router.route('/').get(userController.getAllUsers).post(userController.addUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// Export module
module.exports = router;
