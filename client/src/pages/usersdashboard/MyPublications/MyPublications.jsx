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

const ResearchPaperCard = ({ title, authors, year, journal, description, tags, link }) => {
    return (
        <div className="publication-paper-card" style={{
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
            <div className="pub-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <h3 className="pub-card-title" style={{
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
                <a href={link} target="_blank" rel="noopener noreferrer" className="pub-card-link-icon" style={{ transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = 0.7} onMouseOut={e => e.currentTarget.style.opacity = 1}>
                    <img src={LinkIcon} alt="link" style={{ width: '1.2vw' }} />
                </a>
            </div>

            {/* Sub-header: Authors and Year */}
            <div className="pub-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '2vw' }}>
                <div className="pub-card-meta-item" style={{ display: 'flex', alignItems: 'center', gap: '0.6vw' }}>
                    <img src={UsersIcon} alt="authors" style={{ width: '0.9vw' }} />
                    <span style={{ fontSize: '0.85vw', color: '#7b829d', fontFamily: 'Inter, sans-serif' }}>
                        {authors}
                    </span>
                </div>
                <div className="pub-card-meta-item" style={{ display: 'flex', alignItems: 'center', gap: '0.6vw' }}>
                    <img src={CalendarSquareIcon} alt="year" style={{ width: '0.8vw' }} />
                    <span style={{ fontSize: '0.85vw', color: '#7b829d', fontFamily: 'Inter, sans-serif' }}>
                        {year}
                    </span>
                </div>
            </div>

            {/* Journal Info */}
            <div className="pub-card-journal" style={{ fontSize: '0.95vw', color: '#7b829d', fontFamily: 'Inter, sans-serif' }}>
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

    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/publications');
                if (res.ok) {
                    const data = await res.json();
                    setPublications(data);
                }
            } catch (err) {
                console.error("Failed to fetch publications", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPublications();
    }, []);

    const filteredPublications = publications.filter(pub =>
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.some(auth => auth.toLowerCase().includes(searchTerm.toLowerCase())) ||
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
        <div className="publication-team-content" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header / Filter Bar - No Background */}
            <div className="publication-filter-bar" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                width: '100%',
                padding: '0 0 10px 0'
            }}>
                {/* Full Width Search Bar */}
                <div className="publication-search-container" style={{
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
                <div className="publication-dropdown-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 3 }} ref={dropdownRef}>
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
                {isLoading ? (
                    <div style={{ color: '#a5a5b2', textAlign: 'center', padding: '10vh' }}>Loading research papers...</div>
                ) : filteredPublications.length === 0 ? (
                    <div style={{ color: '#a5a5b2', textAlign: 'center', padding: '10vh' }}>No publications found.</div>
                ) : (
                    filteredPublications.map((pub, idx) => (
                        <ResearchPaperCard 
                            key={pub._id || idx} 
                            title={pub.title}
                            authors={pub.authors.join(', ')}
                            year={pub.year}
                            journal={pub.publisher}
                            description={pub.contribution}
                            tags={pub.tags}
                            link={pub.documentUrl ? `http://localhost:5000${pub.documentUrl}` : '#'}
                        />
                    ))
                )}
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

import AddPublicationContent from './AddPublicationContent';

const MyPublications = () => {
    const [activeTab, setActiveTab] = useState('Team Publication');
    const [isPublishPopupOpen, setIsPublishPopupOpen] = useState(false);

    return (
        <div className="publication-main-container w-full text-white font-poppins pb-10 animate-in fade-in duration-500">
            <style dangerouslySetInnerHTML={{ __html: publicationStyles }} />
            {/* Tab Navigation - Exact replica of PhdTracker layout but with refined gap */}
            <div className="publication-tab-nav flex justify-between items-center pb-[12px] pt-[0px] px-[0px] w-full">
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

const publicationStyles = `
@media screen and (max-width: 1024px) {
    .publication-tab-nav {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 16px !important;
        padding-bottom: 24px !important;
    }
    .publication-tab-nav > button {
        width: 100% !important;
        padding: 12px !important;
    }

    .publication-filter-bar {
        flex-direction: column !important;
        gap: 16px !important;
    }
    .publication-search-container, .publication-dropdown-group {
        width: 100% !important;
        flex: none !important;
    }
    .publication-dropdown-group {
        flex-direction: column !important;
    }
    .publication-dropdown-group > div {
        width: 100% !important;
    }

    .publication-paper-card {
        border-radius: 12px !important;
        padding: 24px 20px !important;
        gap: 20px !important;
    }
    .pub-card-title {
        font-size: 16px !important;
    }
    .pub-card-link-icon img {
        width: 20px !important;
    }
    .pub-card-meta {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 12px !important;
    }
    .pub-card-meta-item img {
        width: 16px !important;
    }
    .pub-card-meta-item span {
        font-size: 14px !important;
    }
    .pub-card-journal {
        font-size: 14px !important;
    }
    .publication-paper-card p {
        font-size: 14px !important;
        max-width: 100% !important;
    }
    .publication-paper-card div[style*="backgroundColor: rgba(57, 94, 213, 0.1)"] {
        padding: 6px 12px !important;
        font-size: 12px !important;
    }

    .report-pagination {
        margin-top: 32px !important;
    }
    .report-pagination-btn {
        width: 44px !important;
        height: 44px !important;
    }
    .report-pagination-btn svg {
        width: 10px !important;
        height: 18px !important;
    }
    .pagination-counts-box {
        gap: 12px !important;
    }
    .pagination-current-page-box {
        min-width: 44px !important;
        padding: 10px !important;
        border-radius: 8px !important;
    }
    .pagination-current-page-box span, .pagination-counts-box > span {
        font-size: 14px !important;
    }
}
`;

export default MyPublications;
