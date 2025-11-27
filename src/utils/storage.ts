import { Video, VideoIdea } from '../types';

const VIDEOS_KEY = 'mel_beans_videos';
const IDEAS_KEY = 'mel_beans_ideas';
const AUTH_KEY = 'mel_beans_auth';

export const storage = {
  getVideos: (): Video[] => {
    const data = localStorage.getItem(VIDEOS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveVideos: (videos: Video[]): void => {
    localStorage.setItem(VIDEOS_KEY, JSON.stringify(videos));
  },

  addVideo: (video: Video): void => {
    const videos = storage.getVideos();
    videos.unshift(video);
    storage.saveVideos(videos);
  },

  deleteVideo: (id: string): void => {
    const videos = storage.getVideos().filter(v => v.id !== id);
    storage.saveVideos(videos);
  },

  getIdeas: (): VideoIdea[] => {
    const data = localStorage.getItem(IDEAS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveIdeas: (ideas: VideoIdea[]): void => {
    localStorage.setItem(IDEAS_KEY, JSON.stringify(ideas));
  },

  addIdea: (idea: VideoIdea): void => {
    const ideas = storage.getIdeas();
    ideas.unshift(idea);
    storage.saveIdeas(ideas);
  },

  updateIdea: (id: string, updates: Partial<VideoIdea>): void => {
    const ideas = storage.getIdeas();
    const index = ideas.findIndex(i => i.id === id);
    if (index !== -1) {
      ideas[index] = { ...ideas[index], ...updates };
      storage.saveIdeas(ideas);
    }
  },

  deleteIdea: (id: string): void => {
    const ideas = storage.getIdeas().filter(i => i.id !== id);
    storage.saveIdeas(ideas);
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  },

  setAuthenticated: (value: boolean): void => {
    localStorage.setItem(AUTH_KEY, value.toString());
  },

  logout: (): void => {
    localStorage.removeItem(AUTH_KEY);
  }
};
