import 'server-only';
import { i18n } from './i18n-config';

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
    en: () => import('@/config/dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    // If locale isn't finding, default to 'en'
    const key = locale && Object.keys(dictionaries).includes(locale) ? locale : i18n.defaultLocale;
    // @ts-ignore
    return dictionaries[key]();
};
