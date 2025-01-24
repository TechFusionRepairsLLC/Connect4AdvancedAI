import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';
import ProfileEditor from './ProfileEditor';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';

const ProfileTab: React.FC = () => {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(!user);
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onAuth={async ({ email, password, username }) => {
          // Handle authentication
          setShowAuth(false);
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Your Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
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