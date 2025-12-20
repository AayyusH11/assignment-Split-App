Split App – Expense Sharing Application

An application that helps users split group expenses, track balances, and settle dues.
This is a Splitwise-like expense splitting application designed to manage shared expenses within groups. Users can create groups, add expenses using different split methods (equal, exact, or percentage), and automatically track who owes whom. The system maintains clear payable and receivable balances for each user and supports both partial and full settlements. All financial calculations and validations are handled on the backend to ensure accuracy and data integrity, while the frontend provides a simple and intuitive interface for managing expenses and settlements in real time.

## 🚀 Live Demo

Frontend: https://split-app-ayu-qsa0.onrender.com

Backend API: https://split-app-as.onrender.com


## ✨ Features

- User authentication (register & login)
- Create and manage groups
- Add expenses and split costs among group members
- Track who owes whom in real time
- View payables and receivables dashboard
- Settle balances partially or fully
- Responsive UI for desktop and mobile

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Axios
- CSS 

**Backend**
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)


**Deployment**
- Render (Backend + Frontend)
- GitHub for version control

## 📁Project Structure

```text
Split-App-Project/
│
├── backend/
│   ├── src/
│   │   ├── config/          # DB config, env setup
│   │   ├── controllers/     # Request/response handling (API logic)
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express routes
│   │   ├── services/        # Business logic (splits, settlement, etc.)
│   │   │
│   │   ├── app.js           # Express app setup (middlewares, routes)
│   │   └── server.js        # Server start (listen, DB connect)
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/           # Page-level components (Dashboard, Login)
│   │   ├── services/        # API calls (axios, fetch)
│   │   │
│   │   ├── App.jsx          # Root React component
│   │   ├── main.jsx         # React DOM entry point
│   │   ├── App.css
│   │   └── index.css
│   │
│   └── package.json
│   
│
└── README.md
```
## 🔐 Environment Variables

### Backend
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend
```
VITE_API_URL=https://split-app-as.onrender.com
```

## 🧪 Run Locally

### 1. Clone the repository

### 2. Start backend
```
cd backend
npm install
npm run dev
```

### 3. Start frontend
```
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## 🔌 API Endpoints (Sample)

```
- POST /users/register – Register user
- POST /users/login – Login user
- POST /groups – Create group
- POST /expenses – Add expense
- GET /dashboard/:userId – User dashboard
```
## 🧠 Design Decisions

- All financial calculations and validations are handled on the backend to avoid inconsistencies.
- Floating-point values are normalized to prevent rounding errors.
- Balances are updated incrementally to support partial settlements.
- Frontend focuses only on presentation and user interaction.

## 🚧 Future Improvements

- Expense editing and deletion
- Expense history and analytics
- Notifications for pending dues





