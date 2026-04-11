import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        const saved = localStorage.getItem('preferredLanguage');
        return (saved === 'en' || saved === 'ar') ? saved : 'en';
    });

    const direction = language === 'ar' ? 'rtl' : 'ltr';

    const setLanguage = (lang) => {
        setLanguageState(lang);
        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    };

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, direction }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
    return context;
};
