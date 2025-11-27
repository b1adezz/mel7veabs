import { useState } from 'react';
import { VideoIdea } from '../types';
import { Plus, X, Edit2, Trash2, Lightbulb } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-teal-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Video Ideas</h1>
            <p className="text-gray-600">Capture and organize your creative inspirations</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Add Idea</span>
          </button>
        </div>

        {ideas.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
            <Lightbulb className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">No video ideas yet. Start by adding your first one!</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Idea</span>
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white rounded-xl shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(idea)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
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
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete idea"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{idea.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{idea.description}</p>
                </div>

                <div className="text-xs text-gray-500 pt-2 border-t">
                  Added {new Date(idea.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingId ? 'Edit Idea' : 'New Video Idea'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter idea title"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-400 focus:outline-none transition-colors"
                    autoFocus
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your video idea"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-400 focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    {editingId ? 'Update' : 'Add'} Idea
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
