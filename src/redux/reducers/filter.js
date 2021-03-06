import {
    GET_ALL_PRODUCT,
    CHANGED_CATEGORY,
    GET_PRODUCTS_BY_SEARCH, 
    PAGINATION,
    GET_PRODUCTS_BY_PRICE,
    CHANGED_SIZE_PAGE,
    FETCH_PROPS,
    ERROR
} from "../actions/constants";

export const initialState = {
    categories: [],
    search: null,
    pages: null,
    page: 1,
    sizePage: 8,
    products: [],
    props: [],
    calculateProps: [],
    price: {
        min: null,
        max: null
    },
    error: {}
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
        {
            // let props = action.payload.products.map(item => item.Props);
            // let propsId = action.payload.props.map(props => props.PropsId);
            // let uniqProps = _.uniqBy(props,'id');
            // let onlyItem = uniqProps.map(item => item.id);
            // console.log(_.chain(uniqProps).map('id').union(propsId)).value();
            // console.log(_.map(uniqProps,'id'));
            // console.log(onlyItem);
            // console.log(_.union(onlyItem,propsId));
            // console.log(uniqProps.filter(props => propsId.some(e => e !== props.id)));
            // const props = _.uniq(action.payload.products.props)
            console.log(action.payload)
            return {
                ...state,
                ...action.payload,
            }
        }
        break;
        case ERROR : {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}