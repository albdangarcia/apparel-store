"use client";
import { useCart } from "@/app/components/cart/cart-context";

const ProductItems = () => {
    const { cartItems, removeFromCart } = useCart();

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={`${item.variantId}-${item.size}`}>
                            <img src={item.imageUrl} alt={item.name} width="50" />
                            <div>
                                <h2>{item.name}</h2>
                                <p>Size: {item.size}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.price}</p>
                            </div>
                            <button onClick={() => removeFromCart(item.variantId, item.size)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductItems;