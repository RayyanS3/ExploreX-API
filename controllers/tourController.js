const fs = require('fs');
const toursData = JSON.parse(
  fs.readFileSync(__dirname + '/../dev-data/data/tours-simple.json')
);

//Controller functions
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: toursData.length,
    data: { toursData },
  });
};
exports.getTour = (req, res) => {
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
exports.addTour = (req, res) => {
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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
