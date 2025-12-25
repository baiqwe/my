export const i18n = {
    defaultLocale: 'en',
    locales: ['en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const addLocaleToPath = (path: string, locale: string) => {
    if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
        return path;
    }
    return `/${locale}${path.startsWith('/') ? '' : '/'}${path}`;
};
