import React, { Component } from 'react';

import GameStore from '../stores/GameStore';
import * as Actions from '../actions/GameActions';

import './Game.css';

class EndGameWindow extends Component {
    constructor() {
        super();
        this.state = {
            bets: GameStore.getBets()
        };
    }

    componentWillMount() {
        GameStore.on("betsUpdate", () => {
            this.setState({ bets: GameStore.getBets() });
        });
    }

    startNewGame() {
        Actions.startNewGame();
    }

    printClass() {
        if (this.state.bets.length !== 0) {
            if (this.props.display) {
                return "modalOpen";
            } else {
                return "";
            }
        }
    }

    printWinningNumber() {
        if (this.props.winningNumber) {
            return (
                <div
                    className={'winner ' + this.props.winningNumber.color}
                >
                    {this.props.winningNumber ? this.props.winningNumber.id : null}
                </div>
            );
        } else {
            return "";
        }
    }

    render() {
        return (
            <div className={'modal ' + this.printClass()}>
                <div className="modalContent endGameWindow">
                    {this.printWinningNumber()}
                    <table>
                        <thead>
                            <tr>
                                <th>Bet</th>
                                <th>Bid</th>
                                <th>Win</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.bets.map((bet, id) => {
                                if (bet) {
                                    return (
                                        <tr key={id}>
                                            <td>{bet.BidNumber}</td>
                                            <td>{bet.BidAmount}</td>
                                            <td>{bet.win}</td>
                                        </tr>
                                    );
                                }
                                return "";
                            })}
                            <tr>
                                <td>Total win:</td>
                                <td />
                                <td>{this.props.win}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        className="defaultBtn"
                        onClick={() => this.startNewGame()}
                    >
                        OK
          </button>
                </div>
            </div>
        );
    }
}

export default EndGameWindow;
