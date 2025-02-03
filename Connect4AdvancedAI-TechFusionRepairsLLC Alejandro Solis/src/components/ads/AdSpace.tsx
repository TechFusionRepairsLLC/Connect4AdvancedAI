import React from 'react';
import { Mail } from 'lucide-react';

type AdPosition = 'top' | 'bottom' | 'left' | 'right';

interface AdSpaceProps {
  position: AdPosition;
}

const AdSpace: React.FC<AdSpaceProps> = ({ position }) => {
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
      case 'bottom':
        return 'w-full h-24';
      case 'left':
      case 'right':
        return 'w-48 min-h-[600px] sticky top-4';
    }
  };

  return (
    <div className={`bg-white/5 backdrop-blur-lg rounded-lg ${getPositionStyles()} flex flex-col items-center justify-center p-4`}>
      <p className="text-white/60 text-center mb-2">Advertisement Space</p>
      <a 
        href="mailto:TechFusionRepairsLLC@gmail.com"
        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
      >
        <Mail className="w-4 h-4" />
        <span>Contact for advertising information</span>
      </a>
    </div>
  );
};

export default AdSpace;