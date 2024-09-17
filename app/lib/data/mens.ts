import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/lib/prisma";
import { Gender } from "@prisma/client";

const fetchMens = async () => {
    noStore();
    const products = await prisma.product.findMany({
        where: {
            published: true,
            category: {
                gender: Gender.MEN,
            },
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
    
    return products;
};

export { fetchMens };