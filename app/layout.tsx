import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


const bnazaninFont = localFont({
  src: "../fonts/BNazanin.woff2",
  variable: "--font-BNazanin",
  weight: "400 900",
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${bnazaninFont.variable} antialiased font-bnazanin`}
      >

        {children}
      </body>
    </html>
  );
}
