import { className } from "@/utils/classNames";
import { Link } from "@/i18n/routing";
import React from "react";
import { FaTelegramPlane, FaGithub, FaFacebook } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Footer: React.FC = () => {
  const t = useTranslations("Footer");
  return (
    <div className="rounded-lg mt-6 mx-0">
      <footer className="bg-gray-400 rounded-lg">
        <div className="w-full grid grid-cols-1 gap-8 px-8 py-6 lg:py-8 md:grid-cols-2">
          <div>
            <h2 className="border-b-2 py-2 max-w-90 mb-6 text-3xl font-semibold text-gray-900 uppercase dark:text-white">
              {t("gallery_name")}
            </h2>
            <div className="text-justify max-w-90 px-2">{t("description")}</div>
          </div>
          <div className="flex flex-col gap-y-2 rounded-b-lg">
            <h2
              className={className(
                "border-b-2 py-2 max-w-90 mb-6 text-3xl",
                "font-semibold text-gray-900 uppercase dark:text-white"
              )}
            >
              {t("about_us")}
            </h2>

            <p className="hover:underline">{t("phone")}</p>

            <div className="hover:underline flex flex-wrap">
              <span>{t("email")}</span> <span>sadjad.ghasemi@gmail.com</span>
            </div>

            <p className="hover:underline">{t("address")} </p>
          </div>
          <div className="flex flex-col gap-y-2">
            <h2
              className={className(
                "border-b-2 py-2 max-w-90 mb-6 text-3xl",
                "font-semibold text-gray-900 uppercase dark:text-white"
              )}
            >
              {t("social_media")}
            </h2>

            <div className="flex gap-3">
              <Link
                href="https://facebook.com/sadjad.ghasemi"
                target="_blank"
                className="text-xl text-slate-800 hover:text-blue-600 transition-colors duration-300"
              >
                <FaFacebook size={48} />
              </Link>
              <Link
                href="https://github.com/sadjad1366"
                target="_blank"
                className="text-xl text-slate-800 hover:text-blue-600 transition-colors duration-300"
              >
                <FaGithub size={48} />
              </Link>
              <Link
                href="https://t.me/SadjadQasemi66"
                target="_blank"
                className="text-xl text-slate-800 hover:text-blue-600 transition-colors duration-300"
              >
                <FaTelegramPlane size={48} />
              </Link>
            </div>
          </div>
        </div>
        <div className="px-4 py-6 bg-gray-800 text-center rounded-b-lg">
          <span className="text-center text-gray-200 dark:text-gray-300 sm:text-center">
            {t("footer_rights")}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
