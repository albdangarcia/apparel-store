export const getProduct = async (productName: string) => {
    try {
        // Get the API URL from environment variables
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        // Make the API request
        const response = await fetch(
            `${apiUrl}/api/protected/products/${productName}`
        );

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
};

export const getProducts = async (gender: string) => {
    try {
        // Get the API URL from environment variables
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        // Fetch products from the API based on gender
        const response = await fetch(
            `${apiUrl}/api/protected/products/gender/${gender}`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products. Please try again later.");
        }

        const responseData = await response.json();

        // Add a delay to simulate a slow network
        // await new Promise((resolve) => setTimeout(resolve, 10000));

        // Return the data if it exists
        return responseData;
    } catch (error) {
        // Log the error and set the error state
        console.error("Error fetching product:", error);

        // Set the error state
        throw new Error("Failed to fetch product. Please try again later.");
    }
};
