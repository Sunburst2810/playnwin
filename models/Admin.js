const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({
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
  ProfilePic: {
    type: String
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

module.exports = Admin = mongoose.model("admins", AdminSchema);