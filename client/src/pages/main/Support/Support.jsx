import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiAddLine, RiSubtractLine } from "react-icons/ri"; 
import './Support.css';

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
    <div>
      <h1>Support</h1>
    {/* Hero Section */}
      <section className="hero">
        <div className="corner-decor top-left"></div>
        <div className="corner-decor bottom-right"></div>
        <h1 className="hero-title">FREQUENTLY <span className="blue-glow">ASKED</span> QUESTION</h1>
        <div className="bg-mark">?</div>
      </section>

      {/* FAQ Section */}
     <div className="faq-container">
        {faqData.map((item) => (
          <div 
            key={item.id} 
            className={`faq-item ${activeId === item.id ? 'active' : ''}`}
            onClick={() => setActiveId(activeId === item.id ? null : item.id)}
          >

           <div className="faq-header">
              <span className="faq-number">{item.id}</span>
              <span className="faq-question">{item.question}</span>
              <span className="faq-icon">
                {activeId === item.id ? <RiSubtractLine /> : <RiAddLine />}
              </span>
            </div>

            <AnimatePresence>
              {activeId === item.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="faq-content"
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
     </div>
     {/* Contact Card */}
     <div className="contact-card">
       <h3>Didn't find the answer you were looking for?</h3>
       <div className="btn-group">
         <button className="btn-blue">Contact us</button>
         <button className="btn-outline">Join Community</button>
       </div>
     </div>
   </div>
  );
};

export default Support;
