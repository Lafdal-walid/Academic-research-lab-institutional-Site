import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users as UsersIcon, Calendar as CalendarIcon, Eye, Download, Briefcase, Search } from 'lucide-react';
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
            className={`bg-white/[0.02] border border-white/[0.05] rounded-[24px] p-5 md:p-8 flex flex-col gap-5 group hover:border-[#3457DC]/40 transition-all duration-300 relative overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#3457DC]/0 group-hover:bg-[#3457DC] transition-all" />
            
            <div className={`flex flex-col sm:flex-row justify-between items-start gap-4 relative z-10 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <h3 className="text-lg md:text-xl font-bold text-white/90 font-gilroy leading-tight group-hover:text-white transition-colors flex-1 break-words">
                    {title}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                    <a href={link} target="_blank" rel="noopener noreferrer" onClick={handleView} className="text-white/20 hover:text-[#3457DC] transition-colors p-2 rounded-xl hover:bg-[#3457DC]/5" title="View Publication">
                        <Eye size={18} />
                    </a>
                    <a href={link} download onClick={handleView} className="text-white/20 hover:text-[#3457DC] transition-colors p-2 rounded-xl hover:bg-[#3457DC]/5" title="Download Publication">
                        <Download size={18} />
                    </a>
                </div>
            </div>

            <div className={`flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-3 relative z-10 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex items-center gap-2 text-white/40 text-xs md:text-sm">
                    <UsersIcon size={14} className="text-[#3457DC]/60 md:w-4 md:h-4" />
                    <span className="font-medium truncate max-w-[150px] md:max-w-none">{authors}</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-xs md:text-sm">
                    <CalendarIcon size={12} className="text-[#3457DC]/60 md:w-[14px] md:h-[14px]" />
                    <span className="font-medium">{year}</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-xs md:text-sm">
                    <Eye size={12} className="text-[#3457DC]/60 md:w-[14px] md:h-[14px]" />
                    <span className="font-medium">{views || 0}</span>
                </div>
                {projectName && (
                    <div className="flex items-center gap-2 text-white/40 text-xs md:text-sm">
                        <Briefcase size={12} className="text-[#3457DC]/60 md:w-[14px] md:h-[14px]" />
                        <span className="font-medium truncate max-w-[150px] md:max-w-none">{projectName}</span>
                    </div>
                )}
            </div>

            {journal && (
                <div className={`text-[12px] font-bold text-[#3457DC] uppercase tracking-[0.1em] relative z-10 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {journal}
                </div>
            )}

            {description && (
                <p className={`text-white/50 text-[14px] leading-relaxed line-clamp-3 relative z-10 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {description}
                </p>
            )}

            <div className={`flex flex-wrap gap-2 mt-2 relative z-10 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                {activeFilds && activeFilds.map((field, idx) => (
                    <span key={idx} className="bg-[#3457DC] px-4 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
                        {field}
                    </span>
                ))}
                {tags && tags.map((tag, idx) => (
                    <span key={idx} className="bg-white/[0.03] border border-white/[0.05] px-4 py-1 rounded-full text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-white/70 transition-colors">
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

export default function TeamsResearches() {
    const { language } = useLanguage();
    const isRTL = language === "ar";
    
    const text = {
        badge: isRTL ? 'الفرق البحثية' : 'RESEARCH TEAMS',
        title: isRTL ? 'فرق البحث والابتكار' : 'Research & Innovation Teams',
        subtitle: isRTL ? 'استكشف فرقنا البحثية ومنشوراتها' : 'Explore our research teams and their publications',
        leader: isRTL ? 'القائد:' : 'Leader:',
        members: isRTL ? 'أعضاء' : 'Members',
        projectsLabel: isRTL ? 'المشاريع البحثية' : 'RESEARCH PROJECTS',
        publicationsLabel: isRTL ? 'المنشورات البحثية' : 'TEAM PUBLICATIONS',
        status: isRTL ? 'الحالة' : 'Status',
        teamMembers: isRTL ? 'أعضاء الفريق' : 'Team Members',
        startDate: isRTL ? 'تاريخ البدء' : 'Start Date',
        endDate: isRTL ? 'تاريخ الانتهاء' : 'End Date',
        description: isRTL ? 'الوصف' : 'Description',
        researchMembers: isRTL ? 'أعضاء البحث' : 'Research Members',
        ongoing: isRTL ? 'مستمر' : 'Ongoing',
        loading: isRTL ? 'جاري التحميل...' : 'Loading teams data...',
        noTeams: isRTL ? 'لم يتم العثور على فرق بحثية.' : 'No research teams found.'
    };

    const [teams, setTeams] = useState([]);
    const [projects, setProjects] = useState([]);
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handlePublicationView = (id) => {
        setPublications(prev => prev.map(pub => 
            pub._id === id ? { ...pub, views: (pub.views || 0) + 1 } : pub
        ));
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const baseUrl = API_BASE_URL;
                
                const [teamRes, projRes, pubRes] = await Promise.all([
                    fetch(`${baseUrl}/api/teams`),
                    fetch(`${baseUrl}/api/projects`),
                    fetch(`${baseUrl}/api/publications`)
                ]);

                if (teamRes.ok) setTeams(await teamRes.json());
                if (projRes.ok) setProjects(await projRes.json());
                if (pubRes.ok) setPublications(await pubRes.json());

            } catch (err) {
                console.error("Failed to fetch data", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

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
                    <h1 className="font-gilroy font-extrabold text-[42px] md:text-[72px] lg:text-[96px] leading-[1.1] mb-6">
                        {text.title}
                    </h1>
                    <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{text.subtitle}</p>
                </motion.div>
            </div>

            <div className="w-full h-px bg-[#373735]/30 relative mb-16">
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3457DC]/50 to-transparent" />
            </div>

            <div className="container mx-auto px-6 pb-32">
                {isLoading ? (
                    <div className="text-center py-20 opacity-40">{text.loading}</div>
                ) : teams.length === 0 ? (
                    <div className="text-center py-20 opacity-40">{text.noTeams}</div>
                ) : (
                    <div className="max-w-[1240px] mx-auto flex flex-col gap-16">
                        {teams.map((team, idx) => {
                            const teamProjects = projects.filter(p => p.team?._id === team._id || p.team === team._id);
                            const teamPublications = publications.filter(p => p.team?._id === team._id || p.team === team._id);
                            
                            return (
                                <motion.div 
                                    key={team._id || idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-[#0A0A12] border border-[#1E1E2E] rounded-[32px] p-8 md:p-12 transition-all hover:border-[#3457DC]/30 relative overflow-hidden group shadow-2xl"
                                >
                                    {/* Decorative background element */}
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3457DC]/5 blur-[120px] rounded-full -mr-64 -mt-64 group-hover:bg-[#3457DC]/8 transition-colors pointer-events-none" />
                                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full -ml-32 -mb-32 pointer-events-none" />
                                    
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16 pb-12 border-b border-white/[0.05] relative z-10">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-2 h-10 bg-gradient-to-b from-[#3457DC] to-blue-600 rounded-full shadow-[0_0_15px_rgba(52,87,220,0.4)]" />
                                                <h2 className="text-white font-gilroy font-extrabold text-4xl md:text-5xl tracking-tight">{team.name}</h2>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4 inline-flex flex-col gap-1 max-w-full">
                                                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#3457DC] font-black">{text.leader}</span>
                                                    <span className="text-white text-[15px] md:text-[16px] font-medium break-all">{team.leader?.email || team.leader?.username || team.leader || 'N/A'}</span>
                                                </div>
                                                <p className="text-[#80808a] text-[15px] flex items-center gap-2 px-4">
                                                    <UsersIcon size={16} className="text-[#3457DC]/80" />
                                                    <span className="text-white/40 font-medium">{team.members?.length || 0} {text.members}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {teamProjects.length > 0 && (
                                        <div className="mb-20 relative z-10">
                                            <div className="flex items-center gap-6 mb-10">
                                                <h3 className="text-white/30 text-[11px] uppercase tracking-[0.3em] font-bold whitespace-nowrap">{text.projectsLabel}</h3>
                                                <div className="h-px bg-white/[0.05] flex-1" />
                                            </div>
                                            <div className="grid grid-cols-1 gap-10">
                                                {teamProjects.map((project, pIdx) => (
                                                    <div key={project._id || pIdx} className="bg-[#12121A] border border-white/[0.03] rounded-[24px] p-8 md:p-10 hover:border-[#3457DC]/20 transition-all shadow-lg relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#3457DC]/5 blur-3xl pointer-events-none" />
                                                        
                                                        <div className="flex flex-col gap-10">
                                                            <div className="flex flex-col gap-4">
                                                                <h4 className="text-xl md:text-3xl font-bold text-white group-hover:text-[#3457DC] transition-colors break-words">{project.title}</h4>
                                                                <div className="h-1 w-20 bg-gradient-to-r from-[#3457DC] to-transparent rounded-full" />
                                                            </div>

                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 bg-white/[0.02] p-5 md:p-6 rounded-2xl border border-white/[0.03]">
                                                                <div className="flex flex-col gap-1.5">
                                                                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#80808a] font-extrabold">{text.status}</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <div className={`w-2 h-2 rounded-full ${project.status === 'Ongoing' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : project.status === 'Completed' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
                                                                        <span className="text-xs md:text-sm font-bold text-white/90">{project.status}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col gap-1.5">
                                                                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#80808a] font-extrabold">{text.teamMembers}</span>
                                                                    <span className="text-xs md:text-sm text-white/90 font-bold">{project.members?.length || 0}</span>
                                                                </div>
                                                                <div className="flex flex-col gap-1.5">
                                                                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#80808a] font-extrabold">{text.startDate}</span>
                                                                    <span className="text-xs md:text-sm text-white/90 font-bold">{project.startDate ? new Date(project.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'N/A'}</span>
                                                                </div>
                                                                <div className="flex flex-col gap-1.5">
                                                                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#80808a] font-extrabold">{text.endDate}</span>
                                                                    <span className="text-xs md:text-sm text-white/90 font-bold">{project.endDate ? new Date(project.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : text.ongoing}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col gap-8 pt-4">
                                                                <div className="flex flex-col gap-3">
                                                                    <span className="text-[10px] uppercase tracking-widest text-[#3457DC] font-extrabold">{text.description}</span>
                                                                    <p className="text-white/60 text-[16px] leading-relaxed max-w-4xl">{project.description}</p>
                                                                </div>
                                                                
                                                                <div className="flex flex-wrap gap-2">
                                                                    {project.tags?.map((tag, tIdx) => (
                                                                        <span key={tIdx} className="bg-[#3457DC]/5 border border-[#3457DC]/10 px-4 py-1.5 rounded-lg text-[11px] text-[#3457DC] font-bold uppercase tracking-wider">
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>

                                                                <div className="flex flex-col gap-5 pt-6 border-t border-white/[0.03]">
                                                                    <span className="text-[10px] uppercase tracking-widest text-[#80808a] font-extrabold">{text.researchMembers} ({project.members?.length || 0})</span>
                                                                    <div className="flex flex-wrap gap-3">
                                                                        {project.members?.map((member, mIdx) => (
                                                                            <div key={mIdx} className="bg-white/[0.02] border border-white/[0.03] px-4 md:px-5 py-2.5 md:py-3 rounded-2xl flex items-center gap-3 hover:bg-white/[0.04] transition-colors group/member max-w-full overflow-hidden">
                                                                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#3457DC]/10 flex items-center justify-center text-[#3457DC] text-[9px] md:text-[10px] font-bold border border-[#3457DC]/20 shrink-0">
                                                                                    {member.username?.[0]?.toUpperCase() || member.email?.[0]?.toUpperCase() || 'U'}
                                                                                </div>
                                                                                <span className="text-[11px] md:text-xs text-white/50 group-hover/member:text-white/80 transition-colors break-all line-clamp-1">{member.email || member.username || member}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {teamPublications.length > 0 && (
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-6 mb-10">
                                                <h3 className="text-white/30 text-[11px] uppercase tracking-[0.3em] font-bold whitespace-nowrap">{text.publicationsLabel}</h3>
                                                <div className="h-px bg-white/[0.05] flex-1" />
                                            </div>
                                            <div className="grid grid-cols-1 gap-6">
                                                {teamPublications.map((pub, pIdx) => (
                                                    <ResearchPaperCard 
                                                        key={pub._id || pIdx} 
                                                        id={pub._id}
                                                        title={pub.title}
                                                        authors={Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}
                                                        year={pub.publishedDate ? new Date(pub.publishedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : (pub.year || '2024')}
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
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Team Community Section */}
            {!isLoading && teams.length > 0 && (
                <div className="bg-[#05030D] border-t border-white/[0.05] py-24 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#3457DC]/20 to-transparent" />
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-white font-gilroy font-extrabold text-3xl md:text-4xl mb-4">
                                {isRTL ? 'مجتمعنا البحثي' : 'Our Research Community'}
                            </h2>
                            <div className="h-1 w-20 bg-[#3457DC] mx-auto rounded-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1240px] mx-auto">
                            {teams.map((team, idx) => (
                                <motion.div 
                                    key={team._id || idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white/[0.02] border border-white/[0.05] rounded-[24px] p-8 flex flex-col items-center group hover:bg-white/[0.04] transition-all"
                                >
                                    <h3 className="text-white font-bold text-xl mb-6 group-hover:text-[#3457DC] transition-colors">{team.name}</h3>
                                    
                                    <div className="flex -space-x-3 hover:space-x-1 transition-all duration-300">
                                        {/* Leader Avatar */}
                                        <div 
                                            className="w-14 h-14 rounded-full border-2 border-[#3457DC] bg-[#3457DC]/20 flex items-center justify-center text-white font-bold text-lg relative z-20 shadow-lg"
                                            title={team.leader?.username || team.leader?.email || 'Leader'}
                                        >
                                            {(team.leader?.username || team.leader?.email || 'L')[0].toUpperCase()}
                                        </div>
                                        
                                        {/* Members Avatars */}
                                        {team.members?.slice(0, 5).map((member, mIdx) => (
                                            <div 
                                                key={mIdx}
                                                className="w-14 h-14 rounded-full border-2 border-[#1E1E2E] bg-[#1a1a24] flex items-center justify-center text-white/60 font-semibold text-sm relative z-10 shadow-lg hover:z-30 hover:scale-110 transition-all cursor-help"
                                                title={member.username || member.email || 'Member'}
                                            >
                                                {(member.username || member.email || 'M')[0].toUpperCase()}
                                            </div>
                                        ))}
                                        
                                        {team.members?.length > 5 && (
                                            <div className="w-14 h-14 rounded-full border-2 border-[#1E1E2E] bg-[#12121A] flex items-center justify-center text-white/40 font-bold text-xs relative z-0 shadow-lg">
                                                +{team.members.length - 5}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 flex flex-col items-center gap-1">
                                        <span className="text-[#80808a] text-xs font-bold uppercase tracking-widest">{text.members}</span>
                                        <span className="text-white font-black text-2xl">{team.members?.length + 1}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
