import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from '../usersdashboard/Header'; // Reusing the same header as usersdashboard

const Layoutleader = ({ children, title }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    return (
        <div className="flex min-h-screen bg-[#0A070E] text-white">
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} />
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                <Header onToggleSidebar={toggleSidebar} title={title} />
                <main className="flex-1 overflow-y-auto w-full">
                    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layoutleader;
