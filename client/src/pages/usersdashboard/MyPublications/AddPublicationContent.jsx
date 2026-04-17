import React, { useState, useEffect, useRef } from 'react';
import { RiCloseLine, RiDeleteBin6Line, RiFileWordLine } from "react-icons/ri";
import PublicationEditor from "./PublicationEditor";
import DropdownIcon from "../../../assets/svg/userDashboard/PhdTracker/angle-small-down 1.svg";

// Since PublicationEditor is in MyPublications.jsx, I should probably move it to its own file or keep it there.
// Actually, I'll just keep it in MyPublications.jsx and export it from there, OR I'll move it to its own file.
// Let's assume PublicationEditor is currently NOT exported from MyPublications.jsx.

const AddPublicationContent = () => {
    const [langTab, setLangTab] = useState('en');
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [field, setField] = useState('Science');
    const [members, setMembers] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [availableMembers, setAvailableMembers] = useState([]);
    const [isMembersDropdownOpen, setIsMembersDropdownOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');

    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const token = localStorage.getItem('token');
                // Fetch members
                const membersRes = await fetch('http://localhost:5000/api/auth/members', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (membersRes.ok) {
                    const data = await membersRes.json();
                    setAvailableMembers(data);
                }

                // Fetch projects
                const projectsRes = await fetch('http://localhost:5000/api/projects', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (projectsRes.ok) {
                    const data = await projectsRes.json();
                    setProjects(data);
                }
            } catch (err) {
                console.error("Failed to fetch metadata", err);
            }
        };
        fetchMetadata();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const toggleMember = (username) => {
        if (members.includes(username)) {
            setMembers(members.filter(m => m !== username));
        } else {
            setMembers([...members, username]);
        }
    };

    const handleSave = async () => {
        if (!title || !content || !selectedProject) {
            alert('Please provide a title, content, and select a project');
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('title', title);
            formData.append('abstract', content);
            formData.append('contribution', description);
            formData.append('field', field);
            formData.append('members', members.join(','));
            formData.append('project', selectedProject);
            if (selectedFile) {
                formData.append('document', selectedFile);
            }

            const res = await fetch('http://localhost:5000/api/publications', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                alert('Publication saved successfully!');
                setTitle('');
                setContent('');
                setDescription('');
                setSelectedFile(null);
                setMembers([]);
                setSelectedProject('');
            } else {
                const data = await res.json();
                alert(data.message || 'Failed to save');
            }
        } catch (err) {
            alert('Connection error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4vh', marginTop: '4vh', width: '100%' }}>
            <PublicationEditor
                langTab={langTab}
                setLangTab={setLangTab}
                content={content}
                setContent={setContent}
                onImport={() => fileInputRef.current?.click()}
            />

            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".doc,.docx,.pdf"
            />

            <div style={{
                backgroundColor: '#151519',
                borderRadius: '1.2vw',
                width: '100%',
                padding: '3vh 1.5vw',
                border: '1px solid #1e1d22',
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5vh',
                marginTop: '1vh'
            }}>
                <h2 style={{ fontSize: '1.1vw', fontWeight: 800, color: '#ffffff', fontFamily: 'Gilroy, Poppins, sans-serif', margin: 0 }}>
                    Add details
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                        <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Associated Project</label>
                        <select
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 1.2vw', color: selectedProject ? '#ffffff' : '#80808a', fontSize: '0.9vw', outline: 'none', width: '100%', cursor: 'pointer', appearance: 'none'
                            }}
                        >
                            <option value="">Select a project</option>
                            {projects.map(p => (
                                <option key={p._id} value={p._id} style={{ backgroundColor: '#1e1e24' }}>{p.title}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                        <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Title</label>
                        <input
                            placeholder="Nature article title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', outline: 'none', width: '100%'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                        <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Description</label>
                        <input
                            placeholder="Brief contribution info"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', outline: 'none', width: '100%'
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '2vw' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                        <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Field</label>
                        <div style={{ position: 'relative' }}>
                            <select
                                value={field}
                                onChange={(e) => setField(e.target.value)}
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', outline: 'none', width: '100%', appearance: 'none', cursor: 'pointer'
                                }}
                            >
                                <option value="Science">Science</option>
                                <option value="AI & ML">AI & ML</option>
                                <option value="Networks">Networks</option>
                            </select>
                            <img src={DropdownIcon} alt="dropdown" style={{ position: 'absolute', right: '1.2vw', top: '50%', transform: 'translateY(-50%)', width: '1.2vw', pointerEvents: 'none' }} />
                        </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8vh', position: 'relative' }}>
                        <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Members</label>
                        <div 
                            onClick={() => setIsMembersDropdownOpen(!isMembersDropdownOpen)}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.2vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', cursor: 'pointer', display: 'flex', flexWrap: 'wrap', gap: '0.5vw', minHeight: '5.2vh'
                            }}
                        >
                            {members.length === 0 ? <span style={{ color: '#80808a' }}>Select members</span> : 
                                members.map(m => (
                                    <div key={m} style={{ backgroundColor: '#3457dc', padding: '0.2vh 0.6vw', borderRadius: '0.3vw', display: 'flex', alignItems: 'center', gap: '0.3vw' }}>
                                        {m}
                                        <RiCloseLine size={12} onClick={(e) => { e.stopPropagation(); toggleMember(m); }} />
                                    </div>
                                ))
                            }
                        </div>
                        {isMembersDropdownOpen && (
                            <div style={{
                                position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#1e1e24', border: '1px solid #2a2a30', borderRadius: '0.6vw', marginTop: '0.5vh', zIndex: 10, maxHeight: '20vh', overflowY: 'auto', padding: '0.5vh'
                            }}>
                                {availableMembers.map(member => (
                                    <div 
                                        key={member._id}
                                        onClick={() => toggleMember(member.username)}
                                        style={{
                                            padding: '1vh 1vw', color: members.includes(member.username) ? '#3457dc' : '#ffffff', fontSize: '0.85vw', cursor: 'pointer', backgroundColor: members.includes(member.username) ? 'rgba(52,87,220,0.1)' : 'transparent', borderRadius: '0.4vw'
                                        }}
                                    >
                                        {member.username}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                    <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>File Attachment</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            value={selectedFile ? selectedFile.name : 'No file chosen'}
                            readOnly
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 5vw 1.5vh 1.2vw', color: selectedFile ? '#ffffff' : '#80808a', fontSize: '0.9vw', outline: 'none', width: '100%'
                            }}
                        />
                        <div style={{ position: 'absolute', right: '1.2vw', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                            {selectedFile && (
                                <div onClick={() => setSelectedFile(null)} style={{ cursor: 'pointer' }}>
                                    <RiDeleteBin6Line color="#C5432D" size="1.2vw" />
                                </div>
                            )}
                            <div onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer' }}>
                                <RiFileWordLine color="#3457DC" size="1.2vw" />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '2vh' }}>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        style={{
                            backgroundColor: isLoading ? '#1e1e24' : '#3457dc', 
                            border: 'none', borderRadius: '1vw', padding: '1.8vh 3vw', 
                            color: '#ffffff', fontSize: '0.9vw', fontWeight: 600, 
                            cursor: isLoading ? 'not-allowed' : 'pointer', 
                        }}
                    >
                        {isLoading ? 'Saving...' : 'Save Publication'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPublicationContent;
