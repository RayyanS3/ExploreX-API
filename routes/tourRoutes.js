const express = require('express');
const reviewRouter = require('./reviewRoutes');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authenticationController');

const router = express.Router();

// Unprotected routes
router
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getToursStats);

router.route('/').get(tourController.getAllTours);

// Nested routes
router.use('/:tourId/reviews', reviewRouter);

// Protected routes

router.use(
  authController.protect,
  authController.restrictTo('admin', 'lead-guide'),
);

router.route('/').post(tourController.addTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

router.route('/monthly-plans/:year').get(tourController.getMonthlyPlans);

// Export module
module.exports = router;
