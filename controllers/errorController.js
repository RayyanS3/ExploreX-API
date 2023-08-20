const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} field: ${err.value}`;
  return new AppError(message, 400);
};

const handleDupNameDB = (err) => {
  const message = `Tour name already used: ${err.keyValue.name}`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errorMessages = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid data input: ${errorMessages.join(' || ')}`;
  return new AppError(message, 400);
};

const getErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err: err,
    stack: err.stack,
  });
};

const jwtTokenErrorHandler = (err) => {
  return new AppError('Invalid token, please try logging in again', 401);
};

const getErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(err);
    res.status(500).json({
      status: 'error',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    getErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let errorCopy = { ...err };
    // Cast errors - invalid id
    if (errorCopy.kind === 'ObjectId') {
      errorCopy = handleCastErrorDB(errorCopy);
    }

    // Duplicate tour name error
    if (errorCopy.code === 11000) {
      errorCopy = handleDupNameDB(errorCopy);
    }

    // Validation error for patch request
    if (errorCopy._message === 'Validation failed') {
      errorCopy = handleValidationError(errorCopy);
    }

    if (errorCopy.message === 'jwt malformed') {
      errorCopy = jwtTokenErrorHandler(errorCopy);
    }
    getErrorProd(errorCopy, res);
  }
};
