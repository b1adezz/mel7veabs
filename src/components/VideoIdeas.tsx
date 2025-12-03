import { useState } from 'react';
import { VideoIdea } from '../types';
import { Plus, X, Edit2, Trash2, Lightbulb } from 'lucide-react';
import Footer from './Footer';

interface VideoIdeasProps {
  ideas: VideoIdea[];
  onAddIdea: (idea: Omit<VideoIdea, 'id' | 'createdAt'>) => void;
  onUpdateIdea: (id: string, updates: Partial<VideoIdea>) => void;
  onDeleteIdea: (id: string) => void;
}

export default function VideoIdeas({ ideas, onAddIdea, onUpdateIdea, onDeleteIdea }: VideoIdeasProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    if (editingId) {
      onUpdateIdea(editingId, {
        title: title.trim(),
        description: description.trim(),
      });
    } else {
      onAddIdea({
        title: title.trim(),
        description: description.trim(),
      });
    }

    setTitle('');
    setDescription('');
    setEditingId(null);
    setShowModal(false);
  };

  const handleEdit = (idea: VideoIdea) => {
    setEditingId(idea.id);
    setTitle(idea.title);
    setDescription(idea.description);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 pb-20 relative z-10 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 flex-col sm:flex-row gap-4" style={{ animation: 'slideIn 0.6s ease-out' }}>
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Video Ideas</h1>
            <p className="text-gray-300">Capture and organize your creative inspirations</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-200 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            <span>Add Idea</span>
          </button>
        </div>

        {ideas.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700">
            <Lightbulb className="w-16 h-16 text-purple-400 mx-auto mb-4" style={{ animation: 'float 3s ease-in-out infinite' }} />
            <p className="text-gray-300 text-lg mb-4">No video ideas yet. Start by adding your first one!</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Idea</span>
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea, idx) => (
              <div
                key={idea.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-4 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-200 border border-gray-700"
                style={{ animation: `slideIn 0.6s ease-out ${0.1 * idx}s both` }}
              >
                <div className="flex items-start justify-between">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(idea)}
                      className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                      title="Edit idea"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this idea?')) {
                          onDeleteIdea(idea.id);
                        }
                      }}
                      className="p-2 text-red-400 hover:bg-red-600/20 rounded-lg transition-colors"
                      title="Delete idea"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-white mb-2">{idea.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{idea.description}</p>
                </div>

                <div className="text-xs text-gray-500 pt-2 border-t border-gray-700">
                  Added {new Date(idea.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-gray-700" style={{ animation: 'slideIn 0.3s ease-out' }}>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  {editingId ? 'Edit Idea' : 'New Video Idea'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter idea title"
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors bg-gray-700/50 text-white placeholder-gray-500"
                    autoFocus
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your video idea"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors resize-none bg-gray-700/50 text-white placeholder-gray-500"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-700/50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-200"
                  >
                    {editingId ? 'Update' : 'Add'} Idea
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
