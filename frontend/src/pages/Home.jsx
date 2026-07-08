import { useState, useEffect } from 'react';
import api from '../services/api';
import StoryCard from '../components/StoryCard';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const fetchStories = async (pageNum) => {
    try {
      setLoading(true);
      const res = await api.get(`/stories?page=${pageNum}&limit=10`);
      setStories(res.data.stories);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError('Failed to fetch stories');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    if (!user) return;
    try {
      const res = await api.get('/stories/bookmarks');
      console.log('fetchBookmarks response:', res.data); // Debug log
      const ids = res.data.map((s) => s._id.toString());
      console.log('bookmarkedIds set to:', ids); // Debug log
      setBookmarkedIds(ids);
    } catch (err) {
      console.error('Failed to fetch bookmarks:', err.response || err); // Debug log
    }
  };

  useEffect(() => {
    fetchStories(page);
  }, [page]);

  useEffect(() => {
    fetchBookmarks();
  }, [user]);

  const toggleBookmark = (storyId) => {
    console.log('toggleBookmark called with id:', storyId); // Debug log
    setBookmarkedIds((prev) => {
      const idStr = storyId.toString();
      console.log('Current bookmarkedIds:', prev); // Debug log
      if (prev.includes(idStr)) {
        return prev.filter((id) => id !== idStr);
      } else {
        return [...prev, idStr];
      }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh]">
        <div className="w-20 h-20 border-8 border-blue-20 border-t-blue-600 rounded-full animate-spin mb-6"></div>
        <div className="text-3xl font-bold text-gray-700">Loading stories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh]">
        <div className="text-8xl mb-6">😢</div>
        <div className="text-3xl font-bold text-red-600 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-4">
            📰 Top Hacker News Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and bookmark the latest tech news and discussions
          </p>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📭</div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4">No stories found</h2>
            <p className="text-gray-500">Check back later for fresh content!</p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {stories.map((story, index) => (
                <div
                  key={story._id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <StoryCard
                    story={story}
                    isBookmarked={bookmarkedIds.includes(story._id.toString())}
                    onToggleBookmark={toggleBookmark}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-6 mt-12">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                ← Previous
              </button>
              <span className="text-xl font-semibold text-gray-700 bg-white px-6 py-3 rounded-xl shadow-md">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
