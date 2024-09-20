"use client";
import { ProductCardsProps } from "@/app/lib/types";
import { useEffect, useState } from "react";

const Page = async ({ params }: { params: { slug: string } }) => {
    // get id from params
    const slug = params.slug;

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
                const response = await fetch(`/api/dashboard/products/${slug}`);

                // Check if the response is not OK
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Parse the JSON response
                const data = await response.json();

                // Set the product state with the fetched data
                setProduct(data.product);
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
    }, []);

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
            <p>{product?.name}</p>
        </div>
    );
}

export default Page;