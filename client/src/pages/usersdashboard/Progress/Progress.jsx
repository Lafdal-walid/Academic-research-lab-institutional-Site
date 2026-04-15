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
      <div className="bg-[#151519] flex flex-col relative w-full shadow-2xl" 
           style={{ 
             padding: '1.8vw', 
             borderRadius: '1vw', 
             border: '1px solid rgba(255,255,255,0.05)' 
           }}>
        <div aria-hidden="true" 
             className="absolute border border-solid inset-0 pointer-events-none" 
             style={{ borderColor: '#1e1d22', borderRadius: '1vw' }} 
        />
        
        <div className="flex justify-between items-center relative z-10" style={{ marginBottom: '3vh' }}>
          <h2 className="font-bold text-white m-0" style={{ fontSize: '1.15vw', fontFamily: 'Gilroy, Poppins, sans-serif' }}>Projects</h2>
          <div className="bg-[#1e1e24] flex items-center justify-between border border-transparent focus-within:border-[#3457dc] transition-all"
               style={{ 
                 borderRadius: '0.8vw', 
                 width: '16vw', 
                 padding: '0.8vh 1.2vw' 
               }}>
            <input 
                type="text"
                placeholder="Search /"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-[#a5a5b2]"
                style={{ fontSize: '0.85vw', width: '100%', fontFamily: 'Poppins, sans-serif' }}
            />
            <div className="relative shrink-0" style={{ width: '1.2vw', height: '1.2vw' }}>
                <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 20 20">
                    <path d="M9.58333 17.5C13.9556 17.5 17.5 13.9556 17.5 9.58333C17.5 5.21108 13.9556 1.66667 9.58333 1.66667C5.21108 1.66667 1.66667 5.21108 1.66667 9.58333C1.66667 13.9556 5.21108 17.5 9.58333 17.5Z" stroke="#3457DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d="M18.3333 18.3333L16.6667 16.6667" stroke="#3457DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
            </div>
          </div>
        </div>
  
        <div className="flex items-center w-full relative z-10" style={{ marginBottom: '2vh', padding: '0 0.5vw' }}>
          <div className="w-[20vw] text-[#80808a]" style={{ fontSize: '0.85vw' }}>Project Name</div>
          <div className="flex-1 text-[#80808a] text-center" style={{ fontSize: '0.85vw' }}>Start Date</div>
          <div className="flex-1 text-[#80808a] text-center" style={{ fontSize: '0.85vw' }}>Estimated Deadline</div>
          <div className="flex-1 text-[#80808a] text-center" style={{ fontSize: '0.85vw' }}>Progress</div>
        </div>
  
        <div className="w-full relative z-10" style={{ height: '0.1vh', backgroundColor: '#1E1D22', marginBottom: '2.5vh' }} />
  
        <div className="flex flex-col relative z-10" style={{ gap: '2.5vh', minHeight: '25vh' }}>
          {filteredProjects.length > 0 ? filteredProjects.map((project) => (
            <div key={project.id} className="flex items-center w-full group transition-all animate-in fade-in slide-in-from-left-2 duration-300"
                 style={{ borderRadius: '0.5vw' }}>
              <div className="flex items-center w-[20vw]" style={{ gap: '1.2vw' }}>
                 <div className="overflow-hidden bg-white/5 shrink-0 border border-white/5"
                      style={{ width: '2.5vw', height: '8vh', borderRadius: '0.4vw' }}>
                    <img src={project.img} alt={project.name} className="w-full h-full object-cover" />
                 </div>
                 <div className="flex flex-col" style={{ gap: '0.3vh' }}>
                    <p className="font-bold text-white m-0" style={{ fontSize: '0.95vw', fontFamily: 'Gilroy, Poppins, sans-serif' }}>{project.name}</p>
                    <p className="text-[#a5a5b2] m-0" style={{ fontSize: '0.75vw', fontFamily: 'Poppins, sans-serif' }}>{project.update}</p>
                 </div>
              </div>
              <div className="flex-1 text-center text-white" style={{ fontSize: '0.85vw', fontFamily: 'Poppins, sans-serif' }}>{project.start}</div>
              <div className="flex-1 text-center text-white" style={{ fontSize: '0.85vw', fontFamily: 'Poppins, sans-serif' }}>{project.deadline}</div>
              <div className="flex-1 text-center text-white font-bold" style={{ fontSize: '0.9vw', fontFamily: 'Poppins, sans-serif' }}>{project.progress}</div>
            </div>
          )) : (
              <div className="flex items-center justify-center w-full" style={{ py: '5vh' }}>
                  <p className="text-[#80808a]" style={{ fontSize: '1vw' }}>No projects found matching your search.</p>
              </div>
          )}
        </div>
  
        <div className="w-full relative z-10" style={{ height: '0.1vh', backgroundColor: '#1E1D22', marginTop: '3vh', marginBottom: '2.5vh' }} />
  
        <div className="flex justify-between items-center w-full relative z-10">
           <button className="flex items-center justify-center bg-[#3457dc] rounded-full hover:bg-[#4a6dec] transition-all group"
                   style={{ width: '2.2vw', height: '2.2vw' }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2.5" className="rotate-180"
                   style={{ width: '1.2vw', height: '1.2vw' }}>
                 <path d="M7 15l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
           </button>
           <div className="flex items-center" style={{ gap: '0.8vw' }}>
              <div className="bg-white/[0.02] border border-[#1e1d22] text-white"
                   style={{ 
                     padding: '0.6vh 0.9vw', 
                     borderRadius: '0.4vw', 
                     fontSize: '0.9vw' 
                   }}>01</div>
              <span className="text-[#a5a5b2]" style={{ fontSize: '0.85vw' }}>out of 4</span>
           </div>
           <button className="flex items-center justify-center bg-[#3457dc] rounded-full hover:bg-[#4a6dec] transition-all group"
                   style={{ width: '2.2vw', height: '2.2vw' }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2.5"
                   style={{ width: '1.2vw', height: '1.2vw' }}>
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
          borderRadius: '1vw', padding: '1.5vw', display: 'flex',
          flexDirection: 'column', gap: '2.5vh', width: '100%',
          position: 'relative'
      }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', position: 'relative', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                  <h3 style={{ margin: 0, fontSize: '0.95vw', fontWeight: 800, color: 'white', fontFamily: 'Gilroy, sans-serif' }}>Ai magazine Project Roadmap</h3>
                  <p style={{ margin: 0, fontSize: '0.75vw', color: '#a5a5b2' }}>Key Objectives & Milestones.</p>
              </div>
  
              {/* Absolutely Centered Status */}
              <div style={{
                  position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                  display: 'flex', flexDirection: 'column', gap: '0.7vh', alignItems: 'center'
              }}>
                  <span style={{ fontSize: '0.75vw', color: '#3457DC', fontWeight: 500, whiteSpace: 'nowrap' }}>1 of 8 Completed</span>
                  <div style={{ width: '100%', minWidth: '4.5vw', height: '0.5vh', backgroundColor: '#1e1e24', borderRadius: '4vw', overflow: 'hidden' }}>
                      <div style={{ width: '12.5%', height: '100%', backgroundColor: '#3457DC' }} />
                  </div>
              </div>
          </div>
  
          <div style={{ height: '0.1vh', backgroundColor: '#2A2A30' }} />
  
          {/* Timeline Area with custom scrollbar */}
          <div className="academic-timeline-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '3.5vh', maxHeight: '40vh', overflowY: 'auto', paddingRight: '0.8vw' }}>
              {milestones.map((milestone, index) => (
                  <div key={index} style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
                      {/* Dot & Line Indicator */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '2.8vw', position: 'relative' }}>
                          <div style={{
                              backgroundColor: milestone.completed ? '#3457DC' : '#1e1e24',
                              backgroundImage: milestone.isCurrent ? 'linear-gradient(to bottom, #3457DC 50%, #1e1e24 50%)' : 'none',
                              padding: '0.8vw', borderRadius: '50%', display: 'flex',
                              alignItems: 'center', justifyContent: 'center', zIndex: 2,
                              position: 'relative'
                          }}>
                              <img src={milestone.isCurrent ? PauseIcon : ComputerIcon} alt="phase" style={{ width: '0.9vw', height: '0.9vw' }} />
                          </div>
                          {index !== milestones.length - 1 && (
                              <div style={{
                                  width: '0.1vw', 
                                  height: '11vh', 
                                  backgroundColor: (milestone.completed && milestones[index+1].completed) || (milestone.completed && milestones[index+1].isCurrent) ? '#3457DC' : '#1e1e24',
                                  position: 'absolute', 
                                  top: '2.2vh', 
                                  zIndex: 1
                              }} />
                          )}
                      </div>
  
                      {/* Content */}
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5vh' }}>
                              <span style={{ fontSize: '0.75vw', color: '#a5a5b2', fontWeight: 500 }}>{milestone.date}</span>
                              <span style={{ fontSize: '0.85vw', color: 'white', fontWeight: 400 }}>{milestone.title}</span>
                          </div>
                          <div style={{
                              backgroundColor: milestone.completed ? '#1e1e24' : 'rgba(30,30,36,0.3)', 
                              padding: '1vh 1.4vw', 
                              borderRadius: '0.8vw',
                              color: milestone.completed ? 'white' : '#80808a', 
                              fontSize: '0.8vw', fontWeight: 500, cursor: milestone.completed ? 'pointer' : 'default',
                              display: 'flex', alignItems: 'center', gap: '0.6vw',
                              border: milestone.completed ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(255,255,255,0.02)',
                              transition: 'all 0.2s'
                          }}
                          onMouseOver={(e) => { if(milestone.completed) e.currentTarget.style.backgroundColor = '#2a2a30' }}
                          onMouseOut={(e) => { if(milestone.completed) e.currentTarget.style.backgroundColor = '#1e1e24' }}
                          >
                              {milestone.completed ? 'View Details' : 'In Progress'}
                              {!milestone.completed && (
                                   <div style={{ display: 'flex', opacity: 0.4 }}>
                                      <img src={LockIcon} alt="lock" style={{ width: '0.8vw', height: '0.8vw' }} />
                                   </div>
                              )}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
  
          {/* Bottom HR Divider */}
          <div style={{ padding: '2.5vh 0 1.5vh 0' }}>
              <div style={{ height: '0.1vh', backgroundColor: '#2A2A30', width: '100%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8vw', marginTop: '2vh' }}>
                  <img src={InfoYellowIcon} alt="info" style={{ width: '1.3vw', height: '1.3vw', flexShrink: 0 }} />
                  <p style={{ color: '#FCC841', fontSize: '0.75vw', margin: 0, fontFamily: 'Poppins, sans-serif' }}>
                      Milestones are updated based on Team Leader validation. Completing tasks ensures a steady workflow toward the final project goal.
                  </p>
              </div>
          </div>
  
          <style dangerouslySetInnerHTML={{
              __html: `
              .academic-timeline-scroll::-webkit-scrollbar {
                  width: 0.35vw;
              }
              .academic-timeline-scroll::-webkit-scrollbar-track {
                  background: transparent;
              }
              .academic-timeline-scroll::-webkit-scrollbar-thumb {
                  background: #3457DC;
                  border-radius: 1vw;
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
