"use client";

import { createProduct } from "@/app/lib/actions/product";
import { ProductFormError } from "@/app/lib/zodSchemas";
import { Gender } from "@prisma/client";
import Link from "next/link";
import { useFormState } from "react-dom";
import InputErrorMessage from "../../input-error-message";

const CreateProductForm = () => {
    // Error state for the form
    const initialState = { message: null, errors: {} };

    // Form state
    const [state, dispatch] = useFormState<ProductFormError, FormData>(
        createProduct,
        initialState
    );

    return (
        <div>
            <form action={dispatch} className="grid gap-y-4">
                {/* Gender */}
                <div>
                    <label htmlFor="gender">Gender</label>
                    <select
                        name="gender"
                        id="gender"
                        required
                        autoComplete="off"
                        aria-describedby="gender-error"
                        defaultValue="MENS"
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
                    {/* Gender error */}
                    <div
                        id="gender-error"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {state.errors?.gender &&
                            state.errors.gender.map((error: string) => (
                                <InputErrorMessage key={error} error={error} />
                            ))}
                    </div>
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
                        defaultValue="cm148xsva000008la0ax99gne"
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

                {/* Product name input */}
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
                        defaultValue="New Product"
                    />
                    {/* Product name error */}
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.name &&
                            state.errors.name.map((error: string) => (
                                <InputErrorMessage key={error} error={error} />
                            ))}
                    </div>
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
                            defaultValue={54}
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
                        defaultValue="true"
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

                {/* General errors */}
                <div id="product-error" aria-live="polite" aria-atomic="true">
                    {state.message && (
                        <InputErrorMessage key={state.message} error={state.message} />
                    )}
                </div>

                {/* Form buttons */}
                <div className="flex gap-x-2 pt-3 border-t font-medium">
                    <button type="submit">Save</button>
                    <Link href={"/dashboard/mens"}>Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default CreateProductForm;
