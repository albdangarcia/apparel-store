"use client";
import { ProductCardsProps, Variant } from "@/app/lib/types";
import { useState } from "react";

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
                    {variant.images.map((image, index) => (
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

const Page = ({ product }: Props) => {
    const [variant, setVariant] = useState(product.variants[0]);

    return (
        <div>
            <h1>Product information</h1>
            {product && (
                <div>
                    <VariantGallery variant={variant} />
                    <div>
                        <h2>{product.name}</h2>
                        <p>{product.basePrice}</p>
                        <p>Variants</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
