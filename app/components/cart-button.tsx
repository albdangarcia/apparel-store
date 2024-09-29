"use client";

import { useEffect, useState } from "react";

const CartButton = () => {
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            const cartItems = JSON.parse(cartData);
            setCartItemCount(cartItems.length);
        }
    }, []);
    return (
        <div>
            Cart <span>({cartItemCount})</span>
        </div>
    );
};

export default CartButton;
