import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ORDER_ITEMS,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  FETCH_PRODUCT,
  FETCH_ORDERS,
  LOGIN,
  SIGNUP,
  LOGOUT,
} from "../../constant/Action";
import Product from "../../models/product";
import { AsyncStorage } from "react-native";

let timer;

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

export const orderItems = ({ items, totalPrice }) => {
  return async (dispatch, getState) => {
    const auth = getState().auth;
    var moment = require("moment");
    const date = moment().format("MMMM Do YYYY, hh:mm");
    await fetch(
      `https://shop-app-70eee.firebaseio.com/orders/${auth.userId}.json?auth=${auth.token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          totalPrice,
          date,
        }),
      }
    ).then(async (response) => {
      if (!response.ok) throw new Error("Some thing went wrong!!!");
      else {
        const data = await response.json();
        dispatch({
          type: ORDER_ITEMS,
          orderData: {
            items,
            totalPrice,
            key: data.name,
            date,
          },
        });
      }
    });
  };
};

export const fetchOrder = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    await fetch(`https://shop-app-70eee.firebaseio.com/orders/${userId}.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Some thing went wrong!!!");
        return response.json();
      })
      .then((data) => {
        const orderData = [];
        for (const key in data) {
          orderData.push({
            key,
            items: data[key].items,
            totalPrice: data[key].totalPrice,
            date: data[key].date,
          });
        }
        dispatch({ type: FETCH_ORDERS, orderData });
      });
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await fetch(
      `https://shop-app-70eee.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      if (response.ok)
        dispatch({
          type: DELETE_PRODUCT,
          id: id,
        });
      else throw new Error("Some thing went wrong!!!");
    });
  };
};

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    await fetch("https://shop-app-70eee.firebaseio.com/products.json")
      .then((response) => {
        if (!response.ok) throw new Error("Some thing went wrong!!!");
        return response.json();
      })
      .then((data) => {
        const products = [];
        for (const key in data) {
          products.push(
            new Product(
              key,
              data[key].ownerId,
              data[key].title,
              data[key].imgUrl,
              data[key].description,
              data[key].price
            )
          );
        }
        dispatch({ type: FETCH_PRODUCT, products, userId });
      });
  };
};

export const addProduct = (title, imgUrl, description, price) => {
  return async (dispatch, getState) => {
    const auth = getState().auth;
    await fetch(
      `https://shop-app-70eee.firebaseio.com/products.json?auth=${auth.token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          ownerId: auth.userId,
          imgUrl,
          description,
          price,
        }),
      }
    ).then(async (response) => {
      if (!response.ok) throw new Error("Some thing went wrong!!!");
      else {
        const data = await response.json();
        dispatch({
          type: ADD_PRODUCT,
          product: new Product(
            data.name,
            auth.userId,
            title,
            imgUrl,
            description,
            price
          ),
        });
      }
    });
  };
};

export const editProduct = (id, title, imgUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await fetch(
      `https://shop-app-70eee.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          imgUrl,
          description,
        }),
      }
    ).then((response) => {
      if (response.ok)
        dispatch({
          type: EDIT_PRODUCT,
          data: { id, title, imgUrl, description },
        });
      else throw new Error("Some thing went wrong!!!");
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQrnQ3NxRIdqASebiw7cTLS8-F3KAvdG8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    ).then(async (response) => {
      const responseData = await response.json();
      if (!response.ok) {
        let message = "Some thing went wrong!!!";
        if (responseData.error.message == "EMAIL_NOT_FOUND")
          message = "Email not found";
        if (responseData.error.message == "INVALID_PASSWORD")
          message = "Wrong password";
        throw new Error(message);
      } else {
        const expireTime = new Date(
          new Date().getTime() + parseInt(responseData.expiresIn) * 1000
        );

        AsyncStorage.setItem(
          "userData",
          JSON.stringify({
            token: responseData.idToken,
            userId: responseData.localId,
            expireTime: expireTime.toISOString(),
          })
        );
        dispatch(
          authenticate(
            responseData.localId,
            responseData.idToken,
            parseInt(responseData.expiresIn) * 1000
          )
        );
      }
    });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQrnQ3NxRIdqASebiw7cTLS8-F3KAvdG8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    ).then(async (response) => {
      if (!response.ok) {
        let message = "Some thing went wrong!!!";
        const responseData = await response.json();
        if (responseData.error.message == "EMAIL_EXISTS")
          message = "This email is already used!!!";
        throw new Error(message);
      } else dispatch({ type: SIGNUP });
    });
  };
};

export const authenticate = (userId, token, expireTime) => {
  return (dispatch) => {
    dispatch(setTimerOut(expireTime));
    dispatch({ type: LOGIN, token, userId });
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  return {
    type: LOGOUT,
  };
};

const setTimerOut = (timeout) => {
  return (dispatch) => {
    timer = setTimeout(() => dispatch(logout()), timeout);
  };
};
