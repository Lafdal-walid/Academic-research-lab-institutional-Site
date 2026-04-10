import React from 'react';
import { AngleSmallDown } from './Icons';

interface PhoneInputFormProps {
    onBack: () => void;
    onSubmit: (e: React.FormEvent) => void;
    countries: any[];
    selectedCountry: any;
    setSelectedCountry: (c: any) => void;
    isCountryListOpen: boolean;
    setIsCountryListOpen: (o: boolean) => void;
    phoneNumber: string;
    handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSubmitting: boolean;
    onLater: () => void;
}

const PhoneInputForm: React.FC<PhoneInputFormProps> = ({
    onBack, onSubmit, countries, selectedCountry, setSelectedCountry,
    isCountryListOpen, setIsCountryListOpen, phoneNumber, handlePhoneChange,
    isSubmitting, onLater
}) => {
    return (
        <div className="animate-fade-in flex flex-col gap-[28px]">
            {/* Back Button */}
            <div onClick={onBack} className="content-stretch flex flex-col items-start relative shrink-0 w-full cursor-pointer group">
                <div className="content-stretch flex gap-1.5 items-center relative shrink-0 w-full hover:brightness-125 transition-all">
                    <div className="flex items-center justify-center relative shrink-0 size-[24px]">
                        <div className="flex-none rotate-90 transition-transform group-hover:-translate-x-1">
                            <AngleSmallDown />
                        </div>
                    </div>
                    <p className="font-medium leading-[normal] not-italic relative shrink-0 text-accent text-[14px] font-poppins">Back</p>
                </div>
            </div>

            {/* Title Text */}
            <div className="content-stretch flex flex-col gap-[6px] items-center leading-[normal] not-italic relative shrink-0 text-center w-full">
                <h1 className="font-gilroy font-extrabold relative shrink-0 text-[22px] text-white w-full tracking-tight">Create your account</h1>
                <p className="font-regular relative shrink-0 text-[#a5a5b2] text-[13.5px] w-full font-poppins px-4">Please enter your phone number to receive a verification code.</p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-[24px]">
                {/* Country Selector */}
                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full z-20">
                    <p className="font-regular text-[#80808a] text-[12.5px] w-full">Country</p>
                    <div className="relative w-full font-poppins">
                        <div
                            onClick={() => setIsCountryListOpen(!isCountryListOpen)}
                            className="bg-white/[0.01] flex flex-row items-center justify-between w-full min-h-[40px] relative rounded-[8px] border border-[#2a2a30] px-[12px] py-[8px] cursor-pointer hover:bg-white/5 transition-all"
                        >
                            <p className="text-[12.5px] text-white">{selectedCountry.name}</p>
                            <div className={`size-[18px] opacity-70 transition-transform ${isCountryListOpen ? 'rotate-180' : ''}`}>
                                <AngleSmallDown />
                            </div>
                        </div>

                        {isCountryListOpen && (
                            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#1e1e24] border border-[#2a2a30] rounded-[12px] shadow-2xl overflow-hidden animate-fade-in max-h-[200px] overflow-y-auto z-50 custom-scrollbar">
                                {countries.map((c) => (
                                    <div
                                        key={c.name}
                                        onClick={() => {
                                            setSelectedCountry(c);
                                            setIsCountryListOpen(false);
                                        }}
                                        className="px-[12px] py-[10px] hover:bg-white/5 cursor-pointer text-[12.5px] text-white flex justify-between items-center transition-colors"
                                    >
                                        <span>{c.name}</span>
                                        <span className="text-accent text-[11px] font-medium">{c.code}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Phone Field */}
                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full font-poppins">
                    <p className="font-regular text-[#80808a] text-[12.5px] w-full">Phone Number</p>
                    <div className="bg-white/[0.01] flex flex-row items-center w-full min-h-[40px] relative rounded-[8px] border border-[#2a2a30] transition-colors focus-within:border-accent">
                        <div className="flex items-center px-[12px] gap-3">
                            <span className="text-[12.5px] text-white font-medium min-w-[40px]">{selectedCountry.code}</span>
                            <div className="w-[1px] h-4 bg-[#2a2a30]" />
                        </div>
                        <input
                            type="tel"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                            className="bg-transparent border-none outline-none w-full py-[8px] text-white placeholder:text-[#a5a5b2] text-[12.5px]"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-[12px] mt-4 font-poppins">
                    <button
                        type="button"
                        onClick={onLater}
                        className="flex-1 bg-[#1e1e24] hover:bg-[#2a2a30] text-white rounded-[12px] py-[14px] text-[12.5px] font-medium transition-all active:scale-[0.98]"
                    >
                        I'll do this later
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || !phoneNumber}
                        className="flex-1 bg-accent hover:bg-accent/90 text-white rounded-[12px] py-[14px] text-[12.5px] font-medium transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {isSubmitting ? "Sending..." : "Send Code"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PhoneInputForm;
