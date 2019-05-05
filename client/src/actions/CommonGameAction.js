import openSocket from 'socket.io-client';
import dispatcher from "../dispatcher";
const socket = openSocket('http://localhost:5000');


export const SetWinner = (i) => {
    socket.emit('setwinner', i);
};

export const GetWinner = () => {
    socket.on("getWinner", function (data) {
        if (data.trim().length > 0) {
            dispatcher.dispatch({type: "WINNER_SET", data: data});
        }else{
            return "";
        }
    })
}

export const BidPlaced = () => {
    socket.emit('startgame', 1);
}

export const Gamestarted = () => {
    socket.on("gamestarted", function (data) {
        if (data.length > 0) {
            dispatcher.dispatch({type: "GAME_STARTED", data: data});
        }else{
            return "";
        }
    })
}