"use client";
import { useEffect, useState } from "react";
import { ProductCardsProps, ProductsResponse } from "../lib/types";
import ProductCard from "./product-card";

const AllProductCards = () => {
    // State to hold the list of products
    const [products, setProducts] = useState<ProductCardsProps[]>([]);
    // State to manage the loading state
    const [loading, setLoading] = useState<boolean>(true);
    // State to manage any error messages
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Function to fetch products from the API
        const fetchProducts = async () => {
            try {
                // Make the API request
                const response = await fetch("/api/products");
                
                // Check if the response is not OK
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Parse the JSON response
                const data: ProductsResponse = await response.json();

                // Set the products state with the fetched data
                setProducts(data.products);
            } catch (error) {
                // Log the error and set the error state
                console.error("Error fetching products:", error);

                // Set the error state
                setError("Failed to fetch products. Please try again later.");
            } finally {
                // Set the loading state to false
                setLoading(false);
            }
        };
        // Call the fetchProducts function
        fetchProducts();
    }, []);

    // Render loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Render the list of products
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="flex items-center justify-center"
                >
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default AllProductCards;
