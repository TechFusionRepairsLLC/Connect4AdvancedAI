import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileEditor from '../profile/ProfileEditor';
import ProfileHeader from '../profile/ProfileHeader';
import ProfileStats from '../profile/ProfileStats';

const ProfileTab: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8">
          {isLoginMode ? 'Sign In' : 'Create Account'}
        </h2>
        
        {isLoginMode ? (
          <LoginForm
            onSuccess={() => {}}
            onToggleMode={() => setIsLoginMode(false)}
          />
        ) : (
          <SignupForm
            onSuccess={() => {}}
            onToggleMode={() => setIsLoginMode(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Your Profile</h2>
        <div className="space-x-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      </div>

      {isEditing ? (
        <ProfileEditor
          profile={user}
          onSave={(updatedProfile) => {
            // Handle profile update
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <ProfileHeader profile={user} />
          <ProfileStats profile={user} />
        </>
      )}
    </div>
  );
};

export default ProfileTab;