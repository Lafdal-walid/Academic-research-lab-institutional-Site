import React, { useState } from 'react';
import CalendarIcon from "@/assets/svg/userDashboard/PhdTracker/calendar-clock (7) 3.svg";
import ComputerIcon from "@/assets/svg/userDashboard/PhdTracker/computer_(1)_1.svg";
import InfoYellowIcon from "@/assets/svg/userDashboard/Progress/Frame_9216.svg";
import PauseIcon from "@/assets/svg/userDashboard/Progress/pause_1.svg";
import LockIcon from "@/assets/svg/userDashboard/Progress/lock_3.svg";

// Import project images
import img1 from "@/assets/svg/userDashboard/Progress/01-ai-cover-mar2024-static_(2) (2) 1.png";
import img2 from "@/assets/svg/userDashboard/Progress/5a30797ac91abd1c88194b924cf3eaa9 2.png";
import img3 from "@/assets/svg/userDashboard/Progress/imagesf.png";

const ProjectsTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const projects = [
      { id: 1, name: "Ai magasine", update: "Last update 1Hour ago", start: "April 6 2026", deadline: "June 6 2026", progress: "31%", img: img1 },
      { id: 2, name: "Science", update: "Last update 1Hour ago", start: "April 7 2026", deadline: "June 7 2026", progress: "60%", img: img2 },
      { id: 3, name: "Scientific American", update: "Last update 1Hour ago", start: "April 8 2026", deadline: "June 8 2026", progress: "95%", img: img3 },
    ];

    const filteredProjects = projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="bg-[#151519] flex flex-col p-[1.8vw] relative rounded-[1vw] border border-white/5 w-full shadow-2xl">
        <div aria-hidden="true" className="absolute border border-[#1e1d22] border-solid inset-0 pointer-events-none rounded-[16px]" />
        
        <div className="flex justify-between items-center mb-[3vh] relative z-10">
          <h2 className="font-bold text-[1.15vw] text-white m-0" style={{ fontFamily: 'Gilroy, Poppins, sans-serif' }}>Projects</h2>
          <div className="bg-[#1e1e24] rounded-[0.8vw] w-[16vw] px-[1.2vw] py-[1vh] flex items-center justify-between border border-transparent focus-within:border-[#3457dc] transition-all">
            <input 
                type="text"
                placeholder="Search /"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-white text-[0.85vw] w-full placeholder-[#a5a5b2]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
            />
            <div className="relative size-[1.2vw] shrink-0">
                <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 20 20">
                    <path d="M9.58333 17.5C13.9556 17.5 17.5 13.9556 17.5 9.58333C17.5 5.21108 13.9556 1.66667 9.58333 1.66667C5.21108 1.66667 1.66667 5.21108 1.66667 9.58333C1.66667 13.9556 5.21108 17.5 9.58333 17.5Z" stroke="#3457DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d="M18.3333 18.3333L16.6667 16.6667" stroke="#3457DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
            </div>
          </div>
        </div>
  
        <div className="flex items-center w-full mb-[2vh] px-[0.5vw] relative z-10">
          <div className="w-[20vw] text-[#80808a] text-[0.85vw]">Project Name</div>
          <div className="flex-1 text-[#80808a] text-[0.85vw] text-center">Start Date</div>
          <div className="flex-1 text-[#80808a] text-[0.85vw] text-center">Estimated Deadline</div>
          <div className="flex-1 text-[#80808a] text-[0.85vw] text-center">Progress</div>
        </div>
  
        <div className="w-full h-[1px] bg-[#1E1D22] mb-[2.5vh] relative z-10" />
  
        <div className="flex flex-col gap-[2.5vh] relative z-10 min-h-[25vh]">
          {filteredProjects.length > 0 ? filteredProjects.map((project) => (
            <div key={project.id} className="flex items-center w-full rounded-[0.5vw] group transition-all animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="flex items-center w-[20vw] gap-[1.2vw]">
                 <div className="w-[2.5vw] h-[8vh] rounded-[0.4vw] overflow-hidden bg-white/5 shrink-0 border border-white/5">
                    <img src={project.img} alt={project.name} className="w-full h-full object-cover" />
                 </div>
                 <div className="flex flex-col gap-[0.3vh]">
                    <p className="font-bold text-[0.95vw] text-white m-0" style={{ fontFamily: 'Gilroy, Poppins, sans-serif' }}>{project.name}</p>
                    <p className="text-[#a5a5b2] text-[0.75vw] m-0" style={{ fontFamily: 'Poppins, sans-serif' }}>{project.update}</p>
                 </div>
              </div>
              <div className="flex-1 text-center text-white text-[0.85vw] font-['Poppins',sans-serif]">{project.start}</div>
              <div className="flex-1 text-center text-white text-[0.85vw] font-['Poppins',sans-serif]">{project.deadline}</div>
              <div className="flex-1 text-center text-white text-[0.9vw] font-bold font-['Poppins',sans-serif]">{project.progress}</div>
            </div>
          )) : (
              <div className="flex items-center justify-center w-full py-10">
                  <p className="text-[#80808a] text-[1vw]">No projects found matching your search.</p>
              </div>
          )}
        </div>
  
        <div className="w-full h-[1px] bg-[#1E1D22] mt-[3vh] mb-[2.5vh] relative z-10" />
  
        <div className="flex justify-between items-center w-full relative z-10">
           <button className="w-[2.2vw] h-[2.2vw] flex items-center justify-center bg-[#3457dc] rounded-full hover:bg-[#4a6dec] transition-all group">
              <svg width="1.2vw" height="1.2vw" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2.5" className="rotate-180">
                 <path d="M7 15l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
           </button>
           <div className="flex items-center gap-[0.8vw]">
              <div className="px-[0.9vw] py-[0.6vh] bg-white/[0.02] border border-[#1e1d22] rounded-[0.4vw] text-white text-[0.9vw]">01</div>
              <span className="text-[#a5a5b2] text-[0.85vw]">out of 4</span>
           </div>
           <button className="w-[2.2vw] h-[2.2vw] flex items-center justify-center bg-[#3457dc] rounded-full hover:bg-[#4a6dec] transition-all group">
              <svg width="1.2vw" height="1.2vw" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2.5">
                 <path d="M7 15l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
           </button>
        </div>
      </div>
    );
  };

const RoadmapSection = () => {
    const milestones = [
      { date: "Month 1", title: "Literature Review & Data Collection", completed: true },
      { date: "Month 2", title: "Theoretical Framework & Methodology", completed: false, isCurrent: true },
      { date: "Month 3", title: "Experimental Setup & Testing", completed: false },
      { date: "Month 4", title: "Data Analysis & Results Synthesis", completed: false },
      { date: "Month 7", title: "Final Review & Submission", completed: false },
    ];
  
    return (
      <div style={{
          marginTop: '5vh',
          backgroundColor: '#151519', border: '1px solid #1e1d22',
          borderRadius: '16px', padding: '24px', display: 'flex',
          flexDirection: 'column', gap: '24px', width: '100%',
          position: 'relative'
      }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', position: 'relative', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'white', fontFamily: 'Gilroy, sans-serif' }}>Ai magazine Project Roadmap</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#a5a5b2' }}>Key Objectives & Milestones.</p>
              </div>
  
              {/* Absolutely Centered Status */}
              <div style={{
                  position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                  display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center'
              }}>
                  <span style={{ fontSize: '14px', color: '#3457DC', fontWeight: 500, whiteSpace: 'nowrap' }}>1 of 8 Completed</span>
                  <div style={{ width: '100%', minWidth: '80px', height: '4px', backgroundColor: '#1e1e24', borderRadius: '400px', overflow: 'hidden' }}>
                      <div style={{ width: '12.5%', height: '100%', backgroundColor: '#3457DC' }} />
                  </div>
              </div>
          </div>
  
          <div style={{ height: '1px', backgroundColor: '#2A2A30' }} />
  
          {/* Timeline Area with custom scrollbar */}
          <div className="academic-timeline-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxHeight: '400px', overflowY: 'auto', paddingRight: '12px' }}>
              {milestones.map((milestone, index) => (
                  <div key={index} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                      {/* Dot & Line Indicator */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '46px', position: 'relative' }}>
                          <div style={{
                              backgroundColor: milestone.completed ? '#3457DC' : '#1e1e24',
                              backgroundImage: milestone.isCurrent ? 'linear-gradient(to bottom, #3457DC 50%, #1e1e24 50%)' : 'none',
                              padding: '14px', borderRadius: '50%', display: 'flex',
                              alignItems: 'center', justifyContent: 'center', zIndex: 2,
                              position: 'relative'
                          }}>
                              <img src={milestone.isCurrent ? PauseIcon : ComputerIcon} alt="phase" style={{ width: '16px', height: '16px' }} />
                          </div>
                          {index !== milestones.length - 1 && (
                              <div style={{
                                  width: '2px', 
                                  height: '100px', 
                                  backgroundColor: (milestone.completed && milestones[index+1].completed) || (milestone.completed && milestones[index+1].isCurrent) ? '#3457DC' : '#1e1e24',
                                  position: 'absolute', 
                                  top: '22px', 
                                  zIndex: 1
                              }} />
                          )}
                      </div>
  
                      {/* Content */}
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <span style={{ fontSize: '14px', color: '#a5a5b2', fontWeight: 500 }}>{milestone.date}</span>
                              <span style={{ fontSize: '14px', color: 'white', fontWeight: 400 }}>{milestone.title}</span>
                          </div>
                          <div style={{
                              backgroundColor: milestone.completed ? '#1e1e24' : 'rgba(30,30,36,0.3)', 
                              padding: '8px 24px', 
                              borderRadius: '16px',
                              color: milestone.completed ? 'white' : '#80808a', 
                              fontSize: '14px', fontWeight: 500, cursor: milestone.completed ? 'pointer' : 'default',
                              display: 'flex', alignItems: 'center', gap: '8px',
                              border: milestone.completed ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(255,255,255,0.02)',
                              transition: 'all 0.2s'
                          }}
                          onMouseOver={(e) => { if(milestone.completed) e.currentTarget.style.backgroundColor = '#2a2a30' }}
                          onMouseOut={(e) => { if(milestone.completed) e.currentTarget.style.backgroundColor = '#1e1e24' }}
                          >
                              {milestone.completed ? 'View Details' : 'In Progress'}
                              {!milestone.completed && (
                                   <div style={{ width: '14px', height: '14px', display: 'flex', opacity: 0.4 }}>
                                      <img src={LockIcon} alt="lock" style={{ width: '100%', height: '100%' }} />
                                   </div>
                              )}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
  
          {/* Bottom HR Divider */}
          <div style={{ padding: '24px 0 8px 0' }}>
              <div style={{ height: '1px', backgroundColor: '#2A2A30', width: '100%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
                  <img src={InfoYellowIcon} alt="info" style={{ width: '1.2vw', height: '1.2vw', flexShrink: 0 }} />
                  <p style={{ color: '#FCC841', fontSize: '13px', margin: 0, fontFamily: 'Poppins, sans-serif' }}>
                      Milestones are updated based on Team Leader validation. Completing tasks ensures a steady workflow toward the final project goal.
                  </p>
              </div>
          </div>
  
          <style dangerouslySetInnerHTML={{
              __html: `
              .academic-timeline-scroll::-webkit-scrollbar {
                  width: 6px;
              }
              .academic-timeline-scroll::-webkit-scrollbar-track {
                  background: transparent;
              }
              .academic-timeline-scroll::-webkit-scrollbar-thumb {
                  background: #3457DC;
                  border-radius: 10px;
              }
              .academic-timeline-scroll {
                  scrollbar-width: thin;
                  scrollbar-color: #3457DC transparent;
              }
          `}} />
      </div>
    );
  };

const Progress = () => {
  return (
    <div className="w-full text-white font-poppins pb-[6vh] animate-in fade-in duration-500">
      {/* Header Section with Title and Action Button */}
      <div className="flex justify-between items-center w-full" style={{ marginTop: '-1.5vh', marginBottom: '2.5vh' }}>
        <h1 style={{
          fontSize: '1vw',
          fontWeight: 700,
          color: '#ffffff',
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: '-0.02em',
          margin: 0
        }}>
          Progress
        </h1>
        
        <button 
          className="flex items-center justify-center bg-[#1e1e24] transition-all hover:bg-[#2a2a30] hover:scale-[1.02]"
          style={{ 
            gap: '0.6vw',
            padding: '1.1vh 1.4vw', 
            borderRadius: '0.8vw',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <span style={{ 
            fontFamily: "'Poppins', sans-serif", 
            fontWeight: 500, 
            fontSize: '0.8vw', 
            color: '#a5a5b2'
          }}>
            Date Range
          </span>
          <img 
            src={CalendarIcon} 
            alt="calendar" 
            style={{ 
                width: '0.9vw', 
                height: '0.9vw'
            }} 
          />
        </button>
      </div>

      <ProjectsTable />
      
      <RoadmapSection />
    </div>
  );
};

export default Progress;
