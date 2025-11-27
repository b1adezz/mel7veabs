import { Video, Lightbulb, Upload, Film } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  videoCount: number;
  ideaCount: number;
}

export default function HomePage({ onNavigate, videoCount, ideaCount }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-rose-400 to-teal-400 p-4 rounded-2xl shadow-xl">
              <Film className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Mel & Beans' Video Archive
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal collection of memories, moments, and creative ideas. Store, organize, and cherish every video.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-4 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-center">
              <div className="bg-rose-100 p-3 rounded-full">
                <Video className="w-8 h-8 text-rose-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Video Library</h3>
            <p className="text-gray-600">Browse and watch your collection of {videoCount} videos</p>
            <button
              onClick={() => onNavigate('library')}
              className="w-full bg-gradient-to-r from-rose-400 to-rose-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              View Library
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-4 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-center">
              <div className="bg-amber-100 p-3 rounded-full">
                <Lightbulb className="w-8 h-8 text-amber-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Video Ideas</h3>
            <p className="text-gray-600">Explore and add to your {ideaCount} creative ideas</p>
            <button
              onClick={() => onNavigate('ideas')}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              View Ideas
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-4 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-center">
              <div className="bg-teal-100 p-3 rounded-full">
                <Upload className="w-8 h-8 text-teal-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Upload Video</h3>
            <p className="text-gray-600">Add new videos to your growing collection</p>
            <button
              onClick={() => onNavigate('upload')}
              className="w-full bg-gradient-to-r from-teal-400 to-teal-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Upload Now
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your video archive is a special place to preserve your favorite moments.
            Start by uploading a new video, browsing your collection, or jotting down
            ideas for future content.
          </p>
        </div>
      </div>
    </div>
  );
}
