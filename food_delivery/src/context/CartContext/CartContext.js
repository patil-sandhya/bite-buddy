'use client';
import CartApi from '@/Services/CartApi';
import { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext();

const cartReducerFunc = (data, action) => {
  switch (action.type) {
    case 'addItem':
      return {cartItem:action.data };
    default:
    // console.error('invalid action type for auth reducer');
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItem }, setCartItem] = useReducer(cartReducerFunc, {
    cartItem: [],
  });

 const getCartItem = async(userId)=>{
    try {
        let res = await CartApi.get_cart(userId)
        console.log(res,"cart")
        if(res.status == 200){
        setCartItem({ type: 'addItem', data: res?.data});
        }
    } catch (error) {
        console.log(error)
    }
 }

  

  useEffect(() => {
    let userid = localStorage.getItem('userid')
    if (userid) {
      getCartItem(userid)
    }
  }, []);
  return (
    <CartContext.Provider
      value={{
       cartItem,
       getCartItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
