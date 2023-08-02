const express = require('express');

const tourRouter = express.Router();

//CRUD Tour functions
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: toursData.length,
    data: { toursData },
  });
};
const getTour = (req, res) => {
  const returnId = req.params.id * 1;
  const tour = toursData.find((el) => el.id === returnId);
  if (!tour) {
    return res.status(404).json({
      status: 'error',
      message: `Tour with id = ${returnId} doesn't exist`,
    });
  }
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};
const addTour = (req, res) => {
  const newId = toursData[toursData.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  toursData.push(newTour);
  fs.writeFile(
    __dirname + '/dev-data/data/tours-simple.json',
    JSON.stringify(toursData),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  const returnId = req.params.id * 1;
  if (returnId > toursData.length) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<UPDATED TOUR>',
    },
  });
};
const deleteTour = (req, res) => {
  const returnId = req.params.id * 1;
  if (returnId > toursData.length) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

//Route handlers
tourRouter.route('/').get(getAllTours).post(addTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
