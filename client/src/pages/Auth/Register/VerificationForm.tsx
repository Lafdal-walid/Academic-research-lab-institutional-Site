import React from 'react';
import { AngleSmallDown } from './Icons';

interface VerificationFormProps {
    title: string;
    description: React.ReactNode;
    otp: string[];
    onOtpChange: (index: number, value: string) => void;
    onOtpKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onBack: () => void;
    onResend: () => void;
    isSubmitting: boolean;
    buttonText: string;
}

const VerificationForm: React.FC<VerificationFormProps> = ({
    title, description, otp, onOtpChange, onOtpKeyDown, onSubmit, onBack, onResend, isSubmitting, buttonText
}) => {
    return (
        <div className="animate-fade-in flex flex-col gap-[32px] w-full">
            {/* Back Button */}
            <div onClick={onBack} className="content-stretch flex items-center gap-[12px] relative shrink-0 w-full cursor-pointer group">
                <div className="flex items-center justify-center relative shrink-0 size-[24px]">
                    <div className="flex-none rotate-90 transition-transform group-hover:-translate-x-1">
                        <AngleSmallDown />
                    </div>
                </div>
                <p className="font-poppins font-medium leading-[normal] not-italic relative shrink-0 text-accent text-[14px]">Back</p>
            </div>

            {/* Header Text */}
            <div className="content-stretch flex flex-col gap-[6px] items-center leading-[normal] not-italic relative shrink-0 text-center w-full">
                <h1 className="font-gilroy font-extrabold relative shrink-0 text-[20px] text-white w-full tracking-tight">{title}</h1>
                <p className="font-poppins font-regular relative shrink-0 text-[#a5a5b2] text-[14px] w-full px-4">{description}</p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-[32px] font-poppins">
                {/* OTP Inputs */}
                <div className="flex justify-center gap-[20px] h-[163px]">
                    {otp.map((digit, index) => (
                        <div key={index} className="bg-white/[0.01] flex-[1_0_0] h-full relative rounded-[12px] transition-all focus-within:bg-accent/5">
                            <div className={`absolute border ${digit ? 'border-accent' : 'border-[#2a2a30]'} border-solid inset-0 pointer-events-none rounded-[12px] transition-colors`} />
                            <input
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => onOtpChange(index, e.target.value)}
                                onKeyDown={(e) => onOtpKeyDown(index, e)}
                                className="bg-transparent border-none outline-none size-full text-center text-[72px] font-bold text-white transition-all p-0 selection:bg-accent/30 caret-transparent"
                                autoFocus={index === 0}
                            />
                        </div>
                    ))}
                </div>

                {/* Verify Button */}
                <div className="flex flex-col gap-[16px] items-center pb-[12px]">
                    <button
                        type="submit"
                        disabled={isSubmitting || otp.some(d => !d)}
                        className="bg-accent hover:bg-accent/90 text-white rounded-[12px] py-[14px] shrink-0 w-full text-[14px] font-medium transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {isSubmitting ? "Verifying..." : buttonText}
                    </button>
                    <p className="font-regular text-[14px] whitespace-nowrap">
                        <span className="text-white">{`Didn't receive it? `}</span>
                        <button 
                            type="button" 
                            onClick={onResend} 
                            className="text-accent font-medium hover:text-white transition-colors underline decoration-accent/30 underline-offset-4"
                        >
                            Resend code
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default VerificationForm;
