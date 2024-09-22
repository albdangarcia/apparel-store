import AllProductCards from "@/app/components/all-product-cards";
import { getProducts } from "@/app/lib/data/protected/product";
import { Suspense } from "react";

interface Props {
    params: { gender: string };
}

const Page = async ({ params }: Props) => {
    // Extract gender from params
    const gender = params.gender;

    // Fetch products
    const products = await getProducts(gender);

    return (
        <div>
            <h1>{params.gender}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <AllProductCards products={products} gender={gender} />
            </Suspense>
        </div>
    );
};

export default Page;
