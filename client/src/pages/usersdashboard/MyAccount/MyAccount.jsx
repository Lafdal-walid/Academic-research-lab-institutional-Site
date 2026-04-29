import React, { useState } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import arrowIcon from '@/assets/svg/myaccount/index.svg';
import PersonalInfo from './pages/PersonalInfo';
import SecurityLogin from './pages/SecurityLogin';
import Preferences from './pages/Preferences';
import NotFound from '@/pages/main/NotFound';

const theme = {
    accent: '#3457DC',
    dashboardCard: '#151519',
    cardBorder: '#262626',
    neutralGrey: '#9a9a9a',
    hoverBg: '#2a2a30',
};

export default function MyAccount() {
    const { language, direction } = useLanguage();
    const { t } = useTranslation('account');
    const location = useLocation();
    const [tabsOpen, setTabsOpen] = useState(false);
    
    const isRTL = direction === 'rtl';
    const activeTab = location.pathname.split('/').pop(); // Gets 'profile', 'security', or 'preferences'

    const tabs = [
        { id: 'profile', path: 'profile', label: t('personalInfo') },
        { id: 'security', path: 'security', label: t('securityLogin') },
        { id: 'preferences', path: 'preferences', label: t('preferences') }
    ];

    const activeLabel = tabs.find(tab => tab.id === activeTab)?.label || t('personalInfo');

    return (
        <div className="flex flex-col gap-[4vh] font-poppins animate-in fade-in duration-500" style={{ width: '100%', minHeight: '100vh', background: '#0a070e', alignItems: 'center' }}>
            <style>{`
                .tab-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                    padding: 1vh 0 0.8vh 0;
                    transition: all 0.3s ease;
                    font-family: "Poppins", sans-serif;
                    font-size: 1vw;
                    white-space: nowrap;
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    text-decoration: none;
                }
                
                @media (max-width: 767px) {
                    .tab-btn {
                        font-size: 14px;
                    }
                }

                .mobile-tab-trigger {
                    display: none;
                }

                @media (max-width: 767px) {
                    .account-tabs {
                        display: none !important;
                    }
                    .mobile-tab-trigger {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 8px;
                        cursor: pointer;
                        margin: 20px 16px 24px 16px;
                        position: relative;
                        width: calc(100% - 32px);
                    }
                    .mobile-tab-trigger p {
                        font-family: "Poppins", sans-serif;
                        font-weight: 600;
                        font-size: 13px;
                        color: ${theme.accent};
                        padding-bottom: 6px;
                        border-bottom: 3px solid ${theme.accent};
                    }
                    .mobile-tab-arrow {
                        width: 16px;
                        height: 16px;
                        transition: transform 0.3s ease;
                    }
                    .mobile-tab-arrow.open {
                        transform: rotate(180deg);
                    }
                    .mobile-tab-dropdown {
                        display: none;
                        position: absolute;
                        top: calc(100% + 8px);
                        left: 0;
                        background-color: ${theme.dashboardCard};
                        border: 1px solid ${theme.cardBorder};
                        border-radius: 12px;
                        padding: 8px 0;
                        min-width: 220px;
                        z-index: 100;
                        flex-direction: column;
                        animation: dropdownFadeIn 0.2s ease-out;
                    }
                    .mobile-tab-dropdown.open {
                        display: flex;
                    }
                    .mobile-tab-dropdown a {
                        padding: 12px 16px;
                        text-decoration: none;
                        font-family: "Poppins", sans-serif;
                        font-size: 14px;
                        font-weight: 500;
                        color: ${theme.neutralGrey};
                        transition: background-color 0.2s;
                    }
                    .mobile-tab-dropdown a:hover {
                        background-color: ${theme.hoverBg};
                    }
                    .mobile-tab-dropdown a.active {
                        color: ${theme.accent};
                    }
                }

                @keyframes dropdownFadeIn {
                    from { opacity: 0; transform: translateY(-4px); }
                    to { opacity: 1; transform: translateY(0); }
                }

            `}</style>

            {/* Tabs Row - Desktop */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '2vw', 
                position: 'relative',
                padding: '0',
                margin: '0.5vh 0 0 0',
                width: '100%',
                justifyContent: 'flex-start'
            }} className="account-tabs">
                {tabs.map((tab) => (
                    <Link 
                        key={tab.id}
                        to={`/usersdashboard/account/${tab.path}`} 
                        className="tab-btn"
                        style={{
                            color: activeTab === tab.id ? theme.accent : '#A5A5B2',
                            fontWeight: activeTab === tab.id ? 700 : 500
                        }}
                    >
                        <span style={{ marginTop: '2px' }}>{tab.label}</span>
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="accountTabUnderline"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    backgroundColor: '#3457DC',
                                    borderRadius: '999px',
                                    boxShadow: '0 0 8px rgba(52,87,220,0.6)'
                                }}
                            />
                        )}
                    </Link>
                ))}
            </div>

            {/* Mobile Tab Trigger */}
            <div className="mobile-tab-trigger" onClick={() => setTabsOpen(!tabsOpen)}>
                <p>{activeLabel}</p>
                <img src={arrowIcon} alt="Toggle" className={`mobile-tab-arrow${tabsOpen ? ' open' : ''}`} />
                <div className={`mobile-tab-dropdown${tabsOpen ? ' open' : ''}`}>
                    {tabs.map((tab) => (
                        <Link 
                            key={tab.id}
                            to={`/usersdashboard/account/${tab.path}`}
                            className={activeTab === tab.id ? 'active' : ''}
                            onClick={() => setTabsOpen(false)}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Internal Content Area */}
            <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Routes>
                    <Route index element={<Navigate to="profile" replace />} />
                    <Route path="profile" element={<PersonalInfo />} />
                    <Route path="security" element={<SecurityLogin />} />
                    <Route path="preferences" element={<Preferences />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}
