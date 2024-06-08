import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import footer from "./components/Footer";
import Footer from "./components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RetireWise",
  description: "Invest into your Retirements wisely.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col">
          <div>
            <Navbar />
          </div>
          <div>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
