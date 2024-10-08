import { generateSlug } from "@/app/lib/generateSlug";
import { CreateProductFormSchema } from "@/app/lib/zodSchemas";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();

interface ParamsProps {
    params: { slug: string };
}

// This method is used to apply partial modifications to a resource.
// It updates only the specified fields, leaving the rest of the resource unchanged.
const PUT = async (
    request: NextRequest,
    { params }: ParamsProps
) => {
    try {
        // Parse the request body
        const body = await request.json();

        // Validate the input
        const validatedData = CreateProductFormSchema.parse(body);

        // Fetch the existing product
        const existingProduct = await prisma.product.findUnique({
            where: { slug: params.slug },
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
            where: { id: existingProduct.id },
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
        // Handle other errors
        console.error("Error updating product:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
};

const DELETE = async (
    request: NextRequest,
    { params }: ParamsProps
) => {
    try {
        // Fetch the existing product
        const existingProduct = await prisma.product.findUnique({
            where: { slug: params.slug },
        });

        if (!existingProduct) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        // Delete the product from the database
        await prisma.product.delete({ where: { id: existingProduct.id } });

        // Return the deleted product
        return NextResponse.json(existingProduct, { status: 200 });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
};

const GET = async (
    request: NextRequest,
    { params }: ParamsProps
) => {
    try {
        // Fetch the existing product
        const product = await prisma.product.findUnique({
            where: { slug: params.slug },
            select: {
                id: true,
                name: true,
                basePrice: true,
                slug: true,
                description: true,
                variants: {
                    select: {
                        id: true,
                        color: true,
                        currentPrice: true,
                        colorCode: true,
                        images: {
                            select: {
                                id: true,
                                url: true,
                            },
                        },
                        sizes: {
                            select: {
                                id: true,
                                size: true,
                                stock: true,
                            }
                        }
                    },
                },
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export { PUT, DELETE, GET };
