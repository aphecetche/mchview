import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import DeView from "../views/DeView";
import DePlaneView from "../views/DePlaneView";
import AllView from "../views/AllView";
import DebugView from "../views/DebugView";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    width: "100%",
    height: "100%"
  }
});
const NotFound = () => <h1>404... Boooh</h1>;

const MchViewPort = () => {
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let id = null;
  if (searchParams.has("deid")) {
    id = {
      deid: searchParams.get("deid")
    };
  }
  if (searchParams.has("deid") && searchParams.has("bending")) {
    id = {
      deid: searchParams.get("deid"),
      bending: searchParams.get("bending") === "true"
    };
  }
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/deplane?deid=500&bending=false" />}
        />
        <Route path="/deplane" render={() => <DePlaneView id={id} />} />
        <Route exact path="/de" render={() => <DeView id={id} />} />
        <Route exact path="/all/:a/:b" component={AllView} />
        <Route exact path="/debug" render={() => <DebugView />} />
        <Route exact path="/debug2" render={() => <DebugView id={id} />} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default MchViewPort;
