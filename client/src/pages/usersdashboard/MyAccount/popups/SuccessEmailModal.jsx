import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const theme = {
    dashboardCard: '#151519',
    cardBorder: '#1e1d22',
    neutralGrey: '#a5a5b2',
    accent: '#3457DC',
    closeBg: '#1e1e24',
    iconBgOuter: 'rgba(52, 87, 220, 0.2)',
    iconBgInner: 'rgba(52, 87, 220, 0.6)'
};

const SuccessEmailModal = ({ isOpen, onDone, email }) => {
    const { t } = useTranslation('personalInfo');
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onDone();
        }
    };

    return (
        <div onClick={handleBackdropClick} className="modal-backdrop">
            <style>{`
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes backdropFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .modal-backdrop {
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
                    padding: 3vh 3vw 10vh 3vw;
                    width: 35vw;
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

                .header-section {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 3vh;
                }

                .close-btn-wrapper {
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                }

                .close-btn {
                    background-color: ${theme.closeBg};
                    border-radius: 9999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    width: 3.5vh;
                    height: 3.5vh;
                    padding: 0.5vh;
                    transition: background-color 0.2s;
                }

                .close-btn:hover {
                    background-color: #2a2a30;
                }

                .success-icon-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .icon-circle-outer {
                    background-color: ${theme.iconBgOuter};
                    border-radius: 9999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.6vh;
                }

                .icon-circle-inner {
                    background-color: ${theme.iconBgInner};
                    border-radius: 9999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2vh;
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

                .success-title {
                    color: white;
                    font-weight: 800;
                    font-size: 2.6vh;
                    line-height: 1.3;
                    margin: 0;
                    font-family: 'Gilroy, sans-serif';
                }

                .success-desc {
                    color: ${theme.neutralGrey};
                    font-weight: 400;
                    font-size: 1.8vh;
                    line-height: 1.5;
                    margin: 0;
                    font-family: 'Poppins, sans-serif';
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
                <div className="header-section">
                    <div className="close-btn-wrapper">
                        <div onClick={onDone} className="close-btn">
                            <svg style={{ width: '3vh', height: '3vh' }} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                <path d="M15 5C14.8437 4.84377 14.6318 4.75601 14.4108 4.75601C14.1899 4.75601 13.9779 4.84377 13.8217 5L10 8.82167L6.17833 5C6.02206 4.84377 5.81014 4.75601 5.58917 4.75601C5.3682 4.75601 5.15627 4.84377 5 5C4.84377 5.15627 4.75601 5.3682 4.75601 5.58917C4.75601 5.81014 4.84377 6.02206 5 6.17833L8.82167 10L5 13.8217C4.84377 13.9779 4.75601 14.1899 4.75601 14.4108C4.75601 14.6318 4.84377 14.8437 5 15C5.15627 15.1562 5.3682 15.244 5.58917 15.244C5.81014 15.244 6.02206 15.1562 6.17833 15L10 11.1783L13.8217 15C13.9779 15.1562 14.1899 15.244 14.4108 15.244C14.6318 15.244 14.8437 15.1562 15 15C15.1562 14.8437 15.244 14.6318 15.244 14.4108C15.244 14.1899 15.1562 13.9779 15 13.8217L11.1783 10L15 6.17833C15.1562 6.02206 15.244 5.81014 15.244 5.58917C15.244 5.3682 15.1562 5.15627 15 5Z" fill="#3457DC" />
                            </svg>
                        </div>
                    </div>

                    <div className="success-icon-container">
                        <div className="icon-circle-outer">
                            <div className="icon-circle-inner">
                                <svg style={{ width: '4.2vh', height: '4.2vh' }} fill="none" preserveAspectRatio="none" viewBox="0 0 32 23.1003">
                                    <path d="M10.3323 23.1003C9.42391 23.1007 8.55276 22.7397 7.911 22.0968L0.590748 14.7793C-0.196916 13.9914 -0.196916 12.7142 0.590748 11.9262C1.37866 11.1386 2.65587 11.1386 3.44379 11.9262L10.3323 18.8147L28.5562 0.590748C29.3441 -0.196916 30.6213 -0.196916 31.4093 0.590748C32.1969 1.37866 32.1969 2.65587 31.4093 3.44379L12.7535 22.0968C12.1117 22.7397 11.2406 23.1007 10.3323 23.1003Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-content">
                    <h1 className="success-title">
                        {t('email_added_success_title')}
                    </h1>
                    <p className="success-desc">
                        {t('email_added_success_desc')}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SuccessEmailModal;
