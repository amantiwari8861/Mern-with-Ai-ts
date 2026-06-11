import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reduxprovider from "@/redux/Reduxprovider";
import AuthContextWrapper from "@/context/AuthContextWrapper";
import { ToastContainer } from "react-toastify";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"]
})

const manRope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Sukh Travels — Curated Tours & Travel Packages",
    template: "%s | Sukh Travels",
  },
  description:
    "Discover and book handpicked tour packages across India and the world with Sukh Travels.",
  keywords: [
    "tours",
    "travel",
    "holidays",
    "tour packages",
    "India tours",
    "Rajasthan",
  ],
  openGraph: {
    title: "Sukh Travels — Curated Tours & Travel Packages",
    description:
      "Discover and book handpicked tour packages across India and the world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${manRope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastContainer/>
        <Reduxprovider>
          <AuthContextWrapper>
            <Navbar />
            {children}
            <Footer />
          </AuthContextWrapper>
        </Reduxprovider>
      </body>
    </html>
  );
}
