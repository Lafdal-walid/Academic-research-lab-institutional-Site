import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PublishModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-[#0a0a0b]/70 backdrop-blur-[4px] flex items-center justify-center p-4 cursor-default"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 15 }}
                        transition={{ 
                            type: 'spring',
                            damping: 25,
                            stiffness: 350,
                            duration: 0.2
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#151519] content-stretch flex flex-col gap-[24px] items-center justify-center pb-[32px] pt-[24px] px-[24px] relative rounded-[16px] w-[504px] shadow-2xl"
                    >
                        {/* Border/Shadow Effect */}
                        <div aria-hidden="true" className="absolute border border-[#1e1d22] border-solid inset-[-1px] pointer-events-none rounded-[17px] shadow-[0px_12px_40px_rgba(0,0,0,0.5)]" />

                        {/* Top Close Button Area */}
                        <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                <div className="content-stretch flex items-start justify-end relative shrink-0 w-full">
                                    <div 
                                        onClick={onClose}
                                        className="bg-[#1e1e24] content-stretch flex items-start p-[4px] relative rounded-[400px] shrink-0 cursor-pointer hover:bg-[#2a2a30] transition-all hover:scale-110 active:scale-95"
                                    >
                                        <div className="relative shrink-0 size-[20px]">
                                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                                <g>
                                                    <path d="M14.9998 4.99997C14.8436 4.84374 14.6317 4.75598 14.4107 4.75598C14.1897 4.75598 13.9778 4.84374 13.8215 4.99997L9.99985 8.82164L6.17818 4.99997C6.02191 4.84374 5.80998 4.75598 5.58901 4.75598C5.36804 4.75598 5.15612 4.84374 4.99985 4.99997C4.84362 5.15624 4.75586 5.36817 4.75586 5.58914C4.75586 5.81011 4.84362 6.02203 4.99985 6.1783L8.82152 9.99997L4.99985 13.8216C4.84362 13.9779 4.75586 14.1898 4.75586 14.4108C4.75586 14.6318 4.84362 14.8437 4.99985 15C5.15612 15.1562 5.36804 15.244 5.58901 15.244C5.80998 15.244 6.02191 15.1562 6.17818 15L9.99985 11.1783L13.8215 15C13.9778 15.1562 14.1897 15.244 14.4107 15.244C14.6317 15.244 14.8436 15.1562 14.9998 15C15.1561 14.8437 15.2438 14.6318 15.2438 14.4108C15.2438 14.1898 15.1561 13.9779 14.9998 13.8216L11.1782 9.99997L14.9998 6.1783C15.1561 6.02203 15.2438 5.81011 15.2438 5.58914C15.2438 5.36817 15.1561 5.15624 14.9998 4.99997Z" fill="#3457DC" />
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Title and Description */}
                        <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
                            <div className="relative shrink-0 w-full">
                                <div className="flex flex-col items-center size-full">
                                    <div className="content-stretch flex flex-col items-center px-[24px] relative size-full">
                                        <div className="content-stretch flex flex-col gap-[8px] items-center leading-[normal] not-italic relative shrink-0 text-center w-full">
                                            <p className="font-bold relative shrink-0 text-[20px] text-white w-[288px] font-sans">Publish changes?</p>
                                            <p className="font-['Poppins',sans-serif] min-w-full relative shrink-0 text-[#a5a5b2] text-[14px] w-[min-content]">These edits will replace the current version and become visible to users right away.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
                                    <div 
                                        onClick={onClose}
                                        className="bg-[#1e1e24] flex-[1_0_0] min-h-px min-w-px relative rounded-[12px] cursor-pointer hover:bg-[#2a2a30] transition-all hover:brightness-110 active:scale-[0.98]"
                                    >
                                        <div className="flex flex-row items-center justify-center size-full">
                                            <div className="content-stretch flex items-center justify-center px-[12px] py-[16px] relative size-full">
                                                <p className="font-['Poppins',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Cancel</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div 
                                        onClick={onClose}
                                        className="bg-[#3457dc] flex-[1_0_0] min-h-px min-w-px relative rounded-[12px] cursor-pointer hover:bg-[#4a6dec] transition-all hover:shadow-[0_0_20px_rgba(52,87,220,0.4)] active:scale-[0.98]"
                                    >
                                        <div className="flex flex-row items-center justify-center size-full">
                                            <div className="content-stretch flex items-center justify-center px-[12px] py-[16px] relative size-full">
                                                <p className="font-['Poppins',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Publish</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PublishModal;
