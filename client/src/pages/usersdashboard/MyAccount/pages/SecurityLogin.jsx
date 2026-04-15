import React, { useState } from 'react';
import { RiEyeLine, RiEyeOffLine, RiCheckLine, RiCloseLine, RiArrowLeftSLine, RiFileCopyLine, RiAlertLine } from 'react-icons/ri';
import warningIcon from '@/assets/svg/myaccount/warning.svg';
import eyeIcon from '@/assets/svg/myaccount/eye.svg';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import DeleteAccountModal from '../popups/DeleteAccountModal';
import DeletionSuccessModal from '../popups/DeletionSuccessModal';
import ActiveSubscriptionModal from '../popups/ActiveSubscriptionModal';
import ConfirmIdentityModal from '../popups/ConfirmIdentityModal';
import SetupTFAModal from '../popups/SetupTFAModal';
import VerifyTFACodeModal from '../popups/VerifyTFACodeModal';
import TFASuccessModal from '../popups/TFASuccessModal';

// Modal State Constants
const MODALS = {
    NONE: null,
    CONFIRM_IDENTITY: 'CONFIRM_IDENTITY',
    SETUP_TFA: 'SETUP_TFA',
    VERIFY_TFA: 'VERIFY_TFA',
    TFA_SUCCESS: 'TFA_SUCCESS',
    DELETE_ACCOUNT: 'DELETE_ACCOUNT',
    DELETION_SUCCESS: 'DELETION_SUCCESS',
    ACTIVE_SUB: 'ACTIVE_SUB'
};

const theme = {
    accent: '#3457DC',
    dashboardCard: '#151519',
    cardBorder: '#262626',
    warning: '#C5432D',
    error: '#C5432D',
    neutralGrey: '#9a9a9a',
    inputBg: 'rgba(255,255,255,0.01)',
    hoverBg: '#2a2a30',
};

export default function SecurityLogin() {
    const { language } = useLanguage();
    const { t } = useTranslation('account');
    const [tfaEnabled, setTfaEnabled] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [accountModalState, setAccountModalState] = useState(MODALS.NONE);
    const [showPassword, setShowPassword] = useState({ current: false, new: false });
    const [hasActiveSubscription, setHasActiveSubscription] = useState(true);

    return (
        <>
            <style>{`
                .btn-save:hover { background-color: rgba(52, 87, 220, 0.8) !important; }



                /* Responsive Classes for Large Screens */
                .security-card {
                    background-color: #151519;
                    border-radius: 16px;
                    border: 1px solid #1e1d22;
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    width: 100%;
                }

                .security-title {
                    font-family: "Gilroy", sans-serif;
                    font-weight: 800;
                    font-size: 16px;
                    color: white;
                    margin: 0;
                }

                .security-input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    width: 100%;
                }

                .security-label {
                    font-family: "Poppins", sans-serif;
                    font-size: 14px;
                    color: #9a9a9a;
                    margin: 0;
                }

                .security-input-wrapper {
                    background-color: rgba(255,255,255,0.01);
                    border: 1px solid #2a2a30;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 14px;
                    position: relative;
                }

                .security-card-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                }

                .delete-check-row {
                    display: flex;
                    align-items: center;
                    gap: 0.5vw;
                    cursor: pointer;
                    margin-top: 0vh;
                    flex-direction: row;
                    flex-wrap: nowrap;
                }

                @media (min-width: 1024px) {
                    .delete-check-row {
                        width: max-content;
                    }
                    .delete-check-row p {
                        white-space: nowrap;
                    }
                }

                .security-input {
                    background: transparent;
                    border: none;
                    outline: none;
                    color: white;
                    font-family: "Poppins", sans-serif;
                    font-size: 14px;
                    width: 100%;
                }

                .security-input::placeholder {
                    color: rgba(255, 255, 255, 0.5);
                    opacity: 1;
                }

                input::placeholder {
                    color: rgba(255, 255, 255, 0.5) !important;
                    opacity: 1 !important;
                }

                .security-action-link {
                    font-family: "Poppins", sans-serif;
                    font-weight: 500;
                    font-size: 14px;
                    color: #3457dc;
                    cursor: pointer;
                    margin-top: 12px;
                    background: none;
                    border: none;
                    padding: 0;
                    text-align: left;
                }

                .security-btn-save {
                    align-self: flex-start;
                    background-color: #1e1e24;
                    border-radius: 16px;
                    padding: 14px 16px;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    width: fit-content;
                }

                .security-btn-save p {
                    font-family: "Poppins", sans-serif;
                    font-size: 14px;
                    color: #373735;
                    margin: 0;
                }

                .security-divider {
                    width: 100%;
                    height: 1px;
                    background-color: #222127;
                    margin: 12px 0;
                }

                .desktop-divider {
                    display: none;
                }

                .security-desc {
                    font-family: "Poppins", sans-serif;
                    font-size: 14px;
                    color: #a5a5b2;
                    margin: 0;
                }

                @media (min-width: 1024px) {
                    .security-card {
                        padding: 3vh 2vw;
                        border-radius: 1vw;
                        gap: 2.7vh;
                    }

                    .security-title {
                        font-size: 1.1vw;
                    }

                    .security-input-group {
                        width: 100%;
                        gap: 1.5vh;
                    }

                    .security-label {
                        font-size: 0.9vw;
                    }

                    .security-input-wrapper {
                        padding: 1.2vh 1vw;
                        border-radius: 0.6vw;
                    }

                    .security-input {
                        font-size: 0.9vw;
                    }

                    .security-action-link {
                        font-size: 0.9vw;
                        margin-top: 1.2vh;
                    }

                    .security-btn-save {
                        margin-top: 1vh;
                        padding: 1.80vh 1.5vw;
                        border-radius: 1vw;
                    }

                    .security-btn-save p {
                        font-size: 0.9vw;
                    }

                    .security-desc {
                        font-size: 0.9vw;
                    }

                    .security-divider {
                        margin: 0.5vh 0;
                    }

                    .desktop-divider {
                        display: block;
                    }
                    
                    .tfa-info-text {
                        max-width: 30vw !important;
                    }
                    
                    .delete-btn-box {
                        width: 12vw !important;
                        padding: 1.2vh 1.5vw !important;
                        border-radius: 0.8vw !important;
                    }
                    
                .delete-btn-text {
                        font-size: 0.9vw !important;
                    }

                    .security-modal-container {
                        max-width: 35vw !important;
                        padding: 5vh 3vw !important;
                        border-radius: 2.5vw !important;
                    }
                }

                .tfa-status-row {
                    display: flex;
                    align-items: center;
                    gap: 1vw;
                }

                @media (min-width: 1024px) {
                    .tfa-status-row {
                        flex-direction: row !important;
                    }
                    .tfa-status-row p {
                        white-space: nowrap !important;
                    }
                }

                @media (max-width: 1023px) {
                    .security-card {
                        padding: 24px 16px !important;
                        gap: 24px !important;
                    }
                    
                    .delete-card {
                        gap: 20px !important;
                    }

                    .security-input-group {
                        width: 100% !important;
                        gap: 12px !important;
                    }

                    .delete-btn-box {
                        width: fit-content !important;
                        min-width: 181px !important;
                        padding: 10px 24px !important;
                        border-radius: 12px !important;
                        margin-top: 10px !important;
                        gap: 10px !important;
                    }

                    .security-card-row {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 20px !important;
                    }

                    .tfa-info-text {
                        max-width: 100% !important;
                    }

                    .tfa-toggle-btn {
                        width: 48px !important;
                        height: 28px !important;
                        border-radius: 14px !important;
                    }

                    .tfa-toggle-circle {
                        width: 20px !important;
                        height: 20px !important;
                        left: ${tfaEnabled ? 'auto' : '4px'} !important;
                        right: ${tfaEnabled ? '4px' : 'auto'} !important;
                    }

                    .checkbox-box {
                        width: 16px !important;
                        height: 16px !important;
                        border-radius: 4px !important;
                        margin-right: 8px !important;
                    }

                    .checkbox-inner {
                        width: 16px !important;
                        height: 16px !important;
                        border-radius: 4px !important;
                    }

                    .tfa-status-row {
                        gap: 16px !important;
                    }

                    .delete-check-row {
                        gap: 12px !important;
                        margin-top: 12px !important;
                        align-items: center !important;
                    }

                    .delete-check-row p {
                        white-space: normal !important;
                        line-height: 1.4 !important;
                    }

                    .delete-btn-text {
                        font-size: 14px !important;
                        white-space: nowrap !important;
                    }
                }

                /* Icon Responsiveness */
                .security-icon-eye { width: 20px; height: 20px; }
                .security-icon-warning { 
                    width: 16px; 
                    height: 16px; 
                    filter: brightness(0) saturate(100%) invert(21%) sepia(0%) saturate(1209%) hue-rotate(156deg) brightness(97%) contrast(85%); /* #373735 */
                }
                .security-icon-warning.active {
                    filter: brightness(0) saturate(100%) invert(100%); /* white */
                }

                @media (min-width: 1024px) {
                    .security-icon-eye { width: 1.3vw !important; height: 1.3vw !important; }
                    .security-icon-warning { width: 1.1vw !important; height: 1.1vw !important; }
                    .security-icon-check { width: 0.8vw !important; height: 0.8vw !important; }
                    .security-icon-back { width: 1.5vw !important; height: 1.5vw !important; }
                    .security-icon-copy { width: 1.2vw !important; height: 1.2vw !important; }
                    .security-icon-close { width: 1.8vw !important; height: 1.8vw !important; }
                    .security-icon-tfa-large { width: 2.5vw !important; height: 2.5vw !important; }
                }
            `}</style>
            <div className="flex flex-col gap-[4vh] w-full items-stretch">

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh', width: '100%' }}>
                    {/* Change Password & 2FA Container */}
                    <div className="security-card">
                        <p className="security-title">{t('change_password')}</p>

                        <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4vh', width: '100%' }}>

                                {/* Current password */}
                                <div className="security-input-group">
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <p className="security-label">{t('current_password')}</p>
                                    </div>
                                    <div className="security-input-wrapper">
                                        <input
                                            type={showPassword.current ? "text" : "password"}
                                            placeholder={t('enter_password')}
                                            className="security-input"
                                        />
                                        <button onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                                            <img
                                                src={eyeIcon}
                                                className="security-icon-eye"
                                                alt="toggle visibility"
                                                style={{
                                                    filter: 'brightness(0) saturate(100%) invert(31%) sepia(87%) saturate(1915%) hue-rotate(218deg) brightness(91%) contrast(96%)', /* #3457DC */
                                                    opacity: showPassword.current ? 1 : 0.6
                                                }}
                                            />
                                        </button>
                                    </div>
                                    <button className="security-action-link">{t('forgot_password_question')}</button>
                                </div>

                                {/* New password */}
                                <div className="security-input-group">
                                    <p className="security-label">{t('new_password')}</p>
                                    <div className="security-input-wrapper">
                                        <input
                                            type={showPassword.new ? "text" : "password"}
                                            placeholder={t('enter_new_password')}
                                            className="security-input"
                                        />
                                        <button onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                                            <img
                                                src={eyeIcon}
                                                className="security-icon-eye"
                                                alt="toggle visibility"
                                                style={{
                                                    filter: 'brightness(0) saturate(100%) invert(31%) sepia(87%) saturate(1915%) hue-rotate(218deg) brightness(91%) contrast(96%)', /* #3457DC */
                                                    opacity: showPassword.new ? 1 : 0.6
                                                }}
                                            />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Save changes button */}
                        <button className="security-btn-save">
                            <p>{t('save_changes')}</p>
                        </button>

                        {/* Divider */}
                        <div className="security-divider"></div>

                        {/* 2FA block */}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 129, width: '100%' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', minHeight: 70, justifyContent: 'space-between', width: '100%' }}>
                                <div className="security-card-row">

                                    <div className="tfa-info-text" style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh', maxWidth: '25vw' }}>
                                        <p className="security-title">{t('two_factor_authentication')}</p>
                                        <p className="security-desc">{t('extra_security_protects_account')}</p>
                                    </div>

                                    <div className="tfa-status-row">
                                        <p className="security-desc">({tfaEnabled ? t('enabled') : t('not_enabled')})</p>

                                        {/* Toggle matching design */}
                                        <button
                                            onClick={() => { if (!tfaEnabled) setAccountModalState(MODALS.CONFIRM_IDENTITY); else setTfaEnabled(false); }}
                                            className="tfa-toggle-btn"
                                            style={{
                                                width: "2.5vw",
                                                height: "2.8vh",
                                                borderRadius: "1.4vh",
                                                backgroundColor: "#1E1E24",
                                                border: "0.05vw solid #2A2A30",
                                                position: "relative",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center"
                                            }}
                                        >
                                            <div
                                                className="tfa-toggle-circle"
                                                style={{
                                                    width: "1.04vw",
                                                    height: "1.04vw",
                                                    borderRadius: "50%",
                                                    backgroundColor: tfaEnabled ? "#3457dc" : "white",
                                                    position: "absolute",
                                                    left: tfaEnabled ? "auto" : "0.21vw",
                                                    right: tfaEnabled ? "0.21vw" : "auto",
                                                    transition: "0.3s"
                                                }}
                                            ></div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => setAccountModalState(MODALS.CONFIRM_IDENTITY)} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 6, position: 'relative', cursor: 'pointer', background: 'none', border: 'none', borderBottom: '1px solid #3457dc', marginTop: 12 }}>
                                <p className="security-action-link" style={{ marginTop: "2vh" }}>{t('setup_2fa')}</p>
                            </button>
                        </div>
                    </div>

                    {/* Delete Account Container */}
                    <div className="security-card" style={{ padding: '3vh 2vw', gap: '2vh' }}>
                        <div className="security-card-row">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh', flex: 1 }}>
                                <p className="security-title">{t('delete_account')}</p>
                                <p className="security-desc">{t('this_will_permanently_remove')}</p>
                            </div>

                            <button
                                disabled={!confirmDelete}
                                onClick={() => {
                                    if (hasActiveSubscription) setAccountModalState(MODALS.ACTIVE_SUB);
                                    else setAccountModalState(MODALS.DELETE_ACCOUNT);
                                }}
                                className="delete-btn-box"
                                style={{ backgroundColor: confirmDelete ? '#C5432D' : '#1e1e24', borderRadius: '0.8vw', padding: '1.2vh 1.5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6vw', border: 'none', cursor: confirmDelete ? 'pointer' : 'not-allowed', width: '12vw', transition: 'all 0.2s' }}
                            >
                                <p className="delete-btn-text" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '0.9vw', color: confirmDelete ? 'white' : '#373735', margin: 0 }}>{t('delete_account')}</p>
                                <img src={warningIcon} className={`security-icon-warning ${confirmDelete ? 'active' : ''}`} alt="warning" />
                            </button>
                        </div>

                        <div className="security-divider desktop-divider"></div>

                        <div className="delete-check-row" onClick={() => setConfirmDelete(!confirmDelete)}>
                            {/* Checkbox */}
                            <div className="checkbox-box" style={{ width: "1vw", marginRight: "0.5vw", height: "1vw", position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="checkbox-inner" style={{ width: "1vw", height: "1vw", borderRadius: "0.25vw", border: '1px solid #373735', backgroundColor: confirmDelete ? '#3457dc' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                                    {confirmDelete && <RiCheckLine style={{ color: "white" }} />}
                                </div>
                            </div>
                            <p className="security-desc">{t('i_understand_deleting_is_permanent')}</p>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <ConfirmIdentityModal
                    isOpen={accountModalState === MODALS.CONFIRM_IDENTITY}
                    onClose={() => setAccountModalState(MODALS.NONE)}
                    onSuccess={() => setAccountModalState(MODALS.SETUP_TFA)}
                />
                <SetupTFAModal
                    isOpen={accountModalState === MODALS.SETUP_TFA}
                    onClose={() => setAccountModalState(MODALS.NONE)}
                    onSuccess={() => setAccountModalState(MODALS.VERIFY_TFA)}
                />
                <VerifyTFACodeModal
                    isOpen={accountModalState === MODALS.VERIFY_TFA}
                    onClose={() => setAccountModalState(MODALS.NONE)}
                    onVerify={() => setAccountModalState(MODALS.TFA_SUCCESS)}
                />
                <TFASuccessModal
                    isOpen={accountModalState === MODALS.TFA_SUCCESS}
                    onClose={() => { setTfaEnabled(true); setAccountModalState(MODALS.NONE); }}
                />
                <DeleteAccountModal
                    isOpen={accountModalState === MODALS.DELETE_ACCOUNT}
                    onClose={() => setAccountModalState(MODALS.NONE)}
                    onSuccess={() => setAccountModalState(MODALS.DELETION_SUCCESS)}
                />
                <DeletionSuccessModal
                    isOpen={accountModalState === MODALS.DELETION_SUCCESS}
                    onClose={() => setAccountModalState(MODALS.NONE)}
                />
                <ActiveSubscriptionModal
                    isOpen={accountModalState === MODALS.ACTIVE_SUB}
                    onClose={() => setAccountModalState(MODALS.NONE)}
                />
            </div>
        </>
    );
}
