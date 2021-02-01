import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'
import {act} from "@testing-library/react";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const {id, color, amount, product} = action.payload;
    const tempItem = state.cart.find((item) => item.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          newAmount = newAmount > cartItem.max ? cartItem.max : newAmount;

          return {
            ...cartItem,
            amount: newAmount
          }
        }
        else {
          return cartItem;
        }
      });
      return {...state, cart: tempCart};
    }
    else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }

      return {
        ...state,
        cart: [
            ...state.cart,
            newItem,
        ]
      }
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return {
      ...state,
      cart: tempCart,
    }
  }

  if (action.type === CLEAR_CART) {
    return {...state, cart: []}
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const {id, amount} = action.payload;

    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (amount === 'inc') {
          let newAmount = item.amount + 1;
          newAmount = newAmount > item.max ? item.max : newAmount;
          return {...item, amount: newAmount};
        }
        else {
          let newAmount = item.amount - 1;
          newAmount = newAmount < 1 ? 1 : newAmount;
          return {...item, amount: newAmount};
        }
      }
      return item;
    });

    return {
      ...state,
      cart: tempCart,
    };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const {totalItems, totalAmount} = state.cart.reduce((total,cartItem) => {
      const {price, amount} = cartItem;
      total.totalItems += amount;
      total.totalAmount += price * amount;

      return total;
    }, {
      totalItems: 0,
      totalAmount: 0,
    });

    return {
      ...state,
      totalItems,
      totalAmount,
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
