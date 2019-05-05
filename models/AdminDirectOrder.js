const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AdminDirectOrderSchema = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  Amount: {
    type: Number
  },
  TransferDateTime: {
    type: Date,
    default: Date.now
  },
  ReferenceNumber: {
    type: String,
    required: true
  },
  IsSuccess: {
    type: Boolean,
	  default: true
  }
});

module.exports = AdminDirectOrder = mongoose.model("admindirectorder", AdminDirectOrderSchema);