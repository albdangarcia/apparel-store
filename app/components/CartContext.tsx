"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
    variantId: string;
    size: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    cartItemCount: number;
    addToCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            setCartItems(JSON.parse(cartData));
        }
    }, []);

    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (cartItem) =>
                    cartItem.variantId === item.variantId && cartItem.size === item.size
            );

            let updatedItems;
            if (existingItemIndex !== -1) {
                updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += item.quantity;
            } else {
                updatedItems = [...prevItems, item];
            }

            localStorage.setItem('cart', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, cartItemCount: cartItems.length, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};