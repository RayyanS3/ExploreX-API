const Tour = require('../models/tourModel');

// Controller functions
exports.getAllTours = async (req, res) => {
  try {
    // Extra field filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'fields', 'limit'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Query params filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const query = Tour.find(JSON.parse(queryStr));

    const allTours = await query;

    res.status(200).json({
      status: 'success',
      tourCount: allTours.length,
      data: { allTours },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Error',
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
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

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'selected tour deleted',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
};
