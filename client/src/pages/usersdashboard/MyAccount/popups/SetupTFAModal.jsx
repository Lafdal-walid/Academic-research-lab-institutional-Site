import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import copyIcon from '@/assets/svg/myaccount/copy.svg';
import QrcodeIcon from '@/assets/svg/myaccount/Qrcode.png';

const theme = {
    accent: '#3457DC',
    dashboardCard: '#151519',
    cardBorder: '#1e1d22',
    neutralGrey: '#a5a5b2',
    inputBg: 'rgba(255,255,255,0.01)',
    hoverBg: '#2a2a30'
};

const SetupTFAModal = ({ isOpen, onClose, onSuccess }) => {
    const { t } = useTranslation('account');
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    const [copied, setCopied] = useState(false);
    const manualKey = "H3UY8-N4LZP-WQ0K1";

    const svgPath = "M19.061 7.854C18.9217 7.71461 18.7563 7.60403 18.5742 7.52859C18.3922 7.45315 18.1971 7.41432 18 7.41432C17.8029 7.41432 17.6078 7.45315 17.4258 7.52859C17.2437 7.60403 17.0783 7.71461 16.939 7.854L12.353 12.439C12.2592 12.5327 12.1321 12.5854 11.9995 12.5854C11.8669 12.5854 11.7398 12.5327 11.646 12.439L7.061 7.854C6.77974 7.5726 6.39821 7.41447 6.00035 7.41437C5.6025 7.41428 5.22089 7.57224 4.9395 7.8535C4.65811 8.13476 4.49997 8.51629 4.49987 8.91415C4.49978 9.312 4.65774 9.69361 4.939 9.975L9.525 14.561C9.85001 14.886 10.2359 15.1439 10.6605 15.3198C11.0852 15.4957 11.5403 15.5863 12 15.5863C12.4597 15.5863 12.9148 15.4957 13.3395 15.3198C13.7641 15.1439 14.15 14.886 14.475 14.561L19.061 9.975C19.3422 9.69371 19.5002 9.31225 19.5002 8.9145C19.5002 8.51675 19.3422 8.13529 19.061 7.854Z";

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(manualKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div onClick={handleBackdropClick} className="add-email-backdrop">
            <style>{`
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes backdropFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .add-email-backdrop {
                    position: fixed;
                    inset: 0;
                    background-color: rgba(0,0,0,0.5);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 16px;
                    animation: backdropFadeIn 0.3s ease-out forwards;
                }

                .modal-container {
                    background-color: ${theme.dashboardCard};
                    border: 1px solid ${theme.cardBorder};
                    border-radius: 2vh;
                    padding: 3vh 2vw 5vh 2vw;
                    width: 36vw;
                    min-width: 30vw;
                    max-width: 50vw;
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
                    font-weight: 600;
                    font-size: 1vw;
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
                    gap: 2.2vh;
                    padding: 0 3vw;
                }

                .add-tfa-title {
                    color: white;
                    font-weight: 800;
                    font-size: 1.2vw;
                    line-height: 1.3;
                    margin: 0;
                    font-family: 'Gilroy, sans-serif';
                }

                .modal-desc {
                    color: ${theme.neutralGrey};
                    font-weight: 400;
                    font-size: 1.05vw;
                    line-height: 1.5;
                    margin: 0;
                    font-family: 'Poppins, sans-serif';
                }

                .instructions-list {
                    color: ${theme.neutralGrey};
                    font-weight: 400;
                    font-size: 1vw;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                    list-style-type: none;
                    text-align: center;
                    font-family: 'Poppins, sans-serif';
                    white-space: nowrap;
                }

                .input-section {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 1.4vh;
                }

                .input-wrapper {
                    background-color: ${theme.inputBg};
                    border: 1px solid #2a2a30;
                    border-radius: 0.6vw;
                    padding: 2.5vh 1.05vw;
                    width: 100%;
                    height: 4.5vh;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .key-text {
                    color: white;
                    font-weight: 500;
                    font-size: 0.91vw;
                    font-family: 'Poppins, sans-serif';
                    margin: 0;
                }

                .copy-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                    transition: opacity 0.2s;
                }
                
                .copy-btn:hover {
                    opacity: 0.8;
                }

                .buttons-row {
                    width: 100%;
                    display: flex;
                    gap: 1vw;
                }

                .btn-base {
                    border: none;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.2s, opacity 0.2s;
                    flex: 1;
                    border-radius: 1vw;
                    padding: 2vh 1.8vw;
                    font-size: 1vw;
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

                .btn-send {
                    background-color: ${theme.accent};
                }

                .btn-send:hover {
                    background-color: #2a47b8;
                }

                .btn-send:active {
                    background-color: #1e3594;
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
                    <div onClick={onClose} className="back-btn">
                        <div className="back-icon-wrapper">
                            <svg style={{ width: '100%', height: '100%', transform: `rotate(${isRTL ? '270deg' : '90deg'})` }} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                                <path d={svgPath} fill="#3457DC" />
                            </svg>
                        </div>
                        <p className="back-text">{t('back')}</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="text-content">
                    <h1 className="add-tfa-title">{t('setup_authenticator_app')}</h1>
                    <div style={{ width: '12vw', height: '12vw', margin: '0 auto' }}>
                        <img src={QrcodeIcon} alt="QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <ul className="instructions-list">
                        <li>{t('setup_tfa_step_1')}</li>
                        <li>{t('setup_tfa_step_2')}</li>
                        <li>{t('setup_tfa_step_3')}</li>
                    </ul>
                </div>

                {/* Input Section */}
                <div className="input-section">
                    <div className="input-wrapper">
                        <p className="key-text">{manualKey}</p>
                        <button onClick={handleCopy} className="copy-btn">
                            <img src={copyIcon} alt="Copy" style={{ width: '1.2vw', height: '1.2vw' }} />
                        </button>
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="buttons-row">
                    <button onClick={onClose} className="btn-base btn-cancel">
                        {t('cancel')}
                    </button>
                    <button
                        onClick={onSuccess}
                        className="btn-base btn-send"
                    >
                        {t('continue')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetupTFAModal;
