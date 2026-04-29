import React, { useState, useEffect } from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import CalendarIcon from "@/assets/svg/userDashboard/PhdTracker/calendar-clock (7) 3.svg";
import ComputerIcon from "@/assets/svg/userDashboard/PhdTracker/computer_(1)_1.svg";
import InfoYellowIcon from "@/assets/svg/userDashboard/Progress/Frame_9216.svg";
import PauseIcon from "@/assets/svg/userDashboard/Progress/pause_1.svg";
import LockIcon from "@/assets/svg/userDashboard/Progress/lock_3.svg";

// Import project images
import img1 from "@/assets/svg/userDashboard/Progress/01-ai-cover-mar2024-static_(2) (2) 1.png";
import img2 from "@/assets/svg/userDashboard/Progress/5a30797ac91abd1c88194b924cf3eaa9 2.png";
import img3 from "@/assets/svg/userDashboard/Progress/imagesf.png";
import API_BASE_URL from '@/config';

const ProjectsTable = ({ projects, selectedProject, setSelectedProject }) => {
    const { t } = useTranslation('progress');
    const { language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProjects = projects.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="projects-table-card" 
           style={{ 
             backgroundColor: '#151519',
             flexDirection: 'column',
             display: 'flex',
             relative: 'relative',
             width: '100%',
             padding: '1.8vw', 
             borderRadius: '1vw', 
             border: '1px solid rgba(255,255,255,0.05)',
             boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
             position: 'relative',
             direction: language === 'ar' ? 'rtl' : 'ltr'
           }}>
        
        <div className="projects-table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3vh' }}>
          <h2 className="projects-table-title" style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '1.15vw', fontFamily: 'Gilroy, Poppins, sans-serif' }}>{t('projects')}</h2>
          <div className="projects-search-bar"
               style={{ 
                 backgroundColor: '#1e1e24',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'space-between',
                 border: '1px solid transparent',
                 transition: 'all 0.3s',
                 borderRadius: '0.8vw', 
                 width: '16vw', 
                 padding: '0.8vh 1.2vw' 
               }}>
            <input 
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '0.85vw', width: '100%', fontFamily: 'Poppins, sans-serif' }}
            />
            <div className="search-icon-wrapper" style={{ position: 'relative', flexShrink: 0, width: '1.2vw', height: '1.2vw' }}>
                <svg style={{ position: 'absolute', display: 'block', inset: 0, width: '100%', height: '100%' }} fill="none" viewBox="0 0 20 20">
                    <path d="M9.58333 17.5C13.9556 17.5 17.5 13.9556 17.5 9.58333C17.5 5.21108 13.9556 1.66667 9.58333 1.66667C5.21108 1.66667 1.66667 5.21108 1.66667 9.58333C1.66667 13.9556 5.21108 17.5 9.58333 17.5Z" stroke="#3457DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d="M18.3333 18.3333L16.6667 16.6667" stroke="#3457DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
            </div>
          </div>
        </div>
  
        <div className="projects-table-row-header" style={{ display: 'flex', alignItems: 'center', wFull: '100%', marginBottom: '2vh', padding: '0 0.5vw' }}>
          <div className="col-name" style={{ width: '20vw', color: '#80808a', fontSize: '0.85vw' }}>{t('projectName')}</div>
          <div className="col-date" style={{ flex: 1, color: '#80808a', textAlign: 'center', fontSize: '0.85vw' }}>{t('startDate')}</div>
          <div className="col-deadline" style={{ flex: 1, color: '#80808a', textAlign: 'center', fontSize: '0.85vw' }}>{t('estimatedDeadline')}</div>
          <div className="col-progress" style={{ flex: 1, color: '#80808a', textAlign: 'center', fontSize: '0.85vw' }}>{t('progress')}</div>
        </div>
  
        <div className="divider-line" style={{ width: '100%', height: '0.1vh', backgroundColor: '#1E1D22', marginBottom: '2.5vh' }} />
  
        <div className="projects-list-container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5vh', minHeight: '25vh' }}>
          {filteredProjects.length > 0 ? filteredProjects.map((project) => {
            const m = project.milestones || [];
            const c = m.filter(x => x.completed).length;
            const progressRatio = m.length > 0 ? Math.round((c / m.length) * 100) : 0;
            const isSelected = selectedProject && selectedProject._id === project._id;
            
            return (
            <div key={project._id} 
                 className="project-data-row"
                 onClick={() => setSelectedProject(project)}
                 style={{ 
                     display: 'flex',
                     alignItems: 'center',
                     width: '100%',
                     cursor: 'pointer',
                     transition: 'all 0.3s',
                     borderRadius: '0.5vw', 
                     backgroundColor: isSelected ? 'rgba(52,87,220,0.1)' : 'transparent',
                     padding: '1vh 0.5vw',
                     border: isSelected ? '1px solid rgba(52,87,220,0.3)' : '1px solid transparent'
                 }}>
              <div className="project-info-col" style={{ display: 'flex', alignItems: 'center', width: '20vw', gap: '1.2vw' }}>
                 <div className="project-image-box"
                      style={{ overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.05)', flexShrink: 0, border: '1px solid rgba(255,255,255,0.05)', width: '2.5vw', height: '8vh', borderRadius: '0.4vw' }}>
                    <img src={project.imageUrl ? `${API_BASE_URL}${project.imageUrl}` : img1} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 </div>
                 <div className="project-title-box" style={{ display: 'flex', flexDirection: 'column', gap: '0.3vh' }}>
                    <p style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '0.95vw', fontFamily: 'Gilroy, Poppins, sans-serif' }}>{project.title}</p>
                    <p style={{ color: '#a5a5b2', margin: 0, fontSize: '0.75vw', fontFamily: 'Poppins, sans-serif' }}>{new Date(project.updatedAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}</p>
                 </div>
              </div>
              <div className="project-date-col" data-label={`${t('startDate')}:`} style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: '0.85vw', fontFamily: 'Poppins, sans-serif' }}>{new Date(project.startDate).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}</div>
              <div className="project-deadline-col" data-label={`${t('estimatedDeadline')}:`} style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: '0.85vw', fontFamily: 'Poppins, sans-serif' }}>{project.endDate ? new Date(project.endDate).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US') : 'N/A'}</div>
              <div className="project-progress-col" data-label={`${t('progress')}:`} style={{ flex: 1, textAlign: 'center', color: isSelected ? '#3457dc' : 'white', fontWeight: 'bold', fontSize: '0.9vw', fontFamily: 'Poppins, sans-serif' }}>{progressRatio}%</div>
            </div>
            );
          }) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '5vh 0' }}>
                  <p style={{ color: '#80808a', fontSize: '1vw' }}>{t('noProjectsFound')}</p>
              </div>
          )}
        </div>
  
        <div className="divider-line" style={{ width: '100%', height: '0.1vh', backgroundColor: '#1E1D22', marginTop: '3vh', marginBottom: '2.5vh' }} />
  
        <div className="projects-pagination-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}>
           <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3457dc', borderRadius: '50%', border: 'none', cursor: 'pointer', width: '2.2vw', height: '2.2vw' }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2.5" style={{ transform: language === 'ar' ? 'none' : 'rotate(180deg)', width: '1.2vw', height: '1.2vw' }}>
                 <path d="M7 15l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
           </button>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.8vw' }}>
              <div style={{ 
                       backgroundColor: 'rgba(255,255,255,0.02)', 
                       border: '1px solid #1e1d22', 
                       color: 'white',
                       padding: '0.6vh 0.9vw', 
                       borderRadius: '0.4vw', 
                       fontSize: '0.9vw' 
                     }}>01</div>
              <span style={{ color: '#a5a5b2', fontSize: '0.85vw' }}>{t('of')} 1</span>
           </div>
           <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3457dc', borderRadius: '50%', border: 'none', cursor: 'pointer', width: '2.2vw', height: '2.2vw' }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2.5" style={{ transform: language === 'ar' ? 'rotate(180deg)' : 'none', width: '1.2vw', height: '1.2vw' }}>
                 <path d="M7 15l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
           </button>
        </div>
      </div>
    );
  };

const RoadmapSection = ({ project }) => {
    const { t } = useTranslation('progress');
    const { language } = useLanguage();
    if(!project) return null;
    
    // Sort milestones by date assuming date is chronological, but they are stored as strings or dates in schema.
    const milestones = project.milestones || [];
    const completedCount = milestones.filter(m => m.completed).length;
    let nextInProgressFound = false;

    // Create renderable milestones
    const renderableMilestones = milestones.map((m, index) => {
        let isCurrent = false;
        if (!m.completed && !nextInProgressFound) {
            isCurrent = true;
            nextInProgressFound = true;
        }
        return {
            ...m,
            isCurrent
        };
    });
  
    return (
      <div className="roadmap-section-card" style={{
          marginTop: '5vh',
          backgroundColor: '#151519', border: '1px solid #1e1d22',
          borderRadius: '1vw', padding: '1.5vw', display: 'flex',
          flexDirection: 'column', gap: '2.5vh', width: '100%',
          position: 'relative',
          direction: language === 'ar' ? 'rtl' : 'ltr'
      }}>
          {/* Header */}
          <div className="roadmap-header" style={{ display: 'flex', alignItems: 'flex-end', position: 'relative', width: '100%' }}>
              <div className="roadmap-title-box" style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                  <h3 className="roadmap-main-title" style={{ margin: 0, fontSize: '0.95vw', fontWeight: 800, color: 'white', fontFamily: 'Gilroy, sans-serif' }}>{project.title} {t('roadmap')}</h3>
                  <p className="roadmap-subtitle" style={{ margin: 0, fontSize: '0.75vw', color: '#a5a5b2' }}>{t('keyObjectives')}</p>
              </div>
  
              {/* Absolutely Centered Status */}
              <div className="roadmap-status-box" style={{
                  position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                  display: 'flex', flexDirection: 'column', gap: '0.7vh', alignItems: 'center'
              }}>
                  <span className="roadmap-status-text" style={{ fontSize: '0.75vw', color: '#3457DC', fontWeight: 500, whiteSpace: 'nowrap' }}>{completedCount} {t('of')} {milestones.length} {t('completed')}</span>
                  <div className="roadmap-progress-bg" style={{ width: '100%', minWidth: '4.5vw', height: '0.5vh', backgroundColor: '#1e1e24', borderRadius: '4vw', overflow: 'hidden' }}>
                      <div className="roadmap-progress-fill" style={{ width: `${milestones.length ? (completedCount/milestones.length)*100 : 0}%`, height: '100%', backgroundColor: '#3457DC', transition: 'width 0.3s ease' }} />
                  </div>
              </div>
          </div>
  
          <div className="divider-line" style={{ height: '0.1vh', backgroundColor: '#2A2A30' }} />
  
          {/* Timeline Area with custom scrollbar */}
          <div className="academic-timeline-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '3.5vh', maxHeight: '40vh', overflowY: 'auto', paddingRight: '0.8vw' }}>
              {renderableMilestones.length > 0 ? renderableMilestones.map((milestone, index) => (
                  <div key={index} className="timeline-item" style={{ display: 'flex', gap: '1.5vw', alignItems: 'flex-start' }}>
                      {/* Dot & Line Indicator */}
                      <div className="timeline-indicator" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '2.8vw', position: 'relative' }}>
                          <div className="timeline-dot" style={{
                              backgroundColor: milestone.completed ? '#3457DC' : '#1e1e24',
                              backgroundImage: milestone.isCurrent ? 'linear-gradient(to bottom, #3457DC 50%, #1e1e24 50%)' : 'none',
                              padding: '0.8vw', borderRadius: '50%', display: 'flex',
                              alignItems: 'center', justifyContent: 'center', zIndex: 2,
                              position: 'relative'
                          }}>
                              <img src={milestone.isCurrent ? PauseIcon : ComputerIcon} alt="phase" className="timeline-icon" style={{ width: '0.9vw', height: '0.9vw' }} />
                          </div>
                          {index !== renderableMilestones.length - 1 && (
                              <div className="timeline-line" style={{
                                  width: '0.1vw', 
                                  height: '11vh', 
                                  backgroundColor: (milestone.completed && renderableMilestones[index+1].completed) || (milestone.completed && renderableMilestones[index+1].isCurrent) ? '#3457DC' : '#1e1e24',
                                  position: 'absolute', 
                                  top: '2.2vh', 
                                  zIndex: 1
                              }} />
                          )}
                      </div>
  
                      {/* Content */}
                      <div className="timeline-content" style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div className="timeline-text" style={{ display: 'flex', flexDirection: 'column', gap: '0.5vh' }}>
                              <span className="milestone-date" style={{ fontSize: '0.75vw', color: '#a5a5b2', fontWeight: 500 }}>{milestone.date}</span>
                              <span className="milestone-title" style={{ fontSize: '0.85vw', color: 'white', fontWeight: 400 }}>{milestone.title}</span>
                          </div>
                          <div className="milestone-action-btn" style={{
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
                              <span className="btn-text">{milestone.completed ? t('viewDetails') : t('inProgress')}</span>
                              {!milestone.completed && (
                                   <div className="lock-icon-box" style={{ display: 'flex', opacity: 0.4 }}>
                                      <img src={LockIcon} alt="lock" style={{ width: '0.8vw', height: '0.8vw' }} />
                                   </div>
                              )}
                          </div>
                      </div>
                  </div>
              )) : (
                  <div className="no-milestones" style={{ color: '#80808a', fontSize: '0.9vw', textAlign: 'center', padding: '3vh' }}>
                      {t('noMilestones')}
                  </div>
              )}
          </div>
  
          {/* Bottom HR Divider */}
          <div className="roadmap-footer" style={{ padding: '2.5vh 0 1.5vh 0' }}>
              <div className="divider-line" style={{ height: '0.1vh', backgroundColor: '#2A2A30', width: '100%' }} />
              <div className="info-box" style={{ display: 'flex', alignItems: 'center', gap: '0.8vw', marginTop: '2vh' }}>
                  <img src={InfoYellowIcon} alt="info" className="info-icon" style={{ width: '1.3vw', height: '1.3vw', flexShrink: 0 }} />
                  <p className="info-text" style={{ color: '#FCC841', fontSize: '0.75vw', margin: 0, fontFamily: 'Poppins, sans-serif' }}>
                      {t('milestonesInfo')}
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
  const { t } = useTranslation('progress');
  const { language } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/projects`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
          if (data.length > 0) {
            setSelectedProject(data[0]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="w-full text-white font-poppins pb-[6vh] animate-in fade-in duration-500">
      <style dangerouslySetInnerHTML={{ __html: progressStyles }} />
      {/* Header Section with Title and Action Button */}
      <div className="progress-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '-1.5vh', marginBottom: '2.5vh', direction: language === 'ar' ? 'rtl' : 'ltr' }}>
        <h1 className="progress-main-title" style={{
          fontSize: '1vw',
          fontWeight: 700,
          color: '#ffffff',
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: '-0.02em',
          margin: 0
        }}>
          {t('progressTitle')}
        </h1>
        
        <button 
          className="date-range-btn"
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1e1e24',
            transition: 'all 0.3s',
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
            {t('dateRange')}
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

      <ProjectsTable projects={projects} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
      
      <RoadmapSection project={selectedProject} />
    </div>
  );
};

const progressStyles = `
@media screen and (max-width: 1024px) {
    .progress-header-row {
        margin-top: 20px !important;
        margin-bottom: 25px !important;
    }
    .progress-main-title {
        font-size: 20px !important;
    }
    .date-range-btn {
        padding: 10px 16px !important;
        border-radius: 10px !important;
        gap: 8px !important;
    }
    .date-range-btn span {
        font-size: 14px !important;
    }
    .date-range-btn img {
        width: 16px !important;
        height: 16px !important;
    }

    /* Projects Table Card */
    .projects-table-card {
        padding: 20px 16px !important;
        border-radius: 16px !important;
        margin-top: 20px !important;
    }
    .projects-table-header {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 15px !important;
        margin-bottom: 25px !important;
    }
    .projects-table-title {
        font-size: 18px !important;
    }
    .projects-search-bar {
        width: 100% !important;
        padding: 12px 16px !important;
        border-radius: 12px !important;
    }
    .projects-search-bar input {
        font-size: 14px !important;
    }
    .search-icon-wrapper {
        width: 18px !important;
        height: 18px !important;
    }

    /* Table Rows - Cards on Mobile */
    .projects-table-row-header {
        display: none !important;
    }
    .projects-list-container {
        gap: 15px !important;
    }
    .project-data-row {
        flex-direction: column !important;
        align-items: flex-start !important;
        padding: 15px !important;
        border-radius: 12px !important;
        background: rgba(255, 255, 255, 0.02) !important;
        border: 1px solid rgba(255, 255, 255, 0.05) !important;
        gap: 15px !important;
    }
    .project-info-col {
        width: 100% !important;
        gap: 12px !important;
    }
    .project-image-box {
        width: 48px !important;
        height: 48px !important;
        border-radius: 8px !important;
    }
    .project-title-box p:first-child {
        font-size: 16px !important;
    }
    .project-title-box p:last-child {
        font-size: 12px !important;
    }
    .project-date-col, .project-deadline-col {
        width: 100% !important;
        text-align: left !important;
        font-size: 14px !important;
        display: flex !important;
        justify-content: space-between !important;
    }
    .project-date-col::before {
        content: attr(data-label);
        color: #80808a;
    }
    .project-deadline-col::before {
        content: attr(data-label);
        color: #80808a;
    }
    .project-progress-col {
        width: 100% !important;
        text-align: left !important;
        font-size: 16px !important;
        display: flex !important;
        justify-content: space-between !important;
    }
    .project-progress-col::before {
        content: attr(data-label);
        color: #80808a;
        font-weight: 400;
    }

    /* Pagination */
    .projects-pagination-row {
        margin-top: 20px !important;
    }
    .projects-pagination-row button {
        width: 40px !important;
        height: 40px !important;
    }
    .projects-pagination-row button svg {
        width: 18px !important;
        height: 18px !important;
    }
    .projects-pagination-row div div {
        padding: 8px 12px !important;
        border-radius: 8px !important;
        font-size: 14px !important;
    }
    .projects-pagination-row span {
        font-size: 14px !important;
    }

    /* Roadmap Section */
    .roadmap-section-card {
        padding: 20px 16px !important;
        border-radius: 16px !important;
        margin-top: 30px !important;
    }
    .roadmap-header {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 20px !important;
    }
    .roadmap-main-title {
        font-size: 18px !important;
    }
    .roadmap-subtitle {
        font-size: 13px !important;
    }
    .roadmap-status-box {
        position: static !important;
        transform: none !important;
        width: 100% !important;
        align-items: flex-start !important;
    }
    .roadmap-status-text {
        font-size: 14px !important;
    }
    .roadmap-progress-bg {
        width: 100% !important;
        height: 6px !important;
    }

    /* Timeline Items */
    .academic-timeline-scroll {
        max-height: none !important;
        gap: 30px !important;
        padding-right: 0 !important;
    }
    .timeline-item {
        gap: 15px !important;
    }
    .timeline-indicator {
        min-width: 40px !important;
    }
    .timeline-dot {
        padding: 10px !important;
    }
    .timeline-icon {
        width: 16px !important;
        height: 16px !important;
    }
    .timeline-line {
        width: 2px !important;
        height: 100px !important;
        top: 30px !important;
    }
    .timeline-content {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 15px !important;
    }
    .milestone-date {
        font-size: 12px !important;
    }
    .milestone-title {
        font-size: 14px !important;
    }
    .milestone-action-btn {
        padding: 8px 16px !important;
        border-radius: 10px !important;
        width: 100% !important;
        justify-content: center !important;
    }
    .milestone-action-btn .btn-text {
        font-size: 13px !important;
    }
    .lock-icon-box img {
        width: 14px !important;
        height: 14px !important;
    }

    .info-box {
        gap: 10px !important;
        align-items: flex-start !important;
    }
    .info-icon {
        width: 18px !important;
        height: 18px !important;
    }
    .info-text {
        font-size: 12px !important;
        line-height: 1.5 !important;
    }
}
`;

export default Progress;
