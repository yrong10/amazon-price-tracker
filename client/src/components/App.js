import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import { Provider } from "react-redux";

import store from "../store";
import Home from "./Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ItemTable from "./items/ItemTable";
import ItemGetDetails from "./items/ItemGetDetails";
import ItemCreate from "./items/ItemCreate";
import ItemEdit from "./items/ItemEdit";
import LogedOutRoute from "./private-route/LogedOutRoute";
import LogedInRoute from "./private-route/LogedInRoute";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <Provider store={store}>
          <Router>
            <div>
              <Switch>
                <LogedOutRoute exact path="/" component={Home} />
                <LogedOutRoute exact path="/register" component={Register} />
                <LogedOutRoute exact path="/login" component={Login} />
                <LogedInRoute exact path="/dashboard" component={ItemTable} />
                <LogedInRoute
                  path="/dashboard/new"
                  exact
                  component={ItemGetDetails}
                />
                <LogedInRoute
                  path="/dashboard/new/add"
                  exact
                  component={ItemCreate}
                />
                <LogedInRoute
                  exact
                  path="/dashboard/edit/:id"
                  component={ItemEdit}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
