import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  FETCH_PRODUCT,
} from "../../constant/Action";
import Product from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return {
        availableProducts: action.products,
        userProducts: action.products.filter(
          (product) => product.ownerId === action.userId
        ),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id != action.id
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id != action.id
        ),
      };
    case ADD_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.concat(action.product),
        userProducts: state.userProducts.concat(action.product),
      };
    case EDIT_PRODUCT:
      const userProductIndex = state.userProducts.findIndex(
        (item) => item.id === action.data.id
      );
      if (userProductIndex < 0) return state;
      const updatedProduct = new Product(
        action.data.id,
        state.userProducts[userProductIndex].ownerId,
        action.data.title,
        action.data.imgUrl,
        action.data.description,
        state.userProducts[userProductIndex].price
      );
      const newUserProducts = [...state.userProducts];
      newUserProducts[userProductIndex] = updatedProduct;
      const newAvailableProducts = [...state.availableProducts];
      const availableProductIndex = state.availableProducts.findIndex(
        (item) => item.id === action.data.id
      );
      if (availableProductIndex >= 0)
        newAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        userProducts: newUserProducts,
        availableProducts: newAvailableProducts,
      };
    default:
      return state;
  }
};
