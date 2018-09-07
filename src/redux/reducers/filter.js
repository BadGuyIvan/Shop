import {
    GET_ALL_PRODUCT,
    CHANGED_CATEGORY,
    GET_PRODUCTS_BY_SEARCH, 
    PAGINATION,
    GET_PRODUCTS_BY_PRICE,
    CHANGED_SIZE_PAGE,
    FETCH_PROPS,
} from "../actions/constants";

export const initialState = {
    categories: [],
    search: null,
    pages: null,
    page: 1,
    sizePage: 4,
    products: [],
    props: [],
    price: {
        min: null,
        max: null
    }
}

export default function(state = initialState, action ){
    switch(action.type){
        case GET_ALL_PRODUCT: 
            return {
                ...state,
                ...action.payload
            }
        break;
        case CHANGED_CATEGORY: 
            return {
                ...state,
                ...action.payload
            }
        break;
        case GET_PRODUCTS_BY_SEARCH:
            return {
                ...state,
                ...action.payload
            }
        break;
        case PAGINATION :
            return {
                ...state,
                page: action.payload.page,
                products: action.payload.products
            }
        break;
        case GET_PRODUCTS_BY_PRICE :
            return {
                ...state,
                ...action.payload
            }
        case CHANGED_SIZE_PAGE:
            return {
                ...state,
                ...action.payload
            }
        break;
        case FETCH_PROPS: 
            return {
                ...state,
                page: action.payload.page,
                pages: action.payload.pages,
                products: action.payload.products
            }
        break;
        default:
            return state;
    }
}