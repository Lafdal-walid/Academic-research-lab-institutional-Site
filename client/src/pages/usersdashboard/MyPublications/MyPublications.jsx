import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from "react-dom";
import {
    RiRestartLine, RiDownloadLine, RiArrowGoBackLine, RiArrowGoForwardLine,
    RiArrowRightSLine, RiBold, RiItalic, RiUnderline, RiStrikethrough,
    RiImageLine, RiSeparator, RiDoubleQuotesL, RiLinksLine, RiListOrdered, RiListUnordered,
    RiFormatClear, RiAlignLeft, RiRefreshLine, RiErrorWarningLine, RiFileWordLine, RiCloseLine,
    RiEdit2Fill, RiDeleteBin6Line, RiCodeSSlashLine, RiCodeView
} from "react-icons/ri";
import { motion, AnimatePresence } from 'framer-motion';
import DropdownIcon from "@/assets/svg/userDashboard/PhdTracker/angle-small-down 1.svg";
import CalendarIcon from "@/assets/svg/userDashboard/PhdTracker/calendar-clock (7) 3.svg";
import SearchIcon from "@/assets/svg/userDashboard/PhdTracker/search-normal.svg";
import LinkIcon from "@/assets/svg/userDashboard/My Publications/Link → SVG.svg";
import UsersIcon from "@/assets/svg/userDashboard/My Publications/SVG1.svg";
import CalendarSquareIcon from "@/assets/svg/userDashboard/My Publications/Vector.svg";
import wordIcon from "@/assets/svg/userDashboard/My Publications/word/Vector-11.svg";
import PublishIcon from "@/assets/svg/userDashboard/My Publications/memo-circle-check_1.svg";
import PublishModal from './PublishModal';


const Checkbox = ({ checked, onChange }) => (
    <div
        onClick={(e) => {
            e.stopPropagation();
            onChange && onChange(!checked);
        }}
        style={{
            width: '1.25vw',
            height: '1.25vw',
            cursor: 'pointer',
            backgroundColor: checked ? '#3457DC' : 'transparent',
            border: checked ? '1px solid #3457DC' : '1px solid #373735',
            borderRadius: '0.3vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
        }}
    >
        {checked && (
            <svg style={{ width: '1vw', height: '1vw' }} viewBox="0 0 16 16" fill="white">
                <path d="M6.222 10.6127L3.60933 8C3.48432 7.87502 3.31478 7.80481 3.138 7.80481C2.96122 7.80481 2.79169 7.87502 2.66667 8C2.54169 8.12502 2.47148 8.29456 2.47148 8.47133C2.47148 8.64811 2.54169 8.81765 2.66667 8.94267L5.27933 11.5553C5.40315 11.6792 5.55016 11.7775 5.71196 11.8445C5.87377 11.9115 6.04719 11.946 6.22233 11.946C6.39747 11.946 6.5709 11.9115 6.7327 11.8445C6.89451 11.7775 7.04152 11.6792 7.16533 11.5553L13.3333 5.38733C13.4583 5.26231 13.5285 5.09278 13.5285 4.916C13.5285 4.73922 13.4583 4.56968 13.3333 4.44467C13.2083 4.31969 13.0388 4.24948 12.862 4.24948C12.6852 4.24948 12.5157 4.31969 12.3907 4.44467L6.222 10.6127Z" />
            </svg>
        )}
    </div>
);

const Tab = ({ label, isActive, onClick }) => {
    return (
        <div
            className="flex flex-col items-center justify-center cursor-pointer min-w-[120px] relative"
            onClick={onClick}
        >
            <div className="flex flex-col items-center w-fit relative" style={{ gap: '8px' }}>
                <p className={`font-['Poppins:Bold',sans-serif] font-bold leading-[normal] not-italic text-[16px] whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#3457dc] scale-105' : 'text-[#a5a5b2] hover:text-[#f5f5f5]'}`}>
                    {label}
                </p>

                {isActive && (
                    <motion.div
                        layoutId="activeUnderlinePubs"
                        initial={false}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35
                        }}
                        className="absolute bg-[#3457dc] h-[2px] rounded-[400px] w-full"
                        style={{
                            bottom: -10,
                            left: 0,
                            right: 0,
                            boxShadow: '0 0 8px rgba(52,87,220,0.4)'
                        }}
                    />
                )}
            </div>
        </div>
    );
};

const ResearchPaperCard = ({ title, authors, year, journal, description, tags }) => {
    return (
        <div style={{
            backgroundColor: '#151519',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '1.2vw',
            padding: '2.5vh 1.8vw',
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5vh',
            transition: 'all 0.3s ease',
            cursor: 'default'
        }}>
            {/* Header: Title and Link Icon */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <h3 style={{
                    margin: 0,
                    fontSize: '1.1vw',
                    fontWeight: 700,
                    color: '#f5f5f5',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '1.4',
                    maxWidth: '85%'
                }}>
                    {title}
                </h3>
                <a href="#" style={{ transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = 0.7} onMouseOut={e => e.currentTarget.style.opacity = 1}>
                    <img src={LinkIcon} alt="link" style={{ width: '1.2vw' }} />
                </a>
            </div>

            {/* Sub-header: Authors and Year */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2vw' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw' }}>
                    <img src={UsersIcon} alt="authors" style={{ width: '0.9vw' }} />
                    <span style={{ fontSize: '0.85vw', color: '#7b829d', fontFamily: 'Inter, sans-serif' }}>
                        {authors}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw' }}>
                    <img src={CalendarSquareIcon} alt="year" style={{ width: '0.8vw' }} />
                    <span style={{ fontSize: '0.85vw', color: '#7b829d', fontFamily: 'Inter, sans-serif' }}>
                        {year}
                    </span>
                </div>
            </div>

            {/* Journal Info */}
            <div style={{ fontSize: '0.95vw', color: '#7b829d', fontFamily: 'Inter, sans-serif' }}>
                {journal}
            </div>

            {/* Description */}
            <p style={{
                margin: 0,
                fontSize: '0.9vw',
                color: 'rgba(123, 130, 157, 0.7)',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.6',
                maxWidth: '95%'
            }}>
                {description}
            </p>

            {/* Tags / Categories */}
            <div style={{ display: 'flex', gap: '0.8vw', marginTop: '0.5vh' }}>
                {tags.map((tag, idx) => (
                    <div key={idx} style={{
                        backgroundColor: 'rgba(57, 94, 213, 0.1)',
                        padding: '0.6vh 1vw',
                        borderRadius: '100px',
                        color: '#3457DC',
                        fontSize: '0.75vw',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif'
                    }}>
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    );
};

const TeamPublicationContent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isPaginationDropdownOpen, setIsPaginationDropdownOpen] = useState(false);
    const totalPages = 12;
    const isAr = false;

    // Search and Dropdown States
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedSort, setSelectedSort] = useState('sort by recent');
    const [selectedCategory, setSelectedCategory] = useState('Categorie');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const publications = [
        {
            title: "Attention Mechanisms in Hierarchical Cognitive Architectures for Multi-Agent Reasoning",
            authors: "A. Benali, S. Mansouri, Y. Kaddour",
            year: "2024",
            journal: "IEEE Transactions on Neural Networks and Learning Systems",
            description: "We propose a hierarchical attention-based cognitive architecture that enables multi-agent systems to perform coordinated reasoning tasks with significantly improved accuracy and convergence rates.",
            tags: ["Vision-Machine Intelligence", "Multi-Agent Systems"]
        },
        {
            title: "Dynamic Resource Allocation in Distributed Cloud Networks using Deep Reinforcement Learning",
            authors: "M. Zahra, K. Omar",
            year: "2023",
            journal: "Journal of Network and Computer Applications",
            description: "This paper explores the integration of DRL for managing network resources in real-time, focusing on latency reduction and energy efficiency in large-scale deployments.",
            tags: ["Deep Learning", "Cloud Computing"]
        }
    ];

    const filteredPublications = publications.filter(pub =>
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const dropdownMenuStyle = {
        position: 'absolute', top: '100%', left: 0, right: 0,
        backgroundColor: '#1e1e24', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px', marginTop: '8px', zIndex: 100,
        padding: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)',
        display: 'flex', flexDirection: 'column', gap: '4px'
    };

    const dropdownItemStyle = (isActive) => ({
        padding: '8px 12px', cursor: 'pointer', fontSize: '13px',
        borderRadius: '8px', color: isActive ? '#fff' : '#a5a5b2',
        backgroundColor: isActive ? '#3457DC' : 'transparent',
        transition: '0.2s'
    });

    return (
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header / Filter Bar - No Background */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                width: '100%',
                padding: '0 0 10px 0'
            }}>
                {/* Full Width Search Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '9px 16px',
                    border: '1px solid #1e1d22',
                    borderRadius: '16px',
                    backgroundColor: '#1e1e24',
                    flex: 2
                }}>
                    <input
                        type="text"
                        placeholder="/ Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#f0f0f2',
                            fontSize: '14px',
                            width: '100%'
                        }}
                    />
                    <img src={SearchIcon} alt="Search" style={{ width: '18px', height: '18px' }} />
                </div>

                {/* Flexible Filters Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 3 }} ref={dropdownRef}>
                    {/* Sort Dropdown */}
                    <div
                        onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '8px',
                            padding: '9px 16px',
                            border: '1px solid #1e1d22',
                            borderRadius: '16px',
                            backgroundColor: '#1e1e24',
                            cursor: 'pointer',
                            flex: 1
                        }}>
                        <span style={{ fontSize: '14px', color: '#f0f0f2' }}>{selectedSort}</span>
                        <img src={DropdownIcon} alt="arrow" style={{ width: '14px', height: '14px', transform: activeDropdown === 'sort' ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                        {activeDropdown === 'sort' && (
                            <div style={dropdownMenuStyle}>
                                {['sort by recent', 'sort by oldest'].map(opt => (
                                    <div
                                        key={opt}
                                        style={dropdownItemStyle(selectedSort === opt)}
                                        onClick={(e) => { e.stopPropagation(); setSelectedSort(opt); setActiveDropdown(null); }}
                                        onMouseOver={(e) => { if (selectedSort !== opt) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)' }}
                                        onMouseOut={(e) => { if (selectedSort !== opt) e.currentTarget.style.backgroundColor = 'transparent' }}
                                    >
                                        {opt}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Status Dropdown */}
                    <div
                        onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '8px',
                            padding: '9px 16px',
                            border: '1px solid #1e1d22',
                            borderRadius: '16px',
                            backgroundColor: '#1e1e24',
                            cursor: 'pointer',
                            flex: 1
                        }}>
                        <span style={{ fontSize: '14px', color: '#f0f0f2' }}>{selectedCategory === 'Categorie' ? 'Categorie' : selectedCategory}</span>
                        <img src={DropdownIcon} alt="arrow" style={{ width: '14px', height: '14px', transform: activeDropdown === 'category' ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                        {activeDropdown === 'category' && (
                            <div style={dropdownMenuStyle}>
                                {['All', 'AI & Vision', 'Networks', 'Embedded Systems'].map(opt => (
                                    <div
                                        key={opt}
                                        style={dropdownItemStyle(selectedCategory === opt)}
                                        onClick={(e) => { e.stopPropagation(); setSelectedCategory(opt); setActiveDropdown(null); }}
                                        onMouseOver={(e) => { if (selectedCategory !== opt) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)' }}
                                        onMouseOut={(e) => { if (selectedCategory !== opt) e.currentTarget.style.backgroundColor = 'transparent' }}
                                    >
                                        {opt}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Request Research */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        padding: '9px 16px',
                        border: '1px solid #1e1d22',
                        borderRadius: '16px',
                        backgroundColor: '#1e1e24',
                        cursor: 'pointer',
                        flex: 1.5
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px', color: '#f0f0f2' }}>Request a Research?</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Publications List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {filteredPublications.map((pub, idx) => (
                    <ResearchPaperCard key={idx} {...pub} />
                ))}
            </div>

            {/* Footer Section (Pagination) */}
            <div className="report-pagination" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '4vh', flexDirection: isAr ? 'row-reverse' : 'row' }}>
                <button
                    className="report-pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{
                        width: '2.4vw', height: '2.4vw',
                        backgroundColor: currentPage === 1 ? '#1e1e24' : '#3457DC',
                        border: 'none', borderRadius: '50%',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: currentPage === 1 ? 0.5 : 1
                    }}
                >
                    <svg width="0.45vw" height="0.95vw" viewBox="0 0 7 13" fill="none" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}>
                        <path d="M6.5 12L1.5 6.5L6.5 1" stroke={currentPage === 1 ? '#717177' : '#F7F7F7'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="pagination-counts-box" style={{ display: 'flex', alignItems: 'center', gap: '0.7vw', flexDirection: 'row' }}>
                    <div className="pagination-current-page-box" style={{ border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1vh 0.6vw', backgroundColor: 'rgba(255,255,255,0.01)', minWidth: '2.5vw', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.9vw', color: '#ffffff' }}>{currentPage}</span>
                    </div>
                    <span style={{ fontSize: '0.95vw', color: '#80808a' }}>of {totalPages}</span>
                </div>

                <button
                    className="report-pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    style={{
                        width: '2.4vw', height: '2.4vw',
                        backgroundColor: currentPage === totalPages ? '#1e1e24' : '#3457DC',
                        border: 'none', borderRadius: '50%',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: currentPage === totalPages ? 0.5 : 1
                    }}
                >
                    <svg width="0.45vw" height="0.95vw" viewBox="0 0 7 13" fill="none" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}>
                        <path d="M1 12L6 6.5L1 1" stroke={currentPage === totalPages ? '#717177' : '#F7F7F7'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const ToolbarButton = ({ icon: Icon, active = false, onClick }) => (
    <div className="content-stretch flex items-start relative shrink-0">
        <div
            onClick={(e) => { e.preventDefault(); onClick?.(); }}
            className={`content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition-all ${active ? 'bg-white/10' : 'hover:bg-white/10'}`}
        >
            <div className="overflow-clip relative shrink-0 w-[20px] h-[20px] flex items-center justify-center">
                <Icon size={16} color="white" />
            </div>
        </div>
    </div>
);

const PortalMenu = ({ children, triggerRect, onClose, width = 'w-[140px]' }) => {
    if (!triggerRect) return null;
    return createPortal(
        <>
            <div className="fixed inset-0 z-[999]" onClick={onClose} />
            <div
                className={`absolute z-[1000] bg-[#1E1E24] border border-white/10 rounded-xl shadow-2xl py-1.5 transition-all animate-in fade-in zoom-in-95 duration-100 ${width}`}
                style={{ top: triggerRect.bottom + window.scrollY + 6, left: triggerRect.left + window.scrollX }}
            >
                {children}
            </div>
        </>,
        document.body
    );
};

const PortalTooltip = ({ text, triggerRect }) => {
    if (!triggerRect) return null;
    return createPortal(
        <div
            className="absolute z-[1001] pointer-events-none transition-all animate-in fade-in zoom-in-95 duration-100"
            style={{ top: triggerRect.bottom + window.scrollY + 6, left: triggerRect.left + window.scrollX + (triggerRect.width / 2), transform: 'translateX(-50%)' }}
        >
            <div className="bg-[#322F35] text-white text-[11px] px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-2xl relative border border-white/5">
                {text}
            </div>
        </div>,
        document.body
    );
};

const PublicationEditor = ({ langTab, setLangTab, lastUpdated, isDraft, lastDraftAt, content, setContent, onImport }) => {
    const editorRef = useRef(null);
    const typeBtnRef = useRef(null);
    const alignBtnRef = useRef(null);
    const importBtnRef = useRef(null);
    const fileInputRef = useRef(null);

    const [typeMenuRect, setTypeMenuRect] = useState(null);
    const [alignMenuRect, setAlignMenuRect] = useState(null);
    const [importTipRect, setImportTipRect] = useState(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== content) {
            editorRef.current.innerHTML = content;
        }
    }, [content]);

    const handleAction = (cmd, val = "") => {
        document.execCommand(cmd, false, val);
        if (editorRef.current) setContent(editorRef.current.innerHTML);
    };

    const toggleTypeMenu = () => setTypeMenuRect(typeMenuRect ? null : typeBtnRef.current?.getBoundingClientRect() || null);
    const toggleAlignMenu = () => setAlignMenuRect(alignMenuRect ? null : alignBtnRef.current?.getBoundingClientRect() || null);
    const triggerImageUpload = () => fileInputRef.current?.click();

    const handleImageFile = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => handleAction("insertImage", event.target?.result);
            reader.readAsDataURL(file);
        }
        e.target.value = "";
    };

    return (
        <div className="bg-[#151519] relative rounded-[16px] shrink-0 w-full" style={{ border: '1px solid #1e1d22' }}>
            <div className="content-stretch flex flex-col gap-[32px] items-start p-[24px] relative size-full">
                {/* Header (Tabs + Info) */}
                <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[24px] items-start relative shrink-0">
                        <div onClick={() => setLangTab('en')} className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 cursor-pointer">
                            <p className={`font-['Poppins',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] whitespace-nowrap ${langTab === 'en' ? 'text-[#3457dc]' : 'text-[#a5a5b2]'}`}>English Content</p>
                            <div className={`h-[2px] rounded-[400px] shrink-0 w-full ${langTab === 'en' ? 'bg-[#3457dc]' : 'opacity-0'}`} />
                        </div>
                        <div onClick={() => setLangTab('ar')} className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 cursor-pointer">
                            <p className={`font-['Poppins',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] whitespace-nowrap ${langTab === 'ar' ? 'text-[#3457dc]' : 'text-[#a5a5b2]'}`}>Arabic Content</p>
                            <div className={`h-[2px] rounded-[400px] shrink-0 w-full ${langTab === 'ar' ? 'bg-[#3457dc]' : 'opacity-0'}`} />
                        </div>
                    </div>
                    {/* Last Updated info */}
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                        <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                            <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
                                <RiRefreshLine size={16} color="#A5A5B2" />
                                <p className="font-['Poppins',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#a5a5b2] text-[14px] whitespace-nowrap">
                                    {lastUpdated ? `Last updated: ${lastUpdated}` : 'No published version yet'}
                                </p>
                            </div>
                            <div className="flex h-[16px] items-center justify-center relative shrink-0 w-0">
                                <div className="flex-none rotate-90">
                                    <div className="h-0 relative w-[16px]">
                                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                                            <line opacity="0.4" stroke="#262626" x2="16" y1="-0.5" y2="-0.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className={`content-stretch flex gap-[12px] items-center shrink-0 ${isDraft ? 'opacity-100' : 'opacity-0'}`}>
                                <RiErrorWarningLine size={16} color="#FCC841" />
                                <p className="font-['Poppins',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#a5a5b2] text-[14px] whitespace-nowrap">
                                    Draft Saved on : {lastDraftAt || 'Sept 19, 2025'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editor Container */}
                <div className="relative rounded-[6px] shrink-0 w-full">
                    <div className="content-stretch flex flex-col isolate items-start overflow-clip relative rounded-[inherit] size-full">
                        {/* Toolbar */}
                        <div className="bg-[#1e1e24] relative shrink-0 w-full z-[2]">
                            <div className="content-stretch flex items-start justify-between py-[8px] px-[12px] relative size-full">
                                <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                                    {/* History */}
                                    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 border-r border-[#2a2a30] pr-[8px]">
                                        <ToolbarButton icon={RiArrowGoBackLine} onClick={() => handleAction("undo")} />
                                        <ToolbarButton icon={RiArrowGoForwardLine} onClick={() => handleAction("redo")} />
                                    </div>

                                    {/* Text Type Dropdown */}
                                    <div className="content-stretch flex items-start relative shrink-0 border-r border-[#2a2a30] pr-[8px]">
                                        <button ref={typeBtnRef} type="button" onClick={toggleTypeMenu} className="content-stretch flex gap-[2px] h-[28px] items-center justify-center pl-[8px] pr-[8px] relative rounded-[4px] shrink-0 hover:bg-white/10 transition-all">
                                            <p className="font-normal leading-[1.4] relative shrink-0 text-[14px] text-white whitespace-nowrap pr-[4px]">Normal text</p>
                                            <RiArrowRightSLine size={16} className={`${typeMenuRect ? "rotate-90" : "rotate-0"} transition-transform text-white`} />
                                        </button>
                                        <PortalMenu triggerRect={typeMenuRect} onClose={() => setTypeMenuRect(null)} width="w-[135px]">
                                            {[
                                                { id: 'p', label: 'Normal text' }, { id: 'p', label: 'Paragraph' },
                                                { id: 'h1', label: 'Heading 1' }, { id: 'h2', label: 'Heading 2' },
                                                { id: 'h3', label: 'Heading 3' }, { id: 'h4', label: 'Heading 4' },
                                                { id: 'h5', label: 'Heading 5' }, { id: 'h6', label: 'Heading 6' },
                                                { id: 'blockquote', label: 'Quote' }
                                            ].map(item => (
                                                <button key={item.id} onClick={() => { handleAction("formatBlock", item.id); setTypeMenuRect(null); }} className="w-full text-left px-4 py-2 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-all">{item.label}</button>
                                            ))}
                                        </PortalMenu>
                                    </div>

                                    {/* Text Align Dropdown */}
                                    <div className="content-stretch flex items-start relative shrink-0 border-r border-[#2a2a30] pr-[8px]">
                                        <button ref={alignBtnRef} type="button" onClick={toggleAlignMenu} className="content-stretch flex gap-[4px] h-[28px] items-center justify-center pl-[8px] pr-[8px] relative rounded-[4px] shrink-0 hover:bg-white/10 transition-all">
                                            <RiAlignLeft size={16} color="white" />
                                            <RiArrowRightSLine size={16} className={`${alignMenuRect ? "rotate-90" : "rotate-0"} transition-transform text-white`} />
                                        </button>
                                        <PortalMenu triggerRect={alignMenuRect} onClose={() => setAlignMenuRect(null)} width="w-[125px]">
                                            {[{ id: 'justifyLeft', label: 'Align Left' }, { id: 'justifyCenter', label: 'Align Center' }, { id: 'justifyRight', label: 'Align Right' }, { id: 'justifyFull', label: 'Justify' }].map(opt => (
                                                <button key={opt.id} onClick={() => { handleAction(opt.id); setAlignMenuRect(null); }} className="w-full text-left px-4 py-2 text-[12px] text-white/60 hover:text-white hover:bg-white/5 transition-all">{opt.label}</button>
                                            ))}
                                        </PortalMenu>
                                    </div>

                                    {/* Color Picker */}
                                    <div className="content-stretch flex items-start relative shrink-0 border-r border-[#2a2a30] pr-[8px]">
                                        <div className="content-stretch flex gap-[4px] h-[28px] items-center justify-center pl-[8px] pr-[4px] relative rounded-[4px] shrink-0 hover:bg-white/10 transition-all cursor-pointer">
                                            <input type="color" className="w-[18px] h-[18px] rounded border border-white/20 cursor-pointer bg-transparent outline-none p-0 flex shrink-0" onChange={(e) => handleAction("foreColor", e.target.value)} defaultValue="#ffffff" />
                                            <RiArrowRightSLine size={16} className="text-white" />
                                        </div>
                                    </div>

                                    {/* Format */}
                                    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 border-r border-[#2a2a30] pr-[8px]">
                                        <ToolbarButton icon={RiBold} onClick={() => handleAction("bold")} />
                                        <ToolbarButton icon={RiItalic} onClick={() => handleAction("italic")} />
                                        <ToolbarButton icon={RiUnderline} onClick={() => handleAction("underline")} />
                                        <ToolbarButton icon={RiStrikethrough} onClick={() => handleAction("strikeThrough")} />
                                        <ToolbarButton icon={RiCodeSSlashLine} onClick={() => handleAction("formatBlock", "pre")} />
                                        <ToolbarButton icon={RiFormatClear} onClick={() => handleAction("removeFormat")} />
                                    </div>

                                    {/* List Option */}
                                    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 border-r border-[#2a2a30] pr-[8px]">
                                        <ToolbarButton icon={RiListUnordered} onClick={() => handleAction("insertUnorderedList")} />
                                        <ToolbarButton icon={RiListOrdered} onClick={() => handleAction("insertOrderedList")} />
                                    </div>

                                    {/* Etc */}
                                    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
                                        <ToolbarButton icon={RiLinksLine} onClick={() => handleAction("createLink", prompt('Enter URL:') || "")} />
                                        <ToolbarButton icon={RiImageLine} onClick={triggerImageUpload} />
                                        <ToolbarButton icon={RiCodeView} onClick={() => handleAction("formatBlock", "pre")} />
                                        <ToolbarButton icon={RiDoubleQuotesL} onClick={() => handleAction("formatBlock", "blockquote")} />
                                        <ToolbarButton icon={RiSeparator} onClick={() => handleAction("insertHorizontalRule")} />
                                    </div>
                                </div>

                                {/* Import Button */}
                                <div onClick={onImport} className="bg-[#2a2a30] content-stretch flex gap-[10px] items-center justify-center px-[16px] h-[36px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-white/10 transition-colors">
                                    <p className="font-['Poppins',sans-serif] font-medium leading-[normal] text-[13px] text-white whitespace-nowrap">Import from Word</p>
                                    <img src={wordIcon} alt="word" style={{ width: '16px' }} />
                                </div>
                            </div>
                        </div>

                        {/* Editor Canvas */}
                        <div className="relative shrink-0 w-full z-[1]">
                            <div className="overflow-x-clip py-[12px] overflow-y-auto w-full">
                                <div
                                    ref={editorRef}
                                    contentEditable
                                    onInput={(e) => setContent(e.currentTarget.innerHTML)}
                                    dir={langTab === 'ar' ? 'rtl' : 'ltr'}
                                    className="w-full bg-[#151519] px-[16px] pb-[16px] text-[14px] text-white leading-[1.6] outline-none min-h-[300px] editor-canvas"
                                    style={{ fontFamily: "'Noto Sans', sans-serif" }}
                                />
                            </div>
                        </div>
                    </div>
                    <div aria-hidden="true" className="absolute border border-[#2a2a30] border-solid inset-0 pointer-events-none rounded-[6px]" />
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                .editor-canvas h1 { font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; color: #fff; line-height: 1.2; }
                .editor-canvas h2 { font-size: 1.875rem; font-weight: 700; margin-bottom: 1.25rem; color: #fff; line-height: 1.3; }
                .editor-canvas h3 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #fff; line-height: 1.4; }
                .editor-canvas h4 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #fff; }
                .editor-canvas h5 { font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; color: #fff; }
                .editor-canvas h6 { font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; color: #fff; }
                .editor-canvas p { margin-bottom: 1rem; }
                .editor-canvas blockquote { border-left: 4px solid #3457DC; padding-left: 1.5rem; margin: 1.5rem 0; font-style: italic; color: rgba(255,255,255,0.6); }
                .editor-canvas ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
                .editor-canvas ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
                .editor-canvas li { margin-bottom: 0.25rem; }
                .editor-canvas a { color: #3457DC; text-decoration: underline; }
                .editor-canvas img { max-width: 100%; border-radius: 8px; margin: 1rem 0; }
                .editor-canvas hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 2rem 0; }
            `}} />
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
        </div>
    );
};

const AddPublicationContent = () => {
    const [langTab, setLangTab] = useState('en');
    const [content, setContent] = useState('');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4vh', marginTop: '4vh', width: '100%' }}>


            <PublicationEditor
                langTab={langTab}
                setLangTab={setLangTab}
                content={content}
                setContent={setContent}
                onImport={() => {
                    const el = document.createElement("input");
                    el.type = "file";
                    el.accept = ".doc,.docx,.pdf";
                    el.click();
                }}
            />

            {/* Additional Form Section (Add details) */}
            <div style={{
                backgroundColor: '#151519',
                borderRadius: '1.2vw',
                width: '100%',
                padding: '3vh 1.5vw',
                border: '1px solid #1e1d22',
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5vh',
                marginTop: '1vh'
            }}>
                <h2 style={{ fontSize: '1.1vw', fontWeight: 800, color: '#ffffff', fontFamily: 'Gilroy, Poppins, sans-serif', margin: 0 }}>
                    Add details
                </h2>

                {/* Title & Description */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                        <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Title</label>
                        <input
                            placeholder="nature article"
                            defaultValue="nature article"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', outline: 'none', transition: 'border-color 0.2s ease', width: '100%'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                        <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Description</label>
                        <input
                            placeholder="nature article"
                            defaultValue="nature article"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', outline: 'none', transition: 'border-color 0.2s ease', width: '100%'
                            }}
                        />
                    </div>
                </div>

                {/* Field Selection */}
                <div style={{ display: 'flex', gap: '2vw' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                        <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Field</label>
                        <div style={{ position: 'relative' }}>
                            <select
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', outline: 'none', width: '100%', appearance: 'none', cursor: 'pointer'
                                }}
                                defaultValue="Science"
                            >
                                <option value="Science" style={{ backgroundColor: '#151519' }}>Science</option>
                            </select>
                            <img src={DropdownIcon} alt="dropdown" style={{ position: 'absolute', right: '1.2vw', top: '50%', transform: 'translateY(-50%)', width: '1.2vw', pointerEvents: 'none' }} />
                        </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                        <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>2nd Field (optional)</label>
                        <div style={{ position: 'relative' }}>
                            <select
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', outline: 'none', width: '100%', appearance: 'none', cursor: 'pointer'
                                }}
                                defaultValue="Nature"
                            >
                                <option value="Nature" style={{ backgroundColor: '#151519' }}>Nature</option>
                            </select>
                            <img src={DropdownIcon} alt="dropdown" style={{ position: 'absolute', right: '1.2vw', top: '50%', transform: 'translateY(-50%)', width: '1.2vw', pointerEvents: 'none' }} />
                        </div>
                    </div>
                </div>

                {/* Contribution */}
                <div style={{ marginTop: '1vh' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', marginBottom: '1.5vh' }}>
                        <span style={{ color: '#ffffff', fontSize: '1vw' }}>•</span>
                        <h3 style={{ fontSize: '0.95vw', fontWeight: 700, color: '#ffffff', margin: 0 }}>Contribution</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '2vw' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                            <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Members</label>
                            <div style={{
                                backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.2vh 4vw 1.2vh 1.2vw', display: 'flex', alignItems: 'center', position: 'relative'
                            }}>
                                <span style={{ color: '#80808a', fontSize: '0.9vw', marginRight: '1vw' }}>Members</span>
                                <div style={{ width: '1px', height: '2vh', backgroundColor: '#2a2a30', marginRight: '1vw' }}></div>
                                <input
                                    defaultValue="walid & serine"
                                    style={{
                                        background: 'transparent', border: 'none', color: '#ffffff', fontSize: '0.9vw', outline: 'none', width: '100%'
                                    }}
                                />
                                <div style={{ position: 'absolute', right: '0.8vw', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '4px' }}>
                                    <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M5.83333 9.16667C5.61232 9.16667 5.40036 9.25446 5.24408 9.41074C5.0878 9.56703 5 9.77899 5 10C5 10.221 5.0878 10.433 5.24408 10.5893C5.40036 10.7455 5.61232 10.8333 5.83333 10.8333H14.1667C14.3877 10.8333 14.5996 10.7455 14.7559 10.5893C14.9122 10.433 15 10.221 15 10C15 9.77899 14.9122 9.56703 14.7559 9.41074C14.5996 9.25446 14.3877 9.16667 14.1667 9.16667H5.83333Z" fill="#373735" />
                                        </svg>
                                    </div>
                                    <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M14.1667 9.16667H10.8333V5.83333C10.8333 5.61232 10.7455 5.40036 10.5893 5.24408C10.433 5.0878 10.221 5 10 5C9.77899 5 9.56702 5.0878 9.41074 5.24408C9.25446 5.40036 9.16667 5.61232 9.16667 5.83333V9.16667H5.83333C5.61232 9.16667 5.40036 9.25446 5.24408 9.41074C5.0878 9.56702 5 9.77899 5 10C5 10.221 5.0878 10.433 5.24408 10.5893C5.40036 10.7455 5.61232 10.8333 5.83333 10.8333H9.16667V14.1667C9.16667 14.3877 9.25446 14.5996 9.41074 14.7559C9.56702 14.9122 9.77899 15 10 15C10.221 15 10.433 14.9122 10.5893 14.7559C10.7455 14.5996 10.8333 14.3877 10.8333 14.1667V10.8333H14.1667C14.3877 10.8333 14.5996 10.7455 14.7559 10.5893C14.9122 10.433 15 10.221 15 10C15 9.77899 14.9122 9.56702 14.7559 9.41074C14.5996 9.25446 14.3877 9.16667 14.1667 9.16667Z" fill="#3457DC" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                            <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Project info</label>
                            <div style={{
                                backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.2vh 1.2vw', display: 'flex', alignItems: 'center'
                            }}>
                                <span style={{ color: '#80808a', fontSize: '0.9vw', marginRight: '1vw' }}>Name</span>
                                <div style={{ width: '1px', height: '2vh', backgroundColor: '#2a2a30', marginRight: '1vw' }}></div>
                                <input
                                    defaultValue="Project1"
                                    style={{
                                        background: 'transparent', border: 'none', color: '#ffffff', fontSize: '0.9vw', outline: 'none', width: '100%'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* File Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh', marginTop: '1vh' }}>
                    <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>File Name</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            defaultValue="MyPublication.Pdf"
                            readOnly
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 5vw 1.5vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', outline: 'none', width: '100%'
                            }}
                        />
                        <div style={{ position: 'absolute', right: '1.2vw', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                            {/* Trash Icon */}
                            <div style={{ position: 'relative', flexShrink: 0, width: '20px', height: '20px', cursor: 'pointer' }}>
                                <svg style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                    <g>
                                        <path d="M17.5001 3.33333H14.9167C14.7233 2.39284 14.2116 1.54779 13.4678 0.940598C12.724 0.333408 11.7936 0.0012121 10.8334 0L9.16675 0C8.20658 0.0012121 7.27618 0.333408 6.53237 0.940598C5.78857 1.54779 5.27683 2.39284 5.08341 3.33333H2.50008C2.27907 3.33333 2.06711 3.42113 1.91083 3.57741C1.75455 3.73369 1.66675 3.94565 1.66675 4.16667C1.66675 4.38768 1.75455 4.59964 1.91083 4.75592C2.06711 4.9122 2.27907 5 2.50008 5H3.33341V15.8333C3.33474 16.938 3.77415 17.997 4.55526 18.7782C5.33638 19.5593 6.39542 19.9987 7.50008 20H12.5001C13.6047 19.9987 14.6638 19.5593 15.4449 18.7782C16.226 17.997 16.6654 16.938 16.6667 15.8333V5H17.5001C17.7211 5 17.9331 4.9122 18.0893 4.75592C18.2456 4.59964 18.3334 4.38768 18.3334 4.16667C18.3334 3.94565 18.2456 3.73369 18.0893 3.57741C17.9331 3.42113 17.7211 3.33333 17.5001 3.33333ZM9.16675 1.66667H10.8334C11.3503 1.6673 11.8544 1.82781 12.2764 2.1262C12.6985 2.42459 13.0179 2.84624 13.1909 3.33333H6.80925C6.98223 2.84624 7.30167 2.42459 7.72374 2.1262C8.14581 1.82781 8.64985 1.6673 9.16675 1.66667ZM15.0001 15.8333C15.0001 16.4964 14.7367 17.1323 14.2678 17.6011C13.799 18.0699 13.1631 18.3333 12.5001 18.3333H7.50008C6.83704 18.3333 6.20116 18.0699 5.73231 17.6011C5.26347 17.1323 5.00008 16.4964 5.00008 15.8333V5H15.0001V15.8333Z" fill="#C5432D" />
                                        <path d="M8.33333 14.9999C8.55435 14.9999 8.76631 14.9121 8.92259 14.7558C9.07887 14.5996 9.16667 14.3876 9.16667 14.1666V9.16659C9.16667 8.94557 9.07887 8.73361 8.92259 8.57733C8.76631 8.42105 8.55435 8.33325 8.33333 8.33325C8.11232 8.33325 7.90036 8.42105 7.74408 8.57733C7.5878 8.73361 7.5 8.94557 7.5 9.16659V14.1666C7.5 14.3876 7.5878 14.5996 7.74408 14.7558C7.90036 14.9121 8.11232 14.9999 8.33333 14.9999Z" fill="#C5432D" />
                                        <path d="M11.6666 14.9999C11.8876 14.9999 12.0996 14.9121 12.2558 14.7558C12.4121 14.5996 12.4999 14.3876 12.4999 14.1666V9.16659C12.4999 8.94557 12.4121 8.73361 12.2558 8.57733C12.0996 8.42105 11.8876 8.33325 11.6666 8.33325C11.4456 8.33325 11.2336 8.42105 11.0773 8.57733C10.921 8.73361 10.8333 8.94557 10.8333 9.16659V14.1666C10.8333 14.3876 10.921 14.5996 11.0773 14.7558C11.2336 14.9121 11.4456 14.9999 11.6666 14.9999Z" fill="#C5432D" />
                                    </g>
                                </svg>
                            </div>
                            {/* Edit Icon */}
                            <div style={{ position: 'relative', flexShrink: 0, width: '20px', height: '20px', cursor: 'pointer' }}>
                                <svg style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                    <g>
                                        <path d="M15.5468 0.774979L5.38676 10.935C4.99872 11.3209 4.69108 11.78 4.48167 12.2857C4.27225 12.7913 4.16522 13.3335 4.16676 13.8808V15C4.16676 15.221 4.25456 15.433 4.41084 15.5892C4.56712 15.7455 4.77908 15.8333 5.0001 15.8333H6.11926C6.66657 15.8349 7.20874 15.7278 7.7144 15.5184C8.22005 15.309 8.67914 15.0014 9.0651 14.6133L19.2251 4.45331C19.7121 3.96512 19.9856 3.30371 19.9856 2.61415C19.9856 1.92458 19.7121 1.26317 19.2251 0.774979C18.7298 0.301557 18.0711 0.0373535 17.3859 0.0373535C16.7008 0.0373535 16.042 0.301557 15.5468 0.774979ZM18.0468 3.27498L7.88676 13.435C7.41687 13.902 6.78177 14.1649 6.11926 14.1666H5.83343V13.8808C5.83517 13.2183 6.09807 12.5832 6.5651 12.1133L16.7251 1.95331C16.9031 1.78327 17.1398 1.68839 17.3859 1.68839C17.6321 1.68839 17.8688 1.78327 18.0468 1.95331C18.2217 2.12874 18.32 2.36639 18.32 2.61415C18.32 2.8619 18.2217 3.09955 18.0468 3.27498Z" fill="#3457DC" />
                                        <path d="M19.1667 7.4825C18.9457 7.4825 18.7337 7.5703 18.5774 7.72658C18.4211 7.88286 18.3333 8.09482 18.3333 8.31583V12.5H15C14.337 12.5 13.7011 12.7634 13.2322 13.2322C12.7634 13.7011 12.5 14.337 12.5 15V18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 15.8333 1.66667 15.8333V4.16667C1.66667 3.50363 1.93006 2.86774 2.3989 2.3989C2.86774 1.93006 3.50363 1.66667 4.16667 1.66667H11.7017C11.9227 1.66667 12.1346 1.57887 12.2909 1.42259C12.4472 1.26631 12.535 1.05435 12.535 0.833333C12.535 0.61232 12.4472 0.400358 12.2909 0.244078C12.1346 0.0877974 11.9227 0 11.7017 0L4.16667 0C3.062 0.00132321 2.00296 0.440735 1.22185 1.22185C0.440735 2.00296 0.00132321 3.062 0 4.16667L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H13.6192C14.1666 20.0016 14.7089 19.8945 15.2147 19.6851C15.7205 19.4757 16.1797 19.1681 16.5658 18.78L18.7792 16.565C19.1673 16.1791 19.475 15.72 19.6846 15.2143C19.8941 14.7087 20.0013 14.1665 20 13.6192V8.31583C20 8.09482 19.9122 7.88286 19.7559 7.72658C19.5996 7.5703 19.3877 7.4825 19.1667 7.4825ZM15.3875 17.6017C15.0525 17.9358 14.6289 18.1672 14.1667 18.2683V15C14.1667 14.779 14.2545 14.567 14.4107 14.4107C14.567 14.2545 14.779 14.1667 15 14.1667H18.2708C18.1677 14.6279 17.9367 15.0508 17.6042 15.3867L15.3875 17.6017Z" fill="#3457DC" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <span style={{ fontSize: '0.75vw', color: '#80808a', marginTop: '0.2vh' }}>Accepted formats .doc, .docx, .pdf</span>
                </div>

                {/* Action Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '2vh' }}>
                    <button
                        disabled
                        style={{
                            backgroundColor: '#1e1e24', border: 'none', borderRadius: '1vw', padding: '1.8vh 3vw', color: '#717177', fontSize: '0.9vw', fontWeight: 600, cursor: 'not-allowed', fontFamily: 'Gilroy, Poppins, sans-serif'
                        }}
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
};

const MyPublications = () => {
    const [activeTab, setActiveTab] = useState('Team Publication');
    const [isPublishPopupOpen, setIsPublishPopupOpen] = useState(false);

    return (
        <div className="w-full text-white font-poppins pb-10 animate-in fade-in duration-500">
            {/* Tab Navigation - Exact replica of PhdTracker layout but with refined gap */}
            <div className="flex justify-between items-center pb-[12px] pt-[0px] px-[0px] w-full">
                <div className="flex gap-[24px] items-center">
                    <Tab
                        label="Team Publication"
                        isActive={activeTab === 'Team Publication'}
                        onClick={() => setActiveTab('Team Publication')}
                    />
                    <Tab
                        label="Add Publication"
                        isActive={activeTab === 'Add Publication'}
                        onClick={() => setActiveTab('Add Publication')}
                    />
                </div>
                <button 
                    onClick={() => setIsPublishPopupOpen(true)}
                    className="flex items-center justify-center gap-[6px] bg-[#3457dc] text-white px-[18px] py-[8px] rounded-[12px] hover:bg-[#3457dc]/90 transition-colors"
                >
                    <span className="font-['Poppins',sans-serif] font-medium text-[13px]">publish</span>
                    <img src={PublishIcon} alt="publish" style={{ width: '16px', height: '16px' }} />
                </button>
            </div>

            {/* Content Display */}
            <AnimatePresence mode="wait">
                {activeTab === 'Team Publication' && (
                    <motion.div
                        key="team-pub"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TeamPublicationContent />
                    </motion.div>
                )}
                {activeTab === 'Add Publication' && (
                    <motion.div
                        key="add-pub"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AddPublicationContent />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Publish Popup */}
            <PublishModal 
                isOpen={isPublishPopupOpen} 
                onClose={() => setIsPublishPopupOpen(false)} 
            />

        </div>
    );
};

export default MyPublications;
