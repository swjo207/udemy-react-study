import { useState, createContext, useEffect } from "react";
import PRODUCTS from '../shop-data.json';

// actual value want to access 
export const ProductContext = createContext({
    products: [], 
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS); 
    const value = { products };

    return (
    <ProductContext.Provider value={value}> {children} </ProductContext.Provider>
    ); 
}


