const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const handlerFactory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filteredTour = {};
  if (req.params.tourId) filteredTour = { tour: req.params.tourId };

  const allReviews = await Review.find(filteredTour);

  res.status(200).json({
    status: 'success',
    ReviewCount: allReviews.length,
    data: { allReviews },
  });

  next();
});

exports.createReview = catchAsync(async (req, res, next) => {
  // Nested route implementation
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Successfully posted review',
    review: newReview,
  });
});

exports.deleteReview = handlerFactory.deleteOne(Review);
exports.updateReview = handlerFactory.updateOne(Review);
