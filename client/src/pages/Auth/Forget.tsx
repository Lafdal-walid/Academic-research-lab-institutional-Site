import React, { useState, useEffect } from 'react';
import ColorBends from '../../components/ui/ColorBends';

// Modular Components
import RequestForm from './forget/RequestForm';
import ResetPasswordForm from './forget/ResetPasswordForm';
import SuccessModal from './forget/SuccessModal';

const Forget: React.FC = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: New Password
    const [email, setEmail] = useState('');
    const [isLinkSent, setIsLinkSent] = useState(false);
    const [error, setError] = useState('');
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        document.title = "Reset Password | Research Lab";
    }, []);

    const handleSendLink = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (email === "error@test.com") {
            setError("We couldn't find an account with that email");
            return;
        }

        if (!email.trim() || !email.includes('@')) {
            setError("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsLinkSent(true);
            setTimeout(() => setStep(2), 2500);
        }, 1500);
    };

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) return;
        
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setShowModal(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0B0A0C] relative overflow-hidden font-poppins text-white">
            <div className="absolute inset-0 z-0">
                <ColorBends colors={["#3457dc"]} rotation={0} speed={0.2} scale={1.7} frequency={1} warpStrength={1} transparent />
            </div>


            <div className="w-full max-w-[543px] z-10 relative flex flex-col items-center justify-center">
                <div className="bg-[#151519] border border-white/5 px-8 pt-10 pb-[4.5vh] rounded-[16px] shadow-2xl backdrop-blur-md w-full flex flex-col justify-start transition-all duration-500 scale-in relative overflow-visible">
                    
                    {step === 1 ? (
                        <RequestForm 
                            email={email} 
                            setEmail={setEmail} 
                            error={error} 
                            isSubmitting={isSubmitting} 
                            isLinkSent={isLinkSent} 
                            onSubmit={handleSendLink} 
                        />
                    ) : (
                        <ResetPasswordForm 
                            onBack={() => setStep(1)} 
                            onSubmit={handleResetPassword} 
                            isSubmitting={isSubmitting} 
                            newPassword={newPassword}
                            setNewPassword={setNewPassword}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                        />
                    )}
                </div>
            </div>

            {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Forget;
