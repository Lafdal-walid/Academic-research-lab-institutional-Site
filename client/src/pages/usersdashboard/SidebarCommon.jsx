import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import Leavereviewlink from '@/ui/user/Leavereviewlink';
import { RiArrowRightSLine } from "react-icons/ri";
import { X } from 'lucide-react';

const SidebarCommon = ({ items, isSidebarOpen = true, closeSidebar, className = "" }) => {
    const { t } = useTranslation('sidebar');
    const { direction } = useLanguage();
    const location = useLocation();

    const currentPath = location.pathname;

    return (
        <aside
            className={`sidebar fixed lg:static top-0 bottom-0 z-[50] border-r border-[#2a2a30]/70 w-[100vw] lg:w-[15.8vw] shrink-0 min-h-screen flex flex-col transition-all duration-300 ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100 lg:hidden'} ${className}`}
            style={{ backgroundColor: '#0A070E', listStyle: 'none' }}
            dir={direction}
        >
            <div className="relative flex items-center justify-center h-[11vh] ml-[0.75vw] shrink-0 mt-[0.5vh] mb-[2.2vh]">
                <Link to="/">
                    <img
                        src="/Saad Dahlab white.png"
                        alt="Saad Dahlab Logo"
                        className="h-[9vh] w-auto object-contain"
                    />
                </Link>
                {/* Mobile Close Button */}
                <button 
                    onClick={closeSidebar}
                    className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 text-white p-2"
                >
                    <X size={24} />
                </button>
            </div>

            <nav className="nav-links flex-1 px-[0.9vw] flex flex-col gap-[1.5vh] list-none">
                {items.map((item) => {
                    const isActive = currentPath === item.path ||
                        (item.path === '/admin' && currentPath === '/admin/overview') ||
                        (item.path === '/support' && currentPath === '/support/overview') ||
                        (currentPath.startsWith(item.path) && item.path !== '/admin' && item.path !== '/support' && item.path !== '/' && item.path !== '/usersdashboard' && item.path !== '/leaderdashboard');

                    return (
                        <React.Fragment key={item.id}>
                            <Link
                                to={item.path}
                                onClick={closeSidebar}
                                className={`nav-link flex items-center gap-3 lg:gap-[0.8vw] pl-4 lg:pl-[0.85vw] py-3 lg:py-[1.3vh] ml-3 lg:ml-[0.8vw] rounded-xl lg:rounded-[0.7vw] group pr-6 lg:pr-[2vw] ${isActive ? 'active-nav bg-[#3457DC] text-white' : 'text-white hover:bg-white/5'
                                    }`}
                            >
                                <div className="nav-link-content flex items-center gap-3 lg:gap-[0.8vw]">
                                    <div className={`nav-icon flex shrink-0 ${direction === 'rtl' ? 'rotate-180' : ''}`}>
                                        {React.isValidElement(item.icon) ? React.cloneElement(item.icon, { className: 'w-5 h-5 lg:w-[0.9vw] lg:h-[0.9vw]' }) : item.icon}
                                    </div>
                                    <span className="nav-text whitespace-nowrap text-[16px] lg:text-[1.1vw] font-[500]">
                                        {item.label || t(item.id)}
                                    </span>
                                </div>
                            </Link>

                            {/* Collapsible Submenu for Admin Tools (if ID is admintools) */}
                            {item.id === 'admintools' && currentPath.startsWith('/admin/tools') && (
                                <div className={`flex flex-col w-full ${direction === 'rtl' ? 'pr-[0.6vw]' : 'pl-[0.6vw]'} mt-[1.1vh] mb-[1.1vh]`}>
                                    <Link
                                        to="/admin/tools/support"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                            paddingTop: '0.6vh',
                                            paddingBottom: '0.6vh',
                                            paddingLeft: direction === 'rtl' ? '0vw' : '0.25vw',
                                            paddingRight: direction === 'rtl' ? '0.25vw' : '0vw',
                                            transition: 'all 0.3s ease',
                                            color: currentPath.startsWith('/admin/tools/support') ? '#3457DC' : '#ffffff',
                                            fontWeight: 500,
                                            textDecoration: 'none',
                                            gap: '0.25vw'
                                        }}
                                    >
                                        <div style={{
                                            transform: direction === 'rtl' ? 'rotate(180deg)' : 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            opacity: currentPath.startsWith('/admin/tools/support') ? 1 : 0.7,
                                            transition: 'opacity 0.3s ease',
                                            fontSize: '1.05vw'
                                        }}>
                                            <RiArrowRightSLine />
                                        </div>
                                        <span className="whitespace-nowrap" style={{
                                            fontSize: '0.9vw',
                                            fontFamily: 'Poppins, sans-serif'
                                        }}>
                                            {t('supportteam')}
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </nav>

            {!currentPath.startsWith('/admin') && (
                <div className="review-section px-[0.8vw] pb-[3vh] mt-auto flex justify-center">
                    <Leavereviewlink />
                </div>
            )}
        </aside>
    );
};

export default React.memo(SidebarCommon);
