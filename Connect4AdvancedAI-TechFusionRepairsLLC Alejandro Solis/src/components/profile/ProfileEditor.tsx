import React, { useState } from 'react';
import { UserProfile } from '../../types/game';
import { Camera, Save, X, Phone, Mail, User } from 'lucide-react';

interface ProfileEditorProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({
  profile,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState(profile);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      avatar: newAvatar || formData.avatar
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src={newAvatar || formData.avatar}
                alt={formData.username}
                className="w-full h-full object-cover"
              />
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 
              opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
              <Camera className="w-6 h-6 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-2 pl-10 bg-white/5 rounded-lg text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 pl-10 bg-white/5 rounded-lg text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 pl-10 bg-white/5 rounded-lg text-white"
                  placeholder="Add phone number (optional)"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg 
              hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg 
              hover:bg-blue-600 transition-colors text-white"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileEditor;