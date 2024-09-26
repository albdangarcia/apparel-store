// import ProductPageInfo from "@/app/components/product-page-info";
// import { getProduct } from "@/app/lib/data/protected/product";

interface Props {
    params: { slug: string };
}

const Page = async ({ params }: Props) => {
    const productName = params.slug;
    return (
        // <ProductPageInfo product={product} productName={productName} />
        <div>{productName}</div>
    );
}

export default Page;