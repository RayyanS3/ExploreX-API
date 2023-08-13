// NPM/Native modules import
const express = require('express');
const morgan = require('morgan');

const app = express();

// Router import
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Middleware declerations
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static('public'));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Error handling all other routes - middleware
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Route to ${req.originalUrl} does not exist on server`,
  });
  next();
});

// Express app export
module.exports = app;
