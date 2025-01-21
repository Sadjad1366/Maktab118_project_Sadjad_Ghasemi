const reviews = [
  {
    id: 1,
    name: "علی رضایی",
    review: "کیفیت محصولات بسیار عالی بود. ممنون از فروشگاه خوبتون!",
    rating: 5,
  },
  {
    id: 2,
    name: "مهسا احمدی",
    review: "ارسال سریع و بسته‌بندی مناسب. حتما دوباره خرید خواهم کرد.",
    rating: 4,
  },
  {
    id: 3,
    name: "محمد جوادی",
    review: "محصولات اصل و باکیفیت. تجربه خرید خوبی داشتم.",
    rating: 5,
  },
];

const CustomerReviews: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold my-6 ">نظرات مشتریان</h2>
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
    </div>
  );
};

export default CustomerReviews;
