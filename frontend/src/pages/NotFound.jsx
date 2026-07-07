import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center animate-fadeIn">
        <div className="text-9xl mb-6">🚀</div>
        <h1 className="text-8xl font-extrabold bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-4xl font-bold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-500 mb-10 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 inline-block"
        >
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
