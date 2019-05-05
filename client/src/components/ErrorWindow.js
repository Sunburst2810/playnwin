import React, { Component } from "react";

import "./Game.css";

class ErrorWindow extends Component {
  closeWindow() {
    this.props.deleteError();
  }

  printClass() {
    if (this.props.display) {
      return "modalOpen";
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className={'modal ' + this.printClass()}>
        <div className="modalContent errorWindowContent">
          <p>You dont have enough Bets.</p>
          <button
            className="defaultBtn"
            onClick={() => this.closeWindow()}
          >
            OK
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorWindow;
