import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCheckLine, RiSearch2Line, RiArrowLeftSLine, RiArrowRightSLine, RiArrowDownSLine, RiInformationLine } from 'react-icons/ri';

// Assets
import TrashIcon from "@/assets/svg/LeaderDashboard/notification/trash 3.svg";
import EditIcon from "@/assets/svg/LeaderDashboard/notification/edit 2.svg";
import DropdownIcon from "@/assets/svg/userDashboard/PhdTracker/angle-small-down 1.svg";

const Tab = ({ label, isActive, onClick }) => {
    return (
        <div
            className="flex flex-col items-center justify-center cursor-pointer min-w-[100px] relative"
            onClick={onClick}
        >
            <div className="flex flex-col items-center w-fit relative" style={{ gap: '8px' }}>
                <p className={`font-poppins font-bold leading-[normal] not-italic text-[16px] whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#3457dc] scale-105' : 'text-[#a5a5b2] hover:text-[#f5f5f5]'}`}>
                    {label}
                </p>

                {isActive && (
                    <motion.div
                        layoutId="activeUnderlineManageContent"
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

const NewsGalleryTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const [newsData, setNewsData] = useState([
        { id: 1, added: 'July 25, 2025', createdBy: 'walid', team: 'A+ team', views: '200', checked: true },
        { id: 2, added: 'July 25, 2025', createdBy: 'walid', team: 'A+ team', views: '100', checked: false },
        { id: 3, added: 'July 25, 2025', createdBy: 'walid', team: 'A+ team', views: '1000', checked: false },
        { id: 4, added: 'July 25, 2025', createdBy: 'walid', team: 'A+ team', views: '600', checked: false },
    ]);

    const handleToggleRow = (id) => {
        setNewsData(prev => prev.map(n => n.id === id ? { ...n, checked: !n.checked } : n));
    };

    const filterItemStyle = {
        backgroundColor: 'rgba(255,255,255,0.01)',
        borderRadius: '0.9vw',
        padding: '1.1vh 1.2vw',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6vw',
        border: '1px solid #1e1d22',
        minWidth: '30vw'
    };

    return (
        <div style={{
            backgroundColor: '#151519',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '3vh 1.5vw 4vh 1.5vw',
            borderRadius: '1.2vw',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '2vh'
        }} className="animate-in fade-in duration-500">
            {/* 1. Header & Search */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3.5vh' }}>
                <div className="flex flex-col gap-1">
                    <h2 style={{ fontSize: '1.2vw', fontWeight: 600, color: 'white', margin: 0, fontFamily: 'Gilroy, sans-serif' }}>All News</h2>
                    <p style={{ color: '#a5a5b2', fontSize: '0.85vw', margin: 0 }}>Choose from your saved News, or create a new one.</p>
                </div>
                
                <div style={filterItemStyle}>
                    <input
                        type="text"
                        placeholder="Search /"
                        style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#f0f0f2', fontSize: '14px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <RiSearch2Line color="#3457DC" size="1.2vw" />
                </div>
            </div>

            {/* 2. Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <th style={{ padding: '1.5vh 0.5vw', width: '3vw' }}>
                                <div style={{ width: '1.1vw', height: '1.1vw', borderRadius: '4px', border: '1px solid #2a2a30', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    {/* Global Checkbox Placeholder */}
                                </div>
                            </th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Added</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Created by</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Team name</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                N Views <RiInformationLine size="14px" />
                            </th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsData.map((row) => (
                            <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', height: '8vh' }}>
                                <td style={{ padding: '0 0.5vw' }}>
                                    <div onClick={() => handleToggleRow(row.id)}
                                        style={{ width: '1.1vw', height: '1.1vw', borderRadius: '4px', border: row.checked ? 'none' : '1px solid #2a2a30', backgroundColor: row.checked ? '#3457DC' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                        {row.checked && <RiCheckLine color="white" size="0.8vw" />}
                                    </div>
                                </td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{row.added}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{row.createdBy}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'white' }}>{row.team}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{row.views}</td>
                                <td style={{ padding: '0 0.5vw', textAlign: 'right' }}>
                                    <div className="flex items-center justify-end gap-3">
                                        <button className="bg-transparent border-none cursor-pointer hover:scale-110 transition-transform">
                                            <img src={EditIcon} alt="edit" className="w-[1.2vw]" />
                                        </button>
                                        <button className="bg-transparent border-none cursor-pointer hover:scale-110 transition-transform">
                                            <img src={TrashIcon} alt="delete" className="w-[1.2vw]" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 3. Pagination Footer */}
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

const AddNewsForm = () => {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
            <div className="bg-[#151519] border border-white/[0.05] rounded-[16px] p-[24px] relative w-full">
                <div aria-hidden="true" className="absolute border border-[#1e1d22] border-solid inset-0 pointer-events-none rounded-[16px]" />
                
                <div className="content-stretch flex flex-col gap-[32px] items-start relative w-full">
                    {/* Header */}
                    <div className="w-full">
                        <p className="font-['Gilroy',sans-serif] font-bold leading-[normal] not-italic text-[18px] text-white">News & Galety Setup</p>
                    </div>

                    {/* Form Fields - Stacked */}
                    <div className="content-stretch flex flex-col gap-[20px] items-start w-full">
                        {/* Title */}
                        <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
                            <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[#80808a] text-[14px]">Ttitle</p>
                            <div className="bg-[rgba(255,255,255,0.01)] h-[45px] relative rounded-[8px] w-full border border-[#2a2a30] transition-all hover:border-white/10 focus-within:border-[#3457dc]">
                                <input 
                                    type="text"
                                    className="bg-transparent border-none outline-none size-full px-[14px] text-white font-['Poppins',sans-serif] text-[14px]"
                                    placeholder="Title"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
                            <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[#80808a] text-[14px]">Description</p>
                            <div className="bg-[rgba(255,255,255,0.01)] min-h-[150px] relative rounded-[8px] w-full border border-[#2a2a30] transition-all hover:border-white/10 focus-within:border-[#3457dc] p-[14px]">
                                <textarea 
                                    className="bg-transparent border-none outline-none w-full h-full text-white font-['Poppins',sans-serif] text-[14px] resize"
                                    placeholder="News Dscription .."
                                />
                            </div>
                        </div>

                        {/* Research Team Dropdown */}
                        <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
                            <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[#80808a] text-[14px]">Research Team</p>
                            <div className="bg-[rgba(255,255,255,0.01)] h-[45px] relative rounded-[8px] w-full border border-[#2a2a30] flex items-center justify-between px-[14px] cursor-pointer hover:bg-white/[0.02] transition-all">
                                <span className="font-['Poppins',sans-serif] text-white text-[14px]">A+ Team</span>
                                <img src={DropdownIcon} alt="arrow" className="w-[1.2vw] brightness-0 invert opacity-60" style={{ filter: 'invert(29%) sepia(87%) saturate(1917%) hue-rotate(219deg) brightness(97%) contrast(92%)' }} />
                            </div>
                        </div>

                        {/* Picture Preview - Now at the bottom */}
                        <div className="flex flex-col gap-[12px] w-full mt-[10px]">
                            <p className="font-['Poppins',sans-serif] leading-[normal] not-italic text-[#80808a] text-[14px]">choose Project picture :</p>
                            <div className="bg-[rgba(255,255,255,0.01)] h-[200px] relative rounded-[16px] w-full border border-[#2a2a30] overflow-hidden group">
                                {/* Action icons in top-right */}
                                <div className="absolute top-[16px] right-[16px] flex gap-[12px] z-10">
                                    <button className="bg-transparent border-none cursor-pointer hover:scale-110 transition-transform">
                                        <img src={EditIcon} alt="edit" className="w-[1.1vw]" />
                                    </button>
                                    <button className="bg-transparent border-none cursor-pointer hover:scale-110 transition-transform">
                                        <img src={TrashIcon} alt="delete" className="w-[1.1vw]" />
                                    </button>
                                </div>
                                <div className="size-full flex items-center justify-center">
                                    {/* Center icon removed */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button - Bottom Left */}
                    <div className="w-full flex justify-start mt-[10px]">
                        <button className="bg-[#3457dc] content-stretch flex items-center justify-center px-[32px] py-[14px] relative rounded-[16px] transition-all hover:bg-[#2a46b3] active:scale-95">
                            <p className="font-['Poppins',sans-serif] font-medium leading-[normal] not-italic text-[14px] text-white whitespace-nowrap">Publish</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ManageContent = () => {
    const [activeTab, setActiveTab] = useState('News & Gallery');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'News & Gallery':
                return <NewsGalleryTable />;
            case 'Add News':
                return <AddNewsForm />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full text-white font-poppins pb-10">
            {/* Header Tabs */}
            <div className="mb-[40px]">
                <div className="flex gap-[30px] items-center w-full">
                    <Tab 
                        label="News & Gallery" 
                        isActive={activeTab === 'News & Gallery'} 
                        onClick={() => setActiveTab('News & Gallery')} 
                    />
                    <Tab 
                        label="Add News" 
                        isActive={activeTab === 'Add News'} 
                        onClick={() => setActiveTab('Add News')} 
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
                    transition={{ duration: 0.2 }}
                >
                    {renderTabContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ManageContent;
