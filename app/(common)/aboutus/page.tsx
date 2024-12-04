import { className } from "@/utils/classNames";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="my-2">
      {/* Mission Section */}
      <section className="bg-gray-300 py-16 px-6 rtl rounded-t-lg">
        <h2 className="text-4xl font-bnazanin text-gray-900 text-center">
          ماموریت ما
        </h2>
        <p className="mt-6 text-xl text-gray-900 max-w-4xl mx-auto text-center">
          ما در گالری ساعت نینجا معتقدیم ساعت چیزی فراتر از یک ابزار برای نمایش
          زمان است. ساعت نمادی از سبک، شخصیت و حتی میراث است. هدف ما ارائه
          مجموعه‌ای است که تمامی سلیقه‌ها را پوشش دهد و تجربه‌ای لذت‌بخش از خرید
          آنلاین ساعت برای شما فراهم کند.
        </p>
        <div className="mt-10 flex justify-center gap-8">
          <div className="bg-white shadow-lg rounded-lg p-8 w-72">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              کیفیت بی‌نظیر
            </h3>
            <p className="text-gray-800">
              تمامی ساعت‌ها اصل و از برندهای معتبر جهانی هستند.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 w-72">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              تنوع گسترده
            </h3>
            <p className="text-gray-600">
              از رسمی و اسپرت تا دیجیتال، همه چیز برای شما فراهم است.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 w-72">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              پشتیبانی 24/7
            </h3>
            <p className="text-gray-600">
              تیم ما همیشه در کنار شماست تا تجربه‌ای عالی از خرید داشته باشید.
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
              داستان ما
            </h2>
            <p className="text-xl text-gray-950 font-medium leading-relaxed">
              گالری ساعت نینجا از سال 1378 فعالیت خود را آغاز کرد. با هدف ایجاد
              پلی میان مد، تکنولوژی و نوآوری، توانستیم اعتماد هزاران مشتری را به
              دست آوریم. امروز مفتخریم که یکی از پیشروترین فروشگاه‌های آنلاین در
              صنعت ساعت هستیم.
            </p>
            <p className="mt-6 text-xl text-gray-950 font-medium">
              با تمرکز بر نیازهای مشتریان، تیم ما همواره در حال به‌روزرسانی
              محصولات و خدمات است تا تجربه‌ای فراتر از انتظارات ارائه دهد.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-300 py-16 px-6 rtl rounded-b-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">ارتباط با ما</h2>
          <p className="mt-6 text-lg text-gray-700">
            اگر سوالی دارید یا نیاز به راهنمایی دارید، ما همیشه در کنار شما
            هستیم.
          </p>
          <Link
            href="/contact"
            className={className("mt-6 inline-block bg-gray-800 hover:bg-gray-900",
              "text-white rounded-lg px-8 py-3 text-lg transition duration-300 shadow-lg",
              "transform hover:scale-105")}
          >
            تماس با ما
          </Link>
        </div>
      </section>
    </div>
  );
}
