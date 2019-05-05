import React, { Component } from 'react';

import GameStore from '../stores/GameStore';
import * as Actions from '../actions/GameActions';

import './Game.css';

class Controls extends Component {
    constructor() {
        super();
        this.state = {
            token: GameStore.getToken(),
            prevoiusBetsDisabled: true,
            deletingBet: false
        };
    }

    componentWillMount() {
        GameStore.on("tokenUpdate", () => {
            this.setState({ token: GameStore.getToken() });
        });
        let prevoiusBetsDisabled;
        GameStore.on("newGame", () => {
            prevoiusBetsDisabled = GameStore.getPreviousBets() ? false : true;
            this.setState({ prevoiusBetsDisabled });
        });
    }

    startButtonClicked() {
        Actions.registerBid();
        //Actions.startGame();
    }

    deleteAllBetsClicked() {
        Actions.deleteAllBets();
    }

    previusBetsClicked() {
        this.props.playPrevoiusBets();
    }

    tokenClicked(val) {
        Actions.tokenClicked(val);
    }

    printTokenClasses(x) {
        return x === this.state.token ? "tokenActive" : "";
    }

    render() {
        return (
            <div className="controls">
                <div className="container">
                    <div className="tokensBox">
                        <button
                            className={'token ' + this.printTokenClasses(5)}
                            onClick={() => {
                                this.tokenClicked(5);
                            }}
                        >
                            <p>5</p>
                        </button>
                        <button
                            className={'token ' + this.printTokenClasses(10)}
                            onClick={() => {
                                this.tokenClicked(10);
                            }}
                        >
                            <p>10</p>
                        </button>

                        <button
                            className={'token ' + this.printTokenClasses(50)}
                            onClick={() => {
                                this.tokenClicked(50);
                            }}
                        >
                            <p>50</p>
                        </button>
                        <button
                            className={'token ' + this.printTokenClasses(100)}
                            onClick={() => {
                                this.tokenClicked(100);
                            }}
                        >
                            <p>100</p>
                        </button>
                    </div>
                    <div className="controlsButtons">
                        <button
                            className="defaultBtn"
                            onClick={() => {
                                this.deleteAllBetsClicked();
                            }}
                        >
                            Remove all bets
            </button>
                        <button
                            className="defaultBtn"
                            onClick={() => {
                                this.previusBetsClicked();
                            }}
                            disabled={this.state.prevoiusBetsDisabled}
                        >
                            Play previous bets again
            </button>
                        <button
                            className="defaultBtn spinBallBtn"
                            onClick={() => {
                                this.startButtonClicked();
                            }}
                        >
                            Place Bet
            </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Controls;
