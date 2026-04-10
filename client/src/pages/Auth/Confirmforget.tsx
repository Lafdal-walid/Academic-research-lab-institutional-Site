import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ColorBends from '../../components/ui/ColorBends';

// SVG Paths
const svgPaths = {
    p579aac0: "M18.71 8.21C18.617 8.11627 18.5064 8.04188 18.3846 7.99111C18.2627 7.94034 18.132 7.9142 18 7.9142C17.868 7.9142 17.7373 7.94034 17.6154 7.99111C17.4936 8.04188 17.383 8.11627 17.29 8.21L12.71 12.79C12.617 12.8837 12.5064 12.9581 12.3846 13.0089C12.2627 13.0597 12.132 13.0858 12 13.0858C11.868 13.0858 11.7373 13.0597 11.6154 13.0089C11.4936 12.9581 11.383 12.8837 11.29 12.79L6.71 8.21C6.61704 8.11627 6.50644 8.04188 6.38458 7.99111C6.26272 7.94034 6.13201 7.9142 6 7.9142C5.86799 7.9142 5.73728 7.94034 5.61542 7.99111C5.49356 8.04188 5.38296 8.11627 5.29 8.21C5.10375 8.39736 4.99921 8.65081 4.99921 8.915C4.99921 9.17919 5.10375 9.43264 5.29 9.62L9.88 14.21C10.4425 14.7718 11.205 15.0874 12 15.0874C12.795 15.0874 13.5575 14.7718 14.12 14.21L18.71 9.62C18.8963 9.43264 19.0008 9.17919 19.0008 8.915C19.0008 8.65081 18.8963 8.39736 18.71 8.21Z",
    p6d18500: "M19.3925 7.84917C18.6402 6.61727 17.6913 5.51688 16.5833 4.59167L18.9167 2.25833C19.0685 2.10116 19.1525 1.89066 19.1506 1.67217C19.1487 1.45367 19.061 1.24466 18.9065 1.09015C18.752 0.935644 18.543 0.848003 18.3245 0.846105C18.106 0.844206 17.8955 0.928201 17.7383 1.08L15.2008 3.62083C13.6278 2.68652 11.8295 2.19955 10 2.2125C4.84083 2.2125 1.90083 5.74417 0.6075 7.84917C0.20794 8.49542 -0.00370511 9.2402 -0.00370511 10C-0.00370511 10.7598 0.20794 11.5046 0.6075 12.1508C1.3598 13.3827 2.30874 14.4831 3.41667 15.4083L1.08333 17.7417C1.00374 17.8185 0.940256 17.9105 0.896582 18.0122C0.852908 18.1138 0.829919 18.2232 0.828958 18.3338C0.827996 18.4445 0.849081 18.5542 0.890982 18.6566C0.932882 18.759 0.99476 18.8521 1.073 18.9303C1.15125 19.0086 1.24429 19.0705 1.3467 19.1124C1.44912 19.1543 1.55885 19.1753 1.6695 19.1744C1.78015 19.1734 1.8895 19.1504 1.99117 19.1068C2.09284 19.0631 2.18479 18.9996 2.26167 18.92L4.805 16.3767C6.37606 17.3108 8.17223 17.7986 10 17.7875C15.1592 17.7875 18.0992 14.2558 19.3925 12.1508C19.7921 11.5046 20.0037 10.7598 20.0037 10C20.0037 9.2402 19.7921 8.49542 19.3925 7.84917ZM2.0275 11.2783C1.79011 10.8942 1.66438 10.4516 1.66438 10C1.66438 9.54844 1.79011 9.1058 2.0275 8.72167C3.13917 6.91667 5.65167 3.87917 10 3.87917C11.3836 3.87142 12.7477 4.20486 13.9717 4.85L12.2942 6.5275C11.4941 5.99633 10.5349 5.75833 9.57936 5.85387C8.6238 5.94941 7.73072 6.37261 7.05167 7.05167C6.37261 7.73072 5.94941 8.6238 5.85387 9.57936C5.75833 10.5349 5.99633 11.4941 6.5275 12.2942L4.6025 14.2192C3.58175 13.3939 2.7107 12.3991 2.0275 11.2783ZM12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.62876 12.4986 9.26266 12.4131 8.92917 12.25L12.25 8.92917C12.4131 9.26266 12.4986 9.62876 12.5 10ZM7.5 10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5C10.3712 7.50144 10.7373 7.58691 11.0708 7.75L7.75 11.0708C7.58691 10.7373 7.50144 10.3712 7.5 10ZM17.9725 11.2783C16.8608 13.0833 14.3483 16.1208 10 16.1208C8.61644 16.1286 7.2523 15.7951 6.02833 15.15L7.70583 13.4725C8.50589 14.0037 9.46508 14.2417 10.4206 14.1461C11.3762 14.0506 12.2693 13.6274 12.9483 12.9483C13.6274 12.2693 14.0506 11.3762 14.1461 10.4206C14.2417 9.46508 14.0037 8.50589 13.4725 7.70583L15.3975 5.78083C16.4182 6.60607 17.2893 7.60087 17.9725 8.72167C18.2099 9.1058 18.3356 9.54844 18.3356 10C18.3356 10.4516 18.2099 10.8942 17.9725 11.2783Z",
};

// Sub-components
function AngleSmallDown() {
    return (
        <div className="relative size-[24px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g id="angle-small-down (3) 9">
                    <path d={svgPaths.p579aac0} fill="var(--fill-0, #3457DC)" id="Vector" />
                </g>
            </svg>
        </div>
    );
}

function Exclamation() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_79_18532)">
                <path d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9977 5.87897 15.1541 3.84547 13.6543 2.34568C12.1545 0.845886 10.121 0.00229405 8 0ZM8 14.6667C6.68146 14.6667 5.39253 14.2757 4.2962 13.5431C3.19987 12.8106 2.34539 11.7694 1.84081 10.5512C1.33622 9.33305 1.2042 7.99261 1.46144 6.6994C1.71867 5.40619 2.35361 4.21831 3.28596 3.28596C4.21831 2.35361 5.4062 1.71867 6.6994 1.46143C7.99261 1.2042 9.33305 1.33622 10.5512 1.8408C11.7694 2.34539 12.8106 3.19987 13.5431 4.2962C14.2757 5.39253 14.6667 6.68146 14.6667 8C14.6647 9.76752 13.9617 11.4621 12.7119 12.7119C11.4621 13.9617 9.76752 14.6647 8 14.6667Z" fill="#C5432D" />
                <path d="M7.99967 3.33325C7.82286 3.33325 7.65329 3.40349 7.52827 3.52851C7.40325 3.65354 7.33301 3.82311 7.33301 3.99992V9.33325C7.33301 9.51006 7.40325 9.67963 7.52827 9.80466C7.65329 9.92968 7.82286 9.99992 7.99967 9.99992C8.17649 9.99992 8.34605 9.92968 8.47108 9.80466C8.5961 9.67963 8.66634 9.51006 8.66634 9.33325V3.99992C8.66634 3.82311 8.5961 3.65354 8.47108 3.52851C8.34605 3.40349 8.17649 3.33325 7.99967 3.33325Z" fill="#C5432D" />
                <path d="M8.66634 11.9999C8.66634 11.6317 8.36786 11.3333 7.99967 11.3333C7.63148 11.3333 7.33301 11.6317 7.33301 11.9999C7.33301 12.3681 7.63148 12.6666 7.99967 12.6666C8.36786 12.6666 8.66634 12.3681 8.66634 11.9999Z" fill="#C5432D" />
            </g>
            <defs>
                <clipPath id="clip0_79_18532">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

const Confirmforget: React.FC = () => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({
        newPassword: '',
        confirmPassword: '',
        general: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        document.title = "Reset Password | Research Lab";
    }, []);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { newPassword: '', confirmPassword: '', general: '' };

        if (!newPassword.trim()) {
            newErrors.newPassword = 'New password is required';
            isValid = false;
        } else if (newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
            isValid = false;
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === 'newPassword') setNewPassword(value);
        if (id === 'confirmPassword') setConfirmPassword(value);
        setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => navigate('/login'), 3200);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0B0A0C] relative overflow-hidden font-poppins text-white">
            <div className="absolute inset-0 z-0">
                <ColorBends colors={["#3457dc"]} rotation={0} speed={0.2} scale={1.7} frequency={1} warpStrength={1} transparent />
            </div>


            <div className={`w-full ${isSuccess ? 'max-w-[400px]' : 'max-w-[543px]'} z-10 relative flex flex-col items-center transition-all duration-500`}>
                <div className={`bg-[#151519] border border-white/5 px-8 pt-5 pb-10 rounded-[16px] shadow-2xl backdrop-blur-md w-full ${isSuccess ? 'min-h-[300px]' : 'min-h-[400px]'} flex flex-col justify-center transition-all duration-500 relative overflow-visible scale-in`}>
                    {!isSuccess ? (
                        <div className="flex flex-col gap-[28px] animate-fade-in w-full">
                            <div onClick={() => navigate('/login')} className="content-stretch flex items-center gap-[12px] relative shrink-0 w-full cursor-pointer group">
                                <div className="flex items-center justify-center relative shrink-0 size-[24px]">
                                    <div className="flex-none rotate-90 transition-transform group-hover:-translate-x-1">
                                        <AngleSmallDown />
                                    </div>
                                </div>
                                <p className="font-poppins font-medium leading-[normal] text-accent text-[14px]">Back to Login</p>
                            </div>

                            <div className="text-center">
                                <h1 className="font-gilroy font-extrabold text-[22px] tracking-tight">Create New Password</h1>
                                <p className="text-[#a5a5b2] text-[13.5px] mt-2 font-poppins px-4">Set a strong password to protect your account.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
                                <div className="flex flex-col gap-[10px]">
                                    <p className="text-[#80808a] text-[12.5px]">New Password</p>
                                    <div className={`bg-white/[0.01] flex items-center w-full min-h-[40px] rounded-[8px] border ${errors.newPassword ? 'border-warning' : 'border-[#2a2a30]'} px-3 transition-colors focus-within:border-accent`}>
                                        <input
                                            id="newPassword"
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={newPassword}
                                            onChange={handleInputChange}
                                            className="bg-transparent border-none outline-none w-full text-white text-[12.5px] caret-transparent"
                                        />
                                        <div onClick={() => setShowNewPassword(!showNewPassword)} className="cursor-pointer text-accent hover:text-white transition-colors">
                                            <div className="size-[18px]">
                                                <svg fill="none" viewBox="0 0 20 20" className="size-full">
                                                    <path d={svgPaths.p6d18500} fill="currentColor" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.newPassword && (
                                        <div className="flex items-center gap-1.5 mt-1 text-warning">
                                            <Exclamation />
                                            <p className="text-[11px] font-medium">{errors.newPassword}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-[10px]">
                                    <p className="text-[#80808a] text-[12.5px]">Confirm Password</p>
                                    <div className={`bg-white/[0.01] flex items-center w-full min-h-[40px] rounded-[8px] border ${errors.confirmPassword ? 'border-warning' : 'border-[#2a2a30]'} px-3 transition-colors focus-within:border-accent`}>
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={handleInputChange}
                                            className="bg-transparent border-none outline-none w-full text-white text-[12.5px] caret-transparent"
                                        />
                                        <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer text-accent hover:text-white transition-colors">
                                            <div className="size-[18px]">
                                                <svg fill="none" viewBox="0 0 20 20" className="size-full">
                                                    <path d={svgPaths.p6d18500} fill="currentColor" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.confirmPassword && (
                                        <div className="flex items-center gap-1.5 mt-1 text-warning">
                                            <Exclamation />
                                            <p className="text-[11px] font-medium">{errors.confirmPassword}</p>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-accent hover:bg-accent/90 rounded-[12px] py-[14px] transition-all active:scale-[0.98] disabled:opacity-50 mt-4 font-poppins font-medium"
                                >
                                    <span className="text-[12.5px] font-medium text-white">
                                        {isSubmitting ? "Resetting..." : "Reset Password"}
                                    </span>
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-[40px] animate-scale-in py-[40px] text-center w-full">
                            <div className="bg-[#1e1e24] p-[16px] rounded-[400px]">
                                <div className="size-[48px] bg-accent/20 rounded-full flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h1 className="font-gilroy font-extrabold text-[22px]">Password Updated!</h1>
                                <p className="text-[#a5a5b2] text-[13.5px] mt-2 font-poppins">Your password has been successfully reset.</p>
                            </div>
                            <div className="size-[24px]">
                                <svg className="animate-spin size-full" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#3457DC" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="#3457DC" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Confirmforget;
