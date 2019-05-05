import React, { Component } from 'react';
import {TimelineMax, TweenMax} from 'gsap';
import Linear from "gsap";
import Stopwatch from "./Stopwatch";

import GameStore from '../../stores/GameStore';
import {
  Wrapper,
  Main,
  SpinButton,
  ResetButton,
  ButtonLabel,
  Number,
  Ball,
  Inner,
  Plate,
  Pit,
  Data,
  DataInner,
  Mask,
  Result,
  ResultNumber,
  ResultColor
} from "./Style";

export default class Roulette extends Component {

  constructor() {
    super();
    
    this.state = {
      // buttons
      hideResetButton: true,
      hideSpinButton: false,
      disabledButton: false,
      // timer
      timer: 9000,
      // random generator
      luckyNumber: 9,
      currentNumber: [],
      getCurrentNumber: null,
      //slots
      spins: {
        
        slot0: -2820,
        slot9: -2856,
        slot8: -2529,
        slot7: -2568,
        slot6: -2601,
        slot5: -2640,
        slot4: -2673,
        slot3: -2712,
        slot2: -2745,
        slot1: -2784
        
      },
      red: [1, 3, 5, 7, 9],
      black: [2, 4, 6, 8],
      slotColor: null,
      slotColorText: null,
      //results preview
      maskDefault: "Bets",
      revealLuckyNumber: false,
      hideBack: true
    };

    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.rotateBall = this.rotateBall.bind(this);
    this.slot0 = this.slot0.bind(this);
    this.slot1 = this.slot1.bind(this);
    this.slot2 = this.slot2.bind(this);
    this.slot3 = this.slot3.bind(this);
    this.slot4 = this.slot4.bind(this);
    this.slot5 = this.slot5.bind(this);
    this.slot6 = this.slot6.bind(this);
    this.slot7 = this.slot7.bind(this);
    this.slot8 = this.slot8.bind(this);
    this.slot9 = this.slot9.bind(this);
  }

  componentWillMount() {
    GameStore.on("stopgame", () => {
      //this.setState({ bidUpdated: false, winningNumber: GameStore.getWinningNumber() }, function () {
      this.setState({ luckyNumber: parseInt(GameStore.getWinningNumber()) }, () => {
        this.startGame()
      });
    })

    this.setState({
      hideResetButton: true,
      hideSpinButton: true,
      disabledButton: true,
    }, () => this.rotateBallInfinity());
  }

  componentDidMount() {
    //const random = Math.floor(Math.random() * (36 - 0)) + 0;
    //this.setState({ luckyNumber: random });
    //let currentN = this.state.currentNumber;
    //currentN.push(this.state.luckyNumber);

    TweenMax.to("#plate", 3,{
      rotation: 360,
      repeat: -1,
      ease: Linear.easeNone
    });

    TweenMax.to("#data", 3, {
      rotation: -360,
      repeat: -1,
      ease: Linear.easeNone
    });
  }

  startGame() {
    
    // set the luckyNumber

    //var random = 2;
    
    let red = this.state.red;
    let black = this.state.black;
    
    let luckyNumber = this.state.luckyNumber;
    let self = this;
    let timer = self.state.timer;
    //this.setState({ luckyNumber: random });
    let currentN = this.state.currentNumber;
    currentN.push(luckyNumber);
    this.setState({ getCurrentNumber: currentN[currentN.length - 1] });
    //getCurrentN = this.state.getCurrentNumber;
    let getCurrentN = luckyNumber;
    console.log(getCurrentN);
    this.rotateBall();

    /* change buttons
     When spin button is clicked do the following:
    - hide spin butto n
    - show reset button
    - dusable reset button to prevent further clicking
    

    this.setState({
      hideResetButton: false,
      hideSpinButton: true,
      disabledButton: true
    });
*/
    
    // change mask default text after set timer
    setTimeout(function () {
      self.setState({ maskDefault: GameStore.getTotalBet() });
    }, timer / 2);

    
    //setTimeout(function(){GameStore.closeRoulette(getCurrentN);}, 30000);
    

    setTimeout(function () {
      // after 9000 seconds re-enable reset button to start new game
      //self.setState({
      //  disabledButton: false
      //});

      // hide maskDfault text
      self.setState({ maskDefault: "" });

      // reveal result with animation spin
      TweenMax.fromTo(
        "#result",
        0.8,
        { transform: "rotateY(180deg)" },
        { transform: "rotateY(0deg)" }
      );

      //let getCurrentN = this.state.getCurrentNumber;

      
      // reveal luckyNumber
      self.setState({ revealLuckyNumber: true, hideBack:false });

      // show luckyNumber, slot and color text
      if (red.includes(getCurrentN)) {
        self.setState({ slotColorText: "red", slotColor: "red" });
      } else if (black.includes(getCurrentN)) {
        self.setState({ slotColorText: "black", slotColor: "black" });
      } else {
        self.setState({ slotColorText: "green", slotColor: "green" });
      }

      
    }, timer);
    
  }

  resetGame() {
    /*  Regrading Buttons
    When reset button is clicked do the following:
    - hide reset button
    - show spin button
    - show maskDefault text
    - hide slotcolor text
    - slot color and text
    - hide luckyNumber
    */

    TweenMax.fromTo(
      "#result",
      0.8,
      { transform: "rotateY(0deg)" },
      { transform: "rotateY(180deg)" }
    );

    this.setState({
      hideResetButton: true,
      hideSpinButton: false,
      maskDefault: "Bets",
      slotColorText: null,
      slotColor: null,
      revealLuckyNumber: false
    });
  }

  rotateBall() {
    let luckyNumber = this.state.luckyNumber;
    switch (luckyNumber) {
      case 0:
        this.slot0();
        break;

      case 1:
        this.slot1();
        break;

      case 2:
        this.slot2();
        break;

      case 3:
        this.slot3();
        break;

      case 4:
        this.slot4();
        break;

      case 5:
        this.slot5();
        break;

      case 6:
        this.slot6();
        break;

      case 7:
        this.slot7();
        break;

      case 8:
        this.slot8();
        break;

      case 9:
        this.slot9();
        break;

      default:
        break;
    }
  }

  rotateBallInfinity() {
    let tl = new TimelineMax();
    let ball = document.getElementById("ball");

    tl.fromTo(
      ball,
      1,
      { rotation: 500 },
      { rotation: -500, repeat: 700000, ease: Linear.easeNone }
    );
    tl.to(ball, 1, { transform: `rotateZ(${this.state.spins.slot0}deg)` });
  }

  slot0() {
    let tl = new TimelineMax();
    let ball = document.getElementById("ball");

    tl.fromTo(
      ball,
      1,
      { rotation: 500 },
      { rotation: -500, repeat: 7, ease: Linear.easeNone }
    );
    tl.to(ball, 1, { transform: `rotateZ(${this.state.spins.slot0}deg)` });
  }

  slot1() {
    let tl = new TimelineMax();
    let ball = document.getElementById("ball");

    tl.fromTo(
      ball,
      1,
      { rotation: 500 },
      { rotation: -500, repeat: 7, ease: Linear.easeNone }
    );
    tl.to(ball, 1, { transform: `rotateZ(${this.state.spins.slot1}deg)` });
  }

  slot2() {
    let tl = new TimelineMax();
    let ball = document.getElementById("ball");

    tl.fromTo(
      ball,
      1,
      { rotation: 500 },
      { rotation: -500, repeat: 7, ease: Linear.easeNone }
    );
    tl.to(ball, 1, { transform: `rotateZ(${this.state.spins.slot2}deg)` });
  }

  slot3() {
    let tl = new TimelineMax();
    let ball = document.getElementById("ball");

    tl.fromTo(
      ball,
      1,
      { rotation: 500 },
      { rotation: -500, repeat: 7, ease: Linear.easeNone }
    );
    tl.to(ball, 1, { transform: `rotateZ(${this.state.spins.slot3}deg)` });
  }

  slot4() {
    let tl = new TimelineMax();
    let ball = document.getElementById("ball");

    tl.fromTo(
      ball,
      1,
      { rotation: 500 },
      { rotation: -500, repeat: 7, ease: Linear.easeNone }
    );
    tl.to(ball, 1, { transform: `rotateZ(${this.state.spins.slot4}deg)` });
  }

  slot5() {
    let tl = new TimelineMax();
    let ball = document.getElementById("ball");

    tl.fromTo(
      ball,
      1,
      { rotation: 500 },
      { rotation: -500, repeat: 7, ease: Linear.easeNone }
    );
    tl.to(ball, 1, { transform: `rotateZ(${this.state.spins.slot5}deg)` });
  }

  slot6() {
    let tl = new TimelineMax();
    let ball = document.getElementById("ball");

    tl.fromTo(
      ball,
      1,
      { rotation: 500 },
      { rotation: -500, repeat: 7, ease: Linear.easeNone }
    );
    tl.to(ball, 1, { transform: `rotateZ(${this.state.spins.slot6}deg)` });
  }

  slot7() {
    let tl = new TimelineMax();
    let ball = document.getElementById("ball");

    tl.fromTo(
      ball,
      1,
      { rotation: 500 },
      { rotation: -500, repeat: 7, ease: Linear.easeNone }
    );
    tl.to(ball, 1, { transform: `rotateZ(${this.state.spins.slot7}deg)` });
  }

  slot8() {
    let tl = new TimelineMax();
    let ball = document.getElementById("ball");

    tl.fromTo(
      ball,
      1,
      { rotation: 500 },
      { rotation: -500, repeat: 7, ease: Linear.easeNone }
    );
    tl.to(ball, 1, { transform: `rotateZ(${this.state.spins.slot8}deg)` });
  }

  slot9() {
    let tl = new TimelineMax();
    let ball = document.getElementById("ball");

    tl.fromTo(
      ball,
      1,
      { rotation: 500 },
      { rotation: -500, repeat: 7, ease: Linear.easeNone }
    );
    tl.to(ball, 1, { transform: `rotate(${this.state.spins.slot9}deg)` });
  }

  backClicked(){
    this.props.returnBack()
  }

    render() {
    return (
      <Wrapper>
        {/*JSON.stringify(this.state.currentNumber)*/}
        <Main>
          {/***********************      
           BUTTONS SECTION 
           **********************/}
          <Stopwatch>
          {Stopwatch}
          </Stopwatch>
           <SpinButton
            hide={this.state.hideSpinButton} //hides spin button
            type="button"
            id="spin"
            onClick={this.startGame} // start game on click
          >
            <ButtonLabel>Spin</ButtonLabel>
          </SpinButton>

          <ResetButton
            disabled={this.state.disabledButton} //disable button on state
            hide={this.state.hideResetButton} //hides reset button
            onClick={this.resetGame} // reset game on click
            type="button"
            id="reset"
          >
            <ButtonLabel>New Game</ButtonLabel>
          </ResetButton>

          <SpinButton hide={this.state.hideBack} type="button" onClick={() => { this.backClicked() }}>
            <ButtonLabel>Return Back</ButtonLabel>
          </SpinButton>

          {/***********************      
           WHEEL SECTION 
           **********************/}
           <br>
            </br>
            <br>
            </br>
          <br>
          </br>
           
          <Plate id="plate">
            <Ball id="ball">•</Ball>

            <Inner id="inner">
              <Number id="number">
                <Pit id="pit">1</Pit>
              </Number>

              <Number id="number">
                <Pit id="pit">2</Pit>
              </Number>

              <Number id="number">
                <Pit id="pit">3</Pit>
              </Number>

              <Number id="number">
                <Pit id="pit">4</Pit>
              </Number>

              <Number id="number">
                <Pit id="pit">5</Pit>
              </Number>

              <Number id="number">
                <Pit id="pit">6</Pit>
              </Number>

              <Number id="number">
                <Pit id="pit">7</Pit>
              </Number>

              <Number id="number">
                <Pit id="pit">8</Pit>
              </Number>

              <Number id="number">
                <Pit id="pit">9</Pit>
              </Number>

              <Number id="number">
                <Pit id="pit">0</Pit>
              </Number>
            </Inner>

            {/***********************      
           RESULTS PREVIEW SECTION 
           **********************/}

            <Data id="data">
              <DataInner id="data-inner">
                <Mask id="mask">{this.state.maskDefault}</Mask>

                {/* Results Window*/}
                <Result slotColor={this.state.slotColor} id="result">
                  <ResultNumber id="result-number">
                    {this.state.revealLuckyNumber &&
                      this.state.getCurrentNumber}
                  </ResultNumber>
                  <ResultColor id="result-color">
                    {this.state.slotColorText}
                  </ResultColor>
                </Result>
              </DataInner>
            </Data>
          </Plate>
        </Main>
      </Wrapper>
    );
  }
}


