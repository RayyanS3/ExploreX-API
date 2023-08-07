const Tour = require('../models/tourModel');

// Param middlewares
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'No valid name and/or price',
    });
  }
  next();
};

// Controller functions
exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   results: toursData.length,
  //   data: { toursData },
  // });
};
exports.getTour = (req, res) => {
  const returnId = req.params.id * 1;
  // const tour = toursData.find((el) => el.id === returnId);
  // res.status(200).json({
  //   status: 'success',
  //   data: { tour },
  // });
};
exports.addTour = (req, res) => {
  res.status(201).json({
    status: 'Success',
    data: {
      // tour: newTour,
    },
  });
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<UPDATED TOUR>',
    },
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
