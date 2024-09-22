import { ProductCardsProps } from "@/app/lib/types";
import { getProduct } from "@/app/lib/data/protected/product";

interface Props {
    productName: string;
}

const Page = async ({ productName }: Props) => {
    const product: ProductCardsProps = await getProduct(productName);

    return (
        <div>
            <h1>Product information</h1>
            {product && (
                <div>
                    <h2>{product.name}</h2>
                    <p>{product.basePrice}</p>
                    <p>Variants</p>
                    <div>
                        {product.variants.map((variant) => (
                            <div key={variant.id}>
                                <p>{variant.color}</p>
                                <p>{variant.currentPrice}</p>
                                <img
                                    width={100}
                                    src={variant.images[0].url}
                                    alt={product.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
