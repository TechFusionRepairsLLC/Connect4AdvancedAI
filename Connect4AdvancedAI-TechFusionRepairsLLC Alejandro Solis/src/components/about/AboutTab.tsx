import React from 'react';
import { ProfileSection } from './ProfileSection';
import { ProjectInfo } from './ProjectInfo';

const AboutTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold text-white mb-4">Welcome to Connect Four vs AI!</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-white/90 leading-relaxed">
            Are you ready to put your strategic thinking to the test? Connect Four vs AI offers an engaging 
            and challenging experience where you can compete against a smart AI opponent in the classic 
            Connect Four game. Whether you're here to sharpen your skills or simply have fun, this is 
            the perfect place for all game enthusiasts!
          </p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 space-y-8">
        <ProfileSection />
        <div className="border-t border-white/10 pt-8">
          <ProjectInfo />
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
        <p className="text-white/80 leading-relaxed">
          Want to learn more about my work or get in touch? Visit my website at{' '}
          <a 
            href="https://alejandroxsolis93.wixsite.com/techfusion-repairs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            TechFusion Repairs
          </a>
          {' '}for additional information. You can also contact me directly via email at{' '}
          <a 
            href="mailto:TechFusionRepairsLLC@gmail.com"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            TechFusionRepairsLLC@gmail.com
          </a>
          . I'd love to hear from you!
        </p>
      </div>
    </div>
  );
};

export default AboutTab;