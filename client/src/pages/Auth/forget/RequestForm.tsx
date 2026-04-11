import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AngleSmallDown, CheckIcon, ExclamationIcon } from './Icons';

interface RequestFormProps {
    email: string;
    setEmail: (email: string) => void;
    error: string;
    isSubmitting: boolean;
    isLinkSent: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ 
    email, setEmail, error, isSubmitting, isLinkSent, onSubmit 
}) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-[28px] animate-fade-in w-full">
            {/* Back Button */}
            <div onClick={() => navigate('/login')} className="content-stretch flex items-center gap-[12px] relative shrink-0 w-full cursor-pointer group">
                <div className="flex items-center justify-center relative shrink-0 size-[24px]">
                    <div className="flex-none rotate-90 transition-transform group-hover:-translate-x-1">
                        <AngleSmallDown />
                    </div>
                </div>
                <p className="font-poppins font-medium leading-[normal] text-accent text-[14px]">Back</p>
            </div>

            <div className="text-center">
                <h1 className="font-gilroy font-extrabold text-[22px] tracking-tight">Reset your password</h1>
                <p className="text-[#a5a5b2] text-[13.5px] mt-2 font-poppins px-4">Enter your email and we'll send you instructions to reset your password.</p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[10px]">
                    <p className="text-[#80808a] text-[12.5px]">Your Email</p>
                    <div className={`bg-white/[0.01] flex items-center w-full min-h-[40px] rounded-[8px] border ${error ? 'border-[#C5432D]' : 'border-[#2a2a30]'} px-3 transition-colors focus-within:border-accent`}>
                        <input
                            type="email"
                            placeholder="tlemcani@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-white text-[12.5px] placeholder:text-[#80808a]/50"
                        />
                    </div>
                    {error && (
                        <div className="flex items-center gap-1.5 mt-1 text-[#C5432D]">
                            <ExclamationIcon className="size-[16px]" />
                            <p className="text-[11px] font-medium">{error}</p>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || isLinkSent}
                    className={`rounded-[12px] py-[14px] transition-all flex items-center justify-center gap-2 font-poppins font-medium ${isLinkSent ? 'bg-[#1e1e24] text-white' : 'bg-accent hover:bg-accent/90 text-white active:scale-[0.98]'}`}
                >
                    <span className="text-[12.5px]">
                        {isLinkSent ? "Link Sent" : isSubmitting ? "Sending..." : "Send Reset Link"}
                    </span>
                    {isLinkSent && (
                        <CheckIcon className="size-[18px] text-white" />
                    )}
                </button>
            </form>

            {!isLinkSent && (
                <p className="text-center text-[12.5px] text-[#80808a] font-poppins">
                    You don't have an account ? <Link to="/register" className="text-accent underline hover:text-white transition-colors">register here</Link>
                </p>
            )}
        </div>
    );
};

export default RequestForm;
