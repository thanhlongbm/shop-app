import { createStore, combineReducers, applyMiddleware } from "redux";
import { productReducer } from "./reducer/productReducer";
import { cartReducer } from "./reducer/cartReducer";
import { orderReducer } from "./reducer/orderReducer";
import { authReducer } from "./reducer/authReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
