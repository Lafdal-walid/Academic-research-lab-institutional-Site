import React from 'react';

const StatCard = ({ title, value, icon, infoIcon, infoText, width = '100%' }) => {
    return (
        <div 
            className="relative overflow-hidden group transition-all duration-300 hover:translate-y-[-2px]"
            style={{ 
                width,
                backgroundColor: '#151519',
                border: '1px solid #1e1d22',
                borderRadius: '1.2vw',
                padding: '2.5vh 1.8vw'
             }}
        >
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-[4vw] h-[4vw] bg-[#3457DC]/5 blur-[2vw] rounded-full -mr-[1vw] -mt-[1vw] group-hover:bg-[#3457DC]/10 transition-colors duration-500" />
            
            <div className="relative z-10 flex flex-col gap-[1.5vh]">
                <div className="flex items-center justify-between w-full">
                    <span className="text-white/50 text-[0.9vw] font-medium tracking-wide uppercase">
                        {title}
                    </span>
                    <div className="p-[0.6vw] rounded-[0.8vw] bg-[#3457DC]/10 flex items-center justify-center text-[#3457DC] group-hover:scale-110 transition-transform duration-300">
                        {icon}
                    </div>
                </div>
                
                <div className="flex items-center gap-[0.5vw]">
                    <h3 className="text-white text-[1.8vw] font-bold tracking-tight">
                        {value}
                    </h3>
                    {infoIcon && (
                        <div className="relative group/info">
                            {infoIcon}
                            {infoText && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[12vw] p-[0.8vw] bg-[#1a1a1f] border border-[#2a2a30] rounded-[0.6vw] opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all duration-200 z-50 shadow-2xl">
                                    <p className="text-white/70 text-[0.75vw] leading-relaxed">
                                        {infoText}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#3457DC]/30 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
    );
};

export default StatCard;
