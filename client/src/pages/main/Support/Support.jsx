import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronLeft, ChevronRight, Mail, MessageSquare, Shield, Globe, HelpCircle } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";

// Contexts & Hooks
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

const FadeIn = ({ children, delay = 0, direction = 'up' }) => (
  <motion.div
    initial={{ opacity: 0, y: direction === 'up' ? 30 : 0, x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0 }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-[24px] overflow-hidden hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-500 group ${className}`}>
    {children}
  </div>
);

const FAQItem = ({ question, answer, isOpen, onClick, index, isRTL }) => (
  <motion.div 
    layout
    className="mb-4"
  >
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/[0.06] transition-all group ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
    >
      <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span className="text-blue-500/40 font-mono font-bold text-lg">{String(index + 1).padStart(2, '0')}</span>
        <span className="text-white text-lg font-semibold tracking-tight">{question}</span>
      </div>
      <div className={`shrink-0 flex items-center justify-center size-10 rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all ${isOpen ? 'rotate-180' : ''}`}>
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className={`p-8 bg-white/[0.01] border-x border-b border-white/[0.05] rounded-b-2xl text-[#7b829d] text-[16px] leading-relaxed mx-2`} dir={isRTL ? 'rtl' : 'ltr'}>
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default function Support() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [openIndex, setOpenIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const allFaqs = [
    { 
        question: isRTL ? 'ما هي مجالات البحث الرئيسية للفريق؟' : 'What are the team\'s primary research areas?', 
        answer: isRTL ? 'نحن نركز على تحليل البيانات الضخمة، والنمذجة التنبؤية باستخدام التعلم الآلي، وتحسين أنظمة إدارة المستودعات (WMS) لتعزيز كفاءة الخدمات اللوجستية من خلال الرؤى القائمة على البيانات.' : 'We focus on Big Data analysis, predictive modeling using Machine Learning, and optimizing Warehouse Management Systems (WMS) to enhance logistics efficiency through data-driven insights.' 
    },
    { 
        question: isRTL ? 'ما هي التقنيات وأطر العمل التي نستخدمها؟' : 'Which technologies and frameworks do we utilize?', 
        answer: isRTL ? 'نحن نستخدم مجموعة متنوعة من التقنيات الحديثة بما في ذلك React وNode.js وPython ومختلف أطر عمل الذكاء الاصطناعي لتطوير حلول برمجية متطورة.' : 'We utilize a variety of modern technologies including React, Node.js, Python, and various AI frameworks to develop cutting-edge software solutions.' 
    },
    { 
        question: isRTL ? 'كيف تؤثر البرمجة التنافسية على عملنا؟' : 'How does competitive programming influence our work?', 
        answer: isRTL ? 'تساهم البرمجة التنافسية في صقل مهاراتنا في حل المشكلات، تحسين كفاءة الخوارزميات، والقدرة على كتابة كود برمج نظيف وسريع الأداء تحت ضغط الوقت.' : 'Competitive programming helps sharpen our problem-solving skills, improves algorithmic efficiency, and enables us to write clean, high-performance code under time pressure.' 
    },
    { 
        question: isRTL ? 'هل نحن منفتحون على التعاون المهني؟' : 'Are we open to professional collaborations?', 
        answer: isRTL ? 'نعم، نحن دائماً نتطلع للعمل مع شركاء الصناعة والباحثين الأكاديمييين لتطوير حلول مبتكرة قابلة للتطوير في مختلف المجالات التقنية.' : 'Yes, we are always looking to collaborate with industry partners and academic researchers to develop innovative and scalable solutions across various tech domains.' 
    },
    { 
        question: isRTL ? 'ما الذي يجعل حلولنا البرمجية فريدة؟' : 'What makes our software solutions unique?', 
        answer: isRTL ? 'تعتمد حلولنا على أبحاث أكاديمية رصينة ويتم اختبارها في بيئات حقيقية لضمان أقصى درجات الموثوقية والكفاءة، مع التركيز على تجربة المستخدم النهائية.' : 'Our solutions are grounded in robust academic research and tested in real-world environments to ensure maximum reliability and efficiency, with a strong focus on the end-user experience.' 
    },
    { 
        question: isRTL ? 'أين يمكنني الوصول إلى منشوراتنا وأكواد المصدر؟' : 'Where can I access our publications and source code?', 
        answer: isRTL ? 'يمكنك العثور على منشوراتنا في المجلات العلمية المرموقة عبر صفحة المنشورات، بينما تتوفر معظم مشاريعنا مفتوحة المصدر على جسابنا في GitHub.' : 'You can find our publications in prestigious scientific journals via our Publications page, and most of our open-source projects are available on our GitHub account.' 
    },
  ];

  const totalPages = Math.ceil(allFaqs.length / itemsPerPage);
  const currentFaqs = allFaqs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full bg-[#05030D] text-white selection:bg-blue-500/30 overflow-x-hidden pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full py-32 px-6 flex flex-col items-center justify-center border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[100px] opacity-30 rounded-full" />
        
        <div className="container mx-auto max-w-[1240px] text-center relative z-10">
          <FadeIn>
             <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-8 bg-blue-500" />
                <span className="text-[#3457DC] text-xs font-bold uppercase tracking-[0.3em]">Help & Support</span>
                <span className="h-px w-8 bg-blue-500" />
             </div>
             <h1 className="font-gilroy font-black text-[56px] md:text-[80px] leading-tight mb-8" dir={isRTL ? 'rtl' : 'ltr'}>
                {isRTL ? 'الأسئلة الأكثر شيوعًا' : 'Frequently Asked Questions'}
             </h1>
             <p className="text-[#7b829d] text-xl max-w-2xl mx-auto leading-relaxed" dir={isRTL ? 'rtl' : 'ltr'}>
                {isRTL ? 'كل ما تود معرفته عن مختبرنا البحثي، مشاريعنا، وطرق التعاون معنا في مكان واحد.' : 'Everything you need to know about our research lab, projects, and how to collaborate with us in one place.'}
             </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. FAQ ACCORDION SECTION */}
      <section className="w-full py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-[900px]">
          <div className="flex flex-col">
            {currentFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                index={(currentPage - 1) * itemsPerPage + index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === (currentPage - 1) * itemsPerPage + index}
                onClick={() => setOpenIndex(openIndex === (currentPage - 1) * itemsPerPage + index ? null : (currentPage - 1) * itemsPerPage + index)}
                isRTL={isRTL}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-12 py-8 border-t border-white/5">
             <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="size-12 rounded-full bg-[#3457DC] flex items-center justify-center hover:scale-110 active:scale-95 disabled:opacity-20 disabled:hover:scale-100 transition-all shadow-lg shadow-blue-500/20"
             >
                {isRTL ? <ChevronRight /> : <ChevronLeft />}
             </button>
             
             <div className="flex items-center gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 font-bold text-white">
                    {String(currentPage).padStart(2, '0')}
                </div>
                <span className="text-[#7b829d] text-sm">of {totalPages}</span>
             </div>

             <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="size-12 rounded-full bg-[#3457DC] flex items-center justify-center hover:scale-110 active:scale-95 disabled:opacity-20 disabled:hover:scale-100 transition-all shadow-lg shadow-blue-500/20"
             >
                {isRTL ? <ChevronLeft /> : <ChevronRight />}
             </button>
          </div>
        </div>
      </section>

      {/* 3. CONTACT CARDS & FOOTER TRANSITION */}
      <section className="w-full bg-[#070710] py-32 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-6 max-w-[1240px] relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-gilroy font-black mb-4" dir={isRTL ? 'rtl' : 'ltr'}>
                {isRTL ? 'ما زلت بحاجة للمساعدة؟' : 'Still Need Help?'}
            </h2>
            <p className="text-[#7b829d] text-lg">{isRTL ? 'فريقنا متاح دائماً للإجابة على استفساراتكم.' : 'Our team is always available to answer your inquiries.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <GlassCard className="p-10 flex flex-col items-center text-center group">
                 <div className="bg-blue-600/10 p-5 rounded-2xl mb-6 group-hover:bg-blue-600 transition-all">
                    <Mail className="text-[#395ED5] group-hover:text-white" size={28} />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Email Support</h3>
                 <p className="text-[#7b829d] text-sm mb-6">Response within 24 hours</p>
                 <a href="mailto:lab@university.dz" className="text-blue-500 font-bold hover:underline">lab@university.dz</a>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <GlassCard className="p-10 flex flex-col items-center text-center group border-blue-500/20 bg-blue-500/[0.05]">
                 <div className="bg-blue-600 p-5 rounded-2xl mb-6">
                    <MessageSquare className="text-white" size={28} />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Community</h3>
                 <p className="text-[#7b829d] text-sm mb-6">Join our discussion board</p>
                 <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">Join Discord</button>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={0.3}>
              <GlassCard className="p-10 flex flex-col items-center text-center group">
                 <div className="bg-blue-600/10 p-5 rounded-2xl mb-6 group-hover:bg-blue-600 transition-all">
                    <Globe className="text-[#395ED5] group-hover:text-white" size={28} />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Socials</h3>
                 <p className="text-[#7b829d] text-sm mb-6">Follow our latest news</p>
                 <div className="flex gap-4">
                    <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer"><span className="text-xs font-bold">In</span></div>
                    <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer"><span className="text-xs font-bold">X</span></div>
                 </div>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
