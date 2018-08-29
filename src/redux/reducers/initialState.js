import { INITIAL_STATE } from "../actions/constants";

export default function(state = {categories: [], price: {}},action) {
    switch(action.type){
        case INITIAL_STATE :
            return {
                categories: action.payload.category,
                price: action.payload.price
            }
        break;
        default :
            return state;
    }
}
