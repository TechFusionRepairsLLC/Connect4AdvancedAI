import React, { useState } from 'react';
import { Mail, Lock, Phone } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface LoginFormProps {
  onSuccess: () => void;
  onToggleMode: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onToggleMode }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const isEmail = identifier.includes('@');
      const { error } = await supabase.auth.signInWithPassword({
        email: isEmail ? identifier : `${identifier}@phone.com`,
        password,
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
          Email or Phone Number
        </label>
        <div className="relative">
          {identifier.includes('@') ? (
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          ) : (
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          )}
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full bg-white/10 text-white rounded-lg pl-10 pr-4 py-2"
            placeholder="Enter email or phone number"
            required
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/10 text-white rounded-lg pl-10 pr-4 py-2"
            placeholder="Enter password"
            required
          />
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white rounded-lg py-2 font-medium 
          hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={onToggleMode}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </form>
  );
};

export default LoginForm;