import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Image as ImageIcon, Calendar, Eye, ArrowRight, ExternalLink, Filter, Search, X, ChevronDown, ChevronLeft, ChevronRight, Briefcase, Users, LayoutGrid } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import API_BASE_URL from '@/config';

export default function NewsGallery() {
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    const [activeTab, setActiveTab] = useState('news'); // 'news' or 'gallery'
    const [news, setNews] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [teams, setTeams] = useState([]);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Filters
    const [selectedTeam, setSelectedTeam] = useState('All');
    const [selectedProject, setSelectedProject] = useState('All');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);

    // Modal / Lightbox State
    const [selectedNews, setSelectedNews] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const text = {
        title: isRTL ? 'الأخبار والمعرض' : 'News & Gallery',
        subtitle: isRTL ? 'استكشف آخر أخبار المختبر وأهم اللحظات العلمية' : 'Explore the latest lab news and key scientific moments',
        newsTab: isRTL ? 'أحدث الأخبار' : 'Latest News',
        galleryTab: isRTL ? 'معرض الصور' : 'Photo Gallery',
        readMore: isRTL ? 'اقرأ المزيد' : 'Read More',
        loading: isRTL ? 'جاري التحميل...' : 'Loading...',
        noNews: isRTL ? 'لا توجد أخبار حالياً' : 'No news available at the moment',
        noImages: isRTL ? 'لا توجد صور في المعرض حالياً' : 'No images in gallery at the moment',
        views: isRTL ? 'مشاهدة' : 'views',
        all: isRTL ? 'الكل' : 'All',
        events: isRTL ? 'فعاليات' : 'Events',
        research: isRTL ? 'أبحاث' : 'Research',
        visits: isRTL ? 'زيارات' : 'Visits',
        teamFilter: isRTL ? 'تصفية حسب الفريق' : 'Filter by Team',
        projectFilter: isRTL ? 'تصفية حسب المشروع' : 'Filter by Project',
        close: isRTL ? 'إغلاق' : 'Close',
        backToProjects: isRTL ? 'العودة للمشاريع' : 'Back to Projects',
        exploreProjectGallery: isRTL ? 'استكشف معرض المشروع' : 'Explore Project Gallery'
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [newsRes, galleryRes, teamsRes, projectsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/news`),
                    fetch(`${API_BASE_URL}/api/gallery`),
                    fetch(`${API_BASE_URL}/api/teams`),
                    fetch(`${API_BASE_URL}/api/projects`)
                ]);
                
                if (newsRes.ok) setNews(await newsRes.json());
                if (galleryRes.ok) {
                    const galleryData = await galleryRes.json();
                    setGalleryImages(galleryData.map(img => ({
                        id: img._id,
                        url: img.imageUrl.startsWith('http') ? img.imageUrl : `${API_BASE_URL}${img.imageUrl}`,
                        title: img.title,
                        team: img.team?.name || 'General',
                        project: img.project?.title || 'None',
                        category: img.category
                    })));
                }
                if (teamsRes.ok) setTeams(await teamsRes.json());
                if (projectsRes.ok) setProjects(await projectsRes.json());
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

    const filteredNews = news.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTeam = selectedTeam === 'All' || item.team?.name === selectedTeam;
        return matchesSearch && matchesTeam;
    });

    const filteredGallery = galleryImages.filter(img => {
        const matchesTeam = selectedTeam === 'All' || img.team === selectedTeam;
        const matchesProject = selectedProject === 'All' || img.project === selectedProject;
        return matchesTeam && matchesProject;
    });

    const handleNewsClick = (item) => {
        setSelectedNews(item);
        // Optimistically update views in local state
        setNews(prevNews => prevNews.map(n => 
            n._id === item._id ? { ...n, views: (n.views || 0) + 1 } : n
        ));
        fetch(`${API_BASE_URL}/api/news/${item._id}/view`, { method: 'PATCH' }).catch(console.error);
    };

    const handleImageClick = (img) => {
        setSelectedImage(img);
        // Optimistically update views in local state
        setGalleryImages(prevImages => prevImages.map(i => 
            i.id === img.id ? { ...i, views: (i.views || 0) + 1 } : i
        ));
        fetch(`${API_BASE_URL}/api/gallery/${img.id}/view`, { method: 'PATCH' }).catch(console.error);
    };

    return (
        <div className={`w-full min-h-screen bg-[#05030D] text-white pt-32 pb-20 relative overflow-x-hidden ${isRTL ? 'font-tajawal text-right' : 'font-poppins text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#3457DC]/10 blur-[120px] rounded-full pointer-events-none" />
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-block px-4 py-1 rounded-full bg-[#3457DC]/10 border border-[#3457DC]/20 text-[#3457DC] text-[12px] font-bold tracking-[0.2em] mb-6 uppercase">
                            {isRTL ? 'التحديثات والوسائط' : 'Updates & Media'}
                        </span>
                        <h1 className="text-4xl md:text-7xl font-gilroy font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 leading-tight">
                            {text.title}
                        </h1>
                        <p className="text-[#80808a] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            {text.subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Tab Switcher & Search & Filters */}
                <div className="flex flex-col gap-8 mb-16 max-w-[1240px] mx-auto">
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
                        {/* News/Gallery Toggle */}
                        <div className="flex bg-white/[0.03] border border-white/[0.05] p-1.5 rounded-2xl relative z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] w-full md:w-auto">
                            <button
                                onClick={() => { setActiveTab('news'); setSelectedProject('All'); }}
                                className={`flex items-center justify-center gap-2 md:gap-3 flex-1 md:flex-none px-4 md:px-8 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${activeTab === 'news' ? 'bg-[#3457DC] text-white shadow-lg' : 'text-[#80808a] hover:text-white'}`}
                            >
                                <Newspaper size={18} />
                                {text.newsTab}
                            </button>
                            <button
                                onClick={() => { setActiveTab('gallery'); setSelectedProject('All'); }}
                                className={`flex items-center justify-center gap-2 md:gap-3 flex-1 md:flex-none px-4 md:px-8 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${activeTab === 'gallery' ? 'bg-[#3457DC] text-white shadow-lg' : 'text-[#80808a] hover:text-white'}`}
                            >
                                <ImageIcon size={18} />
                                {text.galleryTab}
                            </button>
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-80 group">
                            <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#3457DC] transition-colors`} size={20} />
                            <input
                                type="text"
                                placeholder={isRTL ? "ابحث هنا..." : "Search here..."}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl py-4 ${isRTL ? 'pr-12 pl-6' : 'pl-12 pr-6'} text-sm outline-none focus:border-[#3457DC]/50 transition-all placeholder:text-white/10`}
                            />
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    {activeTab === 'news' ? (
                        <motion.div
                            key="news-grid"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1240px] mx-auto"
                        >
                            {isLoading ? (
                                <div className="col-span-full text-center py-20 opacity-40">{text.loading}</div>
                            ) : filteredNews.length === 0 ? (
                                <div className="col-span-full text-center py-20 opacity-40">{text.noNews}</div>
                            ) : (
                                filteredNews.map((item, idx) => (
                                    <motion.div
                                        key={item._id || idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        onClick={() => handleNewsClick(item)}
                                        className="group cursor-pointer bg-[#0A0A12] border border-[#1E1E2E] rounded-[32px] overflow-hidden hover:border-[#3457DC]/30 transition-all shadow-2xl relative"
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            <img 
                                                src={item.imageUrl ? (item.imageUrl.startsWith('http') ? item.imageUrl : `${API_BASE_URL}${item.imageUrl}`) : 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800'} 
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] via-transparent to-transparent opacity-60" />
                                            <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-[#3457DC] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full`}>
                                                {item.team?.name || text.research}
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <div className={`flex items-center gap-4 text-white/40 text-xs mb-4 ${isRTL ? 'flex-row' : ''}`}>
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-[#3457DC]" />
                                                    {new Date(item.createdAt).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Eye size={14} className="text-[#3457DC]" />
                                                    {item.views || 0} {text.views}
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold mb-4 group-hover:text-[#3457DC] transition-colors leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-[#80808a] text-sm leading-relaxed mb-6 line-clamp-3">
                                                {item.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-white font-bold text-sm group/btn">
                                                <span className="border-b border-transparent group-hover/btn:border-[#3457DC] transition-all">{text.readMore}</span>
                                                <ArrowRight size={16} className={`${isRTL ? 'rotate-180' : ''} group-hover/btn:translate-x-1 transition-transform`} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="gallery-section"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-[1240px] mx-auto"
                        >
                            <div className="space-y-12">
                                {/* Project Selection Pills */}
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <button 
                                        onClick={() => setSelectedProject('All')}
                                        className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border ${selectedProject === 'All' ? 'bg-[#3457DC] border-[#3457DC] text-white shadow-lg shadow-[#3457DC]/20' : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20'}`}
                                    >
                                        {text.all}
                                    </button>
                                    {projects.map(proj => (
                                        <button 
                                            key={proj._id}
                                            onClick={() => setSelectedProject(proj.title)}
                                            className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border ${selectedProject === proj.title ? 'bg-[#3457DC] border-[#3457DC] text-white shadow-lg shadow-[#3457DC]/20' : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20'}`}
                                        >
                                            {proj.title}
                                        </button>
                                    ))}
                                </div>

                                {filteredGallery.length === 0 ? (
                                    <div className="text-center py-20 opacity-40">{text.noImages}</div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {filteredGallery.map((img, idx) => (
                                            <motion.div
                                                key={img.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.05 }}
                                                onClick={() => handleImageClick(img)}
                                                className="group relative h-[400px] rounded-[40px] overflow-hidden cursor-pointer border border-white/5 hover:border-[#3457DC]/30 transition-all shadow-2xl"
                                            >
                                                <img 
                                                    src={img.url} 
                                                    alt={img.title} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] via-[#0A0A12]/20 to-transparent" />
                                                
                                                <div className="absolute bottom-8 left-8 right-8">
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        <span className="bg-[#3457DC] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{img.team}</span>
                                                        <span className="bg-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md">{img.category}</span>
                                                    </div>
                                                    <h4 className="text-white font-bold text-2xl mb-2 leading-tight">{img.title}</h4>
                                                    <p className="text-white/40 text-xs font-medium">{img.project}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* News Detail Modal */}
            <AnimatePresence>
                {selectedNews && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-32"
                    >
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedNews(null)} />
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl bg-[#0A0A12] border border-[#1E1E2E] rounded-[40px] overflow-hidden shadow-2xl max-h-full overflow-y-auto"
                        >
                            <button onClick={() => setSelectedNews(null)} className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} z-10 w-12 h-12 bg-black/50 hover:bg-[#3457DC] rounded-full flex items-center justify-center transition-all`}>
                                <X size={24} />
                            </button>
                            
                            <img 
                                src={selectedNews.imageUrl ? (selectedNews.imageUrl.startsWith('http') ? selectedNews.imageUrl : `${API_BASE_URL}${selectedNews.imageUrl}`) : 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200'} 
                                className="w-full h-[400px] object-cover" 
                                alt={selectedNews.title}
                            />
                            
                            <div className="p-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-2 text-white/40 text-sm">
                                        <Calendar size={16} className="text-[#3457DC]" />
                                        {new Date(selectedNews.createdAt).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                    <div className="flex items-center gap-2 text-white/40 text-sm">
                                        <Users size={16} className="text-[#3457DC]" />
                                        {selectedNews.team?.name || 'General'}
                                    </div>
                                </div>
                                <h2 className="text-4xl font-black mb-8 leading-tight">{selectedNews.title}</h2>
                                <div className="text-[#80808a] leading-loose text-lg whitespace-pre-wrap">
                                    {selectedNews.description}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-12 bg-black/95 backdrop-blur-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors">
                            <X size={32} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-6xl w-full h-auto max-h-[85vh] flex flex-col items-center gap-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img 
                                src={selectedImage.url} 
                                className="w-full h-full object-contain rounded-2xl shadow-[0_0_100px_rgba(52,87,220,0.2)]" 
                                alt={selectedImage.title}
                            />
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                                <div className="flex justify-center gap-3">
                                    <span className="px-4 py-1 bg-[#3457DC] text-[11px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-[#3457DC]/20">{selectedImage.team}</span>
                                    <span className="px-4 py-1 bg-white/10 text-[11px] font-black rounded-full uppercase tracking-widest">{selectedImage.project}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
