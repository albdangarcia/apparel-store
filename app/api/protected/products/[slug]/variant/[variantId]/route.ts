import { ErrorResponse } from "@/app/lib/types";
import { CreateVariantSchema } from "@/app/lib/zodSchemas";
import { PrismaClient, ProductVariant } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();
import { z } from "zod";

interface ParamsProps {
    params: { slug: string; variantId: string };
}

// Methods to update and delete a product variant by ID

const PUT = async (
    request: NextRequest,
    { params }: ParamsProps
): Promise<NextResponse<ProductVariant | ErrorResponse>> => {
    try {
        // Parse the request body
        const body = await request.json();

        // Validate the input
        const validatedData = CreateVariantSchema.parse(body);

        // Fetch the existing variant with its related product
        const existingVariant = await prisma.productVariant.findUnique({
            where: { id: params.variantId },
        });

        if (!existingVariant) {
            return NextResponse.json(
                { error: "Variant not found" },
                { status: 404 }
            );
        }

        // Update the variant in the database
        const variant = await prisma.productVariant.update({
            where: { id: params.variantId },
            data: {
                color: validatedData.color ?? existingVariant.color,
                colorCode: validatedData.colorCode ?? existingVariant.colorCode,
                currentPrice:
                    validatedData.currentPrice ?? existingVariant.currentPrice,
                isOnSale: validatedData.isOnSale ?? existingVariant.isOnSale,
                saleType: validatedData.saleType ?? existingVariant.saleType,
            },
        });

        return NextResponse.json(variant, { status: 200 });
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
};

const DELETE = async (
    request: NextRequest,
    { params }: ParamsProps
): Promise<NextResponse<ProductVariant | ErrorResponse>> => {
    try {
        // Fetch the existing variant
        const existingVariant = await prisma.productVariant.findUnique({
            where: { id: params.variantId },
            include: { product: true },
        });

        if (!existingVariant) {
            return NextResponse.json(
                { error: "Variant not found" },
                { status: 404 }
            );
        }

        // Delete the variant from the database
        await prisma.productVariant.delete({
            where: { id: params.variantId },
        });

        return NextResponse.json(existingVariant, { status: 200 });
    } catch (error) {
        console.error("Error deleting variant:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
};

export { PUT, DELETE };
