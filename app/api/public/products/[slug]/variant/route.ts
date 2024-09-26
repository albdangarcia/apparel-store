import { ErrorResponse } from "@/app/lib/types";
import { CreateVariantSchema } from "@/app/lib/zodSchemas";
import { PrismaClient, ProductVariant } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();
import { z } from "zod";

interface Params {
    params: { slug: string };
}

const POST = async (
    request: NextRequest,
    { params }: Params
): Promise<NextResponse<ProductVariant | ErrorResponse>> => {
    try {
        // Parse the request body
        const body = await request.json();

        // Validate the input
        const validatedData = CreateVariantSchema.parse(body);

        // Fetch the product by slug
        const product = await prisma.product.findUnique({
            where: { slug: params.slug },
            select: { id: true },
        });

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        // Create the variant in the database
        const variant = await prisma.productVariant.create({
            data: {
                color: validatedData.color,
                colorCode: validatedData.colorCode,
                currentPrice: validatedData.currentPrice,
                isOnSale: validatedData.isOnSale,
                saleType: validatedData.saleType,
                productId: product.id,
            },
        });

        return NextResponse.json(variant, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Format Zod validation errors
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join(", ");
            return NextResponse.json({ error: errorMessages }, { status: 400 });
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
};

export { POST };