import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';
import { RiArrowDownSLine, RiArrowUpSLine, RiCheckLine } from 'react-icons/ri';
import UserLayout from '@/components/common/user/Layout';
import arrowIcon from '@/assets/svg/myaccount/index.svg';
import English from '@/assets/svg/mainheader/EnglishIcon.jsx';
import Arabic from '@/assets/svg/mainheader/ArabicIcon.jsx';

const theme = {
    accent: '#3457DC',
    dashboardCard: '#151519',
    cardBorder: '#262626',
    neutralGrey: '#9a9a9a',
    inputBg: 'rgba(255,255,255,0.01)',
    hoverBg: '#2a2a30',
};

const svgPaths = {
    usFlag: {
        stripes: "M0 1.3825H16ZM0 3.225H16ZM0 5.075H16ZM0 6.925H16ZM0 8.775H16ZM0 10.625H16Z",
        whiteStripes: "M0 0.92V1.845H16V0.92H0ZM0 2.7625V3.6875H16V2.7625H0ZM0 4.6125V5.5375H16V4.6125H0ZM0 6.4625V7.3875H16V6.4625H0ZM0 8.3125V9.2375H16V8.3125H0ZM0 10.1625V11.0875H16V10.1625H0Z",
        stars: "M8.35 5.45L8.575 6.125L8 5.7H8.7L8.125 6.125L8.35 5.45ZM6.85 5.45L7.075 6.125L6.5 5.7H7.2L6.625 6.125L6.85 5.45ZM5.325 5.45L5.55 6.125L4.975 5.7H5.675L5.1 6.125L5.325 5.45ZM3.8 5.45L4.025 6.125L3.45 5.7H4.15L3.575 6.125L3.8 5.45ZM2.275 5.45L2.5 6.125L1.925 5.7H2.625L2.05 6.125L2.275 5.45ZM0.75 5.45L0.975 6.125L0.4 5.7H1.1L0.525 6.125L0.75 5.45ZM7.6 4.8L7.825 5.475L7.25 5.05H7.95L7.375 5.475L7.6 4.8ZM6.075 4.8L6.3 5.475L5.725 5.05H6.425L5.85 5.475L6.075 4.8ZM4.575 4.8L4.8 5.475L4.225 5.05H4.925L4.35 5.475L4.575 4.8ZM3.05 4.8L3.275 5.475L2.7 5.05H3.4L2.825 5.475L3.05 4.8ZM1.525 4.8L1.75 5.475L1.175 5.05H1.875L1.3 5.475L1.525 4.8ZM8.35 4.15L8.575 4.825L8 4.4H8.7L8.125 4.825L8.35 4.15ZM6.85 4.15L7.075 4.825L6.5 4.4H7.2L6.625 4.825L6.85 4.15ZM5.325 4.15L5.55 4.825L4.975 4.4H5.675L5.1 4.825L5.325 4.15ZM3.8 4.15L4.025 4.825L3.45 4.4H4.15L3.575 4.825L3.8 4.15ZM2.275 4.15L2.5 4.825L1.925 4.4H2.625L2.05 4.825L2.275 4.15ZM0.75 4.15L0.975 4.825L0.4 4.4H1.1L0.525 4.825L0.75 4.15ZM7.6 3.525L7.825 4.2L7.25 3.775H7.95L7.375 4.2L7.6 3.525ZM6.075 3.525L6.3 4.2L5.725 3.775H6.425L5.85 4.2L6.075 3.525ZM4.575 3.525L4.8 4.2L4.225 3.775H4.925L4.35 4.2L4.575 3.525ZM3.05 3.525L3.275 4.2L2.7 3.775H3.4L2.825 4.2L3.05 3.525ZM1.525 3.525L1.75 4.2L1.175 3.775H1.875L1.3 4.2L1.525 3.525ZM8.35 2.875L8.575 3.55L8 3.125H8.7L8.125 3.55L8.35 2.875ZM6.85 2.875L7.075 3.55L6.5 3.125H7.2L6.625 3.55L6.85 2.875ZM5.325 2.875L5.55 3.55L4.975 3.125H5.675L5.1 3.55L5.325 2.875ZM3.8 2.875L4.025 3.55L3.45 3.125H4.15L3.575 3.55L3.8 2.875ZM2.275 2.875L2.5 3.55L1.925 3.125H2.625L2.05 3.55L2.275 2.875ZM0.75 2.875L0.975 3.55L0.4 3.125H1.1L0.525 3.55L0.75 2.875ZM7.6 2.225L7.825 2.9L7.25 2.475H7.95L7.375 2.9L7.6 2.225ZM6.075 2.225L6.3 2.9L5.725 2.475H6.425L5.85 2.9L6.075 2.225ZM4.575 2.225L4.8 2.9L4.225 2.475H4.925L4.35 2.9L4.575 2.225ZM3.05 2.225L3.275 2.9L2.7 2.475H3.4L2.825 2.9L3.05 2.225ZM1.525 2.225L1.75 2.9L1.175 2.475H1.875L1.3 2.9L1.525 2.225ZM8.35 1.575L8.575 2.25L8 1.825H8.7L8.125 2.25L8.35 1.575ZM6.85 1.575L7.075 2.25L6.5 1.825H7.2L6.625 2.25L6.85 1.575ZM5.325 1.575L5.55 2.25L4.975 1.825H5.675L5.1 2.25L5.325 1.575ZM3.8 1.575L4.025 2.25L3.45 1.825H4.15L3.575 2.25L3.8 1.575ZM2.275 1.575L2.5 2.25L1.925 1.825H2.625L2.05 2.25L2.275 1.575ZM0.75 1.575L0.975 2.25L0.4 1.825H1.1L0.525 2.25L0.75 1.575ZM7.6 0.925L7.825 1.6L7.25 1.175H7.95L7.375 1.6L7.6 0.925ZM6.075 0.925L6.3 1.6L5.725 1.175H6.425L5.85 1.6L6.075 0.925ZM4.575 0.925L4.8 1.6L4.225 1.175H4.925L4.35 1.6L4.575 0.925ZM3.05 0.925L3.275 1.6L2.7 1.175H3.4L2.825 1.6L3.05 0.925ZM1.525 0.925L1.75 1.6L1.175 1.175H1.875L1.3 1.6L1.525 0.925ZM8.35 0.275L8.575 0.95L8 0.525H8.7L8.125 0.95L8.35 0.275ZM6.85 0.275L7.075 0.95L6.5 0.525H7.2L6.625 0.95L6.85 0.275ZM5.325 0.275L5.55 0.95L4.975 0.525H5.675L5.1 0.95L5.325 0.275ZM3.8 0.275L4.025 0.95L3.45 0.525H4.15L3.575 0.95L3.8 0.275ZM2.275 0.275L2.5 0.95L1.925 0.525H2.625L2.05 0.95L2.275 0.275ZM0.75 0.275L0.975 0.95L0.4 0.525H1.1L0.525 0.95L0.75 0.275Z"
    },
    saFlag: {
        green: "M0 0H18V12H0V0Z",
        sword1: "M11.3016 8.49609C11.5172 8.50547 11.6578 8.50781 11.8477 8.52891L12.0727 8.50547C12.3211 8.48203 12.3305 8.85938 12.3305 8.85938C12.3305 9.08203 12.2438 9.09375 12.1336 9.11719C12.0703 9.12656 12.0398 9.07969 12.0047 9.03281C11.9517 9.0498 11.8952 9.05303 11.8406 9.04219C11.7492 9.0375 11.6602 9.0375 11.5711 9.03047C11.4773 9.02344 11.4258 9.04219 11.3297 9.03281C11.3109 9.06328 11.2828 9.10547 11.2266 9.09375C11.1797 9.08672 11.1211 8.95313 11.1375 8.84766C11.1727 8.77266 11.1609 8.79844 11.1609 8.76563C10.2797 8.74219 9.39141 8.70234 8.52891 8.71406C7.85391 8.71641 7.18828 8.74453 6.52031 8.77266C6.16406 8.76797 5.89219 8.71172 5.70469 8.4375C5.72344 8.4375 6.61406 8.48672 6.87422 8.47031C7.35469 8.46563 7.79531 8.42578 8.28516 8.41172C9.25078 8.42813 10.2094 8.42813 11.175 8.49609C11.0812 8.43281 11.0812 8.28516 11.2219 8.24766C11.2336 8.23828 11.2406 8.32031 11.2617 8.31797C11.3766 8.31094 11.325 8.46563 11.3016 8.49609ZM7.42031 3.17109C7.275 3.58828 7.50469 4.04766 7.66406 4.00313C7.78125 4.05 7.85156 3.82969 7.89844 3.59063C7.93359 3.52266 7.95703 3.51563 7.97344 3.55078C7.96875 3.86953 7.99687 3.94219 8.07891 4.03828C8.26172 4.17891 8.41406 4.05703 8.42578 4.04531L8.56641 3.90234C8.59922 3.86719 8.64141 3.86719 8.68594 3.89531C8.73047 3.93516 8.72344 4.00313 8.81719 4.05C8.89687 4.08281 9.06328 4.05938 9.10312 3.99141C9.15469 3.9 9.16875 3.86953 9.19219 3.83672C9.22969 3.7875 9.29297 3.80859 9.29297 3.825C9.28594 3.85313 9.24844 3.87891 9.27422 3.93047C9.32109 3.96328 9.33047 3.94219 9.35625 3.93516C9.45 3.88828 9.52031 3.68672 9.52031 3.68672C9.52266 3.61172 9.48047 3.61641 9.45234 3.63516L9.37969 3.68438C9.33281 3.69141 9.24609 3.72188 9.20156 3.65391C9.15703 3.57422 9.15703 3.45938 9.12422 3.37734C9.12422 3.37266 9.06328 3.24844 9.11953 3.24141C9.14766 3.24609 9.20625 3.2625 9.21563 3.21328C9.24375 3.16406 9.15469 3.02578 9.09141 2.95547C9.0375 2.89688 8.9625 2.88984 8.88984 2.95078C8.83828 2.99766 8.84531 3.04922 8.83594 3.09844C8.82705 3.13371 8.82666 3.17059 8.83481 3.20604C8.84296 3.24149 8.85941 3.2745 8.88281 3.30234C8.93437 3.40078 9.02578 3.52969 8.99531 3.7125C8.99531 3.7125 8.94141 3.79688 8.84766 3.78516C8.80781 3.77813 8.74453 3.76172 8.71172 3.50859C8.68594 3.32109 8.71641 3.05391 8.63672 2.92969C8.60625 2.85234 8.58516 2.77969 8.51484 2.90859C8.49609 2.96016 8.41406 3.0375 8.47266 3.19453C8.5281 3.33604 8.5443 3.48989 8.51953 3.63984C8.48437 3.69141 8.47734 3.70781 8.43281 3.75703C8.37187 3.82734 8.30391 3.80859 8.25234 3.78281C8.20547 3.75234 8.16797 3.73594 8.14453 3.63047C8.14922 3.46641 8.15859 3.19688 8.12812 3.14063C8.08359 3.05156 8.01094 3.08438 7.98047 3.1125C7.84105 3.26738 7.74769 3.45816 7.71094 3.66328C7.66875 3.79922 7.62422 3.75938 7.59375 3.70547C7.51875 3.63516 7.51172 3.07969 7.42031 3.17109Z"
    },
    arrow: "M15.8842 6.545C15.7681 6.42884 15.6302 6.3367 15.4785 6.27383C15.3268 6.21096 15.1642 6.1786 15 6.1786C14.8358 6.1786 14.6732 6.21096 14.5215 6.27383C14.3698 6.3367 14.2319 6.42884 14.1158 6.545L10.2942 10.3658C10.216 10.4439 10.1101 10.4878 9.99958 10.4878C9.8891 10.4878 9.78314 10.4439 9.705 10.3658L5.88417 6.545C5.64978 6.3105 5.33184 6.17872 5.00029 6.17864C4.66875 6.17857 4.35075 6.3102 4.11625 6.54458C3.88175 6.77897 3.74997 7.09691 3.74989 7.42845C3.74982 7.76 3.88145 8.078 4.11583 8.3125L7.9375 12.1342C8.20834 12.405 8.52989 12.6199 8.88377 12.7665C9.23766 12.9131 9.61695 12.9885 10 12.9885C10.383 12.9885 10.7623 12.9131 11.1162 12.7665C11.4701 12.6199 11.7917 12.405 12.0625 12.1342L15.8842 8.3125C16.1185 8.07809 16.2502 7.76021 16.2502 7.42875C16.2502 7.09729 16.1185 6.77941 15.8842 6.545Z",
    checkbox: {
        border: "M15.0417 0H3.95833C2.9089 0.00125705 1.90282 0.418698 1.16076 1.16076C0.418698 1.90282 0.00125705 2.9089 0 3.95833L0 15.0417C0.00125705 16.0911 0.418698 17.0972 1.16076 17.8392C1.90282 18.5813 2.9089 18.9987 3.95833 19H15.0417C16.0911 18.9987 17.0972 18.5813 17.8392 17.8392C18.5813 17.0972 18.9987 16.0911 19 15.0417V3.95833C18.9987 2.9089 18.5813 1.90282 17.8392 1.16076C17.0972 0.418698 16.0911 0.00125705 15.0417 0ZM17.4167 15.0417C17.4167 15.6716 17.1664 16.2756 16.721 16.721C16.2756 17.1664 15.6716 17.4167 15.0417 17.4167H3.95833C3.32844 17.4167 2.72435 17.1664 2.27895 16.721C1.83356 16.2756 1.58333 15.6716 1.58333 15.0417V3.95833C1.58333 3.32844 1.83356 2.72435 2.27895 2.27895C2.72435 1.83356 3.32844 1.58333 3.95833 1.58333H15.0417C15.6716 1.58333 16.2756 1.83356 16.721 2.27895C17.1664 2.72435 17.4167 3.32844 17.4167 3.95833V15.0417Z",
        fill: "M17.4167 15.0417C17.4167 15.6716 17.1664 16.2756 16.721 16.721C16.2756 17.1664 15.6716 17.4167 15.0417 17.4167H3.95833C3.32844 17.4167 2.72435 17.1664 2.27895 16.721C1.83356 16.2756 1.58333 15.6716 1.58333 15.0417V3.95833C1.58333 3.32844 1.83356 2.72435 2.27895 2.27895C2.72435 1.83356 3.32844 1.58333 3.95833 1.58333H15.0417C15.6716 1.58333 16.2756 1.83356 16.721 2.27895C17.1664 2.72435 17.4167 3.32844 17.4167 3.95833V15.0417Z",
        check: "M7.38863 12.6025L4.28608 9.5C4.13762 9.35159 3.9363 9.26821 3.72637 9.26821C3.51645 9.26821 3.31513 9.35159 3.16667 9.5C3.01825 9.64846 2.93488 9.84979 2.93488 10.0597C2.93488 10.2696 3.01825 10.471 3.16667 10.6194L6.26921 13.722C6.41624 13.8691 6.59082 13.9857 6.78296 14.0653C6.9751 14.145 7.18104 14.1859 7.38902 14.1859C7.597 14.1859 7.80294 14.145 7.99508 14.0653C8.18723 13.9857 8.3618 13.8691 8.50883 13.722L15.8333 6.39746C15.9817 6.249 16.0651 6.04767 16.0651 5.83775C16.0651 5.62783 15.9817 5.4265 15.8333 5.27804C15.6849 5.12963 15.4835 5.04625 15.2736 5.04625C15.0637 5.04625 14.8624 5.12963 14.7139 5.27804L7.38863 12.6025Z"
    }
};

const CheckboxChecked = () => (
    <div className="pref-checkbox-icon" style={{ width: '1.4vw', height: '1.4vw', cursor: 'pointer' }}>
        <svg style={{ width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.checkbox.border} fill="#3457DC" />
            <path d={svgPaths.checkbox.fill} fill="#3457DC" />
            <path d={svgPaths.checkbox.check} fill="white" />
        </svg>
    </div>
);

const CheckboxUnchecked = () => (
    <div className="pref-checkbox-icon" style={{ width: '1.4vw', height: '1.4vw', cursor: 'pointer' }}>
        <svg style={{ width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.checkbox.border} fill="#9A9A9A" />
        </svg>
    </div>
);

const CustomDropdown = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const selected = options.find(opt => opt.value === value) || options[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%' }} ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="pref-input-trigger"
                style={{ backgroundColor: 'rgba(255,255,255,0.01)', borderRadius: '0.6vw', width: '100%', border: isOpen ? '1px solid #3457DC' : '1px solid #1e1d22', height: '5.5vh', cursor: 'pointer', transition: 'border 0.2s' }}
            >
                <div className="pref-input-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', padding: '0 1.05vw' }}>
                    <div className="pref-input-gap" style={{ display: 'flex', alignItems: 'center', gap: '0.9vw' }}>
                        {selected.flag}
                        <p className="pref-input-text" style={{ color: 'white', whiteSpace: 'nowrap', fontSize: '1.05vw', margin: 0, fontWeight: 500, fontFamily: 'Poppins, sans-serif' }}>{selected.label}</p>
                    </div>
                    {isOpen ? <RiArrowUpSLine size={24} style={{ color: theme.accent }} /> : <RiArrowDownSLine size={24} style={{ color: theme.accent }} />}
                </div>
            </div>

            {isOpen && (
                <div className="pref-dropdown-panel" style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.6vh)',
                    left: 0,
                    width: '100%',
                    backgroundColor: '#12141c',
                    border: `1px solid ${theme.cardBorder}`,
                    borderRadius: '0.8vw',
                    overflow: 'hidden',
                    zIndex: 50,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}>
                    <div className="pref-dropdown-inner" style={{ padding: '0.6vh', display: 'flex', flexDirection: 'column', gap: '0.4vh' }}>
                        {options.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className="pref-dropdown-item"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '1.2vh 1vw',
                                    borderRadius: '0.6vw',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    backgroundColor: opt.value === value ? 'rgba(52, 87, 220, 0.1)' : 'transparent',
                                    border: `1px solid ${opt.value === value ? theme.accent : 'transparent'}`
                                }}
                                onMouseEnter={(e) => { if (opt.value !== value) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
                                onMouseLeave={(e) => { if (opt.value !== value) e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                                <div className="pref-input-gap" style={{ display: 'flex', alignItems: 'center', gap: '0.9vw' }}>
                                    {opt.flag}
                                    <span className="pref-dropdown-item-text" style={{ fontSize: '1vw', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: opt.value === value ? theme.accent : theme.neutralGrey }}>{opt.label}</span>
                                </div>
                                {opt.value === value && <RiCheckLine size={20} style={{ color: theme.accent }} />}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const initialPreferences = {
    promotions: true,
    giveaways: true,
    referral: true,
    updates: false,
    support: false,
};

export default function Preferences() {
    const { language, setLanguage } = useLanguage();
    const { t } = useTranslation('account');
    const [tabsOpen, setTabsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(language);
    const [currency, setCurrency] = useState('usd');
    const [preferences, setPreferences] = useState(initialPreferences);

    const hasChanges = JSON.stringify(preferences) !== JSON.stringify(initialPreferences) || selectedLanguage !== language;

    const handleSave = () => {
        if (!hasChanges) return;
        if (selectedLanguage !== language) {
            setLanguage(selectedLanguage);
        }
    };

    const usFlagNode = (
        <div className="pref-flag" style={{ width: '1.4vw', height: '1.05vh' }}>
            <svg style={{ width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 16 12">
                <path d="M0 0H16V12H0" fill="#BD3D44" />
                <path d={svgPaths.usFlag.stripes} fill="black" />
                <path d={svgPaths.usFlag.whiteStripes} fill="white" />
                <path d="M0 0H9.12V6.4625H0" fill="#192F5D" />
                <path d={svgPaths.usFlag.stars} fill="white" />
            </svg>
        </div>
    );

    const saFlagNode = (
        <div className="pref-flag" style={{ width: '1.4vw', height: '1.05vh', position: 'relative', overflow: 'hidden' }}>
            <svg style={{ position: 'absolute', width: '100%', height: '100%', left: '-6.25%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 18 12">
                <path fillRule="evenodd" clipRule="evenodd" d={svgPaths.saFlag.green} fill="#165D31" />
                <path d={svgPaths.saFlag.sword1} fill="white" fillRule="evenodd" clipRule="evenodd" />
            </svg>
        </div>
    );

    const languageOptions = [
        { value: 'en', label: 'English', flag: <English /> },
        { value: 'ar', label: 'العربية Arabic', flag: <Arabic /> },
    ];

    const currencyOptions = [
        { value: 'usd', label: 'USD ($)' },
        { value: 'sar', label: 'SAR (SR)' },
        { value: 'eur', label: 'EUR (€)' }
    ];

    const togglePreference = (key) => {
        setPreferences({ ...preferences, [key]: !preferences[key] });
    };

    return (
        <UserLayout>
            <style>{`
                .account-tabs {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                    margin: 30px auto 32px auto;
                    padding-left: 0;
                    padding-right: 24px;
                    width: 100%;
                }

                @media (max-width: 767px) {
                    .account-tabs {
                        margin: 20px 0 24px 0;
                        padding-right: 0;
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                        justify-content: flex-start;
                        gap: 24px;
                    }
                }

                @media (min-width: 1024px) {
                    .account-tabs {
                        gap: 1vw;
                        margin: 3vh auto 3.5vh auto;
                        padding-right: 1.5vw;
                    }
                }

                .tab-link {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    text-decoration: none;
                }

                .tab-text {
                    font-family: 'Poppins, sans-serif';
                    font-weight: 500;
                    font-size: 14px;
                    white-space: nowrap;
                }

                @media (min-width: 1024px) {
                    .tab-text {
                        font-size: clamp(1vw, 1vw, 1vw);
                    }
                }

                .tab-indicator {
                    height: 3px;
                    border-radius: 9999px;
                    width: 100%;
                    transition: opacity 0.2s;
                }
                
                @media (min-width: 1024px) {
                    .tab-indicator {
                        height: 0.33vh;
                    }
                }

                .mobile-tab-trigger {
                    display: none;
                }
                .mobile-tab-dropdown {
                    display: none;
                }

                @keyframes dropdownFadeIn {
                    from { opacity: 0; transform: translateY(-4px); }
                    to { opacity: 1; transform: translateY(0); }
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
                        font-family: 'Poppins, sans-serif';
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
                        font-family: 'Poppins, sans-serif';
                        font-size: 14px;
                        font-weight: 500;
                        color: ${theme.neutralGrey};
                        transition: background-color 0.2s;
                    }
                    .mobile-tab-dropdown a:hover {
                        background-color: ${theme.hoverBg};
                    }
                    .mobile-tab-dropdown a.active-tab {
                        color: ${theme.accent};
                    }
                }
                
                .preferences-root.root-inner {
                    padding-top: 8px;
                    padding-bottom: 80px;
                    width: 100%;
                    min-height: 100vh;
                    background-color: #0a070e;
                }

                @media (max-width: 767px) {
                    .preferences-root.root-inner {
                        padding-left: 16px;
                        padding-right: 16px;
                    }
                }

                @media (min-width: 768px) {
                    .preferences-root.root-inner {
                        padding-left: 2rem;
                        padding-right: 2rem;
                        margin-left: 10px;
                    }
                }

                @media (min-width: 1024px) {
                    .preferences-root.root-inner {
                        margin-left: 0px; 
                    }
                }

                /* --- Responsive Preferences Card --- */
                .pref-label {
                    color: #80808a;
                    font-family: 'Poppins, sans-serif';
                    margin: 0;
                }
                .pref-section-title {
                    color: white;
                    font-family: 'Inter, sans-serif';
                    font-weight: 800;
                    margin: 0;
                }
                .pref-desc {
                    color: #a5a5b2;
                    font-family: 'Poppins, sans-serif';
                    margin: 0;
                }
                .pref-checkbox-label {
                    color: #e6e6e6;
                    white-space: nowrap;
                    font-family: 'Poppins, sans-serif';
                    margin: 0;
                    cursor: pointer;
                }

                @media (max-width: 767px) {
                    .pref-card {
                        border-radius: 16px !important;
                        padding: 16px !important;
                        gap: 24px !important;
                        max-width: 100% !important;
                    }
                    .pref-label {
                        font-size: 14px !important;
                    }
                    .pref-section-title {
                        font-size: 16px !important;
                    }
                    .pref-desc {
                        font-size: 14px !important;
                    }
                    .pref-checkbox-label {
                        font-size: 14px !important;
                    }
                    .pref-checkbox-icon {
                        width: 19px !important;
                        height: 19px !important;
                    }
                    .pref-btn-text {
                        font-size: 14px !important;
                    }
                    .pref-flag {
                        width: 16px !important;
                        height: 12px !important;
                    }
                    .pref-row {
                        gap: 12px !important;
                    }
                    .pref-btn {
                        border-radius: 12px !important;
                    }
                    .pref-btn-inner {
                        padding: 10px 24px !important;
                    }
                    /* Dropdown input trigger */
                    .pref-input-trigger {
                        border-radius: 8px !important;
                        height: 44px !important;
                    }
                    .pref-input-inner {
                        padding: 0 14px !important;
                    }
                    .pref-input-gap {
                        gap: 10px !important;
                    }
                    .pref-input-text {
                        font-size: 14px !important;
                    }
                    /* Dropdown panel */
                    .pref-dropdown-panel {
                        border-radius: 10px !important;
                        top: calc(100% + 6px) !important;
                    }
                    .pref-dropdown-inner {
                        padding: 6px !important;
                        gap: 4px !important;
                    }
                    .pref-dropdown-item {
                        padding: 10px 12px !important;
                        border-radius: 8px !important;
                    }
                    .pref-dropdown-item-text {
                        font-size: 14px !important;
                    }
                }
            `}</style>

            <div className="preferences-root root-inner">
                {/* Tabs - Desktop */}
                <div className="account-tabs">
                    <Link to={`/usersdashboard/account/profile`} className="tab-link">
                        <p className="tab-text" style={{ color: theme.neutralGrey }}>{t('personalInfo')}</p>
                        <div className="tab-indicator" style={{ backgroundColor: theme.accent, opacity: 0 }} />
                    </Link>
                    <Link to={`/usersdashboard/account/security`} className="tab-link">
                        <p className="tab-text" style={{ color: theme.neutralGrey }}>{t('securityLogin')}</p>
                        <div className="tab-indicator" style={{ backgroundColor: theme.accent, opacity: 0 }} />
                    </Link>
                    <Link to={`/usersdashboard/account/preferences`} className="tab-link">
                        <p className="tab-text" style={{ color: theme.accent }}>{t('preferences')}</p>
                        <div className="tab-indicator" style={{ backgroundColor: theme.accent, opacity: 1 }} />
                    </Link>
                </div>

                {/* Tabs - Mobile Dropdown */}
                <div className="mobile-tab-trigger" onClick={() => setTabsOpen(!tabsOpen)}>
                    <p>{t('preferences')}</p>
                    <img src={arrowIcon} alt="Toggle" className={`mobile-tab-arrow${tabsOpen ? ' open' : ''}`} />
                    <div className={`mobile-tab-dropdown${tabsOpen ? ' open' : ''}`}>
                        <Link to={`/usersdashboard/account/profile`}>{t('personalInfo')}</Link>
                        <Link to={`/usersdashboard/account/security`}>{t('securityLogin')}</Link>
                        <Link to={`/usersdashboard/account/preferences`} className="active-tab">{t('preferences')}</Link>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="pref-card" style={{ backgroundColor: '#151519', position: 'relative', borderRadius: '1.2vw', border: '1px solid #262626', width: '100%', display: 'flex', flexDirection: 'column', padding: '1.8vw', gap: '3.6vh', maxWidth: '84vw' }}>

                    {/* Language and Currency Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '2.4vh' }}>
                        {/* Language */}
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '1.5vh' }}>
                            <p className="pref-label" style={{ fontSize: '1.05vw' }}>{t('language')}</p>
                            <CustomDropdown
                                options={languageOptions}
                                value={selectedLanguage}
                                onChange={setSelectedLanguage}
                            />
                        </div>

                        {/* Currency */}
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '1.5vh' }}>
                            <p className="pref-label" style={{ fontSize: '1.05vw' }}>{t('currency')}</p>
                            <CustomDropdown
                                options={currencyOptions}
                                value={currency}
                                onChange={setCurrency}
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{ width: '100%', height: '0.1vh', backgroundColor: '#2A2A30' }} />

                    {/* Email Notifications Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '4vh' }}>
                        {/* Title and Description */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3vh' }}>
                            <p className="pref-section-title" style={{ fontSize: '1.1vw' }}>{t('email_notifications')}</p>
                            <p className="pref-desc" style={{ fontSize: '1.05vw' }}>
                                {t('choose_which_emails_you_receive')}
                            </p>
                        </div>

                        {/* Checkbox List */}
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '3vh' }}>
                            {/* Billing Alerts */}
                            <div className="pref-row" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1.8vw' }}>
                                <CheckboxChecked />
                                <div className="pref-row" style={{ display: 'flex', alignItems: 'center', gap: '0.9vw' }}>
                                    <p className="pref-checkbox-label" style={{ fontSize: '1.05vw' }}>{t('billing_alerts')}</p>
                                    <p className="pref-desc" style={{ fontSize: '1.05vw' }}>( {t('always_enabled')} )</p>
                                </div>
                            </div>

                            {/* Promotions & offers */}
                            <div className="pref-row" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1.8vw' }} onClick={() => togglePreference('promotions')}>
                                {preferences.promotions ? <CheckboxChecked /> : <CheckboxUnchecked />}
                                <p className="pref-checkbox-label" style={{ fontSize: '1.05vw' }}>{t('promotions_offers')}</p>
                            </div>

                            {/* Giveaway updates */}
                            <div className="pref-row" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1.8vw' }} onClick={() => togglePreference('giveaways')}>
                                {preferences.giveaways ? <CheckboxChecked /> : <CheckboxUnchecked />}
                                <p className="pref-checkbox-label" style={{ fontSize: '1.05vw' }}>{t('giveaway_updates')}</p>
                            </div>

                            {/* Referral activity */}
                            <div className="pref-row" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1.8vw' }} onClick={() => togglePreference('referral')}>
                                {preferences.referral ? <CheckboxChecked /> : <CheckboxUnchecked />}
                                <p className="pref-checkbox-label" style={{ fontSize: '1.05vw' }}>{t('referral_activity')}</p>
                            </div>

                            {/* Product updates & new features */}
                            <div className="pref-row" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1.8vw' }} onClick={() => togglePreference('updates')}>
                                {preferences.updates ? <CheckboxChecked /> : <CheckboxUnchecked />}
                                <p className="pref-checkbox-label" style={{ fontSize: '1.05vw' }}>{t('product_updates_new_features')}</p>
                            </div>

                            {/* Support responses */}
                            <div className="pref-row" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1.8vw' }} onClick={() => togglePreference('support')}>
                                {preferences.support ? <CheckboxChecked /> : <CheckboxUnchecked />}
                                <p className="pref-checkbox-label" style={{ fontSize: '1.05vw' }}>{t('support_responses')}</p>
                            </div>
                        </div>

                        {/* Save Changes Button */}
                        <div onClick={handleSave} className="pref-btn" style={{ backgroundColor: hasChanges ? theme.accent : '#1e1e24', borderRadius: '1vw', width: 'fit-content', cursor: hasChanges ? 'pointer' : 'default', marginTop: '2vh', transition: 'background-color 0.2s' }}>
                            <div className="pref-btn-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5vh 2.5vw' }}>
                                <p className="pref-btn-text" style={{ color: hasChanges ? 'white' : '#757575', fontWeight: 500, whiteSpace: 'nowrap', fontSize: '0.95vw', margin: 0, fontFamily: 'Poppins, sans-serif', transition: 'color 0.2s' }}>
                                    {t('save_changes')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
