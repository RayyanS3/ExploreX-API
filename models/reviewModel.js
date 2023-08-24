const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review must not be empty'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Review must have rating.'],
  },
  createdAt: {
    type: Date,
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
