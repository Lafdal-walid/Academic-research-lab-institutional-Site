import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import EnglishIcon from '../assets/svg/mainheader/EnglishIcon';
import ArabicIcon from '../assets/svg/mainheader/ArabicIcon';

const svgPaths = {
  p15d466f0: "M8.35 5.45L8.575 6.125L8 5.7H8.7L8.125 6.125L8.35 5.45ZM6.85 5.45L7.075 6.125L6.5 5.7H7.2L6.625 6.125L6.85 5.45ZM5.325 5.45L5.55 6.125L4.975 5.7H5.675L5.1 6.125L5.325 5.45ZM3.8 5.45L4.025 6.125L3.45 5.7H4.15L3.575 6.125L3.8 5.45ZM2.275 5.45L2.5 6.125L1.925 5.7H2.625L2.05 6.125L2.275 5.45ZM0.75 5.45L0.975 6.125L0.4 5.7H1.1L0.525 6.125L0.75 5.45ZM7.6 4.8L7.825 5.475L7.25 5.05H7.95L7.375 5.475L7.6 4.8ZM6.075 4.8L6.3 5.475L5.725 5.05H6.425L5.85 5.475L6.075 4.8ZM4.575 4.8L4.8 5.475L4.225 5.05H4.925L4.35 5.475L4.575 4.8ZM3.05 4.8L3.275 5.475L2.7 5.05H3.4L2.825 5.475L3.05 4.8ZM1.525 4.8L1.75 5.475L1.175 5.05H1.875L1.3 5.475L1.525 4.8ZM8.35 4.15L8.575 4.825L8 4.4H8.7L8.125 4.825L8.35 4.15ZM6.85 4.15L7.075 4.825L6.5 4.4H7.2L6.625 4.825L6.85 4.15ZM5.325 4.15L5.55 4.825L4.975 4.4H5.675L5.1 4.825L5.325 4.15ZM3.8 4.15L4.025 4.825L3.45 4.4H4.15L3.575 4.825L3.8 4.15ZM2.275 4.15L2.5 4.825L1.925 4.4H2.625L2.05 4.825L2.275 4.15ZM0.75 4.15L0.975 4.825L0.4 4.4H1.1L0.525 4.825L0.75 4.15ZM7.6 3.525L7.825 4.2L7.25 3.775H7.95L7.375 4.2L7.6 3.525ZM6.075 3.525L6.3 4.2L5.725 3.775H6.425L5.85 4.2L6.075 3.525ZM4.575 3.525L4.8 4.2L4.225 3.775H4.925L4.35 4.2L4.575 3.525ZM3.05 3.525L3.275 4.2L2.7 3.775H3.4L2.825 4.2L3.05 3.525ZM1.525 3.525L1.75 4.2L1.175 3.775H1.875L1.3 4.2L1.525 3.525ZM8.35 2.875L8.575 3.55L8 3.125H8.7L8.125 3.55L8.35 2.875ZM6.85 2.875L7.075 3.55L6.5 3.125H7.2L6.625 3.55L6.85 2.875ZM5.325 2.875L5.55 3.55L4.975 3.125H5.675L5.1 3.55L5.325 2.875ZM3.8 2.875L4.025 3.55L3.45 3.125H4.15L3.575 3.55L3.8 2.875ZM2.275 2.875L2.5 3.55L1.925 3.125H2.625L2.05 3.55L2.275 2.875ZM0.75 2.875L0.975 3.55L0.4 3.125H1.1L0.525 3.55L0.75 2.875ZM7.6 2.225L7.825 2.9L7.25 2.475H7.95L7.375 2.9L7.6 2.225ZM6.075 2.225L6.3 2.9L5.725 2.475H6.425L5.85 2.9L6.075 2.225ZM4.575 2.225L4.8 2.9L4.225 2.475H4.925L4.35 2.9L4.575 2.225ZM3.05 2.225L3.275 2.9L2.7 2.475H3.4L2.825 2.9L3.05 2.225ZM1.525 2.225L1.75 2.9L1.175 2.475H1.875L1.3 2.9L1.525 2.225ZM8.35 1.575L8.575 2.25L8 1.825H8.7L8.125 2.25L8.35 1.575ZM6.85 1.575L7.075 2.25L6.5 1.825H7.2L6.625 2.25L6.85 1.575ZM5.325 1.575L5.55 2.25L4.975 1.825H5.675L5.1 2.25L5.325 1.575ZM3.8 1.575L4.025 2.25L3.45 1.825H4.15L3.575 2.25L3.8 1.575ZM2.275 1.575L2.5 2.25L1.925 1.825H2.625L2.05 2.25L2.275 1.575ZM0.75 1.575L0.975 2.25L0.4 1.825H1.1L0.525 2.25L0.75 1.575ZM7.6 0.925L7.825 1.6L7.25 1.175H7.95L7.375 1.6L7.6 0.925ZM6.075 0.925L6.3 1.6L5.725 1.175H6.425L5.85 1.6L6.075 0.925ZM4.575 0.925L4.8 1.6L4.225 1.175H4.925L4.35 1.6L4.575 0.925ZM3.05 0.925L3.275 1.6L2.7 1.175H3.4L2.825 1.6L3.05 0.925ZM1.525 0.925L1.75 1.6L1.175 1.175H1.875L1.3 1.6L1.525 0.925ZM8.35 0.275L8.575 0.95L8 0.525H8.7L8.125 0.95L8.35 0.275ZM6.85 0.275L7.075 0.95L6.5 0.525H7.2L6.625 0.95L6.85 0.275ZM5.325 0.275L5.55 0.95L4.975 0.525H5.675L5.1 0.95L5.325 0.275ZM3.8 0.275L4.025 0.95L3.45 0.525H4.15L3.575 0.95L3.8 0.275ZM2.275 0.275L2.5 0.95L1.925 0.525H2.625L2.05 0.95L2.275 0.275ZM0.75 0.275L0.975 0.95L0.4 0.525H1.1L0.525 0.95L0.75 0.275Z",
  p296b5080: "M0 0.92V1.845H16V0.92H0ZM0 2.7625V3.6875H16V2.7625H0ZM0 4.6125V5.5375H16V4.6125H0ZM0 6.4625V7.3875H16V6.4625H0ZM0 8.3125V9.2375H16V8.3125H0ZM0 10.1625V11.0875H16V10.1625H0Z",
  p2d73fe00: "M15.5917 6.84167C15.5142 6.76356 15.422 6.70156 15.3205 6.65926C15.2189 6.61695 15.11 6.59517 15 6.59517C14.89 6.59517 14.7811 6.61695 14.6795 6.65926C14.578 6.70156 14.4858 6.76356 14.4083 6.84167L10.5917 10.6583C10.5142 10.7364 10.422 10.7984 10.3205 10.8407C10.2189 10.8831 10.11 10.9048 10 10.9048C9.88999 10.9048 9.78107 10.8831 9.67952 10.8407C9.57797 10.7984 9.4858 10.7364 9.40833 10.6583L5.59167 6.84167C5.5142 6.76356 5.42203 6.70156 5.32048 6.65926C5.21893 6.61695 5.11001 6.59517 5 6.59517C4.88999 6.59517 4.78107 6.61695 4.67952 6.65926C4.57797 6.70156 4.4858 6.76356 4.40833 6.84167C4.25312 6.9978 4.16601 7.20901 4.16601 7.42917C4.16601 7.64932 4.25312 7.86053 4.40833 8.01667L8.23333 11.8417C8.70208 12.3098 9.3375 12.5728 10 12.5728C10.6625 12.5728 11.2979 12.3098 11.7667 11.8417L15.5917 8.01667C15.7469 7.86053 15.834 7.64932 15.834 7.42917C15.834 7.20901 15.7469 6.9978 15.5917 6.84167Z",
  pfb91500: "M0 1.3825H16ZM0 3.225H16ZM0 5.075H16ZM0 6.925H16ZM0 8.775H16ZM0 10.625H16Z",
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const lang = language === 'en' ? 'En' : 'Ar';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A070E] border-b border-solid border-[#2a2a30] transition-all duration-300">
      <div 
        className="flex items-center justify-between relative"
        style={{
          paddingLeft: '4.86vw', 
          paddingRight: '4.86vw',
          paddingTop: '2.4vh', 
          paddingBottom: '2.4vh'
        }}
      >
        {/* Left Section - Logo and Navigation */}
        <div 
          className="flex items-center relative shrink-0"
          style={{
            gap: '1.88vw', 
            height: '7.6vh', 
          }}
        >
          {/* Logo */}
          <Link 
            to="/"
            className="relative shrink-0"
            style={{
              height: '7.8vh', 
              width: '10.5vw' 
            }}
          >
            <img 
              alt="Saad Dahlab University Logo" 
              className="absolute inset-0 max-w-none object-contain size-full" 
              src="/Saad Dahlab white.png" 
            />
          </Link>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center" style={{ gap: '1.88vw' }}>
            <Link 
              to="/projects"
              className="font-poppins font-medium leading-[normal] not-italic relative shrink-0 text-white whitespace-nowrap hover:text-accent transition-colors"
              style={{ fontSize: '0.97vw' }} 
            >
              Projects
            </Link>
            <Link 
              to="/publications"
              className="font-poppins font-medium leading-[normal] not-italic relative shrink-0 text-white whitespace-nowrap hover:text-accent transition-colors"
              style={{ fontSize: '0.97vw' }}
            >
              Publications
            </Link>
            <Link 
              to="/teams-researches"
              className="font-poppins font-medium leading-[normal] not-italic relative shrink-0 text-white whitespace-nowrap hover:text-accent transition-colors"
              style={{ fontSize: '0.97vw' }}
            >
              Teams Researches
            </Link>
            <Link 
              to="/about-us"
              className="font-poppins font-medium leading-[normal] not-italic relative shrink-0 text-white whitespace-nowrap hover:text-accent transition-colors"
              style={{ fontSize: '0.97vw' }}
            >
              About Us
            </Link>

            {/* Support with Dropdown */}
            <div className="group relative flex items-center shrink-0" style={{ gap: '0.56vw' }}>
              <Link 
                to="/support"
                className="font-poppins font-medium leading-[normal] not-italic relative shrink-0 text-white whitespace-nowrap group-hover:text-accent transition-colors"
                style={{ fontSize: '0.97vw' }}
              >
                Support
              </Link>
              {/* Angle Down Icon */}
              <div 
                className="relative shrink-0"
                style={{
                  width: '1.39vw', 
                  height: '2vh' 
                }}
              >
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p2d73fe00} fill="currentColor" className="text-white group-hover:text-accent transition-colors" />
                </svg>
              </div>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-dashboard-card border border-card-border rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-2xl z-[60]">
                <Link to="/support" className="block px-4 py-2 text-[13px] text-neutral-grey hover:bg-white/5 hover:text-white rounded-lg transition-colors">FAQ</Link>
                <a href="#" className="block px-4 py-2 text-[13px] text-neutral-grey hover:bg-white/5 hover:text-white rounded-lg transition-colors">Discord</a>
                <a href="#" className="block px-4 py-2 text-[13px] text-neutral-grey hover:bg-white/5 hover:text-white rounded-lg transition-colors">Contact</a>
              </div>
            </div>
          </nav>
        </div>

        {/* Right Section - Language Selector and Login */}
        <div 
          className="flex items-center relative shrink-0"
          style={{ gap: '1.67vw' }} 
        >
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="bg-[#1e1e24] flex items-center relative rounded-[400px] shrink-0 hover:bg-[#2a2a30] transition-all"
              style={{
                gap: '0.56vw', 
                padding: '0.8vh 0.56vw' 
              }}
            >
              {/* Flag Icon */}
              <div 
                className="relative shrink-0 flex items-center justify-center"
                style={{
                  height: '1.2vh', 
                  width: '1.11vw' 
                }}
              >
                {lang === 'En' ? <EnglishIcon /> : <ArabicIcon />}
              </div>

              <p 
                className="font-poppins font-medium leading-[normal] not-italic relative shrink-0 text-white whitespace-nowrap capitalize"
                style={{ fontSize: '0.97vw' }}
              >
                {lang}
              </p>

              {/* Angle Down Icon */}
              <div 
                className="relative shrink-0 transition-transform duration-300"
                style={{
                  width: '1.39vw', 
                  height: '2vh',
                  transform: isLangOpen ? 'rotate(180deg)' : 'none'
                }}
              >
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p2d73fe00} fill="white" />
                </svg>
              </div>
            </button>
            
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-dashboard-card border border-card-border rounded-xl p-1 shadow-2xl z-[70] overflow-hidden">
                <button 
                  onClick={() => { setLanguage('en'); setIsLangOpen(false); }} 
                  className="w-full text-left px-4 py-2 text-[13px] text-neutral-grey hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                >
                  <EnglishIcon />
                  English
                </button>
                <button 
                  onClick={() => { setLanguage('ar'); setIsLangOpen(false); }} 
                  className="w-full text-left px-4 py-2 text-[13px] text-neutral-grey hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2 border-t border-card-border/50"
                >
                  <ArabicIcon />
                  العربية
                </button>
              </div>
            )}
          </div>

          {/* Divider */}
          <div 
            className="flex items-center justify-center relative shrink-0"
            style={{
              height: '2.4vh', 
              width: '1px',
              backgroundColor: '#2A2A30'
            }}
          />

          {/* Login Button */}
          <Link 
            to="/login"
            className="hidden sm:flex content-stretch items-center justify-center relative shrink-0 border border-[#3457dc] border-solid rounded-[16px] bg-white/[0.01] hover:bg-accent/10 transition-all"
            style={{
              paddingLeft: '1.39vw', 
              paddingRight: '1.39vw',
              paddingTop: '1.6vh', 
              paddingBottom: '1.6vh',
              width: '11.11vw' 
            }}
          >
            <p 
              className="font-poppins font-medium leading-[normal] not-italic relative shrink-0 text-[#3457dc] whitespace-nowrap"
              style={{ fontSize: '0.97vw' }}
            >
              Log in / Sign up
            </p>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="absolute right-0 top-0 bottom-0 w-[300px] bg-background-main border-l border-card-border shadow-2xl p-6">
            <div className="flex items-center justify-between mb-12">
              <img src="/Saad Dahlab white.png" alt="Logo" className="h-10 w-auto" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-neutral-grey hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white">Projects</Link>
              <Link to="/publications" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white">Publications</Link>
              <Link to="/teams-researches" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white">Teams Researches</Link>
              <Link to="/about-us" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white">About Us</Link>
              <Link to="/support" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white">Support</Link>
            </nav>
            <div className="mt-auto pt-6 border-t border-card-border">
              <Link to="/login" className="block w-full py-4 text-center bg-accent text-white rounded-xl font-bold">Log in / Sign up</Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Header;
