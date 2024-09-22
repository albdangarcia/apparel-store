"use client";
import { ProductCardsProps } from "@/app/lib/types";
import { useEffect, useState } from "react";

const Page = ({ productName }: { productName: string }) => {

    // State to hold the product
    const [product, setProduct] = useState<ProductCardsProps>();
    // State to manage the loading state
    const [loading, setLoading] = useState<boolean>(true);
    // State to manage any error messages
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Function to fetch product from the API
        const fetchProduct = async () => {
            try {
                // Make the API request
                const response = await fetch(`/api/dashboard/products/${productName}`);

                // Check if the response is not OK
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Parse the JSON response
                const data = await response.json();

                console.log(data);

                // Set the product state
                setProduct(data);
            } catch (error) {
                // Log the error and set the error state
                console.error("Error fetching product:", error);

                // Set the error state
                setError("Failed to fetch product. Please try again later.");
            } finally {
                // Set the loading state to false
                setLoading(false);
            }
        };
        // Call the fetchProduct function
        fetchProduct();
    }, [productName]);

    // Render loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error state
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div>
            <h1>Product information</h1>
            {product && (
                <div>
                    <h2>{product.name}</h2>
                    <p>{product.basePrice}</p>
                    <p>Variants</p>
                    <div>
                        {product.variants.map((variant) => (
                            <div key={variant.id}>
                                <p>{variant.color}</p>
                                <p>{variant.currentPrice}</p>
                                <img
                                    width={100}
                                    src={variant.images[0].url}
                                    alt={product.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
