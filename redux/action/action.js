import {ADD_TO_CART, REMOVE_FROM_CART, ORDER_ITEMS} from '../../constant/Action'

export const addToCart = (product) => {
    return {
        type : ADD_TO_CART,
        product : product
    }
}

export const removeFromCart = (id) => {
    return {
        type : REMOVE_FROM_CART,
        id : id
    }
}

export const orderItems = (orderData) => {
    return {
        type : ORDER_ITEMS,
        orderData : orderData
    }
}