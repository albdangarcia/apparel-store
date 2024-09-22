import { Gender } from "@prisma/client";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();

const GenderSchema = z.nativeEnum(Gender);
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
                { error: "Invalid gender parameter" },
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

        return NextResponse.json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
