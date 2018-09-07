import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';

import App from './components/App/App';
import { Provider } from 'react-redux'
import history from './redux/history';
import store from "./redux/store";

import { initialState, getAllProduct } from './redux/actions'

store.dispatch(initialState());
// store.dispatch(getAllProduct());

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
    ,document.getElementById('root'))