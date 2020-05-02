import {ORDER_ITEMS} from '../../constant/Action'
const initialState = [];

export const orderReducer = (state = initialState , action) => {
    switch (action.type) {
        case ORDER_ITEMS:
            // const date = new Date().toLocaleDateString('en-EN' , {
            //     year : "numeric",
            //     month : "long",
            //     day : "numeric",
            //     hour : "2-digit",
            //     minute : "2-digit"
            // })
            var moment = require('moment');
            const date = moment().format('MMMM Do YYYY, hh:mm');
            const newOrder = {
                items : action.orderData.items,
                totalPrice : action.orderData.totalPrice,
                key : (new Date()).toString(),
                date : date
            }
            return state.concat(newOrder);
        default:
            return state;
    }
}