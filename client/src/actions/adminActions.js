import axios from "axios";
import dispatcher from "../dispatcher";

export const getBids = () => {
    return new Promise((resolve, reject) => {
    axios.get("/api/bids/all")
      .then(res => {
        resolve({data: res.data, status: res.status})
      }).catch(err=>{
        reject({data: [], status: err.status})
      });
    });
  };

export function getUsers() {
  axios.get("/api/orders/getUsers")
    .then(res => {
      dispatcher.dispatch({ type: "ORDER_USERS_FETCHED", payload: res.data });
    }).catch(err => {
      dispatcher.dispatch({
        type: "ERROR_FETCH_ORDER_USERS",
        payload: err.data
      })
    });
}

export function transferChips(data) {
  axios.put("/api/orders/updateBalance", data)
    .then(res => {
      dispatcher.dispatch({ type: "MANUAL_ORDER_PLACED", status: res.status });
    }).catch(err => {
      dispatcher.dispatch({
        type: "ERROR_FETCH_USERS",
        payload: err.data
      })
    });
}

export function setWinner(){
  setTimeout(function(){
    dispatcher.dispatch({ type: "WINNER_SET", winner: 2 });
  }, 2000);
}