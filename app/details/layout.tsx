import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "pokemon details",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`w-full h-screen overflow-x-hidden`}>
      {children}
    </div>
  );
}
