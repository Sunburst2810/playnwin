import axios from "axios";
import { GET_BIDS, CLEAR_CURRENT_BIDS } from "./types";
import dispatcher from "../dispatcher";

// Place Bids
  export const placeBids_original = (bidsData, history) => dispatch => {
    axios
      .post("/api/bids", bidsData)
      .then(res => /* history.push("/dashboard")*/ history.emit("registerBid"))
      .catch(err =>
        dispatch({
          type: GET_BIDS,
          payload: err.response.data
        })
      );
  };

export function placeBids(bidsData, history) {
  return new Promise((resolve, reject) => {
    axios
    .post("/api/bids", bidsData)
    .then(function(res){resolve(res.status) })
    .catch(function (err) {
      reject(err.status)
    });
  });
};

export function updateBidStatus(bidsData) {
  return new Promise((resolve, reject) => {
    axios
    .put("/api/bids/update", bidsData)
    .then(function(res){resolve(res.status) })
    .catch(function (err) {
      reject(err.status)
    });
  });
};

//Get User Balance
export function getUserBalance(){
  //return new Promise((resolve, reject) => {
    dispatcher.dispatch({type: "FETCH_BALANCE"});
    axios
    .get("/api/bids/balance")
    .then(function(res){
      dispatcher.dispatch({type: "BALANCE_FETCHED", balance: res.data});
     })
    .catch(function (err) {
      dispatcher.dispatch({
        type: "ERROR_FETCH_BALANCE",
        payload: err.data
      })
    });
  //});
};

// Clear bids
export const clearCurrentBids = () => {
  return {
    type: CLEAR_CURRENT_BIDS
  };
};
