import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { storage } from './utils/storage';
import LoginPage from './components/LoginPage';
import HamburgerMenu from './components/HamburgerMenu';
import HomePage from './components/HomePage';
import VideoLibrary from './components/VideoLibrary';
import VideoUpload from './components/VideoUpload';
import VideoIdeas from './components/VideoIdeas';
import SparklingBackground from './components/SparklingBackground';
import { Video, VideoIdea } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    <Router basename={import.meta.env.BASE_URL}>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <SparklingBackground />
        <HamburgerMenu onLogout={handleLogout} />

        <Routes>
          <Route path="/home" element={<HomePage videoCount={videos.length} ideaCount={ideas.length} />} />
          <Route path="/videos" element={<VideoLibrary videos={videos} onDeleteVideo={handleDeleteVideo} />} />
          <Route path="/upload" element={<VideoUpload onUpload={handleUploadVideo} />} />
          <Route path="/ideas" element={
            <VideoIdeas
              ideas={ideas}
              onAddIdea={handleAddIdea}
              onUpdateIdea={handleUpdateIdea}
              onDeleteIdea={handleDeleteIdea}
            />
          } />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
