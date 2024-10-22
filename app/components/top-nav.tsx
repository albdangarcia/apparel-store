import Link from "next/link";
import CartButton from "./cart/cart-button";

const TopNav = () => {
    return (
        <div className="grid grid-flow-col gap-6">
            <Link href="/dashboard/mens" className="bg-black text-white">Dashboard</Link>
            <Link href="/gender/mens" className="bg-black text-white">Mens products</Link>
            <CartButton />
        </div>
    );
}

export default TopNav;