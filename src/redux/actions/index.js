import axios from 'axios';
import {
    GET_ALL_PRODUCT, 
    CHENGED_CATEGORY, 
    GET_PRODUCTS_BY_SEARCH, 
    PAGINATION,
    GET_PRODUCTS_BY_PRICE,
    CHANGED_SIZE_PAGE,
    INITIAL_STATE
} from './constants';

import store from "../store";

export const getAllProduct = () => {
    return dispatch => {
        return axios.get('/products', {
            params: {
                ...store.getState().filter,
                products: []
            }
        })
            .then(res => {
                dispatch({  
                    type: GET_ALL_PRODUCT,
                    payload: {
                        pages: res.data.pages,
                        products: res.data.products
                    }
                })
            })
    }
}

export const changedCategory = (categories) => {
    return dispatch => {
        return axios.get(`/products`, {
            params: {
                ...store.getState().filter,
                products: [],
                categories
            }
        })
            .then(res => {
                dispatch({
                    type: CHENGED_CATEGORY,
                    payload: {
                        categories,
                        page: 1,
                        pages: res.data.pages,
                        products: res.data.products
                    }
                })
            })
    }
}

export const getProductsBySearch = (search) => {
    return dispatch => {
        return axios.get(`/products`,{
            params: {
                ...store.getState().filter,
                products: [],
                search
            }
        })
            .then(res => {
                dispatch({
                    type: GET_PRODUCTS_BY_SEARCH,
                    payload: {
                        search,
                        page: 1,
                        pages: res.data.pages,
                        products: res.data.products
                    }
                })
            })
    }
}

export const Pagination = (page) => {
    return dispatch => {
        return axios.get('/products',{
            params: {
                ...store.getState().filter,
                products: [],
                page
            }
        })
            .then(res => {
                dispatch({
                    type: PAGINATION,
                    payload: {
                        page,
                        products: res.data.products
                    }
                })
            })
    }
}

export const changedSizePage = (sizePage) => {
    return dispatch => {
        return axios.get('/products',{
            params: {
                ...store.getState().filter,
                products: [],
                sizePage
            }
        })
        .then(res => 
            {
                dispatch({
                type: CHANGED_SIZE_PAGE,
                payload: {
                    pages: res.data.pages,
                    products: res.data.products
                }
            })
        })
        .catch(error => console.log(error))
    }
}

// export const getProductsByPrice = ({ category, page, sizePage, min, max}) => {
//     console.log(`min ${min} max ${max}`);
//     return dispatch => {
//         return axios.get('/products', {
//             params: {
//                 category,
//                 page,
//                 sizePage,
//                 price: JSON.stringify({
//                     min,
//                     max
//                 })
//                 // minPrice: min,
//                 // maxPrice: max                
//             }
//         })
//             .then(res => {
//                 dispatch({
//                     type: GET_PRODUCTS_BY_PRICE,
//                     payload: {
//                         category,
//                         page,
//                         sizePage,
//                         price: {
//                             min,
//                             max
//                         },
//                         pages: res.data.pages,
//                         products: res.data.product
//                     }
//                 })
//             })
//     }
// }

export const initialState = () => {
    return dispatch => {
        return axios.get('/initialState')
            .then(res => {
                dispatch({
                    type: INITIAL_STATE,
                    payload: {
                        category: res.data.category,
                        price: res.data.price
                    }
                })
            })
    }
}
