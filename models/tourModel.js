const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Tour must have duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Tour must have maximum group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'Tour must have difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Tour must have price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'Tour must have summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Tour must have a cover image identifier'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
