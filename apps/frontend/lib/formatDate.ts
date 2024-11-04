// import { format, Locale } from "date-fns";
// import { enGB, th } from "date-fns/locale";
// import { usePathname } from "@/lib/i18n";
// import { AvailableLanguageTag } from "@/paraglide/runtime";

// const localeMap: Record<AvailableLanguageTag, Locale> = {
//     "en-us": enGB,
//     "th-th": th
// };

// type DateFormatString = "PP" | "P" | "PPP" | "PPPP";

// function getCurrentLanguage(): AvailableLanguageTag {
//     const pathname = usePathname();
//     const lang = pathname.split('/')[1] as AvailableLanguageTag;
//     return isValidLanguage(lang) ? lang : "en-us";
// }

// function isValidLanguage(lang: string): lang is AvailableLanguageTag {
//     return ["en-us", "th-th"].includes(lang as AvailableLanguageTag);
// }

// export function formatDate(
//     date: Date | number,
//     formatStr: DateFormatString | string = "PP"
// ): string {
//     const currentLang = getCurrentLanguage();
//     const locale = localeMap[currentLang];

//     try {
//         return format(date, formatStr, { locale });
//     } catch (error) {
//         console.error("Error formatting date:", error);
//         return format(date, formatStr, { locale: enGB });
//     }
// }

// export function formatDateWithLang(
//     date: Date | number,
//     lang: AvailableLanguageTag,
//     formatStr: DateFormatString | string = "PP"
// ): string {
//     const locale = localeMap[lang];

//     try {
//         return format(date, formatStr, { locale });
//     } catch (error) {
//         console.error("Error formatting date:", error);
//         return format(date, formatStr, { locale: enGB });
//     }
// }

import { format } from 'date-fns';

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, process.env.NEXT_PUBLIC_SHORT_DATE_FORMAT || 'P'); // เปลี่ยน 'P' เป็นรูปแบบวันที่ที่ต้องการ เช่น 'MM/dd/yyyy'
}
