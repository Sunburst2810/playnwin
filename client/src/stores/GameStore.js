import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import { placeBids, updateBidStatus, getUserBalance} from "../actions/placeBids";

class GameStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.numbers = [
      { color: "green", id: 0 },
      { color: "red", id: 1 },
      { color: "black", id: 2 },
      { color: "red", id: 3 },
      { color: "black", id: 4 },
      { color: "red", id: 5 },
      { color: "black", id: 6 },
      { color: "red", id: 7 },
      { color: "black", id: 8 },
      { color: "red", id: 9 }
    ];
    this.bets = [];
    this.money = 0;
    this.totalBet = 0;
    this.token = 5;
    this.previusBets = null;
    this.previousBid = null;
    this.deletingBets = false;
    this.winningNumber = 0;
    this.isFirstTime = true;
  }

  getNumbers() {
    return this.numbers;
  }
  getBets() {
    return this.bets;
  }
  getMoney() {
    return this.money;    
  }

  fetchMoney(){
    getUserBalance();
  }

  getTotalBet() {
    return this.totalBet;
  }
  getToken() {
    return this.token;
  }
  getPreviousBets() {
    return this.previusBets;
  }
  getPreviousBid() {
    return this.previousBid;
  }

  registerBid() {
    const bidsData = {
      money: this.money,
      totalBet: this.totalBet,
      bets: this.bets.filter(Boolean)
    };
    
    placeBids(bidsData, {}).then(res => {
      this.emit("registerBid")
    }).catch(r => {})
    
  };

  updateBets(bets, money) {
    this.bets = bets;
    this.emit("betsUpdate");
    this.updateMoney(-money);
    this.updateBid(money);
  }

  updateMoney(x, y) {
    //Assigning winningNumber to object for later use for updating to API.
    this.winningNumber = y;
    this.money += x;
    this.emit("moneyUpdate");
  }

  updateBid(x) {
    this.totalBet += x;
    this.emit("totalBetUpdate");
  }

  deleteAllBets() {
    this.updateBets([], -this.totalBet);
  }

  setEndGame(x){
    updateBidStatus({ winningNumber: x, Balance: this.getMoney() }, {});
  }

  getWinningNumber(){
    return this.winningNumber;
  }

  closeRoulette(e){
    dispatcher.dispatch({type: "CLOSE_ROULETTE", winningNumber: e});
  }

  newGameStart(){
      this.previusBets = this.bets;
      this.previousBid = this.totalBet;
      this.bets = [];
      this.totalBet = 0;
      this.winningNumber = 0;
      this.emit("betsUpdate");
      this.emit("totalBetUpdate");
      this.emit("newGame");
  }

  handleActions(action) {
    switch (action.type) {
      case "UPDATE_BETS":
        this.updateBets(action.bets, action.money);
        break;
      case "DELETE_ALL_BETS":
        this.deleteAllBets();
        break;
      case "START_GAME":
        this.emit("startGame");
        break;
      case "START_NEW_GAME":
        this.newGameStart();
        break;
      case "TOKEN_CLICKED":
        this.token = action.val;
        this.emit("tokenUpdate");
        break;
      case "REGISTER_BID":
        this.registerBid();
        break;
      case "BALANCE_FETCHED":
          this.money = action.balance;
          this.emit("change");
          break;
      case "WINNER_SET":
          this.winningNumber = action.data;
          this.emit("stopgame");
          break;
      case "CLOSE_ROULETTE":
        this.winningNumber = action.winningNumber;
        this.emit("closeroulette");
        break;
      default:
        break;
    }
  }
}

const gameStore = new GameStore();
dispatcher.register(gameStore.handleActions.bind(gameStore));

export default gameStore;
