import React, { useState, useCallback } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import PersonalInformationTab from '../../components/sections/user/account/PersonalInformationTab';
import SecurityTab from '../../components/sections/user/account/SecurityTab';
import PreferencesTab from '../../components/sections/user/account/PreferencesTab';

interface Profile {
    username: string;
    email: string;
    phone: string;
    country: string;
    profilePicture: string;
}

const Account = () => {
    const { t } = useTranslation('account');
    const [activeTab, setActiveTab] = useState<'personal' | 'security' | 'preferences'>('personal');

    const [profile, setProfile] = useState<Profile>({
        username: 'Moes_r',
        email: "Moes_r@gmail.com",
        phone: '+966 8487154547',
        country: 'SA',
        profilePicture: '/assets/img/avatar-default.jpg',
    });

    const handleProfileUpdate = useCallback((updates: Partial<Profile>) => {
        setProfile(prev => ({ ...prev, ...updates }));
    }, []);

    return (
        <div className="dashboard account-page">
            {/* Tabs Navigation */}
            <div className="page-head mb-32">
                <div className="tabs-header2 account-tabs">
                    <a
                        href="#"
                        className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); setActiveTab('personal'); }}
                    >
                        {t('personal_information')}
                    </a>
                    <a
                        href="#"
                        className={`tab ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); setActiveTab('security'); }}
                    >
                        {t('security_and_login')}
                    </a>
                    <a
                        href="#"
                        className={`tab ${activeTab === 'preferences' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); setActiveTab('preferences'); }}
                    >
                        {t('preferences')}
                    </a>
                </div>
            </div>

            {/* Tab Content */}
            <main className="account-content">
                {activeTab === 'personal' && (
                    <PersonalInformationTab
                        profile={profile}
                        onProfileUpdate={handleProfileUpdate}
                    />
                )}

                {activeTab === 'security' && (
                    <SecurityTab />
                )}

                {activeTab === 'preferences' && (
                    <PreferencesTab />
                )}
            </main>
        </div>
    );
};

export default React.memo(Account);
