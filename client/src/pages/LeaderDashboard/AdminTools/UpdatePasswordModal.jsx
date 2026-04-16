import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiEyeLine, RiEyeOffLine, RiArrowLeftSLine } from 'react-icons/ri';

const UpdatePasswordModal = ({ isOpen, onClose, onBack }) => {
    const [newPassword, setNewPassword] = useState('Xq7f1gZ9wA2@');
    const [showPassword, setShowPassword] = useState(true);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="bg-[#151519] flex flex-col gap-[24px] items-start pb-[32px] pt-[24px] px-[24px] relative rounded-[16px] max-w-[500px] w-full border border-[#1e1d22]"
                >
                    {/* Back Arrow / Header */}
                    <div className="flex items-center w-full">
                        <button 
                            onClick={onBack || onClose}
                            className="bg-transparent text-[#3457DC] hover:text-[#4a6dec] transition-colors flex items-center justify-center rotate-90"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M19.061 7.854C18.9217 7.71461 18.7563 7.60403 18.5742 7.52859C18.3922 7.45315 18.1971 7.41432 18 7.41432C17.8029 7.41432 17.6078 7.45315 17.4258 7.52859C17.2437 7.60403 17.0783 7.71461 16.939 7.854L12.353 12.439C12.2592 12.5327 12.1321 12.5854 11.9995 12.5854C11.8669 12.5854 11.7398 12.5327 11.646 12.439L7.061 7.854C6.77974 7.5726 6.39821 7.41447 6.00035 7.41437C5.6025 7.41428 5.22089 7.57224 4.9395 7.8535C4.65811 8.13476 4.49997 8.51629 4.49987 8.91415C4.49978 9.312 4.65774 9.69361 4.939 9.975L9.525 14.561C9.85001 14.886 10.2359 15.1439 10.6605 15.3198C11.0852 15.4957 11.5403 15.5863 12 15.5863C12.4597 15.5863 12.9148 15.4957 13.3395 15.3198C13.7641 15.1439 14.15 14.886 14.475 14.561L19.061 9.975C19.3422 9.69371 19.5002 9.31225 19.5002 8.9145C19.5002 8.51675 19.3422 8.13529 19.061 7.854Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>

                    {/* Title and Description */}
                    <div className="flex flex-col gap-[16px] items-center w-full">
                        <h2 className="font-['Gilroy',sans-serif] font-bold text-[20px] text-center text-white w-full">Update Admin Password</h2>
                        <p className="font-['Poppins',sans-serif] text-[14px] text-[#a5a5b2] text-center w-full leading-[1.6]">
                            Set a new password. The old one will stop working, so share the new password securely.
                        </p>
                    </div>

                    {/* New Password Field */}
                    <div className="flex flex-col gap-[12px] items-start w-full">
                        <label className="font-['Poppins',sans-serif] text-[#80808a] text-[14px] w-full">New Password</label>
                        <div className="bg-[rgba(255,255,255,0.01)] h-[41px] relative rounded-[8px] w-full border border-[#2a2a30] px-[14px] flex items-center justify-between focus-within:border-[#3457DC] transition-colors">
                            <input 
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="bg-transparent border-none outline-none text-white text-[14px] font-['Poppins',sans-serif] w-full"
                            />
                            <div 
                                className="text-[#3457DC] cursor-pointer hover:text-[#4a6dec] transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <RiEyeLine size="20px" /> : <RiEyeOffLine size="20px" />}
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-[16px] w-full mt-2">
                        <button 
                            onClick={onClose}
                            className="flex-1 bg-[#1e1e24] hover:bg-[#2a2a30] text-white h-[50px] rounded-[16px] font-['Poppins',sans-serif] font-medium text-[14px] transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button className="flex-1 bg-[#3457dc] hover:bg-[#4a6dec] text-white h-[50px] rounded-[16px] font-['Poppins',sans-serif] font-medium text-[14px] transition-all active:scale-95">
                            Confirm & Update Password
                        </button>
                    </div>
                </motion.div>
                
                {/* Backdrop Click */}
                <div className="absolute inset-0 -z-10" onClick={onClose} />
            </div>
        </AnimatePresence>
    );
};

export default UpdatePasswordModal;
