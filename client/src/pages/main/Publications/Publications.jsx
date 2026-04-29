import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Users as UsersIcon, Calendar as CalendarIcon, Eye, Download, Briefcase, ArrowRight } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";
import API_BASE_URL from '@/config';

const ResearchPaperCard = ({ id, title, authors, year, journal, description, tags, link, isRTL, activeFilds, projectName, views, onView }) => {
    const handleView = async () => {
        if (!id) return;
        if (onView) onView(id);
        try {
            await fetch(`${API_BASE_URL}/api/publications/${id}/view`, {
                method: 'PATCH',
            });
        } catch (err) {
            console.error("Failed to update view count", err);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`bg-[#151519] border border-white/5 rounded-2xl p-5 md:p-6 flex flex-col gap-5 group hover:border-[#3457DC]/30 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
        >
            <div className={`flex flex-col sm:flex-row justify-between items-start gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <h3 className="text-lg md:text-xl font-bold text-white font-gilroy leading-tight group-hover:text-[#3457DC] transition-colors flex-1">
                    {title}
                </h3>
                <div className="flex items-center gap-2">
                    <a href={link} target="_blank" rel="noopener noreferrer" onClick={handleView} className="text-white/20 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5" title="View Publication">
                        <Eye size={18} />
                    </a>
                    <a href={link} download onClick={handleView} className="text-white/20 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5" title="Download Publication">
                        <Download size={18} />
                    </a>
                </div>
            </div>

            <div className={`flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex items-center gap-2 text-white/40 text-xs md:text-sm">
                    <UsersIcon size={14} className="md:w-4 md:h-4" />
                    <span className="truncate max-w-[200px]">{authors}</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-xs md:text-sm">
                    <CalendarIcon size={12} className="md:w-[14px] md:h-[14px]" />
                    <span>{year}</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-sm">
                    <Eye size={14} className="text-[#3457DC]" />
                    <span className="font-medium">{views || 0}</span>
                </div>
                {projectName && (
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                        <Briefcase size={14} />
                        <span>{projectName}</span>
                    </div>
                )}
            </div>

            {journal && (
                <div className={`text-sm font-medium text-blue-500/80 uppercase tracking-wide ${isRTL ? 'text-right' : 'text-left'}`}>
                    {journal}
                </div>
            )}

            {description && (
                <p className={`text-white/60 text-sm leading-relaxed line-clamp-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {description}
                </p>
            )}

            <div className={`flex flex-wrap gap-2 mt-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                {activeFilds && activeFilds.map((field, idx) => (
                    <span key={idx} className="bg-[#3457DC] px-3 py-1 rounded-full text-white text-[11px] font-semibold uppercase tracking-wider">
                        {field}
                    </span>
                ))}
                {tags && tags.map((tag, idx) => (
                    <span key={idx} className="bg-[#3457DC]/10 px-3 py-1 rounded-full text-[#3457DC] text-[11px] font-semibold uppercase tracking-wider">
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

const STATIC_PUBLICATIONS = [
    {
        title: "Attention Mechanisms in Hierarchical Cognitive Architectures for Multi-Agent Reasoning",
        authors: ["A. Benali", "S. Mansouri", "Y. Kaddour"],
        year: "2024",
        publisher: "IEEE Transactions on Neural Networks and Learning Systems",
        tags: ["Vision-Machine Intelligence", "Multi-Agent Systems"],
        contribution: "Explored attention mechanisms to improve reasoning capabilities in hierarchical cognitive models.",
        projectName: "Cognitive Multi-Agent Systems"
    },
    {
        title: "Dynamic Resource Allocation in Distributed Cloud Networks using Deep Reinforcement Learning",
        authors: ["M. Zahra", "K. Omar"],
        year: "2023",
        publisher: "Journal of Network and Computer Applications",
        tags: ["Deep Learning", "Cloud Computing"],
        contribution: "Proposed a DRL-based framework for optimizing resource distribution in cloud environments.",
        projectName: "NextGen Cloud Infrastructure"
    },
    {
        title: "Scalable Federated Learning for Privacy-Preserving Medical Imaging Analytics",
        authors: ["A. Mansouri", "S. Dahlab", "H. Khelifi"],
        year: "2025",
        publisher: "AI in Medicine Journal",
        tags: ["Federated Learning", "Privacy", "Healthcare AI"],
        contribution: "Introduced a novel decentralized aggregation protocol that reduces communication overhead by 40% while maintaining differential privacy.",
        projectName: "Privacy-Preserving AI in Health"
    },
    {
        title: "Autonomous Path Planning in Highly Dynamic Environments using Transformer networks",
        authors: ["Y. Benali", "M. Zahra"],
        year: "2024",
        publisher: "Robotics and Autonomous Systems",
        tags: ["Robotics", "Autonomous Systems", "Transformers"],
        contribution: "Developed a transformer-based spatial encoder that predicts obstacle trajectories with sub-centimeter precision.",
        projectName: "Autonomous Navigation Systems"
    },
    {
        title: "Deep Learning, Machine Learning, AI Test",
        authors: ["oualidlafdal50@gmail.com", "walidbusiness50@gmail.com", "walidbusiness10@gmail.com", "wwalidlaf@gmail.com"],
        year: "2026",
        publisher: "Institutional Lab",
        tags: ["Deep Learning", "Machine Learning", "AI Test"],
        contribution: "test lorem testtest lorem test",
        projectName: "AI Testing Lab"
    }
];

export default function Publications() {
    const { language } = useLanguage();
    const isRTL = language === "ar";
    
    const text = {
        badge: isRTL ? 'منشورات' : 'posts',
        title: isRTL ? 'المنشورات' : 'Publications',
        subtitle: isRTL ? 'استكشف منشورات فرقنا البحثية' : 'Explore our Teams Publications',
        searchPlaceholder: isRTL ? "ابحث مثلاً عن مخبر..." : "Search e.g Lab",
        sortByRecent: isRTL ? 'الأحدث' : 'sort by recent',
        sortByOldest: isRTL ? 'الأقدم' : 'sort by oldest',
        categoryLabel: isRTL ? 'الفئة' : 'Categorie',
        all: isRTL ? 'الكل' : 'All',
        tagLabel: isRTL ? 'الوسوم' : 'Tags',
        loading: isRTL ? 'جاري تحميل الأوراق البحثية...' : 'Loading research papers...',
        noPublications: isRTL ? 'لم يتم العثور على منشورات.' : 'No publications found.',
        of: isRTL ? 'من' : 'of',
        teamsSectionTitle: isRTL ? 'اكتشف فرقنا البحثية' : 'Discover Our Research Teams',
        teamsSectionSubtitle: isRTL ? 'تعرف على الفرق التي تقف خلف هذه الأبحاث والمشاريع المبتكرة' : 'Meet the teams behind these innovative research papers and projects',
        viewTeams: isRTL ? 'عرض جميع الفرق' : 'View All Teams',
        teamLabel: isRTL ? 'الفريق' : 'Team',
        projectLabel: isRTL ? 'المشروع' : 'Project',
        yearLabel: isRTL ? 'السنة' : 'Year'
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedSort, setSelectedSort] = useState(text.sortByRecent);
    const [selectedCategory, setSelectedCategory] = useState(text.all);
    const [selectedTag, setSelectedTag] = useState(text.all);
    const [selectedYear, setSelectedYear] = useState(text.all);
    const [publications, setPublications] = useState(STATIC_PUBLICATIONS);
    const [teams, setTeams] = useState([]);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTeam, setSelectedTeam] = useState(text.all);
    const [selectedProject, setSelectedProject] = useState(text.all);
    const [isSearching, setIsSearching] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(publications.length / 10) || 1;

    const handlePublicationView = (id) => {
        setPublications(prev => prev.map(pub => 
            pub._id === id ? { ...pub, views: (pub.views || 0) + 1 } : pub
        ));
    };

    const dropdownRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const baseUrl = API_BASE_URL;
                
                const [pubRes, teamRes, projRes] = await Promise.all([
                    fetch(`${baseUrl}/api/publications`),
                    fetch(`${baseUrl}/api/teams`),
                    fetch(`${baseUrl}/api/projects`)
                ]);

                if (pubRes.ok) {
                    const pubData = await pubRes.json();
                    if (pubData && pubData.length > 0) setPublications(pubData);
                }

                if (teamRes.ok) setTeams(await teamRes.json());
                if (projRes.ok) setProjects(await projRes.json());

            } catch (err) {
                console.error("Failed to fetch data", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setSelectedSort(isRTL ? 'الأحدث' : 'sort by recent');
        setSelectedCategory(isRTL ? 'الكل' : 'All');
        setSelectedTag(isRTL ? 'الكل' : 'All');
        setSelectedTeam(isRTL ? 'الكل' : 'All');
        setSelectedProject(isRTL ? 'الكل' : 'All');
        setSelectedYear(isRTL ? 'الكل' : 'All');
    }, [language, isRTL]);

    const allFields = [...new Set(teams.flatMap(t => t.activeFilds || []))];
    const allTags = [...new Set(publications.flatMap(p => p.tags || []))];
    const allYears = [...new Set(publications.map(p => {
        if (p.year) return p.year.toString();
        if (p.publishedDate) return new Date(p.publishedDate).getFullYear().toString();
        return null;
    }).filter(Boolean))].sort((a, b) => b - a);

    const filteredPublications = publications
        .filter(pub => {
            const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (Array.isArray(pub.authors) ? pub.authors.some(auth => auth.toLowerCase().includes(searchTerm.toLowerCase())) : pub.authors.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (pub.tags && pub.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
            
            const categoryMatch = selectedCategory === 'Categorie' || selectedCategory === 'All' || selectedCategory === 'الفئة' || selectedCategory === 'الكل' ||
                (pub.activeFilds && Array.isArray(pub.activeFilds) ? pub.activeFilds.some(f => f.toLowerCase() === selectedCategory.toLowerCase()) : (pub.field && pub.field.toLowerCase() === selectedCategory.toLowerCase()));
            
            const tagMatch = selectedTag === 'Tags' || selectedTag === 'All' || selectedTag === 'الوسوم' || selectedTag === 'الكل' ||
                (pub.tags && pub.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()));
            
            const teamMatch = selectedTeam === 'Team' || selectedTeam === 'All' || selectedTeam === 'الفريق' || selectedTeam === 'الكل' ||
                (pub.team?._id === selectedTeam || pub.team === selectedTeam || (pub.team?.name && pub.team.name === selectedTeam));
            
            const projectMatch = selectedProject === 'Project' || selectedProject === 'All' || selectedProject === 'المشروع' || selectedProject === 'الكل' ||
                (pub.project?._id === selectedProject || pub.project === selectedProject || (pub.project?.title && pub.project.title === selectedProject));

            const pubYear = pub.year ? pub.year.toString() : (pub.publishedDate ? new Date(pub.publishedDate).getFullYear().toString() : '');
            const yearMatch = selectedYear === 'Year' || selectedYear === 'All' || selectedYear === 'السنة' || selectedYear === 'الكل' ||
                pubYear === selectedYear;
            
            return matchesSearch && categoryMatch && tagMatch && teamMatch && projectMatch && yearMatch;
        })
        .sort((a, b) => {
            const yearA = a.publishedDate ? new Date(a.publishedDate).getFullYear() : (a.year || 0);
            const yearB = b.publishedDate ? new Date(b.publishedDate).getFullYear() : (b.year || 0);
            
            if (selectedSort === 'sort by recent' || selectedSort === 'الأحدث') return yearB - yearA;
            if (selectedSort === 'sort by oldest' || selectedSort === 'الأقدم') return yearA - yearB;
            return 0;
        });

    return (
        <div className={`w-full min-h-screen bg-[#05030D] text-white relative overflow-x-hidden ${isRTL ? 'font-tajawal' : 'font-poppins'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="h-20 w-full" />

            <div className="container mx-auto px-6 pt-24 md:pt-32 pb-16 md:pb-24 text-center relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                >
                    <span className="text-[#3457DC] text-[11px] md:text-[13px] uppercase font-bold tracking-[0.2em] mb-4">{text.badge}</span>
                    <h1 className="font-gilroy font-extrabold text-[42px] md:text-[72px] lg:text-[96px] leading-[1.1] mb-6">{text.title}</h1>
                    <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{text.subtitle}</p>
                </motion.div>
            </div>

            <div className="w-full h-px bg-[#373735]/30 relative mb-16">
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3457DC]/50 to-transparent" />
            </div>

            <div className="container mx-auto px-4 md:px-6 mb-12">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-5 w-full max-w-[1240px] mx-auto" ref={dropdownRef}>
                    {/* Desktop Search & Filters */}
                    <div className="hidden lg:flex flex-col lg:flex-row items-center gap-5 w-full">
                        <div className={`bg-[#1e1e24] flex items-center gap-4 px-5 py-3.5 rounded-2xl w-full lg:flex-[2] border border-white/5 focus-within:border-[#3457DC]/50 transition-all ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                            <input
                                type="text"
                                placeholder={text.searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none outline-none text-white text-[15px] w-full placeholder:text-[#a5a5b2]"
                            />
                            <Search className="text-[#3457DC] shrink-0" size={20} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 w-full lg:flex-[6]">
                            {/* Year Dropdown */}
                            <div className="relative w-full">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'year' ? null : 'year')}
                                    className="bg-[#1e1e24] flex items-center justify-between px-6 py-3 rounded-2xl w-full border border-white/5 hover:bg-[#25252d] transition-all h-full"
                                >
                                    <span className="text-[#a5a5b2] text-[14px] truncate">{selectedYear === text.all ? text.yearLabel : selectedYear}</span>
                                    <ChevronDown className={`text-[#3457DC] transition-transform duration-300 ${activeDropdown === 'year' ? 'rotate-180' : ''}`} size={20} />
                                </button>
                                <AnimatePresence>
                                    {activeDropdown === 'year' && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-[#1e1e24] border border-white/10 rounded-xl p-2 z-50 shadow-2xl max-h-[300px] overflow-y-auto"
                                        >
                                            {[text.all, ...allYears].map(opt => (
                                                <button
                                                    key={opt}
                                                    onClick={() => { setSelectedYear(opt); setActiveDropdown(null); }}
                                                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedYear === opt ? 'bg-[#3457DC] text-white' : 'text-[#a5a5b2] hover:bg-white/5'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            {/* Sort Dropdown */}
                            <div className="relative w-full">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
                                    className="bg-[#1e1e24] flex items-center justify-between px-6 py-3 rounded-2xl w-full border border-white/5 hover:bg-[#25252d] transition-all h-full"
                                >
                                    <span className="text-[#a5a5b2] text-[14px] truncate">{selectedSort}</span>
                                    <ChevronDown className={`text-[#3457DC] transition-transform duration-300 ${activeDropdown === 'sort' ? 'rotate-180' : ''}`} size={20} />
                                </button>
                                <AnimatePresence>
                                    {activeDropdown === 'sort' && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-[#1e1e24] border border-white/10 rounded-xl p-2 z-50 shadow-2xl"
                                        >
                                            {[text.sortByRecent, text.sortByOldest].map(opt => (
                                                <button
                                                    key={opt}
                                                    onClick={() => { setSelectedSort(opt); setActiveDropdown(null); }}
                                                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedSort === opt ? 'bg-[#3457DC] text-white' : 'text-[#a5a5b2] hover:bg-white/5'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Category Dropdown */}
                            <div className="relative w-full">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
                                    className="bg-[#1e1e24] flex items-center justify-between px-6 py-3 rounded-2xl w-full border border-white/5 hover:bg-[#25252d] transition-all h-full"
                                >
                                    <span className="text-[#a5a5b2] text-[14px] truncate">{selectedCategory}</span>
                                    <ChevronDown className={`text-[#3457DC] transition-transform duration-300 ${activeDropdown === 'category' ? 'rotate-180' : ''}`} size={20} />
                                </button>
                                <AnimatePresence>
                                    {activeDropdown === 'category' && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-[#1e1e24] border border-white/10 rounded-xl p-2 z-50 shadow-2xl"
                                        >
                                            {[text.all, ...allFields].map(opt => (
                                                <button
                                                    key={opt}
                                                    onClick={() => { setSelectedCategory(opt); setActiveDropdown(null); }}
                                                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedCategory === opt ? 'bg-[#3457DC] text-white' : 'text-[#a5a5b2] hover:bg-white/5'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Tags Dropdown */}
                            <div className="relative w-full">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'tags' ? null : 'tags')}
                                    className="bg-[#1e1e24] flex items-center justify-between px-6 py-3 rounded-2xl w-full border border-white/5 hover:bg-[#25252d] transition-all h-full"
                                >
                                    <span className="text-[#a5a5b2] text-[14px] truncate">{selectedTag === text.all ? text.tagLabel : selectedTag}</span>
                                    <ChevronDown className={`text-[#3457DC] transition-transform duration-300 ${activeDropdown === 'tags' ? 'rotate-180' : ''}`} size={20} />
                                </button>
                                <AnimatePresence>
                                    {activeDropdown === 'tags' && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-[#1e1e24] border border-white/10 rounded-xl p-2 z-50 shadow-2xl max-h-[300px] overflow-y-auto"
                                        >
                                            {[text.all, ...allTags].map(opt => (
                                                <button
                                                    key={opt}
                                                    onClick={() => { setSelectedTag(opt); setActiveDropdown(null); }}
                                                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedTag === opt ? 'bg-[#3457DC] text-white' : 'text-[#a5a5b2] hover:bg-white/5'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Team Dropdown */}
                            <div className="relative w-full">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'team' ? null : 'team')}
                                    className="bg-[#1e1e24] flex items-center justify-between px-6 py-3 rounded-2xl w-full border border-white/5 hover:bg-[#25252d] transition-all h-full"
                                >
                                    <span className="text-[#a5a5b2] text-[14px] truncate">{selectedTeam === text.all ? text.teamLabel : (teams.find(t => t._id === selectedTeam)?.name || selectedTeam)}</span>
                                    <ChevronDown className={`text-[#3457DC] transition-transform duration-300 ${activeDropdown === 'team' ? 'rotate-180' : ''}`} size={20} />
                                </button>
                                <AnimatePresence>
                                    {activeDropdown === 'team' && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-[#1e1e24] border border-white/10 rounded-xl p-2 z-50 shadow-2xl max-h-[300px] overflow-y-auto"
                                        >
                                            <button
                                                onClick={() => { setSelectedTeam(text.all); setActiveDropdown(null); }}
                                                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedTeam === text.all ? 'bg-[#3457DC] text-white' : 'text-[#a5a5b2] hover:bg-white/5'}`}
                                            >
                                                {text.all}
                                            </button>
                                            {teams.map(t => (
                                                <button
                                                    key={t._id}
                                                    onClick={() => { setSelectedTeam(t._id); setActiveDropdown(null); }}
                                                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedTeam === t._id ? 'bg-[#3457DC] text-white' : 'text-[#a5a5b2] hover:bg-white/5'}`}
                                                >
                                                    {t.name}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Project Dropdown */}
                            <div className="relative w-full">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'project' ? null : 'project')}
                                    className="bg-[#1e1e24] flex items-center justify-between px-6 py-3 rounded-2xl w-full border border-white/5 hover:bg-[#25252d] transition-all h-full"
                                >
                                    <span className="text-[#a5a5b2] text-[14px] truncate">{selectedProject === text.all ? text.projectLabel : (projects.find(p => p._id === selectedProject)?.title || selectedProject)}</span>
                                    <ChevronDown className={`text-[#3457DC] transition-transform duration-300 ${activeDropdown === 'project' ? 'rotate-180' : ''}`} size={20} />
                                </button>
                                <AnimatePresence>
                                    {activeDropdown === 'project' && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-[#1e1e24] border border-white/10 rounded-xl p-2 z-50 shadow-2xl max-h-[300px] overflow-y-auto"
                                        >
                                            <button
                                                onClick={() => { setSelectedProject(text.all); setActiveDropdown(null); }}
                                                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedProject === text.all ? 'bg-[#3457DC] text-white' : 'text-[#a5a5b2] hover:bg-white/5'}`}
                                            >
                                                {text.all}
                                            </button>
                                            {projects.map(p => (
                                                <button
                                                    key={p._id}
                                                    onClick={() => { setSelectedProject(p._id); setActiveDropdown(null); }}
                                                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedProject === p._id ? 'bg-[#3457DC] text-white' : 'text-[#a5a5b2] hover:bg-white/5'}`}
                                                >
                                                    {p.title}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Search & Filters */}
                    <div className="flex lg:hidden flex-col gap-4 w-full">
                        <div className="flex items-center gap-3 w-full">
                            <button
                                onClick={() => {
                                    setIsSearching(!isSearching);
                                    if (isFiltering) setIsFiltering(false);
                                }}
                                className={`h-14 w-14 flex items-center justify-center rounded-2xl bg-[#1e1e24] border border-white/5 transition-all active:scale-90 ${isSearching ? 'border-[#3457DC]/50' : ''}`}
                            >
                                <Search className="w-5 h-5 text-[#3457DC]" />
                            </button>

                            <button
                                onClick={() => {
                                    setIsFiltering(!isFiltering);
                                    if (isSearching) setIsSearching(false);
                                }}
                                className={`h-14 w-14 flex items-center justify-center rounded-2xl bg-[#1e1e24] border border-white/5 transition-all active:scale-90 ${isFiltering ? 'border-[#3457DC]/50' : ''}`}
                            >
                                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 3.26667C15 1.465 13.535 0 11.7333 0H3.26667C1.465 0 0 1.465 0 3.26667C0 4.04583 0.279167 4.80083 0.786667 5.3925L5 10.3083V13.3333C5 13.5958 5.12333 13.8425 5.33333 14L8.66667 16.5C8.81417 16.61 8.99 16.6667 9.16667 16.6667C9.29333 16.6667 9.42167 16.6375 9.53917 16.5792C9.82167 16.4383 10 16.1492 10 15.8333V10.3083L14.2133 5.3925C14.7208 4.80083 15 4.04583 15 3.26667ZM12.9483 4.30833L8.53417 9.45833C8.405 9.60917 8.33333 9.80167 8.33333 10.0008V14.1675L6.66667 12.9175V10.0008C6.66667 9.80167 6.59583 9.60917 6.46583 9.45833L2.05167 4.3075C1.80333 4.0175 1.66667 3.6475 1.66667 3.26583C1.66667 2.38333 2.38417 1.66583 3.26667 1.66583H11.7333C12.6158 1.66583 13.3333 2.38333 13.3333 3.26583C13.3333 3.6475 13.1967 4.01833 12.9483 4.30833ZM20 15.0008C20 15.4608 19.6267 15.8342 19.1667 15.8342H12.5C12.04 15.8342 11.6667 15.4608 11.6667 15.0008C11.6667 14.5408 12.04 14.1675 12.5 14.1675H19.1667C19.6267 14.1675 20 14.5408 20 15.0008ZM20 11.6675C20 12.1275 19.6267 12.5008 19.1667 12.5008H12.5C12.04 12.5008 11.6667 12.1275 11.6667 11.6675C11.6667 11.2075 12.04 10.8342 12.5 10.8342H19.1667C19.6267 10.8342 20 11.2075 20 11.6675ZM15 7.50083H19.1667C19.6267 7.50083 20 7.87417 20 8.33417C20 8.79417 19.6267 9.1675 19.1667 9.1675H15C14.54 9.1675 14.1667 8.79417 14.1667 8.33417C14.1667 7.87417 14.54 7.50083 15 7.50083Z" fill="#3457DC" />
                                </svg>
                            </button>

                            <button
                                onClick={() => setIsFiltering(!isFiltering)}
                                className={`flex-1 h-14 bg-[#3457DC] text-white rounded-2xl font-bold text-sm tracking-wide transition-all active:scale-95 ${isFiltering ? 'brightness-110 shadow-[0_0_20px_rgba(52,87,220,0.3)]' : ''}`}
                            >
                                {isRTL ? "تصفية المنشورات" : "Filter Publications"}
                            </button>
                        </div>

                        <AnimatePresence>
                            {isSearching && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="w-full overflow-hidden"
                                >
                                    <div className={`bg-[#1e1e24] flex items-center gap-4 px-5 py-3.5 rounded-2xl w-full border border-[#3457DC]/30 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <input
                                            type="text"
                                            autoFocus
                                            placeholder={text.searchPlaceholder}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="bg-transparent border-none outline-none text-white text-[15px] w-full placeholder:text-[#a5a5b2]"
                                        />
                                        <Search className="text-[#3457DC]" size={20} />
                                    </div>
                                </motion.div>
                            )}

                            {isFiltering && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="w-full overflow-hidden"
                                >
                                    <div className="flex flex-col gap-3 bg-[#1e1e24] border border-white/5 rounded-2xl p-4 shadow-2xl">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {[
                                                {
                                                    label: selectedYear === text.all ? text.yearLabel : selectedYear,
                                                    value: selectedYear,
                                                    type: 'year'
                                                },
                                                { label: text.sortRecent, value: selectedSort, type: 'sort' },
                                                { label: selectedCategory, value: selectedCategory, type: 'category' },
                                                { label: selectedTag === text.all ? text.tagLabel : selectedTag, value: selectedTag, type: 'tags' },
                                                { label: selectedTeam === text.all ? text.teamLabel : (teams.find(t => t._id === selectedTeam)?.name || selectedTeam), value: selectedTeam, type: 'team' },
                                                { label: selectedProject === text.all ? text.projectLabel : (projects.find(p => p._id === selectedProject)?.title || selectedProject), value: selectedProject, type: 'project' }
                                            ].map((item, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setActiveDropdown(activeDropdown === item.type ? null : item.type)}
                                                    className="relative bg-[#151519] flex items-center justify-between px-5 py-3 rounded-xl border border-white/5 hover:bg-[#25252d] transition-all"
                                                >
                                                    <span className="text-[#a5a5b2] text-[13px] truncate">{item.label}</span>
                                                    <ChevronDown className={`text-[#3457DC] transition-transform ${activeDropdown === item.type ? 'rotate-180' : ''}`} size={16} />
                                                    
                                                    {/* Nested Dropdown Content for Mobile */}
                                                    <AnimatePresence>
                                                        {activeDropdown === item.type && (
                                                            <motion.div 
                                                                initial={{ opacity: 0, scale: 0.95 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0.95 }}
                                                                className="absolute top-full left-0 right-0 mt-2 bg-[#1e1e24] border border-white/10 rounded-xl p-2 z-[60] shadow-2xl max-h-[250px] overflow-y-auto"
                                                            >
                                                                {/* Year Options */}
                                                                {item.type === 'year' && [text.all, ...allYears].map(opt => (
                                                                    <button key={opt} onClick={(e) => { e.stopPropagation(); setSelectedYear(opt); setActiveDropdown(null); }} className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-[#a5a5b2] hover:bg-white/5">{opt}</button>
                                                                ))}
                                                                {/* Sort Options */}
                                                                {item.type === 'sort' && [text.sortByRecent, text.sortByOldest].map(opt => (
                                                                    <button key={opt} onClick={(e) => { e.stopPropagation(); setSelectedSort(opt); setActiveDropdown(null); }} className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-[#a5a5b2] hover:bg-white/5">{opt}</button>
                                                                ))}
                                                                {/* Category Options */}
                                                                {item.type === 'category' && [text.all, ...allFields].map(opt => (
                                                                    <button key={opt} onClick={(e) => { e.stopPropagation(); setSelectedCategory(opt); setActiveDropdown(null); }} className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-[#a5a5b2] hover:bg-white/5">{opt}</button>
                                                                ))}
                                                                {/* Tags Options */}
                                                                {item.type === 'tags' && [text.all, ...allTags].map(opt => (
                                                                    <button key={opt} onClick={(e) => { e.stopPropagation(); setSelectedTag(opt); setActiveDropdown(null); }} className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-[#a5a5b2] hover:bg-white/5">{opt}</button>
                                                                ))}
                                                                {/* Team Options */}
                                                                {item.type === 'team' && [text.all, ...teams.map(t => t.name)].map(opt => (
                                                                    <button key={opt} onClick={(e) => { e.stopPropagation(); setSelectedTeam(opt === text.all ? text.all : teams.find(t => t.name === opt)._id); setActiveDropdown(null); }} className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-[#a5a5b2] hover:bg-white/5">{opt}</button>
                                                                ))}
                                                                {/* Project Options */}
                                                                {item.type === 'project' && [text.all, ...projects.map(p => p.title)].map(opt => (
                                                                    <button key={opt} onClick={(e) => { e.stopPropagation(); setSelectedProject(opt === text.all ? text.all : projects.find(p => p.title === opt)._id); setActiveDropdown(null); }} className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-[#a5a5b2] hover:bg-white/5">{opt}</button>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 mb-20">
                <div className="max-w-[1240px] mx-auto grid grid-cols-1 gap-6">
                    {isLoading && publications.length === 0 ? (
                        <div className="text-center py-20 opacity-40">{text.loading}</div>
                    ) : filteredPublications.length === 0 ? (
                        <div className="text-center py-20 opacity-40">{text.noPublications}</div>
                    ) : (
                        filteredPublications.map((pub, idx) => (
                            <ResearchPaperCard 
                                key={pub._id || idx} 
                                id={pub._id}
                                title={pub.title}
                                authors={Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}
                                year={pub.publishedDate ? new Date(pub.publishedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : (pub.year || '2024')}
                                journal={pub.team?.name || pub.publisher}
                                description={pub.description || pub.contribution || pub.abstract}
                                tags={pub.tags}
                                activeFilds={pub.activeFilds}
                                link={pub.documentUrl ? (pub.documentUrl.startsWith('http') ? pub.documentUrl : `${API_BASE_URL}${pub.documentUrl}`) : '#'}
                                isRTL={isRTL}
                                projectName={pub.project?.title || pub.projectName}
                                views={pub.views}
                                onView={handlePublicationView}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className="container mx-auto px-6 pb-20">
                <div className="max-w-[1240px] mx-auto flex items-center justify-between pt-8 border-t border-white/5">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${currentPage === 1 ? 'bg-white/5 opacity-30 cursor-not-allowed' : 'bg-[#3457DC] hover:scale-110 active:scale-95'}`}
                    >
                        {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="bg-[#1e1e24] border border-white/5 rounded-xl px-4 py-2 font-bold min-w-[50px] text-center">
                            {currentPage}
                        </div>
                        <span className="text-[#a5a5b2] text-sm">{text.of} {totalPages}</span>
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${currentPage === totalPages ? 'bg-white/5 opacity-30 cursor-not-allowed' : 'bg-[#3457DC] hover:scale-110 active:scale-95'}`}
                    >
                        {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                </div>
            </div>

            <div className="w-full bg-[#070710] py-32 relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-[800px] mx-auto text-center">
                        <h2 className="text-white font-gilroy font-extrabold text-[40px] md:text-[56px] mb-6 leading-tight">
                            {text.teamsSectionTitle}
                        </h2>
                        <p className="text-[#7b829d] text-lg mb-10 leading-relaxed">
                            {text.teamsSectionSubtitle}
                        </p>
                        
                        <Link to="/teams-researches">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[#3457DC] text-white px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 mx-auto shadow-[0_0_20px_rgba(52,87,220,0.4)] hover:shadow-[0_0_30px_rgba(52,87,220,0.6)] transition-all"
                            >
                                {text.viewTeams}
                                <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
