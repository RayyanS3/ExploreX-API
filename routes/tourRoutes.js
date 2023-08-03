const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`The tour id is ${val}`);
  next();
});

//Route handlers
router.route('/').get(tourController.getAllTours).post(tourController.addTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

//Export module
module.exports = router;
