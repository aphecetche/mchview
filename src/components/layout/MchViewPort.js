import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import DeView from "../views/DeView";
import DePlaneView from "../views/DePlaneView";
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
          <Route exact path="/" render={() => <Redirect to="/deplane" />} />
          <Route exact path="/deplane" component={DePlaneView} />
          <Route exact path="/de" component={DeView} />
          <Route exact path="/all" component={AllView} />
          <Route
            exact
            path="/debug"
            render={() => <DebugView id={{ deid: 501, bending: false }} />}
          />
          <Route exact path="/display" component={Display} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default MchViewPort;
