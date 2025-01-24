import React from 'react';
import { Link } from '../ui/Link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-lg py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About Connect4</h3>
            <p className="text-white/60">
              A classic game of strategy and skill. Challenge friends or play against AI.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/cookies">Cookies Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://github.com/yourusername">GitHub</Link>
              </li>
              <li>
                <Link href="https://twitter.com/yourusername">Twitter</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60">
          <p>© {new Date().getFullYear()} Connect4. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};