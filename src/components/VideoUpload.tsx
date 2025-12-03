import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import Footer from './Footer';

interface VideoUploadProps {
  onUpload: (videoData: {
    title: string;
    description: string;
    date: string;
    videoUrl: string;
  }) => void;
}

export default function VideoUpload({ onUpload }: VideoUploadProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!date) {
      newErrors.date = 'Date is required';
    }
    if (!videoFile) {
      newErrors.video = 'Video file is required';
    } else {
      const maxSize = 500 * 1024 * 1024;
      if (videoFile.size > maxSize) {
        newErrors.video = 'Video file size must be less than 500MB';
      }
      const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
      if (!validTypes.includes(videoFile.type)) {
        newErrors.video = 'Please upload a valid video file (MP4, WebM, OGG, MOV)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (videoFile) {
      const videoUrl = URL.createObjectURL(videoFile);
      onUpload({
        title: title.trim(),
        description: description.trim(),
        date,
        videoUrl,
      });

      setTitle('');
      setDescription('');
      setDate('');
      setVideoFile(null);
      setErrors({});
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate('/videos');
      }, 2000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setErrors({ ...errors, video: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 pb-20 relative z-10 page-transition">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8" style={{ animation: 'slideIn 0.6s ease-out' }}>
          <h1 className="text-4xl font-bold text-white mb-4">Upload Video</h1>
          <p className="text-gray-300">Add a new video to your collection</p>
        </div>

        {success && (
          <div className="mb-6 bg-green-600/20 border-2 border-green-500 rounded-lg p-4 flex items-center space-x-3 animate-pulse">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-300 font-medium">Video uploaded successfully! Redirecting...</p>
          </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-700" style={{ animation: 'slideIn 0.6s ease-out 0.1s both' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors({ ...errors, title: '' });
                }}
                placeholder="Enter video title"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors bg-gray-700/50 text-white placeholder-gray-500 ${
                  errors.title
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-gray-600 focus:border-blue-500'
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.title}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors({ ...errors, description: '' });
                }}
                placeholder="Enter video description"
                rows={4}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors resize-none bg-gray-700/50 text-white placeholder-gray-500 ${
                  errors.description
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-gray-600 focus:border-blue-500'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.description}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setErrors({ ...errors, date: '' });
                }}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors bg-gray-700/50 text-white ${
                  errors.date
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-gray-600 focus:border-blue-500'
                }`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.date}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Video File <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className={`flex items-center justify-center space-x-3 w-full px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                    errors.video
                      ? 'border-red-500 hover:border-red-400 bg-red-600/10'
                      : 'border-gray-600 hover:border-blue-500 bg-gray-700/30 hover:bg-gray-700/50'
                  }`}
                >
                  <Upload className={`w-6 h-6 ${errors.video ? 'text-red-400' : 'text-gray-400'}`} />
                  <div className="text-center">
                    <p className="text-white font-medium">
                      {videoFile ? videoFile.name : 'Click to upload video file'}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">MP4, WebM, OGG, MOV (max 500MB)</p>
                  </div>
                </label>
              </div>
              {errors.video && (
                <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.video}</span>
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setTitle('');
                  setDescription('');
                  setDate('');
                  setVideoFile(null);
                  setErrors({});
                }}
                className="px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-700/50 transition-colors"
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-200"
              >
                Upload Video
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
