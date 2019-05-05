import { EventEmitter } from "events";
import dispatcher from "../dispatcher";


class AdminStore extends EventEmitter {
    constructor(props) {
        super(props);
        this.users = [],
        this.isManualOrderSuccess = false;
        this.manualOrderResponse = {};
        this.winner = 0;
    }

    returnUsers(){
        return this.users;
    }

    returnWinner(){
        return this.winner;
    }

    returnManualOrderStatus() {
        return this.isManualOrderSuccess;
    }

    handleActions(action) {
        console.log(action);
        switch (action.type) {
            case "ORDER_USERS_FETCHED":
                this.users = action.payload;
                this.emit("change");
                break;
            case "MANUAL_ORDER_PLACED":
                if (action.status) {
                    this.isManualOrderSuccess = true;
                }
                this.emit("manualordersuccess");
                break;
            case "WINNER_SET":
                this.winner = action.winner;
                this.emit("winnerget");
                break;
            case "GAME_STARTED":
                this.emit("change");
                break;
            default:
                break;
        }
    }
}

const adminStore = new AdminStore();
dispatcher.register(adminStore.handleActions.bind(adminStore));

export default adminStore;