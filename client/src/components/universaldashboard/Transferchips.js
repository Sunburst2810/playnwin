import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import * as Actions from "../../actions/adminActions";
import Spinner from 'react-spinner-material';
import AdminStore from "../../stores/AdminStore";
import autoBind from "react-autobind";

const initialState = {
  users: {},
  isFetchPending: true,
  Balance: []
};

class Transferchips extends Component {    
  constructor(props) {
    super(props);
    this.state = initialState;
    autoBind(this);
    //this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){
    AdminStore.on("change",() => { this.setState({users: AdminStore.returnUsers(), isFetchPending:false }); })
    AdminStore.on("manualordersuccess",() => { 
      let response = AdminStore.returnManualOrderStatus();
      if(response){
        this.setState({
          initialState
        }, ()=> {this.FetchUsers()});
      }
    })
  }

  FetchUsers(){
    Actions.getUsers();
  }

  componentDidMount() {
    this.FetchUsers();
  }

  onChange(e) {
    /*
    let users = {...this.state.users};
    if(e.target.value !== ''){
      users[index].Balance = parseInt(e.target.value);
    }
    
    this.setState({users})
    */

    let input = parseInt(e.target.value)
    if(isNaN(input)){
      alert("Only numbers are allowed");
      e.preventDefault();
      return;
    }

    let Balance = this.state.Balance;

    let existingBalance = this.state.users.find(x=> x._id === e.target.name).Balance;
    if(Balance.length === 0){
      let bal = {_id: e.target.name, Balance: input + existingBalance}
      console.log(this.state.users[e.target.name]);
      Balance.push(bal);
    }else{
      let index = Balance.findIndex(x => x._id == e.target.name);
      let data = {_id: e.target.name, Balance: input + existingBalance}
     
      if(index === -1){
        Balance.push(data);
      }else{
        Balance[index] = data;
      }
    }

    this.setState({ Balance });
  }

  onClick(e) {
    this.setState({isFetchPending: true}, ()=> {
      Actions.transferChips(this.state.Balance);
    });
  }


  render() {
    var users = this.state.users;
    return (
      <Jumbotron>
        <h1 className="text-center"> Transfer Chips </h1>
        <br />
        <Container>
          <Row>
             <Col xs={12} md={12}>
             {this.state.isFetchPending ? (
                <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} /> 
               ) : (
                <table className="table table-bordered">
                <thead>
                  <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th>Chip Transfer</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Object.keys(users).map(function(el, index) {
                      return(
                        <tr key={index}>
                          <td>{users[el].Name}</td>
                          <td>{users[el].Email}</td>
                          <td>{users[el].Balance}</td>
                          <td>
                              <input type="text" 
                              placeholder="Enter Chips To Transfer"
                              name={users[el]._id}
                              //value={[users[el]._id].Balance}
                              onChange={this.onChange} />
                          </td></tr>
                      );
                    },this)
                  }
                </tbody>
                </table>
                
               )
             }
             
            <input type="button" onClick={this.onClick} value="Transfer Chips" className="btn btn-info btn-block mt-4" />
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}
//export default Transferchips;
/*
Universaldashboard.propTypes = {
  bets: PropTypes.object.isRequired,
  isFetchPending: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bets: state.bets
});
*/
export default connect()(withRouter(Transferchips));
