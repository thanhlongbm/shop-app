import { ORDER_ITEMS, FETCH_ORDERS } from "../../constant/Action";
const initialState = [];

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_ITEMS:
      return state.concat(action.orderData);
    case FETCH_ORDERS:
      return action.orderData;
    default:
      return state;
  }
};
