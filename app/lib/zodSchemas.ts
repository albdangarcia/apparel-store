import { Gender, SaleType } from "@prisma/client";
import { z } from "zod";

// Define the schema for input validation
export const CreateProductSchema = z.object({
    categoryId: z.string(),
    name: z.string().min(1, "Name is required"),
    basePrice: z.coerce
        .number()
        .gt(0, { message: "Please enter an amount greater than $0." }),
    description: z.string(),
    gender: z.nativeEnum(Gender),
    published: z.enum(["true", "false"]).transform((val) => val === "true"),
});

// Define the schema for the search parameter
export const SearchSchema = z
    .string()
    .min(1, "Search query must be at least 1 character long")
    .max(100);

export const CreateVariantSchema = z.object({
    color: z.string().min(1, "Color is required").max(50),
    colorCode: z
        .string()
        .min(1, "Color code is required")
        .max(50)
        .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Invalid hex color code"),
    currentPrice: z.coerce.number().gt(0, { message: "Price must be greater than $0" }),
    isOnSale: z.boolean(),
    saleType: z.nativeEnum(SaleType),
    productId: z.string(),
});
