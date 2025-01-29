import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import toast, { Toaster } from "react-hot-toast";
import ClientProvider from "../../provider/reduxProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";

const bnazaninFont = localFont({
  src: "../../fonts/BNazanin.woff2",
  variable: "--font-BNazanin",
  weight: "400 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }


  const direction = locale === "fa" ? "rtl" : "ltr";
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale} dir={direction}>
      <body className={`${bnazaninFont.variable} antialiased font-bnazanin`}>
        <Toaster position="top-left" reverseOrder={false} />
        <ClientProvider>
        <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
