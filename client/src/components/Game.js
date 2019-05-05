import React, { Component } from 'react';

import GameStore from '../stores/GameStore';
import * as Actions from '../actions/GameActions';

import styles from '../App.css';

import Board from './Board';
import Infobox from './Infobox';
import Controls from './Controls';
import EndGameWindow from './EndGameWindow';
import ErrorWindow from './ErrorWindow';

import AdminStore from '../stores/AdminStore';
import Bet from './Bet';


import Roulette from './roulette/Roulette'

import {GetWinner, BidPlaced} from "../actions/CommonGameAction";

class Game extends Component {

    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            numbers: GameStore.getNumbers(),
            money: GameStore.fetchMoney(),
            totalBet: 0,
            token: GameStore.getToken(),
            bets: [],
            endGame: false,
            win: 0,
            winningNumber: null,
            moneyError: false,
            bidUpdated: false,
            isRouletteVisible: false
        };

    }

    componentDidMount() { 
        this._isMounted = true;
        GetWinner();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    componentWillMount() {
        
        GameStore.on("change",() => { this.setState({money: GameStore.getMoney() }); })
        //GameStore.on("startGame",() => { this.startGame() })
        GameStore.on("newGame", () => { this.setState({ endGame: false, win: 0, winningNumber: null }) })
        GameStore.on("moneyUpdate", () => { this.setState({ money: GameStore.getMoney() }) })
        GameStore.on("betsUpdate", () => { this.setState({ bets: GameStore.getBets() }) })
        GameStore.on("tokenUpdate", () => { this.setState({ token: GameStore.getToken() }) })
        GameStore.on("registerBid", () => {
            this.setState({ bidUpdated: true, isRouletteVisible: true }, function () {
                //Notify admin about bid placement.
                BidPlaced()
            })
        })
        // GameStore.on("closeroulette", () => {
        //     //console.log(GameStore.getWinningNumber());
        //     this.setState({
        //         isRouletteVisible: false,
        //         winningNumber: GameStore.getWinningNumber()
        //     },() => this.startGame())
        // })
        // GameStore.on("stopgame", () => {
        //     this.setState({ bidUpdated: false, winningNumber: GameStore.getWinningNumber() }, function () {
        //         this.startGame()
        //     })
        // })
    }

    startGame() {
        //let rand = Math.floor(Math.random() * this.state.numbers.length)
        let rand = this.state.winningNumber;
        let winningNumber = this.state.numbers[rand];
        console.log(winningNumber);
        this.getWin(winningNumber)
        this.setState({ endGame: true, winningNumber: winningNumber }, function(){
            GameStore.setEndGame(rand);
        })
        this.refs.infobox.addWinningNumber(winningNumber.id, winningNumber.color)
    }

    getWin(winningNumber) {
        let bets = this.state.bets
        let win = 0
        for (let i = 0; i < bets.length; i++) {
            if (bets[i]) {
                bets[i].getWin(winningNumber)
                win += bets[i].win
            }
        }
        this.setState({ win })
        // Sending winningNumber for reference for later update to API.
        GameStore.updateMoney(win, winningNumber)
    }

    optionClicked(type, val, id) {
        if (this.state.token <= this.state.money) {
            let bets = this.state.bets
            if (!bets[id]) {
                bets[id] = new Bet(type, val, this.state.token)
            }
            else {
                bets[id].raiseBid(this.state.token)
            }
            Actions.updateBets(bets, this.state.token)
        }
        else {
            this.setState({ moneyError: true })
        }
    }

    deleteBet(id) {
        let bets = this.state.bets
        let bid = bets[id].bid
        bets[id] = null
        Actions.updateBets(bets, -bid)
    }

    playPrevoiusBets() {
        let previousBets = GameStore.getPreviousBets()
        let totalPrevoiusBet = GameStore.getPreviousBid()
        if (totalPrevoiusBet <= this.state.money + GameStore.getTotalBet()) {
            Actions.updateBets(previousBets, totalPrevoiusBet - GameStore.getTotalBet())
        }
        else {
            this.setState({ moneyError: true })
        }
    }

    deleteError() {
        this.setState({ moneyError: false })
    }

    backCalled(){
        this.setState({
            isRouletteVisible: false,
            winningNumber: GameStore.getWinningNumber()
        },() => this.startGame())
    }

    render() {
        return (<div>
            {
                !this.state.isRouletteVisible ? 
                (
                    <div className={styles.gameContainer}>
                        <Infobox money={this.state.money} deleteBet={this.deleteBet.bind(this)} ref="infobox" />
                        <Board optionClicked={this.optionClicked.bind(this)} 
                        deleteBet={this.deleteBet.bind(this)} />
                        <Controls bidPlaced={this.state.bidUpdated} playPrevoiusBets={this.playPrevoiusBets.bind(this)} />
                        <EndGameWindow display={this.state.endGame} 
                        winningNumber={this.state.winningNumber} 
                        win={this.state.win} />
                        <ErrorWindow display={this.state.moneyError} 
                        deleteError={this.deleteError.bind(this)} />
                    </div>
                ):
                (<Roulette returnBack={this.backCalled.bind(this)}/>)
            }
                </div>
        );
    }

}

export default Game;
