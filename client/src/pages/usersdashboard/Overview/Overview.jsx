import React, { useMemo, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

// --- Asset Icons Imports ---
import TeamIcon from "@/assets/svg/userDashboard/Overview/users-alt (7) 1.svg";
import PublicationsIcon from "@/assets/svg/userDashboard/Overview/Vector.svg";
import ProjectsIcon from "@/assets/svg/userDashboard/Overview/Vector-1.svg";
import EngagementIcon from "@/assets/svg/userDashboard/Overview/dashboard (4) 1.svg";
import InfoIcon from "@/assets/svg/userDashboard/Overview/info_(1)_5.svg";
import ScienceIcon from "@/assets/svg/userDashboard/Overview/science.png";
import Project1Img from "@/assets/svg/userDashboard/Overview/images (1) 1.svg";
import API_BASE_URL from '@/config';

// --- SVGs Icons ---
const ArrowUpIcon = ({ width = 24, height = 24, fill = "#00CBB1" }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.293 9.46501L9.879 5.87901C10.1576 5.60038 10.4883 5.37935 10.8523 5.22856C11.2163 5.07776 11.6065 5.00015 12.0005 5.00015C12.3945 5.00015 12.7847 5.07776 13.1487 5.22856C13.5127 5.37935 13.8434 5.60038 14.122 5.87901L17.707 9.46501L17.731 9.49001C17.8263 9.58357 17.9019 9.69528 17.9534 9.81854C18.0048 9.9418 18.031 10.0741 18.0305 10.2077C18.03 10.3412 18.0027 10.4733 17.9502 10.5962C17.8978 10.719 17.8213 10.8301 17.7252 10.9229C17.6292 11.0157 17.5155 11.0883 17.3909 11.1364C17.2663 11.1846 17.1334 11.2073 16.9999 11.2032C16.8664 11.1991 16.735 11.1683 16.6136 11.1126C16.4922 11.0569 16.3832 10.9775 16.293 10.879L13 7.58601L13.007 18C13.007 18.2652 12.9016 18.5196 12.7141 18.7071C12.5266 18.8947 12.2722 19 12.007 19C11.7418 19 11.4874 18.8947 11.2999 18.7071C11.1124 18.5196 11.007 18.2652 11.007 18L11 7.58701L7.707 10.879C7.61475 10.9745 7.50441 11.0507 7.38241 11.1031C7.2604 11.1555 7.12918 11.1831 6.9964 11.1843C6.86362 11.1854 6.73194 11.1601 6.60905 11.1098C6.48615 11.0595 6.3745 10.9853 6.28061 10.8914C6.18671 10.7975 6.11246 10.6859 6.06218 10.563C6.0119 10.4401 5.9866 10.3084 5.98775 10.1756C5.9889 10.0428 6.01649 9.91161 6.0689 9.7896C6.12131 9.6676 6.19749 9.55725 6.293 9.46501Z" fill={fill} />
    </svg>
);

const AngleSmallDown = ({ color = "#3457DC" }) => (
    <svg width="1.1vw" height="1.1vw" viewBox="0 0 20 20" fill="none">
        <path d="M5 7.5L10 12.5L15 7.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// --- StatCard Component ---
const LocalStatCard = ({ icon, title, value, subValue, width = '100%' }) => {
    return (
        <div style={{
            width: width,
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
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'baseline', justifyContent: 'start', marginTop: '0.3vh', gap: '0.4vw' }}>
                <h3 style={{ fontSize: '1.8vw', fontWeight: 500, color: 'white', margin: 0 }}>
                    {value}
                </h3>
                {subValue && (
                    <span style={{ fontSize: '0.9vw', fontWeight: 400, color: '#A5A5B2', fontFamily: "'Poppins', sans-serif" }}>
                        {subValue}
                    </span>
                )}
            </div>
        </div>
    );
};

// --- ActivePlans Component ---
const ActivePlans = ({ language = 'en', projectStats }) => {
    const { t } = useTranslation('overview');
    const { t: tc } = useTranslation('common');
    const [statsMode, setStatsMode] = useState("M");
    const [currentDate, setCurrentDate] = useState(new Date(2026, 3)); // Starting at April 2026

    const today = new Date(2026, 3); // Capping at April 2026 (User's current system date)

    const months = [
        tc('january'), tc('february'), tc('march'), tc('april'),
        tc('may'), tc('june'), tc('july'), tc('august'),
        tc('september'), tc('october'), tc('november'), tc('december')
    ];

    const displayMonth = months[currentDate.getMonth()];
    const displayYear = currentDate.getFullYear();

    const isCurrentMonth = currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth();

    const handleNextDate = () => {
        if (!isCurrentMonth) {
            setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
        }
    };

    const handlePrevDate = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
    };

    const data = {
        total: projectStats?.total || 0,
        trend: `${projectStats?.avgProgress || 0}%`,
        plans: [
            { label: t('completed'), count: projectStats?.completed || 0, color: "#F4C63D" },
            { label: t('closedCanceled'), count: projectStats?.canceled || 0, color: "#3457DC" },
            { label: t('inProgress'), count: projectStats?.ongoing || 0, color: "#11CFC3" },
        ]
    };

    const size = 320;
    const center = size / 2;
    const radius = 135;
    const strokeWidth = 34;
    const circumference = 2 * Math.PI * radius;

    const activePlans = useMemo(() => data.plans.filter(p => p.count > 0), [data.plans]);

    const segments = useMemo(() => {
        let currentOffset = 0;
        const totalGap = activePlans.length > 1 ? (18 * activePlans.length) : 0;
        const availableCircumference = 360 - totalGap;
        return activePlans.map((plan, index) => {
            const percentage = data.total > 0 ? (plan.count / data.total) : 0;
            const segmentAngle = percentage * availableCircumference;
            const dashLength = (segmentAngle / 360) * circumference;
            const offset = circumference - dashLength;
            const startRotation = currentOffset - 90;
            currentOffset += segmentAngle + (activePlans.length > 1 ? 18 : 0);
            return { ...plan, dashOffset: offset, rotation: startRotation };
        });
    }, [activePlans, data.total, circumference]);

    return (
        <div 
            className="active-plans-container"
            style={{
            backgroundColor: '#151519',
            borderRadius: '1.5vw',
            padding: '1.8vw',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            fontFamily: "'Poppins', sans-serif",
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: 'white'
        }}>
            {/* Header: Project Hub + Date/Mode Toggles */}
            <div 
                className="active-plans-header"
                style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5vw',
                flexWrap: 'wrap',
                gap: '1vw',
                direction: language === 'ar' ? 'rtl' : 'ltr'
            }}>
                <h4 
                    className="project-hub-title"
                    style={{ fontSize: '1.1vw', fontWeight: 600, color: 'white', margin: 0, fontFamily: "'Poppins', sans-serif" }}>
                    {t('projectHub')}
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8vw' }}>
                    {/* Date Toggle Box */}
                    <div 
                        className="date-toggle-box"
                        style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#1E1E24',
                        borderRadius: '0.6vw',
                        height: '4.72vh', // Increased by 5%
                        padding: '0 0.8vw',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        minWidth: '10.5vw' // Increased by 5%
                    }}>
                        <button
                            onClick={language === 'ar' ? handleNextDate : handlePrevDate}
                            className="flex items-center justify-center rotate-90 hover:brightness-150 transition-all"
                        >
                            <AngleSmallDown color="#3457DC" />
                        </button>
                        <span 
                            className="date-display-text"
                            style={{ color: 'white', fontSize: '0.75vw', fontWeight: 500, fontFamily: "'Poppins', sans-serif", minWidth: '6.3vw', textAlign: 'center' }}>
                            {displayMonth}, {displayYear}
                        </span>
                        <button
                            disabled={isCurrentMonth}
                            onClick={language === 'ar' ? handlePrevDate : handleNextDate}
                            style={{ opacity: isCurrentMonth ? 0.3 : 1, cursor: isCurrentMonth ? 'default' : 'pointer' }}
                            className="flex items-center justify-center -rotate-90 hover:brightness-150 transition-all"
                        >
                            <AngleSmallDown color={isCurrentMonth ? "#373735" : "#3457DC"} />
                        </button>
                    </div>

                    {/* Y/M Toggle */}
                    <div className="bg-[#1e1e24] flex h-[4.72vh] items-center relative rounded-[0.7vw] shrink-0 p-[0.3vh] stats-mode-container">
                        <button
                            onClick={() => setStatsMode("Y")}
                            className={`flex h-full items-center justify-center px-[0.7vw] relative rounded-[0.5vw] transition-all stats-mode-btn ${statsMode === "Y" ? 'bg-white/5 text-[#3457dc]' : 'text-white/60'}`}
                        >
                            <p className="font-poppins text-[0.85vw] font-bold">Y</p>
                        </button>
                        <button
                            onClick={() => setStatsMode("M")}
                            className={`flex h-full items-center justify-center px-[0.7vw] relative rounded-[0.5vw] transition-all stats-mode-btn ${statsMode === "M" ? 'bg-white/5 text-[#3457dc]' : 'text-white/60'}`}
                        >
                            <p className="font-poppins text-[0.85vw] font-bold">M</p>
                        </button>
                    </div>
                </div>
            </div>

            {/* Separator Line */}
            <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.05)', marginBottom: '2.5vw' }}></div>

            {/* Donut Chart */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div 
                    className="chart-container-donut"
                    style={{ position: 'relative', width: '100%', maxWidth: '18vw', aspectRatio: '1/1' }}>
                    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', height: '100%', transform: language === 'ar' ? 'scaleX(-1)' : 'none' }}>
                        {segments.map((segment, index) => (
                            <circle
                                key={index}
                                cx={center}
                                cy={center}
                                r={radius}
                                stroke={segment.color}
                                strokeWidth={strokeWidth}
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={segment.dashOffset}
                                style={{
                                    transition: 'stroke-dashoffset 1s ease-in-out',
                                    transform: `rotate(${segment.rotation}deg)`,
                                    transformOrigin: 'center'
                                }}
                            />
                        ))}
                        <g style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none', transformOrigin: 'center' }}>
                            <text x="50%" y="47%" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="700" className="chart-total-value" style={{ fontFamily: 'Poppins' }}>{data.total}</text>
                            <text x="50%" y="56%" textAnchor="middle" fill="#A5A5B2" fontSize="14" fontWeight="400" className="chart-label-text" style={{ fontFamily: 'Poppins' }}>{t('total')}</text>
                            <text x="50%" y="63%" textAnchor="middle" fill="#A5A5B2" fontSize="14" fontWeight="400" className="chart-label-text" style={{ fontFamily: 'Poppins' }}>{t('projects')}</text>
                        </g>
                    </svg>
                </div>

                {/* Legend */}
                <div 
                    className="legend-container"
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.1vw', marginTop: '2vw' }}>
                    {data.plans.map(plan => (
                        <div key={plan.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6vw' }}>
                            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '8px', minHeight: '8px', borderRadius: '50%', backgroundColor: plan.color }}></div>
                            <span 
                                className="legend-label-span"
                                style={{ fontSize: '0.9vw', fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}>{plan.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Trend */}
            <div 
                className="trend-footer"
                style={{
                marginTop: '2vw',
                paddingTop: '1.5vw',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '1vw',
                direction: language === 'ar' ? 'rtl' : 'ltr'
            }}>
                <div 
                    className="trend-icon-circle"
                    style={{
                    width: '2.5vw', height: '2.5vw', minWidth: '32px', minHeight: '32px', borderRadius: '50%',
                    backgroundColor: 'rgba(52, 87, 220, 0.12)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <ArrowUpIcon width="1.8vw" height="1.8vw" fill="#3457DC" />
                </div>
                 <p style={{ margin: 0, fontSize: '0.9vw', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5vw', fontFamily: "'Poppins', sans-serif" }}>
                    <span 
                        className="trend-percentage-span"
                        style={{ fontSize: '1.2vw', fontWeight: 700, color: '#ffffff' }}>{data.trend}</span>
                    <span 
                        className="trend-text-span"
                        style={{ fontWeight: 400, marginLeft: '0.95vw' }}>{t('institutionalProgress')}</span>
                </p>
            </div>
        </div>
    );
};


// --- LastProjects Component ---
const LastProjects = ({ language = 'en', style = {}, data = [] }) => {
    const { t } = useTranslation('overview');
    const { t: tc } = useTranslation('common');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const projects = data.map(p => {
        let completLabel = tc('pending');
        let approvalLabel = tc('review');
        if (p.status === 'Completed') { completLabel = tc('done'); approvalLabel = tc('approved'); }
        if (p.status === 'Suspended') { completLabel = tc('canceled'); approvalLabel = tc('denied'); }
        if (p.status === 'Ongoing') { completLabel = tc('active'); approvalLabel = tc('processing'); }

        return {
            id: p._id,
            name: p.title,
            date: new Date(p.createdAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US'),
            complet: completLabel,
            approval: approvalLabel,
            img: p.imageUrl ? `${API_BASE_URL}${p.imageUrl}` : Project1Img
        };
    });

    const totalPages = Math.ceil(projects.length / itemsPerPage) || 1;
    const paginatedProjects = projects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="bg-[#151519] flex flex-col relative last-project-container" style={{ padding: '2.22vh 1.25vw', borderRadius: '0.83vw', width: '100%', border: '1px solid #1E1D22', fontFamily: "'Poppins', sans-serif", ...style }}>
            <div className="flex items-center justify-between w-full mb-[2.22vh]" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                <p className="font-bold text-white whitespace-nowrap last-project-header-title" style={{ fontSize: '0.91vw' }}>{t('lastProjects')}</p>
                <div className="flex flex-col items-start justify-center relative shrink-0 last-project-search-container" style={{ width: '10.73vw' }}>
                    <div className="bg-[#1e1e24] relative shrink-0 w-full" style={{ borderRadius: '0.83vw' }}>
                        <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex items-center justify-between relative w-full" style={{ padding: '0.93vh 0.83vw' }}>
                                <p className="text-[#a5a5b2] whitespace-nowrap" style={{ fontSize: '0.8vw' }}>{t('search')}</p>
                                <div className="relative shrink-0" style={{ width: '1.04vw', height: '1.04vw' }}>
                                    <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 20 20">
                                        <g id="search-normal">
                                            <path d="M9.58333 17.5C13.9556 17.5 17.5 13.9556 17.5 9.58333C17.5 5.21108 13.9556 1.66667 17.5 9.58333C17.5 5.21108 13.9556 1.66667 9.58333 1.66667C5.21108 1.66667 1.66667 5.21108 1.66667 9.58333C1.66667 13.9556 5.21108 17.5 9.58333 17.5Z" stroke="#3457DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                            <path d="M18.3333 18.3333L16.6667 16.6667" stroke="#3457DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between w-full mb-[1.48vh]" style={{ height: '1.94vh', direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                <div className="flex flex-col items-start justify-center relative shrink-0" style={{ width: '12.92vw' }}>
                    <p className="text-[#80808a] last-project-header-text" style={{ fontSize: '0.8vw' }}>{t('name')}</p>
                </div>
                <div className="flex flex-[1_0_0] flex-col items-center justify-center relative">
                    <p className="text-[#80808a] text-center w-full last-project-header-text" style={{ fontSize: '0.8vw' }}>{t('completion')}</p>
                </div>
                <div className="flex flex-[1_0_0] flex-col items-start relative">
                    <p className="text-[#80808a] text-center w-full last-project-header-text" style={{ fontSize: '0.8vw' }}>{t('approval')}</p>
                </div>
            </div>

            <div className="w-full mb-[1.48vh]" style={{ height: '1px', backgroundColor: '#1E1D22' }} />

            <div className="flex flex-col items-start w-full" style={{ gap: '2.22vh', direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                {paginatedProjects.map((project) => (
                    <div key={project.id} className="flex items-center w-full">
                        <div className="relative shrink-0 last-project-img-container" style={{ width: '1.72vw', height: '4.72vh', borderRadius: '0.21vw', backgroundColor: '#2a2a30', overflow: 'hidden' }}>
                            <img src={project.img} alt={project.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center relative shrink-0 ml-[1vw] last-project-name-container" style={{ width: '11.92vw' }}>
                            <div className="flex flex-col items-start leading-[normal] relative shrink-0 whitespace-pre-wrap" style={{ gap: '0.56vh' }}>
                                <p className="text-white font-bold last-project-name" style={{ fontSize: '0.91vw' }}>{project.name}</p>
                                <p className="text-[#a5a5b2] last-project-date" style={{ fontSize: '0.69vw' }}>{project.date}</p>
                            </div>
                        </div>
                        <div className="flex flex-[1_0_0] items-center justify-between relative">
                            <div className="flex flex-[1_0_0] flex-col items-center justify-center relative">
                                <p className="text-center text-white w-full last-project-status-text" style={{ fontSize: '0.8vw' }}>{project.complet}</p>
                            </div>
                            <div className="flex flex-[1_0_0] flex-col items-start relative">
                                <p className="text-center text-white w-full last-project-status-text" style={{ fontSize: '0.8vw' }}>{project.approval}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full mt-[1.48vh] mb-[2.22vh]" style={{ height: '1px', backgroundColor: '#1E1D22' }} />

            <div className="flex items-center justify-between w-full" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                <div onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="flex items-center justify-center relative shrink-0 cursor-pointer hover:brightness-150 transition-all last-project-pagination-btn">
                    <div className={language === 'ar' ? "" : "-scale-y-100 rotate-180"}>
                        <div className="relative" style={{ width: '1.67vw', height: '1.67vw' }}>
                            <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 32 32">
                                <path d="M0 16C0 19.1645 0.938384 22.2579 2.69649 24.8891C4.45459 27.5203 6.95345 29.5711 9.87706 30.7821C12.8007 31.9931 16.0177 32.3099 19.1214 31.6926C22.2251 31.0752 25.0761 29.5513 27.3137 27.3137C29.5513 25.0761 31.0752 22.2251 31.6926 19.1214C32.3099 16.0177 31.9931 12.8007 30.7821 9.87706C29.5711 6.95345 27.5203 4.45459 24.8891 2.69649C22.2579 0.938384 19.1645 0 16 0C11.7579 0.00458811 7.69095 1.69177 4.69136 4.69136C1.69177 7.69095 0.00458811 11.7579 0 16ZM21.3333 16C21.3343 16.976 20.9776 17.9185 20.3307 18.6493C19.9427 19.0853 19.5653 19.4987 19.2947 19.7693L15.5293 23.6C15.4088 23.7332 15.2625 23.8406 15.0994 23.9158C14.9363 23.9911 14.7597 24.0326 14.5801 24.0378C14.4006 24.0431 14.2218 24.0121 14.0546 23.9465L17.4 17.8933C17.6493 17.6427 17.988 17.2693 18.3333 16.8813C18.5482 16.6378 18.6667 16.3241 18.6667 15.9993C18.6667 15.6745 18.5482 15.3609 18.3333 15.1173L17.4093 14.1147L13.628 10.2667L19.3013 12.2387C19.568 12.5053 19.9413 12.9147 20.3267 13.3493C20.9757 14.0797 21.3339 15.0229 21.3333 16Z" fill="#3457DC" />
                                <path d="M21.3333 16C21.3343 15.024 20.9776 14.0815 20.3307 13.3507C19.9427 12.9147 19.5653 12.5013 19.2947 12.2307L15.5293 8.4C15.4088 8.26685 15.2625 8.15942 15.0994 8.08418C14.9363 8.00894 14.7597 7.96743 14.5801 7.96215C14.4006 7.95687 14.2218 7.98793 14.0546 8.05346C13.8873 8.11898 13.735 8.21763 13.6068 8.34347C13.4787 8.46931 13.3772 8.61976 13.3086 8.78578C13.2401 8.95179 13.2057 9.12996 13.2077 9.30958C13.2097 9.4892 13.2479 9.66656 13.3201 9.83103C13.3924 9.9955 13.4971 10.1437 13.628 10.2667L17.4 14.1067C17.6493 14.3573 17.988 14.7307 18.3333 15.1187C18.5482 15.3622 18.6667 15.6759 18.6667 16.0007C18.6667 16.3255 18.5482 16.6391 18.3333 16.8827C17.9893 17.2693 17.6507 17.6427 17.4093 17.8853L13.628 21.7333C13.4971 21.8563 13.3924 22.0045 13.3201 22.169C13.2479 22.3334 13.2097 22.5108 13.2077 22.6904C13.2057 22.87 13.2401 23.0482 13.3086 23.2142C13.3772 23.3802 13.4787 23.5307 13.6068 23.6565Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex items-center" style={{ gap: '0.52vw' }}>
                    <div className="bg-[rgba(255,255,255,0.01)] flex flex-col items-center justify-center relative last-project-pagination-box" style={{ padding: '0.41vh 0.23vw', borderRadius: '0.46vw', width: '1.95vw', border: '1px solid #1e1d22' }}>
                        <p className="text-center text-white w-full last-project-pagination-text" style={{ fontSize: '0.88vw' }}>{currentPage.toString().padStart(2, '0')}</p>
                    </div>
                    <p className="text-[#a5a5b2] whitespace-nowrap out-of-text" style={{ fontSize: '0.76vw' }}>
                        {t('outOf')} {totalPages}
                    </p>
                </div>
                <div onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className="flex items-center justify-center relative shrink-0 cursor-pointer hover:brightness-150 transition-all last-project-pagination-btn">
                    <div className={language === 'ar' ? "-scale-y-100 rotate-180" : ""}>
                        <div className="relative" style={{ width: '1.67vw', height: '1.67vw' }}>
                            <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 32 32">
                                <path d="M0 16C0 19.1645 0.938384 22.2579 2.69649 24.8891C4.45459 27.5203 6.95345 29.5711 9.87706 30.7821C12.8007 31.9931 16.0177 32.3099 19.1214 31.6926C22.2251 31.0752 25.0761 29.5513 27.3137 27.3137C29.5513 25.0761 31.0752 22.2251 31.6926 19.1214C32.3099 16.0177 31.9931 12.8007 30.7821 9.87706C29.5711 6.95345 27.5203 4.45459 24.8891 2.69649C22.2579 0.938384 19.1645 0 16 0C11.7579 0.00458811 7.69095 1.69177 4.69136 4.69136C1.69177 7.69095 0.00458811 11.7579 0 16ZM21.3333 16C21.3343 16.976 20.9776 17.9185 20.3307 18.6493C19.9427 19.0853 19.5653 19.4987 19.2947 19.7693L15.5293 23.6C15.4088 23.7332 15.2625 23.8406 15.0994 23.9158C14.9363 23.9911 14.7597 24.0326 14.5801 24.0378C14.4006 24.0431 14.2218 24.0121 14.0546 23.9465L17.4 17.8933C17.6493 17.6427 17.988 17.2693 18.3333 16.8813C18.5482 16.6378 18.6667 16.3241 18.6667 15.9993C18.6667 15.6745 18.5482 15.3609 18.3333 15.1173L17.4093 14.1147L13.628 10.2667L19.3013 12.2387C19.568 12.5053 19.9413 12.9147 20.3267 13.3493C20.9757 14.0797 21.3339 15.0229 21.3333 16Z" fill="#3457DC" />
                                <path d="M21.3333 16C21.3343 15.024 20.9776 14.0815 20.3307 13.3507C19.9427 12.9147 19.5653 12.5013 19.2947 12.2307L15.5293 8.4C15.4088 8.26685 15.2625 8.15942 15.0994 8.08418C14.9363 8.00894 14.7597 7.96743 14.5801 7.96215C14.4006 7.95687 14.2218 7.98793 14.0546 8.05346C13.8873 8.11898 13.735 8.21763 13.6068 8.34347C13.4787 8.46931 13.3772 8.61976 13.3086 8.78578C13.2401 8.95179 13.2057 9.12996 13.2077 9.30958C13.2097 9.4892 13.2479 9.66656 13.3201 9.83103C13.3924 9.9955 13.4971 10.1437 13.628 10.2667L17.4 14.1067C17.6493 14.3573 17.988 14.7307 18.3333 15.1187C18.5482 15.3622 18.6667 15.6759 18.6667 16.0007C18.6667 16.3255 18.5482 16.6391 18.3333 16.8827C17.9893 17.2693 17.6507 17.6427 17.4093 17.8853L13.628 21.7333C13.4971 21.8563 13.3924 22.0045 13.3201 22.169C13.2479 22.3334 13.2097 22.5108 13.2077 22.6904C13.2057 22.87 13.2401 23.0482 13.3086 23.2142C13.3772 23.3802 13.4787 23.5307 13.6068 23.6565Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LastPublication = ({ language = 'en', data, avgViews = 0 }) => {
    const { t } = useTranslation('overview');

    const title = data?.title || t('noRecentPub');
    const date = data ? new Date(data.createdAt).toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US') : '';

    return (
        <div className="last-pub-container" style={{
            backgroundColor: '#151519',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            position: 'relative',
            gap: '3.05vh',
            padding: '3.05vh 1.375vw',
            borderRadius: '0.91vw',
            border: '1px solid #1E1D22',
            width: '100%',
            fontFamily: "'Poppins', sans-serif"
        }}>
            <div className="flex items-center justify-between w-full">
                <p className="text-white font-bold last-pub-header-title" style={{ fontSize: '0.91vw' }}>
                    {t('lastPublication')}
                </p>
            </div>

            <div className="w-full" style={{ height: '1px', backgroundColor: '#1E1D22' }} />

            <div className="flex items-center w-full" style={{ gap: '1.375vw' }}>
                <div className="flex items-center justify-center bg-[#1E1E24] rounded-[0.52vw] last-pub-img-container" style={{ width: '3.6vw', height: '10.58vh', overflow: 'hidden' }}>
                    <img
                        src={data?.project?.imageUrl ? `${API_BASE_URL}${data.project.imageUrl}` : ScienceIcon}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        alt="Thumbnail"
                    />
                </div>
                <div className="flex flex-col flex-1" style={{ gap: '0.91vw' }}>
                    <div className="flex items-start last-pub-title-container" style={{ gap: '0.91vw' }}>
                        <p className="font-bold text-[#f5f5f5] last-pub-title" style={{ fontSize: '0.91vw', lineHeight: '1.375' }}>
                            {title}
                        </p>
                        <p className="text-[#a5a5b2] last-pub-date" style={{ fontSize: '0.8vw' }}>
                            {date}
                        </p>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center" style={{ gap: '2.75vw' }}>
                            <p className="text-white font-medium last-pub-stats-label" style={{ fontSize: '0.8vw' }}>{t('views')}</p>
                            <div className="bg-[#1e1e24] flex items-center justify-center rounded-full px-2" style={{ height: '2vw', minHeight: '20px' }}>
                                <p className="text-white last-pub-stats-value" style={{ fontSize: '0.8vw' }}>{data?.views || 0}</p>
                            </div>
                        </div>
                        <div className="flex items-center" style={{ gap: '2.75vw' }}>
                            <p className="text-white font-medium last-pub-stats-label" style={{ fontSize: '0.8vw' }}>{t('avgViews')}</p>
                            <div className="bg-[#043d37] flex items-center justify-center rounded-full px-2" style={{ height: '2vw', minHeight: '20px' }}>
                                <p className="text-[#01cbb1] last-pub-stats-value" style={{ fontSize: '0.69vw' }}>{avgViews}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- PublicationsAnalysis Component ---
const PublicationsAnalysis = ({ language = 'en', data = [], avg = 0, currentPeriod = 6 }) => {
    const { t } = useTranslation('overview');
    const { t: tc } = useTranslation('common');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedBar, setSelectedBar] = useState(0);

    const periods = { 
        3: t('last3Months'), 
        6: t('last6Months'), 
        12: t('lastYear') 
    };

    const maxCount = Math.max(...data.map(d => d.count), 1);
    const barData = data.map(d => ({
        h: 100 - ((d.count / maxCount) * 80), // Scaling height, 80% max for padding
        value: d.count
    }));

    return (
        <div className="bg-[#151519] flex flex-col relative pub-analysis-container" style={{ padding: '2.78vh 1.25vw', borderRadius: '0.83vw', width: '100%', border: '1px solid #1E1D22', fontFamily: "'Poppins', sans-serif" }}>
            {/* Header */}
            <div className="flex items-center justify-between w-full mb-[3.13vh]" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                <div className="flex flex-col items-start justify-center" style={{ gap: '0.93vh' }}>
                    <p className="font-bold text-white pub-analysis-title" style={{ fontSize: '0.91vw' }}>
                        {t('publications')}
                    </p>
                    <p className="text-[#a5a5b2] pub-analysis-subtitle" style={{ fontSize: '0.8vw' }}>
                        {avg} {t('publications')} ( {t('monthlyAvg')} )
                    </p>
                </div>
                <div className="relative">
                    <div 
                        className="bg-[#1e1e24] flex items-center relative cursor-pointer hover:bg-[#2a2a30] transition-colors pub-analysis-period-btn" 
                        style={{ gap: '0.625vw', padding: '1.16vh 0.83vw', borderRadius: '0.625vw' }}
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <div className="flex items-center justify-center -rotate-90 -scale-y-100" style={{ width: '1.04vw', height: '1.04vw' }}>
                            <svg className="size-full" fill="none" viewBox="0 0 20 20">
                                <path d="M15.8842 6.545C15.7681 6.42884 15.6302 6.3367 15.4785 6.27383C15.3268 6.21096 15.1642 6.1786 15 6.1786C14.8358 6.1786 14.6732 6.21096 14.5215 6.27383C14.3698 6.3367 14.2319 6.42884 14.1158 6.545L10.2942 10.3658C10.216 10.4439 10.1101 10.4878 9.99958 10.4878C9.8891 10.4878 9.78314 10.4439 9.705 10.3658L5.88417 6.545C5.64978 6.3105 5.33184 6.17872 5.00029 6.17864C4.66875 6.17857 4.35075 6.3102 4.11625 6.54458C3.88175 6.77897 3.74997 7.09691 3.74989 7.42846C3.74982 7.76 3.88145 8.078 4.11583 8.3125L7.9375 12.1342C8.20834 12.405 8.52989 12.6199 8.88377 12.7665C9.23766 12.9131 9.61695 12.9885 10 12.9885C10.383 12.9885 10.7623 12.9131 11.1162 12.7665C11.4701 12.6199 11.7917 12.405 12.0625 12.1342L15.8842 8.3125C16.1185 8.07809 16.2502 7.76021 16.2502 7.42875C16.2502 7.0973 16.1185 6.77941 15.8842 6.545Z" fill="#3457DC" />
                            </svg>
                        </div>
                        <p className="text-white whitespace-nowrap" style={{ fontSize: '0.8vw' }}>
                            {periods[currentPeriod] || periods[6]}
                        </p>
                        <div className="flex items-center justify-center -rotate-90" style={{ width: '1.04vw', height: '1.04vw' }}>
                            <svg className="size-full" fill="none" viewBox="0 0 20 20">
                                <path d="M15.8842 6.545C15.7681 6.42884 15.6302 6.3367 15.4785 6.27383C15.3268 6.21096 15.1642 6.1786 15 6.1786C14.8358 6.1786 14.6732 6.21096 14.5215 6.27383C14.3698 6.3367 14.2319 6.42884 14.1158 6.545L10.2942 10.3658C10.216 10.4439 10.1101 10.4878 9.99958 10.4878C9.8891 10.4878 9.78314 10.4439 9.705 10.3658L5.88417 6.545C5.64978 6.3105 5.33184 6.17872 5.00029 6.17864C4.66875 6.17857 4.35075 6.3102 4.11625 6.54458C3.88175 6.77897 3.74997 7.09691 3.74989 7.42846C3.74982 7.76 3.88145 8.078 4.11583 8.3125L7.9375 12.1342C8.20834 12.405 8.52989 12.6199 8.88377 12.7665C9.23766 12.9131 9.61695 12.9885 10 12.9885C10.383 12.9885 10.7623 12.9131 11.1162 12.7665C11.4701 12.6199 11.7917 12.405 12.0625 12.1342L15.8842 8.3125C16.1185 8.07809 16.2502 7.76021 16.2502 7.42875C16.2502 7.0973 16.1185 6.77941 15.8842 6.545Z" fill="#3457DC" />
                            </svg>
                        </div>
                    </div>

                    {showDropdown && (
                        <div className="absolute top-full right-0 mt-2 w-full bg-[#1e1e24] border border-[#2a2a30] rounded-[0.625vw] shadow-xl z-50 overflow-hidden">
                            {[3, 6, 12].map(p => (
                                <div 
                                    key={p} 
                                    className="px-[0.83vw] py-[1vh] hover:bg-white/5 cursor-pointer text-white text-[0.8vw]"
                                    onClick={() => {
                                        window.dispatchEvent(new CustomEvent('changePubPeriod', { detail: p }));
                                        setShowDropdown(false);
                                    }}
                                >
                                    {periods[p]}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Chart Area */}
            <div className="w-full relative" style={{ height: '30.33vh' }}>
                <div className="absolute inset-0 flex flex-col justify-between" style={{ paddingTop: '0.7vh', paddingBottom: '0.7vh' }}>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} style={{ width: '100%', height: '1px', backgroundColor: i === 5 ? '#1E1E24' : 'transparent' }} />
                    ))}
                </div>
                <div className="absolute inset-0 flex items-end" style={{ padding: '0 0.83vw' }}>
                    {barData.map((data, i) => (
                        <div
                            key={i}
                            className="flex-1 h-full relative cursor-pointer"
                            onMouseEnter={() => setSelectedBar(i)}
                        >
                            <div
                                className="absolute bg-[#3457dc] opacity-80 transition-all duration-300"
                                style={{
                                    inset: `${data.h === 100 ? 98 : data.h}% 0.4vw 0 0.4vw`,
                                    borderTopLeftRadius: '0.42vw',
                                    borderTopRightRadius: '0.42vw'
                                }}
                            />
                            {selectedBar === i && (
                                <div className="absolute bg-[#1e1e24] flex items-center justify-center py-[0.7vh] px-[0.625vw] animate-in fade-in zoom-in duration-200" style={{ left: '50%', transform: 'translateX(-50%)', bottom: `${100 - data.h + 2}%`, borderRadius: '0.625vw', border: '1px solid #1e1d22', zIndex: 10 }}>
                                    <p className="text-[#fafafa] whitespace-nowrap" style={{ fontSize: '0.69vw' }}>
                                        {data.value} {t('publications')}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* X-Axis */}
            <div className="w-full flex items-start" style={{ marginTop: '1.25vh' }}>
                {(tc('monthsShort', { returnObjects: true }) || []).map((m, i) => (
                    <div key={i} className="flex-1 text-center">
                        <p className="text-[#80808a] pub-analysis-month-text" style={{ fontSize: '0.69vw' }}>{m}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


const Overview = () => {
    const { language } = useLanguage();
    const { t } = useTranslation('overview');
    const { t: tc } = useTranslation('common');
    const [period, setPeriod] = useState(6);
    const [stats, setStats] = useState({
        members: 0,
        publications: 0,
        projects: 0,
        views: 0,
        lastPublication: null,
        lastProjects: [],
        monthlyStats: [],
        avgMonthly: 0,
        avgViews: 0,
        teamName: ""
    });

    useEffect(() => {
        const handlePeriodChange = (e) => setPeriod(e.detail);
        window.addEventListener('changePubPeriod', handlePeriodChange);
        return () => window.removeEventListener('changePubPeriod', handlePeriodChange);
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${API_BASE_URL}/api/stats/overview?period=${period}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, [period]);

    return (
        <div className="w-full text-white font-poppins pb-10 animate-in fade-in duration-500">
            {/* Cards Section - 4 Cards */}
            <div style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1vw',
                minHeight: 'fit-content'
            }}>
                <LocalStatCard
                    title={stats.teamName || t('teamMembers')}
                    value={stats.members.toString()}
                    subValue={tc('members')}
                    icon={<img src={TeamIcon} alt="Team" className="w-[1.25vw] h-[1.25vw] object-contain" />}
                />
                <LocalStatCard
                    title={t('publications')}
                    value={stats.publications.toString()}
                    icon={<img src={PublicationsIcon} alt="Publications" className="w-[1.25vw] h-[1.25vw] object-contain" />}
                />
                <LocalStatCard
                    title={t('projects')}
                    value={stats.projects.toString()}
                    icon={<img src={ProjectsIcon} alt="Projects" className="w-[1.25vw] h-[1.25vw] object-contain" />}
                />
                <LocalStatCard
                    title={t('engagement')}
                    value={`${stats.views} ${tc('views')}`}
                    icon={<img src={EngagementIcon} alt="Engagement" className="w-[1.25vw] h-[1.25vw] object-contain" />}
                />
            </div>

            {/* Info Line */}
            <div className="mt-[2.5vh] flex items-center gap-[0.5vw] px-[0.2vw]" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                <img src={InfoIcon} alt="Info" className="w-[0.9vw] h-[0.9vw] brightness-0 invert" />
                <span className="info-text-span text-[0.9vw] font-[400] text-white">
                    {t('infoText')}
                </span>
            </div>

            {/* Main Content Sections Section */}
            <div className="mt-[6vh] w-full grid grid-cols-1 md:grid-cols-12 gap-[1vw] items-start main-sections-grid">
                {/* Left Column: Project Hub + Last Projects - Spans 5 columns */}
                <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-[1vw]">
                    <ActivePlans language={language} projectStats={stats.projectStats} />
                    <LastProjects language={language} data={stats.lastProjects} />
                </div>

                {/* Right Column: Last Publication - Spans 7 columns */}
                <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-[1vw]">
                    <LastPublication language={language} data={stats.lastPublication} avgViews={stats.avgViews} />
                    <PublicationsAnalysis language={language} data={stats.monthlyStats} avg={stats.avgMonthly} currentPeriod={period} />
                </div>
            </div>

            {/* Mobile Responsive Style */}
            <style>{`
                @media (max-width: 1024px) {
                    div[style*="grid-template-columns"] { 
                        grid-template-columns: repeat(2, 1fr) !important; 
                        gap: 20px !important;
                    }
                    span[style*="font-size: 0.9vw"] { font-size: 14px !important; }
                    h3[style*="font-size: 1.8vw"] { font-size: 24px !important; }
                    div[style*="width: 2.5vw"] { width: 40px !important; height: 40px !important; }
                    div[style*="height: 20vh"] { height: 160px !important; border-radius: 12px !important; }
                     div[style*="width: 2.5vw"] img { width: 20px !important; height: 20px !important; }

                    /* New mobile refinements */
                    .info-text-span { font-size: 14px !important; }
                    .active-plans-header { justify-content: center !important; gap: 16px !important; text-align: center !important; }
                    .project-hub-title { font-size: 16px !important; width: 100% !important; margin-bottom: 8px !important; }
                    .active-plans-container { padding: 20px !important; border-radius: 16px !important; }
                    .chart-container-donut { max-width: 180px !important; margin: 20px auto !important; }
                    .chart-total-value { font-size: 40px !important; }
                    .chart-label-text { font-size: 14px !important; }
                    .legend-container { gap: 12px !important; margin-top: 20px !important; }
                    .legend-label-span { font-size: 12px !important; }
                    .trend-footer { display: none !important; }
                    
                    /* Date and Toggle refinements */
                    .date-toggle-box { min-width: 130px !important; height: 36px !important; border-radius: 8px !important; }
                    .date-display-text { font-size: 12px !important; min-width: 80px !important; }
                    .stats-mode-btn p { font-size: 13px !important; }
                    .stats-mode-btn { padding: 0 10px !important; }
                    .stats-mode-container { height: 32px !important; min-width: 80px !important; }

                    /* Trend icon enlargement */
                    .trend-icon-circle { width: 44px !important; height: 44px !important; }
                    .trend-icon-circle svg { width: 24px !important; height: 24px !important; }

                    /* Last Projects refinements */
                    .last-project-header-title { font-size: 18px !important; }
                    .last-project-search-container { display: none !important; }
                    .last-project-header-text { font-size: 12px !important; }
                    .last-project-img-container { width: 44px !important; height: 44px !important; border-radius: 6px !important; }
                    .last-project-name-container { width: 42% !important; margin-left: 12px !important; overflow: hidden; }
                    .last-project-name { font-size: 14px !important; line-height: 1.2 !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; width: 100%; }
                    .last-project-date { font-size: 11px !important; }
                    .last-project-status-text { font-size: 12px !important; }
                    div[style*="width: 12.92vw"] { width: 42% !important; }
                    div[style*="gap: 2.22vh"] { gap: 20px !important; }
                    div[style*="padding: 2.22vh 1.25vw"] { padding: 20px !important; }
 
                     /* Last Publication refinements */
                     .last-pub-header-title { font-size: 18px !important; }
                     .last-pub-img-container { width: 70px !important; height: 70px !important; border-radius: 10px !important; }
                     .last-pub-title { font-size: 15px !important; white-space: normal !important; overflow: visible !important; text-overflow: clip !important; max-width: none !important; margin-bottom: 4px !important; }
                     .last-pub-date { font-size: 12px !important; display: block !important; margin-top: 4px !important; }
                     .last-pub-stats-label { font-size: 13px !important; }
                     .last-pub-stats-value { font-size: 13px !important; }
                     div[style*="gap: 1.375vw"] { gap: 16px !important; align-items: center !important; }
                     div[style*="gap: 0.91vw"] { gap: 12px !important; }
                     .last-pub-title-container { flex-direction: column !important; align-items: flex-start !important; gap: 4px !important; }
 
                     /* Publication Analysis refinements */
                     .pub-analysis-title { font-size: 18px !important; }
                     .pub-analysis-subtitle { font-size: 14px !important; }
                     .pub-analysis-month-text { font-size: 11px !important; }
                     .pub-analysis-period-btn { height: 40px !important; padding: 0 12px !important; border-radius: 8px !important; }
                     .pub-analysis-period-btn p { font-size: 13px !important; }
                     .pub-analysis-period-btn div { width: 16px !important; height: 16px !important; }
                     div[style*="height: 30.33vh"] { height: 200px !important; }
 
                     /* Pagination and Layout refinements */
                     .last-project-pagination-box { width: 55px !important; height: 42px !important; border-radius: 8px !important; }
                     .last-project-pagination-text { font-size: 18px !important; }
                     .out-of-text { font-size: 14px !important; }
                     .last-project-pagination-btn div[style*="width: 1.67vw"] { width: 42px !important; height: 42px !important; }
                     .main-sections-grid { gap: 2.5vh !important; }
                     div[style*="flex-direction: column"][style*="gap: 1vw"] { gap: 2.5vh !important; }
                     .active-plans-container, .last-project-container, .last-pub-container, .pub-analysis-container { margin-bottom: 2.5vh !important; }
                }
            `}</style>
        </div>
    );
};

export default Overview;
