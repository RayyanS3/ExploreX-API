// NPM/Native modules import
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

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
  next(
    new AppError(`Route to ${req.originalUrl} does not exist on server`, 404),
  );
});

// Global error handling middleware
app.use(globalErrorHandler);

// Express app export
module.exports = app;
