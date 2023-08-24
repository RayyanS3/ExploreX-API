const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour must have name'],
      unique: true,
      trim: true,
      maxlength: [40, 'Tour must have less than 40 chars'],
      minlength: [10, 'Tour must have more than 10 chars'],
      // validate: [validator.isAlpha, 'Name must contain only letters'],
    },
    slug: {
      type: String,
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulties must be easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      max: [5, 'Tour must have rating below 5'],
      min: [1, 'Tour must have rating above 1'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Tour must have price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'The price discount is more than the price',
      },
    },
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
      select: false,
    },
    startDates: [Date],
    privateTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON formatting
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual weekly duration property
tourSchema.virtual('weeklyDuration').get(function () {
  const duration = this.duration / 7;
  return duration.toFixed(3);
});

// Document middleware
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  console.log(this.slug);
  next();
});

// Query middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ privateTour: { $ne: true } });
  next();
});

// Aggregate middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { privateTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
