import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

const theme = {
    accent: '#3457DC',
    dashboardCard: '#151519',
    cardBorder: '#1e1d22',
    neutralGrey: '#a5a5b2',
    inputBg: 'rgba(255,255,255,0.01)',
    hoverBg: '#2a2a30'
};

const VerifyEmailModal = ({ isOpen, onClose, onBack, onVerify, email, verificationCode, setVerificationCode }) => {
    const { language } = useLanguage();
    const { t } = useTranslation('personalInfo');
    const isRTL = language === 'ar';
    const [localCode, setLocalCode] = useState('');

    useEffect(() => {
        if (isOpen) {
            const initialCode = Array.isArray(verificationCode) ? verificationCode.join('').trim() : (verificationCode || '');
            setLocalCode(initialCode);
        }
    }, [isOpen, verificationCode]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val) && val.length <= 6) {
            setLocalCode(val);
        }
    };

    const handleVerify = () => {
        if (localCode.length === 6) {
            if (typeof setVerificationCode === 'function') {
                if (Array.isArray(verificationCode)) {
                    const newCode = localCode.split('').concat(Array(6 - localCode.length).fill(''));
                    setVerificationCode(newCode);
                } else {
                    setVerificationCode(localCode);
                }
            }
            onVerify();
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div onClick={handleBackdropClick} className="verify-backdrop">
            <style>{`
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes backdropFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .verify-backdrop {
                    position: fixed;
                    inset: 0;
                    background-color: rgba(0,0,0,0.5);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 0px;
                    animation: backdropFadeIn 0.3s ease-out forwards;
                }

                .modal-container {
                    background-color: ${theme.dashboardCard};
                    border: 1px solid ${theme.cardBorder};
                    border-radius: 2vh;
                    padding: 3vh 2vw 5vh 2vw;
                    width: 40vw;
                    min-width: 30vw;
                    max-width: 46vw;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 3vh;
                    position: relative;
                    animation: modalFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .back-section {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                }

                .back-btn {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    gap: 0.64vh;
                    transition: opacity 0.2s;
                }

                .back-btn:hover {
                    opacity: 0.8;
                }

                .back-icon-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2.7vh;
                    height: 2.7vh;
                    ${isRTL ? 'margin-top: 0.2vh;' : ''}
                }

                .back-icon {
                    width: 2.7vh;
                    height: 2.7vh;
                    transform: rotate(${isRTL ? '90deg' : '270deg'});
                }

                .back-text {
                    color: ${theme.accent};
                    font-weight: 500;
                    font-size: 2vh;
                    line-height: 1;
                    margin: 0;
                    font-family: 'Poppins, sans-serif';
                }

                .text-content {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 1vh;
                    padding: 0 3vw;
                }

                .verify-title {
                    color: white;
                    font-weight: 800;
                    font-size: 2.6vh;
                    line-height: 1.3;
                    margin: 0;
                    font-family: 'Gilroy, sans-serif';
                }

                .modal-desc {
                    color: ${theme.neutralGrey};
                    font-weight: 400;
                    font-size: 1.8vh;
                    line-height: 1.5;
                    margin-bottom: 1vh;
                    margin-top: 1vh;


                    font-family: 'Poppins, sans-serif';
                }

                .input-section {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5vh;
                }

                .input-label {
                    color: #80808a;
                    font-weight: 400;
                    font-size: 1.8vh;
                    line-height: 1;
                    margin: 0;
                    font-family: 'Poppins, sans-serif';
                }

                .input-wrapper {
                    background-color: ${theme.inputBg};
                    border: 1px solid #2a2a30;
                    border-radius: 1vh;
                    padding: 1.3vh 1.8vw;
                    width: 100%;
                }

                .verify-input {
                    background: transparent;
                    border: none;
                    outline: none;
                    color: #a5a5b2;
                    font-weight: 400;
                    font-size: 1.8vh;
                    width: 100%;
                    font-family: 'Poppins, sans-serif';
                }

                .verify-input::placeholder {
                    color: #a5a5b2;
                    opacity: 0.5;
                }

                .buttons-row {
                    width: 100%;
                    display: flex;
                    gap: 2vh;
                }

                .btn-base {
                    border: none;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    flex: 1;
                    border-radius: 2vh;
                    padding: 2vh 1.5vw;
                    font-size: 1.8vh;
                    color: white;
                    font-family: 'Poppins, sans-serif';
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .btn-cancel {
                    background-color: #1e1e24;
                }

                .btn-cancel:hover {
                    background-color: #2a2a30;
                }

                .btn-verify {
                    background-color: ${theme.accent};
                }

                .btn-verify:hover {
                    background-color: #2a47b8;
                }

                .btn-verify:active {
                    background-color: #1e3594;
                }

                .resend-section {
                    width: 100%;
                    text-align: center;
                }

                .resend-text {
                    color: ${theme.neutralGrey};
                    font-weight: 400;
                    font-size: 1.8vh;
                    line-height: 1;
                    margin: 0;
                    font-family: 'Poppins, sans-serif';
                }

                .resend-link {
                    color: ${theme.accent};
                    font-weight: 500;
                    text-decoration: underline;
                    cursor: pointer;
                    transition: opacity 0.2s;
                }

                .resend-link:hover {
                    opacity: 0.8;
                }

                @media (max-width: 1024px) {
                    .modal-container {
                        width: 90vw;
                        max-width: none;
                        padding: 4vh 6vw;
                    }
                }
            `}</style>

            <div className="modal-container">
                {/* Back Button */}
                <div className="back-section">
                    <div onClick={onBack} className="back-btn">
                        <div className="back-icon-wrapper">
                            <svg className="back-icon" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                                <path d="M18.2929 16.7071C18.9229 16.0771 18.9229 15.0491 18.2929 14.4191L13.4099 9.53613C12.6299 8.75613 11.3699 8.75613 10.5899 9.53613L5.70692 14.4191C5.07692 15.0491 5.07692 16.0771 5.70692 16.7071C6.33692 17.3371 7.36492 17.3371 7.99492 16.7071L11.9999 12.7021L16.0049 16.7071C16.6349 17.3371 17.6629 17.3371 18.2929 16.7071Z" fill="#3457DC" />
                            </svg>
                        </div>
                        <p className="back-text">{t('back')}</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="text-content">
                    <p className="verify-title">{t('verify_email_title')}</p>
                    <p className="modal-desc">
                        {t('verify_email_desc_pre')}<span style={{ color: 'white' }}>{email}</span>{t('verify_email_desc_post')}
                    </p>
                </div>

                {/* Input Section */}
                <div className="input-section">
                    <label className="input-label">{t('enter_code_label')}</label>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder={t('code_placeholder')}
                            className="verify-input"
                            maxLength={6}
                            value={localCode}
                            onChange={handleChange}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="buttons-row">
                    <button onClick={onClose} className="btn-base btn-cancel">
                        {t('cancel')}
                    </button>
                    <button
                        onClick={handleVerify}
                        className="btn-base btn-verify"
                        style={{ opacity: localCode.length === 6 ? 1 : 0.5, cursor: localCode.length === 6 ? 'pointer' : 'not-allowed' }}
                    >
                        {t('verify_email_btn')}
                    </button>
                </div>

                {/* Resend Link */}
                <div className="resend-section">
                    <p className="resend-text">
                        {t('didnt_get_code')}{' '}
                        <span className="resend-link">
                            {t('resend')}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailModal;
