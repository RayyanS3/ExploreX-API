const express = require('express');

const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authenticationController');

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview,
  );

// Export module
module.exports = router;
