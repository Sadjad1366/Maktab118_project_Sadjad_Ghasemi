import { useTranslations } from "next-intl";

const WhyChooseUs: React.FC = () => {

  const t = useTranslations("Why");
  const reasons = [
    {
      id: 1,
      title: t("reasons.fast_shipping.title"),
      description: t("reasons.fast_shipping.description"),
    },
    {
      id: 2,
      title: t("reasons.authenticity_guarantee.title"),
      description: t("reasons.authenticity_guarantee.description"),
    },
    {
      id: 3,
      title: t("reasons.support_24_7.title"),
      description: t("reasons.support_24_7.description"),
    },
    {
      id: 4,
      title: t("reasons.amazing_discounts.title"),
      description: t("reasons.amazing_discounts.description"),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold my-6">{t("why_choose_us")}</h2>
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
