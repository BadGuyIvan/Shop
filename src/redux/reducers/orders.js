import { 
    FECTH_PRODUCT_TO_ORDER,
    DELETE_PRODUCT_FROM_ORDER,
    ADD_QT,
    DISCARD_QT,
    DELETE_ORDER,
    ADDRESS_LATLNG
 } from "../actions/constants";
import _ from "lodash";

const initialState = {
    product: localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')): [],
    total: localStorage.getItem('total') ? localStorage.getItem('total'): 0,
    address_latLng: localStorage.getItem('latlnt') ? JSON.parse(localStorage.getItem('latlnt')): [],
    address: localStorage.getItem('address') ? localStorage.getItem('address'): '',
    email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
    isAddressValid: localStorage.getItem('isAddressValid') ? localStorage.getItem('isAddressValid'): false
}

export default function(state = initialState,action) {
    switch(action.type){
        case FECTH_PRODUCT_TO_ORDER :
        {
            let product = state.product;
            if(_.some(state.product, action.payload)){
                let indexProduct = _.findIndex(state.product, product => product.id === action.payload.id);
                let qt = state.product[indexProduct].qt;
                let modifyProduct =  _.assignIn(action.payload, {...action.payload, qt: ++qt });
                product[indexProduct] = modifyProduct;
            } else {
                product = _.concat(product, {...action.payload, qt: 1})
            }
                const total = _.reduce(product,(sum,product) => {
                return sum += product.price * product.qt
            },0)
            return {
                ...state,
                product,
                total,
            }
        }
        break;
        case DELETE_PRODUCT_FROM_ORDER : 
            {
                let product = state.product;
                let total = state.total;
                let indexProduct = _.findIndex(state.product, product => product.id === action.payload);
                product = _.filter(product, p => p.id !== action.payload)
                total -= state.product[indexProduct].price * state.product[indexProduct].qt;
                return {
                    ...state,
                    product,
                    total
                }
            }
        break;
        case ADD_QT:
            {
                let product = state.product;
                let indexProduct = _.findIndex(state.product, product => product.id === action.payload.id);
                let qt = state.product[indexProduct].qt;;
                let modifyProduct =  _.assignIn(product[indexProduct], {qt: ++qt });
                product[indexProduct] = modifyProduct;
                const total = _.reduce(product,(sum,product) => {
                    return sum += product.price * product.qt
                },0)
                return {
                    ...state,
                    product,
                    total
                }
            }
        break;
        case DISCARD_QT: 
            {
                let indexProduct = _.findIndex(state.product, product => product.id === action.payload.id);
                if(state.product[indexProduct].qt === 1){
                    return state;
                } else {
                    let product = state.product;
                    let qt = state.product[indexProduct].qt;
                    let modifyProduct =  _.assignIn(product[indexProduct], {qt: --qt });
                    product[indexProduct] = modifyProduct;
                    const total = _.reduce(product,(sum,product) => {
                        return sum += product.price * product.qt
                    },0)
                    return {
                        ...state,
                        product,
                        total
                    }
                }
            }
        break;
        case DELETE_ORDER: {
            return {
                ...state,
                ...action.payload
            }
        }
        break;
        case ADDRESS_LATLNG: {
            return {
                ...state,
                ...action.payload
            }
        }
        default :
            return state;
    }
}
