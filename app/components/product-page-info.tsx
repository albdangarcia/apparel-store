"use client";
import { ProductCardsProps, Variant } from "@/app/lib/types";
import { Size } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";
import { useCart } from "./cart/cart-context";

interface Props {
    product: ProductCardsProps;
}

const VariantGallery = ({ variant }: { variant: Variant }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    return (
        <div className="flex h-[30rem] w-[28rem]">
            {/* current image */}
            <div className="w-80 overflow-hidden">
                <div
                    className="flex transition-transform duration-300"
                    style={{
                        transform: `translateX(-${selectedImageIndex * 100}%)`,
                    }}
                >
                    {variant.images.map((image) => (
                        <img
                            key={image.id}
                            src={image.url}
                            alt={image.id}
                            width={400}
                        />
                    ))}
                </div>
            </div>

            {/* images thumbnail */}
            <div className="flex flex-col flex-1 overflow-y-auto ml-4">
                {variant.images.map((image, index) => (
                    <button
                        key={image.id}
                        onClick={() => setSelectedImageIndex(index)}
                        className="block p-0 m-0 w-[100px] h-auto"
                    >
                        <img width={100} src={image.url} alt={image.id} />
                    </button>
                ))}
            </div>
        </div>
    );
};

interface ProductVariantProps {
    product: ProductCardsProps;
    selectedVariant: Variant;
    setSelectedVariant: React.Dispatch<React.SetStateAction<Variant>>;
}

const allSizes = Object.values(Size);

const ProductVariant = ({
    product,
    selectedVariant,
    setSelectedVariant,
}: ProductVariantProps) => {
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleVariantChange = (variant: Variant) => {
        setSelectedVariant(variant);
        setSelectedSize(null);
    };


    const handleAddToCart = () => {
        if (selectedSize) {
            const cartItem = {
                variantId: selectedVariant.id,
                size: selectedSize,
                quantity: quantity,
                imageUrl: selectedVariant.images[0].url,
                name: product.name,
                price: selectedVariant.currentPrice,
            };
            addToCart(cartItem);
            alert("Item added to cart");
        } else {
            alert("Please select a size");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-medium">{product.name}</h1>
            <p className="">${product.basePrice}</p>
            <div>
                <h2>
                    <span className="font-medium">Color:</span>{" "}
                    {selectedVariant.color}{" "}
                </h2>
                <div>
                    <h3>Available colors:</h3>
                    <div className="grid grid-cols-5 gap-x-5 w-44">
                        {product.variants.map((variant) => (
                            <div
                                key={variant.id}
                                onClick={() => handleVariantChange(variant)}
                                style={{ backgroundColor: variant.color }}
                                className={clsx(
                                    "w-8 h-8 rounded-full ring-1 ring-gray-400/80 border-2 border-white cursor-pointer",
                                    {
                                        "ring-gray-600":
                                            selectedVariant.id === variant.id,
                                    }
                                )}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="font-medium">Size:</h1>
                    {/* <div className="grid grid-flow-col gap-3">
                        {allSizes.map((size) => {
                            const isAvailable = selectedVariant.sizes.some(
                                (s) => s.size === size
                            );
                            return (
                                <button
                                    key={size}
                                    className={clsx(
                                        "border w-11 h-12 border-gray-400",
                                        !isAvailable &&
                                            "bg-gray-200 line-through border-slate-300 text-gray-400",
                                        isAvailable && "border-slate-500",
                                        selectedSize === size &&
                                            "bg-slate-700 border-slate-700 text-white"
                                    )}
                                    disabled={!isAvailable}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            );
                        })}
                    </div> */}
                    <div className="grid grid-flow-col gap-3">
                        {allSizes.map((size) => {
                            const isAvailable = selectedVariant.sizes.some(
                                (s) => s.size === size
                            );
                            return (
                                <div key={size}>
                                    <input
                                        type="radio"
                                        id={`size-${size}`}
                                        name="size"
                                        value={size}
                                        disabled={!isAvailable}
                                        className="hidden peer"
                                        checked={selectedSize === size}
                                        onChange={() => setSelectedSize(size)}
                                    />
                                    <label
                                        htmlFor={`size-${size}`}
                                        className={clsx(
                                            "w-11 text-center cursor-pointer border p-2 rounded peer-checked:bg-slate-700 peer-checked:text-white",
                                            isAvailable
                                                ? "bg-white"
                                                : "bg-gray-200 text-gray-400 line-through"
                                        )}
                                    >
                                        {size}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* add to cart */}
                <div className="flex items-center justify-between h-14 mt-4">
                    <div className="relative inline-block h-full">
                        <select
                            id="quantity"
                            className="appearance-none bg-white rounded-md pl-5 pr-8 w-24 text-base pt-2 pb-0 mt-0 h-full"
                            name="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        >
                            {Array.from({ length: 5 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="quantity"
                            className="absolute text-xs text-gray-400 top-2 left-5"
                        >
                            QTY
                        </label>
                    </div>
                    <button
                        className="bg-gray-950 hover:bg-gray-800 text-white font-medium rounded-md h-full px-12"
                        onClick={handleAddToCart}
                    >
                        Add to cart
                    </button>
                </div>
                <p>{product.description}</p>
            </div>
        </div>
    );
};

const Page = ({ product }: Props) => {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

    return (
        <div>
            <h1>Product information</h1>
            <div className="flex flex-row">
                <VariantGallery variant={selectedVariant} />
                <ProductVariant
                    product={product}
                    selectedVariant={selectedVariant}
                    setSelectedVariant={setSelectedVariant}
                />
            </div>
        </div>
    );
};

export default Page;
