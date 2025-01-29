"use client";
import { Link } from "@/i18n/routing";
import { className } from "@/utils/classNames";
import { useTranslations } from "next-intl";
import { VscError } from "react-icons/vsc";

export default function FailPayment() {
  const t = useTranslations("FailPayment");
  return (
    <div className="relative w-full bg-fail-pattern bg-no-repeat bg-cover h-screen flex justify-center items-center ">
      <div className="absolute w-full max-w-md mt-7 opacity-95">
        <div
          className="bg-white rounded-lg shadow-lg text-center overflow-hidden animate-fade-in-up"
          style={{
            animation: "fade-in-up 0.5s ease-out",
          }}
        >
          {/* Header */}
          <div className="bg-red-500 text-white py-6 relative">
            <div
              className="flex justify-center mb-2 animate-bounce"
              style={{
                animation: "bounce 1.5s infinite",
              }}
            >
              <VscError className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-semibold">{t("payment_result")}</h2>
          </div>

          {/* Body */}
          <div className="p-6 text-gray-700 text-lg">
            {t("payment_cancelled")}
          </div>

          {/* Footer */}
          <div className="bg-gray-100 p-4">
            <Link
              href="/"
              className={className(
                "w-full py-2 px-8 bg-red-500 text-white rounded-lg",
                "hover:bg-red-600 transform hover:scale-105 transition duration-300"
              )}
            >
              {t("home_page")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
