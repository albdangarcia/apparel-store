"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProductFormError } from "../zodSchemas";

const createProduct = async (
    prevState: ProductFormError,
    formData: FormData
) => {
    let genderURL: string;

    // Create the product in the database using API calls
    try {
        // Get the API URL from environment variables
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        // Make the API request
        const response = await fetch(`${apiUrl}/api/protected/products`, {
            method: "POST",
            body: formData,
        });

        const responseData = await response.json();

        if (!response.ok) {
            return {
                errors: responseData.errors,
                message:
                    responseData.message ||
                    responseData.error ||
                    `HTTP error! status: ${response.status}`,
            };
        }

        // Parse the response to get the gender
        genderURL = responseData.gender.toLowerCase();

    } catch (error) {
        console.error("Error creating product:", error);
        return {
            message: "Database Error: Failed to create product.",
        };
    }

    // Revalidate the cache
    revalidatePath(`/dashboard/${genderURL}`);

    // Redirect to the dashboard
    redirect(`/dashboard/${genderURL}`);

};

export { createProduct };
