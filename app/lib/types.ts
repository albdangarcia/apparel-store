import { Product, ProductImage, ProductVariant } from "@prisma/client";

export interface Variant extends Pick<ProductVariant, "id" | "color" | "currentPrice"> {
    images: Pick<ProductImage, "id" | "url">[];
}

export interface ProductCardsProps extends Pick<Product, "id" | "name" | "basePrice" | "slug"> {
    variants: Variant[];
}

export interface ProductsResponse {
    products: ProductCardsProps[];
}

export interface ErrorResponse {
    error: string;
}