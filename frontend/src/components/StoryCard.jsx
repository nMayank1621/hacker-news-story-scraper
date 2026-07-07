import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';

const StoryCard = ({ story, isBookmarked, onToggleBookmark }) => {
  const { user } = useAuth();

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
      toast.error('Failed to toggle bookmark');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
      <div className="flex gap-4 text-gray-600 mb-4">
        <span>⭐ {story.points} points</span>
        <span>👤 {story.author}</span>
        <span>⏰ {story.postedAt}</span>
      </div>
      <div className="flex gap-4">
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Visit Article
        </a>
        {user && (
          <button
            onClick={handleBookmark}
            className={`px-4 py-2 rounded ${
              isBookmarked
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryCard;
