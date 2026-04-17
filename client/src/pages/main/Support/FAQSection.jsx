import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import enHome from './locales/en/home.json';
import arHome from './locales/ar/home.json';
import flecheDown from './assets/flecheDown.png';
import flecheUp from './assets/flecheup.png';
import './assets/fonts.css';

// 6 questions per page so pagination is always visible
const ITEMS_PER_PAGE = 6;

const FAQSection = () => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    const tData = isRTL ? arHome : enHome;
    
    // Helper to get nested keys like 'faq.q1'
    const t = (path) => {
        const parts = path.split('.');
        let current = tData;
        for (const part of parts) {
            if (current[part] === undefined) return path;
            current = current[part];
        }
        return current;
    };
    const [openIndex, setOpenIndex] = useState(0);
    const [page, setPage] = useState(0);

    const allFaqs = [
        { question: t('faq.q1'), answer: t('faq.a1') },
        { question: t('faq.q2'), answer: t('faq.a2') },
        { question: t('faq.q3'), answer: t('faq.a3') },
        { question: t('faq.q4'), answer: t('faq.a4') },
        { question: t('faq.q5'), answer: t('faq.a5') },
        { question: t('faq.q6'), answer: t('faq.a6') }
    ];


    const totalPages = Math.ceil(allFaqs.length / ITEMS_PER_PAGE);
    const pageFaqs = allFaqs.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

    const handlePage = (dir) => {
        setOpenIndex(null);
        setPage(p => Math.max(0, Math.min(totalPages - 1, p + dir)));
    };

    return (
        <section className="relative w-full text-white overflow-hidden pb-10" dir={isRTL ? 'rtl' : 'ltr'}>

            {/* ── Top Divider with Fleche Icon ── */}
           <div className="relative w-full flex flex-col items-center mb-14 gap-5">
  <div className="h-px w-full max-w-[1180px] mx-auto bg-[#1A1A21]" />

  <svg
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.999787 0H12.1718C12.3695 4.22243e-05 12.5628 0.0587139 12.7272 0.168598C12.8917 0.278482 13.0198 0.434646 13.0955 0.617346C13.1711 0.800046 13.1909 1.00108 13.1524 1.19503C13.1138 1.38898 13.0186 1.56715 12.8788 1.707L7.29279 7.293C7.10526 7.48047 6.85095 7.58579 6.58579 7.58579C6.32062 7.58579 6.06632 7.48047 5.87879 7.293L0.292787 1.707C0.152977 1.56715 0.057771 1.38898 0.0192034 1.19503C-0.0193641 1.00108 0.000439122 0.800046 0.0761092 0.617346C0.151779 0.434646 0.279919 0.278482 0.444329 0.168598C0.608738 0.0587139 0.802037 4.22243e-05 0.999787 0Z"
      fill="white"
    />
  </svg>
</div>

            <div className="max-w-3xl mx-auto px-6">

                {/* Section Header */}
               
                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {pageFaqs.map((item, idx) => {
                        const globalIdx = page * ITEMS_PER_PAGE + idx;
                        const isOpen = openIndex === globalIdx;
                        return (
                            <div
                                key={globalIdx}
                                className="bg-[#16141A] border border-white/[0.05] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10"
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                                    className={`w-full flex items-center px-8 py-5 gap-7 group ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                                >
                                    {/* Number */}
                                    <span className="font-poppins text-[17px] text-white/40 whitespace-nowrap shrink-0">
                                        {String(globalIdx + 1).padStart(2, '0')}
                                    </span>
                                    {/* Question */}
                                    <span className="flex-grow text-[18px] font-semibold leading-tight font-gilroy text-white tracking-tight" style={{ whiteSpace: 'pre-line' }}>
                                        {item.question}
                                    </span>
                                    {/* Icon */}
                                    <div className="shrink-0">
                                        {isOpen
                                            ? <Minus className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                                            : <Plus className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                                        }
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <div className={`pb-5 text-[#9A9A9A] leading-relaxed font-poppins text-[16px] ${isRTL ? 'pr-[82px] pl-8' : 'pl-[82px] pr-8'}`}>
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* ── Pagination — same style as GamesCatalog ── */}
                <div className="flex items-center justify-between mt-12 pt-8">
                    {/* Prev */}
                    <button
                        onClick={() => handlePage(-1)}
                        disabled={page === 0}
                        className="w-11 h-11 rounded-full bg-[#3457DC] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none shadow-[0_8px_20px_rgba(52,87,220,0.4)]"
                    >
                        {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>

                    {/* Counter */}
                    <div className="flex items-center gap-3">
                        <div className="bg-[#16141A] border border-white/5 rounded-lg px-4 py-1.5 text-sm">
                            <span className="text-white font-bold">{String(page + 1).padStart(2, '0')}</span>
                        </div>
                        <span className="text-white/40 text-sm font-medium">
                            {isRTL ? `من ${totalPages}` : `out of ${totalPages}`}
                        </span>
                    </div>

                    {/* Next */}
                    <button
                        onClick={() => handlePage(1)}
                        disabled={page >= totalPages - 1}
                        className="w-11 h-11 rounded-full bg-[#3457DC] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none shadow-[0_8px_20px_rgba(52,87,220,0.4)]"
                    >
                        {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* ── Bottom Divider with Fleche Icon ── */}
            <div className="relative w-full flex flex-col items-center mt-18 gap-5">

  <svg
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.999787 7.58594H12.1718C12.3695 7.5859 12.5628 7.52722 12.7272 7.41734C12.8917 7.30746 13.0198 7.15129 13.0955 6.96859C13.1711 6.78589 13.1909 6.58486 13.1524 6.39091C13.1138 6.19695 13.0186 6.01879 12.8788 5.87894L7.29279 0.292938C7.10526 0.105467 6.85095 0.000150681 6.58579 0.000150681C6.32062 0.000150681 6.06632 0.105467 5.87879 0.292938L0.292787 5.87894C0.152977 6.01879 0.057771 6.19695 0.0192034 6.39091C-0.0193641 6.58486 0.000439122 6.78589 0.0761092 6.96859C0.151779 7.15129 0.279919 7.30746 0.444329 7.41734C0.608738 7.52722 0.802037 7.5859 0.999787 7.58594Z"
      fill="white"
    />
  </svg>

   <div className="h-px w-full max-w-[1180px] mx-auto bg-[#1A1A21]" />
</div>
        </section>
    );
};

export default FAQSection;
