"use client";
import { useCart } from "./cartContext";

const CartButton = () => {
    const { cartItemCount } = useCart();

    return (
        <div>
            Cart <span>({cartItemCount})</span>
        </div>
    );
};

export default CartButton;
