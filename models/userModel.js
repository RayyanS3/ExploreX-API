const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Tour must have name'],
  },
  email: {
    type: String,
    required: [true, 'Tour must have name'],
  },
  photo: {},
  password: {},
  passwordConfirm: {},
});

const User = mongoose.model('User', userSchema);
module.exports = User;
