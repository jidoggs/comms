import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "@/common/components/lib/AntdRegistry";
import { bebas, inter, roboto_init, manrope } from "./font";

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
      <body
        className={`${bebas.variable} ${inter.variable} ${manrope.className} circular`}
      >
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
