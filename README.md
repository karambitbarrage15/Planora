# Planora

A multi-step event requirement posting platform built with **Next.js** (frontend) and **Node.js + Express + MongoDB** (backend).

## Project Structure

```
Planora/
├── backend/                  # Node.js + Express API
│   ├── config/db.js          # MongoDB connection
│   ├── models/Requirement.js # Mongoose schema
│   ├── controllers/          # Request handlers
│   ├── routes/               # API routes
│   ├── server.js             # Entry point
│   └── .env.example          # Environment template
│
├── frontend/                 # Next.js App
│   └── src/
│       ├── app/              # App Router pages
│       └── components/       # React components
│           ├── StepIndicator.js
│           ├── EventBasicsForm.js      # Step 1
│           ├── CategoryStep2Form.js    # Step 2
│           ├── CategoryStep3Form.js    # Step 3
│           ├── ReviewSubmit.js         # Step 4
│           └── SuccessScreen.js
│
└── README.md
```

## Features

- **Step 1 — Event Basics**: Event name, type, dates, location, venue, and category selection (Event Planner / Performer / Crew)
- **Step 2 — Category-Specific Details**: Dynamic fields based on category selection
- **Step 3 — Additional Specifics**: Deeper category-specific configuration
- **Step 4 — Review & Submit**: Full summary review with API submission to MongoDB

## Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Backend
```bash
cd backend
cp .env.example .env   # Edit with your MongoDB URI
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000` and the backend on `http://localhost:5000`.

## API Endpoints

| Method | Endpoint               | Description                |
|--------|------------------------|----------------------------|
| POST   | /api/requirements      | Create a new requirement   |
| GET    | /api/requirements      | Get all requirements       |
| GET    | /api/requirements/:id  | Get requirement by ID      |
| GET    | /api/health            | Health check               |
