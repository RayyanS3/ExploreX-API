// NPM/Native modules import
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Router import
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Global Middleware declerations

// Secure HTTP headers
app.use(helmet());

// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Request limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, please try again later.',
});
app.use('/api', limiter);

// Express options
app.use(express.json({ limit: '10kb' }));

// Serve static files
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
