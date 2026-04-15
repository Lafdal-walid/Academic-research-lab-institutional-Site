import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, X, Menu } from 'lucide-react';
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

import NotiIcon from "@/assets/svg/userheader/notification.svg";
import VectorIcon from "@/assets/svg/userheader/Vector.svg";
import EnglishIcon from "@/assets/svg/mainheader/EnglishIcon";
import ArabicIcon from "@/assets/svg/mainheader/ArabicIcon";

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
const Account = () => <span>A</span>;
const Billing = () => <span>B</span>;
const Support = () => <span>SP</span>;
const Signout = () => <span>S</span>;
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
    const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
    const [mobileMenuView, setMobileMenuView] = useState('main');

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

    useEffect(() => {
        if (openMobileSidebar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setMobileMenuView('main');
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [openMobileSidebar]);

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
        setOpenMobileSidebar(false);
        await logout();
    };

    const avatarUrl = user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`;

    const getCurrentLanguageFlag = () => {
        return language === 'en' ? <English /> : <Arabic />;
    };

    const toggleMobileSidebar = () => {
        setOpenMobileSidebar(prev => !prev);
        if (onToggleSidebar) onToggleSidebar();
    };

    const pathParts = location.pathname.split('/').filter(Boolean);

    const adminIndex = pathParts.indexOf('admin');
    const userIndex = pathParts.indexOf('user');
    const usersDashboardIndex = pathParts.indexOf('usersdashboard');

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

                <div className="flex items-center gap-[1.1vw]">
                    {/* Part 1: Lang & Noti */}
                    <div className="flex items-center gap-[1.1vw]">
                        {/* Language */}
                        <div className="language-selector relative" ref={langBtnRef}>
                            <button
                                className="bg-[#1e1e24] flex items-center justify-between relative rounded-full shrink-0 hover:bg-[#2a2a30] transition-all"
                                style={{ padding: '0.8vh 1vw', gap: '0.5vw', height: '2.5vw' }}
                                onClick={toggleLang}
                            >
                                <div className="relative shrink-0 flex items-center justify-center w-[1.1vw] h-[1.8vh]">
                                    {language === 'en' ? <EnglishIcon width="1.1vw" height="1.8vh" /> : <ArabicIcon width="1.1vw" height="1.8vh" />}
                                </div>
                                <div
                                    className="relative shrink-0 transition-transform duration-300 flex items-center justify-center ml-[0.2vw] text-white"
                                    style={{ transform: openLang ? 'rotate(180deg)' : 'none', width: '1vw', height: '1.8vh' }}
                                >
                                    <svg className="block w-full h-full" fill="none" viewBox="0 0 20 20">
                                        <path d="M15.5917 6.84167C15.5142 6.76356 15.422 6.70156 15.3205 6.65926C15.2189 6.61695 15.11 6.59517 15 6.59517C14.89 6.59517 14.7811 6.61695 14.6795 6.65926C14.578 6.70156 14.4858 6.76356 14.4083 6.84167L10.5917 10.6583C10.5142 10.7364 10.422 10.7984 10.3205 10.8407C10.2189 10.8831 10.11 10.9048 10 10.9048C9.88999 10.9048 9.78107 10.8831 9.67952 10.8407C9.57797 10.7984 9.4858 10.7364 9.40833 10.6583L5.59167 6.84167C5.5142 6.76356 5.42203 6.70156 5.32048 6.65926C5.21893 6.61695 5.11001 6.59517 5 6.59517C4.88999 6.59517 4.78107 6.61695 4.67952 6.65926C4.57797 6.70156 4.4858 6.76356 4.40833 6.84167C4.25312 6.9978 4.16601 7.20901 4.16601 7.42917C4.16601 7.64932 4.25312 7.86053 4.40833 8.01667L8.23333 11.8417C8.70208 12.3098 9.3375 12.5728 10 12.5728C10.6625 12.5728 11.2979 12.3098 11.7667 11.8417L15.5917 8.01667C15.7469 7.86053 15.834 7.64932 15.834 7.42917C15.834 7.20901 15.7469 6.9978 15.5917 6.84167Z" fill="#FFFFFF" />
                                    </svg>
                                </div>
                            </button>

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
                                <div className="flex flex-col max-h-[300px] overflow-y-auto">
                                    <div className="p-[1vw] hover:bg-white/5 cursor-pointer border-b border-[#2a2a30]/50">
                                        <div className="font-medium text-white mb-[0.2vh]" style={{ fontSize: '1vw' }}>{t('giveaway')}</div>
                                        <div className="text-white/60 mb-[0.4vh]" style={{ fontSize: '0.94vw' }}>{t('giveawayText')}</div>
                                        <div className="text-white/40" style={{ fontSize: '0.8vw' }}>{t('minutesAgo', { count: 2 })}</div>
                                    </div>
                                    <div className="p-[1vw] hover:bg-white/5 cursor-pointer border-b border-[#2a2a30]/50 flex gap-[0.5vw]">
                                        <div>
                                            <div className="font-medium text-white mb-[0.2vh]" style={{ fontSize: '1vw' }}>{t('systemUpdate')}</div>
                                            <div className="text-white/60 mb-[0.4vh]" style={{ fontSize: '0.94vw' }}>{t('systemUpdateText')}</div>
                                            <div className="text-white/40" style={{ fontSize: '0.8vw' }}>{t('hourAgo', { count: 1 })}</div>
                                        </div>
                                    </div>
                                    <div className="p-[1vw] hover:bg-white/5 cursor-pointer flex gap-[0.5vw]">
                                        <div>
                                            <div className="font-medium text-white mb-[0.2vh]" style={{ fontSize: '1vw' }}>{t('security')}</div>
                                            <div className="text-white/60 mb-[0.4vh]" style={{ fontSize: '0.94vw' }}>{t('securityText')}</div>
                                            <div className="text-white/40" style={{ fontSize: '0.8vw' }}>{t('yesterdayAt')} 4:11 PM</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-[0.8vw] border-t border-[#2a2a30] text-center w-full">
                                    <button className="font-medium text-[#3457DC] hover:text-[#3457DC]/80 w-full outline-none" style={{ fontSize: '0.94vw' }}>{t('viewAll')}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[3.1vh] w-px bg-[#2a2a30]"></div>

                    {/* Part 2: Avatar */}
                    <div className="flex items-center gap-[1.1vw]">
                        <div className="hidden md:flex items-center gap-[1.1vw]">
                            {location.pathname.startsWith('/support') ? (
                                <div className="flex items-center gap-[0.5vw] bg-[#1C1C1F] px-[1.1vw] rounded-full cursor-pointer h-[4.5vh]">
                                    <span className="text-white text-[0.95vw] font-medium tracking-wide">{t(supportBadge.labelKey)}</span>
                                    <img src={supportBadge.icon} alt={t(supportBadge.labelKey)} className="w-[1vw] h-[2vh]" />
                                </div>
                            ) : !location.pathname.includes('/admin') && (
                                <div
                                    className="bg-white/10 flex items-center justify-center relative rounded-full shrink-0"
                                    style={{ padding: '0.8vh 1vw', gap: '0.5vw', height: '2.5vw' }}
                                >
                                    <span className="font-poppins font-medium leading-none text-white/80 whitespace-nowrap tracking-wide" style={{ fontSize: '0.95vw' }}>
                                        {isPremium ? 'Premium' : 'Free'}
                                    </span>
                                    <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-white/80 shrink-0" />
                                </div>
                            )}
                            <div className="avatar relative" ref={avatarBtnRef}>
                                <button className={`avatar-button waves waves-effect flex items-center gap-[0.5vw] ${openAccount ? 'act' : ''}`} onClick={toggleAccount} aria-haspopup="true" aria-expanded={openAccount}>
                                    <img src={avatarUrl} alt="profile" style={{ borderRadius: '50%', width: '2.8vw', height: '2.8vw' }} />
                                </button>
                                <div ref={accountRef} className={`absolute right-0 top-full mt-[1vh] w-[16vw] bg-[#121217] border border-[#2a2a30] rounded-xl overflow-hidden transition-all duration-200 z-50 p-[0.6vw] shadow-2xl ${openAccount ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`} role="menu" aria-hidden={!openAccount}>
                                    <ul className="flex flex-col gap-[0.4vh]">
                                        <li className="flex items-center gap-[0.8vw] px-[0.8vw] py-[1.2vh] rounded-[0.5vw] hover:bg-white/5 cursor-pointer text-[1vw] text-white/80 hover:text-white transition-colors" onClick={() => { navigate(`/${language}/user/account/profile`); setOpenAccount(false); }}><div style={{ transform: 'scale(1.2)' }}><Account /></div> <span>{t('myAccount')}</span></li>
                                        <li className="flex items-center gap-[0.8vw] px-[0.8vw] py-[1.2vh] rounded-[0.5vw] hover:bg-white/5 cursor-pointer text-[1vw] text-white/80 hover:text-white transition-colors" onClick={() => { navigate(`/${language}/user/billing`); setOpenAccount(false); }}><div style={{ transform: 'scale(1.2)' }}><Billing /></div> <span>{t('billingPlan')}</span></li>
                                        <li className="flex items-center gap-[0.8vw] px-[0.8vw] py-[1.2vh] rounded-[0.5vw] hover:bg-white/5 cursor-pointer text-[1vw] text-white/80 hover:text-white transition-colors" onClick={() => { navigate(`/${language}/user/support`); setOpenAccount(false); }}><div style={{ transform: 'scale(1.2)' }}><Support /></div> <span>{t('support')}</span></li>
                                        <div className="h-px bg-[#2a2a30] my-[0.5vh] w-full" />
                                        <li className="flex items-center gap-[0.8vw] px-[0.8vw] py-[1.2vh] rounded-[0.5vw] hover:bg-[#C5432D]/10 cursor-pointer text-[1vw] text-[#C5432D] transition-colors" onClick={onLogout}><div style={{ transform: 'scale(1.2)' }}><Signout /></div> <span>{t('signOut')}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {openMobileSidebar && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                        className="md:hidden fixed inset-0 bg-[#0C0C14] z-[10000] flex flex-col font-sans overflow-hidden"
                        dir={isAr ? 'rtl' : 'ltr'}
                    >
                        <div
                            className="flex items-center justify-between border-b border-white/5"
                            style={{ padding: '1rem 1rem' }}
                        >
                            <LogoText />
                            <button
                                onClick={() => setOpenMobileSidebar(false)}
                                className="text-white hover:bg-white/5 rounded-full transition-colors"
                                style={{ padding: '0.625rem' }}
                                aria-label={t('close')}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div
                            className="flex-1 overflow-y-auto flex flex-col"
                            style={{ padding: '1.2rem 0.725rem ' }}
                        >
                            <AnimatePresence mode="wait">
                                {mobileMenuView === 'main' ? (
                                    <motion.div
                                        key="main"
                                        initial={{ opacity: 0, x: isAr ? 30 : -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: isAr ? 30 : -30 }}
                                        transition={{ duration: 0.18, ease: "easeInOut" }}
                                        className="flex flex-col h-full"
                                    >
                                        <nav className="flex-1">
                                            {mobileNavItems.map((item, idx) => {
                                                const isActive = location.pathname.includes(`/${item.id}`);
                                                return (
                                                    <Link
                                                        key={item.id}
                                                        to={item.path}
                                                        onClick={() => setOpenMobileSidebar(false)}
                                                        className={`flex items-center gap-5 rounded-2xl transition-all duration-200 ${isActive
                                                            ? 'text-[#3457DC] bg-[#3457DC]/10'
                                                            : 'text-white/75 hover:text-white hover:bg-white/5'
                                                            } ${idx !== mobileNavItems.length - 1 ? 'mb-1' : ''}`}
                                                        style={{ padding: '1.125rem 0.875rem' }}
                                                    >
                                                        <div className={`flex-shrink-0 scale-110 ${isActive ? 'text-[#3457DC]' : 'text-white/50'}`}>
                                                            {item.icon}
                                                        </div>
                                                        <span className="font-semibold text-[15px] tracking-wide">{item.label}</span>
                                                    </Link>
                                                );
                                            })}
                                        </nav>

                                        <div className="mt-6 flex py-4 px-4 flex-col gap-3 pb-12">
                                            <div
                                                onClick={() => setMobileMenuView('profile')}
                                                className="flex items-center justify-between p-12 bg-[#121217] rounded-2xl border border-white/5 cursor-pointer hover:bg-white/[0.07] active:scale-[0.98] transition-all duration-200"
                                                style={{ padding: '1rem 0.875rem', gap: '1.125rem', marginBottom: '1.125rem' }}
                                            >
                                                <div className="flex items-center gap-8">
                                                    <img
                                                        src={avatarUrl}
                                                        alt={user?.name || "User"}
                                                        className="w-[58px] h-[58px] rounded-full object-cover border-2 border-[#3457DC]/30 flex-shrink-0"
                                                    />
                                                    <div className="flex flex-col items-start gap-1.5">
                                                        <span className=" relative left-2 text-white font-bold text-[15px] tracking-wide leading-tight">{user?.name || "User"}</span>
                                                        {isSupport ? (
                                                            <div className="flex items-center gap-1.5 bg-[#1C1C1F] px-2.5 py-0.5 rounded-full border border-white/5">
                                                                <span className="text-white text-[11px] font-medium tracking-wide">{t(supportBadge.labelKey)}</span>
                                                                <img src={supportBadge.icon} alt={t(supportBadge.labelKey)} className="w-3 h-3" />
                                                            </div>
                                                        ) : isPremium ? (
                                                            <div className="text-xs px-3 py-1 bg-white/10 rounded-full text-white font-medium mt-1 inline-block w-fit">Premium</div>
                                                        ) : (
                                                            <div className="text-xs px-3 py-1 bg-white/10 rounded-full text-white font-medium mt-1 inline-block w-fit">Free</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0 opacity-70">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d={isAr ? "M15 18L9 12L15 6" : "M9 5L16 12L9 19"} stroke="#3457DC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="profile"
                                        initial={{ opacity: 0, x: isAr ? -30 : 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: isAr ? -30 : 30 }}
                                        transition={{ duration: 0.18, ease: "easeInOut" }}
                                        className="flex flex-col h-full"
                                    >
                                        <button
                                            onClick={() => setMobileMenuView('main')}
                                            className="flex items-center gap-2 text-[#3457DC] font-semibold text-[15px] hover:opacity-70 transition-opacity mb-8"
                                        >
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d={isAr ? "M9 5L16 12L9 19" : "M15 18L9 12L15 6"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>{isAr ? 'العودة' : 'Back'}</span>
                                        </button>

                                        <div className="flex flex-col gap-1">
                                            {(location.pathname.startsWith('/support')
                                                ? [
                                                    { to: `/support`, icon: <Overview />, label: t('overview') || 'Overview' },
                                                    { to: `/support/inbox`, icon: <Support />, label: t('inbox') || 'Inbox' },
                                                    { to: `/support/account`, icon: <Account />, label: t('myAccount') || 'My Account' },
                                                ]
                                                : isAdmin
                                                    ? [
                                                        { to: `/admin/overview`, icon: <Overview />, label: t('overview') || 'Overview' },
                                                        { to: `/admin/users`, icon: <Account />, label: t('users') || 'Users' },
                                                        { to: `/admin/support`, icon: <Support />, label: t('support') || 'Support' },
                                                    ]
                                                    : [
                                                        { to: `/${language}/user/overview`, icon: <Overview />, label: 'Overview' },
                                                        { to: `/${language}/user/billing`, icon: <Billing />, label: t('billingPlan') || 'Billing Plan' },
                                                        { to: `/${language}/user/support`, icon: <Support />, label: t('support') || 'Support' },
                                                        { to: `/${language}/user/account/profile`, icon: <Account />, label: t('myAccount') || 'My Account' },
                                                    ]).map(({ to, icon, label }) => (
                                                        <Link
                                                            key={to}
                                                            to={to}
                                                            className="flex items-center gap-5 rounded-2xl text-white/80 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all duration-200"
                                                            style={{ padding: '1.125rem 0.875rem' }}
                                                            onClick={() => setOpenMobileSidebar(false)}
                                                        >
                                                            <div className="scale-110 text-white/50 flex-shrink-0">{icon}</div>
                                                            <span className="font-semibold text-[15px]">{label}</span>
                                                        </Link>
                                                    ))}

                                            <div className="w-full h-px bg-white/5 my-2" />

                                            <button
                                                onClick={onLogout}
                                                className="flex items-center gap-5 rounded-2xl text-[#C5432D] w-full hover:bg-[#C5432D]/10 active:bg-[#C5432D]/20 transition-all duration-200"
                                                style={{ padding: '1.125rem 0.875rem' }}
                                            >
                                                <div className="scale-110 flex-shrink-0"><Signout /></div>
                                                <span className="font-semibold text-[15px]">{t('signOut') || 'Sign Out'}</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
