# Hacker News Story Scraper

A full-stack MERN application that scrapes and displays top Hacker News stories with user authentication and bookmarking features.

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React.js, Vite, Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Scraping**: Axios, Cheerio
- **Other**: React Router, React Toastify

## Folder Structure

```
hacker-news-scraper/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Auth logic
│   │   └── storyController.js # Story & bookmark logic
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Story.js           # Story schema
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   └── storyRoutes.js     # Story endpoints
│   ├── scraper/
│   │   └── scraper.js         # Hacker News scraper
│   ├── server.js              # Express server
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── StoryCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Bookmarks.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── .env.example
└── README.md
```

## Installation

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB URI and JWT secret

5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens

### Frontend (.env)
- `VITE_API_URL`: Backend API URL (default http://localhost:5000/api)

## API Documentation

### Auth Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Story Endpoints
- `GET /api/stories` - Get all stories (with pagination)
- `GET /api/stories/:id` - Get story by ID
- `POST /api/stories/:id/bookmark` - Toggle bookmark (protected)
- `GET /api/stories/bookmarks` - Get user's bookmarks (protected)
- `POST /api/scrape` - Scrape Hacker News

## Features

- ✅ Scrape top 10 Hacker News stories
- ✅ User registration & authentication (JWT)
- ✅ Bookmark stories
- ✅ Pagination
- ✅ Responsive design
- ✅ Toast notifications

## Deployment

### Backend Deployment (e.g., Vercel, Render)
1. Set environment variables
2. Deploy backend
3. Update frontend's `VITE_API_URL`

### Frontend Deployment (e.g., Vercel, Netlify)
1. Build frontend: `npm run build`
2. Deploy the `dist` folder

## License

MIT
