import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";

// Contexts & Hooks
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

// Assets
import flecheDown from './assets/flecheDown.png';
import flecheUp from './assets/flecheup.png';
import carreFAQ from "./assets/carreFAQ.png";
import QstFAQ from "./assets/QstFAQ.png";
import backgroundCard from "./assets/backgroundcardFAQ.png";
import './assets/fonts.css';

// --- Sub-components (Consolidated from separate files) ---

const DiscordIcon = ({ width = '1.25rem', height = '1rem', className = '', fill = '#5865F2' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 20 16"
        fill="none"
        className={className}
    >
        <path d="M16.9309 1.26359C15.6559 0.678591 14.2892 0.247758 12.8601 0.00109171C12.8342 -0.00390829 12.8084 0.00859166 12.7942 0.031925C12.6184 0.344425 12.4234 0.752758 12.2876 1.07276C10.7501 0.842758 9.22091 0.842758 7.71507 1.07276C7.57924 0.745258 7.37674 0.344425 7.20091 0.031925C7.18674 0.00859166 7.16091 -0.00307496 7.13507 0.00109171C5.70674 0.246925 4.34007 0.677758 3.06424 1.26359C3.05341 1.26776 3.04341 1.27609 3.03757 1.28609C0.445073 5.15942 -0.265761 8.93776 0.0825727 12.6694C0.0842394 12.6878 0.0942394 12.7053 0.108406 12.7161C1.81924 13.9728 3.47591 14.7353 5.10257 15.2403C5.12841 15.2486 5.15591 15.2386 5.17257 15.2169C5.55757 14.6919 5.90007 14.1378 6.19424 13.5553C6.21174 13.5211 6.19507 13.4803 6.15924 13.4669C5.61507 13.2603 5.09757 13.0086 4.59924 12.7236C4.56007 12.7003 4.55674 12.6444 4.59257 12.6169C4.69757 12.5386 4.80257 12.4569 4.90257 12.3744C4.92091 12.3594 4.94591 12.3561 4.96757 12.3661C8.24091 13.8603 11.7842 13.8603 15.0184 12.3661C15.0401 12.3561 15.0651 12.3586 15.0842 12.3744C15.1842 12.4569 15.2892 12.5394 15.3951 12.6178C15.4317 12.6444 15.4292 12.7011 15.3892 12.7244C14.8909 13.0153 14.3734 13.2619 13.8284 13.4669C13.7926 13.4803 13.7776 13.5219 13.7942 13.5561C14.0942 14.1378 14.4376 14.6919 14.8151 15.2169C14.8309 15.2394 14.8592 15.2486 14.8851 15.2411C16.5192 14.7353 18.1767 13.9728 19.8867 12.7169C19.9017 12.7061 19.9109 12.6894 19.9126 12.6711C20.3292 8.35693 19.2142 4.60943 16.9559 1.28776C16.9517 1.27609 16.9417 1.26776 16.9309 1.26359ZM6.68341 10.3978C5.69757 10.3978 4.88591 9.49276 4.88591 8.38192C4.88591 7.27109 5.68174 6.36609 6.68341 6.36609C7.69257 6.36609 8.49674 7.27859 8.48091 8.38192C8.48091 9.49359 7.68424 10.3978 6.68341 10.3978ZM13.3292 10.3978C12.3442 10.3978 11.5317 9.49276 11.5317 8.38192C11.5317 7.27109 12.3276 6.36609 13.3292 6.36609C14.3384 6.36609 15.1426 7.27859 15.1267 8.38192C15.1267 9.49359 14.3384 10.3978 13.3292 10.3978Z" fill={fill} />
    </svg>
);

const CarreIcon = ({ className }) => (
    <svg className={className} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-inside-1_5680_93757" fill="white">
            <path d="M0 0H36V36H0V0Z" />
        </mask>
        <path d="M36 0H37V-1H36V0ZM0 0V1H36V0V-1H0V0ZM36 0H35V36H36H37V0H36Z" fill="white" mask="url(#path-1-inside-1_5680_93757)" />
    </svg>
);

const HerFAQ = () => {
    const { language } = useLanguage();
    const isRTL = language === "ar";

    return (
        <section
            className={`relative overflow-hidden bg-[#05030D] text-white pt-[50px] lg:pt-20 ${isRTL ? "font-tajawal" : "font-poppins"}`}
            dir={isRTL ? "rtl" : "ltr"}
        >
            <div className="pointer-events-none absolute inset-0 z-[1]">
                <div className="absolute top-0 left-0 lg:top-[40px] w-[234px] h-[326px] scale-[0.6] sm:scale-[0.8] lg:scale-100 origin-top-left">
                    <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.1 }} className="absolute top-0 left-0">
                        <svg width="234" height="235" viewBox="0 0 234 235" fill="none"><path d="M-181 0L17.2118 110.118L233.212 234.635L79.0471 206.682L-181 0Z" fill="#3457DC" /></svg>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.2 }} className="absolute top-[62px] left-0">
                        <svg width="130" height="224" viewBox="0 0 130 224" fill="none"><path d="M-47.1582 56.3737L129.877 223.624L47.7124 146L-88.6641 0L-47.1582 56.3737Z" fill="#3457DC" /></svg>
                    </motion.div>
                </div>
                <div className="absolute right-0 bottom-[20px] lg:bottom-auto lg:top-[190px] w-[190px] h-[179px] scale-[0.55] sm:scale-[0.8] lg:scale-100 origin-bottom-right lg:origin-top-right">
                    <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.1 }} className="absolute top-[120px] right-10">
                        <svg width="150" height="52" viewBox="0 0 150 52" fill="none"><path d="M38 42.5L150 0L91.5022 23L0 52L38 42.5Z" fill="#3457DC" /></svg>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.2 }} className="absolute top-0 right-0">
                        <svg width="154" height="179" viewBox="0 0 154 179" fill="none"><path d="M261.5 61.3828L272.5 0L176.5 138.352L0 179L261.5 61.3828Z" fill="#3457DC" /></svg>
                    </motion.div>
                </div>
            </div>

            <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-8 pb-10">
                <div className="relative flex min-h-[360px] sm:min-h-[400px] lg:min-h-[300px] items-start lg:items-center pt-[30px] sm:pt-[60px] lg:pt-[100px] lg:left-20">
                    <div className="relative w-full">
                        <div className="relative hidden lg:block h-[260px]">
                            <CarreIcon className={`absolute w-[46px] h-[46px] z-20 ${isRTL ? "left-[130px] xl:left-[269px] 2xl:left-[200px] top-[14px] scale-x-[-1]" : "right-[160px] xl:right-[269px] 2xl:right-[300px] top-[30px]"}`} />
                            <CarreIcon className={`absolute w-[46px] h-[46px] z-20 ${isRTL ? "right-[130px] xl:right-[269px] 2xl:right-[300px] bottom-[14px] scale-y-[-1]" : "left-[150px] bottom-[-8px] scale-x-[-1] scale-y-[-1]"}`} />
                            <motion.div className={`absolute top-[28px] flex items-center gap-[14px] ${isRTL ? "right-[240px] xl:right-[380px] 2xl:right-[410px]" : "left-[100px] xl:left-[195px] 2xl:left-[150px]"}`}>
                                <span className="h-[4px] w-[40px] bg-white " />
                                <span className="font-poppins text-[20px] font-medium text-white/95">{isRTL ? "يُعرف بـ FAQ" : "Aka. FAQ"}</span>
                            </motion.div>
                            <div className={`absolute top-[60px] w-full flex items-start justify-center ${isRTL ? "text-right left-[-30px] gap-[30px] xl:gap-[94px]" : "left-[-70px] text-left gap-[200px] xl:gap-[58px]"}`}>
                                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.08 }} className="flex flex-col">
                                    <h1 className={`${isRTL ? "font-tajawal" : "font-gilroy"} font-extrabold text-[84px] leading-[100%] uppercase`}>
                                        {isRTL ? <>الأسئلة<br />شيوعًا</> : <>FREQUENTLY<br />QUESTION</>}
                                    </h1>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.12 }} className="flex flex-col pt-[4px] items-start">
                                    <h1 className={`${isRTL ? "font-tajawal" : "font-gilroy"} font-extrabold text-[80px] leading-[100%] uppercase`}>{isRTL ? "الأكثر" : "ASKED"}</h1>
                                    <motion.div initial={{ opacity: 0, x: isRTL ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.82, delay: 0.24 }} className={`mt-[20px] ${isRTL ? "w-[260px]" : "w-[229px]"}`}>
                                        <div className="relative p-0 pt-2">
                                            <div className="absolute -bottom-[24px] w-[290px] -left-[60px] -right-[40px] -top-[12px] bg-repeat pointer-events-none" style={{ backgroundImage: `url(${carreFAQ})` }} />
                                            <p className="relative z-10 font-inter text-[14px] leading-none text-white">{isRTL ? "إجابات مفصّلة لأكثر ما يشغل المستخدمين حول معهد سعد دحلب للبحوث في مكان واحد." : "Find quick answers to the most common questions about the Saad Dahlab Research Institute."}</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                            <motion.div className={`pointer-events-none absolute z-20 ${isRTL ? "left-[50%] lg:left-[610px] -translate-x-1/2 top-[-25px]" : "left-[600px] top-[-24px]"}`}>
                                <img src={QstFAQ} className={isRTL ? "scale-x-[-1]" : ""} alt="?" />
                            </motion.div>
                        </div>

                        <div className="mx-auto flex w-full flex-col px-[20px] items-start text-left lg:hidden relative z-10">
                            <CarreIcon className={`absolute w-[26px] h-[26px] z-20 ${isRTL ? "left-[12px] top-[15px] scale-x-[-1]" : "right-[12px] top-[15px]"}`} />
                            <CarreIcon className={`absolute w-[26px] h-[26px] z-20 ${isRTL ? "right-[12px] bottom-[-25px] scale-y-[-1]" : "left-[12px] bottom-[-25px] rotate-90"}`} />
                            <motion.div className={`mb-5 mt-[100px] flex items-center gap-[8px] z-10 ${isRTL ? "self-end" : ""}`}>
                                <span className="h-[2px] w-[20px] bg-white " />
                                <span className="font-poppins text-[12px] font-bold text-white/95">{isRTL ? "يُعرف بـ FAQ" : "Aka. FAQ"}</span>
                            </motion.div>
                            <div className="relative w-full z-10">
                                <motion.h1 className={`${isRTL ? "font-tajawal text-right" : "font-gilroy text-left"} text-[56px] font-extrabold uppercase leading-[1.2] text-white my-0 mt-[-10px] relative z-10`}>
                                    {isRTL ? <>الأسئلة<br />الأكثر<br />شيوعًا</> : <>FREQUENTLY<br />ASKED<br />QUESTION</>}
                                </motion.h1>
                                <motion.div className={`pointer-events-none absolute z-[5] ${isRTL ? "left-[20px] top-[-15px]" : "right-[-60px] top-[-35px]"}`}>
                                    <img src={QstFAQ} className={`h-[180px] w-auto ${isRTL ? "scale-x-[-1]" : ""} drop-shadow-[0_0_15px_rgba(52,87,220,0.25)]`} alt="?" />
                                </motion.div>
                            </div>
                            <motion.div className={`mt-[5px] mb-5 w-full max-w-[290px] relative z-10 ${isRTL ? "self-end" : ""}`}>
                                <div className="relative p-0 pt-0 pb-1">
                                    <div className={`absolute -bottom-[20px] -top-[10px] opacity-[0.9] bg-repeat pointer-events-none z-[-1] ${isRTL ? "-right-[20px] -left-[40px]" : "-left-[20px] -right-[40px]"}`} style={{ backgroundImage: `url(${carreFAQ})` }} />
                                    <p className={`relative z-10 font-inter text-[14px] leading-[1.4] text-white/95 ${isRTL ? "text-right" : "text-left"}`}>
                                        {isRTL ? "إجابات مفصّلة لأكثر ما يشغل المستخدمين حول معهد سعد دحلب للبحوث في مكان واحد." : "Find quick answers to the most common questions about the Saad Dahlab Research Institute."}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FAQSection = () => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    const [openIndex, setOpenIndex] = useState(0);
    const [page, setPage] = useState(0);
    const ITEMS_PER_PAGE = 6;

    const allFaqs = [
        { 
            question: isRTL ? 'ما هي مجالات البحث الرئيسية للفريق؟' : 'What are the team\'s primary research areas?', 
            answer: isRTL ? 'نحن نركز على تحليل البيانات الضخمة، والنمذجة التنبؤية باستخدام التعلم الآلي، وتحسين أنظمة إدارة المستودعات (WMS) لتعزيز كفاءة الخدمات اللوجستية من خلال الرؤى القائمة على البيانات.' : 'We focus on Big Data analysis, predictive modeling using Machine Learning, and optimizing Warehouse Management Systems (WMS) to enhance logistics efficiency through data-driven insights.' 
        },
        { 
            question: isRTL ? 'ما هي التقنيات وأطر العمل التي نستخدمها؟' : 'Which technologies and frameworks do we utilize?', 
            answer: isRTL ? 'نحن نستخدم مجموعة متنوعة من التقنيات الحديثة بما في ذلك React وNode.js وPython ومختلف أطر عمل الذكاء الاصطناعي.' : 'We utilize a variety of modern technologies including React, Node.js, Python, and various AI frameworks.' 
        },
        { 
            question: isRTL ? 'كيف تؤثر البرمجة التنافسية على عملنا؟' : 'How does competitive programming influence our work?', 
            answer: isRTL ? 'تساهم البرمجة التنافسية في صقل مهاراتنا في حل المشكلات وتحسين كفاءة الخوارزميات التي نطورها.' : 'Competitive programming helps sharpen our problem-solving skills and improves the efficiency of the algorithms we develop.' 
        },
        { 
            question: isRTL ? 'هل نحن منفتحون على التعاون المهني؟' : 'Are we open to professional collaborations?', 
            answer: isRTL ? 'نعم، نحن دائماً نتطلع للعمل مع شركاء الصناعة والباحثين الأكادميين لتطوير حلول مبتكرة في مجال التكنولوجيا.' : 'Yes, we are always looking to collaborate with industry partners and academic researchers to develop innovative technological solutions.' 
        },
        { 
            question: isRTL ? 'ما الذي يجعل حلولنا البرمجية فريدة؟' : 'What makes our software solutions unique?', 
            answer: isRTL ? 'تعتمد حلولنا على أبحاث أكاديمية رصينة ويتم اختبارها في بيئات لوجستية حقيقية لضمان أقصى درجات الموثوقية والكفاءة.' : 'Our solutions are grounded in robust academic research and tested in real-world logistics environments to ensure maximum reliability and efficiency.' 
        },
        { 
            question: isRTL ? 'أين يمكنني الوصول إلى منشوراتنا وأكواد المصدر؟' : 'Where can I access our publications and source code?', 
            answer: isRTL ? 'يمكنك العثور على منشوراتنا في المجلات العلمية المرموقة، بينما تتوفر مشاريعنا مفتوحة المصدر على حسابنا في GitHub.' : 'You can find our publications in prestigious scientific journals, and our open-source projects are available on our GitHub account.' 
        },
    ];

    const totalPages = Math.ceil(allFaqs.length / ITEMS_PER_PAGE);
    const pageFaqs = allFaqs.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

    const handlePage = (dir) => {
        setOpenIndex(null);
        setPage(p => Math.max(0, Math.min(totalPages - 1, p + dir)));
    };

    return (
        <section className={`relative w-full text-white overflow-hidden pb-10 ${isRTL ? 'font-tajawal' : 'font-poppins'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="relative w-full flex flex-col items-center mb-14 gap-5">
                <div className="h-px w-full max-w-[1180px] mx-auto bg-[#1A1A21]" />
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M0.999787 0H12.1718C12.3695 0 12.5628 0.05 12.72 0.16C12.89 0.27 13.01 0.43 13.09 0.61C13.17 0.8 13.19 1.0 13.15 1.19C13.11 1.38 13.01 1.56 12.87 1.7L7.29 7.29C7.1 7.48 6.85 7.58 6.58 7.58C6.32 7.58 6.06 7.48 5.87 7.29L0.29 1.7C0.15 1.56 0.05 1.38 0.01 1.19C-0.01 1 0 0.8 0.07 0.61C0.15 0.43 0.27 0.27 0.44 0.16C0.6 0.05 0.8 0 0.99 0Z" fill="white" /></svg>
            </div>
            <div className="max-w-3xl mx-auto px-6">
                <div className="space-y-4">
                    {pageFaqs.map((item, idx) => {
                        const globalIdx = page * ITEMS_PER_PAGE + idx;
                        const isOpen = openIndex === globalIdx;
                        return (
                            <div key={globalIdx} className="bg-[#16141A] border border-white/[0.05] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10">
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                                    className={`w-full flex items-center px-8 py-5 gap-7 group ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                                >
                                    <span className="font-poppins text-[17px] text-white/40 whitespace-nowrap shrink-0">{String(globalIdx + 1).padStart(2, '0')}</span>
                                    <span className="flex-grow text-[18px] font-semibold leading-tight font-gilroy text-white tracking-tight">{item.question}</span>
                                    <div className="shrink-0">{isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}</div>
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                            <div className={`pb-5 text-[#9A9A9A] leading-relaxed font-poppins text-[16px] ${isRTL ? 'pr-[82px] pl-8' : 'pl-[82px] pr-8'}`}>{item.answer}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center justify-between mt-12 pt-8">
                    <button onClick={() => handlePage(-1)} disabled={page === 0} className="w-11 h-11 rounded-full bg-[#3457DC] flex items-center justify-center text-white disabled:opacity-30">
                        {isRTL ? <ChevronRight /> : <ChevronLeft />}
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="bg-[#16141A] border border-white/5 rounded-lg px-4 py-1.5 text-sm"><span className="text-white font-bold">{String(page + 1).padStart(2, '0')}</span></div>
                        <span className="text-white/40">{isRTL ? `من ${totalPages}` : `out of ${totalPages}`}</span>
                    </div>
                    <button onClick={() => handlePage(1)} disabled={page >= totalPages - 1} className="w-11 h-11 rounded-full bg-[#3457DC] flex items-center justify-center text-white disabled:opacity-30">
                        {isRTL ? <ChevronLeft /> : <ChevronRight />}
                    </button>
                </div>
            </div>
            <div className="relative w-full flex flex-col items-center mt-18 gap-5">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M0.99 7.58H12.17C12.36 7.58 12.56 7.52 12.72 7.41C12.89 7.3 13.01 7.15 13.09 6.96C13.17 6.78 13.19 6.58 13.15 6.39C13.11 6.19 13.01 6.01 12.87 5.87L7.29 0.29C7.1 0.1 6.85 0 6.58 0C6.32 0 6.06 0.1 5.87 0.29L0.29 5.87C0.15 6.01 0.05 6.19 0.01 6.39C-0.01 6.58 0 6.78 0.07 6.96C0.15 7.15 0.27 7.3 0.44 7.41C0.6 7.52 0.8 7.58 0.99 7.58Z" fill="white" /></svg>
                <div className="h-px w-full max-w-[1180px] mx-auto bg-[#1A1A21]" />
            </div>
        </section>
    );
};

const CardFAQ = () => {
    const { language } = useLanguage();
    const isRTL = language === "ar";

    return (
        <section className={`bg-[#05030D] px-4 pb-16 ${isRTL ? 'font-tajawal' : 'font-poppins'}`}>
            <div className="mx-auto max-w-[820px]">
                <div dir={isRTL ? "rtl" : "ltr"} className="relative overflow-hidden rounded-[28px] border border-white/10 min-h-[320px] px-8 py-12 flex flex-col items-center justify-center text-center" style={{ backgroundImage: `url(${backgroundCard})`, backgroundSize: "cover", backgroundColor: "#08080819" }}>
                    <div className="relative z-10 w-full max-w-[560px]">
                        <h2 className={`mb-10 text-white font-extrabold text-[30px] ${isRTL ? "font-tajawal" : "font-gilroy"}`}>
                            {isRTL ? "لم تجد الإجابة التي تبحث عنها؟" : "Didn’t find the answer you were looking for?"}
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="w-full sm:w-auto min-w-[180px] bg-[#3457DC] hover:bg-[#2c4ecf] text-white rounded-[14px] px-6 py-5 flex items-center justify-center gap-2 font-semibold transition-all hover:scale-105 active:scale-95">
                                <span>{isRTL ? "تواصل معنا" : "Contact us"}</span>
                            </button>
                            <button className="w-full sm:w-auto min-w-[180px] bg-[#1D1D26] hover:bg-[#2a2a35] text-white rounded-[14px] px-6 py-5 flex items-center justify-center gap-2 font-semibold transition-all hover:scale-105 active:scale-95">
                                <span>{isRTL ? "انضم للمجتمع" : "Join Community"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Main Support Component ---

function Support() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <main className="relative bg-[#05030D]">
            <HerFAQ />
            <div className="relative pb-12 pt-20 sm:pt-24">
                <FAQSection />
            </div>
            <CardFAQ />
        </main>
    );
}

export default Support;
