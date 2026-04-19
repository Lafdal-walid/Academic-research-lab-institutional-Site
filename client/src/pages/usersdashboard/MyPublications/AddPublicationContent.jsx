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

    const [authors, setAuthors] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [publisher, setPublisher] = useState('Institutional Lab');
    const [tags, setTags] = useState('');

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
            formData.append('authors', authors);
            formData.append('year', year);
            formData.append('publisher', publisher);
            formData.append('tags', tags);
            formData.append('abstract', content);
            formData.append('contribution', description);
            formData.append('field', field);
            
            // Map team member names back to their selection for the system
            const memberNames = authors.split(',').map(a => a.trim()).filter(a => 
                availableMembers.some(m => m.username === a)
            );
            formData.append('members', memberNames.join(','));
            
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
                setAuthors('');
                setYear(new Date().getFullYear());
                setPublisher('Institutional Lab');
                setTags('');
                setContent('');
                setDescription('');
                setSelectedFile(null);
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
        <div className="add-pub-container" style={{ display: 'flex', flexDirection: 'column', gap: '2.4vh', marginTop: '4vh', width: '100%' }}>
            <style dangerouslySetInnerHTML={{ __html: addPubStyles }} />
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

            <div className="add-pub-form-card" style={{
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
                <h2 className="add-pub-form-title" style={{ fontSize: '1.1vw', fontWeight: 800, color: '#ffffff', fontFamily: 'Gilroy, Poppins, sans-serif', margin: 0 }}>
                    Add Professional Publication details
                </h2>

                <div className="add-pub-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                        <div className="add-pub-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                            <label className="add-pub-label" style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Publication Title</label>
                            <input
                                placeholder="e.g., Attention Mechanisms in Hierarchical Cognitive Architectures..."
                                className="add-pub-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', outline: 'none', width: '100%'
                                }}
                            />
                        </div>

                        <div className="add-pub-form-row" style={{ display: 'flex', gap: '1vw' }}>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8vh', position: 'relative' }}>
                                <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Authors (Team Members & External)</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        placeholder="Enter or select authors..."
                                        value={authors}
                                        onChange={(e) => setAuthors(e.target.value)}
                                        style={{
                                            backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', outline: 'none', flex: 1
                                        }}
                                    />
                                    <div style={{ position: 'relative' }}>
                                        <button 
                                            type="button"
                                            onClick={(e) => { e.preventDefault(); setIsMembersDropdownOpen(!isMembersDropdownOpen); }}
                                            style={{
                                                backgroundColor: '#3457dc', border: 'none', borderRadius: '0.6vw', padding: '0 1.2vw', height: '100%', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5vw', cursor: 'pointer', fontSize: '0.85vw'
                                            }}
                                        >
                                            <RiCloseLine size={16} style={{ transform: isMembersDropdownOpen ? 'rotate(0deg)' : 'rotate(45deg)', transition: '0.3s' }} />
                                            Team
                                        </button>
                                        {isMembersDropdownOpen && (
                                            <div style={{
                                                position: 'absolute', top: '105%', right: 0, backgroundColor: '#1e1e24', border: '1px solid #2a2a30', borderRadius: '0.6vw', zIndex: 100, width: '15vw', maxHeight: '25vh', overflowY: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                            }}>
                                                {availableMembers.map(m => (
                                                    <div 
                                                        key={m._id}
                                                        onClick={() => {
                                                            const currentAuthors = authors ? authors.split(',').map(a => a.trim()).filter(a => a) : [];
                                                            if (!currentAuthors.includes(m.username)) {
                                                                setAuthors([...currentAuthors, m.username].join(', '));
                                                            }
                                                            setIsMembersDropdownOpen(false);
                                                        }}
                                                        style={{ padding: '1vh 1vw', color: 'white', cursor: 'pointer', fontSize: '0.8vw', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                                                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(52,87,220,0.1)'}
                                                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                                    >
                                                        {m.username}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '8vw', display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                                <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Year</label>
                                <input
                                    type="number"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', outline: 'none', width: '100%'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

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
                            <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Publisher / Journal</label>
                            <input
                                placeholder="e.g., IEEE Transactions..."
                                value={publisher}
                                onChange={(e) => setPublisher(e.target.value)}
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', outline: 'none', width: '100%'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                    <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Tags (Comma separated)</label>
                    <input
                        placeholder="Deep Learning, Cloud Computing..."
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', outline: 'none', width: '100%'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                    <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>Short Description / Contribution</label>
                    <textarea
                        placeholder="Brief summary of the research contribution..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid #2a2a30', borderRadius: '0.6vw', padding: '1.5vh 1.2vw', color: '#ffffff', fontSize: '0.9vw', outline: 'none', width: '100%', minHeight: '10vh', resize: 'none'
                        }}
                    />
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vh' }}>
                    <label style={{ color: '#80808a', fontSize: '0.85vw', fontWeight: 500 }}>File Attachment (PDF / Word)</label>
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

const addPubStyles = `
@media screen and (max-width: 1024px) {
    .add-pub-grid-layout {
        grid-template-columns: 100% !important;
        gap: 24px !important;
    }
    .add-pub-form-row {
        flex-direction: column !important;
        gap: 24px !important;
    }
    .add-pub-form-row > div {
        width: 100% !important;
        flex: none !important;
    }
    .add-pub-form-card {
        padding: 24px 20px !important;
        border-radius: 12px !important;
    }
    .add-pub-form-title {
        font-size: 16px !important;
    }
    .add-pub-label {
        font-size: 14px !important;
    }
    .add-pub-input, select, textarea, .add-pub-container input[readonly] {
        padding: 12px 14px !important;
        font-size: 14px !important;
        border-radius: 8px !important;
    }
    .add-pub-container button {
        height: auto !important;
        padding: 12px 20px !important;
        font-size: 14px !important;
        border-radius: 8px !important;
    }
    .add-pub-container textarea {
        min-height: 120px !important;
    }
    
    /* Author selection members dropdown */
    div[style*="position: absolute"][style*="right: 0"] {
        width: 200px !important;
        max-height: 200px !important;
    }
    div[style*="padding: 1vh 1vw"] {
        padding: 10px 14px !important;
        font-size: 13px !important;
    }
    
    .add-pub-container div[style*="gap: 16px"][style*="alignItems: center"] svg {
        width: 18px !important;
        height: 18px !important;
    }
}
`;

export default AddPublicationContent;
