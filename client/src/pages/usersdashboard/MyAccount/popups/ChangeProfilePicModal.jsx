import React, { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import profilePic from '@/assets/svg/myaccount/Profilepicture.svg';
import trashIcon from '@/assets/svg/myaccount/trash.svg';
import arrowIcon from '@/assets/svg/myaccount/index.svg';
import addPictureIcon from '@/assets/svg/myaccount/addPicture.svg';

// Import avatars
import av1 from '@/assets/svg/myaccount/Ellipse 21862.png';
import av2 from '@/assets/svg/myaccount/Ellipse 21862-2.png';
import av3 from '@/assets/svg/myaccount/Ellipse 21862-1.png';
import av4 from '@/assets/svg/myaccount/Ellipse 21861.png';
import av5 from '@/assets/svg/myaccount/Ellipse 21861-1.png';
import av6 from '@/assets/svg/myaccount/Ellipse 21860.png';
import av7 from '@/assets/svg/myaccount/Ellipse 21860-1.png';
import av8 from '@/assets/svg/myaccount/Ellipse 21859.png';
import av9 from '@/assets/svg/myaccount/Ellipse 21859-1.png';
import av10 from '@/assets/svg/myaccount/Ellipse 21858.png';
import av11 from '@/assets/svg/myaccount/Ellipse 21857.png';
import av12 from '@/assets/svg/myaccount/Ellipse 21857-2.png';
import av13 from '@/assets/svg/myaccount/Ellipse 21859-2.png';
import av14 from '@/assets/svg/myaccount/Ellipse 21857-1.png';

const initialAvatars = [av1, av4, av6, av8, av11, av2, av5, av7, av9, av12, av3, av10, av13, av14];

const ChangeProfilePicModal = ({ isOpen, onClose, currentPic, onSave }) => {
  const { language } = useLanguage();
  const { t } = useTranslation('personalInfo');
  const isRTL = language === 'ar';
  const [selectableAvatars, setSelectableAvatars] = useState(initialAvatars);
  const [tempSelectedPic, setTempSelectedPic] = useState(currentPic || profilePic);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(tempSelectedPic);
    }
  };

  const handleAddClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImageDataUrl = event.target.result;
        setSelectableAvatars(prev => [...prev, newImageDataUrl]);
        setTempSelectedPic(newImageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const isChanged = tempSelectedPic !== currentPic;

  return (
    <div className="cpp-backdrop" onClick={handleBackdropClick}>
      <style>{`
        .cpp-backdrop, .cpp-backdrop * {
          box-sizing: border-box;
        }

        @keyframes cppFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes cppBackdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .cpp-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          animation: cppBackdropFade 0.3s ease-out forwards;
        }

        .cpp-container {
          background-color: #151519;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
          gap: 1.25vw;
          padding: 1.25vw 1.25vw 1.67vw 1.25vw;
          border-radius: 0.83vw;
          width: 26.67vw;
          border: 1px solid #1e1d22;
          animation: cppFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .cpp-frame-7 {
          display: flex;
          align-items: flex-start;
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }

        .cpp-frame-6 {
          display: flex;
          gap: 0.22vw;
          align-items: center;
          position: relative;
          flex-shrink: 0;
          cursor: pointer;
        }

        .cpp-angle-icon {
          position: relative;
          width: 0.77vw;
          height: 0.77vw;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: ${isRTL ? '0' : '0.5vw'};
          margin-right: ${isRTL ? '0.5vw' : '0'};
          ${isRTL ? 'margin-top: 0.1vw;' : ''}
        }

        .cpp-angle-icon svg, .cpp-angle-icon img {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
        }

        .cpp-rotate-90 {
          transform: rotate(${isRTL ? '270deg' : '90deg'});
        }

        .cpp-back-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          color: #3457dc;
          font-size: 1.04vw;
          margin: 0;
          white-space: nowrap;
        }

        .cpp-frame-5 {
          display: flex;
          flex-direction: column;
          gap: 0.83vw;
          align-items: flex-start;
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }

        .cpp-frame-1 {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          flex-shrink: 0;
          width: 5.42vw;
        }

        .cpp-label-box {
          position: relative;
          width: 100%;
          background-color: transparent;
        }

        .cpp-label-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 0.21vw;
          width: 100%;
        }

        .cpp-label-text {
          font-family: 'Poppins', sans-serif;
          color: #9a9a9a;
          font-size: 0.91vw;
          margin-left: ${isRTL ? '0' : '1.5vw'};
          margin-right: ${isRTL ? '1.5vw' : '0'};
          white-space: nowrap;
        }

        .cpp-frame-4 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }

        .cpp-frame-10 {
          background-color: #1e1e24;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          border-radius: 400px;
          position: relative;
          flex-shrink: 0;
        }

        .cpp-user-icon {
          position: relative;
          width: 4vw;
          height: 4vw;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 50%;
        }

        .cpp-user-icon svg, .cpp-user-icon img {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cpp-frame-3 {
          display: flex;
          align-items: center;
          position: relative;
          flex-shrink: 0;
        }

        .cpp-frame-2 {
          display: flex;
          gap: 0.42vw;
          align-items: center;
          justify-content: center;
          padding: 1.2vh 1.25vw;
          border-radius: 0.625vw;
          position: relative;
          flex-shrink: 0;
          cursor: pointer;
        }

        .cpp-btn-border {
          position: absolute;
          inset: 0;
          border: 1px solid #2a2a30;
          border-radius: 0.625vw;
          pointer-events: none;
        }

        .cpp-remove-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          color: #c5432d;
          font-size: 0.91vw;
          margin: 0;
          white-space: nowrap;
          position: relative;
        }

        .cpp-trash-icon {
          position: relative;
          width: 1.2vw;
          height: 1.2vw;
          flex-shrink: 0;
        }

        .cpp-trash-icon svg, .cpp-trash-icon img {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
        }

        .cpp-frame-11 {
          display: flex;
          flex-direction: column;
          gap: 1.67vw;
          align-items: flex-start;
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }

        .cpp-frame-13 {
          display: flex;
          flex-direction: column;
          gap: 1vw;
          align-items: flex-start;
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }

        .cpp-frame-14 {
          display: flex;
          flex-direction: column;
          gap: 0.83vw;
          align-items: flex-start;
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }

        .cpp-hdr-text {
          font-family: 'Poppins', sans-serif;
          color: white;
          font-size: 0.91vw;
          margin: 0;
          white-space: nowrap;
        }

        .cpp-divider-container {
          height: 0;
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }

        .cpp-divider-svg {
          position: absolute;
          inset: -1px 0 0 0;
        }

        .cpp-avatar-grid {
          display: flex;
          gap: 0.8vw;
          row-gap: 1vw;
          align-items: flex-start;
          position: relative;
          flex-shrink: 0;
          width: 100%;
          flex-wrap: wrap;
        }

        .cpp-gray-circle {
          background-color: #2a2a30;
          position: relative;
          flex-shrink: 0;
          border-radius: 9999px;
          width: 3.33vw;
          height: 3.33vw;
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
          border: none;
        }

        .cpp-gray-circle:hover {
          transform: scale(1.05);
        }

        .cpp-gray-circle.selected {
          box-shadow: 0 0 0 0.15vw #3457dc, 0 0 10px rgba(52, 87, 220, 0.4);
          transform: scale(1.1);
          z-index: 10;
        }

        .cpp-gray-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cpp-frame-17 {
          background-color: #222127;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          width: 3.33vw;
          height: 3.33vw;
          flex-shrink: 0;
          position: relative;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .cpp-frame-17:hover {
          transform: scale(1.05);
          background-color: #2a2a30;
        }

        .cpp-add-icon {
          position: relative;
          width: 1.25vw;
          height: 1.25vw;
          flex-shrink: 0;
        }

        .cpp-add-icon img {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
        }

        .cpp-frame-12 {
          display: flex;
          gap: 0.83vw;
          align-items: flex-start;
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }

        .cpp-frame-9 {
          background-color: #1e1e24;
          flex: 1;
          position: relative;
          border-radius: 0.83vw;
          cursor: pointer;
          border: none;
          padding: 0;
        }

        .cpp-btn-label-box {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5vh 0.625vw;
          width: 100%;
        }

        .cpp-btn-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          color: white;
          font-size: 0.91vw;
          margin: 0;
          white-space: nowrap;
        }

        .cpp-frame-8 {
          background-color: #1e1e24;
          flex: 1;
          position: relative;
          border-radius: 0.83vw;
          cursor: pointer;
          border: none;
          padding: 0;
          transition: all 0.2s ease;
        }

        .cpp-frame-8:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .cpp-frame-8.active {
          background-color: #3457dc;
        }

        .cpp-btn-save-box {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5vh 1.25vw;
          width: 100%;
        }

        .cpp-save-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          color: #373735;
          font-size: 0.91vw;
          margin: 0;
          white-space: nowrap;
        }

        .cpp-frame-8.active .cpp-save-text {
          color: white;
        }
      `}</style>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={onFileChange}
      />

      <div className="cpp-container">
        {/* Back Button (Frame 7) */}
        <div className="cpp-frame-7">
          <div className="cpp-frame-6" onClick={onClose}>
            <div className="cpp-angle-icon">
              <div className="cpp-rotate-90" style={{ display: 'flex', width: '100%', height: '100%' }}>
                <img src={arrowIcon} alt="Back" />
              </div>
            </div>
            <p className="cpp-back-text">{t('back')}</p>
          </div>
        </div>

        {/* Profile Info (Frame 5) */}
        <div className="cpp-frame-5">
          <div className="cpp-frame-1">
            <div className="cpp-label-box">
              <div className="cpp-label-inner">
                <p className="cpp-label-text">{t('profilePicture')}</p>
              </div>
            </div>
          </div>

          <div className="cpp-frame-4">
            <div className="cpp-frame-10">
              <div className="cpp-user-icon">
                <img src={tempSelectedPic} alt="User" />
              </div>
            </div>
            <div className="cpp-frame-3">
              <div className="cpp-frame-2" onClick={() => setTempSelectedPic(profilePic)}>
                <div className="cpp-btn-border" />
                <p className="cpp-remove-text">{t('removePicture')}</p>
                <div className="cpp-trash-icon">
                  <img src={trashIcon} alt="Trash" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Section (Frame 11) */}
        <div className="cpp-frame-11">
          <div className="cpp-frame-13">
            <div className="cpp-frame-14">
              <p className="cpp-hdr-text">{t('choose_avatar')}</p>
              <div className="cpp-divider-container">
                <div className="cpp-divider-svg">
                  <svg style={{ width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 464 1">
                    <line stroke="#2A2A30" x2="464" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="cpp-avatar-grid">
              <div className="cpp-frame-17" onClick={handleAddClick}>
                <div className="cpp-add-icon">
                  <img src={addPictureIcon} alt="Add" />
                </div>
              </div>
              {selectableAvatars.map((img, i) => (
                <div
                  key={i}
                  className={`cpp-gray-circle ${tempSelectedPic === img ? 'selected' : ''}`}
                  onClick={() => setTempSelectedPic(img)}
                >
                  <img src={img} alt={`${t('avatar_alt')} ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="cpp-frame-12">
            <button className="cpp-frame-9" onClick={onClose}>
              <div className="cpp-btn-label-box">
                <p className="cpp-btn-text">{t('cancel')}</p>
              </div>
            </button>
            <button
              className={`cpp-frame-8 ${isChanged ? 'active' : ''}`}
              disabled={!isChanged}
              onClick={handleSave}
            >
              <div className="cpp-btn-save-box">
                <p className="cpp-save-text">{t('saveChanges')}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicModal;
