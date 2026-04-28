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
            className={`bg-[#151519] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 group hover:border-[#3457DC]/30 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
        >
            <div className={`flex justify-between items-start gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <h3 className="text-xl font-bold text-white font-gilroy leading-tight group-hover:text-[#3457DC] transition-colors">
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

            <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex items-center gap-2 text-white/40 text-sm">
                    <UsersIcon size={16} />
                    <span>{authors}</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-sm">
                    <CalendarIcon size={14} />
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
        searchPlaceholder: isRTL ? "ابحث هنا..." : "Search e.g Lab",
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
        projectLabel: isRTL ? 'المشروع' : 'Project'
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedSort, setSelectedSort] = useState(text.sortByRecent);
    const [selectedCategory, setSelectedCategory] = useState(text.all);
    const [selectedTag, setSelectedTag] = useState(text.all);
    const [publications, setPublications] = useState(STATIC_PUBLICATIONS);
    const [teams, setTeams] = useState([]);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTeam, setSelectedTeam] = useState(text.all);
    const [selectedProject, setSelectedProject] = useState(text.all);
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
    }, [language, isRTL]);

    const allFields = [...new Set(teams.flatMap(t => t.activeFilds || []))];
    const allTags = [...new Set(publications.flatMap(p => p.tags || []))];

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
            
            return matchesSearch && categoryMatch && tagMatch && teamMatch && projectMatch;
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

            <div className="container mx-auto px-6 pt-16 pb-24 text-center relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                >
                    <span className="text-[#3457DC] text-[13px] uppercase font-bold tracking-[0.2em] mb-0">{text.badge}</span>
                    <h1 className="font-gilroy font-extrabold text-[64px] md:text-[96px] leading-tight mb-4">{text.title}</h1>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">{text.subtitle}</p>
                </motion.div>
            </div>

            <div className="w-full h-px bg-[#373735]/30 relative mb-16">
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3457DC]/50 to-transparent" />
            </div>

            <div className="container mx-auto px-6 mb-12">
                <div className="flex flex-col lg:flex-row items-center gap-5 w-full max-w-[1240px] mx-auto" ref={dropdownRef}>
                    <div className={`bg-[#1e1e24] flex items-center gap-4 px-6 py-3 rounded-2xl w-full lg:flex-[2] border border-white/5 focus-within:border-[#3457DC]/50 transition-all ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                        <input
                            type="text"
                            placeholder={text.searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-white text-[15px] w-full placeholder:text-[#a5a5b2]"
                        />
                        <Search className="text-[#3457DC] shrink-0" size={20} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full lg:flex-[5]">
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
