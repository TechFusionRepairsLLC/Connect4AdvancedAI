import React from 'react';
import { Theme } from '../../types/game';
import { Palette } from 'lucide-react';

interface ThemeSelectorProps {
  onThemeSelect: (theme: Theme) => void;
  currentTheme: Theme;
}

const themeData = {
  classic: {
    name: 'Classic',
    preview: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=300&q=80'
  },
  neon: {
    name: 'Neon',
    preview: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&q=80'
  },
  retro: {
    name: 'Retro',
    preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&q=80'
  },
  galaxy: {
    name: 'Galaxy',
    preview: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&q=80'
  },
  cyberpunk: {
    name: 'Cyberpunk',
    preview: 'https://images.unsplash.com/photo-1515705576963-95cad62945b6?w=300&q=80'
  },
  nature: {
    name: 'Nature',
    preview: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&q=80'
  },
  ocean: {
    name: 'Ocean',
    preview: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&q=80'
  },
  sunset: {
    name: 'Sunset',
    preview: 'https://images.unsplash.com/photo-1472120435266-53107fd0c44a?w=300&q=80'
  },
  midnight: {
    name: 'Midnight',
    preview: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=80'
  },
  volcanic: {
    name: 'Volcanic',
    preview: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=300&q=80'
  }
};

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeSelect, currentTheme }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
        <Palette className="w-6 h-6" />
        Board Themes
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(themeData).map(([themeId, theme]) => (
          <button
            key={themeId}
            onClick={() => onThemeSelect(themeId as Theme)}
            className={`relative rounded-lg overflow-hidden aspect-video group
              ${currentTheme === themeId ? 'ring-2 ring-blue-500' : ''}`}
          >
            <img
              src={theme.preview}
              alt={theme.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium">{theme.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;