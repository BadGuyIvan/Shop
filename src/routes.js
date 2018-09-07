import React from 'react';
import { Route, Switch } from 'react-router';
import App from "./components/App/App";

const Page404 = () => (
    <h1>404</h1>
)

const routes = (
    <div>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route component={Page404}/>
        </Switch>
    </div>
)

export default routes;