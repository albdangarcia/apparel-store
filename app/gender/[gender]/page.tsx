import AllProductCards from "@/app/components/all-product-cards";
import { GenderSchema } from "@/app/lib/zodSchemas";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
    params: { gender: string };
}

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
// export const dynamicParams = true // or false, to 404 on unknown paths

// export function generateStaticParams() {
//     return [{ gender: "mens" }, { gender: "womens" }];
// }

const Page = ({ params }: Props) => {
    // Extract gender from params and validate it
    const validatedGender = GenderSchema.safeParse(params.gender.toUpperCase());

    // If the validation fails, return a 404
    if (!validatedGender.success) {
        return notFound();
    }

    // Convert the gender to lowercase
    const gender = validatedGender.data.toLowerCase();

    return (
        <div>
            <h1>{params.gender}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <AllProductCards gender={gender} />
            </Suspense>
        </div>
    );
};

export default Page;
