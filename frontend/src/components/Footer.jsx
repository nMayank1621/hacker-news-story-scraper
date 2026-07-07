const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">🚀 Hacker News Scraper</h3>
          <p className="text-blue-200 mb-6 max-w-lg mx-auto">
            A modern full-stack application for exploring and bookmarking Hacker News stories
          </p>
          <div className="border-t border-blue-700 pt-6">
            <p className="text-blue-300">
              © {new Date().getFullYear()} Hacker News Scraper. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
