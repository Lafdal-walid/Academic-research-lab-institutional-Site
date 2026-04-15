import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const ActiveSubscriptionModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation('account');

    const svgPaths = {
        cross: "M15 5C14.8437 4.84377 14.6318 4.75601 14.4108 4.75601C14.1899 4.75601 13.9779 4.84377 13.8217 5L10 8.82167L6.17833 5C6.02206 4.84377 5.81014 4.75601 5.58917 4.75601C5.3682 4.75601 5.15627 4.84377 5 5C4.84377 5.15627 4.75601 5.3682 4.75601 5.58917C4.75601 5.81014 4.84377 6.02206 5 6.17833L8.82167 10L5 13.8217C4.84377 13.9779 4.75601 14.1899 4.75601 14.4108C4.75601 14.6318 4.84377 14.8437 5 15C5.15627 15.1562 5.3682 15.244 5.58917 15.244C5.81014 15.244 6.02206 15.1562 6.17833 15L10 11.1783L13.8217 15C13.9779 15.1562 14.1899 15.244 14.4108 15.244C14.6318 15.244 14.8437 15.1562 15 15C15.1562 14.8437 15.244 14.6318 15.244 14.4108C15.244 14.1899 15.1562 13.9779 15 13.8217L11.1783 10L15 6.17833C15.1562 6.02206 15.244 5.81014 15.244 5.58917C15.244 5.3682 15.1562 5.15627 15 5Z",
        warning: "M38.9 15.8L33.0667 5.8C31.5783 3.25 28.8217 1.66667 25.8683 1.66667H14.0817C11.13 1.66667 8.37167 3.25 6.88333 5.8L1.05167 15.8C-0.460001 18.39 -0.460001 21.6083 1.05167 24.1983L6.885 34.1983C8.37333 36.7483 11.13 38.3317 14.0833 38.3317H25.87C28.8217 38.3317 31.58 36.7483 33.0683 34.1983L38.9017 24.1983C40.4133 21.6083 40.4117 18.39 38.9 15.8ZM36.02 22.5183L30.1867 32.5183C29.2933 34.0483 27.64 34.9983 25.8683 34.9983H14.0817C12.31 34.9983 10.655 34.0483 9.76333 32.5183L3.93 22.5183C3.02333 20.9633 3.02333 19.0333 3.93 17.48L9.76333 7.48C10.6567 5.95 12.31 5 14.0817 5H25.8683C27.64 5 29.295 5.95 30.1867 7.48L36.02 17.48C36.9267 19.035 36.9267 20.965 36.02 22.5183ZM18.3317 20.8317V11.665C18.3317 10.7433 19.0783 9.99833 19.9983 9.99833C20.9183 9.99833 21.665 10.7433 21.665 11.665V20.8317C21.665 21.7533 20.9183 22.4983 19.9983 22.4983C19.0783 22.4983 18.3317 21.7533 18.3317 20.8317ZM22.4983 27.4983C22.4983 28.8783 21.3783 29.9983 19.9983 29.9983C18.6183 29.9983 17.4983 28.8783 17.4983 27.4983C17.4983 26.1183 18.6183 24.9983 19.9983 24.9983C21.3783 24.9983 22.4983 26.1183 22.4983 27.4983Z"
    };

    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(11, 11, 15, 0.9)', backdropFilter: 'blur(12px)', padding: '2vh' }} onClick={onClose}>
            <div
                style={{
                    backgroundColor: '#151519',
                    position: 'relative',
                    borderRadius: '1.2vw',
                    border: '1px solid #1e1d22',
                    width: '100%',
                    maxWidth: '38vw',
                    padding: '1.8vh 1.8vw 5.6vh 1.8vw'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: '1.8vh' }}>
                    <div
                        style={{ backgroundColor: '#1e1e24', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.3vw', cursor: 'pointer' }}
                        onClick={onClose}
                    >
                        <div style={{ width: '1.5vw', height: '1.5vw' }}>
                            <svg style={{ width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                <path d={svgPaths.cross} fill="#3457DC" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Warning Icon - Nested Circles */}
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '1.8vh' }}>
                    <div style={{ backgroundColor: 'rgba(197, 67, 45, 0.1)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.9vw' }}>
                        <div
                            style={{
                                borderRadius: '9999px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1.5vw',
                                background: 'linear-gradient(90deg, rgba(197, 67, 45, 0.3) 0%, rgba(197, 67, 45, 0.3) 100%), linear-gradient(90deg, rgb(21, 21, 25) 0%, rgb(21, 21, 25) 100%)'
                            }}
                        >
                            <div style={{ width: '3vw', height: '3vw' }}>
                                <svg style={{ width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
                                    <path d={svgPaths.warning} fill="white" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', gap: '0.6vh', padding: '0 1.8vw' }}>
                    <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.5vw', lineHeight: 'normal', margin: 0 }}>
                        {t('active_subscription_title')}
                    </h1>
                    <p style={{ color: '#a5a5b2', fontSize: '1.05vw', lineHeight: 'normal', margin: 0 }}>
                        {t('active_subscription_desc')}
                        <br />
                        {t('If you need help, ')} <span style={{ color: '#3457dc', textDecoration: 'underline', fontWeight: 500, cursor: 'pointer' }}>{t('contact_support')}</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ActiveSubscriptionModal;
