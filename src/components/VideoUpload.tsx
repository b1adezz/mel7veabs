import { useState } from 'react';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';

interface VideoUploadProps {
  onUpload: (videoData: {
    title: string;
    description: string;
    date: string;
    videoUrl: string;
  }) => void;
}

export default function VideoUpload({ onUpload }: VideoUploadProps) {
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

      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setErrors({ ...errors, video: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-teal-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Upload Video</h1>
          <p className="text-gray-600">Add a new video to your collection</p>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-green-700 font-medium">Video uploaded successfully!</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors({ ...errors, title: '' });
                }}
                placeholder="Enter video title"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                  errors.title
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:border-rose-400'
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.title}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors({ ...errors, description: '' });
                }}
                placeholder="Enter video description"
                rows={4}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors resize-none ${
                  errors.description
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:border-rose-400'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.description}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setErrors({ ...errors, date: '' });
                }}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                  errors.date
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:border-rose-400'
                }`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.date}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Video File <span className="text-red-500">*</span>
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
                      ? 'border-red-300 hover:border-red-400 bg-red-50'
                      : 'border-gray-300 hover:border-rose-400 bg-gray-50 hover:bg-rose-50'
                  }`}
                >
                  <Upload className={`w-6 h-6 ${errors.video ? 'text-red-500' : 'text-gray-400'}`} />
                  <div className="text-center">
                    <p className="text-gray-700 font-medium">
                      {videoFile ? videoFile.name : 'Click to upload video file'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">MP4, WebM, OGG, MOV (max 500MB)</p>
                  </div>
                </label>
              </div>
              {errors.video && (
                <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
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
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-rose-400 to-teal-400 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Upload Video
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
