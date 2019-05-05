import React, { Component } from "react";

import GameStore from "../stores/GameStore";

import "./Game.css";
import { throws } from "assert";

class Infobox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: 0,
      totalBet: GameStore.getTotalBet(),
      bets: GameStore.getBets(),
      lastWinningNumbers: [],
      tableOpen: false
    };
  }

  componentWillMount() {
    GameStore.on("change",() => { this.setState({money: GameStore.getMoney() }); })

    GameStore.on("moneyUpdate", () => {
      this.setState({ money: GameStore.getMoney() });
    });
    GameStore.on("totalBetUpdate", () => {
      this.setState({ totalBet: GameStore.getTotalBet() });
    });
    GameStore.on("betsUpdate", () => {
      this.setState({ bets: GameStore.getBets() });
    });
  }

  deleteBetClicked(id) {
    this.props.deleteBet(id);
  }

  addWinningNumber(number, color) {
    let lastWinningNumbers = this.state.lastWinningNumbers;
    lastWinningNumbers.unshift({ number: number, color: color });
    lastWinningNumbers = lastWinningNumbers.slice(0, 8);
    this.setState({ lastWinningNumbers });
  }

  betsTableOpenerClicked() {
    let tableOpen = this.state.tableOpen ? false : true;
    this.setState({ tableOpen });
  }

  render() {
    let tableOpen = this.state.tableOpen ? "open" : "";
    let buttonOpen = this.state.tableOpen ? "openBtn" : "";
    return (
      <div className="infobox">
        <div className="container">
          <div className="mainInfo">
            <div className="moneyInfo">
              <p>
                <b>Balance:</b> {this.state.money}
              </p>
              <p>
                <b>Total bet:</b> {this.state.totalBet}
              </p>
            </div>
            <button
              className="betsTableOpener defaultBtn"
              onClick={() => {
                this.betsTableOpenerClicked();
              }}
            >
              Your Bets{" "}
              <i className={`${buttonOpen} material-icons`}>
                keyboard_arrow_down
              </i>
            </button>
          </div>
          <div className="winningNumbersBox">
            {this.state.lastWinningNumbers.map((item, id) => {
              return (
                <div key={id} 
                  className={item.color + ' winningNumber'}
                >
                  {item.number}
                </div>
              );
            })}
          </div>
        </div>
        <table className={'infoboxTable ' +  {tableOpen}}>
          <thead>
            <tr>
              <th>Bet</th>
              <th>Bid</th>
              <th>Possible win</th>
              <th>Delete bid</th>
            </tr>
          </thead>
          <tbody>
            {this.state.bets.map((bet, id) => {
              if (bet) {
                return (
                  <tr key={id}>
                    <td>{bet.value}</td>
                    <td>{bet.bid}</td>
                    <td>{bet.possibleWin}</td>
                    <td>
                      <button onClick={() => this.deleteBetClicked(id)}>
                        <i className="material-icons">clear</i>
                      </button>
                    </td>
                  </tr>
                );
              }
              return "";
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Infobox;
