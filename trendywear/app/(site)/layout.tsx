import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/(site)/components/Navbar";
import Footer from "@/app/(site)/components/Footer";
import { UserProvider } from "./context/UserContext";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Trendy Wear",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} antialiased`}
      >
        <UserProvider>
        <Navbar />
        {children}
        <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
