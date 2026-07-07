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
      const res = await api.get('/stories/bookmarks');
      setBookmarks(res.data);
    } catch (err) {
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
    setBookmarks((prev) => prev.filter((s) => s._id !== storyId));
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
      <h1 className="text-3xl font-bold mb-8">My Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <div className="text-center text-gray-500">No bookmarks yet</div>
      ) : (
        bookmarks.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            isBookmarked={true}
            onToggleBookmark={toggleBookmark}
          />
        ))
      )}
    </div>
  );
};

export default Bookmarks;
