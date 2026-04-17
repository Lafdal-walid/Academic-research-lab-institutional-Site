import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiAddLine, RiSubtractLine, RiExternalLinkLine } from "react-icons/ri";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const faqData = [
  {
    id: "01",
    question: "What are the team's primary research areas?",
    answer: "We focus on Big Data analysis, predictive modelling using Machine Learning, and optimizing Warehouse Management Systems (WMS) to enhance logistics efficiency through data-driven insights."
  },
  { id: "02", question: "Which technologies and frameworks do we utilize?", answer: "Our tech stack includes React.js for frontend, Node.js for backend, and Python for data science and AI. We also leverage Docker and Kubernetes for cloud orchestration." },
  { id: "03", question: "How does competitive programming influence our work?", answer: "Competitive programming sharpens our algorithm design and problem-solving speed, ensuring that the software we build is highly optimized and can handle large-scale data efficiently." },
  { id: "04", question: "Are we open to professional collaborations?", answer: "Absolutely. We collaborate with academic institutions and industry partners on research projects, technology transfer, and innovative software development." },
  { id: "05", question: "What makes our software solutions unique?", answer: "Our solutions are research-driven. We don't just build apps; we integrate advanced mathematical models and AI to solve complex industrial problems that standard software cannot address." },
  { id: "06", question: "Where can I access our publications and source code?", answer: "You can find our research papers in the 'Publications' section of this site. Most of our open-source projects are available on our official GitHub repository." }
];

const Support = () => {
  const [activeId, setActiveId] = useState("01");

  return (
    <div className="min-h-screen bg-[#020203] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative max-w-6xl mx-auto pt-32 pb-20 px-6 flex flex-col items-center">
        {/* Blue Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <span className="text-[20rem] md:text-[28rem] font-bold text-blue-600/10 blur-[80px] select-none">?</span>
        </div>

        <div className="relative z-10 text-center">
          <p className="text-blue-500 font-mono text-[10px] md:text-xs mb-4 tracking-[0.3em] uppercase opacity-80">
            — Aka. FAQ
          </p>
          <h1 className="text-5xl md:text-[84px] font-[900] tracking-tighter leading-[0.85] uppercase italic italic-sub">
            FREQUENTLY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 drop-shadow-[0_0_30px_rgba(37,99,235,0.3)]">ASKED</span> <br />
            QUESTION
          </h1>
          <p className="max-w-[280px] mx-auto mt-8 text-zinc-500 text-[13px] leading-relaxed font-medium">
            Find quick answers to the most common questions about ID Optimizer.
          </p>
        </div>

        {/* Figma Corners Decorations */}
        <div className="absolute top-48 left-10 w-10 h-10 border-t border-l border-zinc-800/50 hidden lg:block"></div>
        <div className="absolute top-48 right-10 w-10 h-10 border-t border-r border-zinc-800/50 hidden lg:block"></div>
      </section>

      {/* 2. FAQ ACCORDION SECTION (Frame 8567) */}
      <section className="max-w-[640px] mx-auto px-6 pb-20 relative z-10">
        <div className="flex flex-col gap-[20px]">
          {faqData.map((item) => (
            <div 
              key={item.id} 
              className={`transition-all duration-500 rounded-[12px] border ${
                activeId === item.id 
                ? 'border-blue-600/50 bg-[#0a0c12] shadow-[0_0_40px_rgba(37,99,235,0.05)]' 
                : 'border-zinc-800/40 bg-[#050506] hover:border-zinc-700'
              }`}
            >
              <button 
                className="w-full flex items-center p-5 text-left group"
                onClick={() => setActiveId(activeId === item.id ? null : item.id)}
              >
                <span className={`text-[11px] font-mono mr-5 transition-colors ${activeId === item.id ? 'text-blue-500' : 'text-zinc-600'}`}>
                  {item.id}
                </span>
                <span className={`flex-1 text-[15px] md:text-[16px] font-bold tracking-tight transition-colors ${activeId === item.id ? 'text-white' : 'text-zinc-300'}`}>
                  {item.question}
                </span>
                <div className="ml-4">
                   {activeId === item.id 
                    ? <RiSubtractLine className="text-blue-500 text-xl" /> 
                    : <RiAddLine className="text-zinc-500 text-xl" />
                   }
                </div>
              </button>

              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-14 pb-6">
                        <div className="h-[1px] w-full bg-white/5 mb-4"></div>
                        <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                        <span className="text-zinc-600 font-bold block mb-1 text-[10px] uppercase tracking-wider">Content:</span>
                        {item.answer}
                        </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Pagination (Figma details) */}
        <div className="flex justify-center items-center mt-10 gap-5">
          <button className="w-10 h-10 rounded-full border border-blue-600/20 flex items-center justify-center text-blue-600 hover:bg-blue-600/10 transition-all">
            <FiChevronLeft size={20} />
          </button>
          <span className="text-[11px] text-zinc-600 font-bold tracking-widest uppercase">
            <span className="text-zinc-400">{activeId || '01'}</span> out of 4
          </span>
          <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:scale-105 transition-all">
            <FiChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* 3. CONTACT CARD (Group 443) */}
      <section className="max-w-[573px] mx-auto px-6 pb-40">
        <div className="relative p-10 rounded-[24px] border border-white/[0.08] bg-gradient-to-b from-[#08080a] to-[#020203] text-center overflow-hidden group">
          
          {/* Grid Background Effect */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[grid-white_1px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"></div>

          <h3 className="text-lg md:text-xl font-bold mb-8 text-zinc-100 relative z-10">
            Didn't find the answer you were looking for?
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-[10px] flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(37,99,235,0.2)] active:scale-95">
              Contact us <RiExternalLinkLine />
            </button>
            <button className="px-7 py-3 bg-zinc-900/50 hover:bg-zinc-800 text-white text-sm font-bold rounded-[10px] border border-white/5 transition-all active:scale-95">
              Join Community
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Support;
