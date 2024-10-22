import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopNav from "./components/top-nav";
import { CartProvider } from "./components/cart/cart-context";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Apperal Store",
    description: "A simple apperal store",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} antialiased`}>
                <CartProvider>
                    <TopNav />
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
