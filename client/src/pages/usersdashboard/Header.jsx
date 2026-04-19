import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, X, Menu } from 'lucide-react';
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

import NotiIcon from "@/assets/svg/userheader/notification.svg";
import VectorIcon from "@/assets/svg/userheader/Vector.svg";
import EnglishIcon from "@/assets/svg/mainheader/EnglishIcon";
import ArabicIcon from "@/assets/svg/mainheader/ArabicIcon";

// Sidebar Icons
import iconOverview from '@/assets/svg/leftbaruser/chart-pie-alt (1) 1.svg';
import iconTracker from '@/assets/svg/leftbaruser/credit-card 1.svg';
import iconPublications from '@/assets/svg/leftbaruser/Vector.svg';
import iconProgress from '@/assets/svg/leftbaruser/chart-simple (2) 1.svg';
import iconNotification from '@/assets/svg/leftbaruser/notificaion.svg';
import iconContact from '@/assets/svg/leftbaruser/user-headset (2) 1.svg';
import iconSettings from '@/assets/svg/leftbaruser/settings 1.svg';

import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

// Icons moved from src/icons
const Logoicon = ({ width = '2.25rem', height = '1.625rem', className = '', alt = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 36 26" fill="none" className={className} aria-label={alt}>
        <path d="M5.41737 7.82739V24.8195H4.29748C2.43871 24.8195 0.931641 23.0138 0.931641 20.7875V7.82739H5.41737Z" fill="#3457DC" />
        <path d="M36 22.3192C34.1389 23.8972 32.2162 24.8528 31.087 24.8528C30.7253 24.8528 30.4453 24.7543 30.2741 24.5479C30.2741 24.5479 24.5991 17.7734 23.8008 16.6098C25.7513 17.6162 30.3234 20.6042 31.3863 21.3362C30.5548 20.4072 26.0066 16.3079 24.8744 15.2327C32.4082 16.6504 35.9993 22.3192 35.9993 22.3192H36Z" fill="#3457DC" />
    </svg>
);

const Overview = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
);

const Notifications = ({ className }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M10.0129 14.4079C9.67689 15.3359 8.78889 15.9999 7.74889 15.9999C7.11689 15.9999 6.49289 15.7439 6.05289 15.2879C5.79689 15.0479 5.60489 14.7279 5.49289 14.3999C5.59689 14.4159 5.70089 14.4239 5.81289 14.4399C5.99689 14.4639 6.18889 14.4879 6.38089 14.5039C6.83689 14.5439 7.30089 14.5679 7.76489 14.5679C8.22089 14.5679 8.67689 14.5439 9.12489 14.5039C9.29289 14.4879 9.46089 14.4799 9.62089 14.4559C9.74889 14.4399 9.87689 14.4239 10.0129 14.4079Z" fill="white"/>
    </svg>
);

const Settings = ({ className }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M14 8C13.9998 7.63218 13.9664 7.26512 13.9 6.90333L15.9287 5.73333L13.9287 2.26667L11.8993 3.43933C11.339 2.95995 10.6952 2.58796 10 2.342V0H6V2.342C5.30484 2.58796 4.66097 2.95995 4.10067 3.43933L2.07133 2.26667L0.0713348 5.73333L2.1 6.90333C1.96674 7.62837 1.96674 8.37163 2.1 9.09667L0.0713348 10.2667L2.07133 13.7333L4.10067 12.5613C4.66102 13.0405 5.30489 13.4122 6 13.658V16H10V13.658C10.6952 13.412 11.339 13.04 11.8993 12.5607L13.9287 13.7333L15.9287 10.2667L13.9 9.09667C13.9664 8.73488 13.9998 8.36782 14 8ZM10 8C10 8.39556 9.8827 8.78224 9.66294 9.11114C9.44318 9.44004 9.13082 9.69638 8.76537 9.84776C8.39992 9.99914 7.99778 10.0387 7.60982 9.96157C7.22186 9.8844 6.86549 9.69392 6.58579 9.41421C6.30608 9.13451 6.1156 8.77814 6.03843 8.39018C5.96126 8.00222 6.00087 7.60009 6.15224 7.23463C6.30362 6.86918 6.55996 6.55682 6.88886 6.33706C7.21776 6.1173 7.60444 6 8 6C8.53043 6 9.03914 6.21071 9.41421 6.58579C9.78929 6.96086 10 7.46957 10 8Z" fill="white"/>
    </svg>
);

const Discord2 = () => <span>D</span>;
const Account = () => <img src={iconSettings} alt="" className="w-[1.2vw] h-[1.2vw] brightness-0 invert opacity-70" />;
const Billing = () => <img src={iconTracker} alt="" className="w-[1.2vw] h-[1.2vw] brightness-0 invert opacity-70" />;
const Support = () => <img src={iconContact} alt="" className="w-[1.2vw] h-[1.2vw] brightness-0 invert opacity-70" />;
const Signout = () => (
    <svg width="1.2vw" height="1.2vw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);
const OverviewIcon = () => <img src={iconOverview} alt="" className="w-[1.2vw] h-[1.2vw] brightness-0 invert opacity-70" />;
const PublicationsIcon = () => <img src={iconPublications} alt="" className="w-[1.2vw] h-[1.2vw] brightness-0 invert opacity-70" />;
const ProgressIcon = () => <img src={iconProgress} alt="" className="w-[1.2vw] h-[1.2vw] brightness-0 invert opacity-70" />;
const NotiIconSmall = () => <img src={iconNotification} alt="" className="w-[1.2vw] h-[1.2vw] brightness-0 invert opacity-70" />;
const English = () => <span>EN</span>;
const Arabic = () => <span>AR</span>;
const Invite = () => <span>I</span>;
const Giveaways = () => <span>G</span>;
const Coupons = () => <span>CP</span>;
const LogoText = () => <span className="font-bold text-lg text-white">OPTIMIZER</span>;
const MobileMenuBurger = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);
const Product = () => <span>P</span>;
const Users = () => <span>U</span>;
const Referrals = () => <span>R</span>;
const Content = () => <span>C</span>;
const Legal = () => <span>L</span>;
const Chatbot = () => <span>CB</span>;

function useOnClickOutside(refs, handler) {
    useEffect(() => {
        const listener = (e) => {
            const el = e.target;
            if (!refs.some(r => r.current && r.current.contains(el))) {
                handler();
            }
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [refs, handler]);
}

const Header = ({ onToggleSidebar, title, navItems }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openAccount, setOpenAccount] = useState(false);
    const [openLang, setOpenLang] = useState(false);
    const [openNoti, setOpenNoti] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNavNotifications = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const res = await fetch('http://localhost:5000/api/notifications/my', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setNotifications(data);
                }
            } catch (error) {
                console.error('Error fetching nav notifications:', error);
            }
        };
        fetchNavNotifications();
    }, []);

    const { t } = useTranslation('header');
    const { language, setLanguage } = useLanguage();
    const { user, logout } = useAuth();

    const isPremium = user?.plan === 'premium';
    const isAr = language === 'ar';

    const supportBadges = [
        { labelKey: 'badge_new', icon: '/src/assets/svg/support/Vector.svg' },
        { labelKey: 'badge_expert', icon: '/src/assets/svg/support/Vector-1.svg' },
        { labelKey: 'badge_trusted', icon: '/src/assets/svg/support/shield-trust (2) 1.svg' },
    ];
    const supportBadge = React.useMemo(
        () => supportBadges[Math.floor(Math.random() * supportBadges.length)],
        []
    );

    const accountRef = useRef(null);
    const langRef = useRef(null);
    const notiRef = useRef(null);
    const avatarBtnRef = useRef(null);
    const langBtnRef = useRef(null);
    const notiBtnRef = useRef(null);
    const mobileMenuBtnRef = useRef(null);

    useOnClickOutside(
        [accountRef, avatarBtnRef, langRef, langBtnRef, notiRef, notiBtnRef],
        () => {
            setOpenAccount(false);
            setOpenLang(false);
            setOpenNoti(false);
        }
    );


    const toggleAccount = () => {
        setOpenAccount(v => {
            if (!v) {
                setOpenLang(false);
                setOpenNoti(false);
            }
            return !v
        })
    };

    const toggleLang = () => {
        setOpenLang(v => {
            if (!v) {
                setOpenAccount(false);
                setOpenNoti(false);
            }
            return !v
        })
    };

    const toggleNoti = () => {
        setOpenNoti(v => {
            if (!v) {
                setOpenAccount(false);
                setOpenLang(false);
            }
            return !v
        })
    };

    const handleLanguageChange = (newLang) => {
        const currentPath = location.pathname;

        if (currentPath.includes('/admin') || currentPath.startsWith('/support')) {
            setLanguage(newLang);
            setOpenLang(false);
            return;
        }

        const pathParts = currentPath.split('/');
        if (pathParts[1] && ['en', 'ar'].includes(pathParts[1])) {
            pathParts[1] = newLang;
            const newPath = pathParts.join('/');
            navigate(newPath, { replace: true });
        }

        setOpenLang(false);
    };

    const onLogout = async () => {
        await logout();
        navigate('/');
    };

    const avatarUrl = user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`;

    const getCurrentLanguageFlag = () => {
        return language === 'en' ? <English /> : <Arabic />;
    };

    const toggleMobileSidebar = () => {
        if (onToggleSidebar) onToggleSidebar();
    };

    const pathParts = location.pathname.split('/').filter(Boolean);

    const adminIndex = pathParts.indexOf('admin');
    const userIndex = pathParts.indexOf('user');
    const usersDashboardIndex = pathParts.indexOf('usersdashboard');
    const leaderDashboardIndex = pathParts.indexOf('leaderdashboard');

    let pageSegment = 'overview';
    let subPageSegment = null;

    if (adminIndex !== -1) {
        pageSegment = pathParts[adminIndex + 1] || 'overview';
        subPageSegment = pathParts[adminIndex + 2];
    } else if (userIndex !== -1) {
        pageSegment = pathParts[userIndex + 1] || 'overview';
        subPageSegment = pathParts[userIndex + 2];
    } else if (usersDashboardIndex !== -1) {
        pageSegment = pathParts[usersDashboardIndex + 1] || 'overview';
        subPageSegment = pathParts[usersDashboardIndex + 2];
    } else if (leaderDashboardIndex !== -1) {
        pageSegment = pathParts[leaderDashboardIndex + 1] || 'overview';
        subPageSegment = pathParts[leaderDashboardIndex + 2];
    } else {
        pageSegment = pathParts[0] === 'en' || pathParts[0] === 'ar' ? (pathParts[1] || 'overview') : (pathParts[0] || 'overview');
    }

    const pageNames = {
        'overview': 'Overview',
        'phd-tracker': 'PhD Tracker',
        'publications': 'My Publications',
        'progress': 'Progress',
        'notifications': 'Notifications',
        'contact': 'Team Contact',
        'account': 'My Account',
        'invite-earn': 'Invite & Earn',
        'invite': 'Invite & Earn',
        'giveaways': 'Giveaways',
        'coupons': 'Coupons',
        'billing': 'Billing Plan',
        'support': 'Support',
        'review': 'Leave Review',
        'support-team': 'Support Team',
        'manage-content': 'Manage Content',
        'project-hub': 'Project Hub',
        'team-contact': 'Team Contact',
        'admin-tools': 'Admin Tools',
        'users': 'Users',
    };

    const subPageNames = {
        'profile': 'Personal Information',
        'security': 'Security & Login',
        'preferences': 'Preferences',
        'profiles': 'Profiles',
    };

    const breadcrumbLabelStr = pageNames[pageSegment] || (pageSegment.charAt(0).toUpperCase() + pageSegment.slice(1).replace('-', ' '));
    const breadcrumbLabel = title || t(pageSegment, { defaultValue: breadcrumbLabelStr });

    const subBreadcrumbKey = subPageSegment ? subPageNames[subPageSegment] : null;
    const subBreadcrumbLabel = subBreadcrumbKey ? t(subPageSegment, { defaultValue: subPageNames[subPageSegment] || subPageSegment }) : subPageSegment;

    const isAdmin = location.pathname.includes('/admin');
    const isSupport = location.pathname.startsWith('/support');
    const isUsersDashboard = location.pathname.includes('/usersdashboard');
    const isLeaderDashboard = location.pathname.includes('/leaderdashboard');

    const mobileNavItems = navItems || (isAdmin
        ? [
            { id: 'overview', path: `/admin/overview`, label: t('overview') || 'Overview', icon: <Overview /> },
            { id: 'billinghub', path: `/admin/billing`, label: t('billinghub', 'Billing Hub'), icon: <Billing /> },
            { id: 'product', path: `/admin/product`, label: t('product', 'Product'), icon: <Product /> },
            { id: 'users', path: `/admin/users`, label: t('users', 'Users'), icon: <Users /> },
            { id: 'giveaways', path: `/admin/giveaways`, label: t('giveaways', 'Giveaways'), icon: <Giveaways /> },
            { id: 'coupons', path: `/admin/coupons`, label: t('coupons', 'Coupons'), icon: <Coupons /> },
            { id: 'referrals', path: `/admin/referrals`, label: t('referrals', 'Referrals'), icon: <Referrals /> },
            { id: 'notifications', path: `/admin/notifications`, label: t('notifications', 'Notifications'), icon: <Notifications /> },
            { id: 'content', path: `/admin/content`, label: t('content', 'Content'), icon: <Content /> },
            { id: 'legalpages', path: `/admin/legal`, label: t('legalpages', 'Legal pages'), icon: <Legal /> },
            { id: 'chatbot', path: `/admin/chatbot`, label: t('chatbot', 'Chatbot'), icon: <Chatbot /> },
            { id: 'support', path: `/admin/support`, label: t('support', 'Support'), icon: <Support /> },
            { id: 'admintools', path: `/admin/tools`, label: t('admintools', 'Admin Tools'), icon: <Settings /> },
        ]
        : isSupport
            ? [
                { id: 'overview', path: `/support`, label: t('overview') || 'Overview', icon: <Overview /> },
                { id: 'inbox', path: `/support/inbox`, label: t('inbox') || 'Inbox', icon: <Support /> },
                { id: 'my_insights', path: `/support/insights`, label: t('my_insights') || 'My Insights', icon: <Product /> },
                { id: 'withdraw', path: `/support/withdraw`, label: t('withdraw') || 'Withdraw', icon: <Billing /> },
                { id: 'notifications', path: `/support/notifications`, label: t('notifications') || 'Notifications', icon: <Notifications /> },
                { id: 'my_account', path: `/support/account`, label: t('my_account') || 'My account', icon: <Settings /> },
            ]
            : isUsersDashboard 
                ? [
                    { id: 'overview', path: `/usersdashboard/overview`, label: 'Overview', icon: <Overview /> },
                    { id: 'phd-tracker', path: `/usersdashboard/phd-tracker`, label: 'PhD Tracker', icon: <Billing /> },
                    { id: 'publications', path: `/usersdashboard/my-publications`, label: 'Publications', icon: <Product /> },
                    { id: 'progress', path: `/usersdashboard/progress`, label: 'Progress', icon: <Billing /> },
                    { id: 'notifications', path: `/usersdashboard/notifications`, label: 'Notifications', icon: <Notifications /> },
                    { id: 'team-contact', path: `/usersdashboard/team-contact`, label: 'Team Contact', icon: <Support /> },
                    { id: 'account', path: `/usersdashboard/account/profile`, label: 'My Account', icon: <Account /> },
                ]
                : isLeaderDashboard
                    ? [
                        { id: 'overview', path: `/leaderdashboard`, label: 'Users', icon: <Overview /> },
                        { id: 'project-hub', path: `/leaderdashboard/project-hub`, label: 'Project Hub', icon: <Product /> },
                        { id: 'notifications', path: `/leaderdashboard/notifications`, label: 'Notifications', icon: <Notifications /> },
                        { id: 'manage-content', path: `/leaderdashboard/manage-content`, label: 'Manage Content', icon: <Content /> },
                        { id: 'team-contact', path: `/leaderdashboard/team-contact`, label: 'Team Contact', icon: <Support /> },
                        { id: 'admin-tools', path: `/leaderdashboard/admin-tools`, label: 'Admin Tools', icon: <Settings /> },
                    ]
                    : [
                        { id: 'overview', path: `/${language}/user/overview`, label: t('overview') || 'Overview', icon: <Overview /> },
                        { id: 'billing', path: `/${language}/user/billing`, label: t('billingPlan') || 'Billing', icon: <Billing /> },
                        { id: 'invite-earn', path: `/${language}/user/invite`, label: t('inviteAndEarn') || 'Invite & Earn', icon: <Invite /> },
                        { id: 'giveaways', path: `/${language}/user/giveaways`, label: t('giveaways') || 'Giveaways', icon: <Giveaways /> },
                        { id: 'coupons', path: `/${language}/user/coupons`, label: t('coupons') || 'Coupons', icon: <Coupons /> },
                        { id: 'notifications', path: `/${language}/user/notifications`, label: t('recentNotifications') || 'Notifications', icon: <Notifications /> },
                        { id: 'support', path: `/${language}/user/support`, label: t('support') || 'Support', icon: <Support /> },
                        { id: 'account', path: `/${language}/user/account/profile`, label: t('myAccount') || 'My Account', icon: <Account /> },
                    ]);

    return (
        <>
            <header className="flex items-center justify-between w-full h-[11.4vh] bg-[#0A070E] border-b border-[#2a2a30] px-[1.7vw] z-50">
                <div className="flex items-center gap-4 md:gap-[1.7vw]">
                    {/* Mobile Logo */}
                    <Link to="/" className="md:hidden">
                        <img src="/Saad Dahlab white.png" alt="Logo" className="h-[4.5vh] w-auto" />
                    </Link>

                    {/* Desktop Sidebar Toggle and Breadcrumbs */}
                    <div className="flex items-center gap-[1.7vw] hidden md:flex">
                        <button onClick={onToggleSidebar} className="text-white hover:opacity-80 transition-opacity">
                            <img src={VectorIcon} alt="Toggle Sidebar" className="w-[1.4vw] h-[2.5vh]" />
                        </button>
                        <div className="breadcrumb flex items-center gap-[0.5vw] text-[1.1vw] font-medium text-white">
                            <span className="breadcrumb-item">{t('dashboard')}</span>
                            <span className="breadcrumb-divider text-white/40">/</span>
                            {subBreadcrumbLabel ? (
                                <>
                                    <span className="breadcrumb-item">{breadcrumbLabel}</span>
                                    <span className="breadcrumb-divider text-white/40">/</span>
                                    <span className="breadcrumb-current whitespace-nowrap">{subBreadcrumbLabel}</span>
                                </>
                            ) : (
                                <span className="breadcrumb-current">{breadcrumbLabel}</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 md:gap-[1.1vw]">
                    {/* Part 1: Lang & Noti */}
                    <div className="flex items-center gap-3 md:gap-[1.1vw]">
                        {/* Language */}
                        <div className="language-selector relative" ref={langBtnRef}>
                            <button
                                className="bg-[#1e1e24] flex items-center justify-between relative rounded-full shrink-0 hover:bg-[#2a2a30] transition-all px-3 md:px-[1vw] h-8 md:h-[2.5vw]"
                                style={{ gap: '0.5vw' }}
                                onClick={toggleLang}
                            >
                                <div className="relative shrink-0 flex items-center justify-center w-5 md:w-[1.1vw] h-auto">
                                    {language === 'en' ? <EnglishIcon width="100%" height="auto" /> : <ArabicIcon width="100%" height="auto" />}
                                </div>
                                <div
                                    className="relative shrink-0 transition-transform duration-300 flex items-center justify-center ml-[0.2vw] text-white w-4 md:w-[1vw]"
                                    style={{ transform: openLang ? 'rotate(180deg)' : 'none' }}
                                >
                                    <svg className="block w-full h-full" fill="none" viewBox="0 0 20 20">
                                        <path d="M15.5917 6.84167C15.5142 6.76356 15.422 6.70156 15.3205 6.65926C15.2189 6.61695 15.11 6.59517 15 6.59517C14.89 6.59517 14.7811 6.61695 14.6795 6.65926C14.578 6.70156 14.4858 6.76356 14.4083 6.84167L10.5917 10.6583C10.5142 10.7364 10.422 10.7984 10.3205 10.8407C10.2189 10.8831 10.11 10.9048 10 10.9048C9.88999 10.9048 9.78107 10.8831 9.67952 10.8407C9.57797 10.7984 9.4858 10.7364 9.40833 10.6583L5.59167 6.84167C5.5142 6.76356 5.42203 6.70156 5.32048 6.65926C5.21893 6.61695 5.11001 6.59517 5 6.59517C4.88999 6.59517 4.78107 6.61695 4.67952 6.65926C4.57797 6.70156 4.4858 6.76356 4.40833 6.84167C4.25312 6.9978 4.16601 7.20901 4.16601 7.42917C4.16601 7.64932 4.25312 7.86053 4.40833 8.01667L8.23333 11.8417C8.70208 12.3098 9.3375 12.5728 10 12.5728C10.6625 12.5728 11.2979 12.3098 11.7667 11.8417L15.5917 8.01667C15.7469 7.86053 15.834 7.64932 15.834 7.42917C15.834 7.20901 15.7469 6.9978 15.5917 6.84167Z" fill="#FFFFFF" />
                                    </svg>
                                </div>
                            </button>
                            {/* ... (Lang dropdown stays the same) ... */}

                            <div ref={langRef} className={`absolute left-0 top-full mt-[1vh] w-[11.5vw] bg-[#121217] border-[0.1vw] border-[#2a2a30] rounded-[0.6vw] overflow-hidden transition-all duration-200 z-50 shadow-2xl ${openLang ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`} role="menu" aria-hidden={!openLang}>
                                <ul className="flex flex-col">
                                    <li className={`flex items-center gap-[0.8vw] px-[1.1vw] py-[1.2vh] hover:bg-white/5 cursor-pointer text-[1vw] text-white/80 hover:text-white transition-colors ${language === 'en' ? 'bg-white/5 text-white' : ''}`} onClick={() => handleLanguageChange('en')}>
                                        <div className="w-[1vw] h-[1.6vh] flex items-center justify-center"><EnglishIcon width="1vw" height="1.6vh" /></div> <span>{t('english') || 'English'}</span>
                                    </li>
                                    <li className={`flex items-center gap-[0.8vw] px-[1.1vw] py-[1.2vh] hover:bg-white/5 cursor-pointer text-[1vw] text-white/80 hover:text-white transition-colors ${language === 'ar' ? 'bg-white/5 text-white' : ''}`} onClick={() => handleLanguageChange('ar')}>
                                        <div className="w-[1vw] h-[1.6vh] flex items-center justify-center"><ArabicIcon width="1vw" height="1.6vh" /></div> <span>{t('arabic') || 'Arabic (العربية)'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="notifications-dropdown hidden md:block relative flex items-center" ref={notiBtnRef}>
                            <button
                                className={`flex items-center justify-center rounded-full transition-all hover:bg-white/5 ${openNoti ? 'bg-white/10' : ''}`}
                                style={{ height: '3vw', width: '3vw' }}
                                aria-haspopup="true"
                                aria-expanded={openNoti}
                                onClick={toggleNoti}
                            >
                                <img src={NotiIcon} alt="Notifications" className="w-[1.6vw] h-[1.6vw] opacity-100 brightness-200" />
                            </button>

                            <div ref={notiRef} className={`absolute right-0 top-full mt-[1.2vh] w-[23vw] bg-[#121217] border border-[#2a2a30] rounded-xl overflow-hidden transition-all duration-200 z-50 shadow-2xl flex flex-col ${openNoti ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`} role="dialog" aria-hidden={!openNoti}>
                                <div className="p-[1vw] border-b border-[#2a2a30] font-semibold text-white tracking-wide" style={{ fontSize: '1.05vw' }}>{t('recentNotifications')}</div>
                                <div className="flex flex-col max-h-[300px] overflow-y-auto custom-scrollbar">
                                    {notifications && notifications.length > 0 ? (
                                        notifications.slice(0, 5).map((noti) => (
                                            <div 
                                                key={noti._id} 
                                                className="p-[1vw] hover:bg-white/5 cursor-pointer border-b border-[#2a2a30]/50" 
                                                onClick={() => { 
                                                    const target = location.pathname.includes('/leaderdashboard') ? '/leaderdashboard/notifications' : '/usersdashboard/notifications';
                                                    navigate(target); 
                                                    setOpenNoti(false); 
                                                }}
                                            >
                                                <div className="font-medium text-white mb-[0.2vh]" style={{ fontSize: '1vw' }}>{noti.title}</div>
                                                <div className="text-white/60 mb-[0.4vh] line-clamp-2" style={{ fontSize: '0.94vw' }}>{noti.message}</div>
                                                <div className="text-white/40" style={{ fontSize: '0.8vw' }}>{new Date(noti.createdAt).toLocaleString()}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-[2vw] text-center text-white/40" style={{ fontSize: '0.9vw' }}>No new notifications</div>
                                    )}
                                </div>
                                <div className="p-[0.8vw] border-t border-[#2a2a30] text-center w-full">
                                    <button 
                                        onClick={() => { 
                                            const target = location.pathname.includes('/leaderdashboard') ? '/leaderdashboard/notifications' : '/usersdashboard/notifications';
                                            navigate(target); 
                                            setOpenNoti(false); 
                                        }}
                                        className="font-medium text-[#3457DC] hover:text-[#3457DC]/80 w-full outline-none" 
                                        style={{ fontSize: '0.94vw' }}
                                    >
                                        View All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[3.1vh] w-px bg-[#2a2a30]"></div>

                    {/* Part 2: Avatar */}
                    <div className="flex items-center gap-3 md:gap-[1.1vw]">
                        <div className="hidden md:flex items-center gap-[1.1vw]">
                            {/* ... (Avatar and desktop bits) ... */}
                        </div>

                        {/* Mobile Hamburger Toggle (Right side on mobile) */}
                        <button 
                            onClick={onToggleSidebar} 
                            className="text-white hover:opacity-80 transition-opacity md:hidden p-2 ml-1"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </header>

        </>
    );
};

export default Header;
