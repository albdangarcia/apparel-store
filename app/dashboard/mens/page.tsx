import Link from "next/link";

const Page = async () => {
    return (
        <div>
            <h1>Mens products</h1>
            <Link href={"dashboard/mens/create"}>Create</Link>
        </div>
    );
}

export default Page;