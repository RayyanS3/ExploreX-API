//NPM/Native modules import
const express = require('express');
const morgan = require('morgan');
const app = express();

//Router import
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//Middleware declerations
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//Express app export
module.exports = app;
