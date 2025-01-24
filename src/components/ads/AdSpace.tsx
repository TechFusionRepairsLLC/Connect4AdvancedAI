import React from 'react';

type AdPosition = 'top' | 'bottom' | 'left' | 'right';

interface AdSpaceProps {
  position: AdPosition;
}

const AdSpace: React.FC<AdSpaceProps> = ({ position }) => {
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'w-full h-24';
      case 'bottom':
        return 'w-full h-24';
      case 'left':
      case 'right':
        return 'w-48 min-h-[600px] sticky top-4';
    }
  };

  return (
    <div className={`bg-white/5 backdrop-blur-lg rounded-lg ${getPositionStyles()} flex items-center justify-center`}>
      <p className="text-white/60">Advertisement Space</p>
    </div>
  );
};

export default AdSpace;