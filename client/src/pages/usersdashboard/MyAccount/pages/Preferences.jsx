import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { RiArrowDownSLine, RiArrowUpSLine, RiCheckLine } from 'react-icons/ri';
import English from '@/assets/svg/mainheader/EnglishIcon.jsx';
import Arabic from '@/assets/svg/mainheader/ArabicIcon.jsx';
import arrowIcon from '@/assets/svg/myaccount/index.svg';

const theme = {
    accent: '#3457DC',
    dashboardCard: '#151519',
    cardBorder: '#262626',
    neutralGrey: '#9a9a9a',
    inputBg: 'rgba(255,255,255,0.01)',
    hoverBg: '#2a2a30',
};

const svgPaths = {
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
                    {isOpen ? <RiArrowDownSLine size={24} style={{ color: theme.accent, transform: 'rotate(180deg)' }} /> : <RiArrowDownSLine size={24} style={{ color: theme.accent }} />}
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
        <>
            <style>{`
                
                .preferences-root.root-inner {
                    padding-bottom: 80px;
                    width: 100%;
                    min-height: 100vh;
                    background-color: transparent;
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

            <div className="flex flex-col gap-[4vh] w-full items-center">

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
                            {/* Lab Activity Alerts */}
                            <div className="pref-row" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1.8vw' }}>
                                <CheckboxChecked />
                                <div className="pref-row" style={{ display: 'flex', alignItems: 'center', gap: '0.9vw' }}>
                                    <p className="pref-checkbox-label" style={{ fontSize: '1.05vw' }}>Lab Activity Alerts</p>
                                    <p className="pref-desc" style={{ fontSize: '1.05vw' }}>( {t('always_enabled')} )</p>
                                </div>
                            </div>

                            {/* Publication Notifications */}
                            <div className="pref-row" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1.8vw' }} onClick={() => togglePreference('promotions')}>
                                {preferences.promotions ? <CheckboxChecked /> : <CheckboxUnchecked />}
                                <p className="pref-checkbox-label" style={{ fontSize: '1.05vw' }}>Publication & Research Notifications</p>
                            </div>

                            {/* Conference & Event Announcements */}
                            <div className="pref-row" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1.8vw' }} onClick={() => togglePreference('giveaways')}>
                                {preferences.giveaways ? <CheckboxChecked /> : <CheckboxUnchecked />}
                                <p className="pref-checkbox-label" style={{ fontSize: '1.05vw' }}>Conference & Event Announcements</p>
                            </div>

                            {/* Grant & Funding Opportunities */}
                            <div className="pref-row" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1.8vw' }} onClick={() => togglePreference('referral')}>
                                {preferences.referral ? <CheckboxChecked /> : <CheckboxUnchecked />}
                                <p className="pref-checkbox-label" style={{ fontSize: '1.05vw' }}>Grant & Funding Opportunities</p>
                            </div>

                            {/* Lab Meeting Reminders */}
                            <div className="pref-row" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1.8vw' }} onClick={() => togglePreference('updates')}>
                                {preferences.updates ? <CheckboxChecked /> : <CheckboxUnchecked />}
                                <p className="pref-checkbox-label" style={{ fontSize: '1.05vw' }}>Lab Meeting & Schedule Reminders</p>
                            </div>

                            {/* Supervisor Responses */}
                            <div className="pref-row" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1.8vw' }} onClick={() => togglePreference('support')}>
                                {preferences.support ? <CheckboxChecked /> : <CheckboxUnchecked />}
                                <p className="pref-checkbox-label" style={{ fontSize: '1.05vw' }}>Supervisor & Team Responses</p>
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
        </>
    );
}
