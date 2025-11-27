import { Video, Lightbulb, Upload, Home, LogOut } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function Navigation({ currentPage, onNavigate, onLogout }: NavigationProps) {
  const links = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'library', label: 'Video Library', icon: Video },
    { id: 'ideas', label: 'Video Ideas', icon: Lightbulb },
    { id: 'upload', label: 'Upload Video', icon: Upload },
  ];

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-rose-400 to-teal-400 p-2 rounded-lg">
              <Video className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Mel & Beans</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === link.id
                      ? 'bg-gradient-to-r from-rose-400 to-teal-400 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{link.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Logout</span>
          </button>
        </div>

        <div className="md:hidden flex space-x-1 pb-3 overflow-x-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  currentPage === link.id
                    ? 'bg-gradient-to-r from-rose-400 to-teal-400 text-white shadow-md'
                    : 'text-gray-600 bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{link.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
