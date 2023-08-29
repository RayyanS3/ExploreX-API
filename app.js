// NPM/Native modules import
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xxs = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Router import
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

// Global Middleware declerations
app.use(express.static(path.join(__dirname, 'public')));

// Secure HTTP headers
app.use(helmet());

// Data sanitization middlewares
app.use(xxs());
app.use(mongoSanitize());

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
app.get('/', (req, res) => {
  res.status(200).render('base');
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/review', reviewRouter);

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
