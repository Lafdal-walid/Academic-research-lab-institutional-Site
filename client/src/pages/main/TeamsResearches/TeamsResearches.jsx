import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Users as UsersIcon, Calendar as CalendarIcon, Trophy, Award, BookOpen, Cpu, Shield, BarChart3, Cloud, ChevronLeft, ChevronRight } from 'lucide-react';

const svgPaths = {
  p11263c80: "M10.5 7.58333V11.0833C10.5 11.3928 10.3771 11.6895 10.1583 11.9083C9.9395 12.1271 9.64275 12.25 9.33333 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V4.66667C1.75 4.35725 1.87292 4.0605 2.09171 3.84171C2.3105 3.62292 2.60725 3.5 2.91667 3.5H6.41667",
  p164f7540: "M12.8975 10.7417L14.16 17.8467C14.1741 17.9303 14.1624 18.0163 14.1264 18.0931C14.0903 18.1699 14.0317 18.2339 13.9583 18.2765C13.8849 18.3191 13.8002 18.3382 13.7157 18.3314C13.6311 18.3246 13.5506 18.2921 13.485 18.2383L10.5017 15.9992C10.3576 15.8916 10.1827 15.8334 10.0029 15.8334C9.82314 15.8334 9.64819 15.8916 9.50417 15.9992L6.51583 18.2375C6.45027 18.2912 6.36988 18.3236 6.28541 18.3305C6.20094 18.3373 6.11639 18.3182 6.04305 18.2757C5.96971 18.2333 5.91106 18.1694 5.87493 18.0928C5.8388 18.0161 5.82691 17.9303 5.84083 17.8467L7.1025 10.7417",
  p18544000: "M5 7.5H3.75C3.19747 7.5 2.66756 7.28051 2.27686 6.88981C1.88616 6.49911 1.66667 5.9692 1.66667 5.41667C1.66667 4.86413 1.88616 4.33423 2.27686 3.94353C2.66756 3.55283 3.19747 3.33333 3.75 3.33333H5",
  p1ae07a80: "M8.33333 12.2167V14.1667C8.33333 14.625 7.94167 14.9833 7.525 15.175C6.54167 15.625 5.83333 16.8667 5.83333 18.3333",
  p1ba6af80: "M11.6667 12.2167V14.1667C11.6667 14.625 12.0583 14.9833 12.475 15.175C13.4583 15.625 14.1667 16.8667 14.1667 18.3333",
  p25713000: "M2.5 15C2.27899 15 2.06702 14.9122 1.91074 14.7559C1.75446 14.5996 1.66667 14.3877 1.66667 14.1667V3.33333C1.66667 3.11232 1.75446 2.90036 1.91074 2.74408C2.06702 2.5878 2.27899 2.5 2.5 2.5H6.66667C7.55072 2.5 8.39857 2.85119 9.02369 3.47631C9.64881 4.10143 10 4.94928 10 5.83333C10 4.94928 10.3512 4.10143 10.9763 3.47631C11.6014 2.85119 12.4493 2.5 13.3333 2.5H17.5C17.721 2.5 17.933 2.5878 18.0893 2.74408C18.2455 2.90036 18.3333 3.11232 18.3333 3.33333V14.1667C18.3333 14.3877 18.2455 14.5996 18.0893 14.7559C17.933 14.9122 17.721 15 17.5 15H12.5C11.837 15 11.2011 15.2634 10.7322 15.7322C10.2634 16.2011 10 16.837 10 17.5C10 16.837 9.73661 16.2011 9.26777 15.7322C8.79893 15.2634 8.16304 15 7.5 15H2.5Z",
  p25b05a00: "M8.75 12.8333V10.5C8.83115 9.76925 8.62163 9.03591 8.16667 8.45833C9.91667 8.45833 11.6667 7.29167 11.6667 5.25C11.7133 4.52083 11.5092 3.80333 11.0833 3.20833C11.2467 2.5375 11.2467 1.8375 11.0833 1.16667C11.0833 1.16667 10.5 1.16667 9.33333 2.04167C7.79333 1.75 6.20667 1.75 4.66667 2.04167C3.5 1.16667 2.91667 1.16667 2.91667 1.16667C2.74167 1.8375 2.74167 2.5375 2.91667 3.20833C2.49193 3.80093 2.28578 4.52246 2.33333 5.25C2.33333 7.29167 4.08333 8.45833 5.83333 8.45833C5.60583 8.74417 5.43667 9.07083 5.3375 9.42083C5.23833 9.77083 5.20917 10.1383 5.25 10.5V12.8333",
  p2900b400: "M5.00022 0.833556L0.833556 14.1669",
  p2b6e5880: "M4.16667 0.833333L0.833333 4.16667L4.16667 7.5",
  p312978e0: "M15 7.5H16.25C16.8025 7.5 17.3324 7.28051 17.7231 6.88981C18.1138 6.49911 18.3333 5.9692 18.3333 5.41667C18.3333 4.86413 18.1138 4.33423 17.7231 3.94353C17.3324 3.55283 16.8025 3.33333 16.25 3.33333H15",
  p31ca8d80: "M15 1.66667H5V7.5C5 8.82608 5.52678 10.0979 6.46447 11.0355C7.40215 11.9732 8.67392 12.5 10 12.5C11.3261 12.5 12.5979 11.9732 13.5355 11.0355C14.4732 10.0979 15 8.82608 15 7.5V1.66667Z",
  p33908740: "M9.13083 10.295C9.09203 10.2563 9.06124 10.2103 9.04024 10.1597C9.01923 10.1091 9.00842 10.0548 9.00842 10C9.00842 9.94519 9.01923 9.89093 9.04024 9.84031C9.06124 9.78968 9.09203 9.7437 9.13083 9.705L12.9525 5.88417C13.187 5.64978 13.3188 5.33184 13.3189 5.00029C13.3189 4.66875 13.1873 4.35075 12.9529 4.11625C12.7185 3.88175 12.4006 3.74997 12.069 3.74989C11.7375 3.74982 11.4195 3.88145 11.185 4.11583L7.36333 7.9375C6.81731 8.48503 6.51068 9.22674 6.51068 10C6.51068 10.7733 6.81731 11.515 7.36333 12.0625L11.185 15.8842C11.4195 16.1186 11.7375 16.2502 12.069 16.2501C12.4006 16.25 12.7185 16.1182 12.9529 15.8837C13.1873 15.6493 13.3189 15.3313 13.3189 14.9997C13.3188 14.6682 13.187 14.3502 12.9525 14.1158L9.13083 10.295Z",
  p3623b300: "M5.25 10.5C2.61917 11.6667 2.33333 9.33333 1.16667 9.33333",
  p78c1970: "M0.833333 7.5L4.16667 4.16667L0.833333 0.833333",
};

const placeholderImage = "https://ui-avatars.com/api/?background=3457DC&color=fff&size=200&name=User";

function TagBadge({ label }) {
  return (
    <div className="bg-[rgba(57,94,213,0.05)] border border-[rgba(57,94,213,0.3)] border-solid h-[42px] rounded-[9999px] px-6 flex items-center justify-center hover:bg-[rgba(57,94,213,0.1)] transition-colors cursor-default">
      <p className="font-['Inter:Regular',sans-serif] font-normal text-[#b6bace] text-[14px] leading-[20px] whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}

function TeamMemberCard({ name, title, role, image, showTwitter = true }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[rgba(255,255,255,0.05)] border border-[#2e2e38] border-solid rounded-[22px] p-6 flex flex-col items-center hover:border-blue-500/40 transition-all group"
    >
      <div className="rounded-[9999px] shadow-[0px_0px_0px_2px_rgba(57,94,213,0.3)] size-[112px] overflow-hidden mb-6 group-hover:shadow-[0px_0px_0px_4px_rgba(57,94,213,0.5)] transition-all">
        <img alt={name} className="size-full object-cover" src={image || placeholderImage} />
      </div>

      <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#f5f5f5] text-[18px] text-center mb-2 leading-[28px]">
        {name}
      </h3>

      <p className="font-['Inter:Regular','Noto_Sans_Arabic:Regular',sans-serif] font-normal text-[#7b829d] text-[14px] text-center mb-4 leading-[20px]" dir="auto">
        {title}
      </p>

      <div className="bg-[rgba(57,94,213,0.1)] h-[24px] rounded-[9999px] px-4 flex items-center justify-center mb-6">
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#3c61dd] text-[12px] leading-[16px]">
          {role}
        </p>
      </div>

      <div className="flex gap-[30px] items-center">
        <div className="h-[18px] w-[18px] opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
          <svg className="block size-full" fill="none" viewBox="0 0 18 18">
            <g>
              <path d="M5.25 0.75C6.44347 0.75 7.58807 1.22411 8.43198 2.06802C9.27589 2.91193 9.75 4.05653 9.75 5.25V10.5H6.75V5.25C6.75 4.85218 6.59196 4.47064 6.31066 4.18934C6.02936 3.90804 5.64782 3.75 5.25 3.75C4.85218 3.75 4.47064 3.90804 4.18934 4.18934C3.90804 4.47064 3.75 4.85218 3.75 5.25V10.5H0.75V5.25C0.75 4.05653 1.22411 2.91193 2.06802 2.06802C2.91193 1.22411 4.05653 0.75 5.25 0.75Z" stroke="#7B829D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M3.75 0.75H0.75V9.75H3.75V0.75Z" stroke="#7B829D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M2.25 3.75C3.07843 3.75 3.75 3.07843 3.75 2.25C3.75 1.42157 3.07843 0.75 2.25 0.75C1.42157 0.75 0.75 1.42157 0.75 2.25C0.75 3.07843 1.42157 3.75 2.25 3.75Z" stroke="#7B829D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </g>
          </svg>
        </div>

        <div className="h-[18px] w-[18px] opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
          <svg className="block size-full" fill="none" viewBox="0 0 18 18">
            <g>
              <path d="M9.00863 15.75V12.75C9.11297 11.8105 8.84358 10.8676 8.25863 10.125C10.5086 10.125 12.7586 8.625 12.7586 6C12.8186 5.0625 12.5561 4.14 12.0086 3.375C12.2186 2.5125 12.2186 1.6125 12.0086 0.75C12.0086 0.75 11.2586 0.75 9.75863 1.875C7.77863 1.5 5.73863 1.5 3.75863 1.875C2.25863 0.75 1.50863 0.75 1.50863 0.75C1.28363 1.6125 1.28363 2.5125 1.50863 3.375C0.96254 4.13691 0.697489 5.06459 0.758635 6C0.758635 8.625 3.00863 10.125 5.25863 10.125C4.96613 10.4925 4.74863 10.9125 4.62113 11.3625C4.49363 11.8125 4.45613 12.285 4.50863 12.75V15.75" stroke="#7B829D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M6 2.25C2.6175 3.75 2.25 0.75 0.75 0.75" stroke="#7B829D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </g>
          </svg>
        </div>

        {showTwitter && (
          <div className="h-[18px] w-[18px] opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
            <svg className="block size-full" fill="none" viewBox="0 0 18 18">
              <g>
                <path d="M0.75 0.75V11.25" stroke="#7B829D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M1.5 12C1.30109 12 1.11032 11.921 0.96967 11.7803C0.829018 11.6397 0.75 11.4489 0.75 11.25V1.5C0.75 1.30109 0.829018 1.11032 0.96967 0.96967C1.11032 0.829018 1.30109 0.75 1.5 0.75H5.25C6.04565 0.75 6.80871 1.06607 7.37132 1.62868C7.93393 2.19129 8.25 2.95435 8.25 3.75C8.25 2.95435 8.56607 2.19129 9.12868 1.62868C9.69129 1.06607 10.4544 0.75 11.25 0.75H15C15.1989 0.75 15.3897 0.829018 15.5303 0.96967C15.671 1.11032 15.75 1.30109 15.75 1.5V11.25C15.75 11.4489 15.671 11.6397 15.5303 11.7803C15.3897 11.921 15.1989 12 15 12H10.5C9.90326 12 9.33097 12.2371 8.90901 12.659C8.48705 13.081 8.25 13.6533 8.25 14.25C8.25 13.6533 8.01295 13.081 7.59099 12.659C7.16903 12.2371 6.59674 12 6 12H1.5Z" stroke="#7B829D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}

const ResearchPaperCard = ({ title, authors, year, journal, description, tags, link }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#151519] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 group hover:border-[#3457DC]/30 transition-all duration-300"
        >
            <div className="flex justify-between items-start gap-4">
                <h3 className="text-xl font-bold text-white font-gilroy leading-tight group-hover:text-[#3457DC] transition-colors">
                    {title}
                </h3>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors p-1">
                    <ExternalLink size={20} />
                </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <div className="flex items-center gap-2 text-white/40 text-sm">
                    <UsersIcon size={16} />
                    <span>{authors}</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-sm">
                    <CalendarIcon size={14} />
                    <span>{year}</span>
                </div>
            </div>

            {journal && (
                <div className="text-sm font-medium text-blue-500/80 uppercase tracking-wide">
                    {journal}
                </div>
            )}

            {description && (
                <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                    {description}
                </p>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
                {tags && tags.map((tag, idx) => (
                    <span key={idx} className="bg-[#3457DC]/10 px-3 py-1 rounded-full text-[#3457DC] text-[11px] font-semibold uppercase tracking-wider">
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

function ProjectCard({ title, description, hasDemo = false }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-[rgba(255,255,255,0.05)] border border-[#2e2e38] border-solid rounded-[16px] p-6 hover:bg-[rgba(255,255,255,0.08)] transition-all h-full flex flex-col"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="size-[20px] flex-shrink-0">
          <svg className="block size-full" fill="none" viewBox="0 0 20 20">
            <path d="M0.833333 7.5L4.16667 4.16667L0.833333 0.833333" stroke="#395ED5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d="M4.16667 0.833333L0.833333 4.16667L4.16667 7.5" stroke="#395ED5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d="M5.00022 0.833556L0.833556 14.1669" stroke="#395ED5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
        <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#f5f5f5] text-[16px] leading-[24px]">
          {title}
        </h3>
      </div>
      <p className="font-['Inter:Regular','Noto_Sans_Arabic:Regular',sans-serif] font-normal text-[#7b829d] text-[14px] leading-[22.75px] mb-6 flex-1" dir="auto">
        {description}
      </p>
      <div className="flex gap-4 mt-auto">
        <a href="#" className="flex items-center gap-2 text-[#395ed5] text-[12px] leading-[16px] font-['Inter:Regular',sans-serif] hover:underline">
          <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
            <path d="M8.75 12.8333V10.5C8.83115 9.76925 8.62163 9.03591 8.16667 8.45833C9.91667 8.45833 11.6667 7.29167 11.6667 5.25C11.7133 4.52083 11.5092 3.80333 11.0833 3.20833" stroke="#395ED5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            <path d="M5.25 10.5C2.61917 11.6667 2.33333 9.33333 1.16667 9.33333" stroke="#395ED5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
          GitHub
        </a>
        {hasDemo && (
          <a href="#" className="flex items-center gap-2 text-[#395ed5] text-[12px] leading-[16px] font-['Inter:Regular',sans-serif] hover:underline">
            <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
              <path d="M8.75 1.75H12.25V5.25" stroke="#395ED5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              <path d="M5.83333 8.16667L12.25 1.75" stroke="#395ED5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              <path d="M10.5 7.58333V11.0833C10.5 11.3928 10.3771 11.6895 10.1583 11.9083C9.9395 12.1271 9.64275 12.25 9.33333 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V4.66667C1.75 4.35725 1.87292 4.0605 2.09171 3.84171C2.3105 3.62292 2.60725 3.50 2.91667 3.5H6.41667" stroke="#395ED5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
            Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

function AchievementCard({ icon, title }) {
  const renderIcon = () => {
    switch (icon) {
      case "trophy":
        return <Trophy size={20} />;
      case "award":
        return <Award size={20} />;
      case "book":
        return <BookOpen size={20} />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[rgba(255,255,255,0.05)] border border-[#2e2e38] border-solid rounded-[12px] p-5 flex items-center gap-4 hover:border-blue-500/20 transition-all group shrink-0"
    >
      <div className="bg-[rgba(57,94,213,0.1)] rounded-[9999px] size-[40px] flex items-center justify-center flex-shrink-0 group-hover:bg-[#3457DC] transition-all group-hover:text-white text-[#3457DC]">
        {renderIcon()}
      </div>
      <p className="font-['Inter:Regular','Noto_Sans_Arabic:Regular',sans-serif] font-normal text-[#f5f5f5] text-[14px] leading-[20px]" dir="auto">
        {title}
      </p>
    </motion.div>
  );
}

export default function TeamsResearches() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const teamMembers = [
    {
      name: "Prof. Ahmed Benali",
      title: "Professor - Lab Director",
      role: "Lead Researcher",
      image: `https://ui-avatars.com/api/?background=3457DC&color=fff&name=Ahmed+Benali`,
      showTwitter: true,
    },
    {
      name: "Dr. Sara Mansouri",
      title: "PhD Researcher",
      role: "AI Research Scientist",
      image: `https://ui-avatars.com/api/?background=3457DC&color=fff&name=Sara+Mansouri`,
      showTwitter: true,
    },
    {
      name: "Youcef Kaddour",
      title: "Master's Student",
      role: "Data Analyst",
      image: `https://ui-avatars.com/api/?background=3457DC&color=fff&name=Youcef+Kaddour`,
      showTwitter: false,
    },
    {
      name: "Karim Belhadj",
      title: "Master's Student",
      role: "Backend Developer",
      image: `https://ui-avatars.com/api/?background=3457DC&color=fff&name=Karim+Belhadj`,
      showTwitter: false,
    },
    {
      name: "Nour Hamdi",
      title: "PhD Researcher",
      role: "Cybersecurity Researcher",
      image: `https://ui-avatars.com/api/?background=3457DC&color=fff&name=Nour+Hamdi`,
      showTwitter: true,
    },
  ];

  const researchInterests = [
    "Machine Learning", "Network Security", "Cloud Computing", "Optimization Algorithms",
    "Deep Learning", "Natural Language Processing", "Computer Vision", "Cybersecurity",
    "Data Mining", "Big Data Analytics"
  ];

  const publications = [
    {
      title: "Deep Reinforcement Learning for Network Intrusion Detection",
      authors: "A. Benali, S. Mansouri, N. Hamdi",
      year: "2024",
      publisher: "IEEE Transactions on Information Forensics and Security",
      tags: ["Deep Learning", "Cybersecurity", "Networking"],
      contribution: "Explored DRL architectures for early detection of complex network attacks."
    },
    {
      title: "Optimizing Cloud Resource Allocation Using Genetic Algorithms",
      authors: "A. Benali, K. Belhadj, Y. Kaddour",
      year: "2023",
      publisher: "ACM Computing Surveys",
      tags: ["Cloud Computing", "Optimization", "Genetic Algorithms"],
      contribution: "Proposed a metaheuristic approach for dynamic load balancing in cloud nodes."
    },
    {
      title: "A Novel Approach to Arabic NLP Using Transformer Models",
      authors: "S. Mansouri, A. Cherif",
      year: "2023",
      publisher: "EMNLP 2023",
      tags: ["NLP", "Transformers", "Arabic Language"],
      contribution: "State-of-the-art results on Arabic sentiment analysis and entity recognition."
    }
  ];

  const projects = [
    {
      title: "SecureNet AI",
      description: "Intelligent intrusion detection system using deep learning for real-time network security monitoring.",
      hasDemo: true
    },
    {
      title: "CloudOptimizer",
      description: "A comprehensive tool for optimizing resource distribution in multi-cloud environments.",
      hasDemo: false
    },
    {
      title: "ArabicNLP Toolkit",
      description: "Advanced open-source library for processing and analyzing Arabic natural language structures.",
      hasDemo: true
    }
  ];

  const achievements = [
    { icon: "trophy", title: "1st Place - ICPC Regional 2024" },
    { icon: "award", title: "Best Research Paper - IEEE Conference 2023" },
    { icon: "book", title: "Research Grant from the Ministry of Higher Education" },
    { icon: "trophy", title: "Best Project Award - Hackathon Algeria 2024" }
  ];

  return (
    <div className="w-full min-h-screen bg-[#05030D] text-white font-poppins relative overflow-x-hidden">
      {/* Header Padding */}
      <div className="h-20 w-full" />

      {/* Main Content Sections */}
      <div className="flex flex-col items-center w-full">
        {/* Full width Hero Section */}
        <div className="w-full py-20 px-8 relative overflow-hidden">
          <div className="absolute bg-[rgba(57,94,213,0.2)] blur-[60px] w-[400px] h-[400px] opacity-20 rounded-full top-[-100px] left-1/2 -translate-x-1/2" />
          
          <div className="container mx-auto relative z-10 text-center mb-20">
             <div className="flex flex-col items-center mb-8">
                <span className="text-[#3457DC] text-[13px] uppercase font-bold tracking-[0.2em] mb-2">TEAMS</span>
                <h1 className="font-gilroy font-extrabold text-[60px] md:text-[80px] leading-tight mb-4 bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(156.197deg, rgb(60, 97, 221) 0%, rgb(117, 146, 240) 100%)" }}>
                  Data Science <span className="text-[#f5f5f5]">Research Team</span>
                </h1>
             </div>
            <p className="font-normal text-[#7b829d] text-[20px] leading-[28px] max-w-2xl mx-auto">
              We are a research team specializing in Artificial Intelligence, Cybersecurity, and Data Analytics. 
            </p>
          </div>

          <div className="container mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>
        </div>

        {/* Interests & Publications */}
        <div className="container mx-auto px-6 w-full space-y-32">
          {/* Interests */}
          <section className="relative z-10">
            <div className="bg-[rgba(255,255,255,0.03)] border border-white/5 rounded-[24px] p-12">
              <h2 className="font-gilroy font-bold text-[36px] text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">
                Research Interests
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {researchInterests.map((interest, index) => <TagBadge key={index} label={interest} />)}
              </div>
            </div>
          </section>

          {/* Publications */}
          <section className="relative z-10">
            <h2 className="font-gilroy font-bold text-[36px] text-center mb-16 text-white">
              Selected Publications
            </h2>
            <div className="space-y-6 max-w-[1100px] mx-auto">
              {publications.map((pub, index) => (
                <ResearchPaperCard key={index} {...pub} link="#" />
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="relative z-10">
            <div className="bg-[rgba(255,255,255,0.03)] border border-white/5 rounded-[24px] p-12">
              <h2 className="font-gilroy font-bold text-[36px] text-center mb-12 text-white">
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => <ProjectCard key={index} {...project} />)}
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Section Integrated with Footer */}
        <div className="w-full bg-[#070710] py-32 mt-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-white font-gilroy font-extrabold text-[48px] mb-4">Achievements & Awards</h2>
              <p className="text-[#7b829d] text-[18px]">Honors and recognition we've received</p>
            </div>

            <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
              {achievements.map((achievement, index) => (
                <AchievementCard key={index} {...achievement} />
              ))}
            </div>

            {/* Pagination Footer */}
            <div className="max-w-[1240px] mx-auto flex items-center justify-between pt-8 border-t border-white/5">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${currentPage === 1 ? 'bg-white/5 opacity-30 cursor-not-allowed' : 'bg-[#3457DC] hover:scale-110 active:scale-95'}`}
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex items-center gap-4">
                    <div className="bg-[#1e1e24] border border-white/5 rounded-xl px-4 py-2 font-bold min-w-[50px] text-center">
                        {currentPage}
                    </div>
                    <span className="text-[#a5a5b2] text-sm">of {totalPages}</span>
                </div>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${currentPage === totalPages ? 'bg-white/5 opacity-30 cursor-not-allowed' : 'bg-[#3457DC] hover:scale-110 active:scale-95'}`}
                >
                    <ChevronRight size={20} />
                </button>
            </div>
          </div>
          
          {/* Visual spacer for footer slant */}
          <div className="h-20 w-full" />
        </div>
      </div>
    </div>
  );
}
