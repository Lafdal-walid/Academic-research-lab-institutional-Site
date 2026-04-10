import React, { useState } from 'react';
import { AngleSmallDown, EyeIcon } from './Icons';

interface ResetPasswordFormProps {
    onBack: () => void;
    onSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
    newPassword: string;
    setNewPassword: (p: string) => void;
    confirmPassword: string;
    setConfirmPassword: (p: string) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
    onBack, onSubmit, isSubmitting, 
    newPassword, setNewPassword, 
    confirmPassword, setConfirmPassword
}) => {
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    return (
        <div className="flex flex-col gap-[28px] animate-fade-in w-full">
            {/* Back Button */}
            <div onClick={onBack} className="content-stretch flex items-center gap-[12px] relative shrink-0 w-full cursor-pointer group">
                <div className="flex items-center justify-center relative shrink-0 size-[24px]">
                    <div className="flex-none rotate-90 transition-transform group-hover:-translate-x-1">
                        <AngleSmallDown />
                    </div>
                </div>
                <p className="font-poppins font-medium leading-[normal] text-accent text-[14px]">Back</p>
            </div>

            <div className="text-center">
                <h1 className="font-gilroy font-extrabold text-[22px] tracking-tight">Create a new password</h1>
                <p className="text-[#a5a5b2] text-[13.5px] mt-2 font-poppins px-4">Choose a strong password to secure your account.</p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-[18px]">
                <div className="flex flex-col gap-[10px]">
                    <p className="text-[#80808a] text-[12.5px]">New Password</p>
                    <div className="bg-white/[0.01] flex items-center w-full min-h-[40px] rounded-[8px] border border-[#2a2a30] px-3 transition-colors focus-within:border-accent">
                        <input
                            type={showNewPass ? "text" : "password"}
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-white text-[12.5px]"
                        />
                        <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="text-accent hover:text-white transition-colors">
                            <EyeIcon crossed={!showNewPass} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-[10px]">
                    <p className="text-[#80808a] text-[12.5px]">Confirm New Password</p>
                    <div className="bg-white/[0.01] flex items-center w-full min-h-[40px] rounded-[8px] border border-[#2a2a30] px-3 transition-colors focus-within:border-accent">
                        <input
                            type={showConfirmPass ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-white text-[12.5px]"
                        />
                        <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="text-accent hover:text-white transition-colors">
                            <EyeIcon crossed={!showConfirmPass} />
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-accent hover:bg-accent/90 rounded-[12px] py-[14px] transition-all active:scale-[0.98] mt-4 font-poppins font-medium text-white text-[12.5px]"
                >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
