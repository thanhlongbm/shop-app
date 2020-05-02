import {createStore , combineReducers} from 'redux'
import { productReducer } from './reducer/productReducer';
import { cartReducer } from './reducer/cartReducer';
import { orderReducer } from './reducer/orderReducer';

const rootReducer = combineReducers({
    product : productReducer,
    cart : cartReducer,
    order : orderReducer
});

export const store = createStore(rootReducer);