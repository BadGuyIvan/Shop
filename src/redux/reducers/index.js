import { combineReducers } from 'redux';

import filter from './filter';
import initialFilters from './initialFilter';
import orders from './orders'

const rootReducer = combineReducers({
    filter,
    initialFilters,
    orders
})

export default rootReducer;