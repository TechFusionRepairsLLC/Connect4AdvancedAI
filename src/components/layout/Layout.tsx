import React from 'react';
import AdSpace from '../ads/AdSpace';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      {/* Top ad space */}
      <div className="w-full h-24 bg-white/5">
        <AdSpace position="top" />
      </div>
      
      <div className="flex justify-between">
        {/* Left ad space */}
        <div className="hidden lg:block w-48">
          <AdSpace position="left" />
        </div>

        {/* Main content */}
        <main className="flex-1 px-4 py-8 max-w-7xl mx-auto">
          {children}
        </main>

        {/* Right ad space */}
        <div className="hidden lg:block w-48">
          <AdSpace position="right" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;