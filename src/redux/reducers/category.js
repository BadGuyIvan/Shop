import { GET_CATEGORY } from "../actions/constants";

export default function(state = {categories: []}, action ){
    switch(action.type){
        case GET_CATEGORY :
            return {...state, categories: [...action.payload], };
        break;
        default:
            return state;
    }
}