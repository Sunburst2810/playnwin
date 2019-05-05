const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderBookSchema = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  Admin: {
    type: Schema.Types.ObjectId,
    ref: "admins"
  },
  Amount: {
    type: Integer
  },
  ChipCount: {
    type: Integer
  },
  OrderDateTime: {
    type: date,
    default: Date.now
  },
  ReferenceNumber: {
    type: String,
    required: true
  },
  IsSuccess: {
    type: Boolean,
	  default: false
  },
  OrderSuccessDateTime: {
    type: date
  },
  LastUpdatedDate: {
    type: Date
  }
});

module.exports = OrderBook = mongoose.model("orderbook", OrderBookSchema);