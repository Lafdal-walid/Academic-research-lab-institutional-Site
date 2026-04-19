import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Cpu, Trophy, Mail, MapPin, ChevronRight, ChevronLeft, ArrowUpRight, Rocket, Eye, Globe } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

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
  <div className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-[24px] p-8 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-500 group ${className}`}>
    {children}
  </div>
);

export default function AboutUs() {
  const { language } = useLanguage();
  const isRTL = language === "ar";
  const [dynamicTimeline, setDynamicTimeline] = useState([]);

  const text = {
    badge: isRTL ? 'التميز الأكاديمي' : 'Academic Excellence',
    title: isRTL ? 'من نحن' : 'About Us',
    description: isRTL 
      ? 'مختبر أبحاث أكاديمي متخصص في علوم الحاسوب والذكاء الاصطناعي، يجمع نخبة من الباحثين والمهندسين الملتزمين بالتميز العلمي والابتكار التقني.'
      : 'An academic research lab specializing in computer science and artificial intelligence, bringing together elite researchers and engineers committed to scientific excellence and technical innovation.',
    strategicGoals: isRTL ? 'الأهداف الاستراتيجية' : 'Strategic Goals',
    visionSubtitle: isRTL ? 'الرؤية التي تدفعنا نحو المستقبل' : 'The vision that drives us towards the future',
    journeyTitle: isRTL ? 'مسيرتنا' : 'Our Journey',
    journeySubtitle: isRTL ? 'محطات رئيسية في تاريخ المختبر' : 'Key milestones in the laboratory history',
    contactTitle: isRTL ? 'اتصل بنا' : 'Contact Us',
    contactSubtitle: isRTL ? 'نرحب بالتعاون الأكاديمي والمهني ونسعى لتوسيع آفاق الابتكار مع شركائنا حول العالم.' : 'We welcome academic and professional collaboration and seek to expand the horizons of innovation with our partners worldwide.',
    universityName: isRTL ? 'جامعة البليدة 1 - سعد دحلب' : 'University of Blida 1 - Saad Dahlab',
    joinTeam: isRTL ? 'انضم لفريقنا البحثي' : 'Join our research team',
    contactBtn: isRTL ? 'اتصل بنا' : 'Contact Us',
    labFoundation: isRTL ? 'تأسيس المختبر' : 'Lab Foundation',
    labFoundationDesc: isRTL ? 'نقطة الانطلاق برؤية أكاديمية طموحة.' : 'Starting the journey with an ambitious academic vision.',
    teamFoundedSuffix: isRTL ? 'تأسيس فريق' : 'Team Founded',
    focusPrefix: isRTL ? 'التركيز على' : 'Focusing on',
    ledByPrefix: isRTL ? 'بقيادة' : 'Led by',
    expertResearchers: isRTL ? 'خبراء وباحثين' : 'expert researchers'
  };

  const staticTimeline = [
    { year: "2018", title: text.labFoundation, desc: text.labFoundationDesc }
  ];

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
        const res = await fetch(`${baseUrl}/api/teams`);
        if (res.ok) {
          const teamsData = await res.json();
          // Map teams to timeline entries
          const teamMilestones = teamsData.map(team => ({
            year: team.createdAt ? new Date(team.createdAt).getFullYear().toString() : "2024",
            title: isRTL ? `تأسيس فريق ${team.name}` : `${team.name} Team Founded`,
            desc: isRTL 
              ? `التركيز على ${team.focus}. بقيادة ${team.leader?.username || text.expertResearchers}.`
              : `Focusing on ${team.focus}. Led by ${team.leader?.username || text.expertResearchers}.`,
            isDynamic: true
          }));

          // Merge and sort by year
          const merged = [...staticTimeline, ...teamMilestones].sort((a, b) => parseInt(a.year) - parseInt(b.year));
          setDynamicTimeline(merged);
        } else {
          setDynamicTimeline(staticTimeline);
        }
      } catch (err) {
        console.error("Failed to fetch teams for timeline", err);
        setDynamicTimeline(staticTimeline);
      }
    };
    fetchTeams();
  }, [language, isRTL]);

  const timeline = dynamicTimeline.length > 0 ? dynamicTimeline : staticTimeline;

  const stats = [
    { icon: Users, value: "30+", label: isRTL ? 'باحثين ومهندسين' : "Researchers & Engineers", color: "text-blue-500" },
    { icon: BookOpen, value: "50+", label: isRTL ? 'أوراق علمية منشورة' : "Published Papers", color: "text-indigo-500" },
    { icon: Cpu, value: "20+", label: isRTL ? 'مشاريع بحثية' : "Research Projects", color: "text-cyan-500" },
    { icon: Trophy, value: "15+", label: isRTL ? 'جوائز وإنجازات' : "Awards & Achievements", color: "text-blue-400" }
  ];

  const values = [
    { 
      icon: Rocket, 
      title: isRTL ? 'مهمتنا' : "Our Mission", 
      text: isRTL ? 'تطوير حلول تقنية مبتكرة للمجتمع.' : "Developing innovative tech solutions for society.", 
      desc: isRTL 
        ? "نسعى لتقديم أحدث التقنيات والحلول الذكية التي تساهم في حل التحديات الحديثة." 
        : "We strive to provide the latest technologies and smart solutions that contribute to solving modern challenges." 
    },
    { 
      icon: Eye, 
      title: isRTL ? 'رؤيتنا' : "Our Vision", 
      text: isRTL ? 'أن نكون مختبر أبحاث عالمياً رائداً.' : "To be a leading global research laboratory.", 
      desc: isRTL 
        ? "نهدف للوصول للتميز العالمي في مجالات علوم الحاسوب والذكاء الاصطناعي." 
        : "We aim to reach global excellence in the fields of computer science and artificial intelligence." 
    },
    { 
      icon: Globe, 
      title: isRTL ? 'قيمنا' : "Our Values", 
      text: isRTL ? 'الابتكار، التعاون، والتميز الأكاديمي.' : "Innovation, Collaboration, and Academic Excellence.", 
      desc: isRTL 
        ? "نؤمن بأن التعاون بين العقول المتميزة هو السبيل الوحيد لتحقيق الابتكار المستدام." 
        : "We believe that collaboration among elite minds is the only way to achieve sustainable innovation." 
    }
  ];

  return (
    <div className={`w-full bg-[#05030D] text-white selection:bg-blue-500/30 overflow-x-hidden pt-20 ${isRTL ? 'font-tajawal' : 'font-poppins'}`} dir={isRTL ? "rtl" : "ltr"}>

      {/* 1. HERO SECTION */}
      <section className="relative w-full py-32 md:py-48 px-6 flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen opacity-30 pointer-events-none" />

        <div className="container mx-auto max-w-[1200px] text-center relative z-10">
          <FadeIn>
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#3457DC] text-[12px] font-bold tracking-[0.2em] mb-6 uppercase">
              {text.badge}
            </span>
            <h1 className="font-gilroy font-black text-[60px] md:text-[90px] leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-500/50">
              {text.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-[#7b829d] text-[20px] md:text-[24px] leading-relaxed max-w-4xl mx-auto">
              {text.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="w-full py-32 relative z-20">
        <div className="container mx-auto px-6 max-w-[1240px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <GlassCard className="text-center group">
                  <div className={`mb-6 flex justify-center`}>
                    <stat.icon size={32} className={`${stat.color} group-hover:scale-110 transition-transform duration-500`} />
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 font-gilroy tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[#7b829d] text-sm uppercase tracking-widest font-bold">
                    {stat.label}
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION GRID */}
      <section className="w-full py-32 bg-[#070710]/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-6 max-w-[1240px] relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-gilroy font-black mb-4">{text.strategicGoals}</h2>
            <p className="text-[#7b829d] text-lg">{text.visionSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {values.map((item, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <GlassCard className="h-full flex flex-col items-center text-center">
                  <div className="bg-blue-600/10 p-5 rounded-2xl mb-8 group-hover:bg-blue-600 transition-colors duration-500">
                    <item.icon className="text-[#395ED5] group-hover:text-white" size={30} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-blue-500 font-semibold mb-4 italic text-sm">{item.text}</p>
                  <p className="text-[#a5a5b2] text-[15px] leading-relaxed">{item.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR JOURNEY */}
      <section className="w-full py-40 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-[1000px]">
          <div className="text-center mb-32">
            <h2 className="text-5xl font-gilroy font-black mb-4 tracking-tight">{text.journeyTitle}</h2>
            <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full" />
            <p className="text-[#7b829d] mt-8 text-xl">{text.journeySubtitle}</p>
          </div>

          <div className="relative">
            <div className={`absolute ${isRTL ? 'right-[20px] md:right-1/2 translate-x-1/2' : 'left-[20px] md:left-1/2 -translate-x-1/2'} top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-600 via-blue-500/20 to-transparent`} />

            <div className="space-y-24">
              {timeline.map((item, i) => (
                <FadeIn key={i} direction={i % 2 === 0 ? (isRTL ? "left" : "right") : (isRTL ? "right" : "left")}>
                  <div className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`absolute ${isRTL ? 'right-[20px] md:right-1/2 translate-x-1/2' : 'left-[20px] md:left-1/2 -translate-x-1/2'} size-[12px] bg-blue-600 rounded-full shadow-[0_0_20px_#395ED5] z-10`} />
                    <div className={`w-full md:w-1/2 flex ${i % 2 === 0 ? (isRTL ? 'md:justify-end md:pr-20' : 'md:justify-start md:pl-20') : (isRTL ? 'md:justify-start md:pl-20' : 'md:justify-end md:pr-20')}`}>
                      <div className="text-3xl font-black font-gilroy text-[#395ED5]/80">{item.year}</div>
                    </div>
                    <div className={`w-full md:w-1/2 mt-4 md:mt-0 ${i % 2 === 0 ? (isRTL ? 'md:pl-20' : 'md:pr-20') : (isRTL ? 'md:pr-20' : 'md:pl-20')}`}>
                      <GlassCard className={`!p-6 group-hover:scale-[1.02] ${item.isDynamic ? 'border-blue-500/40 bg-blue-500/5' : ''}`}>
                        <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                        <p className="text-[#7b829d] text-sm leading-relaxed">{item.desc}</p>
                      </GlassCard>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT CTA */}
      <section className="w-full py-40 bg-[#070710] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-[1200px] text-center relative z-10">
          <FadeIn>
            <h2 className="text-5xl md:text-6xl font-gilroy font-black text-white mb-8">{text.contactTitle}</h2>
            <p className="text-[#7b829d] text-xl mb-16 max-w-2xl mx-auto">{text.contactSubtitle}</p>
          </FadeIn>

          <div className="flex flex-col md:flex-row justify-center gap-12 mb-20">
            <div className="flex items-center gap-4 bg-white/[0.03] px-8 py-4 rounded-2xl border border-white/[0.05]">
              <Mail className="text-blue-500" />
              <span className="text-white font-medium uppercase tracking-widest text-sm">lab@university.dz</span>
            </div>
            <div className="flex items-center gap-4 bg-white/[0.03] px-8 py-4 rounded-2xl border border-white/[0.05]">
              <MapPin className="text-blue-500" />
              <span className="text-white font-medium text-sm">{text.universityName}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#3457DC] text-white px-10 py-5 rounded-[18px] font-bold text-lg flex items-center gap-3 shadow-2xl shadow-blue-500/20 group"
            >
              <span>{text.joinTeam}</span>
              <ArrowUpRight size={20} className={`${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} group-hover:-translate-y-1 transition-transform`} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-[18px] font-bold text-lg flex items-center gap-3 hover:bg-white/10 transition-all"
            >
              <span>{text.contactBtn}</span>
              {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
