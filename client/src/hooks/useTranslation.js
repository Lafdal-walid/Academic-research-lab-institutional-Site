import { useLanguage } from '../contexts/LanguageContext';
import translations from '../locales/index';

export const useTranslation = (namespace) => {
    const { language } = useLanguage();

    const t = (key, options) => {
        const lang = language || 'en';
        const ns = namespace || 'common';
        
        // Attempt to find the translation in the dictionary
        const translation = translations[lang]?.[ns]?.[key];
        
        if (translation) return translation;

        // Fallback to default value or formatted key
        return options?.defaultValue || key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
    };

    return { t, language };
};
