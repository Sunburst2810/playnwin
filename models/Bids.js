const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BidSchema = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  Bets:[{
    BidAmount: {
      type: Number,
      required: true
    },
    Multiplier: {
      type: Number,
      required: true
    },
    PossibleWin: {
      type: Number,
      required: true
    },
    BidNumber: {
      type: Number,
      required: true
    }
  }],
  CurrentBalance: {
    type: Number
  },
  BetAmount: {
    type: Number
  },
  WinningNumber: {
    type: Number
  },
  EndGame:{
    type: Boolean,
    default: false
  },
  CreateDateTime: {
    type: Date,
    default: Date.now
  },
  LastUpdatedDate: {
    type: Date
  }
});

module.exports = Bids = mongoose.model("bids", BidSchema);
