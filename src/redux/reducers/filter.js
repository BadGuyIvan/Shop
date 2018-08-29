import {
    GET_ALL_PRODUCT,
    CHENGED_CATEGORY,
    GET_PRODUCTS_BY_SEARCH, 
    PAGINATION,
    GET_PRODUCTS_BY_PRICE,
    CHANGED_SIZE_PAGE
} from "../actions/constants";

export const initialState = {
    categories: [],
    search: null,
    pages: null,
    page: 1,
    sizePage: 4,
    products: [],
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
                pages: action.payload.pages,
                products: action.payload.products 
            }
        break;
        case CHENGED_CATEGORY: 
            return {
                ...state,
                pages: action.payload.pages,
                products: action.payload.products 
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
                sizePage: action.payload.sizePage,
                pages: action.payload.pages,
                page: action.payload.page,
                price: action.payload.price,
                products: [...action.payload.products]
            }
        case CHANGED_SIZE_PAGE:
            return {
                ...state,
                ...action.payload
            }
        break;
        default:
            return state;
    }
}