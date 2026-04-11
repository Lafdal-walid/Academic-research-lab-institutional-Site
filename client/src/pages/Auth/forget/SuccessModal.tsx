import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, CrossIcon } from './Icons';

interface SuccessModalProps {
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Auto-redirect after 4 seconds
        const timer = setTimeout(() => {
            navigate('/'); 
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md animate-fade-in">
            <div className="bg-[#151519] flex flex-col gap-[24px] items-center justify-center pb-[48px] pt-[24px] px-[24px] relative rounded-[16px] max-w-[560px] w-full animate-scale-in border border-white/5">
                <div aria-hidden="true" className="absolute border border-[#1e1d22] border-solid inset-0 pointer-events-none rounded-[16px]" />
                
                {/* Close Button Area */}
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="content-stretch flex items-start justify-end relative shrink-0 w-full">
                        <button 
                            onClick={onClose}
                            className="bg-[#1e1e24] p-[4px] relative rounded-[400px] shrink-0 hover:brightness-125 transition-all z-20"
                        >
                            <CrossIcon className="size-[20px] text-accent" />
                        </button>
                    </div>
                </div>

                {/* Success Icon Area */}
                <div className="bg-[rgba(52,87,220,0.2)] content-stretch flex items-center p-[12px] relative rounded-[400px] shrink-0">
                    <div className="bg-[rgba(52,87,220,0.6)] content-stretch flex items-end p-[16px] relative rounded-[400px] shrink-0 transform hover:scale-110 transition-transform duration-500">
                        <CheckIcon className="size-[32px] text-white" />
                    </div>
                </div>

                {/* Text Area */}
                <div className="relative shrink-0 w-full px-4">
                    <div className="flex flex-col items-center size-full">
                        <div className="content-stretch flex flex-col gap-[8px] items-center leading-[normal] not-italic relative text-center w-full">
                            <h2 className="font-gilroy font-extrabold relative shrink-0 text-[22px] text-white">
                                Your password has been reset
                            </h2>
                            <p className="font-poppins relative shrink-0 text-[#a5a5b2] text-[14px]">
                                You can now log in using your new password.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Button Area */}
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <button 
                        onClick={() => navigate('/login')}
                        className="bg-accent hover:bg-accent/90 transition-all min-h-[50px] relative rounded-[16px] flex items-center justify-center w-full group active:scale-[0.98]"
                    >
                        <span className="font-poppins font-medium text-[14px] text-white">
                            Return to login
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
