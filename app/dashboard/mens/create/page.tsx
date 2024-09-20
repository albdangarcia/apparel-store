"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Gender, Product } from "@prisma/client";
import { ErrorResponse } from "@/app/lib/types";

const Page = () => {
    // Initialize the form data state
    const [formData, setFormData] = useState({
        categoryId: "",
        name: "",
        basePrice: "",
        description: "",
        gender: "",
        published: "",
    });

    // Initialize the error state
    const [error, setError] = useState("");
    // Initialize the router
    const router = useRouter();

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            // Send a POST request to create a new product
            const response = await fetch("/api/dashboard/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            // Check if the response is ok
            if (!response.ok) {
                const errorData: ErrorResponse = await response.json();
                throw new Error(
                    errorData.error || `HTTP error! status: ${response.status}`
                );
            }

            // Parse the response body
            const result: Product = await response.json();
            console.log("Success:", result);

            // Show success message
            alert("Product created successfully!");

            // Redirect to the mens page
            router.push("/mens");
        } catch (error) {
            console.error("Error:", error);
            if (error instanceof Error) {
                setError(error.message);
            } else if (typeof error === "object" && error !== null) {
                // Handle case where error is an object (like Zod validation errors)
                setError(JSON.stringify(error));
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            <form className="grid gap-y-4" onSubmit={handleSubmit}>
                {/* Gender */}
                <div>
                    <label htmlFor="gender">Gender</label>
                    <select
                        name="gender"
                        id="gender"
                        required
                        autoComplete="off"
                        aria-describedby="gender-error"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option className="capitalize" value="">
                            Select Gender
                        </option>
                        {Object.values(Gender).map((gender) => (
                            <option key={gender} value={gender}>
                                {gender}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category select */}
                <div>
                    <label htmlFor="categoryId">Category</label>
                    <select
                        name="categoryId"
                        id="categoryId"
                        required
                        autoComplete="off"
                        aria-describedby="categoryId-error"
                        value={formData.categoryId}
                        onChange={handleChange}
                    >
                        <option className="capitalize" value="">
                            Select Category
                        </option>
                        <option
                            className="capitalize"
                            value="cm148xsva000008la0ax99gne"
                        >
                            Tops
                        </option>
                        <option
                            className="capitalize"
                            value="cm148xzco000108la4yre0lj3"
                        >
                            Bottoms
                        </option>
                    </select>
                </div>

                {/* Name input */}
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        autoComplete="off"
                        aria-describedby="name-error"
                        placeholder="Enter the product name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                {/* Base price input */}
                <div>
                    <label htmlFor="basePrice">Base price</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm sm:leading-5">
                                $
                            </span>
                        </div>
                        <input
                            type="number"
                            name="basePrice"
                            id="basePrice"
                            autoComplete="off"
                            placeholder="0.00"
                            aria-describedby="basePrice-error"
                            required
                            step="0.01"
                            className="pl-6"
                            value={formData.basePrice}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Description textarea */}
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        aria-describedby="description-error"
                        placeholder="Enter the product description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                {/* published select */}
                <div>
                    <label htmlFor="published">Published</label>
                    <select
                        name="published"
                        id="published"
                        required
                        autoComplete="off"
                        aria-describedby="published-error"
                        value={formData.published}
                        onChange={handleChange}
                    >
                        <option className="capitalize" value="">
                            Select Published
                        </option>
                        <option className="capitalize" value="true">
                            True
                        </option>
                        <option className="capitalize" value="false">
                            False
                        </option>
                    </select>
                </div>

                {/* Form buttons */}
                <div className="flex gap-x-2 pt-3 border-t font-medium">
                    <button type="submit">Save</button>
                    <Link href={"/mens"}>Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default Page;
