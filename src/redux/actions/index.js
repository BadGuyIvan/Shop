import axios from 'axios';
import _ from "lodash";

import {
    GET_ALL_PRODUCT, 
    CHANGED_CATEGORY, 
    GET_PRODUCTS_BY_SEARCH, 
    PAGINATION,
    GET_PRODUCTS_BY_PRICE,
    CHANGED_SIZE_PAGE,
    INITIAL_FILTERS,
    FECTH_PRODUCT_TO_ORDER,
    DELETE_PRODUCT_FROM_ORDER,
    FETCH_PROPS,
    ADD_QT,
    DISCARD_QT,
    DELETE_ORDER
} from './constants';

import store from "../store";

export const getAllProduct = () => {
    return dispatch => {
        return axios.get('/products', {
            params: {
                ..._.pick(store.getState().filter, ['categories', 'search', 'page', 'sizePage', 'price'])
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
                ..._.pick(store.getState().filter, ['categories', 'search', 'page', 'sizePage', 'price']),
                categories,
                page: 1
            }
        })
            .then(res => {
                dispatch({
                    type: CHANGED_CATEGORY,
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
                ..._.pick(store.getState().filter, ['categories', 'search', 'page', 'sizePage', 'price']),
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
                ..._.pick(store.getState().filter, ['categories', 'search', 'page', 'sizePage', 'price']),
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
                ..._.pick(store.getState().filter, ['categories', 'search', 'page', 'sizePage', 'price']),
                page: 1,
                sizePage
            }
        })
        .then(res => 
            {
                dispatch({
                type: CHANGED_SIZE_PAGE,
                payload: {
                    sizePage,
                    page: 1,
                    pages: res.data.pages,
                    products: res.data.products
                }
            })
        })
        .catch(error => console.log(error))
    }
}

export const getProductsByPrice = ( min, max) => {
    return dispatch => {
        return axios.get('/products', {
            params: {
                ..._.pick(store.getState().filter, ['categories', 'search', 'page', 'sizePage', 'price']),
                price: {
                    min,
                    max
                }               
            }
        })
            .then(res => {
                dispatch({
                    type: GET_PRODUCTS_BY_PRICE,
                    payload: {
                        price: {
                            min,
                            max
                        },
                        pages: res.data.pages,
                        products: res.data.products
                    }
                })
            })
    }
}

export const initialFilters = () => {
    return dispatch => {
        return axios.get('/initialFilters')
            .then(res => {
                dispatch({
                    type: INITIAL_FILTERS,
                    payload: {
                        category: res.data.categories,
                        price: res.data.price,
                        props: res.data.props
                    }
                })
            })
    }
}

export const fetchProductToOrder = ({id,name,price}) => {
    return {
        type: FECTH_PRODUCT_TO_ORDER,
        payload: {
            id,
            name,
            price
        }
    }
}

export const deleteProductFromOrder = (id) => {
    return {
        type: DELETE_PRODUCT_FROM_ORDER,
        payload: id
    }
}

export const addQt = (id) => {
    return {
        type: ADD_QT,
        payload: {
            id
        }
    }
}

export const discardQt = (id) => {
    return {
        type: DISCARD_QT,
        payload: {
            id
        }
    }
}

export const deleteOrder = () => {
    return {
        type: DELETE_ORDER,
        payload: {
            product: [],
            total: 0
        }
    }
}

export const fetchProps = (props) => {
    let wrapperProps;
    if(props.length !== 0){
        wrapperProps = [[...props]];
    } else {
        wrapperProps = [];
    }
    return dispatch => {
        return axios.get('/products', {
            params: {
                ..._.pick(store.getState().filter, 
                ['categories', 'search', 'page', 'sizePage', 'price','props']),
                page: 1,
                props: wrapperProps      
            }
        })
            .then(res => {
                dispatch({
                    type: FETCH_PROPS,
                    payload: {
                        props,
                        page: 1,
                        pages: res.data.pages,
                        products: res.data.products
                    }
                })
            })
    }
}

// export const calculateCountProps = (props) => {
//     return {
//         type: 
//     }
// }