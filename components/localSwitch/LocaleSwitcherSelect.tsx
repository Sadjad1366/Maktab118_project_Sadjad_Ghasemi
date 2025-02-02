"use client";

import { Locale, routing } from "@/i18n/routing";
import { useRouter, usePathname } from "@/i18n/routing"; // ✅ Correct import
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./Select";

type Props = {
  defaultValue: string;
};

export default function LocaleSwitcherSelect({ defaultValue }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function handleLocaleChange(nextLocale: string) {
    router.replace(
      { pathname }, // ✅ Removed `params`
      { locale: nextLocale as Locale }
    );
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[80px] h-8 bg-slate-600 border-none text-white focus:ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {locale.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
