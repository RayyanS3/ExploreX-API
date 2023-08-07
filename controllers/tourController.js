const Tour = require('../models/tourModel');

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
exports.addTour = async (req, res) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: {
      tour: newTour,
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
