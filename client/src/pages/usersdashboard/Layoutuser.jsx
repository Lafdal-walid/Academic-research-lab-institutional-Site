import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layoutuser = ({ children, title }) => {
    // Default to closed on mobile (less than 1024px)
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar = () => {
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#0A070E] text-white">
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
            
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-[45] backdrop-blur-sm transition-opacity"
                    onClick={closeSidebar}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                <Header onToggleSidebar={toggleSidebar} title={title} isSidebarOpen={isSidebarOpen} />
                <main className="flex-1 overflow-y-auto w-full">
                    <div className="p-4 sm:p-6 lg:p-10 w-full transition-all duration-300">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layoutuser;
