const express = require('express');

const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authenticationController');

router
  .route('/')
  .get(authController.protect, reviewController.getAllReviews)
  .post();

// Export module
module.exports = router;
