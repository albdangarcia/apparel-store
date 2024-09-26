import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { GenderSchema } from "@/app/lib/zodSchemas";
const prisma = new PrismaClient();

interface ParamsProps {
    params: { gender: string };
}

export async function GET(request: NextRequest, { params }: ParamsProps) {
    try {
        const paramsGender = params.gender.toUpperCase();

        // Validate gender parameter
        const parsedGender = GenderSchema.safeParse(paramsGender);

        if (!parsedGender.success) {
            return NextResponse.json(
                {
                    errors: parsedGender.error.flatten().fieldErrors,
                    message: "Missing Fields. Failed to Get Product.",
                },
                { status: 400 }
            );
        }

        const validatedGender = parsedGender.data;

        const products = await prisma.product.findMany({
            where: {
                gender: validatedGender,
            },
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

        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
