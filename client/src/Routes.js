import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./containers/Login";
import Register from "./containers/Register"
import Admin from "./containers/Admin";
import Profile from "./containers/Profile";
import AddCar from "./containers/AddCar";

const ReactRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/admin" component={Admin}/>
                <Route path="/profile" component={Profile} />
                <Route path="/addCar" component={AddCar} />
            </Switch>
        </Router>
    );
}

export default ReactRouter;