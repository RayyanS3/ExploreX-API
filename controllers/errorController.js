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

const getErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      err: err,
      stack: err.stack,
    });
  }
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const jwtTokenErrorHandler = () => {
  return new AppError('Invalid token, please try logging in again', 401);
};

const jwtExpiredErrorHandler = () => {
  return new AppError('Expired token, please try logging in again', 401);
};

const getErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    msg: 'Something went wrong!',
  });
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    getErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let errorCopy = { ...err };
    errorCopy.message = err.message;
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
      errorCopy = jwtTokenErrorHandler();
    }

    if (errorCopy.message === 'jwt expired') {
      errorCopy = jwtExpiredErrorHandler();
    }
    getErrorProd(errorCopy, req, res);
  }
};
