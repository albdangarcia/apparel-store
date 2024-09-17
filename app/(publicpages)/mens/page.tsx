import ProductCard from "@/app/components/all-product-cards";
import { fetchMens } from "@/app/lib/data/mens";

const Page = async () => {
    const products = await fetchMens();
    return (
        <div>
            <h1>All products</h1>
            <ProductCard products={products} />
        </div>
    );
};

export default Page;