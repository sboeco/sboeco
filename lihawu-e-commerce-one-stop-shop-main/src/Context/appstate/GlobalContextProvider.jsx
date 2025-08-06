import React from 'react';
import { CartProvider } from './CartContext/CartContext';

const GlobalContextProvider = ({ children }) => {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
};

export default GlobalContextProvider;

