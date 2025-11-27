import { useState } from 'react';
import { Video } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === 'mel8beans') {
      onLogin();
    } else {
      setError('Incorrect Code. Try again!');
      setCode('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-rose-400 to-teal-400 p-3 rounded-full">
                <Video className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Mel & Beans</h1>
            <p className="text-gray-600">Enter access code to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError('');
                }}
                placeholder="Enter code"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-400 focus:outline-none transition-colors text-center text-lg tracking-wider"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-400 to-teal-400 text-white py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
