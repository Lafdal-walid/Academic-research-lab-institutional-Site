import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Asset Icons Imports ---
import TeamIcon from "@/assets/svg/userDashboard/Overview/users-alt (7) 1.svg";
import PublicationsIcon from "@/assets/svg/userDashboard/Overview/Vector.svg";
import ProjectsIcon from "@/assets/svg/userDashboard/Overview/Vector-1.svg";
import EngagementIcon from "@/assets/svg/userDashboard/Overview/dashboard (4) 1.svg";

const StatCard = ({ icon, title, value }) => {
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

            {/* Bottom Part: Value */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginTop: '0.3vh' }}>
                <h3 style={{ fontSize: '1.8vw', fontWeight: 500, color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
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

const PhdTracker = () => {
    const [activeTab, setActiveTab] = useState('Team Tracker');

    const overviewStats = [
        { 
            title: "Team Manager", 
            value: "1", 
            icon: <img src={TeamIcon} alt="Team" style={{ width: '1.25vw', height: '1.25vw', objectFit: 'contain' }} /> 
        },
        { 
            title: "Ph.D Professor", 
            value: "5", 
            icon: <img src={TeamIcon} alt="Team" style={{ width: '1.25vw', height: '1.25vw', objectFit: 'contain' }} /> 
        },
        { 
            title: "Professor", 
            value: "4", 
            icon: <img src={TeamIcon} alt="Team" style={{ width: '1.25vw', height: '1.25vw', objectFit: 'contain' }} /> 
        },
        { 
            title: "Engineering Graduate", 
            value: "2", 
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
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1vw]"
                        >
                            {overviewStats.map((stat, index) => (
                                <StatCard 
                                    key={index} 
                                    title={stat.title} 
                                    value={stat.value} 
                                    icon={stat.icon}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="your"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Your Track content will go here */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PhdTracker;
