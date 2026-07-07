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
      setBookmarkedIds(res.data.map((s) => s._id));
    } catch (err) {
      console.error('Failed to fetch bookmarks');
    }
  };

  useEffect(() => {
    fetchStories(page);
  }, [page]);

  useEffect(() => {
    fetchBookmarks();
  }, [user]);

  const toggleBookmark = (storyId) => {
    setBookmarkedIds((prev) =>
      prev.includes(storyId)
        ? prev.filter((id) => id !== storyId)
        : [...prev, storyId]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Top Stories</h1>
      {stories.length === 0 ? (
        <div className="text-center text-gray-500">No stories found</div>
      ) : (
        <>
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              isBookmarked={bookmarkedIds.includes(story._id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
          <div className="flex justify-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="flex items-center">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
