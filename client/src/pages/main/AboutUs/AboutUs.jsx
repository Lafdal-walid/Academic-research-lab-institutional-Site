import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiAddLine, RiSubtractLine, RiExternalLinkLine, RiInstagramLine, RiTwitterXLine, RiDiscordFill, RiYoutubeFill } from "react-icons/ri";
import { FiChevronLeft, FiChevronRight, FiMail } from "react-icons/fi";

const AboutUs = () => {
  const [activeId, setActiveId] = useState("01");

  return (
    <div className="min-h-screen bg-[#020203] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* --- 1. ABOUT US HERO (Section 1920x396) --- */}
      <section className="relative w-full h-[396px] flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1d4ed810_0%,transparent_70%)]"></div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-500">من نحن</h2>
        <p className="max-w-2xl text-zinc-400 text-sm leading-relaxed">
          مختبر بحثي أكاديمي متخصص في علوم الحاسوب والذكاء الاصطناعي، يضم نخبة من الباحثين والمهندسين الملتزمين بالتميز العلمي والابتكار التقني.
        </p>
      </section>

      {/* --- 2. STATS CARDS (896x170) --- */}
      <section className="max-w-[896px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-6 mb-32">
        {[
          { label: "باحث ومهندس", val: "+30" },
          { label: "ورقة بحثية منشورة", val: "+50" },
          { label: "مشروع بحثي", val: "+20" },
          { label: "جائزة وإنجاز", val: "+15" }
        ].map((stat, i) => (
          <div key={i} className="bg-[#050506] border border-white/5 p-6 rounded-xl text-center hover:border-blue-500/30 transition-all">
            <div className="text-2xl font-black text-white mb-1">{stat.val}</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* --- 3. MISSION & VISION (Cards 325x246) --- */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mb-40">
        {[
          { title: "قيمنا", text: "الابتكار، التعاون، الشفافية، والتميز الأكاديمي. نؤمن بأن البحث العلمي الجيد يبدأ من فريق متماسك ومتخصص." },
          { title: "رؤيتنا", text: "أن نكون مختبراً بحثياً رائداً في مجالات الذاء الاصطناعي وعلوم البيانات على المستوى الإقليمي والدولي." },
          { title: "مهمتنا", text: "تطوير حلول تقنية مبتكرة من خلال البحث العلمي الأكاديمي والتطبيقي، والمساهمة في بناء مجتمع معرفي متقدم." }
        ].map((card, i) => (
          <div key={i} className="w-full md:w-[325px] h-[246px] mx-auto p-8 rounded-[12px] border border-[#2E2E38] bg-[#050506] flex flex-col justify-center text-center group hover:bg-[#08080a] transition-all">
            <h4 className="text-lg font-bold mb-4 text-blue-500">{card.title}</h4>
            <p className="text-zinc-500 text-xs leading-relaxed">{card.text}</p>
          </div>
        ))}
      </section>

      {/* --- 4. TIMELINE SECTION (مسيرتنا) --- */}
      <section className="max-w-4xl mx-auto px-6 mb-40 text-center">
        <h3 className="text-2xl font-bold mb-16 text-blue-500">مسيرتنا</h3>
        <div className="relative border-r border-blue-500/20 pr-8 space-y-12 text-right">
          {[
            { year: "2018", text: "تأسيس المختبر البحثي" },
            { year: "2019", text: "أول ورقة بحثية منشورة في مؤتمر IEEE" },
            { year: "2021", text: "الحصول على تمويل من وزارة التعليم العالي" },
            { year: "2024", text: "نشر أكثر من 50 ورقة بحثية محكمة" }
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -right-[41px] top-1 w-4 h-4 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
              <span className="text-blue-500 font-mono font-bold block mb-1">{item.year}</span>
              <p className="text-zinc-300 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. CONTACT CTA (Section 1920x374) --- */}
      <section className="w-full h-[374px] bg-[#050506] border-y border-white/5 flex flex-col items-center justify-center text-center px-6 mb-40">
        <h2 className="text-3xl font-bold mb-6">تواصل معنا</h2>
        <p className="text-zinc-500 text-sm mb-8">نرحب بالتعاون الأكاديمي والمهني</p>
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-blue-600 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all">تعرف على فريقنا البحثي</button>
          <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-lg font-bold text-sm hover:bg-white/10 transition-all">المنشورات البحثية</button>
        </div>
        <div className="mt-6 flex items-center gap-2 text-zinc-500 text-xs">
          <FiMail className="text-blue-500" /> lab@university.dz
        </div>
      </section>

      {/* --- 6. FOOTER (Exact Figma Layout) --- */}
      <footer className="w-full bg-[#121014] pt-20 pb-10 px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <span className="font-bold tracking-tighter text-xl">Saad Dahlab</span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-xs mb-8">
              Advanced scientific research platform designed to accelerate discovery without complexity.
            </p>
            <div className="flex gap-4 text-zinc-400">
              <RiDiscordFill className="hover:text-white cursor-pointer transition-colors" size={20} />
              <RiTwitterXLine className="hover:text-white cursor-pointer transition-colors" size={18} />
              <RiYoutubeFill className="hover:text-white cursor-pointer transition-colors" size={20} />
              <RiInstagramLine className="hover:text-white cursor-pointer transition-colors" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h5 className="font-bold text-sm mb-6">Quick Links</h5>
              <ul className="text-zinc-500 text-xs space-y-4">
                <li className="hover:text-blue-500 cursor-pointer transition-colors">News & Gallery</li>
                <li className="hover:text-blue-500 cursor-pointer transition-colors">Publications</li>
                <li className="hover:text-blue-500 cursor-pointer transition-colors">Teams Researches</li>
                <li className="hover:text-blue-500 cursor-pointer transition-colors">About Us</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-sm mb-6">Support</h5>
              <ul className="text-zinc-500 text-xs space-y-4">
                <li className="hover:text-blue-500 cursor-pointer transition-colors">Contact us</li>
                <li className="hover:text-blue-500 cursor-pointer transition-colors">FAQ</li>
                <li className="hover:text-blue-500 cursor-pointer transition-colors">Suggestions</li>
                <li className="text-blue-500 font-medium">oualidlafdal50@gmail.com ↗</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600 font-medium">
          <p>© Oualid Lafdal . All rights reserved.</p>
          <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="hover:text-white transition-colors uppercase tracking-widest">Go Up ↑</button>
          <div className="flex gap-6 uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer">Privacy policy</span>
            <span className="hover:text-white cursor-pointer">Terms & conditions</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
