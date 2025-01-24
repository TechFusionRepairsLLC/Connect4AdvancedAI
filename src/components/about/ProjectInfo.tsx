import React from 'react';
import { Code, Users, Palette } from 'lucide-react';

export const ProjectInfo = () => {
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-medium text-white">About This Project</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <Code className="w-6 h-6 text-blue-400 mb-2" />
          <h5 className="font-medium text-white mb-2">Modern Tech Stack</h5>
          <p className="text-sm text-white/80">
            Built with React, TypeScript, and Supabase for a robust gaming experience
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <Users className="w-6 h-6 text-green-400 mb-2" />
          <h5 className="font-medium text-white mb-2">Multiplayer Support</h5>
          <p className="text-sm text-white/80">
            Play against friends online or challenge our AI opponent
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <Palette className="w-6 h-6 text-purple-400 mb-2" />
          <h5 className="font-medium text-white mb-2">Customizable Themes</h5>
          <p className="text-sm text-white/80">
            Multiple beautiful themes to personalize your gaming experience
          </p>
        </div>
      </div>

      <div className="text-white/80 space-y-4">
        <p>
          I created this Connect4 game as a fun side project to demonstrate modern web development 
          techniques while providing an entertaining gaming experience. It showcases my passion for 
          creating engaging, well-crafted web applications.
        </p>
        <p>
          Visit my website at{' '}
          <a 
            href="https://alejandroxsolis93.wixsite.com/techfusion-repairs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            TechFusion Repairs LLC
          </a>
          {' '}to learn more about my other projects and services.
        </p>
      </div>
    </div>
  );
};