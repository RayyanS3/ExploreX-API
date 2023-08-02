const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

const toursData = JSON.parse(
  fs.readFileSync(__dirname + '/dev-data/data/tours-simple.json')
);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: toursData.length,
    data: { toursData },
  });
});

app.post('/api/v1/tours', (req, res) => {});
