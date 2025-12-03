import { useState } from 'react';
import { Video as VideoType } from '../types';
import { Search, Calendar, X, ArrowLeft } from 'lucide-react';
import Footer from './Footer';

interface VideoLibraryProps {
  videos: VideoType[];
  onDeleteVideo: (id: string) => void;
}

export default function VideoLibrary({ videos, onDeleteVideo }: VideoLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.date.includes(searchTerm)
  );

  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 relative z-10 page-transition">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedVideo(null)}
            className="flex items-center space-x-2 text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Library</span>
          </button>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-700" style={{ animation: 'slideIn 0.6s ease-out' }}>
            <div className="aspect-video bg-black">
              <video
                controls
                className="w-full h-full"
                src={selectedVideo.videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="p-8 space-y-4">
              <h1 className="text-3xl font-bold text-white">{selectedVideo.title}</h1>

              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedVideo.date).toLocaleDateString()}</span>
                </div>
                <span>•</span>
                <span>Uploaded {new Date(selectedVideo.uploadedAt).toLocaleDateString()}</span>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h2 className="font-semibold text-white mb-2">Description</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selectedVideo.description}</p>
              </div>

              <div className="border-t border-gray-700 pt-4 flex justify-end">
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this video?')) {
                      onDeleteVideo(selectedVideo.id);
                      setSelectedVideo(null);
                    }
                  }}
                  className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40 transition-all"
                >
                  Delete Video
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 pb-20 relative z-10 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8" style={{ animation: 'slideIn 0.6s ease-out' }}>
          <h1 className="text-4xl font-bold text-white mb-4">Video Library</h1>
          <p className="text-gray-300 mb-6">Browse and watch your collection of {videos.length} videos</p>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, description, or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-gray-800/50 text-white placeholder-gray-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {filteredVideos.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700">
            <p className="text-gray-300 text-lg">
              {searchTerm ? 'No videos found matching your search.' : 'No videos uploaded yet. Start by uploading your first video!'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, idx) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/50 border border-gray-700"
                style={{ animation: `slideIn 0.6s ease-out ${0.1 * idx}s both` }}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-black flex items-center justify-center relative">
                  {video.thumbnail ? (
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-white text-6xl">▶</div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-lg text-white line-clamp-2">{video.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(video.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
