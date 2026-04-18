import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../../contexts/LanguageContext";
import { IoIosArrowRoundDown } from "react-icons/io";
import { Search, Globe, Shield, Zap, BookOpen, Layers } from "lucide-react";

// Fallback images if they exist, otherwise use placeholders or icons
import libIcon from "./assets/lib.svg";

const FeatureBadge = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
    <Icon size={14} className="text-blue-500" />
    <span className="text-[12px] font-bold text-gray-300 uppercase tracking-widest">{text}</span>
  </div>
);

const Welcome = () => {
    const { language } = useLanguage();
    const isRTL = language === "ar";

    const text = {
        badge: isRTL ? 'مختبر الأبحاث المتقدمة' : 'Advanced Research Lab',
        mainTitle: isRTL ? 'الأبـحاث العلمية' : 'SCIENTIFIC',
        subTitle: isRTL ? 'والمنشورات الأكاديمية' : 'RESEARCH ARCHIVE',
        description: isRTL 
            ? 'أرشيف متنامٍ باستمرار يضم أكثر من 1000 ورقة بحثية، جميعها مراجعة من قبل أقران لضمان التميز الأكاديمي والابتكار التكنولوجي.' 
            : 'A constantly growing archive of 1,000+ research papers, all peer-reviewed for academic excellence and technological innovation.'
    };

    return (
        <section
            className="relative w-full min-h-screen flex items-center justify-center bg-[#05030D] overflow-hidden border-b border-white/5"
            dir={isRTL ? "rtl" : "ltr"}
        >
            {/* Mesh Gradient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-blue-600/10 via-[#05030D] to-transparent pointer-events-none" />
            <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full opacity-30 pointer-events-none" />
            <div className="absolute top-[200px] left-[-100px] w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full opacity-30 pointer-events-none" />

            {/* Content Container */}
            <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
                
                {/* Top Badges */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap justify-center gap-3 mb-10"
                >
                    <FeatureBadge icon={Shield} text={isRTL ? 'موثق' : 'Peer Reviewed'} />
                    <FeatureBadge icon={Globe} text={isRTL ? 'عالمي' : 'Global Impact'} />
                    <FeatureBadge icon={Zap} text={isRTL ? 'مبتكر' : 'Ultra Fast'} />
                </motion.div>

                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-10"
                >
                    <h2 className="text-white text-5xl md:text-8xl lg:text-9xl font-black font-gilroy tracking-tight uppercase leading-[0.9]">
                        {text.mainTitle}
                    </h2>
                    <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-300 text-4xl md:text-7xl lg:text-8xl font-black font-gilroy tracking-tighter leading-[1.1] uppercase mt-2">
                        {text.subTitle}
                    </h1>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-[#7b829d] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12"
                    dir={isRTL ? 'rtl' : 'ltr'}
                >
                    {text.description}
                </motion.p>

                {/* CTA & Search Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col md:flex-row items-center gap-6 w-full max-w-2xl px-4"
                >
                    <div className="flex-1 w-full bg-white/[0.03] border border-white/10 rounded-2xl flex items-center px-6 py-4 focus-within:border-blue-500/50 transition-all shadow-xl group">
                        <Search className="text-blue-500 mr-4 group-focus-within:scale-110 transition-transform" />
                        <input 
                            type="text" 
                            placeholder={isRTL ? 'ابحث في أرشيف الأبحاث...' : 'Search research archive...'} 
                            className="bg-transparent border-none outline-none text-white w-full text-lg placeholder:text-gray-600"
                        />
                    </div>
                    <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap">
                        {isRTL ? 'استكشاف الأبحاث' : 'Explore Now'}
                    </button>
                </motion.div>

                {/* Features Bottom Row */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 mt-32"
                >
                    <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-white mb-2 font-gilroy">1K+</div>
                        <div className="text-[#a5a5b2] text-[10px] uppercase tracking-widest font-bold">{isRTL ? 'ورقة بحثية' : 'Papers'}</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-white mb-2 font-gilroy">24/7</div>
                        <div className="text-[#a5a5b2] text-[10px] uppercase tracking-widest font-bold">{isRTL ? 'دعم تقني' : 'Support'}</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-white mb-2 font-gilroy">15+</div>
                        <div className="text-[#a5a5b2] text-[10px] uppercase tracking-widest font-bold">{isRTL ? 'فريق بحثي' : 'Teams'}</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-white mb-2 font-gilroy">100%</div>
                        <div className="text-[#a5a5b2] text-[10px] uppercase tracking-widest font-bold">{isRTL ? 'دقة أكاديمية' : 'Accuracy'}</div>
                    </div>
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="h-12 w-px bg-gradient-to-b from-blue-600 to-transparent" />
                <IoIosArrowRoundDown className="text-white/40 text-[32px] animate-bounce" />
            </motion.div>

            <style>{`
                .font-gilroy {
                    font-family: "Gilroy", sans-serif;
                }
            `}</style>
        </section>
    );
};

export default Welcome;
