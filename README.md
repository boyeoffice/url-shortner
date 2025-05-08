# 🔗 ShortLink - URL Shortener

ShortLink is a URL shortening service that allows users to convert long URLs into short, easy-to-share links. Built with a Node.js (TypeScript) backend and a React (TypeScript) frontend.

---

## 🚀 Features

- 🔐 Create short URLs for any valid long URL.
- 🔁 Redirect from short URLs to original URLs.
- 📄 View a list of all created URLs.
- 🔍 Search for long URLs by keywords (3+ characters).
- 📊 See statistics like creation date and number of visits.
- 🧪 Full API with tests using Jest and Supertest.

---

## 🧰 Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Styling**: CSS (No framework)
- **Testing**: Jest + Supertest
- **Deployment**: Docker + Docker Compose
- **In-Memory Storage** (No external DB)

---

## 📦 Project Structure

.
├── backend/
│ ├── src/
│ ├── tests/
│ └── Dockerfile
├── frontend/
│ ├── src/
│ ├── public/
│ └── Dockerfile
├── docker-compose.yml
├── README.md


---

## 💻 Local Development

### 1. Clone the Repository


```bash
# Start backend
cd backend
npm install
npm run dev

Server will run at http://localhost:6000

# In another terminal, start frontend
cd frontend
npm install
npm run dev

App will open at http://localhost:5173

````

🧪 Running Tests
````bash
cd backend
npm run test         # Run all tests
npm run test:coverage  # Run tests with coverage report
````

🐳 Run in Production (Docker)
````bash
docker-compose up --build
````

Frontend: http://localhost:6200

Backend API: http://localhost:4000/api

📫 API Endpoints

| Method | Endpoint                   | Description                          |
| ------ | -------------------------- | ------------------------------------ |
| POST   | `/api/encode`              | Create a short URL                   |
| POST   | `/api/decode`              | Get original URL from short URL      |
| GET    | `/api/statistic/:url_path` | Get stats for a given short URL path |
| GET    | `/api/list`                | List all URLs                        |
| GET    | `/:url_path`               | Redirect to the original long URL    |
