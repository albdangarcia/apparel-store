import ProductPageInfo from "@/app/components/product-page-info";

const Page = ({ params }: { params: { slug: string } }) => {
    const productName = params.slug;
    return (
        <ProductPageInfo productName={productName} />
    );
}

export default Page;