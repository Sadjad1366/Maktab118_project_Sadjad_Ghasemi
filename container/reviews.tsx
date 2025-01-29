"use client";
import { useTranslations } from "next-intl";

const CustomerReviews: React.FC = () => {
  const t = useTranslations("Reviews");

  const reviews = [
    {
      id: 1,
      name: t("reviews.review_1.name"),
      review: t("reviews.review_1.review"),
      rating: 5,
    },
    {
      id: 2,
      name: t("reviews.review_2.name"),
      review: t("reviews.review_2.review"),
      rating: 4,
    },
    {
      id: 3,
      name: t("reviews.review_3.name"),
      review: t("reviews.review_3.review"),
      rating: 5,
    }
  ];

  return (
    <>
      <h2 className="text-2xl font-bold my-6">{t("customer_reviews")}</h2>
      <div className="bg-slate-200 px-8 py-6 rounded-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-100 rounded-lg shadow-lg p-6 text-center"
              >
                <h3 className="font-semibold mb-2">{review.name}</h3>
                <p className="text-gray-600 mb-4">{review.review}</p>
                <div className="flex justify-center">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <span key={index} className="text-yellow-500 text-xl">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerReviews;
