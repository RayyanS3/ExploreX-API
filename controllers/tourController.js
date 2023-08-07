const Tour = require('../models/tourModel');

// Controller functions
exports.getAllTours = async (req, res) => {
  const allTours = await Tour.find();

  res.status(200).json({
    status: 'success',
    tourCount: allTours.length,
    data: { allTours },
  });
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
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
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
