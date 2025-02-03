import { Theme } from '../../types/game';
import { ThemeStyle } from './types';

export const themes: Record<Theme, ThemeStyle> = {
  classic: {
    boardWrapper: 'bg-blue-900',
    boardGrid: 'bg-opacity-90',
    cellWrapper: '',
    cell: 'shadow-md transform hover:scale-105',
    emptyCellColor: '#ffffff',
    cellBorder: '2px solid rgba(0, 0, 0, 0.1)',
    cellShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  neon: {
    boardWrapper: 'bg-black',
    boardGrid: 'bg-opacity-95',
    cellWrapper: 'relative',
    cell: 'shadow-lg transform hover:scale-105 transition-all',
    emptyCellColor: '#000000',
    cellBorder: '2px solid rgba(0, 255, 255, 0.5)',
    cellShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
    cellContent: 'absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse'
  },
  retro: {
    boardWrapper: 'bg-gradient-to-r from-amber-700 to-yellow-600',
    boardGrid: 'bg-opacity-90',
    cellWrapper: 'relative',
    cell: 'shadow-inner transform hover:scale-105',
    emptyCellColor: '#f4e4bc',
    cellBorder: '3px solid rgba(101, 67, 33, 0.6)',
    cellShadow: '0 2px 4px rgba(101, 67, 33, 0.4)',
    cellContent: 'absolute inset-0 bg-gradient-to-b from-amber-200/10 to-transparent'
  },
  galaxy: {
    boardWrapper: 'bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900',
    boardGrid: 'bg-opacity-80',
    cellWrapper: 'relative',
    cell: 'shadow-lg transform hover:scale-105 transition-all',
    emptyCellColor: 'rgba(255, 255, 255, 0.1)',
    cellBorder: '2px solid rgba(255, 255, 255, 0.2)',
    cellShadow: '0 0 25px rgba(147, 51, 234, 0.5)',
    cellContent: 'absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 animate-twinkle'
  },
  cyberpunk: {
    boardWrapper: 'bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500',
    boardGrid: 'bg-opacity-85',
    cellWrapper: 'relative overflow-hidden',
    cell: 'shadow-lg transform hover:scale-105 transition-all',
    emptyCellColor: '#1a1a1a',
    cellBorder: '2px solid rgba(255, 214, 0, 0.5)',
    cellShadow: '0 0 20px rgba(255, 214, 0, 0.4)',
    cellContent: 'absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-pink-500/30 animate-glitch'
  },
  nature: {
    boardWrapper: 'bg-gradient-to-b from-green-800 to-green-900',
    boardGrid: 'bg-opacity-90',
    cellWrapper: 'relative',
    cell: 'shadow-md transform hover:scale-105',
    emptyCellColor: '#e2e8f0',
    cellBorder: '2px solid rgba(34, 197, 94, 0.3)',
    cellShadow: '0 4px 6px rgba(34, 197, 94, 0.2)',
    cellContent: 'absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent'
  },
  ocean: {
    boardWrapper: 'bg-gradient-to-b from-blue-600 to-cyan-900',
    boardGrid: 'bg-opacity-85',
    cellWrapper: 'relative',
    cell: 'shadow-lg transform hover:scale-105 transition-all',
    emptyCellColor: '#e0f2fe',
    cellBorder: '2px solid rgba(56, 189, 248, 0.4)',
    cellShadow: '0 0 15px rgba(56, 189, 248, 0.3)',
    cellContent: 'absolute inset-0 bg-gradient-to-b from-blue-400/10 to-transparent animate-pulse'
  },
  sunset: {
    boardWrapper: 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600',
    boardGrid: 'bg-opacity-90',
    cellWrapper: 'relative',
    cell: 'shadow-lg transform hover:scale-105',
    emptyCellColor: '#fef3c7',
    cellBorder: '2px solid rgba(251, 146, 60, 0.4)',
    cellShadow: '0 0 20px rgba(251, 146, 60, 0.3)',
    cellContent: 'absolute inset-0 bg-gradient-to-r from-orange-400/20 to-pink-400/20'
  },
  midnight: {
    boardWrapper: 'bg-gradient-to-b from-slate-900 to-blue-950',
    boardGrid: 'bg-opacity-95',
    cellWrapper: 'relative',
    cell: 'shadow-xl transform hover:scale-105 transition-all',
    emptyCellColor: '#1e293b',
    cellBorder: '2px solid rgba(148, 163, 184, 0.2)',
    cellShadow: '0 0 30px rgba(148, 163, 184, 0.1)',
    cellContent: 'absolute inset-0 bg-gradient-to-b from-slate-700/10 to-transparent animate-twinkle'
  },
  volcanic: {
    boardWrapper: 'bg-gradient-to-br from-red-900 via-orange-900 to-red-950',
    boardGrid: 'bg-opacity-90',
    cellWrapper: 'relative overflow-hidden',
    cell: 'shadow-lg transform hover:scale-105',
    emptyCellColor: '#292524',
    cellBorder: '2px solid rgba(239, 68, 68, 0.4)',
    cellShadow: '0 0 25px rgba(239, 68, 68, 0.2)',
    cellContent: 'absolute inset-0 bg-gradient-to-t from-red-500/20 via-orange-500/10 to-transparent animate-pulse'
  }
};