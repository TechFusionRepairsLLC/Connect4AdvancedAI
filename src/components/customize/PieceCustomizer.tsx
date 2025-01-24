import React from 'react';
import { PlayerPiece } from '../../types/game';
import { CircleDot, Image as ImageIcon } from 'lucide-react';

interface PieceCustomizerProps {
  player: 1 | 2;
  currentPiece: PlayerPiece;
  onPieceChange: (piece: PlayerPiece) => void;
}

export const PieceCustomizer: React.FC<PieceCustomizerProps> = ({
  player,
  currentPiece,
  onPieceChange,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onPieceChange({
          type: 'image',
          value: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">
        Player {player} Piece
      </h3>

      <div className="flex gap-4">
        <button
          onClick={() => onPieceChange({ type: 'color', value: '#ff0000' })}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg"
        >
          <CircleDot className="w-5 h-5" />
          <span>Color</span>
        </button>

        <label className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg cursor-pointer">
          <ImageIcon className="w-5 h-5" />
          <span>Image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {currentPiece.type === 'color' && (
        <input
          type="color"
          value={currentPiece.value}
          onChange={(e) => onPieceChange({ type: 'color', value: e.target.value })}
          className="w-full"
        />
      )}
    </div>
  );
};

export default PieceCustomizer;