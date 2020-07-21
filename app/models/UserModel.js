const mongoose = require('mongoose');

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: 'First name is required' },
  lastName: { type: String, required: 'Last name is required' },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: 'The password is required'
  },
  userXP: {
    type: Number, min: 0, default: 0
  },
  birthDate: Date,
  sexe: String,
  facebookToken: String,
  googleToken: String,
  userAvatar: String,
  active: {type: Boolean, default: false},
  verifiedToken: {type: String, default: null},
  emailVerifiedAt: Date
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
