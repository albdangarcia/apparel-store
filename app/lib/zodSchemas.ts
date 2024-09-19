import { z } from "zod";

// Define the schema for input validation
export const CreateProductSchema = z.object({
    categoryId: z.string(),
    name: z.string().min(1, "Name is required"),
    basePrice: z.coerce
        .number()
        .gt(0, { message: "Please enter an amount greater than $0." }),
    description: z.string(),
    published: z.enum(["true", "false"]).transform((val) => val === "true"),
});