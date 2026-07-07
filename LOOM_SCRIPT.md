# Loom Video Walkthrough Script - Hacker News Story Scraper

## Duration: ~7 minutes

---

## 1. Introduction (0:00 - 0:30)
"Hi there! In this video, I'll be walking you through my Hacker News Story Scraper, a full-stack MERN application that scrapes top stories from Hacker News and lets users save their favorite stories as bookmarks."

## 2. Architecture Overview (0:30 - 1:30)
"Let's start with the architecture. This app uses a MERN stack: MongoDB for data storage, Express for the backend API, React for the frontend, and Node.js as the runtime.

The backend is structured with a clean MVC pattern, having separate folders for routes, models, controllers, middleware, and the scraper. The frontend is built with React and Vite, using Tailwind CSS for styling and React Context API for authentication state management."

## 3. Backend Deep Dive (1:30 - 3:30)
"First, let's look at the backend:

- **Server Setup**: The Express server initializes with dotenv for environment variables and connects to MongoDB. If MongoDB isn't available, it uses an in-memory store as a fallback.
- **Scraper**: The scraper uses Axios and Cheerio to fetch and parse Hacker News. It extracts the top 10 stories, gets their title, URL, points, author, and posted time, and saves them to the database. It runs automatically on server start and can also be triggered via a POST request to /api/scrape.
- **Authentication**: We use JWT (JSON Web Tokens) for auth. There are endpoints for registering and logging in users, with bcrypt for password hashing.
- **Story Endpoints**: These include getting all stories sorted by points, getting a single story, and toggling bookmarks. Bookmark endpoints are protected with JWT middleware."

## 4. Frontend Deep Dive (3:30 - 5:30)
"Now let's move to the frontend:

- **Home Page**: Displays a list of story cards with all the scraped information, a link to the full article, and a bookmark button if the user is logged in. Includes pagination.
- **Auth Pages**: Login and Register pages that use the backend API and manage the auth state with React Context.
- **Bookmarks Page**: Protected route that only logged-in users can access. Shows all stories the user has bookmarked, and lets them remove bookmarks.
- **Navbar**: Includes links to home, bookmarks (if logged in), login/register, and logout."

## 5. Demo (5:30 - 6:30)
"Let's see the app in action!

First, the backend server starts and automatically scrapes Hacker News. Then the frontend loads, and we can see the top stories. I'll register an account, log in, bookmark a story, and view the bookmarks page. Then I'll remove a bookmark and show that it's gone from the bookmarks list."

## 6. Challenges & Improvements (6:30 - 7:00)
"Some challenges I faced: Making sure the scraper correctly parsed Hacker News's HTML, handling MongoDB connection failures gracefully, and managing authentication state across React components.

For future improvements, I'd add search and filter options, dark mode, infinite scroll instead of pagination, and user profile pages."

## 7. Outro (7:00)
"Thanks for watching! I hope you found this walkthrough helpful."
