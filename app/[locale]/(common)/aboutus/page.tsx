"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {Link} from "@/i18n/routing";
import { className } from "@/utils/classNames";

export default function AboutUs() {
  const t = useTranslations("About");

  return (
    <div className="my-2">
      {/* Mission Section */}
      <section className="bg-gray-300 py-16 px-6 rtl rounded-t-lg">
        <h2 className="text-4xl font-bnazanin text-gray-900 text-center">
          {t("about_us.mission.title")}
        </h2>
        <p className="mt-6 text-xl text-gray-900 max-w-4xl mx-auto text-center">
          {t("about_us.mission.description")}
        </p>
        <div className="mt-10 flex justify-center gap-8">
          <div className="bg-white shadow-lg rounded-lg p-8 w-72">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t("about_us.features.quality.title")}
            </h3>
            <p className="text-gray-800">
              {t("about_us.features.quality.description")}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 w-72">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t("about_us.features.variety.title")}
            </h3>
            <p className="text-gray-600">
              {t("about_us.features.variety.description")}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 w-72">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t("about_us.features.support.title")}
            </h3>
            <p className="text-gray-600">
              {t("about_us.features.support.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="bg-gray-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/brandstory/watchbrand2.png"
              alt="Brand Story"
              width={400}
              height={300}
              className="rounded-xl shadow-xl opacity-90 hover:opacity-100 transition-all"
            />
          </div>
          <div className="md:w-1/2 text-gray-900">
            <h2 className="text-3xl font-semibold mb-6 text-center">
              {t("about_us.brand_story.title")}
            </h2>
            <p className="text-xl text-gray-950 font-medium leading-relaxed">
              {t("about_us.brand_story.description")}
            </p>
            <p className="mt-6 text-xl text-gray-950 font-medium">
              {t("about_us.brand_story.additional_info")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-300 py-16 px-6 rtl rounded-b-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {t("about_us.contact.title")}
          </h2>
          <p className="mt-6 text-lg text-gray-700">
            {t("about_us.contact.description")}
          </p>
          <Link
            href="/contactus"
            className={className(
              "mt-6 inline-block bg-gray-800 hover:bg-gray-900",
              "text-white rounded-lg px-8 py-3 text-lg transition duration-300 shadow-lg",
              "transform hover:scale-105"
            )}
          >
            {t("about_us.contact.button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
