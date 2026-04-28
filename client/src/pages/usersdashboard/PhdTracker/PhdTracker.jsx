import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCheckLine, RiArrowRightSLine, RiArrowLeftSLine, RiSearch2Line, RiArrowDownSLine, RiPencilLine, RiDeleteBinLine, RiAddLine, RiSubtractLine } from 'react-icons/ri';

// --- Assets Icons ---
import DropdownIcon from "@/assets/svg/userDashboard/PhdTracker/angle-small-down 1.svg";
import CalendarIcon from "@/assets/svg/userDashboard/PhdTracker/calendar-clock (7) 3.svg";
import SearchIcon from "@/assets/svg/userDashboard/PhdTracker/search-normal.svg";
import DownloadIcon from "@/assets/svg/userDashboard/PhdTracker/Vector.svg";
import InfoIcon from "@/assets/svg/userDashboard/PhdTracker/info (1) 5.svg";
import ForbiddenIcon from "@/assets/svg/userDashboard/PhdTracker/user-forbidden-alt 1.svg";
import ComputerIcon from "@/assets/svg/userDashboard/PhdTracker/computer_(1)_1.svg";
import CongratsIcon from "@/assets/svg/userDashboard/PhdTracker/congrats.svg";

// --- Asset Icons Imports ---
import TeamIcon from "@/assets/svg/userDashboard/Overview/users-alt (7) 1.svg";
import PublicationsIcon from "@/assets/svg/userDashboard/Overview/Vector.svg";
import ProjectsIcon from "@/assets/svg/userDashboard/Overview/Vector-1.svg";
import EngagementIcon from "@/assets/svg/userDashboard/Overview/dashboard (4) 1.svg";
import API_BASE_URL from '@/config';

const StatCard = ({ icon, title, value }) => {
    return (
        <div 
            className="stat-card"
            style={{
            width: '100%',
            backgroundColor: '#151519',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '1.2vw',
            padding: '1vh 1.2vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '20vh',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            cursor: 'default'
        }}>
            {/* Background Glow */}
            <div style={{
                position: 'absolute', top: -1, right: -1, bottom: -1, left: -1,
                background: 'radial-gradient(43.95% 65.1% at 100% 0%, #3457DC 0%, rgba(21,21,25,0) 100%)',
                pointerEvents: 'none', opacity: 0.45, zIndex: 1
            }} />

            {/* Top Part: Icon & Title */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
                <div 
                    className="stat-card-icon-container"
                    style={{
                    width: '2.5vw', height: '2.5vw', minWidth: '35px', minHeight: '35px',
                    backgroundColor: 'rgba(52, 87, 220, 0.12)', borderRadius: '0.7vw',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                }}>
                    <span className="stat-card-icon-wrapper">
                        {icon}
                    </span>
                </div>
                <span 
                    className="stat-card-title-text"
                    style={{
                    fontSize: '0.9vw', fontWeight: 600, color: '#A5A5B2',
                    textTransform: 'capitalize', letterSpacing: '0.01vw', fontFamily: "'Poppins', sans-serif"
                }}>
                    {title}
                </span>
            </div>

            {/* Bottom Part: Value */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginTop: '0.3vh' }}>
                <h3 
                    className="stat-card-value-text"
                    style={{ fontSize: '1.8vw', fontWeight: 500, color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                    {value}
                </h3>
            </div>
        </div>
    );
};

const Tab = ({ label, isActive, onClick }) => {
    return (
        <div
            className="flex flex-col items-center justify-center cursor-pointer min-w-[100px] relative"
            onClick={onClick}
        >
            <div className="flex flex-col items-center w-fit relative" style={{ gap: '8px' }}>
                <p className={`font-['Poppins:Bold',sans-serif] font-bold leading-[normal] not-italic text-[16px] whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#3457dc] scale-105' : 'text-[#a5a5b2] hover:text-[#f5f5f5]'}`}>
                    {label}
                </p>

                {/* Framer Motion Active Underline */}
                {isActive && (
                    <motion.div
                        layoutId="activeUnderline"
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

const ReportsHistoryTable = ({ direction = 'ltr', reportsList, setReportsList }) => {
    const isAr = direction === 'rtl';
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedSort, setSelectedSort] = useState('Newest first');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(2);
    const [isPaginationDropdownOpen, setIsPaginationDropdownOpen] = useState(false);
    const totalPages = 12;

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeDropdown]);

    // بيانات تجريبية للجدول بناءً على طلب المستخدم
    const handleToggleRow = (id) => {
        setReportsList(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    };

    const commonContainerStyle = {
        backgroundColor: '#151519',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '3vh 1.5vw 4vh 1.5vw',
        borderRadius: '1.2vw',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Poppins, sans-serif',
        color: '#fff',
        marginTop: '2vh'
    };

    const filterItemStyle = {
        backgroundColor: '#1e1e24',
        borderRadius: '0.9vw',
        padding: '1.2vh 1.2vw',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6vw',
        border: '1px solid rgba(255,255,255,0.03)',
        cursor: 'pointer',
        minWidth: '9vw'
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Accepted': return { color: '#27bdad', bg: 'rgba(39, 189, 173, 0.1)' };
            case 'Refused': return { color: '#eb5757', bg: 'rgba(235, 87, 87, 0.1)' };
            case 'In Progress': return { color: '#f29339', bg: 'rgba(242, 147, 57, 0.1)' };
            default: return { color: '#fff', bg: 'rgba(255, 255, 255, 0.05)' };
        }
    };

    const categories = ['All', 'Doctorat graduation', 'Engineering graduation'];
    const statuses = ['All', 'Accepted', 'Refused', 'In Progress'];
    const sortOptions = ['Newest first', 'Oldest first'];

    const filteredReports = reportsList.filter(item => {
        const matchesSearch = item.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.university.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.document === selectedCategory;
        const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const dropdownMenuStyle = {
        position: 'absolute', top: '100%', left: 0, right: 0,
        backgroundColor: '#1e1e24', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '0.8vw', marginTop: '0.5vw', zIndex: 100,
        padding: '0.5vw', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)'
    };

    const dropdownItemStyle = (isActive) => ({
        padding: '1vh 0.8vw', cursor: 'pointer', fontSize: '0.8vw',
        borderRadius: '0.5vw', color: isActive ? '#fff' : '#a5a5b2',
        backgroundColor: isActive ? '#3457DC' : 'transparent',
        transition: '0.2s', marginBottom: '2px'
    });

    return (
        <div dir={direction} style={commonContainerStyle}>
            {/* Header Section (Filters & Search) */}
            <div className="tracker-filters-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '3vh' }} ref={dropdownRef}>
                {/* Search Bar */}
                <div 
                    className="tracker-search-container"
                    style={{ ...filterItemStyle, flex: 1, minWidth: '15vw', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #1e1d22', padding: '1.1vh 1.2vw' }}>
                    <input
                        type="text"
                        placeholder="/ Search"
                        style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#f0f0f2', fontSize: '14px' }}
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img src={SearchIcon} alt="search" style={{ width: '1.2vw', height: '1.2vw' }} />
                </div>

                {/* Sort Dropdown */}
                <div 
                    className="tracker-filter-item"
                    style={{ ...filterItemStyle, position: 'relative', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #1e1d22', padding: '1.1vh 1.2vw' }} 
                    onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
                >
                    <span style={{ fontSize: '14px', color: '#f0f0f2', flex: 1 }}>{selectedSort}</span>
                    <img src={DropdownIcon} alt="arrow" style={{ width: '0.8vw', transform: activeDropdown === 'sort' ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                    {activeDropdown === 'sort' && (
                        <div style={dropdownMenuStyle}>
                            {['Newest first', 'Oldest first'].map(opt => (
                                <div key={opt} style={dropdownItemStyle(selectedSort === opt)} onClick={() => { setSelectedSort(opt); setActiveDropdown(null); }}>
                                    {opt}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Status Dropdown */}
                <div 
                    className="tracker-filter-item"
                    style={{ ...filterItemStyle, position: 'relative', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #1e1d22', padding: '1.1vh 1.2vw' }} 
                    onClick={() => setActiveDropdown(activeDropdown === 'status' ? null : 'status')}
                >
                    <span style={{ fontSize: '14px', color: '#f0f0f2', flex: 1 }}>{selectedStatus === 'All' ? 'Status' : selectedStatus}</span>
                    <img src={DropdownIcon} alt="arrow" style={{ width: '0.8vw', transform: activeDropdown === 'status' ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                    {activeDropdown === 'status' && (
                        <div style={dropdownMenuStyle}>
                            {statuses.map(st => (
                                <div key={st} style={dropdownItemStyle(selectedStatus === st)} onClick={() => { setSelectedStatus(st); setActiveDropdown(null); }}>
                                    {st}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Date Picker */}
                <div style={{ ...filterItemStyle, backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #1e1d22', padding: '1.1vh 1.2vw' }}>
                    <span style={{ fontSize: '14px', color: '#f0f0f2', flex: 1 }}>Range date</span>
                    <img src={CalendarIcon} alt="calendar" style={{ width: '16px' }} />
                    <img src={DropdownIcon} alt="arrow" style={{ width: '0.8vw' }} />
                </div>
            </div>

            {/* Table Content */}
            <div className="tracker-table-container" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <th style={{ padding: '1.5vh 0.5vw', width: '3vw' }}></th>
                            <th className="table-header-cell" style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, width: '14vw' }}>Date & Time</th>
                            <th className="table-header-cell" style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, width: '15vw' }}>Document</th>
                            <th className="table-header-cell" style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'left' }}>University</th>
                            <th className="table-header-cell" style={{ padding: '1.5vh 3vw 1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, width: '9vw', textAlign: 'right' }}>Status</th>
                            <th className="table-header-cell" style={{ padding: '1.5vh 4vw 1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReports.map((row) => (
                            <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                <td style={{ padding: '2.8vh 0.5vw' }}>
                                    <div onClick={() => handleToggleRow(row.id)}
                                        style={{ width: '1.1vw', height: '1.1vw', borderRadius: '4px', border: row.checked ? 'none' : '1px solid #2a2a30', backgroundColor: row.checked ? '#3457DC' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                        {row.checked && <RiCheckLine color="white" size="0.8vw" />}
                                    </div>
                                </td>
                                <td className="table-cell-text" style={{ padding: '2.8vh 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{row.dateTime}</td>
                                <td className="table-cell-text" style={{ padding: '2.8vh 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{row.document}</td>
                                <td className="table-cell-text" style={{ padding: '2.8vh 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)', textAlign: 'left' }}>{row.university}</td>
                                <td 
                                    className="table-status-cell"
                                    style={{ padding: '2.8vh 0 2.8vh 6vw', textAlign: 'right' }}>
                                    <span 
                                        className="status-badge"
                                        style={{
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        padding: '1.2vh 0', borderRadius: '100px', width: '7.5vw',
                                        fontSize: '0.8vw', backgroundColor: getStatusStyle(row.status).bg, color: getStatusStyle(row.status).color,
                                        fontWeight: 600
                                    }}>
                                        {row.status}
                                    </span>
                                </td>
                                <td 
                                    className="table-action-cell"
                                    style={{ padding: '2.8vh 1.5vw 2.8vh 0.5vw', textAlign: 'right' }}>
                                    <a
                                        className="download-link"
                                        href={row.fileUrl ? `${API_BASE_URL}${row.fileUrl}` : '#'}
                                        download
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ backgroundColor: 'transparent', border: 'none', cursor: row.fileUrl ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '0.55vw', justifyContent: 'flex-end', marginLeft: 'auto', textDecoration: 'none', opacity: row.fileUrl ? 1 : 0.4 }}
                                    >
                                        <img className="download-icon" src={DownloadIcon} alt="download" style={{ width: '1.1vw' }} />
                                        <span className="download-text" style={{ color: '#3457DC', fontSize: '0.85vw', fontWeight: 600, marginTop: '0.3vh' }}>Download</span>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Section (Pagination) */}
            <div className="report-pagination tracker-pagination" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '4vh', flexDirection: isAr ? 'row-reverse' : 'row' }}>
                <button
                    className="report-pagination-btn pagination-arrow"
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
                    <svg className="pagination-svg" width="0.45vw" height="0.95vw" viewBox="0 0 7 13" fill="none" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}>
                        <path d="M6.5 12L1.5 6.5L6.5 1" stroke={currentPage === 1 ? '#717177' : '#F7F7F7'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="pagination-counts-box" style={{ display: 'flex', alignItems: 'center', gap: '0.7vw', flexDirection: 'row' }}>
                    <div className="pagination-current-page-box" style={{ border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1vh 0.6vw', backgroundColor: 'rgba(255,255,255,0.01)', minWidth: '2.5vw', textAlign: 'center' }}>
                        <span className="pagination-current-text" style={{ fontSize: '0.9vw', color: '#ffffff' }}>{currentPage}</span>
                    </div>
                    <span className="pagination-total-text" style={{ fontSize: '0.95vw', color: '#80808a' }}>of {totalPages}</span>
                </div>

                <button
                    className="report-pagination-btn pagination-arrow"
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
                    <svg className="pagination-svg" width="0.45vw" height="0.95vw" viewBox="0 0 7 13" fill="none" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}>
                        <path d="M1 12L6 6.5L1 1" stroke={currentPage === totalPages ? '#717177' : '#F7F7F7'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .search-input::placeholder {
                    color: white !important;
                    opacity: 1;
                }
                @media (max-width: 768px) {
                    table { min-width: 600px; }
                    input, span { font-size: 14px !important; }
                }
            `}} />
        </div>
    );
};

const AcademicPhasesSection = ({ phases }) => {
    return (
        <div 
            className="tracker-phase-card"
            style={{
            backgroundColor: '#151519', border: '1px solid #1e1d22',
            borderRadius: '16px', padding: '24px', display: 'flex',
            flexDirection: 'column', gap: '24px', width: '100%'
        }}>
            {/* Header */}
            <div 
                className="tracker-phase-header"
                style={{ display: 'flex', alignItems: 'flex-end', position: 'relative', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h3 className="tracker-phase-main-title" style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'white', fontFamily: 'Gilroy, sans-serif' }}>Academic Phases</h3>
                    <p style={{ margin: 0, fontSize: '14px', color: '#a5a5b2' }}>Key Objectives & Milestones.</p>
                </div>

                {/* Absolutely Centered Status */}
                <div 
                    className="tracker-phase-status-badge"
                    style={{
                    position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center'
                }}>
                    <span className="tracker-phase-status-text" style={{ fontSize: '14px', color: '#3457DC', fontWeight: 500 }}>You're Doctorat</span>
                    <div style={{ width: '60px', height: '4px', backgroundColor: '#1e1e24', borderRadius: '400px', overflow: 'hidden' }}>
                        <div style={{ width: '24px', height: '100%', backgroundColor: '#3457DC' }} />
                    </div>
                </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#2A2A30' }} />

            {/* Timeline Area with custom scrollbar */}
            <div className="academic-timeline-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxHeight: '300px', overflowY: 'auto', paddingRight: '12px' }}>
                {phases.map((phase, index) => (
                    <div 
                        className="tracker-phase-item"
                        key={index} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                        {/* Dot & Line Indicator */}
                        <div 
                            className="tracker-phase-indicator"
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '46px', position: 'relative' }}>
                            <div 
                                className="tracker-phase-dot"
                                style={{
                                backgroundColor: phase.completed ? '#3457DC' : '#1e1e24',
                                padding: '14px', borderRadius: '50%', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', zIndex: 2,
                                position: 'relative'
                            }}>
                                <img src={ComputerIcon} alt="phase" style={{ width: '16px', height: '16px' }} />
                            </div>
                            {index !== phases.length - 1 && (
                                <div 
                                    className="tracker-phase-line"
                                    style={{
                                    width: '2px', height: '100px', backgroundColor: '#3457DC',
                                    position: 'absolute', top: '22px', zIndex: 1
                                }} />
                            )}
                        </div>

                        <div 
                            className="tracker-phase-content"
                            style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span className="tracker-phase-date" style={{ fontSize: '14px', color: '#a5a5b2', fontWeight: 500 }}>{phase.date}</span>
                                <span className="tracker-phase-title" style={{ fontSize: '14px', color: 'white', fontWeight: 400 }}>{phase.title}</span>
                            </div>
                            <div 
                                className="tracker-phase-btn"
                                style={{
                                backgroundColor: '#1e1e24', padding: '10px 24px', borderRadius: '16px',
                                color: 'white', fontSize: '14px', fontWeight: 500, cursor: 'pointer'
                            }}>
                                View Details
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom HR Divider */}
            <div style={{ padding: '24px 0 8px 0' }}>
                <div style={{ height: '1px', backgroundColor: '#2A2A30', width: '100%' }} />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .academic-timeline-scroll::-webkit-scrollbar {
                    width: 6px;
                }
                .academic-timeline-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .academic-timeline-scroll::-webkit-scrollbar-thumb {
                    background: #3457DC;
                    border-radius: 10px;
                }
                .academic-timeline-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: #3457DC transparent;
                }
            `}} />
        </div>
    );
};

const RestrictionBanner = ({ direction = 'ltr' }) => {
    const isRtl = direction === 'rtl';

    return (
        <div
            dir={direction}
            className="alert-banner-wrapper"
            style={{
                backgroundColor: '#151519',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '2.5vh 1.8vw',
                borderRadius: '1.2vw',
                width: '100%',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                overflow: 'hidden'
            }}
        >
            {/* Desktop Layout */}
            <div style={{ display: 'none' }} className="desktop-layout">
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '2.5vh' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5vw', position: 'relative', zIndex: 10, width: '100%' }}>
                        {/* Restriction Icon (Red Theme) */}
                        <div style={{ backgroundColor: 'rgba(197, 67, 45, 0.2)', padding: '0.6vw', borderRadius: '50%', flexShrink: 0 }}>
                            <div style={{ backgroundColor: 'rgba(197, 67, 45, 0.6)', padding: '1vw', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={ForbiddenIcon} alt="restricted" style={{ width: '1.5vw', height: '1.5vw', filter: 'brightness(0) invert(1)' }} />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh', textAlign: isRtl ? 'right' : 'left', flex: 1 }}>
                            <h4 style={{ color: 'white', fontSize: '1.1vw', fontWeight: 'bold', margin: 0, fontFamily: 'Poppins, sans-serif' }}>
                                Please add your degree
                            </h4>
                            <div style={{ fontSize: '0.85vw', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
                                <p style={{ margin: 0 }}>
                                    Your account has been restricted from using the user Dashboard because you did not specify your degree.
                                    As a result, you won't be able <br /> to post publications.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Info Link - Truly at the bottom and starting from the left */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', paddingLeft: isRtl ? '0' : '0.5vw' }}>
                        <img src={InfoIcon} alt="info" style={{ width: '0.9vw', height: '0.9vw', filter: 'brightness(0) invert(1)' }} />
                        <span style={{ fontSize: '0.8vw', color: '#ffffff' }}>
                            If you believe this was a mistake, <a href="#" style={{ color: '#3457DC', textDecoration: 'none', fontWeight: 500 }}>contact support</a>.
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="mobile-layout" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 10, textAlign: 'center', padding: '10px 0' }}>
                <div style={{ backgroundColor: 'rgba(197, 67, 45, 0.2)', padding: '8px', borderRadius: '50%' }}>
                    <div style={{ backgroundColor: 'rgba(197, 67, 45, 0.6)', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={ForbiddenIcon} alt="restricted" style={{ width: '28px', height: '28px', filter: 'brightness(0) invert(1)' }} />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>Please add your degree</h4>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
                        <p style={{ margin: 0 }}>
                            Your account has been restricted from using the user Dashboard because you did not specify your degree.
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '4px' }}>
                        <img src={InfoIcon} alt="info" style={{ width: '12px', height: '12px', filter: 'brightness(0) invert(1)' }} />
                        <span style={{ fontSize: '11px', color: '#ffffff' }}>
                            Believe this was a mistake? <a href="#" style={{ color: '#3457DC', textDecoration: 'none' }}>contact support</a>.
                        </span>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (min-width: 769px) {
                    .desktop-layout { display: flex !important; }
                    .mobile-layout { display: none !important; }
                }
                @media (max-width: 768px) {
                    .alert-banner-wrapper { padding: 20px !important; border-radius: 16px !important; }
                }
            `}} />
        </div>
    );
};

const CongratsBanner = ({ direction = 'ltr' }) => {
    const isRtl = direction === 'rtl';

    return (
        <div
            dir={direction}
            className="alert-banner-wrapper"
            style={{
                backgroundColor: '#151519',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '2.5vh 1.8vw',
                borderRadius: '1.2vw',
                width: '100%',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                overflow: 'hidden'
            }}
        >
            {/* Desktop Layout */}
            <div style={{ display: 'none' }} className="desktop-layout">
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw', position: 'relative', zIndex: 10, width: '100%' }}>
                        {/* Congrats Icon (Green Theme) */}
                        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', padding: '0.6vw', borderRadius: '50%', flexShrink: 0 }}>
                            <div style={{ backgroundColor: '#0d9488', padding: '1vw', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={CongratsIcon} alt="congrats" style={{ width: '1.5vw', height: '1.5vw' }} />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5vh', textAlign: isRtl ? 'right' : 'left', flex: 1 }}>
                            <h4 style={{ color: 'white', fontSize: '1.1vw', fontWeight: 'bold', margin: 0, fontFamily: 'Poppins, sans-serif' }}>
                                Congratulations! You are now a PhD Researcher
                            </h4>
                            <div style={{ fontSize: '0.85vw', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
                                <p style={{ margin: 0 }}>
                                    You have been officially accepted as a PhD Researcher. Your 30-day integration period has begun
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="mobile-layout" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 10, textAlign: 'center', padding: '10px 0' }}>
                <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', padding: '8px', borderRadius: '50%' }}>
                    <div style={{ backgroundColor: '#0d9488', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={CongratsIcon} alt="congrats" style={{ width: '28px', height: '28px' }} />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>Congratulations! You are now a PhD Researcher</h4>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
                        <p style={{ margin: 0 }}>
                            You have been officially accepted as a PhD Researcher. Your 30-day integration period has begun
                        </p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (min-width: 769px) {
                    .desktop-layout { display: flex !important; }
                    .mobile-layout { display: none !important; }
                }
                @media (max-width: 768px) {
                    .alert-banner-wrapper { padding: 20px !important; border-radius: 16px !important; }
                }
            `}} />
        </div>
    );
};

const svgPaths = {
    p1d435d80: "M19.1667 7.4825C18.9457 7.4825 18.7337 7.5703 18.5774 7.72658C18.4211 7.88286 18.3333 8.09482 18.3333 8.31583V12.5H15C14.337 12.5 13.7011 12.7634 13.2322 13.2322C12.7634 13.7011 12.5 14.337 12.5 15V18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V4.16667C1.66667 3.50363 1.93006 2.86774 2.3989 2.3989C2.86774 1.93006 3.50363 1.66667 4.16667 1.66667H11.7017C11.9227 1.66667 12.1346 1.57887 12.2909 1.42259C12.4472 1.26631 12.535 1.05435 12.535 0.833333C12.535 0.61232 12.4472 0.400358 12.2909 0.244078C12.1346 0.0877974 11.9227 0 11.7017 0L4.16667 0C3.062 0.00132321 2.00296 0.440735 1.22185 1.22185C0.440735 2.00296 0.00132321 3.062 0 4.16667L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H13.6192C14.1666 20.0016 14.7089 19.8945 15.2147 19.6851C15.7205 19.4757 16.1797 19.1681 16.5658 18.78L18.7792 16.565C19.1673 16.1791 19.475 15.72 19.6846 15.2143C19.8941 14.7087 20.0013 14.1665 20 13.6192V8.31583C20 8.09482 19.9122 7.88286 19.7559 7.72658C19.5996 7.5703 19.3877 7.4825 19.1667 7.4825ZM15.3875 17.6017C15.0525 17.9358 14.6289 18.1672 14.1667 18.2683V15C14.1667 14.779 14.2545 14.567 14.4107 14.4107C14.567 14.2545 14.779 14.1667 15 14.1667H18.2708C18.1677 14.6279 17.9367 15.0508 17.6042 15.3867L15.3875 17.6017Z",
    p1f77ae00: "M8 5.33333C8.55228 5.33333 9 4.88562 9 4.33333C9 3.78105 8.55228 3.33333 8 3.33333C7.44772 3.33333 7 3.78105 7 4.33333C7 4.88562 7.44772 5.33333 8 5.33333Z",
    p210a4000: "M15.5467 0.775L5.38667 10.935C4.99862 11.321 4.69098 11.78 4.48157 12.2857C4.27215 12.7914 4.16512 13.3335 4.16667 13.8808V15C4.16667 15.221 4.25446 15.433 4.41074 15.5893C4.56702 15.7455 4.77899 15.8333 5 15.8333H6.11917C6.66647 15.8349 7.20864 15.7278 7.7143 15.5184C8.21995 15.309 8.67905 15.0014 9.065 14.6133L19.225 4.45333C19.712 3.96514 19.9855 3.30373 19.9855 2.61417C19.9855 1.9246 19.712 1.26319 19.225 0.775C18.7297 0.301578 18.071 0.0373745 17.3858 0.0373745C16.7007 0.0373745 16.0419 0.301578 15.5467 0.775ZM18.0467 3.275L7.88667 13.435C7.41677 13.902 6.78167 14.1649 6.11917 14.1667H5.83333V13.8808C5.83507 13.2183 6.09797 12.5832 6.565 12.1133L16.725 1.95333C16.903 1.7833 17.1397 1.68841 17.3858 1.68841C17.632 1.68841 17.8687 1.7833 18.0467 1.95333C18.2216 2.12876 18.3199 2.36641 18.3199 2.61417C18.3199 2.86192 18.2216 3.09957 18.0467 3.275Z",
    p211f8400: "M15.8842 6.545C15.7681 6.42884 15.6302 6.3367 15.4785 6.27383C15.3268 6.21096 15.1642 6.1786 15 6.1786C14.8358 6.1786 14.6732 6.21096 14.5215 6.27383C14.3698 6.3367 14.2319 6.42884 14.1158 6.545L10.2942 10.3658C10.216 10.4439 10.1101 10.4878 9.99958 10.4878C9.8891 10.4878 9.78314 10.4439 9.705 10.3658L5.88417 6.545C5.64978 6.3105 5.33184 6.17872 5.00029 6.17864C4.66875 6.17857 4.35075 6.3102 4.11625 6.54458C3.88175 6.77897 3.74997 7.09691 3.74989 7.42845C3.74982 7.76 3.88145 8.078 4.11583 8.3125L7.9375 12.1342C8.20834 12.405 8.52989 12.6199 8.88377 12.7665C9.23766 12.9131 9.61695 12.9885 10 12.9885C10.383 12.9885 10.7623 12.9131 11.1162 12.7665C11.4701 12.6199 11.7917 12.405 12.0625 12.1342L15.8842 8.3125C16.1185 8.07809 16.2502 7.76021 16.2502 7.42875C16.2502 7.09729 16.1185 6.77941 15.8842 6.545Z",
    p28d8d500: "M6.66667 12C6.84348 12 7.01305 11.9298 7.13807 11.8047C7.2631 11.6797 7.33333 11.5101 7.33333 11.3333V7.33333C7.33333 7.15652 7.2631 6.98695 7.13807 6.86193C7.01305 6.7369 6.84348 6.66667 6.66667 6.66667C6.48986 6.66667 6.32029 6.7369 6.19526 6.86193C6.07024 6.98695 6 7.15652 6 7.33333V11.3333C6 11.5101 6.07024 11.6797 6.19526 11.8047C6.32029 11.9298 6.48986 12 6.66667 12Z",
    p2a082000: "M5.83333 9.16667C5.61232 9.16667 5.40036 9.25446 5.24408 9.41074C5.0878 9.56703 5 9.77899 5 10C5 10.221 5.0878 10.433 5.24408 10.5893C5.40036 10.7455 5.61232 10.8333 5.83333 10.8333H14.1667C14.3877 10.8333 14.5996 10.7455 14.7559 10.5893C14.9122 10.433 15 10.221 15 10C15 9.77899 14.9122 9.56703 14.7559 9.41074C14.5996 9.25446 14.3877 9.16667 14.1667 9.16667H5.83333Z",
    p2a5f5800: "M14.1667 9.16667H10.8333V5.83333C10.8333 5.61232 10.7455 5.40036 10.5893 5.24408C10.433 5.0878 10.221 5 10 5C9.77899 5 9.56702 5.0878 9.41074 5.24408C9.25446 5.40036 9.16667 5.61232 9.16667 5.83333V9.16667H5.83333C5.61232 9.16667 5.40036 9.25446 5.24408 9.41074C5.0878 9.56702 5 9.77899 5 10C5 10.221 5.0878 10.433 5.24408 10.5893C5.40036 10.7455 5.61232 10.8333 5.83333 10.8333H9.16667V14.1667C9.16667 14.3877 9.25446 14.5996 9.41074 14.7559C9.56702 14.9122 9.77899 15 10 15C10.221 15 10.433 14.9122 10.5893 14.7559C10.7455 14.5996 10.8333 14.3877 10.8333 14.1667V10.8333H14.1667C14.3877 10.8333 14.5996 10.7455 14.7559 10.5893C14.9122 10.433 15 10.221 15 10C15 9.77899 14.9122 9.56702 14.7559 9.41074C14.5996 9.25446 14.3877 9.16667 14.1667 9.16667Z",
    p2f8ff900: "M12.4373 0.62L4.30933 8.748C3.99889 9.05676 3.75279 9.42404 3.58525 9.82856C3.41772 10.2331 3.3321 10.6668 3.33333 11.1047V12C3.33333 12.1768 3.40357 12.3464 3.5286 12.4714C3.65362 12.5964 3.82319 12.6667 4 12.6667H4.89533C5.33317 12.6679 5.76691 12.5823 6.17144 12.4147C6.57596 12.2472 6.94324 12.0011 7.252 11.6907L15.38 3.56267C15.7696 3.17211 15.9884 2.64298 15.9884 2.09133C15.9884 1.53968 15.7696 1.01055 15.38 0.62C14.9838 0.241262 14.4568 0.0298996 13.9087 0.0298996C13.3606 0.0298996 12.8335 0.241262 12.4373 0.62ZM14.4373 2.62L6.30933 10.748C5.93342 11.1216 5.42534 11.3319 4.89533 11.3333H4.66667V11.1047C4.66806 10.5747 4.87838 10.0666 5.252 9.69067L13.38 1.56267C13.5224 1.42664 13.7117 1.35073 13.9087 1.35073C14.1056 1.35073 14.2949 1.42664 14.4373 1.56267C14.5773 1.70301 14.6559 1.89313 14.6559 2.09133C14.6559 2.28954 14.5773 2.47966 14.4373 2.62Z",
    p31558500: "M8.33333 15C8.55435 15 8.76631 14.9122 8.92259 14.7559C9.07887 14.5996 9.16667 14.3877 9.16667 14.1667V9.16667C9.16667 8.94565 9.07887 8.73369 8.92259 8.57741C8.76631 8.42113 8.55435 8.33333 8.33333 8.33333C8.11232 8.33333 7.90036 8.42113 7.74408 8.57741C7.5878 8.73369 7.5 8.94565 7.5 9.16667V14.1667C7.5 14.3877 7.5878 14.5996 7.74408 14.7559C7.90036 14.9122 8.11232 15 8.33333 15Z",
    p3750e00: "M14 2.66667H11.9333C11.7786 1.91427 11.3692 1.23823 10.7742 0.752478C10.1791 0.266726 9.4348 0.000969445 8.66667 -2.38419e-07L7.33333 -2.38419e-07C6.5652 0.000969445 5.82088 0.266726 5.22583 0.752478C4.63079 1.23823 4.2214 1.91427 4.06667 2.66667H2C1.82319 2.66667 1.65362 2.7369 1.5286 2.86193C1.40357 2.98695 1.33333 3.15652 1.33333 3.33333C1.33333 3.51014 1.40357 3.67971 1.5286 3.80474C1.65362 3.92976 1.82319 4 2 4H2.66667V12.6667C2.66773 13.5504 3.01925 14.3976 3.64415 15.0225C4.26904 15.6474 5.11627 15.9989 6 16H10C10.8837 15.9989 11.731 15.6474 12.3559 15.0225C12.9807 14.3976 13.3323 13.5504 13.3333 12.6667V4H14C14.1768 4 14.3464 3.92976 14.4714 3.80474C14.5964 3.67971 14.6667 3.51014 14.6667 3.33333C14.6667 3.15652 14.5964 2.98695 14.4714 2.86193C14.3464 2.7369 14.1768 2.66667 14 2.66667ZM7.33333 1.33333H8.66667C9.08018 1.33384 9.48342 1.46225 9.82108 1.70096C10.1587 1.93967 10.4143 2.27699 10.5527 2.66667H5.44733C5.58572 2.27699 5.84127 1.93967 6.17892 1.70096C6.51658 1.46225 6.91982 1.33384 7.33333 1.33333ZM12 12.6667C12 13.1971 11.7893 13.7058 11.4142 14.0809C11.0391 14.456 10.5304 14.6667 10 14.6667H6C5.46957 14.6667 4.96086 14.456 4.58579 14.0809C4.21071 13.7058 4 13.1971 4 12.6667V4H12V12.6667Z",
};

const EditProgressForm = ({ onSave }) => {

    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2026);
    const [monthName, setMonthName] = useState('January');
    const [fileName, setFileName] = useState('Myphd.Pdf');
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedUniversity, setSelectedUniversity] = useState('Blida 1');
    const [isUniDropdownOpen, setIsUniDropdownOpen] = useState(false);
    const [uniSearchTerm, setUniSearchTerm] = useState('');
    const [selectedWilaya, setSelectedWilaya] = useState('Blida');
    const [isWilayaDropdownOpen, setIsWilayaDropdownOpen] = useState(false);
    const [wilayaSearchTerm, setWilayaSearchTerm] = useState('');
    const [degreeTitle, setDegreeTitle] = useState('P.h.d');
    const [selectedFile, setSelectedFile] = useState(null);

    const uniDropdownRef = useRef(null);
    const wilayaDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (uniDropdownRef.current && !uniDropdownRef.current.contains(event.target)) {
                setIsUniDropdownOpen(false);
            }
            if (wilayaDropdownRef.current && !wilayaDropdownRef.current.contains(event.target)) {
                setIsWilayaDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const handleMonthChange = (increment) => {
        let newMonth = month + (increment ? 1 : -1);
        if (newMonth < 1) newMonth = 1;
        if (newMonth > 12) newMonth = 12;
        setMonth(newMonth);
        setMonthName(months[newMonth - 1]);
    };

    const handleYearChange = (increment) => {
        setYear(prev => prev + (increment ? 1 : -1));
    };

    const handleFileClick = () => fileInputRef.current?.click();
    const handleImageClick = () => imageInputRef.current?.click();

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearImage = (e) => {
        e.stopPropagation();
        setPreviewImage(null);
        if (imageInputRef.current) imageInputRef.current.value = '';
    };

    const handleClearFile = (e) => {
        e.stopPropagation();
        setFileName('No file selected');
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Icons components for easier reuse
    const Edit = () => (
        <div onClick={handleImageClick} style={{ position: 'relative', flexShrink: 0, width: '16px', height: '16px', cursor: 'pointer' }}>
            <svg style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g clipPath="url(#clip0_85_21409)">
                    <path d="M15.5468 0.774979L5.38676 10.935C4.99872 11.3209 4.69108 11.78 4.48167 12.2857C4.27225 12.7913 4.16522 13.3335 4.16676 13.8808V15C4.16676 15.221 4.25456 15.433 4.41084 15.5892C4.56712 15.7455 4.77908 15.8333 5.0001 15.8333H6.11926C6.66657 15.8349 7.20874 15.7278 7.7144 15.5184C8.22005 15.309 8.67914 15.0014 9.0651 14.6133L19.2251 4.45331C19.7121 3.96512 19.9856 3.30371 19.9856 2.61415C19.9856 1.92458 19.7121 1.26317 19.2251 0.774979C18.7298 0.301557 18.0711 0.0373535 17.3859 0.0373535C16.7008 0.0373535 16.042 0.301557 15.5468 0.774979ZM18.0468 3.27498L7.88676 13.435C7.41687 13.902 6.78177 14.1649 6.11926 14.1666H5.83343V13.8808C5.83517 13.2183 6.09807 12.5832 6.5651 12.1133L16.7251 1.95331C16.9031 1.78327 17.1398 1.68839 17.3859 1.68839C17.6321 1.68839 17.8688 1.78327 18.0468 1.95331C18.2217 2.12874 18.32 2.36639 18.32 2.61415C18.32 2.8619 18.2217 3.09955 18.0468 3.27498Z" fill="#3457DC" />
                    <path d="M19.1667 7.4825C18.9457 7.4825 18.7337 7.5703 18.5774 7.72658C18.4211 7.88286 18.3333 8.09482 18.3333 8.31583V12.5H15C14.337 12.5 13.7011 12.7634 13.2322 13.2322C12.7634 13.7011 12.5 14.337 12.5 15V18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 15.8333 1.66667 15.8333V4.16667C1.66667 3.50363 1.93006 2.86774 2.3989 2.3989C2.86774 1.93006 3.50363 1.66667 4.16667 1.66667H11.7017C11.9227 1.66667 12.1346 1.57887 12.2909 1.42259C12.4472 1.26631 12.535 1.05435 12.535 0.833333C12.535 0.61232 12.4472 0.400358 12.2909 0.244078C12.1346 0.0877974 11.9227 0 11.7017 0L4.16667 0C3.062 0.00132321 2.00296 0.440735 1.22185 1.22185C0.440735 2.00296 0.00132321 3.062 0 4.16667L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H13.6192C14.1666 20.0016 14.7089 19.8945 15.2147 19.6851C15.7205 19.4757 16.1797 19.1681 16.5658 18.78L18.7792 16.565C19.1673 16.1791 19.475 15.72 19.6846 15.2143C19.8941 14.7087 20.0013 14.1665 20 13.6192V8.31583C20 8.09482 19.9122 7.88286 19.7559 7.72658C19.5996 7.5703 19.3877 7.4825 19.1667 7.4825ZM15.3875 17.6017C15.0525 17.9358 14.6289 18.1672 14.1667 18.2683V15C14.1667 14.779 14.2545 14.567 14.4107 14.4107C14.567 14.2545 14.779 14.1667 15 14.1667H18.2708C18.1677 14.6279 17.9367 15.0508 17.6042 15.3867L15.3875 17.6017Z" fill="#3457DC" />
                </g>
                <defs><clipPath id="clip0_85_21409"><rect width="20" height="20" fill="white" /></clipPath></defs>
            </svg>
        </div>
    );

    const Trash = () => (
        <div onClick={handleClearImage} style={{ position: 'relative', flexShrink: 0, width: '16px', height: '16px', cursor: 'pointer' }}>
            <svg style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g clipPath="url(#clip0_85_21405)">
                    <path d="M17.5001 3.33333H14.9167C14.7233 2.39284 14.2116 1.54779 13.4678 0.940598C12.724 0.333408 11.7936 0.0012121 10.8334 0L9.16675 0C8.20658 0.0012121 7.27618 0.333408 6.53237 0.940598C5.78857 1.54779 5.27683 2.39284 5.08341 3.33333H2.50008C2.27907 3.33333 2.06711 3.42113 1.91083 3.57741C1.75455 3.73369 1.66675 3.94565 1.66675 4.16667C1.66675 4.38768 1.75455 4.59964 1.91083 4.75592C2.06711 4.9122 2.27907 5 2.50008 5H3.33341V15.8333C3.33474 16.938 3.77415 17.997 4.55526 18.7782C5.33638 19.5593 6.39542 19.9987 7.50008 20H12.5001C13.6047 19.9987 14.6638 19.5593 15.4449 18.7782C16.226 17.997 16.6654 16.938 16.6667 15.8333V5H17.5001C17.7211 5 17.9331 4.9122 18.0893 4.75592C18.2456 4.59964 18.3334 4.38768 18.3334 4.16667C18.3334 3.94565 18.2456 3.73369 18.0893 3.57741C17.9331 3.42113 17.7211 3.33333 17.5001 3.33333ZM9.16675 1.66667H10.8334C11.3503 1.6673 11.8544 1.82781 12.2764 2.1262C12.6985 2.42459 13.0179 2.84624 13.1909 3.33333H6.80925C6.98223 2.84624 7.30167 2.42459 7.72374 2.1262C8.14581 1.82781 8.64985 1.66675 9.16675 1.66667ZM15.0001 15.8333C15.0001 16.4964 14.7367 17.1323 14.2678 17.6011C13.799 18.0699 13.1631 18.3333 12.5001 18.3333H7.50008C6.83704 18.3333 6.20116 18.0699 5.73231 17.6011C5.26347 17.1323 5.00008 16.4964 5.00008 15.8333V5H15.0001V15.8333Z" fill="#C5432D" />
                    <path d="M8.33333 14.9999C8.55435 14.9999 8.76631 14.9121 8.92259 14.7558C9.07887 14.5996 9.16667 14.3876 9.16667 14.1666V9.16659C9.16667 8.94557 9.07887 8.73361 8.92259 8.57733C8.76631 8.42105 8.55435 8.33325 8.33333 8.33325C8.11232 8.33325 7.90036 8.42105 7.74408 8.57733C7.5878 8.73361 7.5 8.94557 7.5 9.16659V14.1666C7.5 14.3876 7.5878 14.5996 7.74408 14.7558C7.90036 14.9121 8.11232 14.9999 8.33333 14.9999Z" fill="#C5432D" />
                    <path d="M11.6666 14.9999C11.8876 14.9999 12.0996 14.9121 12.2558 14.7558C12.4121 14.5996 12.4999 14.3876 12.4999 14.1666V9.16659C12.4999 8.94557 12.4121 8.73361 12.2558 8.57733C12.0996 8.42105 11.8876 8.33325 11.6666 8.33325C11.4456 8.33325 11.2336 8.42105 11.0773 8.57733C10.921 8.73361 10.8333 8.94557 10.8333 9.16659V14.1666C10.8333 14.3876 10.921 14.5996 11.0773 14.7558C11.2336 14.9121 11.4456 14.9999 11.6666 14.9999Z" fill="#C5432D" />
                </g>
                <defs><clipPath id="clip0_85_21405"><rect width="20" height="20" fill="white" /></clipPath></defs>
            </svg>
        </div>
    );

    const TrashLarge = () => (
        <div style={{ position: 'relative', flexShrink: 0, width: '20px', height: '20px', cursor: 'pointer' }}>
            <svg style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g clipPath="url(#clip0_85_21405)">
                    <path d="M17.5001 3.33333H14.9167C14.7233 2.39284 14.2116 1.54779 13.4678 0.940598C12.724 0.333408 11.7936 0.0012121 10.8334 0L9.16675 0C8.20658 0.0012121 7.27618 0.333408 6.53237 0.940598C5.78857 1.54779 5.27683 2.39284 5.08341 3.33333H2.50008C2.27907 3.33333 2.06711 3.42113 1.91083 3.57741C1.75455 3.73369 1.66675 3.94565 1.66675 4.16667C1.66675 4.38768 1.75455 4.59964 1.91083 4.75592C2.06711 4.9122 2.27907 5 2.50008 5H3.33341V15.8333C3.33474 16.938 3.77415 17.997 4.55526 18.7782C5.33638 19.5593 6.39542 19.9987 7.50008 20H12.5001C13.6047 19.9987 14.6638 19.5593 15.4449 18.7782C16.226 17.997 16.6654 16.938 16.6667 15.8333V5H17.5001C17.7211 5 17.9331 4.9122 18.0893 4.75592C18.2456 4.59964 18.3334 4.38768 18.3334 4.16667C18.3334 3.94565 18.2456 3.73369 18.0893 3.57741C17.9331 3.42113 17.7211 3.33333 17.5001 3.33333ZM9.16675 1.66667H10.8334C11.3503 1.6673 11.8544 1.82781 12.2764 2.1262C12.6985 2.42459 13.0179 2.84624 13.1909 3.33333H6.80925C6.98223 2.84624 7.30167 2.42459 7.72374 2.1262C8.14581 1.82781 8.64985 1.66667 9.16675 1.66667ZM15.0001 15.8333C15.0001 16.4964 14.7367 17.1323 14.2678 17.6011C13.799 18.0699 13.1631 18.3333 12.5001 18.3333H7.50008C6.83704 18.3333 6.20116 18.0699 5.73231 17.6011C5.26347 17.1323 5.00008 16.4964 5.00008 15.8333V5H15.0001V15.8333Z" fill="#C5432D" />
                    <path d="M8.33333 14.9999C8.55435 14.9999 8.76631 14.9121 8.92259 14.7558C9.07887 14.5996 9.16667 14.3876 9.16667 14.1666V9.16659C9.16667 8.94557 9.07887 8.73361 8.92259 8.57733C8.76631 8.42105 8.55435 8.33325 8.33333 8.33325C8.11232 8.33325 7.90036 8.42105 7.74408 8.57733C7.5878 8.73361 7.5 8.94557 7.5 9.16659V14.1666C7.5 14.3876 7.5878 14.5996 7.74408 14.7558C7.90036 14.9121 8.11232 14.9999 8.33333 14.9999Z" fill="#C5432D" />
                    <path d="M11.6666 14.9999C11.8876 14.9999 12.0996 14.9121 12.2558 14.7558C12.4121 14.5996 12.4999 14.3876 12.4999 14.1666V9.16659C12.4999 8.94557 12.4121 8.73361 12.2558 8.57733C12.0996 8.42105 11.8876 8.33325 11.6666 8.33325C11.4456 8.33325 11.2336 8.42105 11.0773 8.57733C10.921 8.73361 10.8333 8.94557 10.8333 9.16659V14.1666C10.8333 14.3876 10.921 14.5996 11.0773 14.7558C11.2336 14.9121 11.4456 14.9999 11.6666 14.9999Z" fill="#C5432D" />
                </g>
                <defs><clipPath id="clip0_85_21405"><rect width="20" height="20" fill="white" /></clipPath></defs>
            </svg>
        </div>
    );

    const EditLarge = () => (
        <div onClick={handleFileClick} style={{ position: 'relative', flexShrink: 0, width: '20px', height: '20px', cursor: 'pointer' }}>
            <svg style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g clipPath="url(#clip0_85_21409)">
                    <path d="M15.5468 0.774979L5.38676 10.935C4.99872 11.3209 4.69108 11.78 4.48167 12.2857C4.27225 12.7913 4.16522 13.3335 4.16676 13.8808V15C4.16676 15.221 4.25456 15.433 4.41084 15.5892C4.56712 15.7455 4.77908 15.8333 5.0001 15.8333H6.11926C6.66657 15.8349 7.20874 15.7278 7.7144 15.5184C8.22005 15.309 8.67914 15.0014 9.0651 14.6133L19.2251 4.45331C19.7121 3.96512 19.9856 3.30371 19.9856 2.61415C19.9856 1.92458 19.7121 1.26317 19.2251 0.774979C18.7298 0.301557 18.0711 0.0373535 17.3859 0.0373535C16.7008 0.0373535 16.042 0.301557 15.5468 0.774979ZM18.0468 3.27498L7.88676 13.435C7.41687 13.902 6.78177 14.1649 6.11926 14.1666H5.83343V13.8808C5.83517 13.2183 6.09807 12.5832 6.5651 12.1133L16.7251 1.95331C16.9031 1.78327 17.1398 1.68839 17.3859 1.68839C17.6321 1.68839 17.8688 1.78327 18.0468 1.95331C18.2217 2.12874 18.32 2.36639 18.32 2.61415C18.32 2.8619 18.2217 3.09955 18.0468 3.27498Z" fill="#3457DC" />
                    <path d="M19.1667 7.4825C18.9457 7.4825 18.7337 7.5703 18.5774 7.72658C18.4211 7.88286 18.3333 8.09482 18.3333 8.31583V12.5H15C14.337 12.5 13.7011 12.7634 13.2322 13.2322C12.7634 13.7011 12.5 14.337 12.5 15V18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 15.8333 1.66667 15.8333V4.16667C1.66667 3.50363 1.93006 2.86774 2.3989 2.3989C2.86774 1.93006 3.50363 1.66667 4.16667 1.66667H11.7017C11.9227 1.66667 12.1346 1.57887 12.2909 1.42259C12.4472 1.26631 12.535 1.05435 12.535 0.833333C12.535 0.61232 12.4472 0.400358 12.2909 0.244078C12.1346 0.0877974 11.9227 0 11.7017 0L4.16667 0C3.062 0.00132321 2.00296 0.440735 1.22185 1.22185C0.440735 2.00296 0.00132321 3.062 0 4.16667L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H13.6192C14.1666 20.0016 14.7089 19.8945 15.2147 19.6851C15.7205 19.4757 16.1797 19.1681 16.5658 18.78L18.7792 16.565C19.1673 16.1791 19.475 15.72 19.6846 15.2143C19.8941 14.7087 20.0013 14.1665 20 13.6192V8.31583C20 8.09482 19.9122 7.88286 19.7559 7.72658C19.5996 7.5703 19.3877 7.4825 19.1667 7.4825ZM15.3875 17.6017C15.0525 17.9358 14.6289 18.1672 14.1667 18.2683V15C14.1667 14.779 14.2545 14.567 14.4107 14.4107C14.567 14.2545 14.779 14.1667 15 14.1667H18.2708C18.1677 14.6279 17.9367 15.0508 17.6042 15.3867L15.3875 17.6017Z" fill="#3457DC" />
                </g>
                <defs><clipPath id="clip0_85_21409"><rect width="20" height="20" fill="white" /></clipPath></defs>
            </svg>
        </div>
    );

    const InfoIconSvg = () => (
        <div style={{ position: 'relative', flexShrink: 0, width: '16px', height: '16px' }}>
            <svg style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g clipPath="url(#clip0_1_115)">
                    <path d={svgPaths.p4d4e580} fill="#A5A5B2" />
                    <path d={svgPaths.p99c2800} fill="#A5A5B2" />
                    <path d={svgPaths.p1f77ae00} fill="#A5A5B2" />
                </g>
                <defs><clipPath id="clip0_1_115"><rect fill="white" height="16" width="16" /></clipPath></defs>
            </svg>
        </div>
    );

    const AngleDownSvg = () => (
        <div style={{ position: 'relative', flexShrink: 0, width: '20px', height: '20px' }}>
            <svg style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <path d={svgPaths.p211f8400} fill="#3457DC" />
            </svg>
        </div>
    );

    return (
        <div
            style={{
                backgroundColor: '#151519', border: '1px solid #1e1d22', padding: '24px',
                borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative'
            }}
        >
            {/* Hidden Inputs */}
            <input type="file" ref={imageInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".pdf,.png,.jpg" onChange={(e) => {
                if (e.target.files?.[0]) {
                    setFileName(e.target.files[0].name);
                    setSelectedFile(e.target.files[0]);
                }
            }} />

            {/* Header */}
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: 0, fontFamily: ' Giloy, Poppins, sans-serif' }}>Edit Progress details</h2>

            {/* Certificate Preview Frame */}
            <div
                onClick={handleImageClick}
                style={{ backgroundColor: 'rgba(255,255,255,0.01)', height: '201px', borderRadius: '12px', border: '1px solid #2a2a30', position: 'relative', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
            >
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '100%' }}>
                    {/* Icons */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ padding: '4px', borderRadius: '400px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <Edit />
                        </div>
                        <div onClick={handleClearImage} style={{ padding: '4px', borderRadius: '400px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <Trash />
                        </div>
                    </div>
                    {/* Thumbnail */}
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <div style={{ width: '138px', height: '107px', borderRadius: '12px', backgroundColor: '#1e1e24', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            {previewImage ? (
                                <img src={previewImage} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', backgroundColor: '#1e1e24' }} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Degree Title */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <p style={{ color: '#80808a', fontSize: '14px', margin: 0 }}>Degree title</p>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '8px', padding: '9px 14px' }}>
                        <input
                            value={degreeTitle}
                            onChange={(e) => setDegreeTitle(e.target.value)}
                            style={{
                                background: 'transparent', border: 'none', outline: 'none',
                                color: '#f0f0f2', fontSize: '14px', width: '100%', padding: 0,
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>
                </div>

                {/* University & Wilaya Group */}
                <div className="tracker-form-row" style={{ display: 'flex', gap: '40px' }}>
                    {/* University - Custom Premium Dropdown */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }} ref={uniDropdownRef}>
                        <p style={{ color: '#80808a', fontSize: '14px', margin: 0 }}>University</p>
                        <div
                            onClick={() => setIsUniDropdownOpen(!isUniDropdownOpen)}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30',
                                borderRadius: '12px', padding: '12px 14px', display: 'flex',
                                justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                                position: 'relative', transition: 'all 0.3s ease',
                                boxShadow: isUniDropdownOpen ? '0 0 15px rgba(52, 87, 220, 0.1)' : 'none'
                            }}
                        >
                            <span style={{ color: '#f0f0f2', fontSize: '14px', fontWeight: 500 }}>{selectedUniversity}</span>
                            <div style={{ transform: isUniDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                                <AngleDownSvg />
                            </div>
                        </div>

                        {/* Dropdown List */}
                        <AnimatePresence>
                            {isUniDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    style={{
                                        position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px',
                                        backgroundColor: 'rgba(30, 30, 36, 0.98)', border: '1px solid rgba(255, 255, 255, 0.08)',
                                        borderRadius: '12px', padding: '8px', zIndex: 100, maxWidth: '100%',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                                        backdropFilter: 'blur(20px)',
                                        display: 'flex', flexDirection: 'column', gap: '4px'
                                    }}
                                >
                                    {/* Search Inside Dropdown */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '4px' }}>
                                        <RiSearch2Line color="#a5a5b2" size="14px" />
                                        <input 
                                            placeholder="Search University..."
                                            value={uniSearchTerm}
                                            onChange={(e) => setUniSearchTerm(e.target.value)}
                                            style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f0f0f2', fontSize: '13px', width: '100%' }}
                                        />
                                    </div>
                                    <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }} className="custom-scrollbar">
                                        {['Blida 1', 'USTHB', 'ensia', 'esi', 'Algiers 1', 'Oran 1', 'Constantine 1'].filter(u => u.toLowerCase().includes(uniSearchTerm.toLowerCase())).map((uni) => (
                                            <div
                                                key={uni}
                                                onClick={() => {
                                                    setSelectedUniversity(uni);
                                                    setIsUniDropdownOpen(false);
                                                    setUniSearchTerm('');
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'rgba(52, 87, 220, 0.15)';
                                                    e.currentTarget.style.color = '#3457DC';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.backgroundColor = selectedUniversity === uni ? 'rgba(52, 87, 220, 0.1)' : 'transparent';
                                                    e.currentTarget.style.color = selectedUniversity === uni ? '#3457DC' : 'white';
                                                }}
                                                style={{
                                                    padding: '10px 14px', borderRadius: '8px', 
                                                    color: selectedUniversity === uni ? '#3457DC' : 'white',
                                                    fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s ease',
                                                    fontWeight: selectedUniversity === uni ? 600 : 400,
                                                    backgroundColor: selectedUniversity === uni ? 'rgba(52, 87, 220, 0.1)' : 'transparent',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                                }}
                                            >
                                                <span>{uni}</span>
                                                {selectedUniversity === uni && <RiCheckLine size="16px" />}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* Wilaya - Custom Premium Dropdown */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }} ref={wilayaDropdownRef}>
                        <p style={{ color: '#80808a', fontSize: '14px', margin: 0 }}>wilaya</p>
                        <div
                            onClick={() => setIsWilayaDropdownOpen(!isWilayaDropdownOpen)}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30',
                                borderRadius: '12px', padding: '12px 14px', display: 'flex',
                                justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                                position: 'relative', transition: 'all 0.3s ease',
                                boxShadow: isWilayaDropdownOpen ? '0 0 15px rgba(52, 87, 220, 0.1)' : 'none'
                            }}
                        >
                            <span style={{ color: '#f0f0f2', fontSize: '14px', fontWeight: 500 }}>{selectedWilaya}</span>
                            <div style={{ transform: isWilayaDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                                <AngleDownSvg />
                            </div>
                        </div>

                        {/* Dropdown List */}
                        <AnimatePresence>
                            {isWilayaDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    style={{
                                        position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px',
                                        backgroundColor: 'rgba(30, 30, 36, 0.98)', border: '1px solid rgba(255, 255, 255, 0.08)',
                                        borderRadius: '12px', padding: '8px', zIndex: 100, maxWidth: '100%',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                                        backdropFilter: 'blur(20px)',
                                        display: 'flex', flexDirection: 'column', gap: '4px'
                                    }}
                                >
                                    {/* Search Inside Dropdown */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '4px' }}>
                                        <RiSearch2Line color="#a5a5b2" size="14px" />
                                        <input 
                                            placeholder="Search Wilaya..."
                                            value={wilayaSearchTerm}
                                            onChange={(e) => setWilayaSearchTerm(e.target.value)}
                                            style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f0f0f2', fontSize: '13px', width: '100%' }}
                                        />
                                    </div>
                                    <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }} className="custom-scrollbar">
                                        {['Blida', 'Algiers', 'Oran', 'Constantine', 'Setif', 'Annaba', 'Mostaganem'].filter(w => w.toLowerCase().includes(wilayaSearchTerm.toLowerCase())).map((wilaya) => (
                                            <div
                                                key={wilaya}
                                                onClick={() => {
                                                    setSelectedWilaya(wilaya);
                                                    setIsWilayaDropdownOpen(false);
                                                    setWilayaSearchTerm('');
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'rgba(52, 87, 220, 0.15)';
                                                    e.currentTarget.style.color = '#3457DC';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.backgroundColor = selectedWilaya === wilaya ? 'rgba(52, 87, 220, 0.1)' : 'transparent';
                                                    e.currentTarget.style.color = selectedWilaya === wilaya ? '#3457DC' : 'white';
                                                }}
                                                style={{
                                                    padding: '10px 14px', borderRadius: '8px', 
                                                    color: selectedWilaya === wilaya ? '#3457DC' : 'white',
                                                    fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s ease',
                                                    fontWeight: selectedWilaya === wilaya ? 600 : 400,
                                                    backgroundColor: selectedWilaya === wilaya ? 'rgba(52, 87, 220, 0.1)' : 'transparent',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                                }}
                                            >
                                                <span>{wilaya}</span>
                                                {selectedWilaya === wilaya && <RiCheckLine size="16px" />}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Date & Time Selection */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'white' }} />
                        <span>Date & Time</span>
                    </div>
                    <div className="tracker-form-row" style={{ display: 'flex', gap: '60px' }}>
                        {/* Month */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <p style={{ color: '#80808a', fontSize: '14px', margin: 0 }}>Month</p>
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #1e1d22', borderRadius: '8px', padding: '9px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <input
                                        value={month}
                                        readOnly
                                        style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f0f0f2', fontSize: '14px', width: '20px', textAlign: 'center' }}
                                    />
                                    <div style={{ width: '1px', height: '16px', backgroundColor: '#1e1d22' }} />
                                    <input
                                        value={monthName}
                                        readOnly
                                        style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f0f0f2', fontSize: '14px', width: '80px' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <div onClick={() => handleMonthChange(false)} style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d={svgPaths.p2a082000} fill="#373735" /></svg>
                                    </div>
                                    <div onClick={() => handleMonthChange(true)} style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d={svgPaths.p2a5f5800} fill="#3457DC" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Year */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <p style={{ color: '#80808a', fontSize: '14px', margin: 0 }}>Year</p>
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #1e1d22', borderRadius: '8px', padding: '9px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <span style={{ color: '#f0f0f2', fontSize: '14px' }}>year</span>
                                    <div style={{ width: '1px', height: '16px', backgroundColor: '#1e1d22' }} />
                                    <input
                                        value={year}
                                        readOnly
                                        style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f0f0f2', fontSize: '14px', width: '50px' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <div onClick={() => handleYearChange(false)} style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d={svgPaths.p2a082000} fill="#373735" /></svg>
                                    </div>
                                    <div onClick={() => handleYearChange(true)} style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d={svgPaths.p2a5f5800} fill="#3457DC" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benchmark File Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <p style={{ color: '#80808a', fontSize: '14px', margin: 0 }}>Benchmark File</p>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <div onClick={handleFileClick} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '8px', padding: '9px 14px', cursor: 'pointer' }}>
                            <input
                                value={fileName}
                                readOnly
                                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f0f0f2', fontSize: '14px', width: '100%', cursor: 'pointer' }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div onClick={handleClearFile} style={{ cursor: 'pointer' }}><TrashLarge /></div>
                            <div onClick={handleFileClick} style={{ cursor: 'pointer' }}><EditLarge /></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <InfoIconSvg />
                        <p style={{ color: '#80808a', fontSize: '14px', margin: 0 }}>Accepted formats: PNG, JPG, PDF</p>
                    </div>
                </div>
            </div>

            {/* Save Changes Button */}
            <div
                onClick={() => {
                    const isFilled = degreeTitle && selectedUniversity && fileName !== 'No file selected';
                    if (isFilled && onSave) {
                        onSave({
                            document: degreeTitle,
                            university: selectedUniversity,
                            dateTime: new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()) + ' – ' + new Date().getHours() + ':' + new Date().getMinutes().toString().padStart(2, '0'),
                            file: selectedFile
                        });
                    }
                }}
                style={{
                    backgroundColor: (degreeTitle && selectedUniversity && fileName !== 'No file selected') ? '#3457DC' : '#1e1e24',
                    padding: '10px 24px', borderRadius: '16px',
                    alignSelf: 'flex-start', cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                    const isFilled = degreeTitle && selectedUniversity && fileName !== 'No file selected';
                    if (isFilled) e.currentTarget.style.opacity = '0.8';
                }}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
                <p style={{ color: (degreeTitle && selectedUniversity && fileName !== 'No file selected') ? '#ffffff' : '#373735', fontSize: '14px', fontWeight: 600, margin: 0 }}>Save changes</p>
            </div>
        </div>
    );
};

const PhdTracker = () => {
    const [activeTab, setActiveTab] = useState('Team Tracker');
    const [showReportsTable, setShowReportsTable] = useState(false);
    const [teamReports, setTeamReports] = useState([]);
    const [userReports, setUserReports] = useState([]);
    const [academicPhases, setAcademicPhases] = useState([]);
    const [stats, setStats] = useState({ mgr: 0, phd: 0, prof: 0, eng: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrackerData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                // Fetch Stats
                const statsRes = await fetch(`${API_BASE_URL}/api/stats/overview`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setStats(statsData.degreeStats || { mgr: 0, phd: 0, prof: 0, eng: 0 });
                }

                // Fetch User Reports
                const userData = JSON.parse(localStorage.getItem('user') || '{}');
                const reportsRes = await fetch(`${API_BASE_URL}/api/reports?user=${userData._id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (reportsRes.ok) {
                    const data = await reportsRes.json();
                    const formatted = data.map(rep => ({
                        id: rep._id,
                        dateTime: rep.dateTimeString || new Date(rep.createdAt).toLocaleString(),
                        document: rep.document,
                        university: rep.university,
                        status: rep.status,
                        fileUrl: rep.fileUrl || '',
                        checked: false
                    }));
                    setUserReports(formatted);
                    if (formatted.length > 0) setShowReportsTable(true);

                    const initialPhase = [{
                        date: data.length > 0 ? new Date(data[0].createdAt).toLocaleString('en-US', { month: 'long', year: 'numeric' }).toLowerCase() : 'april 2026',
                        title: 'Joining the team',
                        completed: true
                    }];
                    const dynamicPhases = data.filter(r => r.status !== 'Refused').map(r => ({
                        date: r.dateTimeString?.split(' – ')[0].toLowerCase() || '',
                        title: r.document,
                        completed: r.status === 'Accepted'
                    }));
                    setAcademicPhases([...initialPhase, ...dynamicPhases]);
                }
                
                // Fetch Team Reports
                const teamReportsRes = await fetch(`${API_BASE_URL}/api/reports`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (teamReportsRes.ok) {
                    const data = await teamReportsRes.json();
                    setTeamReports(data.map(rep => ({
                        id: rep._id,
                        dateTime: rep.dateTimeString || new Date(rep.createdAt).toLocaleString(),
                        document: rep.document,
                        university: rep.university,
                        status: rep.status,
                        fileUrl: rep.fileUrl || '',
                        checked: false
                    })));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTrackerData();
    }, []);

    const handleAddReport = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/reports`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: (() => {
                    const fd = new FormData();
                    fd.append('document', formData.document + ' graduation');
                    fd.append('university', formData.university);
                    fd.append('dateTime', formData.dateTime);
                    if (formData.file) fd.append('benchmarkFile', formData.file);
                    return fd;
                })()
            });

            if (res.ok) {
                const rep = await res.json();
                const newReport = {
                    id: rep._id,
                    dateTime: rep.dateTimeString,
                    document: rep.document,
                    university: rep.university,
                    status: rep.status,
                    fileUrl: rep.fileUrl || '',
                    checked: false
                };

                const newPhase = {
                    date: formData.dateTime.split(' – ')[0].toLowerCase(),
                    title: newReport.document,
                    completed: false
                };

                setUserReports(prev => [newReport, ...prev]);
                setTeamReports(prev => [newReport, ...prev]);
                setAcademicPhases(prev => [...prev, newPhase]);
                setShowReportsTable(true);
            }
        } catch (error) {
            console.error('Failed to save report', error);
        }
    };

    const overviewStats = [
        {
            title: "Team Manager",
            value: stats.mgr.toString(),
            icon: <img src={TeamIcon} alt="Team" style={{ width: '1.25vw', height: '1.25vw', objectFit: 'contain' }} />
        },
        {
            title: "Ph.D Professor",
            value: stats.phd.toString(),
            icon: <img src={TeamIcon} alt="Team" style={{ width: '1.25vw', height: '1.25vw', objectFit: 'contain' }} />
        },
        {
            title: "Professor",
            value: stats.prof.toString(),
            icon: <img src={TeamIcon} alt="Team" style={{ width: '1.25vw', height: '1.25vw', objectFit: 'contain' }} />
        },
        {
            title: "Engineering Graduate",
            value: stats.eng.toString(),
            icon: <img src={TeamIcon} alt="Team" style={{ width: '1.25vw', height: '1.25vw', objectFit: 'contain' }} />
        }
    ];

    return (
        <div className="w-full text-white font-poppins pb-10 animate-in fade-in duration-500">
            {/* Tab Navigation */}
            <div className="flex gap-[10px] items-center pb-[12px] pt-[0px] px-[0px] w-full">
                <Tab
                    label="Team Tracker"
                    isActive={activeTab === 'Team Tracker'}
                    onClick={() => setActiveTab('Team Tracker')}
                />
                <Tab
                    label="Your Track"
                    isActive={activeTab === 'Your Track'}
                    onClick={() => setActiveTab('Your Track')}
                />
            </div>

            {/* Content Area */}
            <div className="px-[0px] pt-[30px] pb-[10px] mt-[0px]">
                <AnimatePresence mode="wait">
                    {activeTab === 'Team Tracker' ? (
                        <motion.div
                            key="team"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-[2vh]"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1vw] tracker-stats-grid">
                                {overviewStats.map((stat, index) => (
                                    <StatCard
                                        key={index}
                                        title={stat.title}
                                        value={stat.value}
                                        icon={stat.icon}
                                    />
                                ))}
                            </div>

                            {/* Insert ReportsHistoryTable below the 4 cards */}
                            <ReportsHistoryTable direction="ltr" reportsList={teamReports} setReportsList={setTeamReports} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="your"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-[3vh]"
                        >
                            {userReports.some(r => r.status === 'Accepted') ? (
                                <CongratsBanner direction="ltr" />
                            ) : (
                                <RestrictionBanner direction="ltr" />
                            )}
                            <EditProgressForm onSave={handleAddReport} />
                            {showReportsTable && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                    <ReportsHistoryTable direction="ltr" reportsList={userReports} setReportsList={setUserReports} />
                                    <AcademicPhasesSection phases={academicPhases} />
                                </div>
                            )}
                            {/* Additional Track Content can follow */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

/* --- Mobile Responsive Style --- */
const trackerStyles = `
@media (max-width: 1024px) {
    .tracker-stats-grid { 
        grid-template-columns: repeat(2, 1fr) !important; 
        gap: 12px !important;
    }
    .stat-card { 
        height: 160px !important; 
        border-radius: 12px !important; 
        padding: 16px !important;
    }
    .stat-card-title-text { font-size: 14px !important; }
    .stat-card-value-text { font-size: 24px !important; }
    .stat-card-icon-container { 
        width: 48px !important; 
        height: 48px !important; 
        border-radius: 10px !important; 
    }
    .stat-card-icon-wrapper img, .stat-card-icon-wrapper svg {
        width: 24px !important;
        height: 24px !important;
        object-fit: contain !important;
    }

    /* Form Responsiveness */
    .tracker-form-row {
        flex-direction: column !important;
        gap: 24px !important;
    }
    .tracker-form-row > div {
        width: 100% !important;
    }

    /* Table & Filters Responsiveness */
    .tracker-filters-row {
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 12px !important;
    }
    .tracker-search-container, .tracker-filter-item {
        width: 100% !important;
        min-width: unset !important;
        padding: 14px 18px !important;
    }
    .tracker-table-container {
        margin-top: 24px !important;
        border: 1px solid #1e1d22 !important;
        border-radius: 12px !important;
        overflow-x: auto !important;
    }
    .table-header-cell { 
        font-size: 14px !important; 
        padding: 15px 10px !important; 
        min-width: 120px !important;
    }
    .table-data-row { padding: 20px 10px !important; }
    .table-cell-text { 
        font-size: 15px !important; 
        min-width: 120px !important;
    }
    
    /* Scaling Table Icons and Badges */
    .status-badge { 
        width: 110px !important; 
        height: 36px !important; 
        font-size: 14px !important; 
        border-radius: 50px !important;
    }
    .download-icon { width: 22px !important; }
    .download-text { font-size: 16px !important; }
    .table-status-cell { padding: 15px 0 15px 15px !important; min-width: 130px !important; }
    .table-action-cell { padding: 15px 15px !important; min-width: 140px !important; }

    /* Academic Phases Responsiveness */
    .tracker-phase-card {
        padding: 16px !important;
        gap: 20px !important;
    }
    .tracker-phase-main-title { font-size: 16px !important; }
    .tracker-phase-status-badge {
        position: static !important;
        transform: none !important;
        flex-direction: row !important;
        justify-content: space-between !important;
        width: 100% !important;
        background: rgba(52, 87, 220, 0.05) !important;
        padding: 10px 14px !important;
        border-radius: 10px !important;
    }
    .tracker-phase-status-text { font-size: 13px !important; }
    .tracker-phase-header { flex-direction: column !important; align-items: flex-start !important; gap: 15px !important; }
    
    .tracker-phase-item { gap: 15px !important; }
    .tracker-phase-indicator { min-width: 40px !important; }
    .tracker-phase-dot { padding: 10px !important; }
    .tracker-phase-dot img { width: 14px !important; height: 14px !important; }
    .tracker-phase-line { height: 80px !important; top: 18px !important; }
    
    .tracker-phase-date { font-size: 12px !important; }
    .tracker-phase-title { font-size: 13px !important; }
    .tracker-phase-btn { padding: 8px 16px !important; font-size: 12px !important; border-radius: 10px !important; }

    /* Pagination Scaling */
    .report-pagination-btn.pagination-arrow {
        width: 44px !important;
        height: 44px !important;
    }
    .pagination-svg {
        width: 10px !important;
        height: 18px !important;
    }
    .pagination-current-page-box {
        min-width: 45px !important;
        padding: 8px !important;
        border-radius: 8px !important;
    }
    .pagination-current-text { font-size: 16px !important; }
    .pagination-total-text { font-size: 16px !important; }
    .pagination-counts-box { gap: 12px !important; }
}

@media (max-width: 480px) {
    /* Ensure cards stay 2 in line as requested, unless extremely narrow */
    .tracker-stats-grid { 
        grid-template-columns: repeat(2, 1fr) !important; 
        gap: 8px !important;
    }
    .stat-card {
        height: 140px !important;
        padding: 12px !important;
    }
    .stat-card-title-text { font-size: 12px !important; }
    .stat-card-value-text { font-size: 20px !important; }
}
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = trackerStyles;
    document.head.appendChild(styleSheet);
}

export default PhdTracker;
