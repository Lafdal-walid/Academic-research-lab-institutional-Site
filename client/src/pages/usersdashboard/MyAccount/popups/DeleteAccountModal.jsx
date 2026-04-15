import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';

const DeleteAccountModal = ({ isOpen, onClose, onSuccess }) => {
    const { language } = useLanguage();
    const { t } = useTranslation('account');
    const isRTL = language === 'ar';
    const [password, setPassword] = useState('');

    const svgPath = "M19.061 7.854C18.9217 7.71461 18.7563 7.60403 18.5742 7.52859C18.3922 7.45315 18.1971 7.41432 18 7.41432C17.8029 7.41432 17.6078 7.45315 17.4258 7.52859C17.2437 7.60403 17.0783 7.71461 16.939 7.854L12.353 12.439C12.2592 12.5327 12.1321 12.5854 11.9995 12.5854C11.8669 12.5854 11.7398 12.5327 11.646 12.439L7.061 7.854C6.77974 7.5726 6.39821 7.41447 6.00035 7.41437C5.6025 7.41428 5.22089 7.57224 4.9395 7.8535C4.65811 8.13476 4.49997 8.51629 4.49987 8.91415C4.49978 9.312 4.65774 9.69361 4.939 9.975L9.525 14.561C9.85001 14.886 10.2359 15.1439 10.6605 15.3198C11.0852 15.4957 11.5403 15.5863 12 15.5863C12.4597 15.5863 12.9148 15.4957 13.3395 15.3198C13.7641 15.1439 14.15 14.886 14.475 14.561L19.061 9.975C19.3422 9.69371 19.5002 9.31225 19.5002 8.9145C19.5002 8.51675 19.3422 8.13529 19.061 7.854Z";

    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(11, 11, 15, 0.9)', backdropFilter: 'blur(12px)', padding: '2vh' }} onClick={onClose}>
            <div style={{ backgroundColor: '#151519', display: 'flex', flexDirection: 'column', gap: '2vh', alignItems: 'center', justifyContent: 'center', padding: '3vh', borderRadius: '2vh', width: '100%', maxWidth: '31vw', border: '0.052vw solid #1e1d22' }} onClick={(e) => e.stopPropagation()}>
                {/* Back Button */}
                <div style={{ display: 'flex', gap: '0.4vw', alignItems: 'center', width: '100%' }}>
                    <div
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: '1.3vw', height: '1.3vw', cursor: 'pointer', transform: `rotate(${isRTL ? '270deg' : '90deg'})` }}
                        onClick={onClose}
                    >
                        <svg style={{ width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                            <path d={svgPath} fill="#3457DC" />
                        </svg>
                    </div>
                    <p style={{ fontSize: '0.95vw', color: '#3457dc', fontWeight: 500, whiteSpace: 'nowrap', cursor: 'pointer', margin: 0 }} onClick={onClose}>
                        {t('back')}
                    </p>
                </div>

                {/* Title Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9vh', alignItems: 'center', textAlign: 'center', width: '100%', padding: '0 2vw' }}>
                    <p style={{ fontSize: '1.3vw', color: 'white', fontWeight: 800, margin: 0 }}>
                        {t('delete_your_account')}
                    </p>
                    <p style={{ fontSize: '0.9vw', color: '#a5a5b2', margin: 0, lineHeight: 1.5 }}>
                        {t('this_action_is_permanent')}
                    </p>
                </div>

                {/* Password Input Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh', alignItems: 'flex-start', width: '100%' }}>
                    <style>{`
                        .delete-pw-input::placeholder {
                            font-size: 0.8vw;
                            color: #a5a5b2;
                        }
                    `}</style>
                    <p style={{ fontSize: '0.9vw', color: '#80808a', margin: 0 }}>
                        {t('password')}
                    </p>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', height: '5.35vh', borderRadius: '0.8vw', width: '100%', border: '0.052vw solid #2a2a30', display: 'flex', alignItems: 'center', padding: '0.5vh 1.2vw' }}>
                        <input
                            type="password"
                            placeholder={t('enter_password')}
                            className="delete-pw-input"
                            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '1vw', width: '100%' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Buttons Section */}
                <div style={{ display: 'flex', gap: '0.7vw', alignItems: 'center', width: '100%' }}>
                    <button style={{ backgroundColor: '#1e1e24', flex: 0.4, height: '6.5vh', borderRadius: '1vw', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ fontSize: '0.88vw', color: 'white', fontWeight: 500, whiteSpace: 'nowrap', margin: 0 }}>
                            {t('contact_us')}
                        </p>
                    </button>
                    <button
                        style={{ backgroundColor: password.length >= 8 ? '#C5432D' : '#1e1e24', flex: 0.6, height: '6.5vh', borderRadius: '1vw', border: 'none', cursor: password.length >= 8 ? 'pointer' : 'not-allowed', opacity: password.length >= 8 ? 1 : 0.5, transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => password.length >= 8 && onSuccess()}
                    >
                        <p style={{ fontSize: '0.88vw', color: password.length >= 8 ? 'white' : '#373735', fontWeight: 500, whiteSpace: 'nowrap', margin: 0 }}>
                            {t('delete_permanently')}
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
