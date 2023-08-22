const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser.id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide a valid email and password', 400));
  }
  // Check if they are correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPass(user.password, password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // Send response back
  const token = signToken(user.id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // Get token and check it exists
  let token;
  const authHeaders = req.headers.authorization;
  if (authHeaders && authHeaders.startsWith('Bearer')) {
    token = authHeaders.split(' ')[1];
  }
  console.log(token);
  if (!token) {
    return next(
      new AppError('You are not logged in, please do so to continue', 401),
    );
  }

  // Verifying token
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );

  // Check if user exists
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return next(new AppError('The user for this token no longer exists', 401));
  }

  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Get user and check if exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('No existing user with this email', 404));
  }

  const resetToken = user.createPassResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Please use the following link to reset your password ${resetURL}, if you did not request for  password change then ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token (Valid 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: `Token sent to email: ${user.email}`,
    });
  } catch (error) {
    console.log(error);
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Please try again later',
        500,
      ),
    );
  }

  next();
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  console.log(req.body.email);

  next();
});
