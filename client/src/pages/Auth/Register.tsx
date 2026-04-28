import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorBends from '../../components/ui/ColorBends';

// Modular Components
import MainForm from './register/MainForm';
import PhoneInputForm from './register/PhoneInputForm';
import VerificationForm from './register/VerificationForm';
import API_BASE_URL from '@/config';

const countries = [
    { name: 'Saudi Arabia', code: '+966' },
    { name: 'Algeria', code: '+213' },
    { name: 'Egypt', code: '+20' },
    { name: 'United Arab Emirates', code: '+971' },
    { name: 'Qatar', code: '+974' },
    { name: 'Kuwait', code: '+965' },
    { name: 'Bahrain', code: '+973' },
    { name: 'Oman', code: '+968' },
    { name: 'Jordan', code: '+962' },
    { name: 'Lebanon', code: '+961' },
    { name: 'Morocco', code: '+212' },
    { name: 'Tunisia', code: '+216' },
    { name: 'Libya', code: '+218' },
    { name: 'Palestine', code: '+970' },
    { name: 'United States', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'France', code: '+33' },
    { name: 'Germany', code: '+49' },
    { name: 'Canada', code: '+1' },
    { name: 'Australia', code: '+61' }
];

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Step 1 State
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({ username: '', email: '', password: '' });
    
    // Step 2 State (Phone)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(countries[1]); // Default to Algeria
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    
    // OTP State (Steps 3 & 4)
    const [otp, setOtp] = useState(['', '', '', '']);

    useEffect(() => {
        document.title = "Join Research Lab | Register";
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const handleStep1Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            setErrors({
                username: formData.username ? '' : 'Username is required',
                email: formData.email ? '' : 'Email is required',
                password: formData.password ? '' : 'Password is required'
            });
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/send-email-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email })
            });
            if (res.ok) {
                setOtp(['', '', '', '']);
                setStep(2); // email verification first
            } else {
                const data = await res.json();
                alert(data.message || 'Error sending email code');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Step 3: Phone number entry → send phone OTP
    const handleStep2Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/send-phone-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: selectedCountry.code + phoneNumber })
            });
            const data = await res.json();
            if (res.ok) {
                setOtp(['', '', '', '']);
                setStep(4); // phone OTP verify
            } else {
                alert(data.message || 'Error sending SMS');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) value = value[value.length - 1];
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 3) document.getElementById(`otp-${index + 1}`)?.focus();
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) document.getElementById(`otp-${index - 1}`)?.focus();
    };

    // Step 4: Verify phone OTP → register
    const handlePhoneVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const code = otp.join('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    phoneNumber: selectedCountry.code + phoneNumber,
                    phoneOtp: code
                })
            });
            const data = await res.json();
            if (res.ok) {
                navigate('/login');
            } else {
                alert(data.message || 'Invalid code or registration failed');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Step 2: Verify email OTP → go to phone input
    const handleEmailVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const code = otp.join('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/verify-email-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, otp: code })
            });
            const data = await res.json();
            if (res.ok) {
                setOtp(['', '', '', '']);
                setStep(3); // go to phone input
            } else {
                alert(data.message || 'Invalid email code');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRegisterLater = async () => {
        setIsSubmitting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/register-later`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });
            const data = await res.json();
            if (res.ok) {
                navigate('/login');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0B0A0C] relative overflow-hidden font-poppins text-white">
            <div className="absolute inset-0 z-0">
                <ColorBends colors={["#3457dc"]} rotation={0} speed={0.2} scale={1.7} frequency={1} warpStrength={1} transparent />
            </div>

            <div className="w-full max-w-[543px] z-10 relative flex flex-col items-center justify-center">
                <div className="bg-[#151519] border border-white/5 px-8 pt-5 pb-10 rounded-[16px] shadow-2xl backdrop-blur-md w-full flex flex-col justify-center transition-all duration-500 scale-in relative overflow-visible">
                    
                    {step === 1 && (
                        <MainForm 
                            formData={formData} 
                            errors={errors} 
                            handleInputChange={handleInputChange} 
                            onSubmit={handleStep1Submit} 
                            isSubmitting={isSubmitting} 
                        />
                    )}

                    {/* Step 2: Email OTP */}
                    {step === 2 && (
                        <VerificationForm 
                            title="Check your email" 
                            description={<>We've sent a 4-digit verification code to <span className="text-accent font-medium">{formData.email}</span></>} 
                            otp={otp} 
                            onOtpChange={handleOtpChange} 
                            onOtpKeyDown={handleOtpKeyDown} 
                            onSubmit={handleEmailVerify} 
                            onBack={() => setStep(1)} 
                            onResend={() => {}}
                            isSubmitting={isSubmitting} 
                            buttonText="Verify Email" 
                        />
                    )}

                    {/* Step 3: Phone input */}
                    {step === 3 && (
                        <PhoneInputForm 
                            onBack={() => setStep(2)} 
                            onSubmit={handleStep2Submit} 
                            countries={countries} 
                            selectedCountry={selectedCountry} 
                            setSelectedCountry={setSelectedCountry} 
                            isCountryListOpen={isCountryOpen} 
                            setIsCountryListOpen={setIsCountryOpen} 
                            phoneNumber={phoneNumber} 
                            handlePhoneChange={(e) => setPhoneNumber(e.target.value)} 
                            isSubmitting={isSubmitting} 
                            onLater={handleRegisterLater} 
                        />
                    )}

                    {/* Step 4: Phone OTP → registers */}
                    {step === 4 && (
                        <VerificationForm 
                            title="Verify Phone" 
                            description={<>We've sent a 4-digit code to <span className="text-white font-medium">{selectedCountry.code} {phoneNumber}</span></>} 
                            otp={otp} 
                            onOtpChange={handleOtpChange} 
                            onOtpKeyDown={handleOtpKeyDown} 
                            onSubmit={handlePhoneVerify} 
                            onBack={() => setStep(3)} 
                            onResend={() => {}}
                            isSubmitting={isSubmitting} 
                            buttonText="Verify Phone & Create Account" 
                        />
                    )}

                </div>
            </div>
        </div>
    );
};

export default Register;
