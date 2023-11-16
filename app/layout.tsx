import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Admin Dashboard",
  description:
    "Boost your e-commerce control with our sleek admin dashboard. Effortlessly manage orders, track performance, and elevate your business. Simplify, streamline, succeed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider />
          <ModalProvider />

          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
