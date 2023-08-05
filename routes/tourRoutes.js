const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();
router.param('id', tourController.checkId);

// Route-handlers

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.addTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

// Export module
module.exports = router;
