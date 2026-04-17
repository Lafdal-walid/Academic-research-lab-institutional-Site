import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import logo from "./assets/IQ1.png";

// Import all images from the specific directory
import p1 from './assets/games/5a30797ac91abd1c88194b924cf3eaa9_1.png';
import p2 from './assets/games/5e4d6f149139733.62e1e47695467_1.png';
import p3 from './assets/games/Frame 8365.png';
import p4 from './assets/games/Frame 8404.png';
import p5 from './assets/games/Physics_Today_cover_1.png';
import p6 from './assets/games/SEI_237554230_1.png';
import p7 from './assets/games/images_(1)_1.png';

const imagePool = [p1, p2, p3, p4, p5, p6, p7];

const generateStaticData = () => {
    const categoriesList = ["AI & NLP", "Quantum Physics", "Data Science", "Bioinformatics", "Neuroscience", "Cybersecurity"];
    const baseTitles = ["Advanced Analysis", "Deep Learning", "Predictive Models", "Molecular Study", "Neural Networks", "Cognitive Framework", "Encryption Methods", "Data Mining", "Quantum States", "Bioinformatics Review"];
    const data = [];
    
    for (let i = 0; i < 42; i++) {
        // Randomly assign image, category, and construct a title
        const randImg = imagePool[Math.floor(Math.random() * imagePool.length)];
        const randCat = categoriesList[Math.floor(Math.random() * categoriesList.length)];
        const randTitle = baseTitles[Math.floor(Math.random() * baseTitles.length)] + ` Vol. ${Math.floor(Math.random() * 20 + 1)}`;
        
        data.push({ title: randTitle, image: randImg, category: randCat });
    }
    return data;
};

const staticProjectsData = generateStaticData();

const ProjectCatalog = () => {
    const { language } = useLanguage();
    const { user } = useAuth();
    const isRTL = language === "ar";
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");
    const [sortOrder, setSortOrder] = useState("sort by recent");
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);

    // API State
    const [projectsData, setProjectsData] = useState(staticProjectsData);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);

    const itemsPerPage = 21;

    const categories = ["All Categories", "AI & NLP", "Quantum Physics", "Data Science", "Bioinformatics", "Neuroscience", "Cybersecurity"];
    const sortOptions = ["sort by recent", "A-Z", "Z-A"];

    // Load static projects
    useEffect(() => {
        setProjectsData(staticProjectsData);
        setIsLoadingProjects(false);
    }, [language, user]); // Depend on language so the titles translate automatically when it changes

    // Filter and Sort Logic
    const filteredProjects = React.useMemo(() => {
        let result = projectsData.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = categoryFilter === "All Categories" || project.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });

        if (sortOrder === "A-Z") {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === "Z-A") {
            result.sort((a, b) => b.title.localeCompare(a.title));
        }

        return result;
    }, [searchQuery, categoryFilter, sortOrder, projectsData]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const currentItems = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, categoryFilter, sortOrder]);

    // Close modal on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setIsRequestModalOpen(false);
        }
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <>
            <div className="w-full px-6 md:px-12 py-20 bg-[#070710] relative">
                <AnimatePresence>
                    {isRequestModalOpen && (
                        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
                            {/* Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsRequestModalOpen(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />

                            {/* Modal Content */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.97, y: 8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="relative w-full max-w-[400px] md:max-w-[430px] bg-[#151519]  rounded-[12px] p-8 md:p-10 py-12 md:py-14  text-center"
                            >
                                <div className="absolute top-6 right-6">
                                    <button
                                        onClick={() => setIsRequestModalOpen(false)}
                                        className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        <X className="w-4 h-4 text-[#3457DC]" />
                                    </button>
                                </div>

                                <div className="w-20 h-20 bg-[#3457DC]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#3457DC]/20">
                                    <div className="w-14 h-14 bg-[#3457DC] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(52,87,220,0.4)]">
                                        <FaDiscord className="w-7 h-7 text-white" />
                                    </div>
                                </div>

                                <h3 className="text-white text-[20px] font-bold mb-2 tracking-tight">
                                    {isRTL ? 'اطلب إضافة بحث' : 'Request a project'}
                                </h3>
                                <p className="text-gray-200 text-[12px] leading-relaxed mb-12 font-poppins">
                                    {isRTL
                                        ? 'لم تجد البحث الذي تريده؟ شارك طلبك في مجتمع التداول عبر Discord.'
                                        : "Can't find the project? , request it in our Discord community."}
                                </p>

                                <div className="flex items-center justify-center gap-2 mb-[16px]">
                                    <span className="text-[12px] font-semibold text-white tracking-tight">#IQ-Optimzer89</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_5680_91044)">
                                            <path d="M19.2698 8.22354L17.4773 6.42854V4.99687C17.4773 3.62104 16.359 2.50104 14.9848 2.50104H13.5548L11.7623 0.706875C10.8198 -0.235625 9.17813 -0.235625 8.23646 0.706875L6.44396 2.50104H5.01396C3.63896 2.50104 2.52146 3.62021 2.52146 4.99687V6.42854L0.728125 8.22354C-0.242708 9.19687 -0.242708 10.7794 0.728125 11.7527L2.52063 13.5477V14.9794C2.52063 16.3552 3.63896 17.4752 5.01313 17.4752H6.44313L8.23563 19.2694C8.70646 19.7402 9.33313 20.0002 9.99896 20.0002C10.6648 20.0002 11.2906 19.7402 11.7615 19.2694L13.554 17.4752H14.984C16.359 17.4752 17.4765 16.356 17.4765 14.9794V13.5477L19.2698 11.7527C20.2406 10.7794 20.2406 9.19687 19.2698 8.22354ZM15.1681 8.50937L10.9565 12.6719C10.4448 13.1802 9.77063 13.4352 9.09729 13.4352C8.42396 13.4352 7.75313 13.181 7.23979 12.6744L5.07396 10.5919C4.74729 10.2677 4.74396 9.74104 5.06813 9.41354C5.39313 9.08771 5.91896 9.08354 6.24729 9.40771L8.41229 11.4894C8.78979 11.8635 9.40396 11.8644 9.78229 11.4894L13.9948 7.32604C14.3231 7.00104 14.8498 7.00437 15.174 7.33187C15.4981 7.65937 15.4948 8.18521 15.1681 8.50937Z" fill="#01CBB1" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_5680_91044">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>


                                </div>

                                <div className="flex flex-row gap-16">
                                    <button
                                        onClick={() => setIsRequestModalOpen(false)}
                                        className="flex-1 bg-white/5 text-gray-400 md:py-3.5 rounded-xl font-medium text-[12px] hover:bg-white/10 transition-all"
                                    >
                                        {isRTL ? 'ربما لاحقاً' : 'Maybe later'}
                                    </button>
                                    <button
                                        onClick={() => window.open('https://discord.com/invite/7FkGEDYB7x', '_blank')}
                                        className="flex-1 bg-[#3457DC] text-white py-3.5 rounded-xl font-medium text-[12px] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                    >
                                        {isRTL ? 'فتح Discord' : 'Open Discord'}
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Toolbar */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 mb-16 w-full">

                    {/* Desktop Toolbar (Hidden on Mobile) */}
                    <div className="hidden md:flex flex-col lg:flex-row items-center justify-between gap-10 w-full">
                        {/* Search Bar (Takes 50% width on LG) */}
                        <div className="relative w-full lg:w-1/2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={isRTL ? "ابحث هنا..." : "Search e.g AI models"}
                                className="w-full bg-[#1A1A22] border border-white/5 rounded-xl px-5 py-3 pr-12 text-sm text-gray-400 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/30 transition-all shadow-inner"
                                dir={isRTL ? "rtl" : "ltr"}
                            />
                            <Search className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500`} />
                        </div>

                        {/* Filters and Request Button (Takes the other 50% width on LG) */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-1/2">
                            {/* Sort Dropdown */}
                            <div className="relative flex-1 w-full group">
                                <button className="w-full flex items-center justify-between gap-4 bg-[#1A1A22] border border-white/5 rounded-xl px-6 py-3.5 text-sm font-medium text-gray-400 hover:bg-[#22222C] transition-all whitespace-nowrap">
                                    <span>{isRTL && sortOrder === "sort by recent" ? 'الفئة' : sortOrder}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-600 transition-transform group-hover:rotate-90" />
                                </button>
                                <div className="absolute top-full left-0 w-full mt-2 bg-[#1A1A22] border border-white/5 rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl backdrop-blur-xl">
                                    {sortOptions.map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => setSortOrder(opt)}
                                            className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category Dropdown */}
                            <div className="relative flex-1 w-full group">
                                <button className="w-full flex items-center justify-between gap-4 bg-[#1A1A22] border border-white/5 rounded-xl px-6 py-3.5 text-sm font-medium text-gray-400 hover:bg-[#22222C] transition-all whitespace-nowrap">
                                    <span>{isRTL && categoryFilter === "All Categories" ? 'ترتيب حسب الأحدث' : categoryFilter}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-600 transition-transform group-hover:rotate-90" />
                                </button>
                                <div className="absolute top-full left-0 w-full mt-2 bg-[#1A1A22] border border-white/5 rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl backdrop-blur-xl">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setCategoryFilter(cat)}
                                            className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setIsRequestModalOpen(true)}
                                className="flex-1 lg:flex-initial lg:min-w-[180px] bg-[#3457DC] text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
                            >
                                {isRTL ? 'طلب إضافة بحث' : 'Request research ?'}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Toolbar (As specified in User Image) */}
                    <div className="flex md:hidden flex-col gap-4 w-full">
                        <div className="flex items-center gap-3 w-full">
                            {/* Search Icon Button */}
                            <button
                                onClick={() => {
                                    setIsSearching(!isSearching);
                                    if (isFiltering) setIsFiltering(false);
                                }}
                                className={`h-14 w-15 flex items-center justify-center rounded-2xl bg-[#1A1A22] border border-white/5 transition-all active:scale-90 ${isSearching ? 'border-blue-500/50' : ''}`}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.58268 17.5013C13.9549 17.5013 17.4993 13.9569 17.4993 9.58464C17.4993 5.21238 13.9549 1.66797 9.58268 1.66797C5.21043 1.66797 1.66602 5.21238 1.66602 9.58464C1.66602 13.9569 5.21043 17.5013 9.58268 17.5013Z" stroke="#3457DC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.3327 18.3346L16.666 16.668" stroke="#3457DC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {/* Filter Icon Button */}
                            <button
                                onClick={() => {
                                    setIsFiltering(!isFiltering);
                                    if (isSearching) setIsSearching(false);
                                }}
                                className={`h-14 w-15 flex items-center justify-center rounded-2xl bg-[#1A1A22] border border-white/5 transition-all active:scale-90 ${isFiltering ? 'border-blue-500/50' : ''}`}
                            >
                                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 3.26667C15 1.465 13.535 0 11.7333 0H3.26667C1.465 0 0 1.465 0 3.26667C0 4.04583 0.279167 4.80083 0.786667 5.3925L5 10.3083V13.3333C5 13.5958 5.12333 13.8425 5.33333 14L8.66667 16.5C8.81417 16.61 8.99 16.6667 9.16667 16.6667C9.29333 16.6667 9.42167 16.6375 9.53917 16.5792C9.82167 16.4383 10 16.1492 10 15.8333V10.3083L14.2133 5.3925C14.7208 4.80083 15 4.04583 15 3.26667ZM12.9483 4.30833L8.53417 9.45833C8.405 9.60917 8.33333 9.80167 8.33333 10.0008V14.1675L6.66667 12.9175V10.0008C6.66667 9.80167 6.59583 9.60917 6.46583 9.45833L2.05167 4.3075C1.80333 4.0175 1.66667 3.6475 1.66667 3.26583C1.66667 2.38333 2.38417 1.66583 3.26667 1.66583H11.7333C12.6158 1.66583 13.3333 2.38333 13.3333 3.26583C13.3333 3.6475 13.1967 4.01833 12.9483 4.30833ZM20 15.0008C20 15.4608 19.6267 15.8342 19.1667 15.8342H12.5C12.04 15.8342 11.6667 15.4608 11.6667 15.0008C11.6667 14.5408 12.04 14.1675 12.5 14.1675H19.1667C19.6267 14.1675 20 14.5408 20 15.0008ZM20 11.6675C20 12.1275 19.6267 12.5008 19.1667 12.5008H12.5C12.04 12.5008 11.6667 12.1275 11.6667 11.6675C11.6667 11.2075 12.04 10.8342 12.5 10.8342H19.1667C19.6267 10.8342 20 11.2075 20 11.6675ZM15 7.50083H19.1667C19.6267 7.50083 20 7.87417 20 8.33417C20 8.79417 19.6267 9.1675 19.1667 9.1675H15C14.54 9.1675 14.1667 8.79417 14.1667 8.33417C14.1667 7.87417 14.54 7.50083 15 7.50083Z" fill="#3457DC" />
                                </svg>
                            </button>

                            {/* Request Button */}
                            <button
                                onClick={() => setIsRequestModalOpen(true)}
                                className="flex-1 h-14 bg-[#3457DC] text-white rounded-2xl font-bold text-sm tracking-wide transition-all active:scale-95"
                            >
                                {isRTL ? 'اطلب بحث' : 'Request project ?'}
                            </button>
                        </div>

                        {/* Mobile Functional Inputs (Conditional) */}
                        <AnimatePresence>
                            {isSearching && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="w-full relative"
                                >
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        autoFocus
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={isRTL ? "ابحث هنا..." : "Search here..."}
                                        className="w-full bg-[#1A1A22] border border-blue-500/30 rounded-xl px-5 py-3 text-sm text-white focus:outline-none"
                                        dir={isRTL ? "rtl" : "ltr"}
                                    />
                                    <X
                                        onClick={() => setIsSearching(false)}
                                        className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500`}
                                    />
                                </motion.div>
                            )}

                            {isFiltering && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col gap-4 bg-[#12121A] border border-white/5 rounded-2xl p-4 shadow-2xl"
                                >
                                    {/* Sort Selection */}
                                    <div className="space-y-2">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold px-1">{isRTL ? 'ترتيب حسب' : 'Sort By'}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {sortOptions.map(opt => (
                                                <button
                                                    key={opt}
                                                    onClick={() => setSortOrder(opt)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${sortOrder === opt ? 'bg-[#3457DC] text-white shadow-[0_0_15px_rgba(52,87,220,0.3)]' : 'bg-[#1A1A22] text-gray-400 border border-white/5'}`}
                                                >
                                                    {isRTL && opt === "sort by recent" ? 'الأحدث' : opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Category Selection */}
                                    <div className="space-y-2">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold px-1">{isRTL ? 'الفئات' : 'Categories'}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setCategoryFilter(cat)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${categoryFilter === cat ? 'bg-[#3457DC] text-white shadow-[0_0_15px_rgba(52,87,220,0.3)]' : 'bg-[#1A1A22] text-gray-400 border border-white/5'}`}
                                                >
                                                    {isRTL && cat === "All Categories" ? 'الكل' : cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="flex flex-wrap gap-x-6 gap-y-12 align-center justify-center lg:justify-start">
                    {currentItems.length > 0 ? (
                        currentItems.map((project, index) => (
                            <motion.div
                                key={`${project.title}-${index}`}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-[calc(50%-0.75rem)] md:w-[calc(25%-1.125rem)] lg:w-[calc(14.28%-1.3rem)] flex flex-col gap-4 group cursor-pointer"
                            >
                                <div className="relative aspect-[3/4.2] rounded-[5px] overflow-hidden border border-white/5 bg-[#1A1A22] shadow-2xl transition-all duration-500 group-hover:scale-[1.01] group-hover:border-blue-500/40">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-700"
                                    />
                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <h3 className="text-[#88888C] text-md font-medium tracking-tight px-1 group-hover:text-white transition-colors duration-300">
                                    {project.title}
                                </h3>
                            </motion.div>
                        ))
                    ) : (
                        <div className="w-full py-20 text-center">
                            <p className="text-gray-500 text-lg">{isRTL ? 'لا توجد أبحاث تطابق بحثك' : 'No projects match your search'}</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-16 pt-8 border-t border-white/5">
                        <button
                            onClick={() => { if (currentPage > 1) setCurrentPage(p => p - 1); }}
                            className={`w-10 h-10 rounded-full bg-[#3457DC] flex items-center justify-center text-white waves-effect waves ${currentPage === 1 ? 'opacity-40 pointer-events-auto' : ''}`}
                        >
                            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="bg-[#15151A] border border-white/5 rounded-lg px-3 py-1 text-sm text-gray-500">
                                <span className="text-white font-bold">{String(currentPage).padStart(2, '0')}</span>
                            </div>
                            <span className="text-gray-600 text-sm font-medium">{isRTL ? `من ${totalPages}` : `of ${totalPages}`}</span>
                        </div>

                        <button
                            onClick={() => { if (currentPage < totalPages) setCurrentPage(p => p + 1); }}
                            className={`w-10 h-10 rounded-full bg-[#3457DC] flex items-center justify-center text-white waves-effect waves ${currentPage === totalPages ? 'opacity-40 pointer-events-auto' : ''}`}
                        >
                            {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                        </button>
                    </div>
                )}
            </div>

            {/* Full-width sections outside the constrained container */}

        </>
    );
};

export default ProjectCatalog;
