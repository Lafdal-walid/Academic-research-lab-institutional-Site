import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';

import trashIcon from '@/assets/svg/myaccount/trash.svg';
import editIcon from '@/assets/svg/myaccount/edit.svg';
import arrowIcon from '@/assets/svg/myaccount/index.svg';
import infoIcon from '@/assets/svg/myaccount/info.svg';
import profilePic from '@/assets/svg/myaccount/Profilepicture.svg';
import exclamationIcon from '@/assets/svg/myaccount/exclamation.svg';
import trueIcon from '@/assets/svg/myaccount/true.svg';

import AddEmailModal from '../popups/AddEmailModal';
import VerifyEmailModal from '../popups/VerifyEmailModal';
import SuccessEmailModal from '../popups/SuccessEmailModal';
import ChangeProfilePicModal from '../popups/ChangeProfilePicModal';
import RemovePhotoModal from '../popups/RemovePhotoModal';
import API_BASE_URL from '@/config';

const theme = {
    accent: '#3457DC',
    dashboardCard: '#151519',
    cardBorder: '#262626',
    warning: '#C5432D',
    neutralGrey: '#9a9a9a',
    inputBg: 'rgba(255,255,255,0.01)',
    hoverBg: '#2a2a30',
};

const APP_COUNTRIES = [
    { name: 'Algeria', code: '+213' },
    { name: 'Saudi Arabia', code: '+966' },
    { name: 'Egypt', code: '+20' },
    { name: 'United Arab Emirates', code: '+971' },
    { name: 'United States', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'France', code: '+33' },
    { name: 'Germany', code: '+49' },
    { name: 'Canada', code: '+1' },
    { name: 'Australia', code: '+61' },
    { name: 'Morocco', code: '+212' },
    { name: 'Tunisia', code: '+216' },
    { name: 'Qatar', code: '+974' },
    { name: 'Kuwait', code: '+965' },
    { name: 'Oman', code: '+968' },
    { name: 'Bahrain', code: '+973' },
    { name: 'Jordan', code: '+962' },
    { name: 'Lebanon', code: '+961' },
    { name: 'Palestine', code: '+970' },
    { name: 'Iraq', code: '+964' },
    { name: 'Syria', code: '+963' },
    { name: 'Yemen', code: '+967' },
];

export default function PersonalInfo() {
    const { language } = useLanguage();
    const { t } = useTranslation('personalInfo');
    const countries = APP_COUNTRIES;
    const isRTL = language === 'ar';

    const [profileImageUrl, setProfileImageUrl] = useState(profilePic);
    const [activeModal, setActiveModal] = useState(null); // 'add', 'verify', 'success', 'changePic', 'removePhoto'

    const handleSaveProfilePic = (newPic) => {
        setProfileImageUrl(newPic);
        setActiveModal(null);
    };

    const handleRemovePhoto = () => {
        setProfileImageUrl(profilePic);
        setActiveModal(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Reset feedback state on any input change
        if (showSavedFeedback) setShowSavedFeedback(false);

        // Ensure phone number contains only digits
        let sanitizedValue = value;
        if (name === 'phone') {
            sanitizedValue = value.replace(/[^0-9]/g, '');
        }

        setFormData(prev => ({
            ...prev,
            [name]: sanitizedValue
        }));
    };

    const [confirmedEmail, setConfirmedEmail] = useState('');
    const [pendingEmail, setPendingEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [tabsOpen, setTabsOpen] = useState(false);
    const [countrySearch, setCountrySearch] = useState('');
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const [showSavedFeedback, setShowSavedFeedback] = useState(false);

    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase())
    );

    const { user, setUser } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        country: '',
        countryCode: '',
        phone: '',
        googleEmail: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                username: user.username || '',
                email: user.email || '',
                country: user.country || '',
                countryCode: APP_COUNTRIES.find(c => c.name === user.country)?.code || '',
                phone: user.phoneNumber || '',
                googleEmail: ''
            });
        }
    }, [user]);

    const displayCountry = countries.find(c => c.code === formData?.countryCode)?.name || formData?.country;


    // Sync confirmedEmail to formData if needed, or just initialize email properly
    useEffect(() => {
        if (confirmedEmail) {
            setFormData(prev => ({ ...prev, email: confirmedEmail }));
        }
    }, [confirmedEmail]);

    const handleSaveProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: formData.username,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phoneNumber: formData.phone,
                    country: formData.country,
                })
            });

            if (res.ok) {
                const updatedUser = await res.json();
                if (setUser) {
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }
                setShowSavedFeedback(true);
                setTimeout(() => setShowSavedFeedback(false), 3000);
            } else {
                const data = await res.json();
                console.error(data.message);
                alert(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error(error);
            alert('Error connecting to server');
        }
    };

    return (
        <div className="w-full flex-1">
            <style>{`
                .personal-info-root .btn-hover:hover { background-color: ${theme.hoverBg}; }
                
                .profile-pic-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .profile-btn-group {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                /* Mobile Tabs Dropdown */
                .mobile-tab-trigger {
                    display: none;
                }

                .mobile-tab-dropdown {
                    display: none;
                }

                @media (max-width: 767px) {
                    .personal-info-root.root-inner {
                        padding: 16px;
                    }
                    .profile-section, .connected-accounts-section {
                        padding: 24px 16px !important;
                        max-width: 358px;
                        margin: 0 auto;
                    }
                    .profile-pic-wrapper {
                        justify-content: flex-start;
                        gap: 16%;
                    }
                    .profile-btn-group {
                        flex-direction: row-reverse;
                        gap: 16px;
                    }
                    .change-btn p {
                        font-size: 13px !important;
                    }
                    .change-btn {
                        padding: 10px 12px !important;
                        width: 160px;
                    }
                    .del-btn {
                        padding: 10px !important;
                    }
                    .del-btn p {
                        display: none;
                    }
                    .edit-btn-container {
                        flex-direction: column-reverse;
                        gap: 24px;
                    }
                    .edit-btn {
                        width: 100%;
                    }
                    .form-grid {
                        width: 100% !important;
                    }
                    .name-row, .country-row {
                        flex-direction: column;
                        gap: 1px;
                    }

                    /* Hide desktop tabs, show mobile trigger */
                    .account-tabs {
                        display: none !important;
                    }
                    .mobile-tab-trigger {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 8px;
                        cursor: pointer;
                        margin: 20px 0 24px 0;
                        position: relative;
                        width: 100%;
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

                @keyframes dropdownFadeIn {
                    from { opacity: 0; transform: translateY(-4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .form-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    width: 100%;
                }

                .mobile-only {
                    display: none !important;
                }

                @media (max-width: 767px) {
                    .mobile-only {
                        display: flex !important;
                    }
                }
                .edit-btn-container {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                }

                @media (max-width: 767px) {
                    .edit-btn-container {
                        flex-direction: column-reverse;
                        align-items: stretch;
                        gap: 24px;
                    }
                }

                @media (max-width: 1023px) {
                    .form-grid {
                        width: 630px;
                    }
                }
                @media (max-width: 767px) {
                    .form-grid {
                        width: 100% !important;
                    }
                }

                .personal-info-root.root-inner {
                    padding-bottom: 80px;
                    width: 100%;
                    min-height: 100vh;
                    background-color: transparent;
                }

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

                .account-section {
                    background-color: ${theme.dashboardCard};
                    border-radius: 16px;
                    border: 1px solid ${theme.cardBorder};
                    padding: 24px;
                    margin: 0 auto;
                    width: 100%;
                }

                @media (min-width: 1024px) {
                    .account-section {
                        border-radius: 1vw;
                        padding: 2.5vw;
                    }
                }

                .connected-accounts-section.account-section {
                    margin-top: 24px;
                }

                @media (min-width: 1024px) {
                    .connected-accounts-section.account-section {
                        margin-top: 4vh;
                    }
                }

                .profile-header {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    margin-bottom: 16px;
                }

                .edit-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: ${theme.accent};
                    background: transparent;
                    border: 1px solid ${theme.cardBorder};
                    cursor: pointer;
                    margin-top: 12px;
                    transition: all 0.3s ease;
                    padding: 10px 20px;
                    border-radius: 12px;
                }
                .edit-btn p {
                    font-family: 'Poppins', sans-serif;
                    font-weight: 500;
                    font-size: 14px;
                }
                .edit-btn img {
                    width: 20px;
                    height: 20px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .edit-btn.success {
                    background-color: #1a1a1e;
                    color: #FFFFFF !important;
                    border: 1px solid #262626;
                }
                .edit-btn.success p {
                    color: #FFFFFF !important;
                }
                .edit-btn.success img {
                    transform: scale(1.1);
                    filter: brightness(0) invert(1);
                }

                .field-label {
                    font-family: 'Poppins', sans-serif;
                    font-weight: 500;
                    line-height: normal;
                    color: ${theme.neutralGrey};
                    font-size: 14px;
                    margin-bottom: 4px;
                }

                @media (min-width: 1024px) {
                    .field-label {
                        font-size: 0.96vw;
                    }
                }

                .profile-img-container {
                    width: 60px;
                    height: 60px;
                    flex-shrink: 0;
                }

                @media (max-width: 767px) {
                    .profile-img-container {
                        width: 80px;
                        height: 80px;
                    }
                }

                @media (min-width: 1024px) {
                    .profile-img-container {
                        width: 4vw;
                        height: 4vw;
                    }
                }

                .profile-img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .divider-h {
                    height: 1px;
                    width: 100%;
                    background-color: #222127;
                    margin-top: 24px;
                    margin-bottom: 32px;
                }

                @media (min-width: 1024px) {
                    .divider-h {
                        height: 0.33vh;
                        margin-top: 3vh;
                        margin-bottom: 5vh;
                    }
                }

                .form-row {
                    display: flex;
                    gap: 20px;
                    width: 100%;
                }

                @media (max-width: 767px) {
                    .form-row {
                        flex-direction: column;
                        gap: 24px;
                    }
                }

                @media (min-width: 1024px) {
                    .form-row {
                        gap: 2vw;
                    }
                }

                .field-group {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    width: 100%;
                }

                @media (min-width: 1024px) {
                    .field-group {
                        width: 50%;
                        gap: 1.7vh;
                    }
                    .country-row {
                        width: 100%;
                    }
                }

                .form-row .field-group {
                    flex: 1;
                    width: auto;
                }

                @media (max-width: 767px) {
                    .field-group, .form-row .field-group, .country-row {
                        width: 100%;
                    }
                }

                .field-group.flex-1 {
                    flex: 1;
                }

                .custom-input {
                    background-color: ${theme.inputBg};
                    border-radius: 12px;
                    border: 1px solid ${theme.cardBorder};
                    padding: 12px 14px;
                }

                @media (min-width: 1024px) {
                    .custom-input {
                        border-radius: 0.5vw;
                        border-width: 0.2vh;
                        padding: 1.5vh 1.4vw;
                    }
                }

                .input-text {
                    color: white;
                    font-size: 14px;
                    font-family: 'Poppins', sans-serif;
                    text-align: inherit;
                }

                @media (min-width: 1024px) {
                    .input-text {
                        font-size: 0.83vw;
                    }
                }

                .email-input {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                }

                .select-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                    flex: 1;
                }

                .custom-input input, .custom-input select {
                    background: transparent;
                    border: none;
                    color: white;
                    width: 100%;
                    height: 100%;
                    outline: none;
                    font-family: 'Poppins', sans-serif;
                    font-size: 14px;
                    padding: 0;
                    text-align: inherit;
                }
                .custom-input input::placeholder {
                    color: #555;
                }

                /* Modern Dropdown Styles */
                .dropdown-container {
                    position: relative;
                    width: 100%;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .dropdown-list {
                    position: absolute;
                    top: calc(100% + 4px);
                    left: 0;
                    width: 100%;
                    max-height: 250px;
                    background: #151519;
                    border: 1px solid #262626;
                    border-radius: 8px;
                    z-index: 1000;
                    overflow-y: auto;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.5);
                }
                .dropdown-list::-webkit-scrollbar {
                    width: 4px;
                }
                .dropdown-list::-webkit-scrollbar-thumb {
                    background: #3457DC;
                    border-radius: 4px;
                }
                .dropdown-search {
                    position: sticky;
                    top: 0;
                    background: #151519;
                    padding: 8px 6px;
                    border-bottom: 1px solid #1e1e24;
                }
                .dropdown-search input {
                    width: 100%;
                    background: #1e1e24;
                    border: 1px solid #262626;
                    border-radius: 4px;
                    color: white;
                    padding: 8px 10px;
                    font-size: 14px;
                    outline: none;
                }
                .dropdown-item {
                    padding: 10px 12px;
                    color: #a5a5b2;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 14px;
                }
                .dropdown-item:hover {
                    background: #1e1e24;
                    color: white;
                }
                .dropdown-item.selected {
                    background: rgba(52, 87, 220, 0.1);
                    color: #3457DC;
                }
                .no-results {
                    padding: 12px;
                    text-align: center;
                    color: #555;
                    font-size: 12px;
                }

                .custom-select {
                    background: transparent;
                    color: white;
                    font-size: 14px;
                    font-family: 'Poppins, sans-serif';
                    width: 100%;
                    appearance: none;
                    outline: none;
                    cursor: default;
                    padding-right: 40px;
                }

                @media (min-width: 1024px) {
                    .custom-select {
                        font-size: 1vw;
                        padding-right: 3vw;
                    }
                }

                .select-arrow {
                    width: 16px;
                    height: 16px;
                    position: absolute;
                    ${isRTL ? 'left: 14px;' : 'right: 14px;'}
                    pointer-events: none;
                }

                @media (min-width: 1024px) {
                    .select-arrow {
                        width: 0.8vw;
                        height: 0.8vw;
                        ${isRTL ? 'left: 1vw;' : 'right: 1vw;'}
                    }
                }

                .phone-field {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                    flex: 1;
                }

                .divider-v {
                    height: 24px;
                    width: 1px;
                    background-color: rgba(255,255,255,0.1);
                }

                @media (min-width: 1024px) {
                    .divider-v {
                        height: 2vh;
                        width: 0.1vw;
                    }
                }

                .profile-btn-group {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                .profile-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: transparent;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    border: 1px solid ${theme.cardBorder};
                    border-radius: 12px;
                    padding: 10px 20px;
                    font-size: 14px;
                }

                .profile-btn:hover {
                    background-color: ${theme.hoverBg};
                }

                .profile-btn p {
                    font-family: 'Poppins, sans-serif';
                    font-weight: 500;
                    line-height: normal;
                    font-size: 14px;
                }

                .del-btn {
                    gap: 10px;
                }

                .delete-btn:disabled {
                    cursor: not-allowed;
                    opacity: 0.5;
                }

                .del-btn p {
                    color: ${theme.warning};
                }

                .change-btn p {
                    color: ${theme.accent};
                }

                .edit-btn {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    justify-content: center;
                    background: transparent;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    border: 1px solid ${theme.cardBorder};
                    border-radius: 12px;
                    padding: 12px 20px;
                    font-size: 14px;
                }

                .edit-btn:hover {
                    background-color: ${theme.hoverBg};
                }

                .edit-btn p {
                    font-family: 'Poppins, sans-serif';
                    font-weight: 500;
                    line-height: normal;
                    color: ${theme.accent};
                    font-size: 14px;
                    white-space: nowrap;
                }

                .edit-btn img {
                    width: 20px;
                    height: 20px;
                }

                .info-icon {
                    width: 16px;
                    height: 16px;
                    flex-shrink: 0;
                }

                @media (min-width: 1024px) {
                    .info-icon {
width: 1.08vw;
height: 1.92vh;                    }
                }

                /* Connected Accounts Section */
                .section-header-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-bottom: 24px;
                }

                .section-h3 {
                    font-family: 'Gilroy-ExtraBold', sans-serif;
                    color: white;
                    font-size: 16px;
                }

                .section-p {
                    font-family: 'Poppins', sans-serif;
                    color: #a5a5b2;
                    font-size: 14px;
                }

                .accounts-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .account-card {
                    border-radius: 16px;
                    border: 1px solid ${theme.cardBorder};
                    padding: 16px 24px 16px 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .account-header {
                    display: flex;
                    gap: 16px;
                    align-items: center;
                }

                .account-icon-box {
                    width: 60px;
                    height: 60px;
                    background-color: #222127;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .account-logo {
                    width: 24px;
                    height: 24px;
                }

                .account-name-group {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .account-name {
                    font-family: 'Poppins', sans-serif;
                    font-weight: 500;
                    color: white;
                    font-size: 16px;
                }

                .account-val {
                    font-family: 'Poppins', sans-serif;
                    color: white;
                    font-size: 14px;
                }

                .account-card-btn {
                    width: 140px;
                    padding: 10px 24px;
                    border-radius: 12px;
                    border: none;
                    font-weight: 500;
                    cursor: pointer;
                    transition: opacity 0.2s;
                    font-size: 14px;
                }

                .account-card-btn:disabled {
                    background-color: #1e1e24;
                    color: #373735;
                    cursor: not-allowed;
                    opacity: 0.5;
                }

                .info-msg-row {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }

                @media (min-width: 1024px) {
                    .profile-btn-group {
                        gap: 1vw;
                    }
                    .profile-btn {
                        padding: 1.2vh 1.4vw;
                        border-radius: 0.7vw;
                        border-width: 0.15vh;
                    }
                    .profile-btn p {
                        font-size: 1vw;
                    }
                    .del-btn {
                        gap: 0.6vw;
                        padding: 1.2vh 2vw;
                        border-radius: 0.7vw;
                    }
                    .del-btn:disabled {
                        opacity: 0.4;
                    }
                    .del-btn img {
                        width: 1.2vw;
                        height: 1.2vw;
                    }
                    .edit-btn {
                        padding: 1.2vh 1.4vw;
                        border-radius: 0.7vw;
                        gap: 0.7vw;
                        border-width: 0.15vh;
                    }
                    .edit-btn p {
                        font-size: 1vw;
                    }
                    .edit-btn img {
                        width: 1.2vw;
                        height: 1.2vw;
                    }
                    .howa {
                        width: clamp(16px, 1.2vw, 22px);
                        height: clamp(16px, 1.2vw, 22px);
                    }

                    /* Connected Accounts Responsive */
                    .section-header-group {
                        gap: 0.8vh;
                        margin-bottom: 3vh;
                    }
                    .section-h3 {
                        font-size: 1vw;
                    }
                    .section-p {
                        font-size: 0.9vw;
                    }
                    .accounts-list {
                        gap: 2.5vh;
                    }
                    .account-card {
                        border-radius: 1vw;
                        padding: 1.5vh 1.5vw;
                        gap: 2vh;
                        border-width: 0.15vh;
                    }
                    .account-header {
                        gap: 1vw;
                    }
                    .account-icon-box {
                        width: 3.5vw;
                        height: 3.5vw;
                        border-radius: 0.7vw;
                    }
                    .account-logo {
                        width: 1.5vw;
                        height: 1.5vw;
                    }
                    .account-name-group {
                        gap: 0.4vh;
                    }
                    .account-name {
                        font-size: 1vw;
                    }
                    .account-val {
                        font-size: 0.9vw;
                    }
                    .account-card-btn {
                        width: 8vw;
                        padding: 1vh 1.5vw;
                        border-radius: 0.7vw;
                        font-size: 0.9vw;
                    }
                    .account-card-btn:disabled {
                        font-size: 0.9vw;
                    }
                    .info-msg-row {
                        gap: 0.5vw;
                    }
                    .form-grid {
                        gap: 3vh;
                    }
                    .account-section {
                        border-width: 0.15vh;
                    }

                    /* Input and Dropdown Scaling for Desktop */
                    .input-text, .custom-input input {
                        font-size: 0.83vw;
                    }
                    .dropdown-list {
                        top: calc(100% + 0.4vh);
                        max-height: 25vh;
                        border-width: 0.05vw;
                        border-radius: 0.5vw;
                        box-shadow: 0 1vh 3vh rgba(0,0,0,0.5);
                    }
                    .dropdown-list::-webkit-scrollbar {
                        width: 0.3vw;
                    }
                    .dropdown-list::-webkit-scrollbar-thumb {
                        border-radius: 0.3vw;
                    }
                    .dropdown-search {
                        padding: 1vh 0.6vw;
                        border-bottom-width: 0.1vh;
                    }
                    .dropdown-search input {
                        border-width: 0.05vw;
                        border-radius: 0.3vw;
                        padding: 0.8vh 1vw;
                        font-size: 0.75vw;
                    }
                    .dropdown-item {
                        padding: 1vh 1.2vw;
                        font-size: 0.75vw;
                    }
                    .no-results {
                        padding: 1.2vh;
                        font-size: 0.7vw;
                    }
                }
            `}</style>
            <div className="personal-info-root root-inner">


                <div className="profile-section account-section">

                    {/* Profile Picture */}
                    <div className="profile-header">
                        <p className="field-label">{isRTL ? 'صورة الحساب' : t('profilePicture')}</p>
                        <div className="profile-pic-wrapper">
                            <div className="profile-img-container" onClick={() => setActiveModal('changePic')} style={{ cursor: 'pointer' }}>
                                <img src={profileImageUrl} alt="Profile" className="profile-img" />
                            </div>
                            <div className="profile-btn-group">
                                <button type="button" className="profile-btn change-btn" onClick={() => setActiveModal('changePic')}>
                                    <p>{isRTL ? 'تغيير الصورة' : t('changePicture')}</p>
                                </button>
                                <button
                                    type="button"
                                    className="profile-btn del-btn"
                                    onClick={() => setActiveModal('removePhoto')}
                                    disabled={profileImageUrl === profilePic}
                                >
                                    <p>{isRTL ? 'حذف' : t('delete')}</p>
                                    <img src={trashIcon} alt="Delete" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="divider-h" />

                    {/* Form Section */}
                    <div className="edit-btn-container">
                        <div className="form-grid">

                            {/* First Name + Last Name (mobile only) */}
                            <div className="name-row form-row mobile-only">
                                <div className="field-group">
                                    <p className="field-label">{t('firstName')}</p>
                                    <div className="custom-input">
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder={t('firstName')}
                                        />
                                    </div>
                                </div>
                                <div className="field-group">
                                    <p className="field-label">{t('lastName')}</p>
                                    <div className="custom-input">
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder={t('lastName')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Username */}
                            <div className="field-group">
                                <p className="field-label">{isRTL ? 'اسم المستخدم' : t('username')}</p>
                                <div className="custom-input">
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder={t('username')}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="field-group">
                                <p className="field-label">{isRTL ? 'بريدك الإلكتروني' : t('yourEmail')}</p>
                                <div onClick={() => setActiveModal('add')} className="custom-input email-input">
                                    <p className="input-text" style={{ minHeight: '1.2em' }}>{formData.email}</p>
                                    {!formData.email && <img src={exclamationIcon} alt="Warning" className="info-icon" />}
                                </div>
                            </div>

                            {/* Country + Phone */}
                            <div className="country-row form-row">
                                <div className="field-group">
                                    <p className="field-label">{isRTL ? 'رقم الجوال' : t('phoneNumber')}</p>
                                    <div className="custom-input phone-field">
                                        <p className="input-text">{formData.countryCode}</p>
                                        <div className="divider-v" />
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder={t('phoneNumber')}
                                        />
                                    </div>
                                </div>
                                <div className="field-group">
                                    <p className="field-label">{isRTL ? 'الدولة' : t('country')}</p>
                                    <div className="dropdown-container">
                                        <div
                                            className="custom-input select-wrapper"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                        >
                                            <p className="input-text">{isRTL && formData.countryCode === '+966' ? 'السعودية' : displayCountry}</p>
                                            <img src={arrowIcon} alt="Dropdown" className="select-arrow" style={{ transform: isCountryDropdownOpen ? 'rotate(180deg)' : 'none' }} />
                                        </div>

                                        {isCountryDropdownOpen && (
                                            <>
                                                {/* Backdrop to close */}
                                                <div
                                                    style={{ position: 'fixed', inset: 0, zIndex: 999 }}
                                                    onClick={() => setIsCountryDropdownOpen(false)}
                                                />
                                                <div className="dropdown-list">
                                                    <div className="dropdown-search">
                                                        <input
                                                            type="text"
                                                            placeholder={t('searchCountry')}
                                                            value={countrySearch}
                                                            onChange={(e) => setCountrySearch(e.target.value)}
                                                            onClick={(e) => e.stopPropagation()}
                                                            autoFocus
                                                        />
                                                    </div>
                                                    {filteredCountries.length > 0 ? (
                                                        filteredCountries.map(countryItem => (
                                                            <div
                                                                key={countryItem.name}
                                                                className={`dropdown-item ${displayCountry === countryItem.name ? 'selected' : ''}`}
                                                                onClick={() => {
                                                                    setFormData(prev => ({
                                                                        ...prev,
                                                                        country: countryItem.name,
                                                                        countryCode: countryItem.code
                                                                    }));
                                                                    setIsCountryDropdownOpen(false);
                                                                    setCountrySearch('');
                                                                    if (showSavedFeedback) setShowSavedFeedback(false);
                                                                }}
                                                            >
                                                                {countryItem.name}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="no-results">{t('noCountries')}</div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <button
                            type="button"
                            className={`edit-btn ${showSavedFeedback ? 'success' : ''}`}
                            onClick={handleSaveProfile}
                        >
                            <p>{showSavedFeedback ? (isRTL ? 'تم الحفظ' : t('edited')) : (isRTL ? 'تعديل' : t('edit'))}</p>
                            <img src={showSavedFeedback ? trueIcon : editIcon} alt="Edit" />
                        </button>
                    </div>
                </div>

                {/* Connected Accounts */}
                <div className="connected-accounts-section account-section">
                    <div className="section-header-group">
                        <h3 className="section-h3">{t('connectedAccounts')}</h3>
                        <p className="section-p">{t('linkedAccountsDesc')}</p>
                    </div>

                    <div className="accounts-list">
                        {/* Google Account */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div className="account-card">
                                <div className="account-header">
                                    <div className="account-icon-box">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="account-logo" />
                                    </div>
                                    <div className="account-name-group">
                                        <p className="account-name">{t('google')}</p>
                                        <p className="account-val">{formData.googleEmail}</p>
                                    </div>
                                </div>
                                <button disabled className="account-card-btn">
                                    {t('disconnect')}
                                </button>
                            </div>
                            <div className="info-msg-row">
                                <img src={infoIcon} alt="Info" className="info-icon" />
                                <p className="section-p">{t('disconnectInfo')}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Modals */}
            <AddEmailModal
                isOpen={activeModal === 'add'}
                onClose={() => setActiveModal(null)}
                onSendCode={() => setActiveModal('verify')}
                email={pendingEmail}
                setEmail={setPendingEmail}
            />
            <VerifyEmailModal
                isOpen={activeModal === 'verify'}
                onClose={() => setActiveModal(null)}
                onBack={() => setActiveModal('add')}
                onVerify={() => setActiveModal('success')}
                email={pendingEmail}
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
            />
            <SuccessEmailModal
                isOpen={activeModal === 'success'}
                onDone={() => {
                    setConfirmedEmail(pendingEmail);
                    setActiveModal(null);
                }}
                email={pendingEmail}
            />
            {activeModal === 'changePic' && (
                <ChangeProfilePicModal
                    isOpen={true}
                    onClose={() => setActiveModal(null)}
                    currentPic={profileImageUrl}
                    onSave={handleSaveProfilePic}
                />
            )}

            {activeModal === 'removePhoto' && (
                <RemovePhotoModal
                    isOpen={true}
                    onClose={() => setActiveModal(null)}
                    onConfirm={handleRemovePhoto}
                    currentPic={profileImageUrl}
                />
            )}
        </div>
    );
}

