class Bet {
  constructor(type, value, bid) {
    this.type = type;
    this.BidNumber = value;
    this.BidAmount = bid;
    this.Multiplier = this.setMultiplier();
    this.setPossibleWin();
    this.win = 0;
  }

  setMultiplier() {
    let multiplier;
    switch (this.type) {
      case "number":
        multiplier = 9;
        break;

      default:
        break;
    }

    return multiplier;
  }

  setPossibleWin() {
    this.PossibleWin = this.Multiplier * this.BidAmount;
  }

  raiseBid(val) {
    this.BidAmount += val;
    this.setPossibleWin();
  }

  getWin(winningNumber) {
    let win = false;
    let number = winningNumber.id;
    let color = winningNumber.color;
    switch (this.type) {
      case "number":
        win = this.BidNumber === number ? true : false;
        break;
      case "color":
        win = this.BidNumber === color ? true : false;
        break;

      default:
        break;
    }

    if (win) {
      this.win = this.Multiplier * this.BidAmount;
    } else {
      this.win = 0;
    }
  }
} // class

export default Bet;
