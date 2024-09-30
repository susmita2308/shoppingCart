/* eslint-disable */

import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";
import db from "../../Database/firebase";
import store from "../store";
import { add, addItemToBasket, remove } from "../../Constants/constants";



export const getAllProducts = async () => {
    try {
        const product = collection(db, 'products');
        console.log('db', db);

        const productSnapshot = await getDocs(product);
        const products = productSnapshot.docs.map(doc => doc.data());
        return products
    } catch (e) {
        console.log("error ", e);
    }
}

export const getCartItems = async (dispatch) => {
    try {
        const cart = collection(db, 'cart');
        console.log('cart', db);
        const cartSnapshot = await getDocs(cart);
        const cartItems = cartSnapshot.docs.map(doc => doc.data())
        console.log("crt items ", cartItems[0]?.cartItem);
        dispatch({
            type: addItemToBasket,
            payload: cartItems[0]?.cartItem
        })
    } catch (e) {
        console.log("error ", e);
    }
}


export const addToBasket = (data) => {
    const list = store.getState()?.cartReducer?.cart
    console.log("list ", list);
    const offer = updateValue(list && list?.length !== 0 ? [...list, data] : [data])

    return {
        type: addItemToBasket,
        payload: offer
    };
}

export const addQty = (data) => {
    const list = store.getState()?.cartReducer?.cart
    const newList = list?.map((item) => {
        if (data?.id === item?.id) {
            return {
                ...item,
                qty: item?.qty + 1
            }
        }
        return item
    })
    const offer = updateValue(newList)
    return {
        type: add,
        payload: offer
    };
}


export const removeQty = (data) => {
    const list = store.getState()?.cartReducer?.cart
    const newList = list?.map((item) => {
        if (data?.id === item?.id) {
            return {
                ...item,
                qty: item?.qty - 1
            }
        }
        return item
    })

    const filterdList = newList?.filter((item) => item?.qty > 0)
    const offer = updateValue(filterdList)
    return {
        type: remove,
        payload: offer
    };
}

const checkOffer = (product, list) => {
    if (list?.length === 0) {
        return
    }
    switch (product.offerId) {
        case 1: {
            const cartData = list?.find((item) => item?.id === product?.id)
            if (cartData?.qty === 1) {
                return 0
            }
            if (cartData?.qty % 2 === 0) {
                return product?.price * (cartData?.qty / 2)
            } else {
                return product?.price * ((cartData?.qty - 1) / 2)
            }
        }
        case 2: {

            const hasItem = list?.some((item) => Number(item?.id) === Number(product?.prodcutRefIId))
            
            let count = 0;
            list.forEach(element => {
                if (element.name == 'Bread' && list.length == 2) {
                    count = element.price
                    console.log(count);

                }
            });
            if (!hasItem) {
                return (count / 2) * Math.floor(product?.qty)
            }
            return 0
        }
        case 3: {

            return (product?.price / 3) * Math.floor(product?.qty)
        }
        default: {
            return 0
        }
    }
};

const updateValue = (list) => {
    const newList = list?.map((item) => {
        let saving = checkOffer(item, list);
        if (item.name == 'Soup') {
            saving = 0;
        }
        return {
            ...item,
            saving,
            itemCost: (item?.price * item?.qty) - saving
        }
    })
    uploadToFirebase(newList)
    return newList
}

const uploadToFirebase = async (newList) => {
    try {
        const docRef = doc(db, "cart", '01');
        const sucess = await updateDoc(docRef, { cartItem: newList })
        console.log("success", sucess);

    } catch (e) {
        console.log("erro ", e);
    }
}