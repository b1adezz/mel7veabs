import { useState } from 'react';
import { Video } from 'lucide-react';
import SparklingBackground from './SparklingBackground';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4 relative z-10">
      <SparklingBackground />
      <div className="max-w-md w-full relative z-20" style={{ animation: 'slideIn 0.6s ease-out' }}>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-700">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-full" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <Video className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Mel & Beans</h1>
            <p className="text-gray-300">Enter access code to continue</p>
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
                className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-center text-lg tracking-wider bg-gray-700/50 text-white placeholder-gray-400"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-red-400 text-sm text-center animate-pulse">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-200"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
