import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AngleSmallDown, EyeIcon, Exclamation } from './Icons';

interface MainFormProps {
    formData: any;
    errors: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
}

const MainForm: React.FC<MainFormProps> = ({ formData, errors, handleInputChange, onSubmit, isSubmitting }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="animate-fade-in flex flex-col gap-[28px]">
            {/* Back Button */}
            <div onClick={() => navigate(-1)} className="content-stretch flex flex-col items-start relative shrink-0 w-full cursor-pointer group">
                <div className="content-stretch flex gap-1.5 items-center relative shrink-0 w-full hover:brightness-125 transition-all">
                    <div className="flex items-center justify-center relative shrink-0 size-[24px]">
                        <div className="flex-none rotate-90 transition-transform group-hover:-translate-x-1">
                            <AngleSmallDown />
                        </div>
                    </div>
                    <p className="font-medium leading-[normal] not-italic relative shrink-0 text-accent text-[14px] font-poppins">Back</p>
                </div>
            </div>

            {/* Welcome Text */}
            <div className="content-stretch flex flex-col gap-[6px] items-center leading-[normal] not-italic relative shrink-0 text-center w-full">
                <h1 className="font-gilroy font-extrabold relative shrink-0 text-[22px] text-white w-full tracking-tight">Create your Account</h1>
                <p className="font-regular relative shrink-0 text-[#a5a5b2] text-[13.5px] w-full font-poppins px-4">Create your account to stay updated and manage your experience in one place.</p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-[18px]">
                {/* Username Input */}
                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                    <p className="font-regular leading-[normal] not-italic relative shrink-0 text-[#80808a] text-[12.5px] w-full">Username</p>
                    <div className={`bg-white/[0.01] flex flex-row items-center w-full min-h-[40px] relative rounded-[8px] border ${errors.username ? 'border-warning' : 'border-[#2a2a30]'} transition-colors focus-within:border-accent`}>
                        <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full">
                            <input
                                id="username"
                                type="text"
                                placeholder="johndoe"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="bg-transparent border-none outline-none w-full text-white placeholder:text-[#a5a5b2] text-[12.5px]"
                            />
                        </div>
                    </div>
                    {errors.username && (
                        <div className="flex items-center gap-1.5 mt-1 text-warning">
                            <Exclamation />
                            <p className="text-[11px] font-medium">{errors.username}</p>
                        </div>
                    )}
                </div>

                {/* Email Address */}
                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                    <p className="font-regular leading-[normal] not-italic relative shrink-0 text-[#80808a] text-[12.5px] w-full">Email Address</p>
                    <div className={`bg-white/[0.01] flex flex-row items-center w-full min-h-[40px] relative rounded-[8px] border ${errors.email ? 'border-warning' : 'border-[#2a2a30]'} transition-colors focus-within:border-accent`}>
                        <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full">
                            <input
                                id="email"
                                type="email"
                                placeholder="name@institute.edu"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="bg-transparent border-none outline-none w-full text-white placeholder:text-[#a5a5b2] text-[12.5px]"
                            />
                        </div>
                    </div>
                    {errors.email && (
                        <div className="flex items-center gap-1.5 mt-1 text-warning">
                            <Exclamation />
                            <p className="text-[11px] font-medium">{errors.email}</p>
                        </div>
                    )}
                </div>

                {/* Password Input */}
                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                    <p className="font-regular leading-[normal] not-italic relative shrink-0 text-[#80808a] text-[12.5px] w-full">Password</p>
                    <div className={`bg-white/[0.01] flex flex-row items-center w-full min-h-[40px] relative rounded-[8px] border ${errors.password ? 'border-warning' : 'border-[#2a2a30]'} transition-colors focus-within:border-accent`}>
                        <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="bg-transparent border-none outline-none w-full text-white placeholder:text-[#a5a5b2] text-[12.5px]"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="cursor-pointer text-accent hover:text-white transition-colors">
                                <EyeIcon crossed={!showPassword} />
                            </button>
                        </div>
                    </div>
                    {errors.password && (
                        <div className="flex items-center gap-1.5 mt-2 text-warning">
                            <Exclamation />
                            <p className="text-[11px] font-medium">{errors.password}</p>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-accent hover:bg-accent/90 relative rounded-[12px] shrink-0 w-full py-[14px] transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
                >
                    <p className="font-medium text-[12.5px] text-white">
                        {isSubmitting ? "Creating account..." : "Create Account"}
                    </p>
                </button>

                {/* Divider */}
                <div className="content-stretch flex gap-[18px] items-center relative shrink-0 w-full my-1 text-center font-poppins">
                    <div className="flex-[1_0_0] h-px bg-[#2A2A30] relative" />
                    <p className="font-regular leading-[normal] not-italic relative shrink-0 text-[#a5a5b2] text-[14.5px] whitespace-nowrap">Or</p>
                    <div className="flex-[1_0_0] h-px bg-[#2A2A30] relative" />
                </div>

                {/* Google Button */}
                <button type="button" className="relative rounded-[16px] shrink-0 w-full border border-[#2a2a30] hover:bg-white/5 transition-all">
                    <div className="content-stretch flex gap-[10px] items-center justify-center px-[14px] py-[14px] relative w-full">
                        <div className="relative shrink-0 size-[18px]">
                            <svg viewBox="0 0 24 24" className="absolute inset-0 size-full">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </div>
                        <p className="font-medium text-[12.5px] text-white whitespace-nowrap">Continue With google</p>
                    </div>
                </button>

                {/* Login Link */}
                <div className="content-stretch flex items-center justify-center py-2 relative shrink-0 w-full">
                    <p className="flex-[1_0_0] font-regular text-[12.5px] text-center text-white font-poppins">
                        <span>Already have an account? </span>
                        <Link to="/login" className="font-medium text-accent underline">Log in</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default MainForm;
