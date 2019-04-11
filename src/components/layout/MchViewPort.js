import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import DEView from "../views/DEView";
import AllView from "../views/AllView";

const NotFound = () => <h1>404... Boooh</h1>;
const MchViewPort = () => {
  return (
    <div className="mchviewport">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/de" />} />
          <Route exact path="/de" component={DEView} />
          <Route exact path="/all" component={AllView} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default MchViewPort;
