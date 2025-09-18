import { useRouter } from 'next/router';
import en from '@src/locales/en.json';
import vi from '@src/locales/vi.json';

const translations = { en, vi };

export function useTranslation() {
  const { locale } = useRouter();
  const currentLocale = locale as keyof typeof translations;
  
  const t = (key: string, params?: Record<string, string | number>) => {
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[currentLocale] || translations.en;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value !== 'string') {
      return key; // fallback to key if translation not found
    }
    
    // Simple parameter replacement
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match: string, paramKey: string) => {
        return String(params[paramKey]) || match;
      });
    }
    
    return value;
  };

  return { t, locale: currentLocale };
}