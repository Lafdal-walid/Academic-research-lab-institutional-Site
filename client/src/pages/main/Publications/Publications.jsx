import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Link as LinkIcon, Users as UsersIcon, Calendar as CalendarIcon, ExternalLink } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from "@/contexts/LanguageContext";

const svgPathsTeams = {
    p11b7c570: "M8.25 10.0833C10.275 10.0833 11.9167 8.44171 11.9167 6.41667C11.9167 4.39162 10.275 2.75 8.25 2.75C6.22496 2.75 4.58333 4.39162 4.58333 6.41667C4.58333 8.44171 6.22496 10.0833 8.25 10.0833Z",
    p1de049e0: "M20.1667 19.25V17.4167C20.1661 16.6043 19.8957 15.815 19.3979 15.173C18.9002 14.5309 18.2033 14.0723 17.4167 13.8692",
    p35b71ef0: "M14.6667 2.86917C15.4554 3.07111 16.1545 3.52981 16.6537 4.17295C17.1529 4.81609 17.4239 5.60709 17.4239 6.42125C17.4239 7.23541 17.1529 8.02641 16.6537 8.66955C16.1545 9.31269 15.4554 9.77139 14.6667 9.97333",
    p80127a0: "M14.6667 19.25V17.4167C14.6667 16.4442 14.2804 15.5116 13.5927 14.8239C12.9051 14.1363 11.9725 13.75 11 13.75H5.5C4.52754 13.75 3.59491 14.1363 2.90728 14.8239C2.21964 15.5116 1.83333 16.4442 1.83333 17.4167V19.25",
};

const ResearchTeamCard = ({ title, leader, members, membersCount, gradient, isRTL }) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 min-h-[240px] relative overflow-hidden group hover:border-[#3457DC]/40 transition-all">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundImage: gradient }}>
            <svg className="w-5 h-5 text-white" viewBox="0 0 22 22" fill="none">
                <path d={svgPathsTeams.p80127a0} stroke="currentColor" strokeWidth="1.83" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPathsTeams.p11b7c570} stroke="currentColor" strokeWidth="1.83" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPathsTeams.p1de049e0} stroke="currentColor" strokeWidth="1.83" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPathsTeams.p35b71ef0} stroke="currentColor" strokeWidth="1.83" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
        <h3 className="text-white font-bold text-[16px] mb-2 leading-tight">{title}</h3>
        <p className="text-[#395ed5] text-[12px] font-medium mb-1">
            {isRTL ? 'القائد:' : 'Leader:'} <span className="text-[#7b829d] font-normal">{leader}</span>
        </p>
        <p className="text-[#7b829d] text-[12px] mb-4">
            {membersCount} {isRTL ? 'أعضاء' : 'Members'}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
            {members.map((m, i) => (
                <div key={i} className="bg-[#3457DC]/10 px-3 py-1 rounded-full border border-white/5">
                    <span className="text-[#7b829d] text-[10px] whitespace-nowrap">{m}</span>
                </div>
            ))}
        </div>
    </div>
);

const ResearchPaperCard = ({ title, authors, year, journal, description, tags, link, isRTL }) => {
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
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors p-1">
                    <ExternalLink size={20} />
                </a>
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
            </div>

            {journal && (
                <div className="text-sm font-medium text-blue-500/80 uppercase tracking-wide">
                    {journal}
                </div>
            )}

            {description && (
                <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                    {description}
                </p>
            )}

            <div className={`flex flex-wrap gap-2 mt-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
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
        contribution: "Explored attention mechanisms to improve reasoning capabilities in hierarchical cognitive models."
    },
    {
        title: "Dynamic Resource Allocation in Distributed Cloud Networks using Deep Reinforcement Learning",
        authors: ["M. Zahra", "K. Omar"],
        year: "2023",
        publisher: "Journal of Network and Computer Applications",
        tags: ["Deep Learning", "Cloud Computing"],
        contribution: "Proposed a DRL-based framework for optimizing resource distribution in cloud environments."
    },
    {
        title: "Scalable Federated Learning for Privacy-Preserving Medical Imaging Analytics",
        authors: ["A. Mansouri", "S. Dahlab", "H. Khelifi"],
        year: "2025",
        publisher: "AI in Medicine Journal",
        tags: ["Federated Learning", "Privacy", "Healthcare AI"],
        contribution: "Introduced a novel decentralized aggregation protocol that reduces communication overhead by 40% while maintaining differential privacy."
    },
    {
        title: "Autonomous Path Planning in Highly Dynamic Environments using Transformer networks",
        authors: ["Y. Benali", "M. Zahra"],
        year: "2024",
        publisher: "Robotics and Autonomous Systems",
        tags: ["Robotics", "Autonomous Systems", "Transformers"],
        contribution: "Developed a transformer-based spatial encoder that predicts obstacle trajectories with sub-centimeter precision."
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
        requestResearch: isRTL ? 'طلب إضافة بحث؟' : 'Request a Research?',
        loading: isRTL ? 'جاري تحميل الأوراق البحثية...' : 'Loading research papers...',
        noPublications: isRTL ? 'لم يتم العثور على منشورات.' : 'No publications found.',
        of: isRTL ? 'من' : 'of',
        researchTeams: isRTL ? 'الفرق البحثية' : 'Research Teams',
        researchTeamsSubtitle: isRTL ? 'فرقنا البحثية المتخصصة في مختلف مجالات علوم الحاسوب والتكنولوجيا' : 'Our specialized research teams in various fields of computer science and technology',
        teamsLoading: isRTL ? 'جاري تحميل الفرق...' : 'Loading teams...'
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedSort, setSelectedSort] = useState(text.sortByRecent);
    const [selectedCategory, setSelectedCategory] = useState(text.categoryLabel);
    const [publications, setPublications] = useState(STATIC_PUBLICATIONS);
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 1;

    const dropdownRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
                
                const pubRes = await fetch(`${baseUrl}/api/publications`);
                if (pubRes.ok) {
                    const pubData = await pubRes.json();
                    if (pubData && pubData.length > 0) {
                        setPublications(pubData);
                    }
                }

                const teamRes = await fetch(`${baseUrl}/api/teams`);
                if (teamRes.ok) {
                    const teamData = await teamRes.json();
                    setTeams(teamData);
                }
            } catch (err) {
                console.error("Failed to fetch data from backend", err);
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

    // Update internal state when language changes
    useEffect(() => {
        setSelectedSort(isRTL ? 'الأحدث' : 'sort by recent');
        setSelectedCategory(isRTL ? 'الفئة' : 'Categorie');
    }, [language, isRTL]);

    const filteredPublications = publications
        .filter(pub => {
            const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (Array.isArray(pub.authors) ? pub.authors.some(auth => auth.toLowerCase().includes(searchTerm.toLowerCase())) : pub.authors.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (pub.tags && pub.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
            
            const categoryMatch = selectedCategory === 'Categorie' || selectedCategory === 'All' || selectedCategory === 'الفئة' || selectedCategory === 'الكل' ||
                (pub.field && pub.field.toLowerCase() === selectedCategory.toLowerCase()) ||
                (pub.tags && pub.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase()));
            
            return matchesSearch && categoryMatch;
        })
        .sort((a, b) => {
            if (selectedSort === 'sort by recent' || selectedSort === 'الأحدث') {
                return b.year - a.year;
            } else if (selectedSort === 'sort by oldest' || selectedSort === 'الأقدم') {
                return a.year - b.year;
            }
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

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:flex-[3]">
                        <div className="relative w-full">
                            <button
                                onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
                                className="bg-[#1e1e24] flex items-center justify-between px-6 py-3 rounded-2xl w-full border border-white/5 hover:bg-[#25252d] transition-all"
                            >
                                <span className="text-[#a5a5b2] text-[14px]">{selectedSort}</span>
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

                        <div className="relative w-full">
                            <button
                                onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
                                className="bg-[#1e1e24] flex items-center justify-between px-6 py-3 rounded-2xl w-full border border-white/5 hover:bg-[#25252d] transition-all"
                            >
                                <span className="text-[#a5a5b2] text-[14px]">{selectedCategory}</span>
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
                                        {[text.all, 'AI & Vision', 'Networks', 'Embedded Systems'].map(opt => (
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

                        <button className="bg-[#1e1e24] flex items-center justify-center px-8 py-3 rounded-2xl w-full border border-white/5 hover:bg-[#25252d] transition-all whitespace-nowrap">
                            <span className="text-[#a5a5b2] font-medium text-[14px]">{text.requestResearch}</span>
                        </button>
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
                                title={pub.title}
                                authors={Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}
                                year={pub.year}
                                journal={pub.publisher}
                                description={pub.contribution}
                                tags={pub.tags}
                                link={pub.documentUrl ? (pub.documentUrl.startsWith('http') ? pub.documentUrl : `http://localhost:5000${pub.documentUrl}`) : '#'}
                                isRTL={isRTL}
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

            <div className="w-full bg-[#070710] py-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-white font-gilroy font-extrabold text-[48px] mb-4">{text.researchTeams}</h2>
                        <p className="text-[#7b829d] text-[18px] max-w-2xl mx-auto">{text.researchTeamsSubtitle}</p>
                    </div>

                    <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {teams.length > 0 ? (
                            teams.map((team, idx) => (
                                <ResearchTeamCard 
                                    key={team._id || idx}
                                    title={team.name}
                                    leader={team.leader?.username || team.leader || 'N/A'}
                                    members={team.members?.map(m => m.username || m) || []}
                                    membersCount={team.members?.length || 0}
                                    gradient={idx % 3 === 0 ? "linear-gradient(135deg, rgb(57, 94, 213) 0%, rgb(60, 87, 221) 100%)" : idx % 3 === 1 ? "linear-gradient(135deg, rgb(102, 51, 204) 0%, rgb(134, 57, 172) 100%)" : "linear-gradient(135deg, rgb(34, 142, 195) 0%, rgb(51, 102, 204) 100%)"}
                                    isRTL={isRTL}
                                />
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-10 opacity-40">{text.teamsLoading}</div>
                        )}
                    </div>
                </div>
                
                <div className="h-20 w-full" />
            </div>
        </div>
    );
}
