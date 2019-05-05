import React, { Component } from 'react';

import GameStore from '../stores/GameStore';

import './Game.css';

class Board extends Component {

    constructor() {
        super();
        this.state = {
            bets: GameStore.getBets()
        }
    }

    componentWillMount() {
        GameStore.on("betsUpdate", () => { this.setState({ bets: GameStore.getBets() }) })
    }

    optionClicked(type, val, id) {
        this.props.optionClicked(type, val, id)
    }

    printDeleteButton(id) {
        if (this.state.bets[id]) {
            return <button onClick={(e) => {
                e.stopPropagation()
                this.deleteBetClicked(id)
            }}>X</button>
        }
        else { return null }
    }

    printBid(id) {
        if (this.state.bets[id]) {
            return "Bid: " + this.state.bets[id].bid
        }
        else {
            return ""
        }
    }

    printClass(id) {
        if (this.state.bets[id]) {
            return "betOption"
        }
        else {
            return ""
        }
    }

    deleteBetClicked(id) {
        this.props.deleteBet(id)
    }

    render() {

        return (
            <div className="board">
                
                <div className="numbers boardColumn">
                    {GameStore.getNumbers().map((item, key) => {
                        let title = this.printBid(item.id)
                        let attr = { 'title': title }
                        return <div key={key} className={item.color + ' number option ' + `${this.printClass(item.id)}`} {...attr} onClick={() => { this.optionClicked('number', item.id, item.id) }}>
                            {item.id}
                        </div>
                    })}
                    
                </div>
               
            </div>
        );
    }

}

export default Board;
