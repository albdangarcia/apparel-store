import { ProductCardsProps } from "../lib/types";
import Card from "./product-card";

interface Props {
    products: ProductCardsProps[];
    gender: string;
}

const AllProductCards = ({ products, gender }: Props) => {
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
