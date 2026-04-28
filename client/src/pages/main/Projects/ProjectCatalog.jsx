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
import API_BASE_URL from '@/config';
import ComputerIcon from "@/assets/svg/userDashboard/PhdTracker/computer_(1)_1.svg";

const imagePool = [p1, p2, p3, p4, p5, p6, p7];

const generateStaticData = () => {
    const categoriesList = ["AI & NLP", "Quantum Physics", "Data Science", "Bioinformatics", "Neuroscience", "Cybersecurity"];
    const baseTitles = ["Advanced Analysis", "Deep Learning", "Predictive Models", "Molecular Study", "Neural Networks", "Cognitive Framework", "Encryption Methods", "Data Mining", "Quantum States", "Bioinformatics Review"];
    const data = [];

    for (let i = 0; i < 42; i++) {
        const randImg = imagePool[Math.floor(Math.random() * imagePool.length)];
        const randCat = categoriesList[Math.floor(Math.random() * categoriesList.length)];
        const randTitle = baseTitles[Math.floor(Math.random() * baseTitles.length)] + ` Vol. ${Math.floor(Math.random() * 20 + 1)}`;

        data.push({
            title: randTitle,
            image: randImg,
            category: randCat,
            description: `This research project explores the integration of ${randCat} methodologies within institutional frameworks to optimize performance and data-driven decision making. Focused on innovation and academic excellence.`,
            members: ["Dr. Jane Smith", "Prof. Alan Turing", "Maria Curie"],
            status: "Ongoing",
            startDate: new Date(Date.now() - Math.random() * 10000000000).toISOString()
        });
    }
    return data;
};

const staticProjectsData = generateStaticData();

const ProjectDetails = ({ project }) => {
    const { language } = useLanguage();
    const isRTL = language === "ar";
    if (!project) return null;
    const { raw } = project;

    const description = raw?.description || project.description || 'No description available for this research project.';
    const status = raw?.status || project.status || 'Ongoing';
    const startDate = raw?.startDate || project.startDate || raw?.createdAt;
    const endDate = raw?.endDate || project.endDate;
    const teamName = raw?.team?.name || project.category || 'General Research';
    const members = raw?.members || [];

    const detailItem = (label, value) => (
        <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <span className="text-[10px] uppercase tracking-wider text-[#80808a] font-bold">{label}</span>
            <span className="text-sm text-white font-medium">{value || 'N/A'}</span>
        </div>
    );

    return (
        <div className="bg-[#151519] border border-[#1e1d22] rounded-[16px] p-6 md:p-8 flex flex-col gap-8 w-full mb-6">
            <div className="flex flex-col items-center md:items-start gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight text-center md:text-left">Project Overview</h3>
                <div className="h-1 w-12 bg-blue-500 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
                {detailItem("Status", status)}
                {detailItem(isRTL ? "أعضاء الفريق" : "Team Members", members.length.toString())}
                {detailItem("Start Date", startDate ? new Date(startDate).toLocaleDateString() : 'N/A')}
                {detailItem("End Date", endDate ? new Date(endDate).toLocaleDateString() : 'Active')}
            </div>

            <div className="flex flex-col gap-6 pt-4 border-t border-white/5">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#80808a] font-bold">Description</span>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-4xl text-center md:text-left">
                            {description}
                        </p>
                    </div>

                    {/* Research Fields / activeFilds badges */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {(raw?.team?.activeFilds || raw?.team?.teamFields || raw?.team?.activeProjects || [1, 2, 3, 4]).map((field, idx) => (
                            <div key={idx} className="bg-[#3457DC]/10 border border-[#3457DC]/20 px-3 py-1 rounded-lg">
                                <span className="text-[11px] text-[#3457DC] font-semibold uppercase tracking-wider">
                                    {typeof field === 'number' || !isNaN(field) ? `${isRTL ? "مشروع " : "Project "} ${field}` : field}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-start gap-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#80808a] font-bold">Research Members ({members.length})</span>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {members.length > 0 ? (
                            members.map((member, idx) => (
                                <div key={idx} className="bg-[#1e1e24] border border-white/5 px-4 py-2 rounded-xl flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-xs text-gray-300">
                                        {member?.email || member?.name || member?.username || (typeof member === 'string' ? member : 'Research Member')}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <span className="text-xs text-gray-500 italic">Team members information is currently restricted or not assigned.</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectRoadmap = ({ projectName, projectId, milestones = [], createdAt, onRefresh }) => {
    return (
        <div className="bg-[#151519] border border-[#1e1d22] rounded-[16px] p-6 md:p-8 flex flex-col gap-8 w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative w-full">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <h3 className="text-lg font-extrabold text-white font-[Gilroy]">
                        {projectName} Project Roadmap
                    </h3>
                    <p className="text-sm text-[#a5a5b2]">Key Objectives & Milestones.</p>
                </div>

                <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex flex-col items-center gap-1.5">
                    <span className="text-sm text-[#3457DC] font-medium whitespace-nowrap">
                        {milestones.filter(m => m.completed).length + 1} of {milestones.length + 1} Completed
                    </span>
                    <div className="w-[60px] h-1 bg-[#1e1e24] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#3457DC] transition-all duration-500"
                            style={{ width: `${((milestones.filter(m => m.completed).length + 1) / (milestones.length + 1)) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="hidden md:block w-[200px]" />
            </div>

            <div style={{ height: '1px', backgroundColor: '#2A2A30' }} />

            <div className="flex flex-col gap-8 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar">
                {/* Initial Phase */}
                <div className="flex gap-6 items-start">
                    <div className="flex flex-col items-center min-w-[46px] relative">
                        <div className="bg-[#3457DC] p-3.5 rounded-full flex items-center justify-center z-10">
                            <img src={ComputerIcon} alt="phase" className="w-4 h-4" />
                        </div>
                        {(milestones.length > 0) && (
                            <div className="w-[2px] h-full bg-[#3457DC] absolute top-6 z-0" />
                        )}
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-col gap-1 text-left">
                            <span className="text-[14px] text-[#a5a5b2] font-medium">
                                {createdAt ? new Date(createdAt).toLocaleDateString() : 'Initial phase'}
                            </span>
                            <span className="text-[14px] text-white font-normal">Project Creation & Planning</span>
                        </div>
                        <div className="bg-[#1e1e24] px-6 py-2.5 rounded-2xl text-white text-[14px] font-medium whitespace-nowrap">
                            Completed
                        </div>
                    </div>
                </div>

                {/* Milestones */}
                {milestones.map((phase, index) => (
                    <div key={index} className="flex gap-6 items-start">
                        <div className="flex flex-col items-center min-w-[46px] relative">
                            <div className={`${phase.completed ? 'bg-[#3457DC]' : 'bg-[#1e1e24]'} p-3.5 rounded-full flex items-center justify-center z-10`}>
                                <img src={ComputerIcon} alt="phase" className="w-4 h-4" style={{ opacity: phase.completed ? 1 : 0.3 }} />
                            </div>
                            {index !== milestones.length - 1 && (
                                <div className="w-[2px] h-full bg-[#3457DC] absolute top-6 z-0" />
                            )}
                        </div>
                        <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex flex-col gap-1 text-left">
                                <span className="text-[14px] text-[#a5a5b2] font-medium">{phase.date || 'TBD'}</span>
                                <span className="text-[14px] text-white font-normal">{phase.title}</span>
                            </div>
                            <div className={`${phase.completed ? 'bg-[#3457DC]' : 'bg-[#1e1e24]'} px-6 py-2.5 rounded-2xl text-white text-[14px] font-medium whitespace-nowrap`}>
                                {phase.completed ? 'Completed' : 'Upcoming'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProjectCatalog = () => {
    const { language } = useLanguage();
    const { user } = useAuth();
    const isRTL = language === "ar";

    const text = {
        title: isRTL ? 'كتالوج المشاريع' : 'Project Catalog',
        searchPlaceholder: isRTL ? "ابحث مثلاً عن مخبر..." : "Search e.g Lab",
        sortByLabel: isRTL ? 'ترتيب حسب' : 'Sort By',
        categoriesLabel: isRTL ? 'الفرق البحثية' : 'Research Teams',
        filterStatus: isRTL ? 'حسب الحالة' : 'Filter by Status',
        allStatuses: isRTL ? 'كل الحالات' : 'All Statuses',
        maybeLater: isRTL ? 'ربما لاحقاً' : 'Maybe later',
        openDiscord: isRTL ? 'فتح Discord' : 'Open Discord',
        noResults: isRTL ? 'لا توجد أبحاث تطابق بحثك' : 'No projects match your search',
        of: isRTL ? 'من' : 'of',
        sortRecent: isRTL ? 'الأحدث' : 'sort by recent',
        allCategories: isRTL ? 'حسب الفريق' : 'By Research Team',
        joinDiscordMsg: isRTL ? "لم تجد البحث الذي تريده؟ شارك طلبك في مجتمعنا عبر Discord." : "Can't find the project? , request it in our Discord community.",
        requestTitle: isRTL ? "اطلب إضافة بحث" : "Request a project"
    };

    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("By Research Team");
    const [statusFilter, setStatusFilter] = useState("All Statuses");
    const [sortOrder, setSortOrder] = useState("sort by recent");
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);
    const [expandedProjectId, setExpandedProjectId] = useState(null);

    const [projectsData, setProjectsData] = useState(staticProjectsData);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);

    const itemsPerPage = 21;

    const [categories, setCategories] = useState(["By Research Team"]);
    const statusOptions = ["All Statuses", "Ongoing", "Completed", "Proposed", "Suspended", "Canceled"];
    const sortOptions = ["sort by recent", "A-Z", "Z-A"];

    const fetchProjects = async () => {
        setIsLoadingProjects(true);
        try {
            const baseUrl = API_BASE_URL;
            const res = await fetch(`${baseUrl}/api/projects`);
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    const mappedData = data.map(project => ({
                        id: project._id,
                        title: project.title,
                        image: project.imageUrl
                            ? (project.imageUrl.startsWith('http') ? project.imageUrl : `${baseUrl}${project.imageUrl.startsWith('/') ? '' : '/'}${project.imageUrl}`)
                            : imagePool[Math.floor(Math.random() * imagePool.length)],
                        category: project.team?.name || (isRTL ? "بحث عام" : "General Research"),
                        status: project.status,
                        milestones: project.milestones || [],
                        createdAt: project.createdAt,
                        raw: project
                    }));
                    setProjectsData(mappedData);

                    const uniqueTeams = ["By Research Team", ...new Set(mappedData.map(p => p.category))];
                    setCategories(uniqueTeams);
                }
            }
        } catch (err) {
            console.error("Failed to fetch projects", err);
        } finally {
            setIsLoadingProjects(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [language, user]);

    const filteredProjects = React.useMemo(() => {
        let result = projectsData.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = categoryFilter === "By Research Team" || project.category === categoryFilter;
            const matchesStatus = statusFilter === "All Statuses" || project.status === statusFilter;
            return matchesSearch && matchesCategory && matchesStatus;
        });

        if (sortOrder === "A-Z") {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === "Z-A") {
            result.sort((a, b) => b.title.localeCompare(a.title));
        }

        return result;
    }, [searchQuery, categoryFilter, statusFilter, sortOrder, projectsData]);

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const currentItems = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, categoryFilter, statusFilter, sortOrder]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setIsRequestModalOpen(false);
        }
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <>
            <div className={`w-full px-6 md:px-12 py-20 bg-[#070710] relative ${isRTL ? 'font-tajawal' : 'font-poppins'}`}>
                <AnimatePresence>
                    {isRequestModalOpen && (
                        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsRequestModalOpen(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.97, y: 8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="relative w-full max-w-[400px] md:max-w-[430px] bg-[#151519] rounded-[12px] p-8 md:p-10 py-12 md:py-14 text-center"
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
                                    {text.requestTitle}
                                </h3>
                                <p className="text-gray-200 text-[12px] leading-relaxed mb-12">
                                    {text.joinDiscordMsg}
                                </p>

                                <div className="flex flex-row gap-4 md:gap-16">
                                    <button
                                        onClick={() => setIsRequestModalOpen(false)}
                                        className="flex-1 bg-white/5 text-gray-400 py-3.5 rounded-xl font-medium text-[12px] hover:bg-white/10 transition-all"
                                    >
                                        {text.maybeLater}
                                    </button>
                                    <button
                                        onClick={() => window.open('https://discord.com/invite/7FkGEDYB7x', '_blank')}
                                        className="flex-1 bg-[#3457DC] text-white py-3.5 rounded-xl font-medium text-[12px] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                    >
                                        {text.openDiscord}
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

                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 mb-16 w-full">
                    <div className="hidden md:flex flex-col lg:flex-row items-center justify-between gap-10 w-full">
                        <div className="relative w-full lg:w-1/2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={text.searchPlaceholder}
                                className="w-full bg-[#1A1A22] border border-white/5 rounded-xl px-5 py-3 pr-12 text-sm text-gray-400 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/30 transition-all shadow-inner"
                                dir={isRTL ? "rtl" : "ltr"}
                            />
                            <Search className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500`} />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-1/2">
                            <div className="relative flex-1 w-full group">
                                <button className="w-full flex items-center justify-between gap-4 bg-[#1A1A22] border border-white/5 rounded-xl px-6 py-3.5 text-sm font-medium text-gray-400 hover:bg-[#22222C] transition-all whitespace-nowrap">
                                    <span>{sortOrder === "sort by recent" ? text.sortRecent : sortOrder}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-600 transition-transform group-hover:rotate-90" />
                                </button>
                                <div className="absolute top-full left-0 w-full mt-2 bg-[#1A1A22] border border-white/5 rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl backdrop-blur-xl">
                                    {sortOptions.map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => setSortOrder(opt)}
                                            className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                                        >
                                            {opt === "sort by recent" ? text.sortRecent : opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="relative flex-1 w-full group">
                                <button className="w-full flex items-center justify-between gap-4 bg-[#1A1A22] border border-white/5 rounded-xl px-6 py-3.5 text-sm font-medium text-gray-400 hover:bg-[#22222C] transition-all whitespace-nowrap">
                                    <span>{isRTL && categoryFilter === "By Research Team" ? text.allCategories : categoryFilter}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-600 transition-transform group-hover:rotate-90" />
                                </button>
                                <div className="absolute top-full left-0 w-full mt-2 bg-[#1A1A22] border border-white/5 rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl backdrop-blur-xl">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setCategoryFilter(cat)}
                                            className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                                        >
                                            {isRTL && cat === "By Research Team" ? text.allCategories : cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="relative group/status">
                                <button className="flex items-center justify-between gap-3 bg-[#1A1A22] border border-white/5 px-5 py-3.5 rounded-xl text-sm text-white hover:border-blue-500/30 transition-all min-w-[180px]">
                                    <span className="truncate">{statusFilter === "All Statuses" ? text.allStatuses : statusFilter}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-500 group-hover/status:rotate-180 transition-transform" />
                                </button>
                                <div className="absolute top-full mt-2 w-full bg-[#12121A] border border-white/5 rounded-xl py-2 opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all z-50 shadow-2xl">
                                    {statusOptions.map(stat => (
                                        <button
                                            key={stat}
                                            onClick={() => setStatusFilter(stat)}
                                            className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                                        >
                                            {isRTL && stat === "All Statuses" ? text.allStatuses : stat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex md:hidden flex-col gap-4 w-full">
                        <div className="flex items-center gap-3 w-full">
                            <button
                                onClick={() => {
                                    setIsSearching(!isSearching);
                                    if (isFiltering) setIsFiltering(false);
                                }}
                                className={`h-14 w-14 flex items-center justify-center rounded-2xl bg-[#1A1A22] border border-white/5 transition-all active:scale-90 ${isSearching ? 'border-blue-500/50' : ''}`}
                            >
                                <Search className="w-5 h-5 text-[#3457DC]" />
                            </button>

                            <button
                                onClick={() => {
                                    setIsFiltering(!isFiltering);
                                    if (isSearching) setIsSearching(false);
                                }}
                                className={`h-14 w-14 flex items-center justify-center rounded-2xl bg-[#1A1A22] border border-white/5 transition-all active:scale-90 ${isFiltering ? 'border-blue-500/50' : ''}`}
                            >
                                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 3.26667C15 1.465 13.535 0 11.7333 0H3.26667C1.465 0 0 1.465 0 3.26667C0 4.04583 0.279167 4.80083 0.786667 5.3925L5 10.3083V13.3333C5 13.5958 5.12333 13.8425 5.33333 14L8.66667 16.5C8.81417 16.61 8.99 16.6667 9.16667 16.6667C9.29333 16.6667 9.42167 16.6375 9.53917 16.5792C9.82167 16.4383 10 16.1492 10 15.8333V10.3083L14.2133 5.3925C14.7208 4.80083 15 4.04583 15 3.26667ZM12.9483 4.30833L8.53417 9.45833C8.405 9.60917 8.33333 9.80167 8.33333 10.0008V14.1675L6.66667 12.9175V10.0008C6.66667 9.80167 6.59583 9.60917 6.46583 9.45833L2.05167 4.3075C1.80333 4.0175 1.66667 3.6475 1.66667 3.26583C1.66667 2.38333 2.38417 1.66583 3.26667 1.66583H11.7333C12.6158 1.66583 13.3333 2.38333 13.3333 3.26583C13.3333 3.6475 13.1967 4.01833 12.9483 4.30833ZM20 15.0008C20 15.4608 19.6267 15.8342 19.1667 15.8342H12.5C12.04 15.8342 11.6667 15.4608 11.6667 15.0008C11.6667 14.5408 12.04 14.1675 12.5 14.1675H19.1667C19.6267 14.1675 20 14.5408 20 15.0008ZM20 11.6675C20 12.1275 19.6267 12.5008 19.1667 12.5008H12.5C12.04 12.5008 11.6667 12.1275 11.6667 11.6675C11.6667 11.2075 12.04 10.8342 12.5 10.8342H19.1667C19.6267 10.8342 20 11.2075 20 11.6675ZM15 7.50083H19.1667C19.6267 7.50083 20 7.87417 20 8.33417C20 8.79417 19.6267 9.1675 19.1667 9.1675H15C14.54 9.1675 14.1667 8.79417 14.1667 8.33417C14.1667 7.87417 14.54 7.50083 15 7.50083Z" fill="#3457DC" />
                                </svg>
                            </button>

                            <button
                                onClick={() => setIsFiltering(!isFiltering)}
                                className={`flex-1 h-14 bg-[#3457DC] text-white rounded-2xl font-bold text-sm tracking-wide transition-all active:scale-95 ${isFiltering ? 'brightness-110' : ''}`}
                            >
                                {text.filterStatus}
                            </button>
                        </div>

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
                                        placeholder={text.searchPlaceholder}
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
                                    <div className="space-y-2">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold px-1">{text.sortByLabel}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {sortOptions.map(opt => (
                                                <button
                                                    key={opt}
                                                    onClick={() => setSortOrder(opt)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${sortOrder === opt ? 'bg-[#3457DC] text-white shadow-[0_0_15px_rgba(52,87,220,0.3)]' : 'bg-[#1A1A22] text-gray-400 border border-white/5'}`}
                                                >
                                                    {opt === "sort by recent" ? text.sortRecent : opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold px-1">{text.categoriesLabel}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setCategoryFilter(cat)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${categoryFilter === cat ? 'bg-[#3457DC] text-white shadow-[0_0_15px_rgba(52,87,220,0.3)]' : 'bg-[#1A1A22] text-gray-400 border border-white/5'}`}
                                                >
                                                    {isRTL && cat === "By Research Team" ? text.allCategories : cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold px-1">{isRTL ? 'الحالة' : 'Status'}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {statusOptions.map(stat => (
                                                <button
                                                    key={stat}
                                                    onClick={() => setStatusFilter(stat)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${statusFilter === stat ? 'bg-[#3457DC] text-white shadow-[0_0_15px_rgba(52,87,220,0.3)]' : 'bg-[#1A1A22] text-gray-400 border border-white/5'}`}
                                                >
                                                    {isRTL && stat === "All Statuses" ? 'الكل' : stat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-12 align-center justify-center lg:justify-start">
                    {currentItems.length > 0 ? (
                        currentItems.map((project, index) => (
                            <motion.div
                                key={`${project.id}-${index}`}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => setExpandedProjectId(expandedProjectId === project.id ? null : project.id)}
                                className="w-[calc(50%-0.75rem)] md:w-[calc(25%-1.125rem)] lg:w-[calc(14.28%-1.3rem)] flex flex-col gap-4 group cursor-pointer"
                            >
                                <div className={`relative aspect-[3/4.2] rounded-[5px] overflow-hidden border transition-all duration-500 group-hover:scale-[1.01] ${expandedProjectId === project.id ? 'border-blue-500 shadow-[0_0_20px_rgba(52,87,220,0.3)]' : 'border-white/5 bg-[#1A1A22]'}`}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 px-1">
                                    <h4 className="text-[13px] font-bold text-white leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h4>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="w-full py-20 flex flex-col items-center justify-center gap-4">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2">
                                <Search className="w-6 h-6 text-gray-600" />
                            </div>
                            <h3 className="text-white text-lg font-bold">{text.noResults}</h3>
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {expandedProjectId && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="w-full mt-16 mb-8 flex flex-col gap-6"
                        >
                            {(() => {
                                const project = projectsData.find(p => p.id === expandedProjectId);
                                if (!project) return null;
                                return (
                                    <>
                                        <ProjectDetails project={project} />
                                        <ProjectRoadmap
                                            projectName={project.title}
                                            projectId={project.id}
                                            milestones={project.milestones}
                                            createdAt={project.createdAt}
                                            onRefresh={fetchProjects}
                                        />
                                    </>
                                );
                            })()}
                        </motion.div>
                    )}
                </AnimatePresence>

                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-6 mt-20 pt-10 border-t border-white/5">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="p-3 rounded-xl bg-[#1A1A22] border border-white/5 text-gray-400 hover:text-white hover:border-blue-500/30 disabled:opacity-30 transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{currentPage}</span>
                            <span className="text-sm text-gray-600">/</span>
                            <span className="text-sm text-gray-500">{totalPages}</span>
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-xl bg-[#1A1A22] border border-white/5 text-gray-400 hover:text-white hover:border-blue-500/30 disabled:opacity-30 transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProjectCatalog;
