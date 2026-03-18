🍽️ PREP — Smart Meal Planner

PREP is a full-stack MERN meal planner web application that helps users organize weekly meals, explore recipes, and automatically 
generate grocery lists based on selected meals.The platform simplifies meal planning by combining recipe browsing, weekly planning, 
and grocery management into a single interface.

Live Application: https://prep-app-neon.vercel.app

📸 Screenshots:
<p align="center">
  <img src="./screenshots/home.png" width="45%" />
  <img src="./screenshots/planner.png" width="45%" />
</p>

<p align="center">
  <img src="./screenshots/recipes.png" width="45%" />
  <img src="./screenshots/grocery.png" width="45%" />
</p>

✨ Features
Browse and explore recipes
Plan meals for the entire week
Automatically generate grocery lists based on selected meals
Secure user authentication using JWT
Email integration for notifications
Privacy consent popup for cookies and local storage
Responsive modern UI with dark theme

🧰 Tech Stack
Frontend
React
React Router
CSS

Backend
Node.js
Express.js

Database
MongoDB
MongoDB Atlas

Authentication
JWT (JSON Web Tokens)

Email Service
Resend API

Deployment
Frontend hosted on Vercel
Backend hosted on Render
Database hosted on MongoDB Atlas

🏗️ Architecture Overview
The application follows a MERN stack architecture:

React Frontend
      │
      ▼
REST APIs (Node + Express)
      │
      ▼
MongoDB Database

Frontend handles UI rendering and routing while the backend provides APIs for authentication, recipes, planners, and grocery lists.

📂 Project Structure
prep
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   └── styles
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   └── middleware
│
└── README.md
⚙️ Getting Started

Clone the repository: git clone https://github.com/yourusername/prep.git

📦 Install Dependencies
Frontend
cd frontend
npm install

Backend
cd backend
npm install

🔑 Environment Variables
Create .env inside backend
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RESEND_API_KEY=your_resend_api_key
CLIENT_URL=http://localhost:5173

Frontend .env
VITE_API_URL=http://localhost:5000

▶️ Run the Application

Start backend
cd backend
npm run dev

Start frontend
cd frontend
npm run dev

Open: http://localhost:5173

🚀 Future Improvements
Nutritional analysis for recipes
Drag and drop weekly planner
Grocery list export (PDF)
Social login (Google / GitHub)
Recipe recommendations

👩‍💻 Author
Chaithra Hegde
MERN Stack Developer

GitHub: https://github.com/yourusername

Portfolio: https://chai0405.github.io/portfolio/

📜 License
This project is created for learning and portfolio purposes.
