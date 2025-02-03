import React from 'react';
import { Theme, GameColors } from '../../types/game';
import { ThemeSelector } from '../customize/ThemeSelector';
import { ColorPicker } from '../customize/ColorPicker';
import { ThemePreview } from '../customize/ThemePreview';

interface CustomizeTabProps {
  currentTheme: Theme;
  colors: GameColors;
  onThemeChange: (theme: Theme) => void;
  onColorsChange: (colors: Partial<GameColors>) => void;
}

const CustomizeTab: React.FC<CustomizeTabProps> = ({
  currentTheme,
  colors,
  onThemeChange,
  onColorsChange,
}) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Customize Your Game</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <ThemeSelector
            onThemeSelect={onThemeChange}
            currentTheme={currentTheme}
          />
          <ColorPicker
            colors={colors}
            onColorsChange={onColorsChange}
          />
        </div>
        <ThemePreview colors={colors} />
      </div>
    </div>
  );
};

export default CustomizeTab;