import { generateSlug } from "@/app/lib/generateSlug";
import { ErrorResponse } from "@/app/lib/types";
import { CreateProductSchema } from "@/app/lib/zodSchemas";
import { PrismaClient, Product } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();
import { z } from "zod";

// This method is used to apply partial modifications to a resource.
// It updates only the specified fields, leaving the rest of the resource unchanged.
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse<Product | ErrorResponse>> {
    try {
        // Parse the request body
        const body = await request.json();

        // Validate the input
        const validatedData = CreateProductSchema.parse(body);

        // Fetch the existing product
        const existingProduct = await prisma.product.findUnique({
            where: { id: params.id },
        });

        if (!existingProduct) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        // Check if the name has changed
        let slug = existingProduct.slug;
        if (validatedData.name && validatedData.name !== existingProduct.name) {
            slug = generateSlug(validatedData.name);
        }

        // Update the product in the database
        const product = await prisma.product.update({
            where: { id: params.id },
            data: {
                categoryId:
                    validatedData.categoryId ?? existingProduct.categoryId,
                name: validatedData.name ?? existingProduct.name,
                basePrice: validatedData.basePrice ?? existingProduct.basePrice,
                description:
                    validatedData.description ?? existingProduct.description,
                published: validatedData.published ?? existingProduct.published,
                slug: slug,
            },
        });

        // Return the updated product
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Format Zod validation errors
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join(", ");
            return NextResponse.json({ error: errorMessages }, { status: 400 });
        }

        // Handle other errors
        console.error("Error updating product:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
