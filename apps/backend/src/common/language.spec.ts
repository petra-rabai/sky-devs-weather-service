import { isLanguageCode, LanguageCodesArray } from '@weather/common/language';

describe('isLanguageCode', () => {
  it('should not throw an error for valid language codes', () => {
    for (const code of LanguageCodesArray) {
      expect(() => isLanguageCode(code)).not.toThrow();
    }
  });

  it('should throw an error for invalid language codes', () => {
    const invalidCodes = ['xx', 'invalid', '', '123'];
    for (const code of invalidCodes) {
      expect(() => isLanguageCode(code)).toThrow(
        `Invalid language code: ${code}`,
      );
    }
  });
});
