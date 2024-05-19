import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./navbar";
import Books from "./books";
import Home from "./home";
import Settings from "./settings";
class MainComponent extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Navbar />
                <Switch>
                  <Route path="/books" component={Books} />
                  <Route path="/settings" component={Settings} />
                  <Route path="/addedbooks/:chn" component={Books} />
                  <Route path="/home" component={Home} />
                  <Redirect from="/" to="/home" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default MainComponent;
