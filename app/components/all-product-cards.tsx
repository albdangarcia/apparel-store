import { ProductCardsProps } from "../lib/types";
import ProductCard from "./product-card";

const AllProductCards = ({ products }: { products: ProductCardsProps[] }) => {
    return (
        <div className="grid grid-cols-3">
            {products.map((product) => (
                <div key={product.id} className="flex items-center justify-center">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default AllProductCards;
