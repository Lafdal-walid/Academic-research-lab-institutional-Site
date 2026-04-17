import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiAddLine, RiSubtractLine } from "react-icons/ri"; 

const faqData = [
  {
    id: "01",
    question: "What are the team's primary research areas?",
    answer: "We focus on Big Data analysis, predictive modelling using Machine Learning, and optimizing Warehouse Management Systems (WMS) to enhance logistics efficiency through data-driven insights."
  },
  { id: "02", question: "Which technologies and frameworks do we utilize?", answer: "React, Node.js, Python, and various AI frameworks." },
  { id: "03", question: "How does competitive programming influence our work?", answer: "It sharpens our problem-solving skills and algorithm efficiency." }
];

const Support = () => {
  const [activeId, setActiveId] = useState("01");
  
  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 px-4 font-sans selection:bg-blue-500/30">
      
    {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center mb-24">
        {/* Corner Accents (Decorative) */}
        <div className="absolute top-0 left-1/4 w-32 h-[2px] bg-blue-600 blur-sm hidden md:block"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-[2px] bg-blue-600 blur-sm hidden md:block"></div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none z-10">
          FREQUENTLY <br /> 
          <span className="text-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.6)]">ASKED</span> QUESTION
        </h1>
        
        {/* Large Question Mark Background */}
        <div className="absolute inset-0 flex items-center justify-center -z-0">
          <span className="text-[15rem] md:text-[20rem] font-bold text-blue-700/10 blur-[2px] select-none">?</span>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item) => (
          <div 
            key={item.id} 
            className={`group border rounded-xl transition-all duration-300 ${
              activeId === item.id ? 'border-blue-600 bg-[#0d0d0d]' : 'border-white/10 bg-[#080808] hover:border-white/20'
            }`}
          >
            <button 
              className="w-full flex items-center gap-6 p-6 text-left focus:outline-none"
              onClick={() => setActiveId(activeId === item.id ? null : item.id)}
            >
              <span className={`text-sm font-mono transition-colors ${activeId === item.id ? 'text-blue-500' : 'text-zinc-600'}`}>
                {item.id}
              </span>
              <span className="flex-1 font-semibold text-lg md:text-xl tracking-tight text-zinc-200">
                {item.question}
              </span>
              <span className={`text-2xl transition-transform duration-300 ${activeId === item.id ? 'rotate-180 text-blue-500' : 'text-zinc-500'}`}>
                {activeId === item.id ? <RiSubtractLine /> : <RiAddLine />}
              </span>
            </button>

            <AnimatePresence>
              {activeId === item.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0 ml-11 text-zinc-400 leading-relaxed border-t border-white/5 mt-2 py-4">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Contact Card */}
      <section className="max-w-3xl mx-auto mt-32">
        <div className="relative p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a0a0a] to-[#050505] overflow-hidden text-center">
          {/* Subtle Glow Background */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
          
          <h3 className="text-2xl font-bold mb-8 relative z-10 text-zinc-200">
            Didn't find the answer you were looking for?
          </h3>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              Contact us
            </button>
            <button className="px-8 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold rounded-lg transition-all active:scale-95">
              Join Community
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
