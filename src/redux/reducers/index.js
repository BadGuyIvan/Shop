import { combineReducers } from 'redux';

import filter from './filter';
import initialState from './initialState';

const rootReducer = combineReducers({
    filter,
    initialState
})

export default rootReducer;