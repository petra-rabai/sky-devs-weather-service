export const LanguageCodesArray = [
  'en',
  'ar',
  'bn',
  'bg',
  'zh',
  'zh_tw',
  'cs',
  'da',
  'nl',
  'fi',
  'fr',
  'de',
  'el',
  'hi',
  'hu',
  'it',
  'ja',
  'jv',
  'ko',
  'zh_cmn',
  'mr',
  'pl',
  'pt',
  'pa',
  'ro',
  'ru',
  'sr',
  'si',
  'sk',
  'es',
  'sv',
  'ta',
  'te',
  'tr',
  'uk',
  'ur',
  'vi',
  'zh_wuu',
  'zh_hsn',
  'zh_yue',
  'zu',
] as const;

export type LanguageCode = (typeof LanguageCodesArray)[number];

export function isLanguageCode(value: string): asserts value is LanguageCode {
  if (!LanguageCodesArray.includes(value as LanguageCode)) {
    throw new Error(`Invalid language code: ${value}`);
  }
}
