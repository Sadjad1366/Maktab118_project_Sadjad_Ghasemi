import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import toast, { Toaster } from "react-hot-toast";
import ClientProvider from "@/provider/reduxProvider";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${bnazaninFont.variable} antialiased font-bnazanin`}>
        <Toaster position="top-left" reverseOrder={false} />
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
