import axios from 'axios';
import { GET_CATEGORY, GET_PRODUCT_BY_CATEGORY, GET_PRODUCTS_BY_SEARCH } from './constants';

export const getCategory = () => {
    return dispatch => {
        return axios.get('/category')
            .then(res => {
                dispatch({
                    type: GET_CATEGORY,
                    payload: res.data
                })
            })
    }
}

export const getProductsByCategory = (category) => {
    return dispatch => {
        return axios.get(`/category/${category}`)
            .then(res => {
                dispatch({
                    type: GET_PRODUCT_BY_CATEGORY,
                    payload: res.data
                })
            })
    }
}

export const getProductsBySearch = (search) => {
    return dispatch => {
        return axios.get(`/search/${search}`)
            .then(res => {
                dispatch({
                    type: GET_PRODUCTS_BY_SEARCH,
                    payload: res.data
                })
            })
    }
}