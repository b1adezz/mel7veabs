import { useState, useEffect } from 'react';
import { storage } from './utils/storage';
import LoginPage from './components/LoginPage';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import VideoLibrary from './components/VideoLibrary';
import VideoUpload from './components/VideoUpload';
import VideoIdeas from './components/VideoIdeas';
import { Video, VideoIdea } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [videos, setVideos] = useState<Video[]>([]);
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);

  useEffect(() => {
    setIsAuthenticated(storage.isAuthenticated());
    setVideos(storage.getVideos());
    setIdeas(storage.getIdeas());
  }, []);

  const handleLogin = () => {
    storage.setAuthenticated(true);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    storage.logout();
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const handleUploadVideo = (videoData: {
    title: string;
    description: string;
    date: string;
    videoUrl: string;
  }) => {
    const newVideo: Video = {
      id: Date.now().toString(),
      ...videoData,
      uploadedAt: new Date().toISOString(),
    };
    storage.addVideo(newVideo);
    setVideos(storage.getVideos());
    setCurrentPage('library');
  };

  const handleDeleteVideo = (id: string) => {
    storage.deleteVideo(id);
    setVideos(storage.getVideos());
  };

  const handleAddIdea = (ideaData: Omit<VideoIdea, 'id' | 'createdAt'>) => {
    const newIdea: VideoIdea = {
      id: Date.now().toString(),
      ...ideaData,
      createdAt: new Date().toISOString(),
    };
    storage.addIdea(newIdea);
    setIdeas(storage.getIdeas());
  };

  const handleUpdateIdea = (id: string, updates: Partial<VideoIdea>) => {
    storage.updateIdea(id, updates);
    setIdeas(storage.getIdeas());
  };

  const handleDeleteIdea = (id: string) => {
    storage.deleteIdea(id);
    setIdeas(storage.getIdeas());
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen">
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />

      {currentPage === 'home' && (
        <HomePage
          onNavigate={setCurrentPage}
          videoCount={videos.length}
          ideaCount={ideas.length}
        />
      )}

      {currentPage === 'library' && (
        <VideoLibrary
          videos={videos}
          onDeleteVideo={handleDeleteVideo}
        />
      )}

      {currentPage === 'upload' && (
        <VideoUpload onUpload={handleUploadVideo} />
      )}

      {currentPage === 'ideas' && (
        <VideoIdeas
          ideas={ideas}
          onAddIdea={handleAddIdea}
          onUpdateIdea={handleUpdateIdea}
          onDeleteIdea={handleDeleteIdea}
        />
      )}
    </div>
  );
}

export default App;
