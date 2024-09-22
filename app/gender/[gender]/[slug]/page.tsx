import ProductPageInfo from "@/app/components/product-page-info";

interface Props {
    params: { slug: string };
}

const Page = ({ params }: Props) => {
    const productName = params.slug;
    return (
        <ProductPageInfo productName={productName} />
    );
}

export default Page;