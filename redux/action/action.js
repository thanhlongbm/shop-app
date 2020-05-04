import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ORDER_ITEMS,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
} from "../../constant/Action";
import Product from "../../models/product";

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product: product,
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    id: id,
  };
};

export const orderItems = (orderData) => {
  return {
    type: ORDER_ITEMS,
    orderData: orderData,
  };
};

export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id: id,
  };
};

export const addProduct = (title, imgUrl, description, price) => {
  return {
    type: ADD_PRODUCT,
    product: new Product(
      new Date().toString(),
      "u1",
      title,
      imgUrl,
      description,
      price
    ),
  };
};

export const editProduct = (id, title, imgUrl, description) => {
  return {
    type: EDIT_PRODUCT,
    data: { id, title, imgUrl, description },
  };
};
