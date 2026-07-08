import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import StoryCard from '../components/StoryCard';
import { useAuth } from '../context/AuthContext';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchBookmarks = async () => {
    try {
      console.log('=== fetchBookmarks START ===');
      const res = await api.get('/stories/bookmarks');
      console.log('Bookmarks fetch response status:', res.status);
      console.log('Bookmarks fetch response data:', res.data);
      console.log('Bookmarks fetch response data type:', typeof res.data);
      console.log('Bookmarks fetch is array?', Array.isArray(res.data));
      console.log('=== fetchBookmarks END ===');
      setBookmarks(res.data);
    } catch (err) {
      console.error('Failed to fetch bookmarks:', err.response || err);
      setError('Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBookmarks();
  }, [user, navigate]);

  const toggleBookmark = (storyId) => {
    setBookmarks((prev) => prev.filter((s) => s._id.toString() !== storyId.toString()));
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh]">
        <div className="w-20 h-20 border-8 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-6"></div>
        <div className="text-3xl font-bold text-gray-700">Loading bookmarks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh]">
        <div className="text-8xl mb-6">😢</div>
        <div className="text-3xl font-bold text-red-600 mb-4">{error}</div>
        <button
          onClick={fetchBookmarks}
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-800 to-pink-800 bg-clip-text text-transparent mb-4">
            📚 My Bookmarks
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your curated collection of favorite Hacker News stories
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
            <div className="text-9xl mb-6">📭</div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4">No bookmarks yet</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start exploring and bookmark stories that interest you!
            </p>
            <a
              href="/"
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Stories
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookmarks.map((story, index) => (
              <div
                key={story._id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <StoryCard
                  story={story}
                  isBookmarked={true}
                  onToggleBookmark={toggleBookmark}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
