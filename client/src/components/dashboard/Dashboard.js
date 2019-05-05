import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;


    const header = {
      display: 'inline-block', 
      width: '100%'
    }

    let dashboardContent;

    dashboardContent = (
      <div style={header}>
        <p className="lead text-muted">Welcome {user.name}</p>
        <div>
          <Link to="/roulette" className="btn btn-lg btn-danger">
            Play
          </Link>
        </div>
        <div>
          <Link to="/create-profile" className="btn btn-lg btn-danger">
            Create Profile
          </Link>
        </div>
        <br />
        <br />
        <div>
          <Link to="/bet" className="btn btn-lg btn-info">
            Place Bet
          </Link>
        </div>
        <div>
          <Link to="/calculator" className="btn btn-lg btn-info">
            Betting
          </Link>
        </div>
      </div>
    );

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
