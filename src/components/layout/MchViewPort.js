import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import DEView from "../views/DEView";
import DEPlaneView from "../views/DEPlaneView";
import AllView from "../views/AllView";
import DebugView from "../views/DebugView";
import Display from "../views/Display";
import styles from "./mchviewport.css";

const NotFound = () => <h1>404... Boooh</h1>;
const MchViewPort = () => {
  return (
    <div className={styles.mchviewport}>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/de" />} />
          <Route exact path="/deplane" component={DEPlaneView} />
          <Route exact path="/de" component={DEView} />
          <Route exact path="/all" component={AllView} />
          <Route exact path="/debug" component={DebugView} />
          <Route exact path="/display" component={Display} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default MchViewPort;
