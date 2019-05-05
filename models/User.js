const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true, 
    trim: true
  },
  Password: {
    type: String,
    required: true
  },
  Avatar: {
    type: String
  },
  ContactNo: {
    type: String,
  },
  Balance: {
    type: Number,
    default: 0
  },
  ProfilePic: {
    type: String,
    default: ''
  },
  IsActive: {
    type: Boolean,
    default: true
  },
  RegistrationDate: {
    type: Date,
    default: Date.now
  },
  LastUpdatedDate: {
    type: Date
  }
});

module.exports = User = mongoose.model('users', UserSchema);
