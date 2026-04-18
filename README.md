# Streamify - Language Exchange Platform

A full-stack web application where people from around the world can connect, practice languages together through real-time chat and video calls, and practice with an AI language partner.

Live Demo: [Add your link after deployment]

---

## Features

- JWT Authentication with secure signup, login and protected routes
- Friend system with send and accept friend requests
- Real-time chat with typing indicators and emoji reactions
- 1-on-1 and group video calls with screen sharing and recording
- Language exchange matching based on native and learning language
- Support for Indian languages including Hindi, Bengali, Tamil, Telugu, Punjabi, Marathi, Gujarati, Kannada, Malayalam and more
- AI language practice partner for users who want to practice without talking to a real person
- 32 fully customizable UI themes
- Fully responsive design

---

## Tech Stack

**Frontend**
- React.js with Vite
- TailwindCSS and DaisyUI
- TanStack Query for data fetching
- Zustand for global state management
- Stream SDK for video and chat

**Backend**
- Node.js and Express.js
- MongoDB with Mongoose
- JWT for authentication
- Stream API for real-time features

---

## Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB Atlas account (free at mongodb.com/atlas)
- Stream account (free at getstream.io)

### 1. Clone the repository
```bash
git clone https://github.com/Komal4567/streamify.git
cd streamify
```

### 2. Backend Setup

Create a `.env` file inside the `/backend` folder:
```
PORT=5001
MONGO_URI=your_mongodb_connection_string
STEAM_API_KEY=your_stream_api_key
STEAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
```

Run the backend:
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup

Create a `.env` file inside the `/frontend` folder:
```
VITE_STREAM_API_KEY=your_stream_api_key
```

Run the frontend:
```bash
cd frontend
npm install
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## AI Language Partner

One feature I added to this project is an AI-powered language practice partner. Users who are not yet confident enough to talk to a real person can practice conversations with an AI that responds in the language they are learning, corrects grammar mistakes, and teaches new vocabulary in context.

---

## What I Learned

- Building and connecting a full MERN stack application from scratch
- Implementing real-time communication using WebSockets and Stream SDK
- JWT-based authentication and protected route handling
- Managing global state with Zustand
- Deploying a full-stack application with separate frontend and backend services

---

## Contact

Komal Singh
GitHub: https://github.com/Komal4567
