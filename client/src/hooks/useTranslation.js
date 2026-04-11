import { useLanguage } from '../contexts/LanguageContext';

export const useTranslation = (namespace) => {
    const { language } = useLanguage();

    const t = (key, options) => {
        // Simple translation mock
        return options?.defaultValue || key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
    };

    return { t, language };
};
