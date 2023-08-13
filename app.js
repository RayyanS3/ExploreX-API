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
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Route to ${req.originalUrl} does not exist on server`,
  // });

  const err = new Error(`Route to ${req.originalUrl} does not exist on server`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

// Global error hndling middleware
app.use((err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// Express app export
module.exports = app;
