import TrashIcon from '@/assets/svg/LeaderDashboard/admintools/Frame 6489.svg';
import EditIcon from '@/assets/svg/LeaderDashboard/admintools/Frame 6490.svg';
import AddAdminIcon from '@/assets/svg/LeaderDashboard/admintools/Group.svg';
import EditAdminModal from './EditAdminModal';
import AddAdminModal from './AddAdminModal';
import { useState } from 'react';

const AdminTools = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const [admins, setAdmins] = useState([
        { id: 1, name: 'Amir Khoury', email: 'amir@domain.com', role: 'superadmin', joined: 'Jan 12, 2025', lastActive: '2 hours ago', status: 'Active' },
        { id: 2, name: 'Sarah Belkacem', email: 'sarah@domain.com', role: 'admin', joined: 'Jan 12, 2025', lastActive: '2 hours ago', status: 'Suspended' },
        { id: 3, name: 'Yacine Rahmani', email: 'yacine@domain.com', role: 'user', joined: 'Jan 12, 2025', lastActive: '2 hours ago', status: 'Active' },
    ]);

    const handleEditClick = (admin) => {
        setSelectedAdmin(admin);
        setIsEditModalOpen(true);
    };

    const handleAddAdmin = (newAdmin) => {
        const adminWithMeta = {
            id: admins.length + 1,
            ...newAdmin,
            joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            lastActive: 'Just now',
            status: 'Active'
        };
        setAdmins([...admins, adminWithMeta]);
        setIsAddModalOpen(false);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Active':
                return { backgroundColor: 'rgba(39, 189, 173, 0.1)', color: '#27bdad' };
            case 'Suspended':
                return { backgroundColor: 'rgba(197, 67, 45, 0.1)', color: '#C5432D' };
            default:
                return { backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#fff' };
        }
    };

    return (
        <div className="w-full text-white font-poppins animate-in fade-in duration-500 flex flex-col h-full relative" style={{ gap: '3vh' }}>
            {/* Header */}
            <div className="flex items-center justify-between w-full">
                <h1 className="font-bold text-white m-0" style={{ fontSize: '1.2vw', fontFamily: 'Gilroy, Poppins, sans-serif' }}>Admin Accounts</h1>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    style={{
                    backgroundColor: '#3457DC',
                    border: 'none',
                    borderRadius: '0.8vw',
                    padding: '1.2vh 1.8vw',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8vw',
                    fontSize: '0.9vw',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }} className="hover:bg-[#4a6dec] hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(52,87,220,0.2)]">
                    <span>Add New Admin</span>
                    <img src={AddAdminIcon} alt="add" style={{ width: '1.2vw', height: '1.2vw', objectFit: 'contain' }} />
                </button>
            </div>

            {/* Table Container */}
            <div style={{
                backgroundColor: '#151519',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '3vh 1.5vw 4vh 1.5vw',
                borderRadius: '1.2vw',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <th style={{ padding: '1.5vh 1vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Name</th>
                                <th style={{ padding: '1.5vh 1vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Email</th>
                                <th style={{ padding: '1.5vh 1vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Role</th>
                                <th style={{ padding: '1.5vh 1vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Joined</th>
                                <th style={{ padding: '1.5vh 1vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Last Active</th>
                                <th style={{ padding: '1.5vh 1vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500 }}>Status</th>
                                <th style={{ padding: '1.5vh 1vw', fontSize: '0.9vw', color: '#a5a5b2', fontWeight: 500, textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody className="relative">
                            {admins.map((account, index) => (
                                <tr key={account.id} style={{ borderBottom: index !== admins.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', height: '8vh' }}>
                                    <td style={{ padding: '0 1vw', fontSize: '0.85vw', color: 'white' }}>{account.name}</td>
                                    <td style={{ padding: '0 1vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{account.email}</td>
                                    <td style={{ padding: '0 1vw' }}>
                                        <span style={{ 
                                            fontSize: '0.75vw', 
                                            padding: '0.4vh 0.8vw', 
                                            borderRadius: '0.4vw',
                                            backgroundColor: account.role === 'superadmin' ? 'rgba(235, 87, 87, 0.1)' : 
                                                             account.role === 'admin' ? 'rgba(52, 87, 220, 0.1)' : 
                                                             account.role === 'guest' ? 'rgba(165, 165, 178, 0.1)' : 'rgba(39, 189, 173, 0.1)',
                                            color: account.role === 'superadmin' ? '#eb5757' : 
                                                   account.role === 'admin' ? '#3457DC' : 
                                                   account.role === 'guest' ? '#a5a5b2' : '#27bdad',
                                            fontWeight: 600,
                                            textTransform: 'capitalize'
                                        }}>
                                            {account.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '0 1vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{account.joined}</td>
                                    <td style={{ padding: '0 1vw', fontSize: '0.85vw', color: 'rgba(255,255,255,0.7)' }}>{account.lastActive}</td>
                                    <td style={{ padding: '0 1vw' }}>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '0.7vh 1vw',
                                            borderRadius: '100px',
                                            fontSize: '0.75vw',
                                            fontWeight: 600,
                                            width: '6vw',
                                            ...getStatusStyle(account.status)
                                        }}>
                                            {account.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '0 1vw', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1vw', position: 'relative' }}>
                                            <button 
                                                onClick={() => handleEditClick(account)}
                                                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                <img src={EditIcon} alt="edit" style={{ width: '1.8vw', height: '1.8vw', objectFit: 'contain' }} />
                                            </button>
                                            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <img src={TrashIcon} alt="delete" style={{ width: '1.8vw', height: '1.8vw', objectFit: 'contain' }} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Admin Modal */}
            <EditAdminModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                adminData={selectedAdmin} 
            />

            {/* Add New Admin Modal */}
            <AddAdminModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onAdd={handleAddAdmin}
            />
        </div>
    );
};

export default AdminTools;
