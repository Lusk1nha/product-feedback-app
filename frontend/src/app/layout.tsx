import type { Metadata } from "next";
import { Jost } from "next/font/google";

import "./globals.css";
import Providers from "./providers";
import { BaseNextLayoutProps } from "@/shared/types/next-type";

const jostFont = Jost({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Product Feedback - Lucas Pedro",
  description: "Product Feedback - Lucas Pedro",
};

export default function RootLayout({
  children,
}: Readonly<BaseNextLayoutProps>) {
  return (
    <html lang="en">
      <body className={jostFont.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
