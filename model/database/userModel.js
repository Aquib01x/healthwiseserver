const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
});

// Asynchronous method for signing up users with validation and hashing.
UserSchema.statics.signup = async function(email, password) {
  if (!email || !password) {
    throw new Error('Please fill in the fields');
  }

  const userExistsAlready = await this.findOne({ email });
  if (userExistsAlready) {
    throw new Error('This email already exists');
  }

  if (!validator.isStrongPassword(password, {
    minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
  })) {
    throw new Error('This password is too weak');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await this.create({ email, password: hashedPassword });
  return user;
};

UserSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw new Error('Please fill in the fields');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Email is not correct');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Incorrect password');
  }

  return user;
};

// Export the model based on UserSchema.
module.exports = mongoose.model('User', UserSchema);