const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_PATH.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB CONNECTION SUCCESSFUL'));

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

const testTour = new Tour({
  name: 'The Desert Adventure',
  price: 667,
  rating: 4.9,
});
// Server start
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log('Server started on port 3000');
});
