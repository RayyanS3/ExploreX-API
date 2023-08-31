const catchAsync = require('../utils/catchAsync');
const Tour = require('../models/tourModel');

exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      'connect-src https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com',
    )
    .render('tour', {
      title: tour.name,
      tour,
    });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  console.log('WORKING');

  res.status(200).render('login', {
    title: 'Login',
  });
});
