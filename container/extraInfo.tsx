import { useTranslations } from "next-intl";

const ExtraInfoComp: React.FC = () => {
  const t = useTranslations("ExtraInfo");
  return (
    <>
      <h2 className="text-2xl font-bold mt-6">{t("extra_info")}</h2>
      <div className="w-full bg-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 my-6 p-8 rounded-lg">
        <div className="w-full flex flex-col bg-slate-100 rounded-lg p-4">
          <h2 className="font-semibold text-lg p-2">
            {t("automatic_watches.title")}
          </h2>
          <p className="p-2 text-justify">
            {t("automatic_watches.description")}
          </p>
        </div>
        <div className="w-full flex flex-col bg-slate-100 rounded-lg p-4">
          <h2 className="font-semibold text-lg py-2">
            {t("skeleton_watches.title")}
          </h2>
          <p className="p-2 text-justify">
            {t("skeleton_watches.description")}
          </p>
        </div>
        <div className="w-full flex flex-col bg-slate-100 rounded-lg p-4">
          <h2 className="font-semibold text-lg p-2">
            {t("smart_watches.title")}
          </h2>
          <p className="p-2 text-justify">{t("smart_watches.description")}</p>
        </div>
        <div className="w-full flex flex-col bg-slate-100 rounded-lg p-4">
          <h2 className="font-semibold text-lg p-2">
            {t("chronograph_watches.title")}
          </h2>
          <p className="p-2 text-justify">
            {t("chronograph_watches.description")}
          </p>
        </div>
      </div>
    </>
  );
};

export default ExtraInfoComp;
