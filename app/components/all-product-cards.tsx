import { getProducts } from "../lib/data/public/product";
import { ProductCardsProps } from "../lib/types";
import Card from "./product-card";

interface Props {
    gender: string;
}

const AllProductCards = async ({ gender }: Props) => {
    // Fetch products
    const products: ProductCardsProps[] = await getProducts(gender);

    // If no products are found, display a message
    if (products.length === 0) {
        return <div>No products found for the specified gender.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="flex items-center justify-center"
                >
                    <Card product={product} gender={gender} />
                </div>
            ))}
        </div>
    );
};

export default AllProductCards;