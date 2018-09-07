import React, { Component, Fragment } from 'react';
import CssBaseLine from "@material-ui/core/CssBaseline";
import { Route, Switch } from 'react-router';
import NavBar from "../NavBar/NavBar";

import Orders from '../Orders/Orders';
import MainContent from '../MainContent/MainContent';

const Page404 = () => (
    <h1>404</h1>
)

class App extends Component {
    render(){
        return (
            <Fragment>               
                <CssBaseLine/>
                <NavBar/>
                    <Switch>
                        <Route exact path="/" component={MainContent}/>
                        <Route path="/orders" component={Orders}/>
                        <Route component={Page404}/>
                    </Switch>                
            </Fragment>
        )
    }
}

export default (App);