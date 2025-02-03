import React, { useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SignupFormProps {
  onSuccess: () => void;
  onToggleMode: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess, onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
            phone_number: formData.phone || null, // Make phone optional
          },
        },
      });

      if (error) throw error;
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            className="w-full bg-white/10 text-white rounded-lg pl-10 pr-4 py-2"
            placeholder="Choose a username"
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
            className="w-full bg-white/10 text-white rounded-lg pl-10 pr-4 py-2"
            placeholder="Enter email"
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
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-white/10 text-white rounded-lg pl-10 pr-4 py-2"
            placeholder="Enter phone number (optional)"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-white/10 text-white rounded-lg pl-10 pr-4 py-2"
            placeholder="Choose a password"
            required
            minLength={6}
          />
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !formData.email || !formData.username || !formData.password}
        className="w-full bg-blue-500 text-white rounded-lg py-2 font-medium 
          hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={onToggleMode}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Already have an account? Sign in
        </button>
      </div>
    </form>
  );
};

export default SignupForm;