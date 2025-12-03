import { Video, Lightbulb, Upload, Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

interface HomePageProps {
  videoCount: number;
  ideaCount: number;
}

export default function HomePage({ videoCount, ideaCount }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pb-20 page-transition relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-6 mb-16" style={{ animation: 'slideIn 0.6s ease-out' }}>
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-2xl shadow-blue-500/50" style={{ animation: 'float 3s ease-in-out infinite' }}>
              <Film className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Mel & Beans' Video Archive
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your personal collection of memories, moments, and creative ideas. Store, organize, and cherish every video.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/videos"
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center space-y-4 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 border border-gray-700 group"
            style={{ animation: 'slideIn 0.6s ease-out 0.1s both' }}
          >
            <div className="flex justify-center">
              <div className="bg-blue-500/20 p-3 rounded-full group-hover:bg-blue-500/40 transition-all">
                <Video className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">Video Library</h3>
            <p className="text-gray-300">Browse and watch your collection of {videoCount} videos</p>
            <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
              View Library
            </div>
          </Link>

          <Link
            to="/ideas"
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center space-y-4 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 border border-gray-700 group"
            style={{ animation: 'slideIn 0.6s ease-out 0.2s both' }}
          >
            <div className="flex justify-center">
              <div className="bg-purple-500/20 p-3 rounded-full group-hover:bg-purple-500/40 transition-all">
                <Lightbulb className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">Video Ideas</h3>
            <p className="text-gray-300">Explore and add to your {ideaCount} creative ideas</p>
            <div className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg font-medium group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
              View Ideas
            </div>
          </Link>

          <Link
            to="/upload"
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center space-y-4 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 border border-gray-700 group"
            style={{ animation: 'slideIn 0.6s ease-out 0.3s both' }}
          >
            <div className="flex justify-center">
              <div className="bg-cyan-500/20 p-3 rounded-full group-hover:bg-cyan-500/40 transition-all">
                <Upload className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">Upload Video</h3>
            <p className="text-gray-300">Add new videos to your growing collection</p>
            <div className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-medium group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
              Upload Now
            </div>
          </Link>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-gray-700" style={{ animation: 'slideIn 0.6s ease-out 0.4s both' }}>
          <h2 className="text-2xl font-bold text-white mb-4">Welcome Back!</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Your video archive is a special place to preserve your favorite moments.
            Start by uploading a new video, browsing your collection, or jotting down
            ideas for future content.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
