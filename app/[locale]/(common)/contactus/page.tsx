"use client";
import { useTranslations } from "next-intl";
import {Link} from "@/i18n/routing";
import { FaTelegramPlane, FaGithub, FaFacebook } from "react-icons/fa";
import { className } from "@/utils/classNames";

export default function ContactUs() {
  const t = useTranslations("ContactUs");

  return (
    <div className="bg-luminox-pattern bg-no-repeat bg-cover min-h-screen rounded-lg">
      <div className="container mx-auto px-4 py-12 opacity-80 my-2">
        <h1 className="text-4xl font-bold text-gray-100 mb-8">
          {t("contact_us.title")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              {t("contact_us.contact_info.title")}
            </h2>
            <div className="text-gray-700 mb-4">
              <div className="flex gap-x-36">
                <p className="text-lg font-medium">
                  <strong>{t("contact_us.contact_info.phone")}:</strong> 77400524-021
                </p>
                <p className="text-lg font-medium">
                  <strong>{t("contact_us.contact_info.mobile")}:</strong> 7258919-0912
                </p>
              </div>
              <p className="text-lg font-medium">
                <strong>{t("contact_us.contact_info.email")}:</strong>
                <Link
                  href={`mailto:${t("contact_us.contact_info.email_value")}`}
                  className="text-blue-600 hover:underline"
                >
                  {t("contact_us.contact_info.email_value")}
                </Link>
              </p>
              <p className="text-lg font-medium">
                <strong>{t("contact_us.contact_info.address")}:</strong> {t("contact_us.contact_info.address_value")}
              </p>
            </div>
          </div>

          {/* Social Media Links Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              {t("contact_us.social_media.title")}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaFacebook className="text-blue-600" />
                <p className="ml-2 text-lg font-medium">
                  {t("contact_us.social_media.facebook")}:{" "}
                  <Link
                    href="https://facebook.com/sadjad.ghasemi"
                    className="text-blue-600 hover:underline"
                  >
                    {t("contact_us.social_media.facebook_link")}
                  </Link>
                </p>
              </div>
              <div className="flex items-center">
                <FaGithub className="text-gray-900" />
                <p className="ml-2 text-lg font-medium">
                  {t("contact_us.social_media.github")}:{" "}
                  <Link
                    href="https://github.com/sadjad1366"
                    className="text-gray-900 hover:underline"
                  >
                    {t("contact_us.social_media.github_link")}
                  </Link>
                </p>
              </div>
              <div className="flex items-center">
                <FaTelegramPlane className="text-blue-500" />
                <p className="ml-2 text-lg font-medium">
                  {t("contact_us.social_media.telegram")}:{" "}
                  <Link
                    href="https://t.me/SadjadQasemi66"
                    className="text-blue-500 hover:underline"
                  >
                    {t("contact_us.social_media.telegram_link")}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            {t("contact_us.contact_form.title")}
          </h2>
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-lg font-medium text-gray-700">
                  {t("contact_us.contact_form.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  className="mt-2 p-3 border border-gray-300 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-lg font-medium text-gray-700">
                  {t("contact_us.contact_form.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-2 p-3 border border-gray-300 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="message" className="text-lg font-medium text-gray-700">
                {t("contact_us.contact_form.message")}
              </label>
              <textarea
                name="message"
                rows={4}
                className="mt-2 p-3 border border-gray-300 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="mt-4 px-6 py-3 bg-gray-700 text-white rounded-lg">
                {t("contact_us.contact_form.submit")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
