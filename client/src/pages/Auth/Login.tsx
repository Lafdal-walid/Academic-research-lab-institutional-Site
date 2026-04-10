import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ColorBends from '../../components/ui/ColorBends';

// SVG Paths provided by USER
const svgPaths = {
    p579aac0: "M18.71 8.21C18.617 8.11627 18.5064 8.04188 18.3846 7.99111C18.2627 7.94034 18.132 7.9142 18 7.9142C17.868 7.9142 17.7373 7.94034 17.6154 7.99111C17.4936 8.04188 17.383 8.11627 17.29 8.21L12.71 12.79C12.617 12.8837 12.5064 12.9581 12.3846 13.0089C12.2627 13.0597 12.132 13.0858 12 13.0858C11.868 13.0858 11.7373 13.0597 11.6154 13.0089C11.4936 12.9581 11.383 12.8837 11.29 12.79L6.71 8.21C6.61704 8.11627 6.50644 8.04188 6.38458 7.99111C6.26272 7.94034 6.13201 7.9142 6 7.9142C5.86799 7.9142 5.73728 7.94034 5.61542 7.99111C5.49356 8.04188 5.38296 8.11627 5.29 8.21C5.10375 8.39736 4.99921 8.65081 4.99921 8.915C4.99921 9.17919 5.10375 9.43264 5.29 9.62L9.88 14.21C10.4425 14.7718 11.205 15.0874 12 15.0874C12.795 15.0874 13.5575 14.7718 14.12 14.21L18.71 9.62C18.8963 9.43264 19.0008 9.17919 19.0008 8.915C19.0008 8.65081 18.8963 8.39736 18.71 8.21Z",
    p6d18500: "M19.3925 7.84917C18.6402 6.61727 17.6913 5.51688 16.5833 4.59167L18.9167 2.25833C19.0685 2.10116 19.1525 1.89066 19.1506 1.67217C19.1487 1.45367 19.061 1.24466 18.9065 1.09015C18.752 0.935644 18.543 0.848003 18.3245 0.846105C18.106 0.844206 17.8955 0.928201 17.7383 1.08L15.2008 3.62083C13.6278 2.68652 11.8295 2.19955 10 2.2125C4.84083 2.2125 1.90083 5.74417 0.6075 7.84917C0.20794 8.49542 -0.00370511 9.2402 -0.00370511 10C-0.00370511 10.7598 0.20794 11.5046 0.6075 12.1508C1.3598 13.3827 2.30874 14.4831 3.41667 15.4083L1.08333 17.7417C1.00374 17.8185 0.940256 17.9105 0.896582 18.0122C0.852908 18.1138 0.829919 18.2232 0.828958 18.3338C0.827996 18.4445 0.849081 18.5542 0.890982 18.6566C0.932882 18.759 0.99476 18.8521 1.073 18.9303C1.15125 19.0086 1.24429 19.0705 1.3467 19.1124C1.44912 19.1543 1.55885 19.1753 1.6695 19.1744C1.78015 19.1734 1.8895 19.1504 1.99117 19.1068C2.09284 19.0631 2.18479 18.9996 2.26167 18.92L4.805 16.3767C6.37606 17.3108 8.17223 17.7986 10 17.7875C15.1592 17.7875 18.0992 14.2558 19.3925 12.1508C19.7921 11.5046 20.0037 10.7598 20.0037 10C20.0037 9.2402 19.7921 8.49542 19.3925 7.84917ZM2.0275 11.2783C1.79011 10.8942 1.66438 10.4516 1.66438 10C1.66438 9.54844 1.79011 9.1058 2.0275 8.72167C3.13917 6.91667 5.65167 3.87917 10 3.87917C11.3836 3.87142 12.7477 4.20486 13.9717 4.85L12.2942 6.5275C11.4941 5.99633 10.5349 5.75833 9.57936 5.85387C8.6238 5.94941 7.73072 6.37261 7.05167 7.05167C6.37261 7.73072 5.94941 8.6238 5.85387 9.57936C5.75833 10.5349 5.99633 11.4941 6.5275 12.2942L4.6025 14.2192C3.58175 13.3939 2.7107 12.3991 2.0275 11.2783ZM12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.62876 12.4986 9.26266 12.4131 8.92917 12.25L12.25 8.92917C12.4131 9.26266 12.4986 9.62876 12.5 10ZM7.5 10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5C10.3712 7.50144 10.7373 7.58691 11.0708 7.75L7.75 11.0708C7.58691 10.7373 7.50144 10.3712 7.5 10ZM17.9725 11.2783C16.8608 13.0833 14.3483 16.1208 10 16.1208C8.61644 16.1286 7.2523 15.7951 6.02833 15.15L7.70583 13.4725C8.50589 14.0037 9.46508 14.2417 10.4206 14.1461C11.3762 14.0506 12.2693 13.6274 12.9483 12.9483C13.6274 12.2693 14.0506 11.3762 14.1461 10.4206C14.2417 9.46508 14.0037 8.50589 13.4725 7.70583L15.3975 5.78083C16.4182 6.60607 17.2893 7.60087 17.9725 8.72167C18.2099 9.1058 18.3356 9.54844 18.3356 10C18.3356 10.4516 18.2099 10.8942 17.9725 11.2783Z",
    p38cdcb00: "M22.9504 12C23.5301 12 24.0048 11.5291 23.9541 10.9517C23.7227 8.31174 22.6221 5.81137 20.8092 3.85152C18.9964 1.89168 16.5892 0.599818 13.9753 0.163667C13.4035 0.0682637 12.8972 0.504875 12.8521 1.08279V1.08279C12.807 1.6607 13.2407 2.16012 13.8106 2.26611C15.8973 2.65421 17.8144 3.70524 19.2682 5.27695C20.722 6.84866 21.6207 8.84171 21.8453 10.9523C21.9066 11.5287 22.3707 12 22.9504 12V12Z",
    p39c4200: "M18 28C8.06344 28.0111 0.0110625 36.0635 0 46C0 47.1046 0.895406 48 1.99997 48H33.9999C35.1045 48 35.9999 47.1046 35.9999 46C35.9889 36.0635 27.9366 28.011 18 28Z",
    p6c31dc0: "M18 24C24.6274 24 30 18.6274 30 12C30 5.37258 24.6274 0 18 0C11.3726 0 6 5.37258 6 12C6 18.6274 11.3726 24 18 24Z",
    pe6c0cc0: "M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM2.09918 12C2.09918 17.4681 6.53193 21.9008 12 21.9008C17.4681 21.9008 21.9008 17.4681 21.9008 12C21.9008 6.53193 17.4681 2.09918 12 2.09918C6.53193 2.09918 2.09918 6.53193 2.09918 12Z",
};

// Sub-components as requested by USER
function AngleSmallDown() {
    return (
        <div className="relative size-[24px]" data-name="angle-small-down (3) 9">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g id="angle-small-down (3) 9">
                    <path d={svgPaths.p579aac0} fill="var(--fill-0, #3457DC)" id="Vector" />
                </g>
            </svg>
        </div>
    );
}

function Group() {
    return (
        <div className="absolute inset-[0_12.5%]" data-name="Group">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.9999 48">
                <g id="Group">
                    <path d={svgPaths.p6c31dc0} fill="var(--fill-0, #A5A5B2)" id="Vector" />
                    <path d={svgPaths.p39c4200} fill="var(--fill-0, #A5A5B2)" id="Vector_2" />
                </g>
            </svg>
        </div>
    );
}

function User() {
    return (
        <div className="overflow-clip relative shrink-0 size-[48px]" data-name="user (5) 1">
            <Group />
        </div>
    );
}

function Frame() {
    return (
        <div className="bg-[#1e1e24] content-stretch flex items-center p-[16px] relative rounded-[400px] shrink-0">
            <User />
        </div>
    );
}

function Frame1({ name }: { name: string }) {
    return (
        <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
            <Frame />
            <p className="font-gilroy font-extrabold leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Welcome {name}</p>
        </div>
    );
}

function Group1() {
    return (
        <div className="relative shrink-0 size-[24px]">
            <svg className="absolute block size-full animate-spin" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g id="Group 433">
                    <path d={svgPaths.pe6c0cc0} fill="var(--fill-0, #1E1E24)" id="Ellipse 21849" />
                    <path d={svgPaths.p38cdcb00} fill="var(--fill-0, #3457DC)" id="Ellipse 21850" />
                </g>
            </svg>
        </div>
    );
}

function Exclamation() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_79_18532)">
                <path d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9977 5.87897 15.1541 3.84547 13.6543 2.34568C12.1545 0.845886 10.121 0.00229405 8 0ZM8 14.6667C6.68146 14.6667 5.39253 14.2757 4.2962 13.5431C3.19987 12.8106 2.34539 11.7694 1.84081 10.5512C1.33622 9.33305 1.2042 7.99261 1.46144 6.6994C1.71867 5.40619 2.35361 4.21831 3.28596 3.28596C4.21831 2.35361 5.4062 1.71867 6.6994 1.46143C7.99261 1.2042 9.33305 1.33622 10.5512 1.8408C11.7694 2.34539 12.8106 3.19987 13.5431 4.2962C14.2757 5.39253 14.6667 6.68146 14.6667 8C14.6647 9.76752 13.9617 11.4621 12.7119 12.7119C11.4621 13.9617 9.76752 14.6647 8 14.6667Z" fill="#C5432D"/>
                <path d="M7.99967 3.33325C7.82286 3.33325 7.65329 3.40349 7.52827 3.52851C7.40325 3.65354 7.33301 3.82311 7.33301 3.99992V9.33325C7.33301 9.51006 7.40325 9.67963 7.52827 9.80466C7.65329 9.92968 7.82286 9.99992 7.99967 9.99992C8.17649 9.99992 8.34605 9.92968 8.47108 9.80466C8.5961 9.67963 8.66634 9.51006 8.66634 9.33325V3.99992C8.66634 3.82311 8.5961 3.65354 8.47108 3.52851C8.34605 3.40349 8.17649 3.33325 7.99967 3.33325Z" fill="#C5432D"/>
                <path d="M8.66634 11.9999C8.66634 11.6317 8.36786 11.3333 7.99967 11.3333C7.63148 11.3333 7.33301 11.6317 7.33301 11.9999C7.33301 12.3681 7.63148 12.6666 7.99967 12.6666C8.36786 12.6666 8.66634 12.3681 8.66634 11.9999Z" fill="#C5432D"/>
            </g>
            <defs>
                <clipPath id="clip0_79_18532">
                    <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    )
}

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [showSuccess, setShowSuccess] = useState(false);
    const [loggedInUserName, setLoggedInUserName] = useState('');

    const [language, setLanguage] = useState<'en' | 'ar'>('en');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === 'email') setEmail(value);
        if (id === 'password') setPassword(value);

        // Clear error when user typed
        setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const toggleLanguage = (newLang: 'en' | 'ar') => {
        setLanguage(newLang);
        // Additional logic could go here if i18n is implemented
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation
        let hasError = false;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email is required';
            hasError = true;
        }
        if (!password) {
            newErrors.password = 'Password is required';
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        // UI/UX Only: Mock success and redirect
        console.log('Login attempt:', { email, password });

        setTimeout(() => {
            setIsSubmitting(false);
            const mockName = email.split('@')[0];
            setLoggedInUserName(mockName.charAt(0).toUpperCase() + mockName.slice(1));
            setShowSuccess(true);
            
            // Final redirect after showing success
            setTimeout(() => {
                navigate('/');
            }, 3200);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0B0A0C] relative overflow-hidden font-poppins text-white">
            {/* Language toggle button (exactly as requested) */}
            <button
                onClick={() => toggleLanguage(language === 'en' ? 'ar' : 'en')}
                style={{
                    position: 'fixed',
                    top: '10px',
                    right: '10px',
                    padding: '5px 10px',
                    background: '#3457DC',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    zIndex: 1000
                }}
                aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
            >
                {language === 'en' ? 'EN' : 'AR'}
            </button>

            {/* ColorBends Background */}
            <div className="absolute inset-0 z-0">
                <ColorBends
                    colors={["#3457dc"]}
                    rotation={0}
                    speed={0.2}
                    scale={1.7}
                    frequency={1}
                    warpStrength={1}
                    mouseInfluence={0}
                    parallax={0.5}
                    noise={0.1}
                    transparent
                />
            </div>
            {/* Logo Area - Absolute top */}
            {!showSuccess && (
                <div className="absolute top-10 w-full flex justify-center z-10 animate-fade-in shrink-0">
                    <Link to="/" className="block">
                        <img src="/Saad Dahlab white.png" alt="Logo" className="h-16 w-auto drop-shadow-2xl" />
                    </Link>
                </div>
            )}

            <div className={`w-full ${showSuccess ? 'max-w-[400px]' : 'max-w-[543px]'} z-10 relative flex flex-col items-center justify-center transition-all duration-500`}>

                {/* Form Card */}
                <div className={`bg-[#151519] border border-white/5 px-8 pt-5 pb-10 rounded-[16px] shadow-2xl backdrop-blur-md w-full ${showSuccess ? 'min-h-[300px]' : 'min-h-[400px]'} flex flex-col justify-center transition-all duration-500 relative overflow-visible scale-in`}>
                    {!showSuccess ? (
                        <div className="flex flex-col gap-[28px] animate-fade-in w-full">

                            {/* Back Button (Inside Card) */}
                            <div onClick={() => navigate(-1)} className="content-stretch flex items-center gap-[12px] relative shrink-0 w-full cursor-pointer group">
                                <div className="flex items-center justify-center relative shrink-0 size-[24px]">
                                    <div className="flex-none rotate-90 transition-transform group-hover:-translate-x-1">
                                        <AngleSmallDown />
                                    </div>
                                </div>
                                <p className="font-poppins font-medium leading-[normal] text-accent text-[14px]">Back</p>
                            </div>

                            {/* Welcome Text */}
                            <div className="content-stretch flex flex-col gap-[6px] items-center leading-[normal] not-italic relative shrink-0 text-center w-full">
                                <h1 className="font-gilroy font-extrabold relative shrink-0 text-[22px] text-white w-full tracking-tight">Welcome Back</h1>
                                <p className="font-regular relative shrink-0 text-[#a5a5b2] text-[13.5px] w-full font-poppins px-4">Log in to manage your account and subscription.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">

                                {/* Email Input (Frame 7) */}
                                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                                    <p className="font-regular leading-[normal] not-italic relative shrink-0 text-[#80808a] text-[12.5px] w-full">Your Email</p>
                                    <div className={`bg-white/[0.01] flex flex-row items-center w-full min-h-[40px] relative rounded-[8px] border ${errors.email ? 'border-warning' : 'border-[#2a2a30]'} transition-colors focus-within:border-accent`}>
                                        <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full">
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="lroem@loreml.com"
                                                value={email}
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

                                {/* Password Input (Frame 8) */}
                                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                                    <p className="font-regular leading-[normal] not-italic relative shrink-0 text-[#80808a] text-[12.5px] w-full">Your Password</p>
                                    <div className={`bg-white/[0.01] flex flex-row items-center w-full min-h-[40px] relative rounded-[8px] border ${errors.password ? 'border-warning' : 'border-[#2a2a30]'} transition-colors focus-within:border-accent`}>
                                        <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={handleInputChange}
                                                className="bg-transparent border-none outline-none w-full text-white placeholder:text-[#a5a5b2] text-[12.5px]"
                                            />
                                            <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer text-accent hover:text-white transition-colors">
                                                <div className="relative shrink-0 size-[18px]" data-name="eye-crossed 2">
                                                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                                        <g id="eye-crossed 2">
                                                            <path d={svgPaths.p6d18500} fill="currentColor" id="Vector" />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.password && (
                                        <div className="flex items-center gap-1.5 mt-2 text-warning">
                                            <Exclamation />
                                            <p className="text-[11px] font-medium">{errors.password}</p>
                                        </div>
                                    )}
                                    <Link to="/forget" className="font-medium leading-[normal] text-accent text-[12.5px] w-full text-left hover:underline mb-3">Forgot Password ?</Link>
                                </div>

                                {/* Submit Button (Frame 3) */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-accent hover:bg-accent/90 relative rounded-[12px] shrink-0 w-full py-[14px] transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    <div className="flex flex-row items-center justify-center size-full">
                                        <p className="font-medium leading-[normal] not-italic relative shrink-0 text-[12.5px] text-white whitespace-nowrap">
                                            {isSubmitting ? "Logging in..." : "Log in"}
                                        </p>
                                    </div>
                                </button>

                                {/* Divider (Frame 12) */}
                                <div className="content-stretch flex gap-[18px] items-center relative shrink-0 w-full my-1 text-center">
                                    <div className="flex-[1_0_0] h-px bg-[#2A2A30] relative" />
                                    <p className="font-regular leading-[normal] not-italic relative shrink-0 text-[#a5a5b2] text-[14.5px] whitespace-nowrap">Or</p>
                                    <div className="flex-[1_0_0] h-px bg-[#2A2A30] relative" />
                                </div>

                                {/* Google Button (Frame 4/5) */}
                                <button type="button" className="relative rounded-[16px] shrink-0 w-full border border-[#2a2a30] hover:bg-white/5 transition-all">
                                    <div className="flex flex-row items-center justify-center size-full">
                                        <div className="content-stretch flex gap-[10px] items-center justify-center px-[14px] py-[14px] relative w-full">
                                            <div className="relative shrink-0 size-[18px]" data-name="Logo-google-icon-PNG 1">
                                                <svg viewBox="0 0 24 24" className="absolute inset-0 size-full">
                                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                </svg>
                                            </div>
                                            <p className="font-medium leading-[normal] not-italic relative shrink-0 text-[12.5px] text-white whitespace-nowrap">Continue With google</p>
                                        </div>
                                    </div>
                                </button>

                                {/* Register Link (Frame 18) */}
                                <div className="content-stretch flex items-center justify-center py-2 relative shrink-0 w-full">
                                    <p className="flex-[1_0_0] font-regular leading-[normal] not-italic relative text-[12.5px] text-center text-white">
                                        <span>You don't have an account ? </span>
                                        <Link to="/register" className="decoration-solid font-poppins font-medium text-accent underline">registre here</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-[40px] animate-scale-in py-[40px]">
                            <Frame1 name={loggedInUserName} />
                            <Group1 />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Login;
