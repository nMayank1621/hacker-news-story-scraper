import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';

const StoryCard = ({ story, isBookmarked, onToggleBookmark }) => {
  const { user } = useAuth();

  console.log('StoryCard render:', { 
    storyId: story._id, 
    storyIdType: typeof story._id, 
    isBookmarked 
  }); // Debug log

  const handleBookmark = async () => {
    if (!user) {
      toast.error('Please login to bookmark');
      return;
    }
    try {
      await api.post(`/stories/${story._id}/bookmark`);
      onToggleBookmark(story._id);
      toast.success(isBookmarked ? 'Bookmark removed' : 'Bookmark added');
    } catch (error) {
      console.error('handleBookmark error:', error.response || error); // Debug log
      toast.error('Failed to toggle bookmark');
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 mb-6 border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2 group">
      <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">{story.title}</h2>
      <div className="flex flex-wrap gap-5 text-gray-600 mb-6">
        <span className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold">
          ⭐ {story.points} points
        </span>
        <span className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
          👤 {story.author}
        </span>
        <span className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
          ⏰ {story.postedAt}
        </span>
      </div>
      <div className="flex flex-wrap gap-4">
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
        >
          Visit Article <span>→</span>
        </a>
        {user && (
          <button
            onClick={handleBookmark}
            className={`px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 ${
              isBookmarked
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700'
                : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800'
            }`}
          >
            {isBookmarked ? (
              <>❤️ Remove Bookmark</>
            ) : (
              <>🤍 Bookmark</>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryCard;
