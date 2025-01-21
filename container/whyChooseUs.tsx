const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      id: 1,
      title: "ارسال سریع",
      description: "ارسال فوری به تمام نقاط کشور.",
    },
    {
      id: 2,
      title: "ضمانت اصل بودن",
      description: "تمام محصولات با ضمانت اصل بودن عرضه می‌شوند.",
    },
    {
      id: 3,
      title: "پشتیبانی 24/7",
      description: "پشتیبانی آنلاین برای حل مشکلات و سوالات شما.",
    },
    {
      id: 4,
      title: "تخفیف‌های شگفت‌انگیز",
      description: "هر هفته محصولات تخفیفی جدید.",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold my-6">چرا ما </h2>
      <div className="bg-slate-200 p-10 my-8 rounded-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {reasons.map((reason) => (
              <div
                key={reason.id}
                className="text-center p-6 bg-gray-100 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
