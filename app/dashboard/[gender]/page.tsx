import AllProductCards from "@/app/components/all-product-cards";
import { getProducts } from "@/app/lib/data/protected/product";
import Link from "next/link";

interface ParamsProps {
    params: { gender: string };
}

const Page = async ({ params }: ParamsProps) => {
    const gender = params.gender;
    const products = await getProducts(gender);

    return (
        <div>
            <h1 className="capitalize">{gender}</h1>
            <Link
                href="/dashboard/mens/create"
                className="bg-blue-700 text-white"
            >
                Create product
            </Link>
            <AllProductCards products={products} gender={gender}/>
        </div>
    );
};

export default Page;
