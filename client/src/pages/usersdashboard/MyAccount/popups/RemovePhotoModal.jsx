import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import profilePic from '@/assets/svg/myaccount/Profilepicture.svg';
import arrowIcon from '@/assets/svg/myaccount/index.svg';

const RemovePhotoModal = ({ isOpen, onClose, onConfirm, currentPic }) => {
  const { language } = useLanguage();
  const { t } = useTranslation('personalInfo');
  const isRTL = language === 'ar';
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="rpm-backdrop" onClick={handleBackdropClick}>
      <style>{`
        .rpm-backdrop, .rpm-backdrop * {
          box-sizing: border-box;
        }

        @keyframes rpmFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes rpmBackdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .rpm-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1100;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          animation: rpmBackdropFade 0.3s ease-out forwards;
        }

        .rpm-container {
          background-color: #151519;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          max-height: 90vh;
          overflow: hidden;
          gap: 1.25vw;
          padding: 1.25vw 1.25vw 1.67vw 1.25vw;
          border-radius: 0.83vw;
          width: 32vw;
          border: 1px solid #1e1d22;
          animation: rpmFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .rpm-frame-1 {
          display: flex;
          align-items: flex-start;
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }

        .rpm-frame-6 {
          display: flex;
          gap: 0.27vw;
          align-items: center;
          position: relative;
          flex-shrink: 0;
          cursor: pointer;
        }

        .rpm-angle-icon {
          position: relative;
          width: 0.85vw;
          height: 0.85vw;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          ${isRTL ? 'margin-top: 0.1vw;' : ''}
        }

        .rpm-angle-icon img {
          display: block;
          width: 100%;
          height: 100%;
          transform: rotate(${isRTL ? '270deg' : '90deg'});
        }

        .rpm-back-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          color: #3457dc;
          font-size: 1.00vw;
          margin: 0;
          white-space: nowrap;
        }

        .rpm-profile-preview {
          position: relative;
          width: 4.5vw;
          height: 4.5vw;
          flex-shrink: 0;
          border-radius: 50%;
          overflow: hidden;
          background-color: #1e1e24;
        }

        .rpm-profile-preview img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .rpm-content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.67vw;
          align-items: flex-start;
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }

        .rpm-text-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.7vw;
          width: 100%;
          padding: 0 1.25vw;
        }

        .rpm-title {
          font-family: 'Gilroy', sans-serif;
          font-weight: 800;
          color: white;
          font-size: 1.25vw;
          margin: 0;
          width: 14vw;
        }

        .rpm-description {
          font-family: 'Poppins', sans-serif;
          color: #a5a5b2;
          font-size: 0.88vw;
          margin: 0;
          width: 100%;
          white-space: nowrap;
          margin-bottom: 0.3vw;
        }

        .rpm-actions {
          display: flex;
          gap: 0.83vw;
          align-items: flex-start;
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }

        .rpm-btn-cancel {
          background-color: #1e1e24;
          flex: 1;
          border-radius: 0.83vw;
          border: none;
          cursor: pointer;
          padding: 1.5vh 0.625vw;
        }

        .rpm-btn-confirm {
          background-color: #c5432d;
          flex: 1;
          border-radius: 0.83vw;
          border: none;
          cursor: pointer;
          padding: 1.5vh 0.625vw;
        }

        .rpm-btn-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          color: white;
          font-size: 0.88vw;
          margin: 0;
          white-space: nowrap;
        }
      `}</style>

      <div className="rpm-container">
        {/* Back Button */}
        <div className="rpm-frame-1">
          <div className="rpm-frame-6" onClick={onClose}>
            <div className="rpm-angle-icon">
              <img src={arrowIcon} alt="Back" />
            </div>
            <p className="rpm-back-text">{t('back')}</p>
          </div>
        </div>

        {/* Profile Preview */}
        <div className="rpm-profile-preview">
          <img src={currentPic || profilePic} alt="Profile" />
        </div>

        {/* Content & Actions */}
        <div className="rpm-content-wrapper">
          <div className="rpm-text-section">
            <h2 className="rpm-title">{t('remove_photo_title')}</h2>
            <p className="rpm-description">{t('remove_photo_desc')}</p>
          </div>

          <div className="rpm-actions">
            <button className="rpm-btn-cancel" onClick={onClose}>
              <p className="rpm-btn-text">{t('cancel')}</p>
            </button>
            <button className="rpm-btn-confirm" onClick={onConfirm}>
              <p className="rpm-btn-text">{t('remove_photo_btn')}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemovePhotoModal;
