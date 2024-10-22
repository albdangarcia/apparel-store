"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the structure of a cart item
interface CartItem {
    variantId: string;
    size: string;
    quantity: number;
    imageUrl: string;
    name: string;
    price: number;
}

// Define the structure of the cart context
interface CartContextType {
    cartItems: CartItem[];
    cartItemCount: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (variantId: string, size: string) => void;
}

// Create the cart context with an undefined default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to provide the cart context to its children
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State to hold the cart items
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load cart items from localStorage when the component mounts
    useEffect(() => {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            setCartItems(JSON.parse(cartData));
        }
    }, []);

    // Function to add an item to the cart
    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => {
            // Check if the item already exists in the cart
            const existingItemIndex = prevItems.findIndex(
                (cartItem) =>
                    cartItem.variantId === item.variantId &&
                    cartItem.size === item.size
            );

            let updatedItems;
            if (existingItemIndex !== -1) {
                // Update the quantity of the existing item
                updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += item.quantity;
            } else {
                // Add the new item to the cart
                updatedItems = [...prevItems, item];
            }

            // Save the updated cart to localStorage
            localStorage.setItem("cart", JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    // Function to remove an item from the cart
    const removeFromCart = (variantId: string, size: string) => {
        setCartItems((prevItems) => {
            // Filter out the item to be removed
            const updatedItems = prevItems.filter(
                (item) => item.variantId !== variantId || item.size !== size
            );
            // Save the updated cart to localStorage
            localStorage.setItem("cart", JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    // Provide the cart context to children components
    return (
        <CartContext.Provider
            value={{ cartItems, cartItemCount: cartItems.length, addToCart, removeFromCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};