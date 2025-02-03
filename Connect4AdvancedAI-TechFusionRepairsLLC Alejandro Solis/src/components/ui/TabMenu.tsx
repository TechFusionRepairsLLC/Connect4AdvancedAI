import React from 'react';
import { Tab } from '../../types/game';
import { Gamepad2, Users, Settings2, Palette, Trophy, User, Info } from 'lucide-react';

interface TabMenuProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const TabMenu: React.FC<TabMenuProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'solo', label: 'Solo', icon: <Gamepad2 className="w-5 h-5" /> },
    { id: 'multiplayer', label: 'Multiplayer', icon: <Users className="w-5 h-5" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings2 className="w-5 h-5" /> },
    { id: 'customize', label: 'Customize', icon: <Palette className="w-5 h-5" /> },
    { id: 'about', label: 'About', icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 bg-white/10 backdrop-blur-lg rounded-lg p-1">
      {tabs.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id as Tab)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
            ${activeTab === id 
              ? 'bg-white text-gray-900 shadow-lg' 
              : 'text-white/80 hover:bg-white/10'}`}
        >
          {icon}
          <span className="font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabMenu;