const express = require('express');
const reviewRouter = require('./reviewRoutes');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authenticationController');

const router = express.Router();

// Main routes
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.addTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

// Secondary routes
router
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getToursStats);

router.route('/monthly-plans/:year').get(tourController.getMonthlyPlans);

// Nested routes
router.use('/:tourId/reviews', reviewRouter);

// Export module
module.exports = router;
