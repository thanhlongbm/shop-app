import {ADD_TO_CART, REMOVE_FROM_CART, ORDER_ITEMS} from '../../constant/Action'

const initialState = {
    items : {},
    totalPrice : 0
}

export const cartReducer = (state = initialState , action) => {
    switch(action.type){
        case ADD_TO_CART:
            const product = action.product;
            const newItem = {
                title : product.title,
                price : product.price
            }
            if(state.items[product.id]){
                newItem.amount = state.items[product.id].amount + 1;
            }
            else{
                newItem.amount = 1;
            }
            const newItemList = {...state.items , [product.id] : newItem};
            const newTotalPrice = state.totalPrice + product.price;
            return {items : newItemList , totalPrice : newTotalPrice};
        case REMOVE_FROM_CART :
            const id = action.id;
            let currentItem = state.items[id];
            let newList = {...state.items};
            if(currentItem.amount > 1){
                const updatedItem = {...currentItem , amount : currentItem.amount - 1};
                newList = {...state.items , [id] : updatedItem};
            }
            else{
                delete newList[id];
            }
            return {items : newList , totalPrice : state.totalPrice - currentItem.price}
        case ORDER_ITEMS:
            return initialState;
        default :
            return state;
    }
}