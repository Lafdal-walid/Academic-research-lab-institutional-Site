import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

// Inline Icons for better reliability
const RiDiscordFill = () => (
// ... Icon content same ...
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
);
const RiTwitterXFill = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" /></svg>
);
const RiYoutubeFill = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
);
const FaInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const FaTiktok = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31 0 2.57.51 3.51 1.44a5.19 5.19 0 0 0 3.51 1.44v3.51a8.62 8.62 0 0 1-3.51-1.44v7.71c0 3.32-2.69 6.02-6.02 6.02s-6.02-2.7-6.02-6.02 2.7-6.02 6.02-6.02c.45 0 .88.05 1.3.15v3.51c-.42-.1-.85-.15-1.3-.15-1.39 0-2.51 1.12-2.51 2.51s1.12 2.51 2.51 2.51 2.51-1.12 2.51-2.51V.02h3.51z" /></svg>
);
const FiArrowUpRight = ({ size = 21 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);
const HiOutlineArrowNarrowUp = ({ size = 20 }) => (
  <svg width={size - 2} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="21" x2="12" y2="3"></line>
    <polyline points="8 7 12 3 16 7"></polyline>
  </svg>
);

const Footer = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const isProjectsMenu = location.pathname.includes('/projects');
  const isSupportPage = location.pathname.includes('/support');
  const isPublicationsPage = location.pathname.includes('/publications');
  const isTeamsResearchesPage = location.pathname.includes('/teams-researches');
  const isAboutUsPage = location.pathname.includes('/about-us');
  const isNewsGalleryPage = location.pathname.includes('/news-gallery');

  const getFooterWrapperBg = () => {
    if (isProjectsMenu || isPublicationsPage || isTeamsResearchesPage || isAboutUsPage || isNewsGalleryPage || isSupportPage) return "bg-background-main";
    return "bg-transparent";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const text = {
    brand_description: language === 'ar' ? 'منصة أبحاث علمية متقدمة مصممة لتسريع الاكتشاف دون تعقيد.' : 'Advanced scientific research platform designed to accelerate discovery without complexity.',
    quick_links: language === 'ar' ? 'روابط سريعة' : 'Quick links',
    projects: language === 'ar' ? 'المشاريع' : 'Projects',
    publications: language === 'ar' ? 'المنشورات' : 'Publications',
    teams: language === 'ar' ? 'الأبحاث والفرق' : 'Teams Researches',
    about: language === 'ar' ? 'عنا' : 'About Us',
    support: language === 'ar' ? 'الدعم' : 'Support',
    contact: language === 'ar' ? 'اتصل بنا' : 'Contact us',
    faq: language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ',
    suggestions: language === 'ar' ? 'الاقتراحات' : 'Suggestions',
    go_up: language === 'ar' ? 'للأعلى' : 'Go Up',
    rights: language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.',
    privacy: language === 'ar' ? 'سياسة الخصوصية' : 'Privacy policy',
    terms: language === 'ar' ? 'الشروط والأحكام' : 'Terms & conditions'
  };

  return (
    <div className={getFooterWrapperBg()}>
    <footer
      className={`relative pt-[90px] md:pt-[130px] pb-[28px] px-6 md:px-20 overflow-x-hidden ${language === 'ar' ? 'font-tajawal' : 'font-poppins'} bg-[#121014] text-white`}
      style={{
        clipPath: 'polygon(0 0, 100% 80px, 100% 100%, 0 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto relative z-12">

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-14 lg:gap-[0.9em] mb-[45px] items-start">

          {/* Left Column: Brand & Logo */}
          <div className="lg:col-span-5 flex flex-col gap-[18px]">
            <div className="flex items-center gap-2">
              <Link to="/">
                <img src="/Saad Dahlab white.png" alt={language === 'ar' ? 'شعار معهد أبحاث سعد دحلب' : "Saad Dahlab Research Institute"} className="h-[42px] md:h-[68px] w-auto object-contain" />
              </Link>
            </div>
            <p className="text-white text-[13px] max-w-[288px] leading-relaxed font-normal">
              {text.brand_description}
            </p>
            <div className="flex gap-[21px] items-center mt-2">
              {[
                { Icon: RiDiscordFill, key: 'discord' },
                { Icon: FaTiktok, key: 'tiktok' },
                { Icon: RiTwitterXFill, key: 'twitter' },
                { Icon: RiYoutubeFill, key: 'youtube' },
                { Icon: FaInstagram, key: 'instagram' }
              ].map(({ Icon, key }) => (
                <a
                  key={key}
                  href="#"
                  className="text-white hover:text-[#3457DC] transition-colors duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Middle Column: Quick Links */}
          <div className={`lg:col-span-3 lg:ml-[4.2vw] lg:-mt-[2vh] ${language === 'ar' ? 'text-right' : ''}`}>
            <div className="relative mb-[28px]">
              <svg className={`absolute -top-[21px] ${language === 'ar' ? '-right-10' : '-left-10'}`} width="7" height="7" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0V8H0L8 0Z" fill="white" />
              </svg>
              <h4 className="font-extrabold text-white text-[14.5px] tracking-tight pt-[7px]">
                {text.quick_links}
              </h4>
            </div>
            <ul className="flex flex-col gap-[12px] text-[13px] font-normal text-white">
              <li><Link to="/projects" className="hover:text-[#3457DC] transition-colors">{text.projects}</Link></li>
              <li><Link to="/publications" className="hover:text-[#3457DC] transition-colors">{text.publications}</Link></li>
              <li><Link to="/teams-researches" className="hover:text-[#3457DC] transition-colors">{text.teams}</Link></li>
              <li><Link to="/about-us" className="hover:text-[#3457DC] transition-colors">{text.about}</Link></li>
            </ul>
          </div>

          {/* Right Column: Support */}
          <div className={`lg:col-span-3 lg:ml-[6vw] lg:-mt-[2vh] ${language === 'ar' ? 'text-right' : ''}`}>
            <div className="relative mb-[28px]">
              <svg className={`absolute -top-[21px] ${language === 'ar' ? '-right-10' : '-left-10'}`} width="7" height="7" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0V8H0L8 0Z" fill="white" />
              </svg>
              <h4 className="font-extrabold text-white text-[14.5px] tracking-tight pt-[7px]">
                {text.support}
              </h4>
            </div>
            <ul className="flex flex-col gap-[12px] text-[13px] font-normal text-white">
              <li><Link to="/support" className="hover:text-[#3457DC] transition-colors">{text.contact}</Link></li>
              <li><Link to="/support" className="hover:text-[#3457DC] transition-colors">{text.faq}</Link></li>
              <li><Link to="/support" className="hover:text-[#3457DC] transition-colors">{text.suggestions}</Link></li>
              <li>
                <a href="mailto:oualidlafdaI50@gmail.com" className={`hover:text-[#3457DC] transition-colors flex items-center gap-[4px] text-[13px] ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  oualidlafdaI50@gmail.com <FiArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`flex flex-col md:flex-row justify-between items-center pt-[36px] border-t border-white/5 gap-[21px] relative ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
          {/* Decorator Dot */}
          <div className={`hidden lg:block absolute ${language === 'ar' ? 'left-0' : 'right-0'} top-0 -translate-y-[calc(100%+1vh)]`}>
            <div className="w-[7px] h-[7px] bg-white" />
          </div>

          <div className="text-[13px] md:text-[14px] text-center md:text-start order-1 md:order-1 text-white font-normal" dir="ltr">
            © Oualid Lafdal . {text.rights}
          </div>

          <button
            onClick={scrollToTop}
            className={`flex items-center lg:relative lg:start-6 gap-2 text-sm hover:text-[#3457DC] transition-colors duration-300 order-1 md:order-2 cursor-pointer ${language === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            {text.go_up} <HiOutlineArrowNarrowUp size={18} />
          </button>

          <div className={`flex items-center text-[12px] md:text-[13px] gap-[28px] md:gap-[57px] order-2 md:order-3 font-normal text-white ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Link to="/support" className="hover:text-[#3457DC] transition-colors">{text.privacy}</Link>
            <Link to="/support" className="hover:text-[#3457DC] transition-colors">{text.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
