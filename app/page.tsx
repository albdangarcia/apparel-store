import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>Apperal Store</h1>
            <p>A simple apperal store</p>
            <Link href="/dashboard/mens" className="bg-black text-white">Dashboard</Link>
        </div>
    );
}
