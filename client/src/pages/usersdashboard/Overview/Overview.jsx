import React, { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// --- Asset Icons Imports ---
import TeamIcon from "@/assets/svg/userDashboard/Overview/users-alt (7) 1.svg";
import PublicationsIcon from "@/assets/svg/userDashboard/Overview/Vector.svg";
import ProjectsIcon from "@/assets/svg/userDashboard/Overview/Vector-1.svg";
import EngagementIcon from "@/assets/svg/userDashboard/Overview/dashboard (4) 1.svg";
import InfoIcon from "@/assets/svg/userDashboard/Overview/info_(1)_5.svg";

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
const LocalStatCard = ({ icon, title, value, width = '100%' }) => {
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
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginTop: '0.3vh' }}>
                <h3 style={{ fontSize: '1.8vw', fontWeight: 500, color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                    {value}
                </h3>
            </div>
        </div>
    );
};

// --- ActivePlans Component ---
const ActivePlans = ({ language = 'en' }) => {
    const [statsMode, setStatsMode] = useState("M");
    const [currentDate, setCurrentDate] = useState(new Date(2026, 3)); // Starting at April 2026

    const today = new Date(2026, 3); // Capping at April 2026 (User's current system date)

    const monthsEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthsAR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    
    const displayMonth = language === 'ar' ? monthsAR[currentDate.getMonth()] : monthsEN[currentDate.getMonth()];
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

    const t = {
        en: {
            projectHub: 'Project Hub',
            totalValue: '12',
            totalLabel: 'Total',
            subLabel: 'Projects',
            trendText: 'Views based on Last 2 Mounts',
            plans: { completed: 'Completed', closed: 'Closed', inProgress: 'In Progress' }
        },
        ar: {
            projectHub: 'بروجكت هوب',
            totalValue: '12',
            totalLabel: 'إجمالي',
            subLabel: 'المشاريع',
            trendText: 'المشاهدات بناءً على آخر شهرين',
            plans: { completed: 'مكتمل', closed: 'مغلق', inProgress: 'قيد التنفيذ' }
        }
    }[language];

    const data = {
        total: 12,
        trend: '45.65%',
        plans: [
            { label: t.plans.completed, count: 5, color: "#F4C63D" },
            { label: t.plans.closed, count: 3, color: "#3457DC" },
            { label: t.plans.inProgress, count: 4, color: "#11CFC3" },
        ]
    };

    const size = 320;
    const center = size / 2;
    const radius = 135;
    const strokeWidth = 34;
    const circumference = 2 * Math.PI * radius;

    const segments = useMemo(() => {
        let currentOffset = 0;
        const totalGap = 18 * data.plans.length;
        const availableCircumference = 360 - totalGap;
        return data.plans.map(plan => {
            const percentage = (plan.count / data.total);
            const segmentAngle = percentage * availableCircumference;
            const dashLength = (segmentAngle / 360) * circumference;
            const offset = circumference - dashLength;
            const startRotation = currentOffset - 90;
            currentOffset += segmentAngle + 18;
            return { ...plan, dashOffset: offset, rotation: startRotation };
        });
    }, [data, circumference]);

    return (
        <div style={{
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
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5vw',
                flexWrap: 'wrap',
                gap: '1vw',
                direction: language === 'ar' ? 'rtl' : 'ltr'
            }}>
                <h4 style={{ fontSize: '1.1vw', fontWeight: 600, color: 'white', margin: 0, fontFamily: "'Poppins', sans-serif" }}>
                    {t.projectHub}
                </h4>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8vw' }}>
                    {/* Date Toggle Box */}
                    <div style={{
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
                        <span style={{ color: 'white', fontSize: '0.75vw', fontWeight: 500, fontFamily: "'Poppins', sans-serif", minWidth: '6.3vw', textAlign: 'center' }}>
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
                    <div className="bg-[#1e1e24] flex h-[4.72vh] items-center relative rounded-[0.7vw] shrink-0 p-[0.3vh]">
                        <button 
                            onClick={() => setStatsMode("Y")}
                            className={`flex h-full items-center justify-center px-[0.7vw] relative rounded-[0.5vw] transition-all ${statsMode === "Y" ? 'bg-white/5 text-[#3457dc]' : 'text-white/60'}`}
                        >
                            <p className="font-poppins text-[0.85vw] font-bold">Y</p>
                        </button>
                        <button 
                            onClick={() => setStatsMode("M")}
                            className={`flex h-full items-center justify-center px-[0.7vw] relative rounded-[0.5vw] transition-all ${statsMode === "M" ? 'bg-white/5 text-[#3457dc]' : 'text-white/60'}`}
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
                <div style={{ position: 'relative', width: '100%', maxWidth: '18vw', aspectRatio: '1/1' }}>
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
                            <text x="50%" y="47%" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="700" style={{ fontFamily: 'Poppins' }}>{t.totalValue}</text>
                            <text x="50%" y="56%" textAnchor="middle" fill="#A5A5B2" fontSize="14" fontWeight="400" style={{ fontFamily: 'Poppins' }}>{t.totalLabel}</text>
                            <text x="50%" y="63%" textAnchor="middle" fill="#A5A5B2" fontSize="14" fontWeight="400" style={{ fontFamily: 'Poppins' }}>{t.subLabel}</text>
                        </g>
                    </svg>
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.1vw', marginTop: '2vw' }}>
                    {data.plans.map(plan => (
                        <div key={plan.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6vw' }}>
                            <div style={{ width: '0.6vw', height: '0.6vw', minWidth: '8px', minHeight: '8px', borderRadius: '50%', backgroundColor: plan.color }}></div>
                            <span style={{ fontSize: '0.9vw', fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}>{plan.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Trend */}
            <div style={{
                marginTop: '2vw',
                paddingTop: '1.5vw',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '1vw',
                direction: language === 'ar' ? 'rtl' : 'ltr'
            }}>
                <div style={{
                    width: '2.5vw', height: '2.5vw', minWidth: '32px', minHeight: '32px', borderRadius: '50%',
                    backgroundColor: 'rgba(52, 87, 220, 0.12)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <ArrowUpIcon width="1.8vw" height="1.8vw" fill="#3457DC" />
                </div>
                <p style={{ margin: 0, fontSize: '0.9vw', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5vw', fontFamily: "'Poppins', sans-serif" }}>
                    <span style={{ fontSize: '1.2vw', fontWeight: 700, color: '#ffffff' }}>{data.trend}</span>
                    <span style={{ fontWeight: 400, marginLeft: '0.95vw' }}>{t.trendText}</span>
                </p>
            </div>
        </div>
    );
};

const Overview = () => {
    const { language } = useLanguage();

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
                    title="Team members"
                    value="7"
                    icon={<img src={TeamIcon} alt="Team" className="w-[1.25vw] h-[1.25vw] object-contain" />}
                />
                <LocalStatCard
                    title="Publications"
                    value="120"
                    icon={<img src={PublicationsIcon} alt="Publications" className="w-[1.25vw] h-[1.25vw] object-contain" />}
                />
                <LocalStatCard
                    title="Projects"
                    value="4"
                    icon={<img src={ProjectsIcon} alt="Projects" className="w-[1.25vw] h-[1.25vw] object-contain" />}
                />
                <LocalStatCard
                    title="Engagement"
                    value="8 Views"
                    icon={<img src={EngagementIcon} alt="Engagement" className="w-[1.25vw] h-[1.25vw] object-contain" />}
                />
            </div>

            {/* Info Line */}
            <div className="mt-[2.5vh] flex items-center gap-[0.5vw] px-[0.2vw]">
                <img src={InfoIcon} alt="Info" className="w-[0.9vw] h-[0.9vw] brightness-0 invert" />
                <span className="text-[0.9vw] font-[400] text-white">
                    This data is based on your team.
                </span>
            </div>

            {/* Main Content Sections Section */}
            <div className="mt-[6vh] w-full grid grid-cols-1 md:grid-cols-12 gap-[2vw]">
                {/* Active Plans Breakdown Section - Spans 5 columns */}
                <div className="md:col-span-12 lg:col-span-5">
                    <ActivePlans language={language} />
                </div>
                
                {/* Reserved for future sections - Spans 7 columns */}
                <div className="md:col-span-12 lg:col-span-7 min-h-[50vh] border border-dashed border-white/10 rounded-[1.5vw] flex items-center justify-center">
                    <p className="text-white/20 text-[1vw]">Additional analytics sections will be added here...</p>
                </div>
            </div>

            {/* Mobile Responsive Style */}
            <style>{`
                @media (max-width: 1024px) {
                    div[style*="grid-template-columns"] { 
                        grid-template-columns: repeat(2, 1fr) !important; 
                        gap: 12px !important;
                    }
                    span[style*="font-size: 0.9vw"] { font-size: 14px !important; }
                    h3[style*="font-size: 1.8vw"] { font-size: 24px !important; }
                    div[style*="width: 2.5vw"] { width: 40px !important; height: 40px !important; }
                    div[style*="height: 20vh"] { height: 160px !important; border-radius: 12px !important; }
                    div[style*="width: 2.5vw"] img { width: 20px !important; height: 20px !important; }
                }
            `}</style>
        </div>
    );
};

export default Overview;
