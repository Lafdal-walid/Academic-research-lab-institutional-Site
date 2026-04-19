import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../../contexts/LanguageContext";
import maskLeftImg from "./assets/Group 445.svg";
import maskRightImg from "./assets/Group 446.svg";
import labIcon1 from "./assets/New folder/Gemini_Generated_Image_rl2hmmrl2hmmrl2h-removebg-preview 1.svg";
import labIcon2 from "./assets/New folder/Hex Lab.svg";
import labIcon3 from "./assets/New folder/Circle.svg";
import libIcon from "./assets/lib.svg";
import { IoIosArrowRoundDown } from "react-icons/io";

const Welcome = () => {
    const { language } = useLanguage();
    const isRTL = language === "ar";

    // Fallback translations locally to avoid missing translation keys
    const text = {
        row1: isRTL ? 'مكتبة' : 'ADVANCED',
        row2_start: isRTL ? 'الأبـ' : 'RESE',
        row2_end: isRTL ? 'ـحاث المتقدمة.' : 'ARCH LIBRARY.',
        description: isRTL 
            ? 'كتالوج متوسع باستمرار يضم أكثر من 10,000 قطعة ألعاب، جميعها محسنة لتجربة لعب أسلس وأسرع.' 
            : 'A constantly expanding catalog of 10,000+ <br class="md:hidden" /> games, all optimized for smoother, <br class="md:hidden" /> faster play.'
    };

    const platformIcons = [
        labIcon1,
        labIcon2,
        labIcon3,
        labIcon1,
        labIcon2,
        labIcon3
    ];

    return (
        <section
            className="relative w-full min-h-screen flex items-center justify-center bg-[#0A070E] overflow-hidden"
            dir={isRTL ? "rtl" : "ltr"}
        >


            {/* Corner Frames */}
            <div className={`absolute top-28 ${isRTL ? 'right-6 md:right-16 border-r' : 'left-6 md:left-16 border-l'} w-40 h-40 border-t border-white/10 ${isRTL ? 'rounded-tr-3xl' : 'rounded-tl-3xl'}`}></div>
            <div className={`absolute bottom-28 ${isRTL ? 'left-6 md:left-16 border-l' : 'right-6 md:right-16 border-r'} w-40 h-40 border-b border-white/10 ${isRTL ? 'rounded-bl-3xl' : 'rounded-br-3xl'}`}></div>

            {/* Character 1 (Originally Left) */}
            <motion.div
                initial={{ opacity: 0, x: isRTL ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className={`absolute ${isRTL ? '-right-[8%] md:right-[5%]' : '-left-[8%] md:left-[5%]'} bottom-0 md:w-[20%] w-[50%] max-w-full md:max-w-[350px] pointer-events-none select-none`}
            >
                <div className="relative">
                    <img
                        src={maskLeftImg}
                        alt="Character mask"
                        className={`relative w-full ${isRTL ? 'scale-x-[-1]' : ''}`}
                    />
                </div>
            </motion.div>

            {/* Character 2 (Originally Right) */}
            <motion.div
                initial={{ opacity: 0, x: isRTL ? -80 : 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`absolute ${isRTL ? 'pl-6 left-0' : 'pr-6 right-0'} bottom-10 md:bottom-20 md:w-[40%] w-[60%] max-w-full md:max-w-[450px] pointer-events-none select-none`}
            >
                <div className="relative">
                    <img
                        src={maskRightImg}
                        alt="Character mask"
                        className={`relative w-full ${isRTL ? 'scale-x-[-1]' : ''}`}
                    />
                </div>
            </motion.div>


            {/* Center Content */}
            <div className={`relative z-20 w-full max-w-7xl mx-auto px-6 md:px-20 md:py-10 flex flex-col items-center md:items-start text-center md:text-start gap-2 md:gap-4 -translate-y-8 md:translate-y-0 ${isRTL ? 'md:right-8 font-tajawal' : 'md:left-8'}`}>

                {/* Localized Row 1 Glow */}
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#3457DC]/10 blur-[80px] rounded-full pointer-events-none -z-10"></div>
                <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-[#121634]/50 blur-[60px] rounded-full pointer-events-none -z-10"></div>

                {/* Background Grid (Contained) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* ROW 1: SUPPORTED + Blue Chart Circle */}
                <div className="flex flex-row items-center justify-center md:justify-start gap-2 md:gap-4 w-full md:w-auto">
                    <h2 className={`text-white tracking-wide ${isRTL ? 'text-[38px] sm:text-5xl md:text-[88px] lg:text-[95px]' : 'text-[32px] sm:text-4xl md:text-[78px] lg:text-[85px]'} font-black font-gilroy md:tracking-tighter leading-[1.1] md:leading-[0.9] uppercase`}>
                        {text.row1}
                    </h2>
                    <div className="relative flex w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#3457DC] rounded-full items-center justify-center shadow-[0_0_30px_rgba(52,87,220,0.5)] flex-shrink-0">
                        {/* Focused Glow Layer */}
                        <img 
                            src={libIcon} 
                            alt="library icon" 
                            className="w-[50%] h-[50%] object-contain brightness-0 invert" 
                        />
                    </div>
                </div>

                {/* ROW 2: GA + PLATFORM PILL + MES LIBRARY. */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-x-4 mt-2 w-full md:w-auto">
                    <div className="flex mt-2 items-center justify-center md:justify-start gap-2 md:gap-3 w-full md:w-auto flex-wrap">
                        <div className="flex items-center gap-2">
                            <h1 className={`text-white tracking-wide ${isRTL ? 'text-[34px] sm:text-4xl md:text-[88px] lg:text-[95px]' : 'text-[30px] sm:text-4xl md:text-[78px] lg:text-[85px]'} font-black font-gilroy md:tracking-tighter leading-[1.1] md:leading-[0.9] uppercase`}>
                                {text.row2_start}
                            </h1>

                            {/* Platform Pill Carousel (Inserted between on Mobile) */}
                            <div className="md:hidden relative w-[80px] h-8 bg-[#0E0E12]/40 backdrop-blur-2xl border border-white/10 rounded-full overflow-hidden flex items-center">
                                <motion.div
                                    className="flex items-center gap-4"
                                    animate={{ x: isRTL ? ["-50%", "0%"] : ["0%", "-50%"] }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear",
                                        repeatType: "loop"
                                    }}
                                >
                                    {[...platformIcons, ...platformIcons].map((icon, idx) => (
                                        <img
                                            key={idx}
                                            src={icon}
                                            alt=""
                                            className="h-2.5 object-contain opacity-70 shrink-0"
                                        />
                                    ))}
                                </motion.div>
                            </div>

                            <h1 className="md:hidden text-white text-[34px] font-black font-gilroy uppercase tracking-tighter leading-[1.1]">
                                {text.row2_end.split(' ')[0]}
                            </h1>
                        </div>

                        {/* Platform Pill Carousel (Desktop ONLY) */}
                        <div className="hidden md:flex relative w-[100px] md:w-[150px] lg:w-[200px] h-9 md:h-[50px] lg:h-[70px] bg-[#0E0E12]/40 backdrop-blur-2xl border border-white/10 rounded-full overflow-hidden items-center">
                            <motion.div
                                className="flex items-center gap-6"
                                animate={{ x: isRTL ? ["-50%", "0%"] : ["0%", "-50%"] }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear",
                                    repeatType: "loop"
                                }}
                            >
                                {[...platformIcons, ...platformIcons, ...platformIcons, ...platformIcons].map((icon, idx) => (
                                    <img
                                        key={idx}
                                        src={icon}
                                        alt=""
                                        className="h-3 md:h-4 lg:h-5 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] shrink-0"
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center md:items-start md:relative md:top-4 md:translate-y-2">
                        <h1 className={`text-white ${isRTL ? 'text-[32px] sm:text-4xl md:text-[80px] lg:text-[95px]' : 'text-[24px] sm:text-4xl md:text-[78px] lg:text-[85px]'} font-black font-gilroy tracking-tighter leading-[1.1] md:leading-[0.9] uppercase`}>
                            <span className="hidden md:inline">{text.row2_end}</span>
                        </h1>

                        <p
                            className={`text-gray-200 text-sm md:text-sm lg:text-base max-w-[300px] md:max-w-[500px] leading-relaxed md:mt-0 mt-1 md:leading-[1.1] !text-center md:!text-start ${isRTL ? 'font-tajawal' : ''}`}
                            dangerouslySetInnerHTML={{ __html: text.description }}
                        />
                    </div>
                </div>

            </div>


            {/* Scroll Indicator */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute flex items-center md:bottom-20 bottom-24 justify-center"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="relative flex items-center justify-center p-2"
                >
                    {/* The Glow */}
                    <div className="absolute inset-0 bg-[#3457DC]/20 blur-[30px] rounded-full scale-150"></div>
                    <div className="absolute inset-0 bg-[#121634]/60 blur-[20px] rounded-full scale-125"></div>
                    <IoIosArrowRoundDown className="relative text-white text-[42px]" />
                </motion.div>
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
