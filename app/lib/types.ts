import { Product, ProductImage, ProductSize, ProductVariant } from "@prisma/client";

export interface Variant extends Pick<ProductVariant, "id" | "color" | "currentPrice" | "colorCode"> {
    images: Pick<ProductImage, "id" | "url">[];
    sizes: Pick<ProductSize, "id" | "stock" | "size">[];
}

export interface ProductCardsProps extends Pick<Product, "id" | "name" | "basePrice" | "slug" | "description"> {
    variants: Variant[];
}

export interface ProductsResponse {
    products: ProductCardsProps[];
}

export interface ErrorResponse {
    error: string;
}