import AllProductCards from "@/app/components/all-product-cards";
import Link from "next/link";

const Page = () => {
    return (
        <div>
            <h1>All products</h1>
            <Link
                href="dashboard/mens/create"
                className="bg-blue-700 text-white"
            >
                Create product
            </Link>
            <AllProductCards />
        </div>
    );
};

export default Page;
