import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const DeletionSuccessModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation('account');

    const svgPaths = {
        cross: "M15 5C14.8437 4.84377 14.6318 4.75601 14.4108 4.75601C14.1899 4.75601 13.9779 4.84377 13.8217 5L10 8.82167L6.17833 5C6.02206 4.84377 5.81014 4.75601 5.58917 4.75601C5.3682 4.75601 5.15627 4.84377 5 5C4.84377 5.15627 4.75601 5.3682 4.75601 5.58917C4.75601 5.81014 4.84377 6.02206 5 6.17833L8.82167 10L5 13.8217C4.84377 13.9779 4.75601 14.1899 4.75601 14.4108C4.75601 14.6318 4.84377 14.8437 5 15C5.15627 15.1562 5.3682 15.244 5.58917 15.244C5.81014 15.244 6.02206 15.1562 6.17833 15L10 11.1783L13.8217 15C13.9779 15.1562 14.1899 15.244 14.4108 15.244C14.6318 15.244 14.8437 15.1562 15 15C15.1562 14.8437 15.244 14.6318 15.244 14.4108C15.244 14.1899 15.1562 13.9779 15 13.8217L11.1783 10L15 6.17833C15.1562 6.02206 15.244 5.81014 15.244 5.58917C15.244 5.3682 15.1562 5.15627 15 5Z",
        check: "M10.3323 23.1003C9.42391 23.1007 8.55276 22.7397 7.911 22.0968L0.590748 14.7793C-0.196916 13.9914 -0.196916 12.7142 0.590748 11.9262C1.37866 11.1386 2.65587 11.1386 3.44379 11.9262L10.3323 18.8147L28.5562 0.590748C29.3441 -0.196916 30.6213 -0.196916 31.4093 0.590748C32.1969 1.37866 32.1969 2.65587 31.4093 3.44379L12.7535 22.0968C12.1117 22.7397 11.2406 23.1007 10.3323 23.1003Z"
    };

    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(11, 11, 15, 0.9)', backdropFilter: 'blur(12px)', padding: '2vh' }} onClick={onClose}>
            <div
                style={{
                    backgroundColor: '#151519',
                    position: 'relative',
                    borderRadius: '2vh',
                    border: '1px solid #1e1d22',
                    width: '100%',
                    maxWidth: '40vw',
                    padding: '3vh 3vw 4vh 3vw'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: '3vh' }}>
                    <div
                        style={{ backgroundColor: '#1e1e24', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.7vh', cursor: 'pointer' }}
                        onClick={onClose}
                    >
                        <div style={{ width: '2.8vh', height: '2.8vh' }}>
                            <svg style={{ width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                <path d={svgPaths.cross} fill="#3457DC" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Success Icon */}
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '3vh' }}>
                    <div style={{ backgroundColor: 'rgba(52,87,220,0.2)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5vh' }}>
                        <div style={{ backgroundColor: 'rgba(52,87,220,0.6)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2vh' }}>
                            <div style={{ width: '4vh', height: '4vh', position: 'relative' }}>
                                <svg
                                    style={{
                                        position: 'absolute',
                                        top: '13.91%',
                                        left: '0',
                                        right: '0',
                                        bottom: '13.91%',
                                        width: '100%',
                                        height: '72.18%'
                                    }}
                                    fill="none"
                                    preserveAspectRatio="none"
                                    viewBox="0 0 32 23.1003"
                                >
                                    <path d={svgPaths.check} fill="white" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', gap: '1vh', marginBottom: '3vh', padding: '0 2vw' }}>
                    <h1 style={{ color: 'white', fontWeight: 800, whiteSpace: 'nowrap', fontSize: '2.5vh', margin: 0 }}>
                        {t('account_deleted_successfully')}
                    </h1>
                    <p style={{ color: '#a5a5b2', fontSize: '1.8vh', lineHeight: '1.6', margin: 0 }}>
                        {t('sorry_to_see_you_go')}
                    </p>
                </div>

                {/* Return Button */}
                <div style={{ width: '100%' }}>
                    <div
                        style={{ backgroundColor: '#3457dc', borderRadius: '2vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2vh 1.5vw', cursor: 'pointer' }}
                        onClick={onClose}
                    >
                        <p style={{ color: 'white', fontWeight: 500, whiteSpace: 'nowrap', fontSize: '1.8vh', margin: 0 }}>
                            {t('return_to_homepage')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeletionSuccessModal;
