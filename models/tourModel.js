const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have name'],
    unique: true,
  },
  rating: {
    type: Number,
    deafult: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Tour must have price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);
