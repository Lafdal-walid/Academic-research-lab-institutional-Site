import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCheckLine, RiArrowRightSLine, RiSearch2Line, RiArrowDownSLine, RiUserAddLine, RiArrowLeftSLine, RiDeleteBinLine } from 'react-icons/ri';

// --- Assets Icons ---
import DropdownIcon from "@/assets/svg/userDashboard/PhdTracker/angle-small-down 1.svg";
import SearchIcon from "@/assets/svg/userDashboard/PhdTracker/search-normal.svg";
import ManageUsersIcon from "@/assets/svg/LeaderDashboard/users/user_(6)_1.svg";
import ComputerIcon from "@/assets/svg/userDashboard/PhdTracker/computer_(1)_1.svg";
import CalendarIcon from "@/assets/svg/userDashboard/PhdTracker/calendar-clock (7) 3.svg";
import DownloadIcon from "@/assets/svg/userDashboard/PhdTracker/Vector.svg";

// --- Asset Icons Imports ---
import TeamIcon from "@/assets/svg/userDashboard/Overview/users-alt (7) 1.svg";
import PublicationsIcon from "@/assets/svg/LeaderDashboard/users/Vector.svg";
import ProjectsIcon from "@/assets/svg/LeaderDashboard/users/Vector-1.svg";
import GrowthIcon from "@/assets/svg/LeaderDashboard/users/dashboard (4) 1.svg";
import TrendUpIcon from "@/assets/svg/LeaderDashboard/users/arrow-trend-up_(1)_4.svg";
import TrashIcon from "@/assets/svg/LeaderDashboard/users/Frame 6489.svg";
import DetailsIcon from "@/assets/svg/LeaderDashboard/users/Frame 6492.svg";

const StatCard = ({ icon, title, value, growth }) => {
    return (
        <div style={{
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
                <div style={{
                    width: '2.5vw', height: '2.5vw', minWidth: '35px', minHeight: '35px',
                    backgroundColor: 'rgba(52, 87, 220, 0.12)', borderRadius: '0.7vw',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                }}>
                    {icon}
                </div>
                <span style={{
                    fontSize: '0.9vw', fontWeight: 600, color: '#A5A5B2',
                    textTransform: 'capitalize', letterSpacing: '0.01vw', fontFamily: "'Poppins', sans-serif"
                }}>
                    {title}
                </span>
            </div>

            {/* Bottom Part: Value & Growth badge */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginTop: '0.3vh' }}>
                <h3 style={{ fontSize: '1.8vw', fontWeight: 500, color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                    {value}
                </h3>
                {growth && (
                    <div style={{
                        backgroundColor: '#043D37',
                        padding: '0.6vh 1.2vw',
                        borderRadius: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3vw',
                        color: '#01CBB1',
                        fontSize: '0.75vw',
                        fontWeight: 600,
                        marginBottom: '0.8vh'
                    }}>
                        <span>{growth.label}</span>
                        <img 
                            src={growth.icon} 
                            alt="trend" 
                            style={{ 
                                width: '0.9vw', 
                                height: '0.9vw',
                                filter: 'brightness(0) saturate(100%) invert(67%) sepia(99%) saturate(583%) hue-rotate(124deg) brightness(97%) contrast(101%)'
                            }} 
                        />
                    </div>
                )}
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

const ManageUsersTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedSort, setSelectedSort] = useState('Newest first');
    const [selectedPlan, setSelectedPlan] = useState('Plan Type');
    const [selectedStatus, setSelectedStatus] = useState('Status');
    const [selectedIQ, setSelectedIQ] = useState('IQ Version');
    const [currentPage, setCurrentPage] = useState(2);
    const totalPages = 12;

    const [users, setUsers] = useState([
        { id: 1, userId: 'ID-2481', email: 'amine.kh@lab.dz', username: 'Amine Khababa', degree: 'Doctorat', team: 'team 1', status: 'In Project', checked: true },
        { id: 2, userId: 'ID-2482', email: 'lydia.m@lab.dz', username: 'Lydia Mansouri', degree: 'Professor', team: 'team 2', status: 'Without Project', checked: false },
        { id: 3, userId: 'ID-2483', email: 'yacine.r@lab.dz', username: 'Yacine Rahmani', degree: 'Researcher', team: 'team 3', status: 'In Project', checked: false },
        { id: 4, userId: 'ID-2484', email: 'sarah.b@lab.dz', username: 'Sarah Belkacem', degree: 'Doctorat', team: 'team 4', status: 'Without Project', checked: false },
    ]);

    const handleToggleRow = (id) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, checked: !u.checked } : u));
    };

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (activeDropdown && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeDropdown]);

    const filterItemStyle = {
        backgroundColor: 'rgba(255,255,255,0.01)',
        borderRadius: '0.9vw',
        padding: '1.1vh 1.2vw',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6vw',
        border: '1px solid #1e1d22',
        cursor: 'pointer',
        minWidth: '9vw'
    };

    const dropdownMenuStyle = {
        position: 'absolute', top: '100%', left: 0, right: 0,
        backgroundColor: '#1e1e24', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '0.8vw', marginTop: '0.5vw', zIndex: 100,
        padding: '0.5vw', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)'
    };

    const dropdownItemStyle = (isActive) => ({
        padding: '1vh 0.4vw', cursor: 'pointer', fontSize: '0.8vw',
        borderRadius: '0.5vw', color: isActive ? '#fff' : '#a5a5b2',
        backgroundColor: isActive ? '#3457DC' : 'transparent',
        transition: '0.2s', marginBottom: '2px'
    });

    return (
        <div style={{
            backgroundColor: '#151519',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '3vh 1.5vw 4vh 1.5vw',
            borderRadius: '1.2vw',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '3.5vh'
        }}>
            {/* 1. Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5vh' }}>
                <h2 style={{ fontSize: '1.2vw', fontWeight: 600, color: 'white', margin: 0, fontFamily: ' Giloy, Poppins, sans-serif' }}>Manage Users</h2>
                <button style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid #2a2a30',
                    borderRadius: '0.8vw',
                    padding: '1vh 1.5vw',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6vw',
                    fontSize: '0.9vw',
                    fontWeight: 500,
                    cursor: 'pointer'
                }}>
                    <span>manage users</span>
                    <img src={ManageUsersIcon} alt="manage users" style={{ width: '1.2vw', height: '1.2vw', objectFit: 'contain' }} />
                </button>
            </div>

            {/* 2. Controls Section */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '3vh' }} ref={dropdownRef}>
                {/* Search Bar */}
                <div style={{ ...filterItemStyle, flex: 1, minWidth: '15vw' }}>
                    <input
                        type="text"
                        placeholder="Search /"
                        style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#f0f0f2', fontSize: '14px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <RiSearch2Line color="#3457DC" size="1.2vw" />
                </div>

                {/* Dropdowns */}
                {[
                    { id: 'sort', current: selectedSort, options: ['Newest first', 'Oldest first'], setter: setSelectedSort },
                    { id: 'iq', current: selectedIQ, options: ['IQ V1', 'IQ V2'], setter: setSelectedIQ },
                    { id: 'plan', current: selectedPlan, options: ['Free', 'Premium'], setter: setSelectedPlan },
                    { id: 'status', current: selectedStatus, options: ['In Project', 'Without Project'], setter: setSelectedStatus }
                ].map(drop => (
                    <div key={drop.id} style={{ ...filterItemStyle, position: 'relative' }} onClick={() => setActiveDropdown(activeDropdown === drop.id ? null : drop.id)}>
                        <span style={{ fontSize: '14px', color: '#f0f0f2', flex: 1 }}>{drop.current}</span>
                        <img src={DropdownIcon} alt="arrow" style={{ width: '0.8vw', transform: activeDropdown === drop.id ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                        {activeDropdown === drop.id && (
                            <div style={dropdownMenuStyle}>
                                {drop.options.map(opt => (
                                    <div key={opt} style={dropdownItemStyle(drop.current === opt)} onClick={() => { drop.setter(opt); setActiveDropdown(null); }}>
                                        {opt}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 3. Data Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <th style={{ padding: '1.5vh 0.5vw', width: '3vw' }}></th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>User Id</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>email</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>User name</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>academic graduation</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Team</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'center' }}>Status</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', height: '8vh' }}>
                                <td style={{ padding: '0 0.5vw' }}>
                                    <div onClick={() => handleToggleRow(user.id)}
                                        style={{ width: '1.1vw', height: '1.1vw', borderRadius: '4px', border: user.checked ? 'none' : '1px solid #2a2a30', backgroundColor: user.checked ? '#3457DC' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                        {user.checked && <RiCheckLine color="white" size="0.8vw" />}
                                    </div>
                                </td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{user.userId}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{user.email}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'white' }}>{user.username}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: user.degree === 'Doctorat' ? '#FCC841' : 'rgba(255,255,255,0.7)', fontWeight: user.degree === 'Doctorat' ? 600 : 400 }}>{user.degree}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{user.team}</td>
                                <td style={{ padding: '0 0.5vw', textAlign: 'center' }}>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        padding: '0.9vh 1.2vw', borderRadius: '100px',
                                        fontSize: '0.75vw',
                                        backgroundColor: user.status === 'In Project' ? 'rgba(39, 189, 173, 0.1)' : 'rgba(235, 87, 87, 0.1)',
                                        color: user.status === 'In Project' ? '#27bdad' : '#eb5757',
                                        fontWeight: 600, width: '8.5vw'
                                    }}>
                                        {user.status}
                                    </span>
                                </td>
                                <td style={{ padding: '0 0.5vw', textAlign: 'center' }}>
                                    <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                                        <img src={DetailsIcon} alt="details" style={{ width: '1.8vw', height: '1.8vw', objectFit: 'contain' }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 4. Pagination Section */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '4vh' }}>
                <div style={{ display: 'flex', gap: '12vw', alignItems: 'center' }}>
                    <button style={{ width: '2.4vw', height: '2.4vw', backgroundColor: '#3457DC', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <RiArrowLeftSLine color="#F7F7F7" size="1.2vw" />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2vw' }}>
                        <div style={{ border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1vh 0.6vw', backgroundColor: 'rgba(255,255,255,0.01)', minWidth: '2.5vw', textAlign: 'center' }}>
                            <span style={{ fontSize: '0.9vw', color: '#ffffff' }}>2</span>
                        </div>
                        <span style={{ fontSize: '0.95vw', color: '#80808a' }}>of 12</span>
                    </div>

                    <button style={{ width: '2.4vw', height: '2.4vw', backgroundColor: '#3457DC', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <RiArrowRightSLine color="#F7F7F7" size="1.2vw" />
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8vw' }}>
                    <span style={{ fontSize: '0.9vw', color: '#a5a5b2' }}>results per page</span>
                    <div style={{
                        backgroundColor: '#1e1e24', border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '0.6vw', padding: '0.8vh 1vw', display: 'flex', alignItems: 'center', gap: '0.5vw', cursor: 'pointer'
                    }}>
                        <span style={{ color: 'white', fontSize: '0.85vw' }}>10</span>
                        <RiArrowDownSLine color="#3457DC" size="1vw" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const UsersPublicationsTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedSort, setSelectedSort] = useState('Newest first');
    const [selectedReview, setSelectedReview] = useState('All reviews');
    const [selectedRating, setSelectedRating] = useState('Rating');
    const [selectedStatus, setSelectedStatus] = useState('Status');
    
    const [activeRowAction, setActiveRowAction] = useState(null);
    
    const dropdownRef = useRef(null);
    const rowActionRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (activeDropdown && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setActiveDropdown(null);
            }
            if (activeRowAction && rowActionRef.current && !rowActionRef.current.contains(e.target)) {
                setActiveRowAction(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeDropdown, activeRowAction]);

    const filterItemStyle = {
        backgroundColor: 'rgba(255,255,255,0.01)',
        borderRadius: '0.9vw',
        padding: '1.1vh 1.2vw',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6vw',
        border: '1px solid #1e1d22',
        cursor: 'pointer',
        minWidth: '9vw'
    };

    const dropdownMenuStyle = {
        position: 'absolute', top: '100%', left: 0, right: 0,
        backgroundColor: '#1e1e24', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '0.8vw', marginTop: '0.5vw', zIndex: 100,
        padding: '0.5vw', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)'
    };

    const rowActionMenuStyle = {
        position: 'absolute', top: '100%', right: 0,
        backgroundColor: '#1e1e24', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '0.8vw', marginTop: '0.3vw', zIndex: 200,
        minWidth: '10vw', padding: '0.4vw',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)'
    };

    const dropdownItemStyle = (isActive) => ({
        padding: '1vh 0.4vw', cursor: 'pointer', fontSize: '0.8vw',
        borderRadius: '0.5vw', color: isActive ? '#fff' : '#a5a5b2',
        backgroundColor: isActive ? '#3457DC' : 'transparent',
        transition: '0.2s', marginBottom: '2px'
    });

    const [publications, setPublications] = useState([
        { id: 1, name: 'walid', pub: 'Publication 1 : Lorem ipsum dolor sit amet consectetur. Orci ac habitant vestibulum egestas. Tristique malesuada vel lectus interdum rutrum in sed ac...', status: 'Waiting ...', date: 'Aug 18, 2025', tooltip: 'publication updated', checked: true },
        { id: 2, name: 'walid', pub: 'Publication 2', status: 'Waiting ...', date: 'Aug 18, 2025', checked: false },
        { id: 3, name: 'walid', pub: 'Publication 3', status: 'Waiting ...', date: 'Aug 18, 2025', checked: false },
        { id: 4, name: 'walid', pub: 'Publication 4', status: 'Waiting ...', date: 'Aug 18, 2025', checked: false },
    ]);

    const handleToggleRow = (id) => {
        setPublications(prev => prev.map(p => p.id === id ? { ...p, checked: !p.checked } : p));
    };

    return (
        <div style={{
            backgroundColor: '#151519',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '3vh 1.5vw 4vh 1.5vw',
            borderRadius: '1.2vw',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '3.5vh'
        }}>
            {/* 1. Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5vh' }}>
                <h2 style={{ fontSize: '1.2vw', fontWeight: 600, color: 'white', margin: 0, fontFamily: 'Giloy, Poppins, sans-serif' }}>Manage Publications</h2>
            </div>

            {/* 2. Controls Section */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '3vh' }} ref={dropdownRef}>
                {/* Search Bar */}
                <div style={{ ...filterItemStyle, flex: 1, minWidth: '15vw' }}>
                    <input
                        type="text"
                        placeholder="Search /"
                        style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#f0f0f2', fontSize: '14px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <RiSearch2Line color="#3457DC" size="1.2vw" />
                </div>

                {/* Dropdowns */}
                {[
                    { id: 'sort', current: selectedSort, options: ['Newest first', 'Oldest first'], setter: setSelectedSort },
                    { id: 'reviews', current: selectedReview, options: ['All reviews', 'With comments'], setter: setSelectedReview },
                    { id: 'rating', current: selectedRating, options: ['Rating', '5 Stars', '4 Stars'], setter: setSelectedRating },
                    { id: 'status', current: selectedStatus, options: ['Status', 'Waiting ...', 'Approved'], setter: setSelectedStatus }
                ].map(drop => (
                    <div key={drop.id} style={{ ...filterItemStyle, position: 'relative' }} onClick={() => setActiveDropdown(activeDropdown === drop.id ? null : drop.id)}>
                        <span style={{ fontSize: '14px', color: '#f0f0f2', flex: 1 }}>{drop.current}</span>
                        <img src={DropdownIcon} alt="arrow" style={{ width: '0.8vw', transform: activeDropdown === drop.id ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                        {activeDropdown === drop.id && (
                            <div style={dropdownMenuStyle}>
                                {drop.options.map(opt => (
                                    <div key={opt} style={dropdownItemStyle(drop.current === opt)} onClick={() => { drop.setter(opt); setActiveDropdown(null); }}>
                                        {opt}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* Date Range */}
                <div style={filterItemStyle}>
                    <span style={{ fontSize: '14px', color: '#f0f0f2', flex: 1 }}>Date Range</span>
                    <RiArrowDownSLine color="#3457DC" size="1.2vw" />
                </div>
            </div>

            {/* 3. DataTable Section */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <th style={{ padding: '1.5vh 0.5vw', width: '3vw' }}></th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Name</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Publication</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'center' }}>Status</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Date</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publications.map((row) => (
                            <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                <td style={{ padding: '2.5vh 0.5vw' }}>
                                    <div onClick={() => handleToggleRow(row.id)}
                                        style={{ width: '1.1vw', height: '1.1vw', borderRadius: '4px', border: row.checked ? 'none' : '1px solid #2a2a30', backgroundColor: row.checked ? '#3457DC' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                        {row.checked && <RiCheckLine color="white" size="0.8vw" />}
                                    </div>
                                </td>
                                <td style={{ padding: '2.5vh 0.5vw', fontSize: '0.85vw', color: 'white' }}>{row.name}</td>
                                <td style={{ padding: '2.5vh 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)', maxWidth: '25vw', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.pub}</td>
                                <td style={{ padding: '2.5vh 0.5vw', textAlign: 'center' }}>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        padding: '0.9vh 1.2vw', borderRadius: '100px',
                                        fontSize: '0.75vw',
                                        backgroundColor: 'rgba(39, 189, 173, 0.1)',
                                        color: '#27bdad',
                                        fontWeight: 600, width: '8.5vw'
                                    }}>
                                        {row.status}
                                    </span>
                                </td>
                                <td style={{ padding: '2.5vh 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)', position: 'relative' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                                        {row.date}
                                        {row.tooltip && (
                                            <div style={{
                                                backgroundColor: '#322f35', color: '#f5eff7', fontSize: '0.65vw',
                                                padding: '0.4vh 0.6vw', borderRadius: '0.3vw', marginLeft: '0.5vw',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {row.tooltip}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td style={{ padding: '2.5vh 0.5vw' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2vw' }}>
                                        <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                                            <img src={TrashIcon} alt="trash" style={{ width: '1.8vw', height: '1.8vw', objectFit: 'contain' }} />
                                        </button>
                                        <div style={{ position: 'relative' }}>
                                            <button 
                                                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveRowAction(activeRowAction === row.id ? null : row.id);
                                                }}
                                            >
                                                <img src={DetailsIcon} alt="details" style={{ width: '1.8vw', height: '1.8vw', objectFit: 'contain' }} />
                                            </button>
                                            
                                            {activeRowAction === row.id && (
                                                <div ref={rowActionRef} style={{ ...rowActionMenuStyle, top: '100%', right: '0', marginTop: '0.2vw' }}>
                                                    <div style={dropdownItemStyle(false)} onClick={() => setActiveRowAction(null)}>
                                                        Accept publication
                                                    </div>
                                                    <div style={dropdownItemStyle(false)} onClick={() => setActiveRowAction(null)}>
                                                        contact user
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 4. Pagination Section */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '4vh' }}>
                <div style={{ display: 'flex', gap: '12vw', alignItems: 'center' }}>
                    <button style={{ width: '2.4vw', height: '2.4vw', backgroundColor: '#3457DC', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <RiArrowLeftSLine color="#F7F7F7" size="1.2vw" />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2vw' }}>
                        <div style={{ border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1vh 0.6vw', backgroundColor: 'rgba(255,255,255,0.01)', minWidth: '2.5vw', textAlign: 'center' }}>
                            <span style={{ fontSize: '0.9vw', color: '#ffffff' }}>2</span>
                        </div>
                        <span style={{ fontSize: '0.95vw', color: '#80808a' }}>of 12</span>
                    </div>

                    <button style={{ width: '2.4vw', height: '2.4vw', backgroundColor: '#3457DC', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <RiArrowRightSLine color="#F7F7F7" size="1.2vw" />
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8vw' }}>
                    <span style={{ fontSize: '0.9vw', color: '#a5a5b2' }}>results per page</span>
                    <div style={{
                        backgroundColor: '#1e1e24', border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '0.6vw', padding: '0.8vh 1vw', display: 'flex', alignItems: 'center', gap: '0.5vw', cursor: 'pointer'
                    }}>
                        <span style={{ color: 'white', fontSize: '0.85vw' }}>10</span>
                        <RiArrowDownSLine color="#3457DC" size="1vw" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const UsersTrackTimeline = ({ phases = [] }) => {

    return (
        <div style={{
            backgroundColor: '#151519', border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '1.2vw', padding: '1.5vw', display: 'flex',
            flexDirection: 'column', gap: '1.5vw', width: '100%'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-end', position: 'relative', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4vw' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2vw', fontWeight: 600, color: 'white', fontFamily: 'Giloy, Poppins, sans-serif' }}>Academic Phases</h3>
                    <p style={{ margin: 0, fontSize: '0.9vw', color: '#a5a5b2' }}>Key Objectives & Milestones.</p>
                </div>

                {/* Absolutely Centered Status */}
                <div style={{
                    position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', flexDirection: 'column', gap: '0.4vw', alignItems: 'center'
                }}>
                    <span style={{ fontSize: '0.9vw', color: '#3457DC', fontWeight: 600, textDecoration: 'underline' }}>You're Doctorat</span>
                </div>
            </div>

            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />

            {/* Timeline Area */}
            <div className="academic-timeline-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '2vw', maxHeight: '40vh', overflowY: 'auto', paddingRight: '0.8vw' }}>
                {phases.map((phase, index) => (
                    <div key={index} style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
                        {/* Dot & Line Indicator */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '3vw', position: 'relative' }}>
                            <div style={{
                                backgroundColor: phase.completed ? '#3457DC' : '#1e1e24',
                                padding: '0.8vw', borderRadius: '50%', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', zIndex: 2,
                                position: 'relative'
                            }}>
                                <img src={ComputerIcon} alt="phase" style={{ width: '1.1vw', height: '1.1vw' }} />
                            </div>
                            {index !== phases.length - 1 && (
                                <div style={{
                                    width: '2px', height: '6vh', backgroundColor: '#3457DC',
                                    position: 'absolute', top: '2.5vw', zIndex: 1
                                }} />
                            )}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2vw' }}>
                                <span style={{ fontSize: '0.85vw', color: '#a5a5b2', fontWeight: 500 }}>{phase.date}</span>
                                <span style={{ fontSize: '0.9vw', color: 'white', fontWeight: 400 }}>{phase.title}</span>
                            </div>
                            <div style={{
                                backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.8vh 1.5vw', borderRadius: '0.8vw',
                                color: 'white', fontSize: '0.85vw', fontWeight: 500, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                View Details
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <style dangerouslySetInnerHTML={{
                __html: `
                .academic-timeline-scroll::-webkit-scrollbar { width: 4px; }
                .academic-timeline-scroll::-webkit-scrollbar-thumb { background: #3457DC; border-radius: 10px; }
            `}} />
        </div>
    );
};

const UsersTrackTable = ({ records = [], selectedId, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeRowAction, setActiveRowAction] = useState(null);
    
    const dropdownRef = useRef(null);
    const rowActionRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (activeDropdown && dropdownRef.current && !dropdownRef.current.contains(e.target)) setActiveDropdown(null);
            if (activeRowAction && rowActionRef.current && !rowActionRef.current.contains(e.target)) setActiveRowAction(null);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeDropdown, activeRowAction]);

    const filterItemStyle = {
        backgroundColor: 'rgba(255,255,255,0.01)',
        borderRadius: '0.9vw', padding: '1.1vh 1.2vw',
        display: 'flex', alignItems: 'center', gap: '0.6vw',
        border: '1px solid #1e1d22', cursor: 'pointer', minWidth: '9vw'
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Accepted': return { color: '#27bdad', bg: 'rgba(39, 189, 173, 0.1)' };
            case 'Refused': return { color: '#eb5757', bg: 'rgba(235, 87, 87, 0.1)' };
            case 'In Progress': return { color: '#f29339', bg: 'rgba(242, 147, 57, 0.1)' };
            default: return { color: '#fff', bg: 'rgba(255, 255, 255, 0.05)' };
        }
    };

    const rowActionMenuStyle = {
        position: 'absolute', top: '100%', right: 0,
        backgroundColor: '#1e1e24', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '0.8vw', marginTop: '0.3vw', zIndex: 200,
        minWidth: 'max-content', padding: '0.4vw',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)'
    };

    const dropdownItemStyle = (isActive) => ({
        padding: '1vh 0.4vw', cursor: 'pointer', fontSize: '0.8vw',
        borderRadius: '0.5vw', color: isActive ? '#fff' : '#a5a5b2',
        backgroundColor: isActive ? '#3457DC' : 'transparent',
        transition: '0.2s', marginBottom: '2px'
    });

    return (
        <div style={{
            backgroundColor: '#151519', border: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '3vh 1.5vw 4vh 1.5vw', borderRadius: '1.2vw',
            display: 'flex', flexDirection: 'column', marginTop: '2vh'
        }}>
            {/* Controls */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '3vh' }} ref={dropdownRef}>
                <div style={{ ...filterItemStyle, flex: 1, minWidth: '15vw' }}>
                    <input type="text" placeholder="Search /" style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#f0f0f2', fontSize: '14px' }} />
                    <RiSearch2Line color="#3457DC" size="1.2vw" />
                </div>
                <div style={filterItemStyle} onClick={() => setActiveDropdown('sort')}>
                    <span style={{ fontSize: '14px', color: '#f0f0f2', flex: 1 }}>Newest first</span>
                    <img src={DropdownIcon} alt="arrow" style={{ width: '0.8vw' }} />
                </div>
                <div style={filterItemStyle} onClick={() => setActiveDropdown('status')}>
                    <span style={{ fontSize: '14px', color: '#f0f0f2', flex: 1 }}>Status</span>
                    <img src={DropdownIcon} alt="arrow" style={{ width: '0.8vw' }} />
                </div>
                <div style={filterItemStyle}>
                    <span style={{ fontSize: '14px', color: '#f0f0f2', flex: 1 }}>Range date</span>
                    <img src={CalendarIcon} alt="calendar" style={{ width: '1vw', marginRight: '0.3vw' }} />
                    <RiArrowDownSLine color="#3457DC" size="1.2vw" />
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <th style={{ padding: '1.5vh 0.5vw', width: '3vw' }}></th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Date & Time</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Document</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>University</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'center' }}>Status</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((row) => (
                            <tr key={row.id} 
                                onClick={() => onSelect(row.id)}
                                style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer', backgroundColor: selectedId === row.id ? 'rgba(255, 255, 255, 0.03)' : 'transparent', transition: '0.2s' }}
                            >
                                <td style={{ padding: '2.5vh 0.5vw' }}>
                                    <div style={{ width: '1.1vw', height: '1.1vw', borderRadius: '4px', border: selectedId === row.id ? 'none' : '1px solid #2a2a30', backgroundColor: selectedId === row.id ? '#3457DC' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {selectedId === row.id && <RiCheckLine color="white" size="0.8vw" />}
                                    </div>
                                </td>
                                <td style={{ padding: '2.5vh 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{row.dateTime}</td>
                                <td style={{ padding: '2.5vh 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{row.document}</td>
                                <td style={{ padding: '2.5vh 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{row.university}</td>
                                <td style={{ padding: '2.5vh 0.5vw', textAlign: 'center' }}>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        padding: '0.9vh 1.2vw', borderRadius: '100px', width: '8.5vw',
                                        fontSize: '0.75vw', backgroundColor: getStatusStyle(row.status).bg, color: getStatusStyle(row.status).color,
                                        fontWeight: 600
                                    }}>
                                        {row.status}
                                    </span>
                                </td>
                                <td style={{ padding: '2.5vh 0.5vw', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.2vw' }}>
                                        <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4vw' }}>
                                            <img src={DownloadIcon} alt="download" style={{ width: '1.2vw' }} />
                                            <span style={{ color: '#3457DC', fontSize: '0.85vw', fontWeight: 600 }}>Download</span>
                                        </button>
                                        <div style={{ position: 'relative' }}>
                                            <button 
                                                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                                                onClick={(e) => { e.stopPropagation(); setActiveRowAction(activeRowAction === row.id ? null : row.id); }}
                                            >
                                                <img src={DetailsIcon} alt="details" style={{ width: '1.8vw' }} />
                                            </button>
                                            {activeRowAction === row.id && (
                                                <div ref={rowActionRef} style={{ ...rowActionMenuStyle, top: '100%', right: '0' }}>
                                                    <div style={dropdownItemStyle(false)} onClick={() => setActiveRowAction(null)}>Accept degree</div>
                                                    <div style={dropdownItemStyle(false)} onClick={() => setActiveRowAction(null)}>Reject degree</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '4vh' }}>
                <div style={{ display: 'flex', gap: '12vw', alignItems: 'center' }}>
                    <button style={{ width: '2.4vw', height: '2.4vw', backgroundColor: '#3457DC', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <RiArrowLeftSLine color="#F7F7F7" size="1.2vw" />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2vw' }}>
                        <div style={{ border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1vh 0.6vw', backgroundColor: 'rgba(255,255,255,0.01)', minWidth: '2.5vw', textAlign: 'center' }}>
                            <span style={{ fontSize: '0.9vw', color: '#ffffff' }}>2</span>
                        </div>
                        <span style={{ fontSize: '0.95vw', color: '#80808a' }}>of 12</span>
                    </div>
                    <button style={{ width: '2.4vw', height: '2.4vw', backgroundColor: '#3457DC', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <RiArrowRightSLine color="#F7F7F7" size="1.2vw" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const UsersTrackManager = () => {
    const [selectedId, setSelectedId] = useState(1);
    
    const records = [
        { id: 1, dateTime: 'Avril 4 2026 – 14:23', document: 'Doctorat graduation', university: 'Blida 1', status: 'Accepted' },
        { id: 2, dateTime: 'Avril 4 2026 – 14:23', document: 'Engineering graduation', university: 'USTHB', status: 'Accepted' },
        { id: 3, dateTime: 'Avril 4 2026 – 14:23', document: 'Doctorat graduation', university: 'ensia', status: 'Refused' },
        { id: 4, dateTime: 'Avril 4 2026 – 14:23', document: 'Doctorat graduation', university: 'esi', status: 'In Progress' },
    ];

    const timelineData = {
        1: [
            { date: 'april 2026', title: 'Joining the team', completed: true },
            { date: 'april 16, 2026', title: 'P.h.d graduation', completed: false }
        ],
        2: [
            { date: 'sep 2025', title: 'Enrollment', completed: true },
            { date: 'Avril 4, 2026', title: 'Engineering Thesis', completed: true }
        ],
        // Adding defaults for others
        3: [{ date: 'Avril 4, 2026', title: 'Refusal Appeal', completed: false }],
        4: [{ date: 'Avril 4, 2026', title: 'Review in Progress', completed: false }]
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-[2vh]"
        >
            <UsersTrackTable 
                records={records} 
                selectedId={selectedId} 
                onSelect={setSelectedId} 
            />
            <UsersTrackTimeline 
                phases={timelineData[selectedId] || []} 
            />
        </motion.div>
    );
};

const Users = () => {
    const [activeTab, setActiveTab] = useState('Users list');

    const overviewStats = [
        {
            title: "Total users",
            value: "2,345",
            icon: <img src={TeamIcon} alt="Team" style={{ width: '1.25vw', height: '1.25vw', objectFit: 'contain' }} />
        },
        {
            title: "Publications",
            value: "200",
            icon: <img src={PublicationsIcon} alt="Publications" style={{ width: '1.25vw', height: '1.25vw', objectFit: 'contain' }} />
        },
        {
            title: "Projects",
            value: "7",
            icon: <img src={ProjectsIcon} alt="Projects" style={{ width: '1.25vw', height: '1.25vw', objectFit: 'contain' }} />
        },
        {
            title: "Growth ( views )",
            value: "342",
            icon: <img src={GrowthIcon} alt="Growth" style={{ width: '1.25vw', height: '1.25vw', objectFit: 'contain' }} />,
            growth: { label: "+10%", icon: TrendUpIcon }
        }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Users list':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-[2vh]"
                    >
                        {/* 4 Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1vw]">
                            {overviewStats.map((stat, index) => (
                                <StatCard
                                    key={index}
                                    title={stat.title}
                                    value={stat.value}
                                    icon={stat.icon}
                                    growth={stat.growth}
                                />
                            ))}
                        </div>

                        {/* Manage Users Table */}
                        <ManageUsersTable />
                    </motion.div>
                );
            case 'Users Publications':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <UsersPublicationsTable />
                    </motion.div>
                );
            case 'Users Track':
                return <UsersTrackManager />;
            default: return null;
        }
    };

    return (
        <div className="w-full text-white font-poppins pb-10">
            {/* Header with Tabs */}
            <div className="mb-[40px] mt-[10px]">
                {/* Tab Navigation - Pure Text Style with Underline */}
                <div className="flex gap-[30px] items-center pt-[0px] px-[0px] w-full">
                    <Tab
                        label="Users list"
                        isActive={activeTab === 'Users list'}
                        onClick={() => setActiveTab('Users list')}
                    />
                    <Tab
                        label="Users Publications"
                        isActive={activeTab === 'Users Publications'}
                        onClick={() => setActiveTab('Users Publications')}
                    />
                    <Tab
                        label="Users Track"
                        isActive={activeTab === 'Users Track'}
                        onClick={() => setActiveTab('Users Track')}
                    />
                </div>
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderTabContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Users;
