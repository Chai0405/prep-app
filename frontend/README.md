# PREP – Meal Planning & Recipe Management App

PREP is a full-stack MERN application that helps users plan meals, explore recipes, manage groceries, and stay organized with a weekly planner.

## 🚀 Live Demo

Frontend: https://prep-app-nu.vercel.app
Backend API: https://prep-backend-3mvm.onrender.com

---

## 🛠 Tech Stack

Frontend

* React
* Vite
* CSS

Backend

* Node.js
* Express.js

Database

* MongoDB Atlas
* Mongoose

Other Services

* Resend (Email service)
* JWT Authentication

Deployment

* Vercel (Frontend)
* Render (Backend)

---

## ✨ Features

* User Authentication (Signup / Login)
* Explore and view recipes
* Add recipes to weekly planner
* Auto-generate grocery list
* Blog / newsletter section
* Email subscription using Resend
* Responsive UI

---

## 📂 Project Structure

```
prep/
│
├── backend/
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
├── src/
│   ├── components
│   ├── pages
│   ├── hooks
│   └── App.jsx
│
├── public/
├── package.json
└── vite.config.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend folder.

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

RESEND_API_KEY=your_resend_api_key

MAIL_FROM=noreply@yourdomain.com

CLIENT_URL=https://prep-app-nu.vercel.app
```

---

## ▶️ Run Locally

### 1️⃣ Clone the repository

```
git clone https://github.com/yourusername/prep-app.git
```

### 2️⃣ Install dependencies

Frontend:

```
npm install
```

Backend:

```
cd backend
npm install
```

### 3️⃣ Run the app

Backend:

```
npm run dev
```

Frontend:

```
npm run dev
```

---

## 🌍 Deployment

Frontend deployed on **Vercel**.

Backend deployed on **Render**.

MongoDB database hosted on **MongoDB Atlas**.

---

## 👩‍💻 Author

Chaithra Hegde
