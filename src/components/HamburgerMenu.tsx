import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HamburgerMenuProps {
  onLogout: () => void;
  currentPage?: string;
}

export default function HamburgerMenu({ onLogout, currentPage }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Home', path: '/home' },
    { label: 'Video Library', path: '/videos' },
    { label: 'Video Ideas', path: '/ideas' },
    { label: 'Upload Video', path: '/upload' },
  ];

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-black z-40 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ animation: isOpen ? 'slideInFromLeft 0.3s ease-out' : 'slideOutToLeft 0.3s ease-out' }}
      >
        <div className="pt-20 px-6 space-y-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Mel & Beans</h1>
            <p className="text-gray-400 text-sm mt-1">Video Archive</p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleMenuClick}
                className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentPage === item.path
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-700 pt-6">
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full px-4 py-3 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/40 transition-all duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
