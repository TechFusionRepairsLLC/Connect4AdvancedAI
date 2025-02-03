import React, { useState } from 'react';
import { CustomTheme } from '../../types/game';
import { Plus, Save } from 'lucide-react';

interface CustomThemeCreatorProps {
  onSave: (theme: CustomTheme) => void;
}

const CustomThemeCreator: React.FC<CustomThemeCreatorProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [boardColor, setBoardColor] = useState('#2E4052');
  const [gridColor, setGridColor] = useState('#ffffff');
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!name) return;

    const newTheme: CustomTheme = {
      id: `custom-${Date.now()}`,
      name,
      background: backgroundImage || '',
      boardColor,
      gridColor,
      player1Piece: { type: 'color', value: '#ff4136' },
      player2Piece: { type: 'color', value: '#ffdc00' }
    };

    onSave(newTheme);
    setName('');
    setBoardColor('#2E4052');
    setGridColor('#ffffff');
    setBackgroundImage(null);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 space-y-6">
      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
        <Plus className="w-6 h-6" />
        Create Custom Theme
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Theme Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-white/5 rounded-lg text-white"
            placeholder="My Custom Theme"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Board Color
          </label>
          <input
            type="color"
            value={boardColor}
            onChange={(e) => setBoardColor(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Grid Color
          </label>
          <input
            type="color"
            value={gridColor}
            onChange={(e) => setGridColor(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Background Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundUpload}
            className="block w-full text-sm text-white/80
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-white/10 file:text-white
              hover:file:bg-white/20"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!name}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 
            text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          Save Theme
        </button>
      </div>
    </div>
  );
};

export default CustomThemeCreator;