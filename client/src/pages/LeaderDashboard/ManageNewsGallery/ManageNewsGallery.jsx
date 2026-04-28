import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCheckLine, RiSearch2Line, RiArrowLeftSLine, RiArrowRightSLine, RiArrowDownSLine, RiInformationLine, RiImageAddLine, RiNewspaperLine, RiDeleteBin6Line, RiEdit2Line, RiExternalLinkLine } from 'react-icons/ri';
import API_BASE_URL from '@/config';

// Asset imports
import TrashIcon from "@/assets/svg/LeaderDashboard/notification/trash 3.svg";
import EditIcon from "@/assets/svg/LeaderDashboard/notification/edit 2.svg";

// SVG Paths for consistency with dashboard forms
const svgPaths = {
  p211f8400: "M15.8842 6.545C15.7681 6.42884 15.6302 6.3367 15.4785 6.27383C15.3268 6.21096 15.1642 6.1786 15 6.1786C14.8358 6.1786 14.6732 6.21096 14.5215 6.27383C14.3698 6.3367 14.2319 6.42884 14.1158 6.545L10.2942 10.3658C10.216 10.4439 10.1101 10.4878 9.99958 10.4878C9.8891 10.4878 9.78314 10.4439 9.705 10.3658L5.88417 6.545C5.64978 6.3105 5.33184 6.17872 5.00029 6.17864C4.66875 6.17857 4.35075 6.3102 4.11625 6.54458C3.88175 6.77897 3.74997 7.09691 3.74989 7.42845C3.74982 7.76 3.88145 8.078 4.11583 8.3125L7.9375 12.1342C8.20834 12.405 8.52989 12.6199 8.88377 12.7665C9.23766 12.9131 9.61695 12.9885 10 12.9885C10.383 12.9885 10.7623 12.9131 11.1162 12.7665C11.4701 12.6199 11.7917 12.405 12.0625 12.1342L15.8842 8.3125C16.1185 8.07809 16.2502 7.76021 16.2502 7.42875C16.2502 7.09729 16.1185 6.77941 15.8842 6.545Z",
};

// Form Implementation Components for consistency
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
      <div className="bg-[rgba(255,255,255,0.01)] h-[120px] relative rounded-[8px] shrink-0 w-full">
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
              <p className="font-['Poppins',sans-serif] text-white text-[14px]">{value || 'Select option'}</p>
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
                className="absolute top-full left-0 w-full bg-[#1e1e24] border border-[#2a2a30] rounded-b-[8px] overflow-hidden z-[9999] shadow-2xl"
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
                      {option.label || option}
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

const Tab = ({ label, isActive, onClick }) => {
    return (
        <div
            className="flex flex-col items-center justify-center cursor-pointer min-w-fit relative px-2"
            onClick={onClick}
        >
            <div className="flex flex-col items-center w-fit relative" style={{ gap: '8px' }}>
                <p className={`font-poppins font-bold leading-[normal] not-italic text-[18px] whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#3457dc] scale-105' : 'text-[#a5a5b2] hover:text-[#f5f5f5]'}`}>
                    {label}
                </p>

                {/* Framer Motion Active Underline */}
                {isActive && (
                    <motion.div
                        layoutId="activeUnderlineManageNewsGallery"
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

const NewsTable = ({ onEdit }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchNews = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/news`);
            if (res.ok) setNews(await res.json());
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this news article?')) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/news/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchNews();
        } catch (error) { console.error(error); }
    };

    useEffect(() => { fetchNews(); }, []);

    const filteredNews = news.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="bg-[#151519] border border-white/[0.05] rounded-2xl p-6 mt-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-white font-bold text-lg">News Articles</h3>
                    <p className="text-white/40 text-sm">Manage laboratory announcements and updates.</p>
                </div>
                <div className="relative w-80">
                    <input 
                        type="text" 
                        placeholder="Search news..." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 pl-10 text-sm outline-none focus:border-[#3457dc]/50 placeholder:text-white/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3457dc]" size={18} />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="py-4 px-2 text-white/40 font-medium text-sm">Title</th>
                            <th className="py-4 px-2 text-white/40 font-medium text-sm">Team</th>
                            <th className="py-4 px-2 text-white/40 font-medium text-sm">Date</th>
                            <th className="py-4 px-2 text-white/40 font-medium text-sm">Views</th>
                            <th className="py-4 px-2 text-white/40 font-medium text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredNews.map(item => (
                            <tr key={item._id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors h-[8vh]">
                                <td className="py-4 px-2 text-white font-medium text-sm">{item.title}</td>
                                <td className="py-4 px-2 text-white/60 text-sm">{item.team?.name || 'General'}</td>
                                <td className="py-4 px-2 text-white/40 text-sm">{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td className="py-4 px-2 text-white/40 text-sm">{item.views}</td>
                                <td className="py-4 px-2 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => onEdit(item)} className="p-2 hover:bg-white/5 rounded-lg text-[#3457dc] transition-all hover:scale-110">
                                            <img src={EditIcon} alt="edit" className="w-[1.2vw]" />
                                        </button>
                                        <button onClick={() => handleDelete(item._id)} className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 transition-all hover:scale-110">
                                            <img src={TrashIcon} alt="delete" className="w-[1.2vw]" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const GalleryGrid = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGallery = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/gallery`);
            if (res.ok) setItems(await res.json());
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this image?')) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchGallery();
        } catch (error) { console.error(error); }
    };

    useEffect(() => { fetchGallery(); }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {items.map(item => (
                <div key={item._id} className="group relative aspect-square bg-[#151519] border border-white/5 rounded-2xl overflow-hidden shadow-xl hover:border-[#3457dc]/50 transition-all">
                    <img src={`${API_BASE_URL}${item.imageUrl}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                        <p className="text-white font-bold text-sm mb-1">{item.title}</p>
                        <p className="text-white/40 text-xs mb-3">{item.team?.name || item.project?.title || 'General'}</p>
                        <button onClick={() => handleDelete(item._id)} className="w-full py-2 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2">
                            <RiDeleteBin6Line size={14} /> Delete Image
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const AddContentForm = ({ onComplete, editData, type = 'news' }) => {
    const [title, setTitle] = useState(editData?.title || '');
    const [description, setDescription] = useState(editData?.description || '');
    const [teamId, setTeamId] = useState(editData?.team?._id || '');
    const [projectId, setProjectId] = useState(editData?.project?._id || '');
    const [category, setCategory] = useState(editData?.category || 'General');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(editData?.imageUrl ? `${API_BASE_URL}${editData.imageUrl}` : null);
    
    const [teams, setTeams] = useState([]);
    const [projects, setProjects] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchMeta = async () => {
            const [t, p] = await Promise.all([
                fetch(`${API_BASE_URL}/api/teams`),
                fetch(`${API_BASE_URL}/api/projects`)
            ]);
            if (t.ok) setTeams(await t.json());
            if (p.ok) setProjects(await p.json());
        };
        fetchMeta();
    }, []);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        if (!title || (!image && !editData)) return alert('Title and Image are required');
        setIsSaving(true);
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('title', title);
            if (description) formData.append('description', description);
            if (teamId) formData.append('team', teamId);
            if (projectId) formData.append('project', projectId);
            if (category) formData.append('category', category);
            if (image) formData.append('image', image);

            const endpoint = type === 'news' ? 'news' : 'gallery';
            const url = editData ? `${API_BASE_URL}/api/${endpoint}/${editData._id}` : `${API_BASE_URL}/api/${endpoint}`;
            const method = editData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (res.ok) {
                alert('Saved successfully!');
                onComplete();
            }
        } catch (err) { console.error(err); }
        finally { setIsSaving(false); }
    };

    const selectedTeamName = teams.find(t => t._id === teamId)?.name || 'General Lab';
    const selectedProjectName = projects.find(p => p._id === projectId)?.title || 'No Project';

    return (
        <div className="bg-[#151519] border border-[#1e1d22] rounded-[16px] p-8 mt-6 w-full shadow-2xl relative">
             {/* Background Glow */}
             <div className="absolute inset-0 bg-radial-gradient from-[#3457DC]/5 to-transparent pointer-events-none" />

            <h3 className="text-[18px] font-gilroy font-bold text-white mb-8 relative z-10">
                {editData ? 'Edit' : 'Create New'} {type === 'news' ? 'News Article' : 'Gallery Momentum'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
                <div className="flex flex-col gap-6">
                    <FormInput 
                        label="Identity (Title)" 
                        placeholder="Enter catchy title..." 
                        value={title} 
                        onChange={setTitle} 
                    />

                    {type === 'news' && (
                        <FormTextArea 
                            label="Content Description" 
                            placeholder="Write the full story here..." 
                            value={description} 
                            onChange={setDescription} 
                        />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormSelect 
                            label="Research Team" 
                            value={selectedTeamName} 
                            options={[{ _id: '', name: 'General Lab' }, ...teams].map(t => ({ label: t.name, value: t._id }))}
                            onSelect={(opt) => setTeamId(opt.value)}
                        />
                        <FormSelect 
                            label="Linked Project" 
                            value={selectedProjectName} 
                            options={[{ _id: '', title: 'No Project' }, ...projects].map(p => ({ label: p.title, value: p._id }))}
                            onSelect={(opt) => setProjectId(opt.value)}
                        />
                    </div>

                    {type === 'gallery' && (
                        <FormSelect 
                            label="Media Category" 
                            value={category} 
                            options={['Research', 'Events', 'Visits', 'General']}
                            onSelect={setCategory}
                        />
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-[#80808a] text-[14px]">Visual Asset</p>
                    <div className="relative flex-1 bg-white/5 border border-dashed border-[#2a2a30] rounded-[16px] overflow-hidden group cursor-pointer hover:border-[#3457dc]/50 transition-all min-h-[300px]">
                        {preview ? (
                            <img src={preview} className="w-full h-full object-cover" />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30">
                                <RiImageAddLine size={48} className="mb-4 text-[#3457dc]" />
                                <p className="text-sm font-bold text-white">Click to upload media</p>
                            </div>
                        )}
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImage} accept="image/*" />
                        
                        <div className="absolute top-4 right-4 flex gap-2">
                             <div className="bg-white/10 p-2 rounded-full backdrop-blur-md hover:scale-110 transition-transform">
                                <img src={EditIcon} alt="edit" className="w-[1vw]" />
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-[1px] bg-[#2A2A30] my-8 relative z-10" />

            <div className="flex flex-col items-center gap-4 relative z-10 w-full mt-8">
                <button 
                    onClick={handleSave} 
                    disabled={isSaving} 
                    className="w-full py-4 bg-[#3457dc] hover:bg-[#2a46b3] rounded-[16px] text-[16px] font-bold shadow-lg shadow-[#3457dc]/20 transition-all active:scale-95 disabled:opacity-50 text-white"
                >
                    {isSaving ? 'Processing...' : (editData ? 'Update Content' : 'Publish to Portal')}
                </button>
                <button 
                    onClick={onComplete} 
                    className="w-full py-3 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] rounded-[16px] text-[#a5a5b2] hover:text-white font-bold transition-all text-sm"
                >
                    Cancel & Clear Form
                </button>
            </div>
        </div>
    );
};

export default function ManageNewsGallery() {
    const [activeTab, setActiveTab] = useState('news');
    const [editData, setEditData] = useState(null);

    const refreshKey = activeTab + (editData?._id || 'new');

    return (
        <div className="w-full text-white pb-20 px-0 font-poppins">
            <div className="mb-[40px] mt-[0px]">
                <div className="flex gap-[10px] items-center pt-[0px] px-[0px] w-full">
                    <Tab 
                        label="News" 
                        isActive={activeTab === 'news'} 
                        onClick={() => { setActiveTab('news'); setEditData(null); }} 
                    />
                    <Tab 
                        label="Gallery" 
                        isActive={activeTab === 'gallery'} 
                        onClick={() => { setActiveTab('gallery'); setEditData(null); }} 
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeTab} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-12"
                >
                    {/* Integrated Form at the top */}
                    <AddContentForm 
                        key={refreshKey}
                        type={activeTab} 
                        editData={editData} 
                        onComplete={() => { setEditData(null); }} 
                    />

                    {/* Integrated List/Grid at the bottom */}
                    <div className="mt-8">
                        <div className="mb-6">
                            <h3 className="text-[18px] font-gilroy font-bold text-white">
                                Existing {activeTab === 'news' ? 'Articles' : 'Media Bank'}
                            </h3>
                            <p className="text-[#a5a5b2] text-sm">Review and manage your published content</p>
                        </div>
                        
                        {activeTab === 'news' ? (
                            <NewsTable onEdit={(item) => { setEditData(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
                        ) : (
                            <GalleryGrid />
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
