import AllProductCards from "@/app/components/all-product-cards";
import Link from "next/link";

interface ParamsProps {
    params: { gender: string };
}

const Page = ({ params }: ParamsProps) => {
    return (
        <div>
            <h1 className="capitalize">{params.gender}</h1>
            <Link
                href="dashboard/mens/create"
                className="bg-blue-700 text-white"
            >
                Create product
            </Link>
            <AllProductCards gender={params.gender}/>
        </div>
    );
};

export default Page;
