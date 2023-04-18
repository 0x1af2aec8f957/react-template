/// i18next-doc: https://www.i18next.com
/// react-i18next-doc: https://react.i18next.com
import i18n from "i18next";
import http from 'axios';
import { initReactI18next } from "react-i18next";

import zh_CN from '../lang/zh-CN.yml';
import en_US from '../lang/en-US.yml';

type MessageSchema = typeof en_US | typeof zh_CN;

type Locale = string;

const isProduction: boolean = process.env.NODE_ENV === 'production';
const defaultNS = window.navigator.language;

export const resources = {
    zh_CN,
    en_US,
} as const;

const languages: Locale[] = Object.keys(resources);

const fallbackLocale/* FallbackLocale */ = (languages.includes(defaultNS)
    ? defaultNS
    : languages.find((lan: string) => lan.indexOf(defaultNS.split('-')[0]) > -1) ?? defaultNS) as keyof typeof resources;

i18n
    .use(initReactI18next)
    .init({ /// doc: https://www.i18next.com/overview/configuration-options
        lng: fallbackLocale,
        ns: languages,
        defaultNS,
        resources,
        supportedLngs: languages,
        fallbackLng: fallbackLocale,
        debug: !isProduction,
        interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
        }
    });

// i18n.changeLanguage('en-US');

export type LangKeyString = typeof fallbackLocale;

export const getI18nLanguage = () => i18n.resolvedLanguage as LangKeyString; // 获取语言
export function setI18nLanguage(lang: LangKeyString = fallbackLocale): Locale { // 设置规则：完全匹配 -> 模糊匹配 -> 默认语言
    // const { global: { locale, availableLocales }, mode } = i18n;
    const locale = getI18nLanguage();
    const availableLocales = languages;

    if (locale === lang) return lang; // 不允许重复设置语言
    const language: LangKeyString = availableLocales.includes(lang)
        ? lang
        : (availableLocales.find((lan: Locale) => lan.indexOf(lang.split('-')[0]) > -1) ?? defaultNS) as LangKeyString;

    // set i18n
    i18n.changeLanguage(lang);

    http.defaults.headers.common['Accept-Language'] = language; // set http

    document.documentElement?.setAttribute('lang', language.split(/-/)[0]); // set html
    return language;
}

export default i18n;

declare module 'react-i18next' {
    // and extend them!
    interface CustomTypeOptions {
      // custom namespace type if you changed it
      defaultNS: typeof defaultNS;
      // custom resources type
      resources: {
        zh_CN: typeof zh_CN;
        en_US: typeof en_US;
      };
    }
  };