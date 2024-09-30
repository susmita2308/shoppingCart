import { add, addItemToBasket, remove } from "../../Constants/constants";

const INITIAL_STATE = {
    cart: []
}

const cartReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case addItemToBasket: 
            return {...state, cart: action.payload}
        case add: 
            return {...state, cart: action.payload}
        case remove: 
            return {...state, cart: action.payload}
         default: return state;

    }

};

export default cartReducer