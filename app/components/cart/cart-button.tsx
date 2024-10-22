"use client";
import Link from "next/link";
import { useCart } from "./cart-context";

const CartButton = () => {
    const { cartItemCount } = useCart();

    return (
        <Link href="/cart">
            Cart <span>({cartItemCount})</span>
        </Link>
    );
};

export default CartButton;
