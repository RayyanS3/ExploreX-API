const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const allReviews = await Review.find();

  res.status(200).json({
    status: 'success',
    ReviewCount: allReviews.length,
    data: { allReviews },
  });

  next();
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Successfully posted review',
    review: newReview,
  });
});
