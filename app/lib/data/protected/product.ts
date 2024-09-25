import { notFound } from "next/navigation";

export const getProduct = async (productName: string) => {
    try {
        // Get the API URL from environment variables
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        // Make the API request
        const response = await fetch(`${apiUrl}/api/protected/products/${productName}`);

        // Check if the response is not OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        return await response.json();
    } catch (error) {
        // Log the error and set the error state
        console.error("Error fetching product:", error);

        // Set the error state
        throw new Error("Failed to fetch product. Please try again later.");
    }
}

export const getProducts = async (gender: string) => {
    // Get the API URL from environment variables
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Fetch products from the API based on gender
    const response = await fetch(
        `${apiUrl}/api/protected/products/gender/${gender}`,
        { cache: "no-store" }
    );

    // Check if the response is OK
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Check if the data exists
    if (!data) notFound()
        
    // Return the data if it exists
    return data;
};