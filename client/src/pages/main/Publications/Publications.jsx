import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFileText, FiExternalLink, FiDownload, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

// Contexts & Hooks
import { useLanguage } from "@/contexts/LanguageContext";

const Publications = () => {
    const { language } = useLanguage();
    const isRTL = language === "ar";
    
    // States للبحث والفلترة كيما في الصور
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("All");

    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    // بيانات تجريبية مبنية على "Scientific Publications" لي في الصور
    const pubs = [
        {
            id: "01",
            year: "2024",
            title: "Advanced Machine Learning for Logistics Optimization",
            authors: "Dr. Ahmed Mansouri, Sarah Chen",
            type: "Journal",
            source: "IEEE Transactions on AI",
            link: "#"
        },
        {
            id: "02",
            year: "2023",
            title: "Blockchain Security in Supply Chain Management",
            authors: "Prof. Lamine Touati, M. Bekhti",
            type: "Conference",
            source: "International Cyber-Sec Conference",
            link: "#"
        },
        {
            id: "03",
            year: "2023",
            title: "Real-time Data Processing in Smart Cities",
            authors: "Yasmine Dahmani, S. Benali",
            type: "Article",
            source: "ScienceDirect - Tech Review",
            link: "#"
        }
    ];

    return (
        <main className="bg-[#020203] min-h-screen pt-32 pb-20 px-6 font-gilroy">
            {/* 1. Header Section - بناءً على Figma */}
            <div className="max-w-6xl mx-auto mb-16" data-aos="fade-down">
                <h1 className={`text-4xl md:text-6xl font-[950] text-white uppercase italic tracking-tighter mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                    {isRTL ? "المنشورات العلمية" : "Scientific Publications"}
                </h1>
                <div className="h-1 w-24 bg-blue-600 rounded-full"></div>
            </div>

            {/* 2. Search & Tabs Bar (Detailed from images) */}
            <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row gap-6 items-center justify-between border-b border-white/5 pb-8">
                {/* Tabs Filter */}
                <div className="flex gap-4 overflow-x-auto w-full md:w-auto no-scrollbar">
                    {["All", "Journal", "Conference", "Article"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full text-xs font-bold transition-all border ${
                                activeTab === tab 
                                ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]" 
                                : "bg-transparent border-white/10 text-zinc-500 hover:border-white/30"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-80">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input 
                        type="text"
                        placeholder={isRTL ? "ابحث عن منشور..." : "Search publications..."}
                        className={`w-full bg-[#08080a] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-blue-600/50 outline-none transition-all ${isRTL ? "text-right pr-12 pl-4" : ""}`}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* 3. Publications List (The Table-like view from Screenshots) */}
            <div className="max-w-6xl mx-auto space-y-6">
                <AnimatePresence>
                    {pubs.map((pub, index) => (
                        <motion.div
                            key={pub.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-[#050506] border border-white/5 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6 hover:bg-[#08080a] transition-all overflow-hidden"
                        >
                            {/* Blue Accent on hover */}
                            <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>

                            {/* Year/ID Circle */}
                            <div className="shrink-0 w-14 h-14 rounded-full border border-white/10 flex flex-col items-center justify-center text-white group-hover:border-blue-600/50 transition-colors">
                                <span className="text-[10px] text-zinc-600 font-bold leading-none">{pub.year}</span>
                                <span className="text-lg font-black">{pub.id}</span>
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">
                                        {pub.type}
                                    </span>
                                    <span className="text-[10px] text-zinc-600 italic">{pub.source}</span>
                                </div>
                                <h3 className={`text-lg md:text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-500 transition-colors ${isRTL ? "text-right" : "text-left"}`}>
                                    {pub.title}
                                </h3>
                                <div className={`flex items-center gap-2 text-zinc-500 text-xs ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <FiFileText size={14} className="text-zinc-700" />
                                    <span>{pub.authors}</span>
                                </div>
                            </div>

                            {/* Actions (The buttons in the screenshots) */}
                            <div className="flex gap-3 shrink-0">
                                <a href={pub.link} className="p-3 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                                    <FiDownload size={18} />
                                </a>
                                <a href={pub.link} className="p-3 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                                    <FiExternalLink size={18} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* 4. Pagination (كما في الصورة الأخيرة) */}
            <div className="max-w-6xl mx-auto mt-16 flex items-center justify-center gap-4">
                <button className="p-2 rounded-lg bg-white/5 text-zinc-500 hover:text-white transition-colors">
                    <FiChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                    {[1, 2, 3].map(page => (
                        <button 
                            key={page} 
                            className={`w-10 h-10 rounded-lg font-black text-xs transition-all ${page === 1 ? "bg-blue-600 text-white" : "bg-white/5 text-zinc-500 hover:bg-white/10"}`}
                        >
                            0{page}
                        </button>
                    ))}
                </div>
                <button className="p-2 rounded-lg bg-white/5 text-zinc-500 hover:text-white transition-colors">
                    <FiChevronRight size={20} />
                </button>
            </div>
        </main>
    );
};

export default Publications;
