import { GET_PRODUCT_BY_CATEGORY, GET_PRODUCTS_BY_SEARCH } from "../actions/constants";

export default function(state = {products: []}, action ){
    switch(action.type){
        case GET_PRODUCT_BY_CATEGORY :
            return {...state, products: [...action.payload] }
        break;
        case GET_PRODUCTS_BY_SEARCH: 
            return {...state, products: [...action.payload]}
        default:
            return state;
    }
}