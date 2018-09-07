import { combineReducers } from 'redux';

import filter from './filter';
import initialState from './initialState';
import orders from './orders'

const rootReducer = combineReducers({
    filter,
    initialState,
    orders
})

export default rootReducer;