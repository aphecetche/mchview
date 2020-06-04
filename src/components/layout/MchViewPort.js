import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import DeView from "../views/DeView";
import DePlaneView from "../views/DePlaneView";
import AllView from "../views/AllView";
import DebugView from "../views/DebugView";
import Display from "../views/Display";
import styles from "./mchviewport.css";

const NotFound = () => <h1>404... Boooh</h1>;
const MchViewPort = () => {
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let id = null;
  if (searchParams.has("deid") && searchParams.has("bending")) {
    id = {
      deid: searchParams.get("deid"),
      bending: searchParams.get("bending")
    };
  }

  return (
    <div className={styles.mchviewport}>
      <p>zobid={JSON.stringify(id)}</p>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/deplane?deid=500&bending=false" />}
        />
        <Route path="/deplane" render={() => <DePlaneView id={id} />} />
        <Route exact path="/de" component={DeView} />
        <Route exact path="/all/:a/:b" component={AllView} />
        <Route
          exact
          path="/debug"
          render={() => <DebugView id={{ deid: 501, bending: false }} />}
        />
        <Route exact path="/debug2" render={() => <DebugView id={id} />} />
        <Route exact path="/display" component={Display} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default MchViewPort;
