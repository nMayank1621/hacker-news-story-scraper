import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <Link to="/" className="text-2xl font-extrabold tracking-tight hover:text-yellow-300 transition-all duration-300 transform hover:scale-105">
          🚀 Hacker News Scraper
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="font-medium hover:text-yellow-300 transition-all duration-300 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          {user ? (
            <>
              <Link to="/bookmarks" className="font-medium hover:text-yellow-300 transition-all duration-300 relative group">
                Bookmarks
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-medium hover:text-yellow-300 transition-all duration-300 relative group">
                Login
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
