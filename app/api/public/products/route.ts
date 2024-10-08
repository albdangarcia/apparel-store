import { generateSlug } from "@/app/lib/generateSlug";
import { ProductCardsProps } from "@/app/lib/types";
import {
    CreateProductFormSchema,
    GenderSchema,
    SearchSchema,
} from "@/app/lib/zodSchemas";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();

const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const genderParam = searchParams.get("gender")?.toUpperCase();
        const searchParam = searchParams?.get("search") || "";

        // Create a where clause to filter products
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

        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
};

const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        // // Parse the request body as FormData
        const formData = await request.formData();

        // Validate form fields using Zod
        const validatedFields = CreateProductFormSchema.safeParse({
            categoryId: formData.get("categoryId"),
            name: formData.get("name"),
            basePrice: formData.get("basePrice"),
            description: formData.get("description"),
            gender: formData.get("gender"),
            published: formData.get("published"),
        });

        // If form validation fails, return errors early. Otherwise, continue.
        if (!validatedFields.success) {
            return NextResponse.json(
                {
                    errors: validatedFields.error.flatten().fieldErrors,
                    message: "Missing Fields. Failed to Create Product.",
                },
                { status: 400 }
            );
        }

        // Extract the validated data
        const { categoryId, name, basePrice, description, gender, published } =
            validatedFields.data;

        // Generate a unique slug
        const slug = generateSlug(name);

        // Create the product in the database
        const product = await prisma.product.create({
            data: {
                categoryId: categoryId,
                name: name,
                basePrice: basePrice,
                description: description,
                published: published,
                gender: gender,
                slug: slug,
            },
        });

        // Return the created product with a 201 status code
        return NextResponse.json({ product, gender }, { status: 201 });
    } catch (error) {
        // Handle other errors
        console.error("Error creating product:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
};

export { GET, POST };
