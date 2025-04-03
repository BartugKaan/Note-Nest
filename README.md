# NoteNest
NoteNest is a full-stack note-taking web application where users can register, log in, and securely manage their personal notes. It is built with modern web technologies including React, Node.js, Express, PostgreSQL, and Prisma.

## 🚀 Live Demo
Frontend: https://note-nest-bay.vercel.app <br/>
Backend API: https://notenest-api-e3v5.onrender.com

## ✨ Features
* User registration and login with JWT authentication
* Secure note creation, reading, updating, and deletion (CRUD)
* Each user can only access their own notes
* Responsive, modern UI built with Tailwind CSS
* Deployed for free using Render (Backend) and Vercel (Frontend)

## 🛠️ Tech Stack
### Frontend:
* React (with TypeScript)
* Tailwind CSS
* Axios
### Backend:
* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT for authentication
### DevOps / Deployment:
* Vercel (Frontend Hosting)
* Render (Backend & PostgreSQL Hosting)
* Environment Variables for secure config

## 📷 Screenshots
<i>Coming Soon<i/>

## ⚙️ Getting Started
1. Clone the repository
```
git clone https://github.com/your-username/NoteNest.git 
cd NoteNest
```
2. Set up Environment Variables
Create .env files in both /backend and /frontend directories:
* backend/.env
```
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
PORT=5005
```
* frontend/.env
```
VITE_API_URL=http://localhost:5005
```
3. Install dependencies and run locally
* Backend
```
cd backend
npm install
npx prisma migrate dev
npm run dev
```
* Frontend
```
cd frontend
npm install
npm run dev
```
Then open http://localhost:5173 to use the app locally.

## 🧩 Folder Structure
```
NoteNest/
├── backend/        # Express + Prisma backend
├── frontend/       # React + Tailwind frontend
└── README.md
```
