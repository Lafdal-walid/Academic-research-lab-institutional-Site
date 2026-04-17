import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ExternalLink, Trophy, Award, BookOpen } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";

// Contexts & Hooks
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

// --- Sub-components ---

const MemberCard = ({ member, isRTL }) => (
    <motion.div 
        whileHover={{ y: -10 }}
        className="bg-[#16141A] border border-white/5 rounded-[24px] p-8 flex flex-col items-center text-center transition-all hover:border-blue-500/30 group"
    >
        <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
            <img 
                src={member.image} 
                alt={member.name} 
                className="w-32 h-32 rounded-full object-cover border-2 border-blue-600/50 p-1 relative z-10"
            />
        </div>
        <h3 className={`text-2xl font-bold text-white mb-2 ${isRTL ? 'font-arabic' : 'font-gilroy'}`}>
            {member.name}
        </h3>
        <p className="text-blue-500 font-medium mb-4 text-sm tracking-wide uppercase">
            {isRTL ? member.roleAr : member.role}
        </p>
        <div className="flex gap-4 mt-auto">
            <Linkedin className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
            <Github className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
        </div>
    </motion.div>
);

const ResearchTags = ({ tags }) => (
    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mt-12">
        {tags.map((tag, i) => (
            <span 
                key={i} 
                className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/70 hover:border-blue-500/50 hover:text-blue-400 transition-all cursor-default"
            >
                {tag}
            </span>
        ))}
    </div>
);

const PublicationItem = ({ pub, isRTL }) => (
    <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 flex justify-between items-center group hover:bg-[#161620] transition-all">
        <div className={isRTL ? "text-right" : "text-left"}>
            <h4 className="text-white font-semibold text-lg mb-1 group-hover:text-blue-400 transition-colors">
                {pub.title}
            </h4>
            <p className="text-white/40 text-sm">{pub.authors} • {pub.year}</p>
        </div>
        <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-white transition-colors cursor-pointer" />
    </div>
);

const ProjectCard = ({ project, isRTL }) => (
  <div className="bg-[#16141A] border border-white/5 rounded-2xl p-6 flex flex-col h-full hover:bg-[#1c1a22] transition-all">
    <div className="flex items-center text-blue-500 mb-4">
      <code className="font-bold text-2xl">{"</>"}</code>
      <span className="ml-3 text-white font-bold text-xl">{isRTL ? project.nameAr : project.name}</span>
    </div>
    <p className={`text-white/50 text-sm leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      {isRTL ? project.desc : project.descEn}
    </p>
    <div className="flex gap-4 mt-auto">
      {project.githubUrl && (
        <a href={project.githubUrl} className="flex items-center gap-2 text-blue-500 hover:text-blue-400 text-sm font-medium">
          <Github size={16} /> GitHub
        </a>
      )}
      {project.demoUrl && (
        <a href={project.demoUrl} className="flex items-center gap-2 text-blue-500 hover:text-blue-400 text-sm font-medium">
          <ExternalLink size={16} /> Demo
        </a>
      )}
    </div>
  </div>
);

const AchievementCard = ({ achievement, isRTL }) => (
  <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 flex items-center gap-5 hover:border-blue-500/30 transition-all group">
    <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
      {achievement.icon === "trophy" && <Trophy size={24} />}
      {achievement.icon === "award" && <Award size={24} />}
      {achievement.icon === "book" && <BookOpen size={24} />}
    </div>
    <div className="flex flex-col">
      <h4 className={`text-white font-bold text-lg ${isRTL ? 'font-arabic text-right' : 'font-gilroy text-left'}`}>
        {isRTL ? achievement.titleAr : achievement.titleEn}
      </h4>
      <div className={`flex items-center gap-2 text-white/40 text-sm mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span>{isRTL ? achievement.orgAr : achievement.orgEn}</span>
        {achievement.year && (
          <>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span>{achievement.year}</span>
          </>
        )}
      </div>
    </div>
  </div>
);

// --- Main TeamResearches Component ---

function TeamResearches() {
    const { language } = useLanguage(); 
    const isRTL = language === "ar";

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    // 1. Data moved inside or imported (kept inside for the demo)
    const teamMembers = [
        { name: "Prof. Ahmed Benali", role: "Lab Director", roleAr: "مدير المختبر", image: "/team/p1.jpg" },
        { name: "Dr. Sara Mansouri", role: "AI Researcher", roleAr: "باحثة دكتوراه", image: "/team/p2.jpg" },
        { name: "Youcef Kaddour", role: "PhD Candidate", roleAr: "طالب دكتوراه", image: "/team/p3.jpg" },
        { name: "Amira Cherif", role: "Data Scientist", roleAr: "عالمة بيانات", image: "/team/p4.jpg" },
        { name: "Karim Belhadj", role: "AI Engineer", roleAr: "مهندس ذكاء اصطناعي", image: "/team/p5.jpg" },
        { name: "Nour Rahal", role: "Software Engineer", roleAr: "مهندسة برمجيات", image: "/team/p6.jpg" },
    ];

    const researchAreas = isRTL 
        ? ["الذكاء الاصطناعي", "الأمن السيبراني", "تحليل البيانات", "تعلم الآلة"] 
        : ["Machine Learning", "Cybersecurity", "Data Analytics", "Cloud Computing"];

    const publications = [
        { title: "Deep Reinforcement Learning for Network Intrusion", authors: "A. Benali, S. Mansouri", year: "2024" },
        { title: "Optimizing Cloud Resource Allocation Using Genetic Algorithms", authors: "K. Belhadj, Y. Kaddour", year: "2023" },
        { title: "A Novel Approach to Arabic NLP Using Transformer Models", authors: "S. Mansouri, A. Cherif", year: "2023" },
    ];

    const projects = [
        { id: 1, name: "SecureNet AI", nameAr: "SecureNet AI", desc: "نظام ذكي لكشف التسلل في الشبكات باستخدام التعلم العميق", descEn: "Intelligent intrusion detection system using deep learning.", githubUrl: "#", demoUrl: "#" },
        { id: 2, name: "CloudOptimizer", nameAr: "CloudOptimizer", desc: "أداة لتحسين تخصيص الموارد في البيئات السحابية", descEn: "A tool for optimizing resource allocation in cloud environments.", githubUrl: "#", demoUrl: null },
        { id: 3, name: "ArabicNLP Toolkit", nameAr: "ArabicNLP Toolkit", desc: "مكتبة مفتوحة المصدر لمعالجة اللغة العربية الطبيعية", descEn: "Open-source library for Arabic Natural Language Processing.", githubUrl: "#", demoUrl: "#" }
    ];

    const achievements = [
        { id: 1, titleAr: "المركز الأول - ICPC Regional", titleEn: "1st Place - ICPC Regional", year: "2024", orgAr: "مسابقة برمجية", orgEn: "Coding Contest", icon: "trophy" },
        { id: 2, titleAr: "أفضل ورقة بحثية - IEEE", titleEn: "Best Research Paper - IEEE", year: "2023", orgAr: "مؤتمر علمي", orgEn: "Conference", icon: "award" },
        { id: 3, titleAr: "تمويل بحثي - وزارة التعليم", titleEn: "Research Grant - Ministry", year: "2024", orgAr: "", orgEn: "", icon: "book" },
        { id: 4, titleAr: "جائزة أفضل مشروع - Hackathon", titleEn: "Best Project Award - Hackathon", year: "2024", orgAr: "", orgEn: "", icon: "trophy" }
    ];

    return (
        <main className="bg-[#05030D] min-h-screen pt-24 pb-20 overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
            {/* Hero Section */}
            <section className="container mx-auto px-6 text-center mb-24" data-aos="fade-up">
                <h1 className={`text-5xl lg:text-7xl font-extrabold text-white mb-6 ${isRTL ? 'font-arabic' : 'font-gilroy'}`}>
                    <span className="text-blue-600">Data Science</span> Research Team
                </h1>
                <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
                    {isRTL 
                        ? "نحن فريق بحثي متخصص في الابتكار التقني وتطوير حلول الذكاء الاصطناعي لمواجهة تحديات العصر."
                        : "We are a research team specialized in technical innovation and developing AI solutions to meet modern challenges."}
                </p>
                <ResearchTags tags={researchAreas} />
            </section>

            {/* Members Grid */}
            <section className="container mx-auto px-6 mb-32">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((m, i) => (
                        <div key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                            <MemberCard member={m} isRTL={isRTL} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Publications */}
            <section className="container mx-auto px-6 mb-32">
                <h2 className={`text-3xl font-bold text-white mb-10 ${isRTL ? 'font-arabic' : 'font-gilroy'}`}>
                    {isRTL ? "المنشورات العلمية" : "Recent Publications"}
                </h2>
                <div className="space-y-4 max-w-5xl">
                    {publications.map((pub, i) => (
                        <div key={i} data-aos="fade-right" data-aos-delay={i * 50}>
                            <PublicationItem pub={pub} isRTL={isRTL} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects */}
            <section className="container mx-auto px-6 mb-32">
                <h2 className={`text-3xl font-bold text-white mb-10 ${isRTL ? 'font-arabic' : 'font-gilroy'}`}>
                    {isRTL ? "المشاريع" : "Projects"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((p, i) => (
                        <div key={p.id} data-aos="zoom-in" data-aos-delay={i * 100}>
                            <ProjectCard project={p} isRTL={isRTL} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Achievements */}
            <section className="container mx-auto px-6">
                <h2 className={`text-3xl font-bold text-white mb-10 ${isRTL ? 'font-arabic' : 'font-gilroy'}`}>
                    {isRTL ? "الإنجازات والجوائز" : "Achievements"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
                    {achievements.map((item, i) => (
                        <div key={item.id} data-aos="fade-up" data-aos-delay={i * 100}>
                            <AchievementCard achievement={item} isRTL={isRTL} />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default TeamResearches;
