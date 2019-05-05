import dispatcher from "../dispatcher";


export function updateBets(bets, money) {
  dispatcher.dispatch({
    type: "UPDATE_BETS",
    bets: bets,
    money: money
  });
}

export function startGame() {
   dispatcher.dispatch({
     type: "START_GAME"
   });
}

export function registerBid() {
   dispatcher.dispatch({
     type: "REGISTER_BID"
   });
}

export function deleteAllBets() {
  dispatcher.dispatch({
    type: "DELETE_ALL_BETS"
  });
}

export function startNewGame() {
  dispatcher.dispatch({
    type: "START_NEW_GAME"
  });
}

export function tokenClicked(val) {
  dispatcher.dispatch({
    type: "TOKEN_CLICKED",
    val: val
  });
}
