import Link from "next/link";
import React from "react";
import { FaTelegramPlane, FaGithub, FaFacebook } from "react-icons/fa";

const Footer:React.FC = () => {
  return (
    <div className="rounded-lg mt-6">
      <footer className="bg-gray-400 rounded-lg">
          <div className="w-full grid grid-cols-1 gap-8 px-4 py-6 lg:py-8 md:grid-cols-2">
            <div>
              <h2 className="border-b-2 py-2 max-w-90 mb-6 text-xl font-semibold text-gray-900 uppercase dark:text-white">
                گالری ساعت نینجا
              </h2>
              <div className="text-justify max-w-90 px-2">
                نماینده رسمی فروش و خدمات پس از فروش ساعتهای بوم‌مرسیه، رادو،
                گوچی، بالمن، تیسوت، سرتینا، هامیلتون، میدو، کلوین‌کلاین،
                ویکتورینوکس، سواروسکی، ونگر، سواچ و فلیک‌فلاک زیورآلات و
                کریستال‌های سواروسکی ابزارهای چندکاره، چاقوها و لوازم آشپزخانه و
                ادوات سفر ویکتورینوکس با بیش از ربع قرن تجربه
              </div>
            </div>
            <div className="flex flex-col gap-y-2 rounded-b-lg">
              <h2 className="border-b-2 py-2 max-w-90 mb-6 text-xl font-semibold text-gray-900 uppercase dark:text-white">
                درباره ما
              </h2>

              <p className="hover:underline">تلفن: 77400524-021</p>

              <div className="hover:underline flex flex-wrap">
               <span>ایمیل:</span> <span>sadjad.ghasemi@gmail.com</span>
              </div>

              <p className="hover:underline">
                آدرس : خ پیروزی -خ ششم نیرو هوایی- فرعی 6/35 پلاک 28 واحد 3
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <h2 className="border-b-2 py-2 max-w-90 mb-6 text-xl font-semibold text-gray-900 uppercase dark:text-white">
                شبکه های اجتماعی
              </h2>

              <div className="flex gap-3">
                <Link href="https://facebook.com/sadjad.ghasemi" target="_blank" className="text-xl hover:text-blue-600">
                  <FaFacebook />
                </Link>
                <Link href="https://github.com/sadjad1366" target="_blank" className="text-xl hover:text-black">
                  <FaGithub />
                </Link>
                <Link href="https://t.me/SadjadQasemi66" target="_blank" className="text-xl hover:text-blue-500">
                  <FaTelegramPlane />
                </Link>
              </div>
            </div>
          </div>
        <div className="px-4 py-6 bg-gray-800 text-center rounded-b-lg">
          <span className="text-center text-gray-200 dark:text-gray-300 sm:text-center">
            تمام حق و حقوق استفاده از این سایت متعلق به گالری ساعت نینجا می باشد
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
