import ProductPageInfo from "@/app/components/product-page-info";
import { getProduct } from "@/app/lib/data/public/product";
import { ProductCardsProps } from "@/app/lib/types";
import { GenderSchema } from "@/app/lib/zodSchemas";
import { notFound } from "next/navigation";

interface ParamProps {
    gender: string;
    slug: string;
}

interface Props {
    params: ParamProps;
}

// export const revalidate = 60

const Page = async ({ params }: Props) => {
    // Get the product name from the params
    const productName = params.slug;

    // Validate the gender parameter
    const parseGender = GenderSchema.safeParse(params.gender.toUpperCase());
    if (!parseGender.success) {
        return notFound();
    }

    const product: ProductCardsProps = await getProduct(productName);

    return <ProductPageInfo product={product} />;
};

export default Page;
