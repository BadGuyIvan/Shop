import { 
    INITIAL_FILTERS
} from "../actions/constants";

export default function(state = {categories: [], price: {}, props: []},action) {
    switch(action.type){
        case INITIAL_FILTERS :
            return {
                ...state,
                categories: action.payload.category,
                price: action.payload.price,
                props: action.payload.props
            }
        break;
        default :
            return state;
    }
}
