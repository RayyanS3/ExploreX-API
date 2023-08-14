const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} field: ${err.value}`;
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

const getErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // console.log(err);
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
    if (errorCopy.kind === 'ObjectId') {
      errorCopy = handleCastErrorDB(errorCopy);
    }
    getErrorProd(errorCopy, res);
  }
};
