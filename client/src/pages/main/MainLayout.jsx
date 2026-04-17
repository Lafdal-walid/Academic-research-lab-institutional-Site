import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isFullWidthVariant = location.pathname.includes('/projects');

  return (
    <div className="min-h-screen bg-background-main text-white selection:bg-accent selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-x-0 top-0 -z-10 h-[600px] w-full bg-gradient-to-b from-accent/10 to-transparent blur-3xl opacity-30 pointer-events-none" />
      
      <Header />
      
      <main className={`relative z-10 w-full ${isFullWidthVariant ? '' : 'pt-20'}`}>
        <div className={isFullWidthVariant ? 'w-full' : 'container mx-auto px-6 py-12 lg:py-24'}>
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
