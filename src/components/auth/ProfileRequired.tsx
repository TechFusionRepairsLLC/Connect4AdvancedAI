import React from 'react';
import { User } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface ProfileRequiredProps {
  children: React.ReactNode;
  isLoginMode: boolean;
  onToggleMode: () => void;
}

const ProfileRequired: React.FC<ProfileRequiredProps> = ({ 
  children, 
  isLoginMode, 
  onToggleMode 
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
        <User className="w-16 h-16 mx-auto text-blue-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Profile Required
        </h3>
        <p className="text-white/80 mb-6">
          Please sign in or create an account to play multiplayer games
        </p>
        
        {isLoginMode ? (
          <LoginForm
            onSuccess={() => {}}
            onToggleMode={onToggleMode}
          />
        ) : (
          <SignupForm
            onSuccess={() => {}}
            onToggleMode={onToggleMode}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileRequired;