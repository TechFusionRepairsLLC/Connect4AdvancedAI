import React from 'react';
import { Mail, Globe } from 'lucide-react';

export const ProfileSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80"
            alt="Alejandro X. Solis"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Alejandro X. Solis</h3>
          <p className="text-white/60">Founder & Developer</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-white">
          <Mail className="w-5 h-5" />
          <a 
            href="mailto:TechFusionRepairsLLC@gmail.com" 
            className="hover:text-blue-400 transition-colors"
          >
            TechFusionRepairsLLC@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-3 text-white">
          <Globe className="w-5 h-5" />
          <a
            href="https://alejandroxsolis93.wixsite.com/techfusion-repairs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            TechFusion Repairs LLC Website
          </a>
        </div>
      </div>
    </div>
  );
};