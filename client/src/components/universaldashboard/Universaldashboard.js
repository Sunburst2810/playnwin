import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import InputGroup from "../common/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import { getBids } from "../../actions/adminActions";
import { SetWinner } from "../../actions/CommonGameAction";
import Spinner from 'react-spinner-material';
import { getAdminProfile } from "../../actions/profileActions";
import {Gamestarted} from "../../actions/CommonGameAction";
import AdminStore from "../../stores/AdminStore";

class Universaldashboard extends Component {    
  constructor() {
    super();
    this.setWinningNumber.bind(this);
    this.state = {
      bets: {},
      isFetchPending: true,
      isGameRunning: true,
      winnerNumber: ""
    };
  }

  populateUserBids(){
    getBids().then(res => {
      let data = {};
      if (res.status === 200) {
        data = res.data;

        if (data === -1) {
          this.setState({
            isFetchPending: false,
            isGameRunning: false
          });
        }
        else {
          this.setState({
            bets: data,
            isFetchPending: false
          });
        }
      }
    }).catch(err => {
      this.setState({
        isFetchPending: false
      });
    });
  }

  componentDidMount() {

    let response = Gamestarted();
    console.log(response);

    if(response === 1){
      this.populateUserBids();
    }
  }

  componentWillMount(){
    AdminStore.on("change",() => { this.populateUserBids() })
    this.props.getAdminProfile();
    this.populateUserBids();
  }

  setWinningNumber(){
    SetWinner(this.state.winnerNumber);

    //Re-render dom to denote previous slot completion.
    setTimeout(()=>this.populateUserBids(), 1500);
  }

  render() {
    var bets = this.state.bets;
    return (
      <Jumbotron>
        <h1 className="text-center"> Admin Dashboard </h1>
        <br />
        <Container>
          <Row>
             <Col xs={12} md={12}>
              {this.state.isFetchPending ? (
                <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
              ) : !this.state.isGameRunning ? ("Sorry!!! no game running") : (
                <div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Numbers</th>
                        <th>BET Value</th>
                        <th>Possible Win</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Object.keys(bets).map(function (el, index) {
                          return (
                            <tr key={index}>
                              <td>{el}</td>
                              <td>{bets[el].bid}</td>
                              <td>{bets[el].possibleWin}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                  <input type="text" pattern="[0-9]" maxLength="1" value={this.state.winnerNumber} onChange={(e) => this.setState({ winnerNumber: e.target.value })} className="form-control" />
                  <Button variant="primary" onClick={this.setWinningNumber.bind(this)}>Set Winning Number</Button>
                </div>
              )
              }
            </Col>
          </Row>
          {/* <Col xs={4} md={4}>
              Roulette Control
              <div>
                <form onSubmit={this.onSubmit}>
                  <InputGroup
                    placeholder="Input Number"
                    name="number"
                    value={this.state.number}
                    onChange={this.onChange}
                    //error={errors.number}
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </Col> */}
        </Container>
      </Jumbotron>
    );
  }
}
//export default Universaldashboard;
/*
Universaldashboard.propTypes = {
  bets: PropTypes.object.isRequired,
  isFetchPending: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bets: state.bets
});
*/

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAdminProfile }
)(Universaldashboard);

//export default connect()(withRouter(Universaldashboard));
