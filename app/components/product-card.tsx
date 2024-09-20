"use client";
import { useState } from "react";
import { ProductCardsProps, Variant } from "../lib/types";
import clsx from "clsx";
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductCardsProps }) => {
    // State to manage the selected variant
    const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(
        product.variants.length > 0 ? product.variants[0] : undefined
    );

    return (
        <div
            key={product.id}
            className="w-72 grid gap-y-2 bg-white p-3 border border-gray-100 shadow-sm font-[family-name:var(--font-geist-sans)]"
        >
            {/* product image */}
            {selectedVariant?.images[0] ? (
                <div className="relative overflow-hidden h-80">
                    <img
                        src={selectedVariant.images[0].url}
                        alt={product.name}
                        className="object-cover w-full h-full"
                    />
                </div>
            ) : (
                <div className="bg-gray-100 relative overflow-hidden h-80 items-center justify-center flex">
                    <span className="text-gray-500 font-medium text-sm">
                        no image
                    </span>
                </div>
            )}

            {/* product name */}
            <h2 className=""><Link href={`/dashboard/${product.slug}`}>{product.name}</Link></h2>

            {/* product variants */}
            <div className="grid grid-cols-5 gap-x-0 w-44">
                {product.variants.map((variant) => (
                    <div
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        style={{ backgroundColor: variant.color }}
                        className={clsx(
                            "w-5 h-5 rounded-full ring-1 ring-gray-400/80 border-2 border-white cursor-pointer",
                            {
                                "ring-gray-600":
                                    selectedVariant?.id === variant.id,
                            }
                        )}
                    />
                ))}
            </div>
            {/* product price */}
            <div className="">
                {selectedVariant &&
                product.basePrice !== selectedVariant.currentPrice ? (
                    <div>
                        <span className="line-through text-gray-500 mr-1">
                            ${product.basePrice}
                        </span>
                        <span className="text-red-800">
                            ${selectedVariant.currentPrice}
                        </span>
                    </div>
                ) : (
                    <div>${product.basePrice}</div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
