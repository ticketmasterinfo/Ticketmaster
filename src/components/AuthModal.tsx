import React, { useState } from 'react';
import { X, User, Mail, Lock, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex.rivera@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: isRegister ? name : 'Alex Rivera',
      email: email,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div className="bg-white text-[#121212] w-full max-w-md rounded-xl shadow-2xl border border-[#bfbfbf] overflow-hidden">
        <div className="bg-[#121212] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#024ddf]" />
            <h3 className="font-bold text-sm uppercase tracking-wider">
              {isRegister ? 'Create TicketPass Account' : 'Sign In to Your Account'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#a0a0a0] hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-[#646464] mb-1">Your Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#949494] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-[#bfbfbf] rounded text-sm focus:ring-2 focus:ring-[#024ddf] focus:outline-none"
                  placeholder="Taylor Johnson"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#646464] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#949494] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-[#bfbfbf] rounded text-sm focus:ring-2 focus:ring-[#024ddf] focus:outline-none"
                placeholder="fan@ticketpass.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#646464] mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#949494] absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-[#bfbfbf] rounded text-sm focus:ring-2 focus:ring-[#024ddf] focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white rounded font-bold text-sm shadow transition-colors"
          >
            {isRegister ? 'Register & Continue' : 'Sign In'}
          </button>

          <div className="text-center pt-2 text-xs text-[#646464]">
            {isRegister ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="text-[#024ddf] font-bold hover:underline"
                >
                  Sign In here
                </button>
              </span>
            ) : (
              <span>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className="text-[#024ddf] font-bold hover:underline"
                >
                  Create one in seconds
                </button>
              </span>
            )}
          </div>

          <div className="pt-3 border-t border-[#ebebeb] flex items-center justify-center gap-1.5 text-[11px] text-[#949494]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00875a]" />
            <span>Secure Universal Fan Account Authentication</span>
          </div>
        </form>
      </div>
    </div>
  );
};
