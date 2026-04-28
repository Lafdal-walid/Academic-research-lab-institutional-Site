import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiSearch2Line, RiArrowLeftSLine, RiArrowRightSLine, RiCheckLine } from 'react-icons/ri';

// Assets
import ProjectsIcon from "@/assets/svg/LeaderDashboard/users/Vector-1.svg";
import CalendarIcon from "@/assets/svg/userDashboard/PhdTracker/calendar-clock (7) 3.svg";
import ComputerIcon from "@/assets/svg/userDashboard/PhdTracker/computer_(1)_1.svg";
import DropdownIcon from "@/assets/svg/userDashboard/PhdTracker/angle-small-down 1.svg";
import DetailsIcon from "@/assets/svg/LeaderDashboard/users/Frame 6492.svg";
import LockIcon from "@/assets/svg/userDashboard/Progress/lock_3.svg";
import InfoYellowIcon from "@/assets/svg/userDashboard/Progress/Frame_9216.svg";
import PauseIcon from "@/assets/svg/userDashboard/Progress/pause_1.svg";

// Project Images
import img1 from "@/assets/svg/userDashboard/Progress/01-ai-cover-mar2024-static_(2) (2) 1.png";
import img2 from "@/assets/svg/userDashboard/Progress/5a30797ac91abd1c88194b924cf3eaa9 2.png";
import img3 from "@/assets/svg/userDashboard/Progress/imagesf.png";
import API_BASE_URL from '@/config';

const Tab = ({ label, isActive, onClick }) => {
    return (
        <div
            className="flex flex-col items-center justify-center cursor-pointer min-w-[100px] relative"
            onClick={onClick}
        >
            <div className="flex flex-col items-center w-fit relative" style={{ gap: '8px' }}>
                <p className={`font-poppins font-bold leading-[normal] not-italic text-[15.36px] whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#3457dc] scale-105' : 'text-[#a5a5b2] hover:text-[#f5f5f5]'}`}>
                    {label}
                </p>

                {/* Framer Motion Active Underline */}
                {isActive && (
                    <motion.div
                        layoutId="activeUnderlineProjects"
                        initial={false}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35
                        }}
                        className="absolute bg-[#3457dc] h-[2px] rounded-[400px] w-full"
                        style={{
                            bottom: -10,
                            left: 0,
                            right: 0,
                            boxShadow: '0 0 8px rgba(52,87,220,0.4)'
                        }}
                    />
                )}
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value }) => {
    return (
        <div style={{
            width: '100%',
            backgroundColor: '#151519',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '1.2vw',
            padding: '1vh 1.2vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '20vh',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            cursor: 'default'
        }}>
            {/* Background Glow */}
            <div style={{
                position: 'absolute', top: -1, right: -1, bottom: -1, left: -1,
                background: 'radial-gradient(43.95% 65.1% at 100% 0%, #3457DC 0%, rgba(21,21,25,0) 100%)',
                pointerEvents: 'none', opacity: 0.45, zIndex: 1
            }} />

            {/* Top Part: Icon & Title */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1.2vh' }}>
                <div style={{
                    width: '2.5vw', height: '2.5vw', minWidth: '35px', minHeight: '35px',
                    backgroundColor: 'rgba(52, 87, 220, 0.12)', borderRadius: '0.7vw',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                }}>
                    <img src={icon} alt="icon" style={{ width: '1.2vw', height: '1.2vw', objectFit: 'contain' }} />
                </div>
                <span style={{
                    fontSize: '0.9vw', fontWeight: 600, color: '#A5A5B2',
                    textTransform: 'capitalize', letterSpacing: '0.01vw', fontFamily: "'Poppins', sans-serif"
                }}>
                    {title}
                </span>
            </div>

            {/* Bottom Part: Value */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginTop: '0.3vh' }}>
                <h3 style={{ fontSize: '1.8vw', fontWeight: 500, color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                    {value}
                </h3>
            </div>
        </div>
    );
};

const ProjectTimeline = ({ projectName, projectId, milestones = [], onRefresh }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingPhase, setEditingPhase] = useState(null);
    const [newM, setNewM] = useState({ title: '', date: '' });
    const [isSaving, setIsLoading] = useState(false);

    const handleAddMilestone = async () => {
        if (!newM.title) return alert('Please enter a title');
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}/milestones`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newM)
            });
            const data = await res.json();
            if (res.ok) {
                setIsAdding(false);
                setNewM({ title: '', date: '' });
                if (onRefresh) onRefresh(true);
                alert('Phase saved successfully!');
            } else {
                alert(`Error: ${data.message || 'Failed to save phase'}`);
            }
        } catch (err) {
            console.error(err);
            alert('Connection failed while saving phase');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleMilestone = async (milestoneId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}/milestones/${milestoneId}/toggle`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                if (onRefresh) onRefresh(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{
            backgroundColor: '#151519', border: '1px solid #1e1d22',
            borderRadius: '16px', padding: '24px', display: 'flex',
            flexDirection: 'column', gap: '24px', width: '100%'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-end', position: 'relative', width: '100%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'white', fontFamily: 'Gilroy, sans-serif' }}>
                        {projectName} Project Roadmap
                    </h3>
                    <p style={{ margin: 0, fontSize: '14px', color: '#a5a5b2' }}>Key Objectives & Milestones.</p>
                </div>
                
                {/* Absolutely Centered Status */}
                <div style={{
                    position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center'
                }}>
                    <span style={{ fontSize: '14px', color: '#3457DC', fontWeight: 500 }}>
                         {milestones.filter(m => m.completed).length} of {milestones.length} Phases Completed
                    </span>
                    <div style={{ width: '60px', height: '4px', backgroundColor: '#1e1e24', borderRadius: '400px', overflow: 'hidden' }}>
                        <div style={{ 
                            width: milestones.length > 0 ? `${(milestones.filter(m => m.completed).length / milestones.length) * 60}px` : '0px', 
                            height: '100%', 
                            backgroundColor: '#3457DC' 
                        }} />
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', zIndex: 10 }}>
                    <button 
                        onClick={() => setIsAdding(!isAdding)}
                        style={{
                            backgroundColor: '#3457dc', color: 'white', padding: '10px 20px', borderRadius: '12px',
                            fontSize: '14px', fontWeight: 'bold', border: 'none', cursor: 'pointer',
                            transition: 'all 0.2s', whiteSpace: 'nowrap'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2a4ac0'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3457dc'}
                    >
                        {isAdding ? 'Cancel' : '+ Add NEW Phase'}
                    </button>
                </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#2A2A30' }} />

            {/* Add Milestone Form */}
            <AnimatePresence>
                {isAdding && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ 
                            display: 'flex', gap: '20px', alignItems: 'flex-end', 
                            backgroundColor: '#1E1E24', padding: '24px', 
                            borderRadius: '16px', border: '1px solid #2a2a30',
                            marginBottom: '10px'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                                <span style={{ fontSize: '14px', color: '#80808a', fontWeight: 500, fontFamily: 'Poppins, sans-serif' }}>Phase Title</span>
                                <div style={{ position: 'relative', width: '100%', height: '48px' }}>
                                    <div style={{ position: 'absolute', inset: 0, border: '1px solid #2a2a30', borderRadius: '12px', pointerEvents: 'none', transition: 'border-color 0.2s' }} className="input-border-target" />
                                    <input 
                                        style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.01)', border: 'none', borderRadius: '12px', padding: '0 16px', color: 'white', fontSize: '14px', outline: 'none', fontFamily: 'Poppins, sans-serif', boxSizing: 'border-box' }}
                                        placeholder="e.g. Data Collection"
                                        value={newM.title}
                                        onChange={(e) => setNewM({...newM, title: e.target.value})}
                                        onFocus={(e) => e.target.previousSibling.style.borderColor = '#3457DC'}
                                        onBlur={(e) => e.target.previousSibling.style.borderColor = '#2a2a30'}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '220px' }}>
                                <span style={{ fontSize: '14px', color: '#80808a', fontWeight: 500, fontFamily: 'Poppins, sans-serif' }}>Target Date</span>
                                <div style={{ position: 'relative', width: '100%', height: '48px' }}>
                                    <div style={{ position: 'absolute', inset: 0, border: '1px solid #2a2a30', borderRadius: '12px', pointerEvents: 'none', transition: 'border-color 0.2s' }} />
                                    <input 
                                        type="date"
                                        style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.01)', border: 'none', borderRadius: '12px', padding: '0 16px', color: 'white', fontSize: '14px', outline: 'none', fontFamily: 'Poppins, sans-serif', colorScheme: 'dark', boxSizing: 'border-box' }}
                                        value={newM.date}
                                        onChange={(e) => setNewM({...newM, date: e.target.value})}
                                        onFocus={(e) => e.target.previousSibling.style.borderColor = '#3457DC'}
                                        onBlur={(e) => e.target.previousSibling.style.borderColor = '#2a2a30'}
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={handleAddMilestone}
                                disabled={isSaving}
                                style={{
                                    backgroundColor: '#3457dc', color: 'white', padding: '0 24px', height: '48px',
                                    borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', border: 'none', cursor: 'pointer',
                                    opacity: isSaving ? 0.5 : 1, transition: 'all 0.2s', fontFamily: 'Poppins, sans-serif',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                                onMouseOver={(e) => { if(!isSaving) e.currentTarget.style.backgroundColor = '#2a4ac0'; }}
                                onMouseOut={(e) => { if(!isSaving) e.currentTarget.style.backgroundColor = '#3457dc'; }}
                            >
                                {isSaving ? 'Saving...' : 'Save Phase'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Timeline Area with custom scrollbar */}
            <div className="academic-timeline-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxHeight: '300px', overflowY: 'auto', paddingRight: '12px' }}>
                {/* Default Project Creation Phase */}
                <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '46px', position: 'relative' }}>
                        <div style={{
                            backgroundColor: '#3457DC',
                            padding: '14px', borderRadius: '50%', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', zIndex: 2,
                            position: 'relative'
                        }}>
                            <img src={ComputerIcon} alt="phase" style={{ width: '16px', height: '16px' }} />
                        </div>
                        {(milestones.length > 0) && (
                            <div style={{
                                width: '2px', height: '100px', backgroundColor: '#3457DC',
                                position: 'absolute', top: '22px', zIndex: 1
                            }} />
                        )}
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '14px', color: '#a5a5b2', fontWeight: 500 }}>Initial phase</span>
                            <span style={{ fontSize: '14px', color: 'white', fontWeight: 400 }}>Project Creation & Planning</span>
                        </div>
                        <div style={{
                            backgroundColor: '#1e1e24', padding: '10px 24px', borderRadius: '16px',
                            color: 'white', fontSize: '14px', fontWeight: 500, cursor: 'default'
                        }}>
                            Completed
                        </div>
                    </div>
                </div>

                {milestones.map((phase, index) => (
                    <div key={phase._id || index} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '46px', position: 'relative' }}>
                            <div style={{
                                backgroundColor: phase.completed ? '#3457DC' : '#1e1e24',
                                padding: '14px', borderRadius: '50%', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', zIndex: 2,
                                position: 'relative'
                            }}>
                                <img src={ComputerIcon} alt="phase" style={{ width: '16px', height: '16px' }} />
                            </div>
                            {index !== milestones.length - 1 && (
                                <div style={{
                                    width: '2px', height: '100px', backgroundColor: '#3457DC',
                                    position: 'absolute', top: '22px', zIndex: 1
                                }} />
                            )}
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div 
                                onClick={() => setEditingPhase(phase)}
                                style={{ display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer' }}
                                className="group"
                            >
                                <span style={{ fontSize: '14px', color: '#a5a5b2', fontWeight: 500 }}>{phase.date || 'TBD'}</span>
                                <span style={{ fontSize: '14px', color: 'white', fontWeight: 400, borderBottom: '1px dashed transparent' }} className="group-hover:border-[#3457DC] group-hover:text-[#3457DC] transition-all">
                                    {phase.title}
                                </span>
                            </div>
                            <div 
                                onClick={() => handleToggleMilestone(phase._id)}
                                style={{
                                    backgroundColor: phase.completed ? 'rgba(39, 189, 173, 0.1)' : '#1e1e24', 
                                    padding: '10px 24px', borderRadius: '16px',
                                    color: phase.completed ? '#27bdad' : 'white', 
                                    fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                                    border: phase.completed ? '1px solid rgba(39, 189, 173, 0.2)' : 'none'
                                }}
                            >
                                {phase.completed ? 'Completed' : 'Mark Complete'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <EditPhaseModal 
                isOpen={!!editingPhase} 
                onClose={() => setEditingPhase(null)} 
                projectId={projectId} 
                phase={editingPhase} 
                onUpdate={onRefresh} 
            />

            {/* Bottom HR Divider */}
            <div style={{ padding: '24px 0 8px 0' }}>
                <div style={{ height: '1px', backgroundColor: '#2A2A30', width: '100%' }} />
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

const EditProjectModal = ({ isOpen, onClose, project, teams, users, onUpdate }) => {
    // Determine Team Leader ID for exclusion
    const assignedTeam = teams.find(t => t._id === (project?.raw?.team?._id || project?.raw?.team));
    const teamLeaderId = assignedTeam?.leader?._id || assignedTeam?.leader;

    const [formData, setFormData] = useState({
        name: project?.name || '',
        description: project?.raw?.description || '',
        teamId: project?.raw?.team?._id || project?.raw?.team || '',
        leaderId: project?.raw?.leader?._id || project?.raw?.leader || '',
        members: (project?.raw?.members || [])
            .map(m => m._id || m)
            .filter(mId => {
                const isProjectLeader = mId?.toString() === (project?.raw?.leader?._id || project?.raw?.leader)?.toString();
                const isTeamLeader = teamLeaderId && mId?.toString() === teamLeaderId.toString();
                return !isProjectLeader && !isTeamLeader;
            }),
        status: project?.status || 'Ongoing',
        endDate: project?.raw?.endDate ? new Date(project?.raw?.endDate).toISOString().split('T')[0] : ''
    });
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/projects/${project.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: formData.name,
                    description: formData.description,
                    team: formData.teamId,
                    leader: formData.leaderId,
                    members: formData.members,
                    status: formData.status,
                    endDate: formData.endDate
                })
            });
            if (res.ok) {
                onUpdate(true);
                onClose();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const eligibleMembers = React.useMemo(() => {
        if (!formData.teamId) return [];
        const currentTeam = teams.find(t => t._id === formData.teamId);
        const currentTeamLeaderId = currentTeam?.leader?._id || currentTeam?.leader;

        return users.filter(u => {
            const userTeamId = u.team?._id || u.team;
            const isSameTeam = userTeamId?.toString() === formData.teamId?.toString();
            const isAlreadySelected = (formData.members || []).some(mId => mId?.toString() === u._id?.toString());
            const isProjectLeader = u._id?.toString() === formData.leaderId?.toString();
            const isTeamLeader = currentTeamLeaderId && u._id?.toString() === currentTeamLeaderId.toString();
            const isNotAdmin = u.role !== 'admin' && u.role !== 'superadmin';
            
            // Show if it's the right team AND not admin, OR if already selected
            // BUT always exclude leaders
            return ((isSameTeam && isNotAdmin) || isAlreadySelected) && !isProjectLeader && !isTeamLeader;
        }).map(u => ({ id: u._id, name: u.username }));
    }, [users, formData.teamId, formData.members, formData.leaderId, teams]);

    const teamName = teams.find(t => t._id === formData.teamId)?.name || 'Select team';
    const leaderName = users.find(u => u._id === formData.leaderId)?.username || 'Select leader';

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#151519] border border-[#1e1d22] rounded-[24px] p-8 w-full max-w-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
            >
                <h2 className="text-xl font-bold text-white">Edit Project Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput label="Project Name" value={formData.name} onChange={(val) => setFormData({...formData, name: val})} />
                    <FormSelect 
                        label="Status" 
                        value={formData.status} 
                        options={['Ongoing', 'Completed', 'Suspended']} 
                        onSelect={(val) => setFormData({...formData, status: val})} 
                    />
                </div>

                <FormTextArea label="Description" value={formData.description} onChange={(val) => setFormData({...formData, description: val})} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormSelect 
                        label="Research Team" 
                        value={teamName} 
                        options={teams.map(t => t.name)}
                        onSelect={(name) => {
                            const team = teams.find(t => t.name === name);
                            if (team) {
                                setFormData({
                                    ...formData, 
                                    teamId: team._id,
                                    leaderId: team.leader?._id || team.leader
                                });
                            }
                        }}
                    />
                    <div className="flex flex-col gap-2 opacity-80">
                        <p className="text-[#80808a] text-[14px]">Project Leader (Team Leader)</p>
                        <div className="bg-[#1e1e24]/50 p-3 rounded-lg border border-white/5 text-white font-medium">
                            {teams.find(t => t._id === formData.teamId)?.leader?.email || "No team selected"}
                        </div>
                    </div>
                </div>

                <FormMultiSelect 
                    label="Member List" 
                    selectedIds={formData.members} 
                    options={eligibleMembers}
                    onToggle={(id) => {
                        setFormData(prev => ({
                            ...prev,
                            members: prev.members.includes(id) 
                                ? prev.members.filter(m => m !== id) 
                                : [...prev.members, id]
                        }));
                    }}
                />

                <div className="flex justify-end gap-4 mt-4">
                    <button onClick={onClose} className="px-6 py-2 text-[#a5a5b2] hover:text-white transition-colors">Cancel</button>
                    <button 
                        onClick={handleUpdate} 
                        disabled={isLoading}
                        className="bg-[#3457dc] text-white px-8 py-2 rounded-xl font-bold hover:bg-[#2a4ac0] disabled:opacity-50 transition-all"
                    >
                        {isLoading ? 'Saving...' : 'Update Project'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const EditPhaseModal = ({ isOpen, onClose, projectId, phase, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: phase?.title || '',
        date: phase?.date ? new Date(phase.date).toISOString().split('T')[0] : ''
    });
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        if (phase) {
            setFormData({
                title: phase.title || '',
                date: phase.date ? new Date(phase.date).toISOString().split('T')[0] : ''
            });
        }
    }, [phase]);

    if (!isOpen) return null;

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}/milestones/${phase._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                onUpdate(true);
                onClose();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this phase?')) return;
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}/milestones/${phase._id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                onUpdate(true);
                onClose();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[3000] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#151519] border border-[#1e1d22] rounded-[24px] p-8 w-full max-w-md flex flex-col gap-6 shadow-2xl"
            >
                <h2 className="text-xl font-bold text-white">Edit Phase Details</h2>
                
                <FormInput 
                    label="Phase Title" 
                    value={formData.title} 
                    onChange={(val) => setFormData({...formData, title: val})} 
                />
                
                <div className="flex flex-col gap-2">
                    <p className="text-[#80808a] text-[14px]">Target Date</p>
                    <input 
                        type="date"
                        className="bg-[rgba(255,255,255,0.01)] h-[41px] px-[14px] rounded-[8px] border border-[#2a2a30] text-white outline-none focus:border-[#3457DC] transition-all color-scheme-dark"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                </div>

                <div className="flex flex-col gap-3 mt-4">
                    <button 
                        onClick={handleUpdate} 
                        disabled={isLoading}
                        className="bg-[#3457dc] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2a4ac0] disabled:opacity-50 transition-all w-full"
                    >
                        {isLoading ? 'Saving...' : 'Update Phase'}
                    </button>
                    <div className="flex gap-3">
                         <button 
                            onClick={handleDelete} 
                            disabled={isLoading}
                            className="bg-red-500/10 text-red-500 px-4 py-2 rounded-xl font-medium hover:bg-red-500/20 disabled:opacity-50 transition-all flex-1"
                        >
                            Delete
                        </button>
                        <button 
                            onClick={onClose} 
                            className="px-4 py-2 text-[#a5a5b2] hover:text-white transition-colors flex-1"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ProjectsTable = ({ projects = [], selectedId, onSelect, onRefresh }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeRowAction, setActiveRowAction] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);

    React.useEffect(() => {
        const fetchMeta = async () => {
            const token = localStorage.getItem('token');
            const [tRes, uRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/teams`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_BASE_URL}/api/auth/admin/users`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);
            if (tRes.ok) setTeams(await tRes.json());
            if (uRes.ok) {
                const uData = await uRes.json();
                setUsers(uData);
            }
        };
        fetchMeta();
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Completed': return { color: '#27bdad', bg: 'rgba(39, 189, 173, 0.1)' };
            case 'Canceled': return { color: '#eb5757', bg: 'rgba(235, 87, 87, 0.1)' };
            case 'Ongoing': return { color: '#f29339', bg: 'rgba(242, 147, 57, 0.1)' };
            default: return { color: '#fff', bg: 'rgba(255, 255, 255, 0.05)' };
        }
    };

    const filterItemStyle = {
        backgroundColor: 'rgba(255,255,255,0.01)',
        borderRadius: '0.9vw', padding: '1.1vh 1.2vw',
        display: 'flex', alignItems: 'center', gap: '0.6vw',
        border: '1px solid #1e1d22', cursor: 'pointer', minWidth: '9vw'
    };

    return (
        <div style={{
            backgroundColor: '#151519', border: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '3vh 1.5vw 4vh 1.5vw', borderRadius: '1.2vw',
            display: 'flex', flexDirection: 'column', marginTop: '2vh'
        }}>
            {/* Header Controls */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '3vh' }}>
                <div style={{ ...filterItemStyle, flex: 1, minWidth: '15vw' }}>
                    <input type="text" placeholder="Search /" style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#f0f0f2', fontSize: '14px' }} />
                    <RiSearch2Line color="#3457DC" size="1.2vw" />
                </div>
                <div style={filterItemStyle}>
                    <span style={{ fontSize: '14px', color: '#f0f0f2', flex: 1 }}>Newest first</span>
                    <img src={DropdownIcon} alt="arrow" style={{ width: '0.8vw' }} />
                </div>
                <div style={filterItemStyle}>
                    <span style={{ fontSize: '14px', color: '#f0f0f2', flex: 1 }}>Categorie</span>
                    <img src={DropdownIcon} alt="arrow" style={{ width: '0.8vw' }} />
                </div>
                <div style={filterItemStyle}>
                    <span style={{ fontSize: '14px', color: '#f0f0f2', flex: 1 }}>Status</span>
                    <img src={DropdownIcon} alt="arrow" style={{ width: '0.8vw' }} />
                </div>
                <div style={filterItemStyle}>
                    <span style={{ fontSize: '14px', color: '#f0f0f2', flex: 1 }}>Range date</span>
                    <img src={CalendarIcon} alt="calendar" style={{ width: '1vw', marginRight: '0.3vw' }} />
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Project Name</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Start Date</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Research Team</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Estimated Deadline</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'center' }}>Progress</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'center' }}>Status</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id} 
                                onClick={() => onSelect(project.id)}
                                style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer', backgroundColor: selectedId === project.id ? 'rgba(255, 255, 255, 0.03)' : 'transparent', transition: '0.2s' }}
                            >
                                <td style={{ padding: '2.5vh 0.5vw' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2vw' }}>
                                        <div style={{ width: '2.5vw', height: '8vh', borderRadius: '0.4vw', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <img src={project.img} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3vh' }}>
                                            <span style={{ fontSize: '0.95vw', fontWeight: 700, color: 'white' }}>{project.name}</span>
                                            <span style={{ fontSize: '0.75vw', color: '#a5a5b2' }}>{project.update}</span>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '2.5vh 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{project.start}</td>
                                <td style={{ padding: '2.5vh 0.5vw' }}>
                                    <span style={{ 
                                        fontSize: '0.85vw', 
                                        fontWeight: 500, 
                                        color: '#FFFFFF' 
                                    }}>
                                        {project.teamName || 'N/A'}
                                    </span>
                                </td>
                                <td style={{ padding: '2.5vh 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{project.deadline}</td>
                                <td style={{ padding: '2.5vh 0.5vw', textAlign: 'center', fontSize: '0.9vw', fontWeight: 700, color: 'white' }}>{project.progress}</td>
                                <td style={{ padding: '2.5vh 0.5vw', textAlign: 'center' }}>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        padding: '1.1vh 1.2vw', borderRadius: '100px', width: '7vw',
                                        fontSize: '0.75vw', backgroundColor: getStatusStyle(project.status).bg, color: getStatusStyle(project.status).color,
                                        fontWeight: 600
                                    }}>
                                        {project.status}
                                    </span>
                                </td>
                                <td style={{ padding: '2.5vh 0.5vw', textAlign: 'right' }}>
                                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
                                        <button 
                                            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveRowAction(activeRowAction === project.id ? null : project.id);
                                            }}
                                        >
                                            <img src={DetailsIcon} alt="details" style={{ width: '1.8vw' }} />
                                        </button>
                                        {activeRowAction === project.id && (
                                            <div style={{
                                                position: 'absolute', top: '100%', right: 0,
                                                backgroundColor: '#1e1e24', border: '1px solid rgba(255,255,255,0.08)',
                                                borderRadius: '0.8vw', marginTop: '0', zIndex: 200,
                                                minWidth: 'max-content', padding: '0.4vw',
                                                boxShadow: '0 8px 32px rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)'
                                            }}>
                                                <div 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditingProject(project);
                                                        setActiveRowAction(null);
                                                    }}
                                                    style={{ padding: '1vh 1.5vw', cursor: 'pointer', fontSize: '0.8vw', borderRadius: '0.5vw', color: 'rgba(255, 255, 255, 0.9)', textAlign: 'left' }}
                                                >
                                                    Edit Status
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingProject && (
                <EditProjectModal 
                    isOpen={!!editingProject} 
                    onClose={() => setEditingProject(null)} 
                    project={editingProject}
                    teams={teams}
                    users={users}
                    onUpdate={onRefresh}
                />
            )}

            {/* Pagination */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '4vh' }}>
                <button style={{ width: '2.4vw', height: '2.4vw', backgroundColor: '#3457DC', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <RiArrowLeftSLine color="#F7F7F7" size="1.2vw" />
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '2vw' }}>
                    <div style={{ border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1vh 0.6vw', backgroundColor: 'rgba(255,255,255,0.01)', minWidth: '2.5vw', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.9vw', color: '#ffffff' }}>01</span>
                    </div>
                    <span style={{ fontSize: '0.95vw', color: '#80808a' }}>out of 4</span>
                </div>

                <button style={{ width: '2.4vw', height: '2.4vw', backgroundColor: '#3457DC', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <RiArrowRightSLine color="#F7F7F7" size="1.2vw" />
                </button>
            </div>
        </div>
    );
};

const ProjectHubManager = ({ projects, isLoading, onRefresh }) => {
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    React.useEffect(() => {
        if (!selectedProjectId && projects.length > 0) {
            setSelectedProjectId(projects[0].id);
        }
    }, [projects, selectedProjectId]);

    const selectedProject = projects.find(p => p.id === selectedProjectId);
    const selectedProjectName = selectedProject?.name || "";

    if (isLoading) return <div className="text-center py-10">Loading projects...</div>;

    return (
        <div className="flex flex-col gap-[2vh]">
            <ProjectsTable 
                projects={projects} 
                selectedId={selectedProjectId} 
                onSelect={setSelectedProjectId} 
                onRefresh={onRefresh}
            />
            {selectedProjectId && (
                <ProjectTimeline 
                    projectName={selectedProjectName}
                    projectId={selectedProjectId}
                    milestones={selectedProject?.milestones || []} 
                    onRefresh={onRefresh}
                />
            )}
        </div>
    );
};

const ProjectsList = ({ projects, stats, isLoading, onRefresh }) => {
    const projectStats = [
        { title: "Total Projects", value: (stats.total || 0).toString(), icon: ProjectsIcon },
        { title: "Projects Completed", value: (stats.completed || 0).toString(), icon: ProjectsIcon },
        { title: "Closed / Cancelled", value: (stats.canceled || 0).toString(), icon: ProjectsIcon },
        { title: "In Progress", value: (stats.ongoing || 0).toString(), icon: ProjectsIcon },
    ];

    return (
        <div className="flex flex-col gap-[2vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1vw]">
                {projectStats.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                    />
                ))}
            </div>
            
            <ProjectHubManager projects={projects} isLoading={isLoading} onRefresh={onRefresh} />
        </div>
    );
};

// SVG Paths for Add Project Form
const svgPaths = {
  p1f77ae00: "M8 5.33333C8.55228 5.33333 9 4.88562 9 4.33333C9 3.78105 8.55228 3.33333 8 3.33333C7.44772 3.33333 7 3.78105 7 4.33333C7 4.88562 7.44772 5.33333 8 5.33333Z",
  p211f8400: "M15.8842 6.545C15.7681 6.42884 15.6302 6.3367 15.4785 6.27383C15.3268 6.21096 15.1642 6.1786 15 6.1786C14.8358 6.1786 14.6732 6.21096 14.5215 6.27383C14.3698 6.3367 14.2319 6.42884 14.1158 6.545L10.2942 10.3658C10.216 10.4439 10.1101 10.4878 9.99958 10.4878C9.8891 10.4878 9.78314 10.4439 9.705 10.3658L5.88417 6.545C5.64978 6.3105 5.33184 6.17872 5.00029 6.17864C4.66875 6.17857 4.35075 6.3102 4.11625 6.54458C3.88175 6.77897 3.74997 7.09691 3.74989 7.42845C3.74982 7.76 3.88145 8.078 4.11583 8.3125L7.9375 12.1342C8.20834 12.405 8.52989 12.6199 8.88377 12.7665C9.23766 12.9131 9.61695 12.9885 10 12.9885C10.383 12.9885 10.7623 12.9131 11.1162 12.7665C11.4701 12.6199 11.7917 12.405 12.0625 12.1342L15.8842 8.3125C16.1185 8.07809 16.2502 7.76021 16.2502 7.42875C16.2502 7.09729 16.1185 6.77941 15.8842 6.545Z",
  p28d8d500: "M6.66667 12C6.84348 12 7.01305 11.9298 7.13807 11.8047C7.2631 11.6797 7.33333 11.5101 7.33333 11.3333V7.33333C7.33333 7.15652 7.2631 6.98695 7.13807 6.86193C7.01305 6.7369 6.84348 6.66667 6.66667 6.66667C6.48986 6.66667 6.32029 6.7369 6.19526 6.86193C6.07024 6.98695 6 7.15652 6 7.33333V11.3333C6 11.5101 6.07024 11.6797 6.19526 11.8047C6.32029 11.9298 6.48986 12 6.66667 12Z",
  p2f8ff900: "M12.4373 0.62L4.30933 8.748C3.99889 9.05676 3.75279 9.42404 3.58525 9.82856C3.41772 10.2331 3.3321 10.6668 3.33333 11.1047V12C3.33333 12.1768 3.40357 12.3464 3.5286 12.4714C3.65362 12.5964 3.82319 12.6667 4 12.6667H4.89533C5.33317 12.6679 5.76691 12.5823 6.17144 12.4147C6.57596 12.2472 6.94324 12.0011 7.252 11.6907L15.38 3.56267C15.7696 3.17211 15.9884 2.64298 15.9884 2.09133C15.9884 1.53968 15.7696 1.01055 15.38 0.62C14.9838 0.241262 14.4568 0.0298996 13.9087 0.0298996C13.3606 0.0298996 12.8335 0.241262 12.4373 0.62ZM14.4373 2.62L6.30933 10.748C5.93342 11.1216 5.42534 11.3319 4.89533 11.3333H4.66667V11.1047C4.66806 10.5747 4.87838 10.0666 5.252 9.69067L13.38 1.56267C13.5224 1.42664 13.7117 1.35073 13.9087 1.35073C14.1056 1.35073 14.2949 1.42664 14.4373 1.56267C14.5773 1.70301 14.6559 1.89313 14.6559 2.09133C14.6559 2.28954 14.5773 2.47966 14.4373 2.62Z",
  p3750e00: "M14 2.66667H11.9333C11.7786 1.91427 11.3692 1.23823 10.7742 0.752478C10.1791 0.266726 9.4348 0.000969445 8.66667 -2.38419e-07L7.33333 -2.38419e-07C6.5652 0.000969445 5.82088 0.266726 5.22583 0.752478C4.63079 1.23823 4.2214 1.91427 4.06667 2.66667H2C1.82319 2.66667 1.65362 2.7369 1.5286 2.86193C1.40357 2.98695 1.33333 3.15652 1.33333 3.33333C1.33333 3.51014 1.40357 3.67971 1.5286 3.80474C1.65362 3.92976 1.82319 4 2 4H2.66667V12.6667C2.66773 13.5504 3.01925 14.3976 3.64415 15.0225C4.26904 15.6474 5.11627 15.9989 6 16H10C10.8837 15.9989 11.731 15.6474 12.3559 15.0225C12.9807 14.3976 13.3323 13.5504 13.3333 12.6667V4H14C14.1768 4 14.3464 3.92976 14.4714 3.80474C14.5964 3.67971 14.6667 3.51014 14.6667 3.33333C14.6667 3.15652 14.5964 2.98695 14.4714 2.86193C14.3464 2.7369 14.1768 2.66667 14 2.66667ZM7.33333 1.33333H8.66667C9.08018 1.33384 9.48342 1.46225 9.82108 1.70096C10.1587 1.93967 10.4143 2.27699 10.5527 2.66667H5.44733C5.58572 2.27699 5.84127 1.93967 6.17892 1.70096C6.51658 1.46225 6.91982 1.33384 7.33333 1.33333ZM12 12.6667C12 13.1971 11.7893 13.7058 11.4142 14.0809C11.0391 14.456 10.5304 14.6667 10 14.6667H6C5.46957 14.6667 4.96086 14.456 4.58579 14.0809C4.21071 13.7058 4 13.1971 4 12.6667V4H12V12.6667Z",
  p3a2bde10: "M15.3333 5.986C15.1565 5.986 14.987 6.05624 14.8619 6.18126C14.7369 6.30629 14.6667 6.47586 14.6667 6.65267V10H12C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12V14.6667H3.33333C2.8029 14.6667 2.29419 14.456 1.91912 14.0809C1.54405 13.7058 1.33333 13.1971 1.33333 12.6667V3.33333C1.33333 2.8029 1.54405 2.29419 1.91912 1.91912C2.29419 1.54405 2.8029 1.33333 3.33333 1.33333H9.36133C9.53815 1.33333 9.70771 1.2631 9.83274 1.13807C9.95776 1.01305 10.028 0.843478 10.028 0.666667C10.028 0.489856 9.95776 0.320286 9.83274 0.195262C9.70771 0.0702379 9.53815 0 9.36133 0L3.33333 0C2.4496 0.00105857 1.60237 0.352588 0.97748 0.97748C0.352588 1.60237 0.00105857 2.4496 0 3.33333L0 12.6667C0.00105857 13.5504 0.352588 14.3976 0.97748 15.0225C1.60237 15.6474 2.4496 15.9989 3.33333 16H10.8953C11.3333 16.0013 11.7671 15.9156 12.1718 15.7481C12.5764 15.5806 12.9438 15.3345 13.2527 15.024L15.0233 13.252C15.3338 12.9432 15.58 12.576 15.7477 12.1715C15.9153 11.767 16.0011 11.3332 16 10.8953V6.65267C16 6.47586 15.9298 6.30629 15.8047 6.18126C15.6797 6.05624 15.5101 5.986 15.3333 5.986ZM12.31 14.0813C12.042 14.3487 11.7031 14.5337 11.3333 14.6147V12C11.3333 11.8232 11.4036 11.6536 11.5286 11.5286C11.6536 11.4036 11.8232 11.3333 12 11.3333H14.6167C14.5342 11.7023 14.3493 12.0406 14.0833 12.3093L12.31 14.0813Z",
  p3b8f8870: "M14.1667 8.36583C10.9508 8.36583 8.33333 10.9825 8.33333 14.1992C8.33333 17.3975 10.9508 20 14.1667 20C17.3825 20 20 17.3833 20 14.1667C20 10.9683 17.3825 8.36583 14.1667 8.36583ZM14.1667 18.3333C11.8692 18.3333 10 16.4783 10 14.1992C10 11.9017 11.8692 10.0325 14.1667 10.0325C16.4642 10.0325 18.3333 11.8875 18.3333 14.1667C18.3333 16.4642 16.4642 18.3333 14.1667 18.3333ZM15.5892 14.4108C15.915 14.7367 15.915 15.2633 15.5892 15.5892C15.4267 15.7517 15.2133 15.8333 15 15.8333C14.7867 15.8333 14.5733 15.7517 14.4108 15.5892L13.5775 14.7558C13.4208 14.5992 13.3333 14.3875 13.3333 14.1667V12.5C13.3333 12.04 13.7058 11.6667 14.1667 11.6667C14.6275 11.6667 15 12.04 15 12.5V13.8217L15.5892 14.4108ZM20 5.83333V7.5C20 7.96 19.6275 8.33333 19.1667 8.33333C18.7058 8.33333 18.3333 7.96 18.3333 7.5V5.83333C18.3333 4.455 17.2117 3.33333 15.8333 3.33333H4.16667C2.78833 3.33333 1.66667 4.455 1.66667 5.83333V6.66667H9.16667C9.62667 6.66667 10 7.04 10 7.5C10 7.96 9.62667 8.33333 9.16667 8.33333H1.66667V15.8333C1.66667 17.2117 2.78833 18.3333 4.16667 18.3333H7.5C7.96 18.3333 8.33333 18.7067 8.33333 19.1667C8.33333 19.6267 7.96 20 7.5 20H4.16667C1.86917 20 0 18.1308 0 15.8333V5.83333C0 3.53583 1.86917 1.66667 4.16667 1.66667H5V0.833333C5 0.373333 5.37333 0 5.83333 0C6.29333 0 6.66667 0.373333 6.66667 0.833333V1.66667H13.3333V0.833333C13.3333 0.373333 13.7058 0 14.1667 0C14.6275 0 15 0.373333 15 0.833333V1.66667H15.8333C18.1308 1.66667 20 3.53583 20 5.83333Z",
  p4d4e580: "M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00888 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9977 5.87897 15.1541 3.84547 13.6543 2.34568C12.1545 0.845886 10.121 0.00229405 8 0ZM8 14.6667C6.68146 14.6667 5.39253 14.2757 4.2962 13.5431C3.19987 12.8106 2.34539 11.7694 1.84081 10.5512C1.33622 9.33305 1.2042 7.99261 1.46144 6.6994C1.71867 5.40619 2.35361 4.21831 3.28596 3.28596C4.21831 2.3536 5.4062 1.71867 6.6994 1.46143C7.99261 1.2042 9.33305 1.33622 10.5512 1.8408C11.7694 2.34539 12.8106 3.19987 13.5431 4.2962C14.2757 5.39253 14.6667 6.68146 14.6667 8C14.6647 9.76752 13.9617 11.4621 12.7119 12.7119C11.4621 13.9617 9.76752 14.6647 8 14.6667Z",
  p99c2800: "M8 6.66667H7.33333C7.15652 6.66667 6.98695 6.7369 6.86193 6.86193C6.7369 6.98695 6.66667 7.15652 6.66667 7.33333C6.66667 7.51014 6.7369 7.67971 6.86193 7.80474C6.98695 7.92976 7.15652 8 7.33333 8H8V12C8 12.1768 8.07024 12.3464 8.19526 12.4714C8.32029 12.5964 8.48986 12.6667 8.66667 12.6667C8.84348 12.6667 9.01305 12.5964 9.13807 12.4714C9.2631 12.3464 9.33333 12.1768 9.33333 12V8C9.33333 7.64638 9.19286 7.30724 8.94281 7.05719C8.69276 6.80714 8.35362 6.66667 8 6.66667Z",
  pafd7500: "M9.33333 12C9.51014 12 9.67971 11.9298 9.80474 11.8047C9.92976 11.6797 10 11.5101 10 11.3333V7.33333C10 7.15652 9.92976 6.98695 9.80474 6.86193C9.67971 6.7369 9.51014 6.66667 9.33333 6.66667C9.15652 6.66667 8.98695 6.7369 8.86193 6.86193C8.73691 6.98695 8.66667 7.15652 8.66667 7.33333V11.3333C8.66667 11.5101 8.73691 11.6797 8.86193 11.8047C8.98695 11.9298 9.15652 12 9.33333 12Z",
  pd7c6680: "M12 6C12 9.31371 9.31371 12 6 12H0.5C0.223858 12 0 11.7761 0 11.5C0 11.2239 0.223858 11 0.5 11H6C8.76142 11 11 8.76142 11 6V0.5C11 0.223858 11.2239 0 11.5 0C11.7761 0 12 0.223858 12 0.5V6Z",
};

// Form Implementation Components
function FormInput({ label, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-[12px] items-start w-full relative">
      <p className="font-['Poppins',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#80808a] text-[14px] w-full">{label}</p>
      <div className="bg-[rgba(255,255,255,0.01)] h-[41px] relative rounded-[8px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute border border-[#2a2a30] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full px-[14px]">
           <input 
             type="text" 
             placeholder={placeholder}
             value={value}
             onChange={(e) => onChange(e.target.value)}
             className="bg-transparent border-none outline-none text-[14px] text-white w-full font-['Poppins',sans-serif]" 
           />
        </div>
      </div>
    </div>
  );
}

function FormTextArea({ label, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-[12px] items-start w-full relative">
      <p className="font-['Poppins',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#80808a] text-[14px] w-full">{label}</p>
      <div className="bg-[rgba(255,255,255,0.01)] h-[103px] relative rounded-[8px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute border border-[#2a2a30] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-start size-full p-[14px]">
           <textarea 
             placeholder={placeholder}
             value={value}
             onChange={(e) => onChange(e.target.value)}
             className="bg-transparent border-none outline-none text-[14px] text-white w-full h-full font-['Poppins',sans-serif] resize-none" 
           />
        </div>
      </div>
    </div>
  );
}

function FormSelect({ label, value, options = [], onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-[12px] items-start w-full">
      <p className="font-['Poppins',sans-serif] text-[#80808a] text-[14px] w-full">{label}</p>
      <div className="relative w-full">
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className={`bg-[rgba(255,255,255,0.01)] flex items-center justify-between px-[14px] h-[41px] rounded-[8px] w-full border border-[#2a2a30] cursor-pointer hover:bg-white/[0.03] transition-all ${isOpen ? 'border-[#3457DC]' : ''}`}
          >
              <p className="font-['Poppins',sans-serif] text-[#a5a5b2] text-[14px]">{value}</p>
              <div className={`size-[20px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <svg className="size-full" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p211f8400} fill="#3457DC" />
                </svg>
              </div>
          </div>
 
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-full left-0 w-full bg-[#1e1e24] border border-[#2a2a30] rounded-b-[8px] overflow-hidden z-[1000] shadow-2xl"
              >
                <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                  {options.map((option, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        onSelect(option);
                        setIsOpen(false);
                      }}
                      className="px-[14px] py-[10px] text-[14px] text-[#a5a5b2] hover:bg-[#3457DC] hover:text-white transition-colors cursor-pointer"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}

function FormMultiSelect({ label, selectedIds = [], options = [], onToggle }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-[12px] items-start w-full">
      <p className="font-['Poppins',sans-serif] text-[#80808a] text-[14px] w-full">{label}</p>
      <div className="relative w-full">
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className={`bg-[rgba(255,255,255,0.01)] flex items-center justify-between px-[14px] py-[8px] min-h-[41px] rounded-[8px] w-full border border-[#2a2a30] cursor-pointer hover:bg-white/[0.03] transition-all ${isOpen ? 'border-[#3457DC]' : ''}`}
          >
              <div className="flex flex-wrap gap-2 pr-4">
                {selectedIds.length === 0 ? (
                  <p className="font-['Poppins',sans-serif] text-[#a5a5b2] text-[14px]">Select members</p>
                ) : (
                    selectedIds.map(id => {
                        const opt = options.find(o => o.id === id);
                        return (
                            <span key={id} className="bg-[#3457DC] text-white text-[11px] px-2 py-1 rounded-md">
                                {opt?.name || id}
                            </span>
                        );
                    })
                )}
              </div>
              <div className={`size-[20px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <svg className="size-full" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p211f8400} fill="#3457DC" />
                </svg>
              </div>
          </div>
 
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-full left-0 w-full bg-[#1e1e24] border border-[#2a2a30] rounded-b-[8px] overflow-hidden z-[1000] shadow-2xl"
              >
                <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                  {options.map((option) => (
                    <div 
                      key={option.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggle(option.id);
                      }}
                      className={`px-[14px] py-[10px] text-[14px] transition-colors cursor-pointer flex items-center justify-between ${selectedIds.includes(option.id) ? 'bg-[#3457DC]/20 text-white font-bold' : 'text-[#a5a5b2] hover:bg-[#3457DC] hover:text-white'}`}
                    >
                      <span>{option.name}</span>
                      {selectedIds.includes(option.id) && (
                          <div className="w-2 h-2 rounded-full bg-[#3457DC]" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}

const AddProject = ({ onPublished }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    teamId: '',
    leaderId: '',
    members: [],
    startOption: 'now',
    startDate: '',
    endDate: ''
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const imageInputRef = useRef(null);

  React.useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const userStr = localStorage.getItem('user');
            const currentUser = userStr ? JSON.parse(userStr) : null;

            // Fetch teams
            const teamsRes = await fetch(`${API_BASE_URL}/api/teams`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const teamsData = await teamsRes.json();
            if (teamsRes.ok) {
                setTeams(teamsData);
                // Pre-fill team if user has one
                if (currentUser?.team) {
                    updateField('teamId', currentUser.team);
                    const myTeam = teamsData.find(t => t._id === currentUser.team);
                    if (myTeam?.leader) {
                        updateField('leaderId', myTeam.leader._id || myTeam.leader);
                    }
                }
            }

            // Fetch users
            const usersRes = await fetch(`${API_BASE_URL}/api/auth/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const usersData = await usersRes.json();
            if (usersRes.ok) {
                setUsers(usersData);
                if (currentUser) updateField('leaderId', currentUser._id);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };
    fetchData();
  }, []);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = (e) => {
    e.stopPropagation();
    setPreviewImage(null);
    setImageFile(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const handlePublish = async () => {
    if (!formData.name || !formData.description || !formData.teamId) {
        alert('Please fill in Name, Description and Team');
        return;
    }

    setIsLoading(true);
    try {
        const token = localStorage.getItem('token');
        const dataToSend = new FormData();
        dataToSend.append('title', formData.name);
        dataToSend.append('description', formData.description);
        dataToSend.append('team', formData.teamId);
        dataToSend.append('members', formData.members.join(','));
        dataToSend.append('leader', formData.leaderId);
        dataToSend.append('startDate', formData.startOption === 'now' ? new Date().toISOString() : formData.startDate);
        if (formData.endDate) dataToSend.append('endDate', formData.endDate);
        if (imageFile) dataToSend.append('image', imageFile);

        const res = await fetch(`${API_BASE_URL}/api/projects`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: dataToSend
        });

        const data = await res.json();
        if (res.ok) {
            alert(`Project "${formData.name}" published successfully!`);
            setFormData({
                name: '', description: '', teamId: '', leaderId: '', members: [],
                startOption: 'now', startDate: '', endDate: ''
            });
            setPreviewImage(null);
            setImageFile(null);
            if (onPublished) onPublished();
        } else {
            alert(data.message || 'Failed to publish project');
        }
    } catch (err) {
        alert('Connection error');
    } finally {
        setIsLoading(false);
    }
  };

  const toggleMember = (userId) => {
    setFormData(prev => {
        const members = prev.members.includes(userId)
            ? prev.members.filter(id => id !== userId)
            : [...prev.members, userId];
        return { ...prev, members };
    });
  };

  const teamMembers = React.useMemo(() => {
    if (!formData.teamId) return [];
    return users.filter(u => {
        const userTeamId = u.team?._id || u.team;
        const isSameTeam = userTeamId?.toString() === formData.teamId?.toString();
        const isLeader = u._id?.toString() === formData.leaderId?.toString();
        const isNotAdmin = u.role !== 'admin' && u.role !== 'superadmin';
        return isSameTeam && !isLeader && isNotAdmin;
    }).map(u => ({ id: u._id, name: u.username }));
  }, [users, formData.teamId, formData.leaderId]);

  const teamName = teams.find(t => t._id === formData.teamId)?.name || 'Select team';
  const leaderName = users.find(u => u._id === formData.leaderId)?.username || 'Select leader';

  return (
    <div className="flex flex-col gap-[4vh] w-full relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-datetime-input::-webkit-calendar-picker-indicator {
            display: none !important;
            -webkit-appearance: none;
        }
      `}} />
      {/* Project Setup Card */}
      <div className="bg-[#151519] flex flex-col items-start p-[24px] rounded-[16px] border border-[#1e1d22] w-full relative">
        <p className="font-['Gilroy',sans-serif] font-extrabold text-[16px] text-white mb-[24px]">Project Setup</p>
        
        <div className="flex flex-col gap-[24px] w-full">
          <FormInput 
            label="Name" 
            placeholder="Project name" 
            value={formData.name}
            onChange={(val) => updateField('name', val)}
          />
          <FormTextArea 
            label="Description" 
            placeholder="Research Focus ..." 
            value={formData.description}
            onChange={(val) => updateField('description', val)}
          />
          <FormSelect 
            label="Assigned Research Team" 
            value={teamName} 
            options={teams.map(t => t.name)}
            onSelect={(name) => {
                const team = teams.find(t => t.name === name);
                if (team) {
                    const leaderId = team.leader?._id || team.leader;
                    const memberIds = (team.members || [])
                        .map(m => m?._id || m)
                        .filter(mId => mId?.toString() !== leaderId?.toString());

                    setFormData(prev => ({
                        ...prev,
                        teamId: team._id,
                        leaderId: leaderId,
                        members: memberIds
                    }));
                }
            }}
          />
          <div className="flex flex-col gap-2 opacity-80">
              <p className="text-[#80808a] text-[14px]">Project Leader (Team Leader Email)</p>
              <div className="bg-[#1e1e24]/50 p-3 rounded-lg border border-white/5 text-white font-medium">
                  {teams.find(t => t._id === formData.teamId)?.leader?.email || "No team selected"}
              </div>
          </div>
          <FormMultiSelect 
            label="Member List" 
            selectedIds={formData.members} 
            options={teamMembers}
            onToggle={toggleMember}
          />
          
          <div className="flex flex-col gap-[12px] w-full">
             <p className="font-['Poppins',sans-serif] text-[#80808a] text-[14px]">Choose Project picture :</p>
             <input 
               type="file" 
               ref={imageInputRef} 
               className="hidden" 
               accept="image/*" 
               onChange={handleImageChange} 
             />
             <div 
                onClick={handleImageClick}
                className="bg-[rgba(255,255,255,0.01)] h-[209px] relative rounded-[12px] border border-[#2a2a30] w-full cursor-pointer flex flex-col overflow-hidden group transition-all hover:border-[#3457DC]/30"
             >
                <div className="p-[16px] flex flex-col items-end justify-between h-full w-full z-10">
                   <div className="flex gap-[8px]">
                      <div 
                        onClick={(e) => { e.stopPropagation(); handleImageClick(); }}
                        className="p-[6px] bg-[#1e1e24] rounded-full hover:bg-[#2a2a35] transition-colors"
                      >
                         <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                            <path d={svgPaths.p2f8ff900} fill="#3457DC" />
                            <path d={svgPaths.p3a2bde10} fill="#3457DC" />
                         </svg>
                      </div>
                      <div 
                        onClick={handleClearImage}
                        className="p-[6px] bg-[#1e1e24] rounded-full hover:bg-red-900/20 transition-colors"
                      >
                         <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                            <path d={svgPaths.p3750e00} fill="#C5432D" />
                            <path d={svgPaths.p28d8d500} fill="#C5432D" />
                            <path d={svgPaths.pafd7500} fill="#C5432D" />
                         </svg>
                      </div>
                   </div>
                   
                   <div className="w-full flex justify-center items-center flex-1">
                      <div className="w-[140px] h-[100px] rounded-[12px] bg-[#1e1e24] border border-white/[0.03] overflow-hidden flex items-center justify-center shadow-inner">
                         {previewImage && (
                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                         )}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Project Timeline Card */}
      <div className="bg-[#151519] flex flex-col items-start p-[24px] rounded-[16px] border border-[#1e1d22] w-full relative">
        <p className="font-['Gilroy',sans-serif] font-extrabold text-[16px] text-white mb-[24px]">Project Timeline</p>
        
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex flex-col gap-[16px] w-full">
            <p className="font-['Gilroy',sans-serif] font-extrabold text-[14px] text-white">When do you want to Start Project ?</p>
            
            <div className="flex flex-col gap-[16px]">
              <div 
                className={`flex gap-[8px] items-start cursor-pointer transition-all ${formData.startOption === 'now' ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                onClick={() => updateField('startOption', 'now')}
              >
                <div className="size-[16px] mt-[2px] flex items-center">
                  <svg className="size-full" viewBox="0 0 16 20" fill="none">
                    <circle cx="8" cy="10" r="6.5" stroke={formData.startOption === 'now' ? "#3457DC" : "#373735"} strokeWidth="3" />
                  </svg>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <p className="text-white text-[14px] font-medium leading-[normal] m-0">Start now</p>
                  <p className="text-[#a5a5b2] text-[14px] leading-[normal] m-0">Start immediately the Project</p>
                </div>
              </div>

              <div 
                className={`flex gap-[8px] items-start cursor-pointer transition-all ${formData.startOption === 'later' ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                onClick={() => updateField('startOption', 'later')}
              >
                <div className="size-[16px] mt-[2px] flex items-center">
                  <svg className="size-full" viewBox="0 0 16 20" fill="none">
                    <circle cx="8" cy="10" r="6.5" stroke={formData.startOption === 'later' ? "#3457DC" : "#373735"} strokeWidth="3" />
                  </svg>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <p className="text-white text-[14px] font-medium leading-[normal] m-0">Schedule for later</p>
                  <p className="text-[#a5a5b2] text-[14px] leading-[normal] m-0">Pick a date and time for Starting</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-[12px] w-full transition-all ${formData.startOption === 'now' ? 'opacity-30 pointer-events-none' : ''}`}>
            <p className="text-[#80808a] text-[14px]">Start Date</p>
            <div className="bg-[rgba(255,255,255,0.01)] flex items-center justify-between px-[14px] h-[41px] relative rounded-[8px] border border-[#2a2a30] hover:bg-white/[0.03] cursor-pointer">
               <input 
                 type="datetime-local" 
                 placeholder="Select date & time" 
                 className="bg-transparent border-none outline-none text-[14px] text-white w-full custom-datetime-input"
                 value={formData.startDate}
                 onChange={(e) => updateField('startDate', e.target.value)}
                 onClick={(e) => e.target.showPicker?.()}
               />
               <div className="size-[20px] pointer-events-none">
                 <svg className="size-full" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p3b8f8870} fill="#3457DC" />
                 </svg>
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-[12px] w-full">
            <p className="text-[#80808a] text-[14px]">End Date</p>
            <div className="bg-[rgba(255,255,255,0.01)] flex items-center justify-between px-[14px] h-[41px] relative rounded-[8px] border border-[#2a2a30] hover:bg-white/[0.03] cursor-pointer">
                <input 
                 type="datetime-local" 
                 placeholder="Select date & time" 
                 className="bg-transparent border-none outline-none text-[14px] text-white w-full custom-datetime-input"
                 value={formData.endDate}
                 onChange={(e) => updateField('endDate', e.target.value)}
                 onClick={(e) => e.target.showPicker?.()}
               />
               <div className="size-[20px] pointer-events-none">
                 <svg className="size-full" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p3b8f8870} fill="#3457DC" />
                 </svg>
               </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#2A2A30] my-[32px]" />

        <div className="flex flex-col gap-[24px]">
          <button 
            onClick={handlePublish}
            className="bg-[#3457dc] text-white px-[24px] py-[14px] rounded-[16px] text-[14px] font-medium border-none cursor-pointer w-fit hover:bg-[#2a4ac0] active:scale-95 transition-all"
          >
            Publish
          </button>
          
          {formData.startOption === 'later' && formData.startDate && (
            <div className="flex gap-[12px] items-center">
              <div className="size-[16px]">
                <svg className="size-full" fill="none" viewBox="0 0 16 16">
                    <path d={svgPaths.p4d4e580} fill="white" />
                    <path d={svgPaths.p99c2800} fill="white" />
                    <path d={svgPaths.p1f77ae00} fill="white" />
                </svg>
              </div>
              <p className="text-white text-[14px] m-0">Scheduled for {formData.startDate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const TeamsHistoryTable = ({ teams, onDelete, onEdit }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTeams = teams.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.focus.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filterItemStyle = {
        backgroundColor: 'rgba(255,255,255,0.01)',
        borderRadius: '0.9vw',
        padding: '1.1vh 1.2vw',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6vw',
        border: '1px solid #1e1d22',
        minWidth: '30vw'
    };

    return (
        <div style={{
            backgroundColor: '#151519',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '3vh 1.5vw 4vh 1.5vw',
            borderRadius: '1.2vw',
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        }}>
            {/* Header & Search */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3.5vh' }}>
                <div className="flex flex-col gap-1">
                    <h2 style={{ fontSize: '1.2vw', fontWeight: 600, color: 'white', margin: 0, fontFamily: 'Gilroy, sans-serif' }}>Research Teams</h2>
                    <p style={{ color: '#a5a5b2', fontSize: '0.85vw', margin: 0 }}>Choose from your saved Teams, or create a new one</p>
                </div>
                
                <div style={filterItemStyle}>
                    <input
                        type="text"
                        placeholder="Search /"
                        style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#f0f0f2', fontSize: '14px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <RiSearch2Line color="#3457DC" size="1.2vw" />
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Added</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Created by</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Team name</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'center' }}>Members</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'center' }}>Projects</th>
                            <th style={{ padding: '1.5vh 0.5vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeams.map((row) => (
                            <tr key={row._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', height: '8vh' }}>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{new Date(row.createdAt).toLocaleDateString()}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{row.leader?.email || row.leader?.username || 'Admin'}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'white', fontWeight: 500 }}>{row.name}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'white', textAlign: 'center' }}>{(row.members?.length || 0) + 1}</td>
                                <td style={{ padding: '0 0.5vw', fontSize: '0.85vw', color: 'white', textAlign: 'center' }}>{row.projectCount || 0}</td>
                                <td style={{ padding: '0 0.5vw', textAlign: 'right' }}>
                                    <div className="flex items-center justify-end gap-3">
                                        <button 
                                            className="bg-transparent border-none cursor-pointer hover:scale-110 transition-transform"
                                            onClick={() => onEdit(row)}
                                        >
                                            <svg className="w-[1.2vw]" fill="none" viewBox="0 0 20 20">
                                                <path d={svgPaths.p2f8ff900} fill="#3457DC" />
                                                <path d={svgPaths.p3a2bde10} fill="#3457DC" />
                                            </svg>
                                        </button>
                                        <button 
                                            className="bg-transparent border-none cursor-pointer hover:scale-110 transition-transform"
                                            onClick={() => onDelete(row._id)}
                                        >
                                            <svg className="w-[1.2vw]" fill="none" viewBox="0 0 16 16">
                                                <path d={svgPaths.p3750e00} fill="#C5432D" />
                                                <path d={svgPaths.p28d8d500} fill="#C5432D" />
                                                <path d={svgPaths.pafd7500} fill="#C5432D" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredTeams.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '4vh', color: '#a5a5b2' }}>No teams found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '4vh' }}>
                <div style={{ display: 'flex', gap: '8vw', alignItems: 'center' }}>
                    <button style={{ width: '2vw', height: '2vw', backgroundColor: '#3457DC', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <RiArrowLeftSLine color="#F7F7F7" size="1vw" />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
                        <div style={{ border: '1px solid #2a2a30', borderRadius: '0.4vw', padding: '0.5vh 0.6vw', backgroundColor: 'rgba(255,255,255,0.01)', minWidth: '2vw', textAlign: 'center' }}>
                            <span style={{ fontSize: '0.8vw', color: '#ffffff' }}>1</span>
                        </div>
                        <span style={{ fontSize: '0.8vw', color: '#80808a' }}>of 1</span>
                    </div>
                    <button style={{ width: '2vw', height: '2vw', backgroundColor: '#3457DC', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <RiArrowRightSLine color="#F7F7F7" size="1vw" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const AddTeam = () => {
    const [formData, setFormData] = useState({
        _id: null,
        name: '',
        focus: '',
        leaderId: '',
        members: [],
        activeProjects: ''
    });

    const [userPool, setUserPool] = useState([]);
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTeams = async () => {
        try {
            const token = localStorage.getItem('token');
            const [teamsRes, projectsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/teams`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_BASE_URL}/api/projects`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);
            
            const teamsData = await teamsRes.json();
            const projectsData = await projectsRes.json();

            if (teamsRes.ok && projectsRes.ok) {
                const teamsWithCounts = teamsData.map(t => ({
                    ...t,
                    projectCount: projectsData.filter(p => p.team === t._id || (p.team && p.team._id === t._id)).length
                }));
                setTeams(teamsWithCounts);
            }
        } catch (err) { console.error(err); }
    };

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/auth/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setUserPool(data);
            }
        } catch (err) { console.error(err); }
    };

    const eligibleUsers = React.useMemo(() => {
        return userPool.filter(u => {
            const isRoleAllowed = u.role !== 'admin' && u.role !== 'superadmin' && u.role !== 'guest';
            const isLeader = u._id?.toString() === formData.leaderId?.toString();
            const belongsToThisTeam = formData._id && (u.team?._id === formData._id || u.team === formData._id);
            const hasNoTeam = !u.team;
            const isSelected = formData.members.includes(u._id);
            
            // For resolution, we MUST include isSelected. 
            // For selection, we only include allowed roles.
            return !isLeader && (isSelected || (isRoleAllowed && (hasNoTeam || belongsToThisTeam)));
        }).map(u => ({ 
            id: u._id, 
            name: `${u.username} (${u.email})` 
        }));
    }, [userPool, formData._id, formData.members, formData.leaderId]);

    const eligibleLeaders = React.useMemo(() => {
        return userPool.filter(u => {
            const isRoleAllowed = u.role !== 'admin' && u.role !== 'superadmin' && u.role !== 'guest';
            const belongsToThisTeam = formData._id && (u.team?._id === formData._id || u.team === formData._id);
            const hasNoTeam = !u.team;
            return isRoleAllowed && (hasNoTeam || belongsToThisTeam);
        }).map(u => ({ 
            id: u._id, 
            name: `${u.username} (${u.email})` 
        }));
    }, [userPool, formData._id]);

    // For name resolution of currently selected members (even if they were filtered out somehow)
    const usersForResolution = React.useMemo(() => {
        return userPool.map(u => ({
            id: u._id,
            name: `${u.username} (${u.email})`
        }));
    }, [userPool]);

    React.useEffect(() => {
        fetchTeams();
        fetchUsers();
    }, [formData._id]);

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleMember = (userId) => {
        setFormData(prev => {
            const members = prev.members.includes(userId)
                ? prev.members.filter(id => id !== userId)
                : [...prev.members, userId];
            return { ...prev, members };
        });
    };

    const handleCreateTeam = async () => {
        if (!formData.name || !formData.focus || !formData.leaderId) {
            alert('Please fill in Name, Focus, and Leader');
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const isEdit = !!formData._id;
            const url = isEdit ? `${API_BASE_URL}/api/teams/${formData._id}` : `${API_BASE_URL}/api/teams`;
            
            const res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    focus: formData.focus,
                    leader: formData.leaderId,
                    members: formData.members,
                    activeProjects: formData.activeProjects.split(',').map(p => p.trim()).filter(p => p !== '')
                })
            });

            const data = await res.json();
            if (res.ok) {
                alert(isEdit ? 'Team updated successfully!' : 'Team created successfully!');
                setFormData({ _id: null, name: '', focus: '', leaderId: '', members: [], activeProjects: '' });
                fetchTeams();
            } else {
                alert(data.message || 'Error occurred');
            }
        } catch (err) {
            alert('Connection failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteTeam = async (id) => {
        if (!window.confirm('Are you sure you want to delete this team?')) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/teams/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchTeams();
        } catch (err) { console.error(err); }
    };

    const handleEditTeam = (team) => {
        setFormData({
            _id: team._id,
            name: team.name,
            focus: team.focus,
            leaderId: team.leader?._id || team.leader,
            members: (team.members || [])
                .map(m => m?._id || m)
                .filter(mId => {
                    const u = userPool.find(user => user._id === mId);
                    const isLeader = mId?.toString() === (team.leader?._id || team.leader)?.toString();
                    const isRoleAllowed = u ? (u.role !== 'admin' && u.role !== 'superadmin') : true;
                    return !isLeader && isRoleAllowed;
                }),
            activeProjects: (team.activeProjects || []).join(', ')
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const leaderName = usersForResolution.find(u => u.id === formData.leaderId)?.name || 'Select leader';

    return (
        <div className="flex flex-col gap-[4vh] w-full relative">
            <TeamsHistoryTable teams={teams} onDelete={handleDeleteTeam} onEdit={handleEditTeam} />

            <div className="bg-[#151519] flex flex-col items-start p-[24px] rounded-[16px] border border-[#1e1d22] w-full relative">
                <p className="font-['Gilroy',sans-serif] font-extrabold text-[16px] text-white mb-[24px]">
                    {formData._id ? 'Edit Research Team' : 'Create New Research Team'}
                </p>
                
                <div className="flex flex-col gap-[24px] w-full">
                    <FormInput 
                        label="Team Identity (Name)" 
                        placeholder="e.g. AI Ethics Division" 
                        value={formData.name}
                        onChange={(val) => updateField('name', val)}
                    />
                    <FormTextArea 
                        label="Research Focus / Core Mission" 
                        placeholder="Describe the scientific goals of this unit..." 
                        value={formData.focus}
                        onChange={(val) => updateField('focus', val)}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] w-full">
                         <FormSelect 
                            label="Leadership (Professor/Senior Researcher)" 
                            value={leaderName}
                            options={eligibleLeaders.map(u => u.name)}
                            onSelect={(name) => {
                                const user = eligibleLeaders.find(u => u.name === name);
                                if (user) {
                                    setFormData(prev => ({
                                        ...prev,
                                        leaderId: user.id,
                                        members: prev.members.filter(mId => mId !== user.id)
                                    }));
                                }
                            }}
                        />
                        <FormMultiSelect 
                            label="Member List (Faculty & PhD Students)" 
                            selectedIds={formData.members}
                            options={eligibleUsers}
                            onToggle={toggleMember}
                        />
                    </div>

                    <FormInput 
                        label="Research Fields / Expertise (Comma separated)" 
                        placeholder="e.g. AI, Machine Learning, Data Science" 
                        value={formData.activeProjects}
                        onChange={(val) => updateField('activeProjects', val)}
                    />

                    <div className="w-full h-[1px] bg-[#2A2A30] my-[8px]" />

                    <button 
                        onClick={handleCreateTeam}
                        disabled={isLoading}
                        className="bg-[#3457dc] text-white px-[32px] py-[14px] rounded-[16px] text-[14px] font-bold border-none cursor-pointer w-fit hover:bg-[#2a4ac0] active:scale-95 transition-all shadow-lg shadow-[#3457dc]/20 disabled:opacity-50"
                    >
                        {formData._id ? 'Update Team' : 'Create Team'}
                    </button>
                    {formData._id && (
                        <button 
                            onClick={() => setFormData({ _id: null, name: '', focus: '', leaderId: '', members: [], activeProjects: '' })}
                            className="text-[#a5a5b2] text-[14px] hover:text-white transition-colors"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
const ProjectHub = () => {
    const [activeTab, setActiveTab] = useState('Projects');
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [stats, setStats] = useState({ 
        total: 0, 
        completed: 0, 
        ongoing: 0, 
        canceled: 0, 
        planned: 0,
        views: 0,
        progressAvg: "0.00"
    });

    const fetchAllData = async (silent = false) => {
        if (!silent) setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/projects`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                const formatted = data.map(p => ({
                    id: p._id,
                    name: p.title,
                    update: `Last update ${new Date(p.updatedAt).toLocaleDateString()}`,
                    start: new Date(p.startDate).toLocaleDateString(),
                    deadline: p.endDate ? new Date(p.endDate).toLocaleDateString() : 'No deadline',
                    progress: p.status === 'Completed' ? '100%' : (p.milestones?.length > 0 
                        ? `${Math.round((p.milestones.filter(m => m.completed).length / p.milestones.length) * 100)}%`
                        : '0%'), 
                    status: p.status === 'Proposed' ? 'Ongoing' : p.status,
                    img: p.imageUrl ? `${API_BASE_URL}${p.imageUrl}` : img1,
                    teamName: p.team?.name || 'No Team',
                    milestones: p.milestones || [],
                    raw: p
                }));
                setProjects(formatted);

                // Fetch total views and other system stats
                const statsRes = await fetch(`${API_BASE_URL}/api/stats/overview`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const sData = await statsRes.json();

                setStats({
                    total: data.length,
                    completed: data.filter(p => p.status === 'Completed').length,
                    ongoing: data.filter(p => p.status === 'Ongoing' || p.status === 'Proposed').length,
                    canceled: data.filter(p => p.status === 'Suspended').length,
                    views: sData.views || 0,
                    progressAvg: data.length > 0 
                        ? (data.reduce((acc, p) => {
                            const completedCount = p.milestones?.filter(m => m.completed).length || 0;
                            const totalMilestones = p.milestones?.length || 0;
                            return acc + (totalMilestones > 0 ? (completedCount / totalMilestones) : 0);
                          }, 0) / data.length * 100).toFixed(2)
                        : "0.00"
                });
            }
        } catch (err) {
            console.error('Fetch Stats Error:', err);
        } finally {
            if (!silent) setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchAllData();
    }, []);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Projects':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <ProjectsList projects={projects} stats={stats} isLoading={isLoading} onRefresh={fetchAllData} />
                    </motion.div>
                );
            case 'Add Project':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <AddProject onPublished={() => { setActiveTab('Projects'); fetchAllData(); }} />
                    </motion.div>
                );
            case 'Add Team':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <AddTeam />
                    </motion.div>
                );
            default: return null;
        }
    };

    return (
        <div className="w-full text-white font-poppins pb-10">
            {/* Header with Tabs */}
            <div className="mb-[40px] mt-[0px]">
                <div className="flex gap-[10px] items-center pt-[0px] px-[0px] w-full">
                    <Tab
                        label="Projects"
                        isActive={activeTab === 'Projects'}
                        onClick={() => setActiveTab('Projects')}
                    />
                    <Tab
                        label="Add Project"
                        isActive={activeTab === 'Add Project'}
                        onClick={() => setActiveTab('Add Project')}
                    />
                    <Tab
                        label="Add Team"
                        isActive={activeTab === 'Add Team'}
                        onClick={() => setActiveTab('Add Team')}
                    />
                </div>
            </div>

            {/* Tab Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderTabContent()}
                </motion.div>
            </AnimatePresence>
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-datetime-input::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                    cursor: pointer;
                    opacity: 0.5;
                    transition: opacity 0.2s;
                }
                .custom-datetime-input::-webkit-calendar-picker-indicator:hover {
                    opacity: 1;
                }
                .custom-datetime-input {
                    color-scheme: dark;
                }
                .color-scheme-dark {
                    color-scheme: dark;
                }
            `}} />
        </div>
    );
};

export default ProjectHub;
