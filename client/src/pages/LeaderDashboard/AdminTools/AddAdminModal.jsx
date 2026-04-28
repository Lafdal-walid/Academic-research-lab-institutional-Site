import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine, RiSearch2Line, RiArrowDownSLine, RiUserAddLine } from 'react-icons/ri';
import API_BASE_URL from '@/config';

const AddAdminModal = ({ isOpen, onClose, onAdd }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [role, setRole] = useState('Select a role');
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            fetchUsers();
        } else {
            // Reset state on close
            setSelectedUser(null);
            setSearchTerm('');
            setRole('Select a role');
        }
    }, [isOpen]);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/auth/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                // Filter out existing admins
                setUsers(data.filter(u => u.role === 'guest' || u.role === 'user'));
            }
        } catch (err) { console.error(err); }
        finally { setIsLoading(false); }
    };

    const handlePromote = async () => {
        if (!selectedUser || role === 'Select a role') return;
        
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/auth/admin/users/${selectedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role })
            });
            
            if (res.ok) {
                onAdd && onAdd();
                onClose();
            } else {
                const data = await res.json();
                alert(data.message || 'Promotion failed');
            }
        } catch (err) {
            alert('Connection failed');
        }
    };

    const filteredUsers = users.filter(u => 
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isOpen) return null;

    const isFormValid = selectedUser && role !== 'Select a role';

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
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
                        <h2 className="font-['Gilroy',sans-serif] font-bold text-white text-[16px]">Create a New Team Leader Account</h2>
                        <button onClick={onClose} className="ml-auto text-[#80808a] hover:text-white transition-colors">
                            <RiCloseLine size="24px" />
                        </button>
                    </div>

                    {/* Description */}
                    <p className="font-['Poppins',sans-serif] text-[14px] text-[#a5a5b2] w-full leading-[1.6]">
                         Add a new Leader by promoting an existing member.
                    </p>

                    {/* Form Fields */}
                    <div className="flex flex-col gap-[20px] items-start w-full" ref={dropdownRef}>
                        {/* Search/Select User */}
                        <div className="flex flex-col gap-[12px] w-full relative">
                            <label className="font-['Poppins',sans-serif] text-[#80808a] text-[14px]">Search Member</label>
                            <div 
                                className={`bg-[rgba(255,255,255,0.01)] h-[41px] relative rounded-[8px] w-full border ${isUserDropdownOpen ? 'border-[#3457DC]' : 'border-[#2a2a30]'} px-[14px] flex items-center justify-between cursor-pointer transition-colors`}
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                            >
                                <span className={`${!selectedUser ? 'text-[#a5a5b2]' : 'text-white'} text-[14px] font-['Poppins',sans-serif]`}>
                                    {selectedUser ? selectedUser.username : 'Search /'}
                                </span>
                                <RiArrowDownSLine className={`text-[#3457DC] transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} size="20px" />
                            </div>
                            
                            <AnimatePresence>
                                {isUserDropdownOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-[100%] left-0 right-0 mt-2 bg-[#1e1e24] border border-[#2a2a30] rounded-[8px] overflow-hidden z-[110] shadow-2xl flex flex-col"
                                    >
                                        <div className="p-3 border-b border-[#2a2a30] flex items-center gap-2">
                                            <RiSearch2Line className="text-[#3457DC]" />
                                            <input 
                                                autoFocus
                                                type="text"
                                                placeholder="Type to search..."
                                                className="bg-transparent border-none outline-none text-white text-[14px] w-full"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                        <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                                            {isLoading ? (
                                                <div className="p-4 text-center text-[#a5a5b2] text-[13px]">Loading...</div>
                                            ) : filteredUsers.length === 0 ? (
                                                <div className="p-4 text-center text-[#a5a5b2] text-[13px]">No members found</div>
                                            ) : (
                                                filteredUsers.map((u) => (
                                                    <div 
                                                        key={u._id}
                                                        className="px-[14px] py-[10px] hover:bg-[#3457DC] cursor-pointer transition-colors flex flex-col gap-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedUser(u);
                                                            setIsUserDropdownOpen(false);
                                                        }}
                                                    >
                                                        <span className="text-white text-[14px]">{u.username}</span>
                                                        <span className="text-[#a5a5b2] text-[12px]">{u.email}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Admin Email (Readonly Display) */}
                        <div className="flex flex-col gap-[12px] w-full opacity-60">
                            <label className="font-['Poppins',sans-serif] text-[#80808a] text-[14px]">Admin Email</label>
                            <div className="bg-[rgba(255,255,255,0.01)] h-[41px] relative rounded-[8px] w-full border border-[#2a2a30] px-[14px] flex items-center">
                                <input 
                                    type="text" 
                                    readOnly 
                                    value={selectedUser?.email || ''} 
                                    placeholder="e.g walid@email.com"
                                    className="bg-transparent border-none outline-none text-white w-full text-[14px] font-['Poppins',sans-serif] placeholder:text-[#a5a5b2]"
                                />
                            </div>
                        </div>

                        {/* Full Name (Readonly Display) */}
                        <div className="flex flex-col gap-[12px] w-full opacity-60">
                            <label className="font-['Poppins',sans-serif] text-[#80808a] text-[14px]">Full Name</label>
                            <div className="bg-[rgba(255,255,255,0.01)] h-[41px] relative rounded-[8px] w-full border border-[#2a2a30] px-[14px] flex items-center">
                                <input 
                                    type="text" 
                                    readOnly 
                                    value={selectedUser?.username || ''} 
                                    placeholder="e.g walid barka"
                                    className="bg-transparent border-none outline-none text-white w-full text-[14px] font-['Poppins',sans-serif] placeholder:text-[#a5a5b2]"
                                />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="flex flex-col gap-[12px] w-full relative">
                            <label className="font-['Poppins',sans-serif] text-[#80808a] text-[14px]">Role</label>
                            <div 
                                className={`bg-[rgba(255,255,255,0.01)] h-[41px] relative rounded-[8px] w-full border ${isRoleDropdownOpen ? 'border-[#3457DC]' : 'border-[#2a2a30]'} px-[14px] flex items-center justify-between cursor-pointer transition-colors`}
                                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                            >
                                <span className={`${role === 'Select a role' ? 'text-[#a5a5b2]' : 'text-white'} text-[14px] font-['Poppins',sans-serif] capitalize`}>{role}</span>
                                <RiArrowDownSLine className={`text-[#3457DC] transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`} size="20px" />
                            </div>
                            <AnimatePresence>
                                {isRoleDropdownOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-[100%] left-0 right-0 mt-2 bg-[#1e1e24] border border-[#2a2a30] rounded-[8px] overflow-hidden z-[110] shadow-2xl"
                                    >
                                        {['admin', 'superadmin'].map((opt) => (
                                            <div 
                                                key={opt}
                                                className="px-[14px] py-[10px] text-white text-[14px] font-['Poppins',sans-serif] hover:bg-[#3457DC] cursor-pointer transition-colors capitalize"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setRole(opt);
                                                    setIsRoleDropdownOpen(false);
                                                }}
                                            >
                                                {opt}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Note */}
                        <div className="flex gap-[8px] items-start w-full opacity-70 mt-2">
                            <div className="text-[#A5A5B2] mt-[2px]">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 10.6667V8" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 5.33333H8.00667" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <p className="font-['Poppins',sans-serif] text-[#a5a5b2] text-[12px] flex-1">
                                Promoting a user will give them access to administrative tools immediately. They will use their existing password to log in.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-[16px] w-full mt-[10px]">
                            <button 
                                onClick={onClose}
                                className="flex-1 bg-[#1e1e24] hover:bg-[#2a2a30] text-white h-[50px] rounded-[16px] font-['Poppins',sans-serif] font-medium text-[14px] transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handlePromote}
                                className={`flex-1 ${isFormValid ? 'bg-[#3457DC] text-white hover:bg-[#4a6dec]' : 'bg-[#1e1e24] text-[#373735] cursor-not-allowed'} h-[50px] rounded-[16px] font-['Poppins',sans-serif] font-medium text-[14px] transition-all`}
                                disabled={!isFormValid}
                            >
                                Create admin
                            </button>
                        </div>
                    </div>
                </motion.div>
                
                {/* Backdrop Click */}
                <div className="absolute inset-0 -z-10" onClick={onClose} />
            </div>
        </AnimatePresence>
    );
};

export default AddAdminModal;
