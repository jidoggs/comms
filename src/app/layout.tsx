import React from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import StyledComponentsRegistry from "@/common/components/lib/AntdRegistry";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Correspondence",
  description: "Correspondence App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
