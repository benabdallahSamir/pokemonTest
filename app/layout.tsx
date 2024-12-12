import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Poekmon app",
  description: "Generated a pokemon web site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <nav className="border-b border-b-gray-300 px-3 h-14 flex items-center justify-center bg-gray-100">
          <Link
            className="py-2 rounded-md px-5 border border-gray-300 duration-300 hover:bg-blue-300 hover:border-blue-300 mr-3"
            href={"/"}
          >
            Search
          </Link>
          <Link
            className="py-2 rounded-md px-5 border border-gray-300 duration-300 hover:bg-blue-300 hover:border-blue-300"
            href={"/dashboard"}
          >
            Dashboard
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
