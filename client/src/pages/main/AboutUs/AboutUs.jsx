import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiArrowUpRight } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

// Contexts & Hooks
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

// --- 1. Hero Section (About Us) ---
const HerAbout = () => {
    const { t, language } = useTranslation("about");
    const isRTL = language === "ar";

    return (
        <section className="relative w-full h-[396px] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#020203]">
            {/* Blue Radial Glow from Figma */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1d4ed815_0%,transparent_70%)] pointer-events-none"></div>
            
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-4xl md:text-5xl font-black mb-4 text-blue-600 uppercase tracking-tighter ${isRTL ? "font-arabic" : "font-gilroy"}`}
            >
                {isRTL ? "من نحن" : "About Us"}
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-2xl text-zinc-500 text-sm leading-relaxed font-medium"
            >
                {isRTL 
                    ? "مختبر بحثي أكاديمي متخصص في علوم الحاسوب والذكاء الاصطناعي، يضم نخبة من الباحثين والمهندسين." 
                    : "An academic research lab specializing in CS and AI, bringing together elite researchers and engineers."}
            </motion.p>
        </section>
    );
};

// --- 2. Stats Section ---
const StatsSection = () => {
    const { language } = useLanguage();
    const isRTL = language === "ar";
    
    const stats = [
        { label: isRTL ? "باحث ومهندس" : "Researchers", val: "+30" },
        { label: isRTL ? "ورقة بحثية" : "Publications", val: "+50" },
        { label: isRTL ? "مشروع بحثي" : "Projects", val: "+20" },
        { label: isRTL ? "جائزة" : "Awards", val: "+15" }
    ];

    return (
        <section className="max-w-[896px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-6 mb-32 relative z-10">
            {stats.map((stat, i) => (
                <div key={i} className="bg-[#050506] border border-white/5 p-6 rounded-xl text-center hover:border-blue-600/30 transition-all group">
                    <div className="text-2xl font-black text-white mb-1 group-hover:scale-110 transition-transform">{stat.val}</div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold">{stat.label}</div>
                </div>
            ))}
        </section>
    );
};

// --- 3. Mission & Vision (The 325px Cards) ---
const MissionSection = () => {
    const { language } = useLanguage();
    const isRTL = language === "ar";

    const cards = [
        { title: isRTL ? "قيمنا" : "Our Values", text: isRTL ? "الابتكار، التعاون، والتميز الأكاديمي." : "Innovation, collaboration, and academic excellence." },
        { title: isRTL ? "رؤيتنا" : "Our Vision", text: isRTL ? "أن نكون مختبراً بحثياً رائداً عالمياً." : "To be a leading global research laboratory." },
        { title: isRTL ? "مهمتنا" : "Our Mission", text: isRTL ? "تطوير حلول تقنية مبتكرة للمجتمع." : "Developing innovative tech solutions for society." }
    ];

    return (
        <section className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 px-6 mb-40">
            {cards.map((card, i) => (
                <div key={i} className="w-full md:w-[325px] h-[246px] p-8 rounded-[12px] border border-[#2E2E38] bg-[#050506] flex flex-col justify-center text-center hover:bg-[#08080a] transition-all relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    <h4 className="text-lg font-bold mb-4 text-blue-500 uppercase italic">{card.title}</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed font-medium">{card.text}</p>
                </div>
            ))}
        </section>
    );
};

// --- 4. Timeline Section (Timeline Vertical) ---
const TimelineSection = () => {
    const { language } = useLanguage();
    const isRTL = language === "ar";

    const events = [
        { year: "2018", text: isRTL ? "تأسيس المختبر" : "Lab Foundation" },
        { year: "2021", text: isRTL ? "تمويل البحث العلمي" : "Research Funding" },
        { year: "2024", text: isRTL ? "50+ ورقة منشورة" : "50+ Published Papers" }
    ];

    return (
        <section className="max-w-4xl mx-auto px-6 mb-40" dir={isRTL ? "rtl" : "ltr"}>
            <h3 className="text-2xl font-black mb-16 text-center text-white uppercase tracking-tighter italic">
                {isRTL ? "مسيرتنا" : "Our Journey"}
            </h3>
            <div className={`relative border-zinc-800 ${isRTL ? "border-r-2 pr-8 text-right" : "border-l-2 pl-8 text-left"}`}>
                {events.map((event, i) => (
                    <div key={i} className="mb-12 relative group" data-aos="fade-up">
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)] ${isRTL ? "-right-[41px]" : "-left-[41px]"}`}></div>
                        <span className="text-blue-500 font-mono font-black text-lg block mb-1">{event.year}</span>
                        <p className="text-zinc-400 text-sm font-medium">{event.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// --- 5. Contact CTA Section ---
const ContactCTA = () => {
    const { language } = useLanguage();
    const isRTL = language === "ar";

    return (
        <section className="w-full h-[374px] bg-[#050506] border-y border-white/5 flex flex-col items-center justify-center text-center px-6 mb-20 relative overflow-hidden">
             <div className="absolute inset-0 opacity-[0.02] bg-[grid-white_1px] [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
             <h2 className="text-2xl md:text-3xl font-black mb-8 text-white relative z-10">
                {isRTL ? "تواصل معنا" : "STAY CONNECTED"}
             </h2>
             <div className="flex gap-4 relative z-10 font-bold">
                <button className="px-8 py-3 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition-all flex items-center gap-2">
                    {isRTL ? "فريقنا" : "Our Team"} <FiArrowUpRight />
                </button>
                <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-all">
                    {isRTL ? "المنشورات" : "Publications"}
                </button>
             </div>
             <div className="mt-8 flex items-center gap-2 text-zinc-600 text-[11px] font-mono">
                <FiMail className="text-blue-500" /> LAB@UNIVERSITY.DZ
             </div>
        </section>
    );
};

// --- Main About Component ---
function About() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <main className="bg-[#020203] min-h-screen">
            <HerAbout />
            <StatsSection />
            <MissionSection />
            <TimelineSection />
            <ContactCTA />
        </main>
    );
}

export default About;
