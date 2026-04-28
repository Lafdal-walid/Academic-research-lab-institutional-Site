import React from 'react';
import InfoYellowIcon from '@/assets/svg/userDashboard/Progress/Frame_9216.svg';
import PauseIcon from '@/assets/svg/userDashboard/Progress/pause_1.svg';
import ComputerIcon from '@/assets/svg/userDashboard/Progress/calendar-clock_(1)_2.svg';
import LockIcon from '@/assets/svg/userDashboard/Progress/lock_3.svg';
const RoadmapSection = ({ project }) => {
  if (!project) return null;

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
    return { ...m, isCurrent };
  });

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
          <h3 style={{ margin: 0, fontSize: '0.95vw', fontWeight: 800, color: 'white', fontFamily: 'Gilroy, sans-serif' }}>{project.title} Roadmap</h3>
          <p style={{ margin: 0, fontSize: '0.75vw', color: '#a5a5b2' }}>Key Objectives & Milestones.</p>
        </div>
        {/* Absolutely Centered Status */}
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', gap: '0.7vh', alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.75vw', color: '#3457DC', fontWeight: 500, whiteSpace: 'nowrap' }}>{completedCount} of {milestones.length} Completed</span>
          <div style={{ width: '100%', minWidth: '4.5vw', height: '0.5vh', backgroundColor: '#1e1e24', borderRadius: '4vw', overflow: 'hidden' }}>
            <div style={{ width: `${milestones.length ? (completedCount / milestones.length) * 100 : 0}%`, height: '100%', backgroundColor: '#3457DC', transition: 'width 0.3s ease' }} />
          </div>
        </div>
      </div>

      <div style={{ height: '0.1vh', backgroundColor: '#2A2A30' }} />

      {/* Timeline Area with custom scrollbar */}
      <div className="academic-timeline-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '3.5vh', maxHeight: '40vh', overflowY: 'auto', paddingRight: '0.8vw' }}>
        {renderableMilestones.length > 0 ? renderableMilestones.map((milestone, index) => (
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
              {index !== renderableMilestones.length - 1 && (
                <div style={{
                  width: '0.1vw',
                  height: '11vh',
                  backgroundColor: (milestone.completed && renderableMilestones[index + 1].completed) || (milestone.completed && renderableMilestones[index + 1].isCurrent) ? '#3457DC' : '#1e1e24',
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
                onMouseOver={e => { if (milestone.completed) e.currentTarget.style.backgroundColor = '#2a2a30'; }}
                onMouseOut={e => { if (milestone.completed) e.currentTarget.style.backgroundColor = '#1e1e24'; }}
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
        )) : (
          <div style={{ color: '#80808a', fontSize: '0.9vw', textAlign: 'center', padding: '3vh' }}>
            No milestones have been created for this project yet.
          </div>
        )}
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

      <style dangerouslySetInnerHTML={{ __html: `
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

export default RoadmapSection;
