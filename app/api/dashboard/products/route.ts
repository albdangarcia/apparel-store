import { generateSlug } from "@/app/lib/generateSlug";
import {
    ErrorResponse,
    ProductCardsProps,
    ProductsResponse,
} from "@/app/lib/types";
import { CreateProductSchema, SearchSchema } from "@/app/lib/zodSchemas";
import { Gender, Prisma, PrismaClient, Product } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();
import { z } from "zod";

const GenderSchema = z.nativeEnum(Gender);

const GET = async (
    request: NextRequest
): Promise<NextResponse<ProductsResponse | ErrorResponse>> => {
    try {
        const { searchParams } = new URL(request.url);
        const genderParam = searchParams.get("gender");
        const searchParam = searchParams?.get("search") || "";

        const whereClause: Prisma.ProductWhereInput = {
            published: true,
        };

        // Check if genderParam is present and not empty
        if (genderParam) {
            const parsedGender = GenderSchema.safeParse(genderParam);

            // Handle validation failure
            if (!parsedGender.success) {
                return NextResponse.json(
                    { error: "Invalid gender parameter" },
                    { status: 400 }
                );
            }

            // Add gender filter to whereClause
            whereClause.gender = parsedGender.data;
        }

        // Check if searchParam is present and not empty
        if (searchParam) {
            const validatedSearch = SearchSchema.safeParse(searchParam);

            // Handle validation failure
            if (!validatedSearch.success) {
                return NextResponse.json(
                    { error: "Invalid search parameter" },
                    { status: 400 }
                );
            }

            // Add search filter to whereClause
            whereClause.name = {
                contains: validatedSearch.data,
                mode: "insensitive",
            };
        }

        const products: ProductCardsProps[] = await prisma.product.findMany({
            where: whereClause,
            select: {
                id: true,
                name: true,
                basePrice: true,
                slug: true,
                variants: {
                    select: {
                        id: true,
                        color: true,
                        size: true,
                        currentPrice: true,
                        images: {
                            select: {
                                id: true,
                                url: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

const POST = async (
    request: NextRequest
): Promise<NextResponse<Product | ErrorResponse>> => {
    try {
        // Parse the request body
        const body = await request.json();

        // Validate the input
        const validatedData = CreateProductSchema.parse(body);

        // Generate a unique slug
        const slug = generateSlug(validatedData.name);

        // Create the product in the database
        const product = await prisma.product.create({
            data: {
                categoryId: validatedData.categoryId,
                name: validatedData.name,
                basePrice: validatedData.basePrice,
                description: validatedData.description,
                published: validatedData.published,
                gender: validatedData.gender,
                slug: slug,
            },
        });

        // Return the created product with a 201 status code
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Format Zod validation errors
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join(", ");
            return NextResponse.json({ error: errorMessages }, { status: 400 });
        }

        // Handle other errors
        console.error("Error creating product:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export { GET, POST };