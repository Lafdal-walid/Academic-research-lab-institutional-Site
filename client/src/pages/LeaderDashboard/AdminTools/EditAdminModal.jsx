import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine, RiInformationLine, RiEyeLine, RiEyeOffLine, RiArrowDownSLine } from 'react-icons/ri';
import UpdatePasswordModal from './UpdatePasswordModal';

const EditAdminModal = ({ isOpen, onClose, adminData }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('user');
    const [showPassword, setShowPassword] = useState(false);
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    useEffect(() => {
        if (adminData) {
            setName(adminData.name || '');
            setRole(adminData.role || 'user');
        } else {
            setName('');
            setRole('user');
        }
    }, [adminData, isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#151519] flex flex-col gap-[24px] items-start pb-[32px] pt-[24px] px-[24px] relative rounded-[16px] max-w-[500px] w-full border border-[#1e1d22]"
                >
                    {/* Header */}
                    <div className="flex items-center gap-[12px] w-full">
                        <div className="flex-none rotate-90 text-[#3457DC]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M19.061 7.854C18.9217 7.71461 18.7563 7.60403 18.5742 7.52859C18.3922 7.45315 18.1971 7.41432 18 7.41432C17.8029 7.41432 17.6078 7.45315 17.4258 7.52859C17.2437 7.60403 17.0783 7.71461 16.939 7.854L12.353 12.439C12.2592 12.5327 12.1321 12.5854 11.9995 12.5854C11.8669 12.5854 11.7398 12.5327 11.646 12.439L7.061 7.854C6.77974 7.5726 6.39821 7.41447 6.00035 7.41437C5.6025 7.41428 5.22089 7.57224 4.9395 7.8535C4.65811 8.13476 4.49997 8.51629 4.49987 8.91415C4.49978 9.312 4.65774 9.69361 4.939 9.975L9.525 14.561C9.85001 14.886 10.2359 15.1439 10.6605 15.3198C11.0852 15.4957 11.5403 15.5863 12 15.5863C12.4597 15.5863 12.9148 15.4957 13.3395 15.3198C13.7641 15.1439 14.15 14.886 14.475 14.561L19.061 9.975C19.3422 9.69371 19.5002 9.31225 19.5002 8.9145C19.5002 8.51675 19.3422 8.13529 19.061 7.854Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h2 className="font-['Gilroy',sans-serif] font-bold text-white text-[16px]">Edit Team Leader informations</h2>
                        <button onClick={onClose} className="ml-auto text-[#80808a] hover:text-white transition-colors">
                            <RiCloseLine size="24px" />
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="flex flex-col gap-[20px] items-start w-full">
                        {/* Email Address */}
                        <div className="flex flex-col gap-[12px] w-full">
                            <label className="font-['Poppins',sans-serif] text-[#80808a] text-[14px]">Email Address</label>
                            <div className="bg-[#1e1e24] h-[41px] relative rounded-[8px] w-full border border-[#2a2a30] flex items-center px-[14px]">
                                <span className="font-['Poppins',sans-serif] text-[14px] text-white whitespace-nowrap">{adminData?.email || 'moes@email.com'}</span>
                            </div>
                            <div className="flex gap-[8px] items-center">
                                <div className="text-[#A5A5B2]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 10.6667V8" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 5.33333H8.00667" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <p className="font-['Poppins',sans-serif] text-[#a5a5b2] text-[14px] whitespace-nowrap">Email can't be changed. Remove and re-invite to update.</p>
                            </div>
                        </div>

                        {/* Full name */}
                        <div className="flex flex-col gap-[12px] w-full">
                            <label className="font-['Poppins',sans-serif] text-[#80808a] text-[14px]">Full name</label>
                            <div className="bg-[rgba(255,255,255,0.01)] h-[41px] relative rounded-[8px] w-full border border-[#2a2a30] px-[14px] flex items-center focus-within:border-[#3457DC] transition-colors">
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-transparent border-none outline-none text-white w-full text-[14px] font-['Poppins',sans-serif]"
                                    placeholder="Enter full name"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-[12px] w-full">
                            <label className="font-['Poppins',sans-serif] text-[#80808a] text-[14px]">Password</label>
                            <div className="bg-[rgba(255,255,255,0.01)] h-[41px] relative rounded-[8px] w-full border border-[#2a2a30] px-[14px] flex items-center justify-between focus-within:border-[#3457DC] transition-colors">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    value="password123" // Placeholder logic
                                    readOnly
                                    className="bg-transparent border-none outline-none text-white text-[14px] font-['Poppins',sans-serif] w-full"
                                />
                                <div 
                                    className="text-[#3457DC] cursor-pointer hover:text-[#4a6dec] transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <RiEyeOffLine size="20px" />
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M2.5 10C2.5 10 5.83333 4.16666 10 4.16666C14.1667 4.16666 17.5 10 17.5 10C17.5 10 14.1667 15.8333 10 15.8333C5.83333 15.8333 2.5 10 2.5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <button 
                                className="text-[#3457dc] text-[14px] font-medium text-left font-['Poppins',sans-serif] hover:underline"
                                onClick={() => setIsPasswordModalOpen(true)}
                            >
                                Update Password ?
                            </button>
                        </div>

                        {/* Role */}
                        <div className="flex flex-col gap-[12px] w-full relative">
                            <label className="font-['Poppins',sans-serif] text-[#80808a] text-[14px]">Role</label>
                            <div 
                                className={`bg-[rgba(255,255,255,0.01)] h-[41px] relative rounded-[8px] w-full border ${isRoleDropdownOpen ? 'border-[#3457DC]' : 'border-[#2a2a30]'} px-[14px] flex items-center justify-between cursor-pointer transition-colors`}
                                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                            >
                                <span className="text-white text-[14px] font-['Poppins',sans-serif] text-capitalize">{role}</span>
                                <div className={`text-[#3457DC] transition-transform duration-300 ${isRoleDropdownOpen ? 'rotate-180' : ''}`}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isRoleDropdownOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-[100%] left-0 right-0 mt-2 bg-[#1e1e24] border border-[#2a2a30] rounded-[8px] overflow-hidden z-[110] shadow-2xl"
                                    >
                                        {['guest', 'user', 'admin', 'superadmin'].map((option) => (
                                            <div 
                                                key={option}
                                                className="px-[14px] py-[10px] text-white text-[14px] font-['Poppins',sans-serif] hover:bg-[#3457DC] cursor-pointer transition-colors text-capitalize"
                                                onClick={() => {
                                                    setRole(option);
                                                    setIsRoleDropdownOpen(false);
                                                }}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-[16px] w-full mt-[10px]">
                            <button 
                                onClick={onClose}
                                className="flex-1 bg-[#1e1e24] hover:bg-[#2a2a30] text-white h-[50px] rounded-[16px] font-['Poppins',sans-serif] font-medium text-[14px] transition-all"
                            >
                                Cancel
                            </button>
                            <button className="flex-1 bg-[#3457DC] hover:bg-[#4a6dec] text-white h-[50px] rounded-[16px] font-['Poppins',sans-serif] font-medium text-[14px] transition-all">
                                Save changes
                            </button>
                        </div>
                    </div>
                </motion.div>
                
                {/* Backdrop Click */}
                <div className="absolute inset-0 -z-10" onClick={onClose} />
                
                {/* Update Password Modal overlay */}
                <UpdatePasswordModal 
                    isOpen={isPasswordModalOpen}
                    onClose={() => {
                        setIsPasswordModalOpen(false);
                        onClose(); // Optional: close everything, or just the password modal
                    }}
                    onBack={() => setIsPasswordModalOpen(false)}
                />
            </div>
        </AnimatePresence>
    );
};

// Internal RiEditLine fallback since it might not be imported globally correctly in all environments
const RiEditLine = ({ className, size }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.112 2.112 0 00-.58 1.082L11 13l2.648-.53a2.112 2.112 0 001.082-.58l5.728-5.727a2.121 2.121 0 10-3-3zM19 19H5a2 2 0 01-2-2V5a2 2 0 012-2h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default EditAdminModal;
