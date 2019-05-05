import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser, setCurrentAdmin } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";
import Roulette from "./components/roulette/Roulette";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import Calculator from "./components/calculator/Calculator";
import Universaldashboard from "./components/universaldashboard/Universaldashboard";
import Transferchips from  "./components/universaldashboard/Transferchips";
import Universal from "./components/auth/Universal";
import Game from "./components/Game";


import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  const isAdmin = localStorage.getItem("isAdmin");
  if(isAdmin !== undefined && isAdmin === "1"){
    // Set admin and isAuthenticated
    store.dispatch(setCurrentAdmin(decoded));
  }
  else{
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
  }
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current User Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {

  componentWillMount(){
    
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/admins/login" component={Universal} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/universdashboard"
                  component={Universaldashboard}
                />
                <PrivateRoute
                  exact
                  path="/transferchips"
                  component={Transferchips}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/roulette" component={Roulette} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/bet" component={Game} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/calculator" component={Calculator} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;