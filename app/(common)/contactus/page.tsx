import { className } from "@/utils/classNames";
import Link from "next/link";
import React from "react";
import { FaTelegramPlane, FaGithub, FaFacebook } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="bg-luminox-pattern min-h-screen rounded-lg">
      <div className="container mx-auto px-4 py-12 opacity-80 my-2">
        <h1 className="text-4xl font-bold text-gray-100 mb-8">
          تماس با ما
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              اطلاعات تماس
            </h2>
            <div className="text-gray-700 mb-4">
              <div className="flex gap-x-36">
                <p className="text-lg font-medium">
                  <strong>تلفن:</strong> 77400524-021
                </p>
                <p className="text-lg font-medium">
                  <strong>موبایل:</strong> 7258919-0912
                </p>
              </div>
              <p className="text-lg font-medium">
                <strong>ایمیل:</strong>
                <Link
                  href="mailto:sadjad.ghasemi@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  sadjad.ghasemi@gmail.com
                </Link>
              </p>
              <p className="text-lg font-medium">
                <strong>آدرس:</strong> خ پیروزی -خ ششم نیرو هوایی- فرعی 6/35
                پلاک 28 واحد 3
              </p>
            </div>
          </div>

          {/* Social Media Links Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              شبکه‌های اجتماعی
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaFacebook className="text-blue-600" />
                <p className="ml-2 text-lg font-medium">
                  Facebook:{" "}
                  <Link
                    href="https://facebook.com/sadjad.ghasemi"
                    className="text-blue-600 hover:underline"
                  >
                    sadjad.ghasemi
                  </Link>
                </p>
              </div>
              <div className="flex items-center">
                <FaGithub className="text-gray-900" />
                <p className="ml-2 text-lg font-medium">
                  GitHub:{" "}
                  <Link
                    href="https://github.com/sadjad1366"
                    className="text-gray-900 hover:underline"
                  >
                    github account
                  </Link>
                </p>
              </div>
              <div className="flex items-center">
                <FaTelegramPlane className="text-blue-500" />
                <p className="ml-2 text-lg font-medium">
                  Telegram:{" "}
                  <Link
                    href="https://t.me/SadjadQasemi66"
                    className="text-blue-500 hover:underline"
                  >
                    SadjadQasemi66
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            فرم تماس با ما
          </h2>
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-lg font-medium text-gray-700"
                >
                  نام
                </label>
                <input
                  type="text"
                  name="name"
                  className={className(
                    "mt-2 p-3 border border-gray-300 shadow-md",
                    "rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  )}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-lg font-medium text-gray-700"
                >
                  ایمیل
                </label>
                <input
                  type="email"
                  name="email"
                  className={className(
                    "mt-2 p-3 border border-gray-300 shadow-md",
                    "rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  )}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <label
                htmlFor="message"
                className="text-lg font-medium text-gray-700"
              >
                پیام
              </label>
              <textarea
                name="message"
                rows={4}
                className={className(
                  "mt-2 p-3 border border-gray-300 shadow-md",
                  "rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                )}
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={className(
                  "mt-2 p-3 border bg-gray-700 text-white border-gray-300",
                  "rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                )}
              >
                ارسال پیام
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
