# ApplyRush

ApplyRush is a smart job portal built with a MERN-style stack plus a Python recommendation service. It supports job browsing, applications, employer management, CV-based recommendations, and a Gemini-powered career chatbot.

## Features

- User authentication with JWT-based login and signup
- Job browsing, search, filtering, and job details
- Job application flow with applicant tracking and email notifications
- Employer tools for company setup, posting jobs, and reviewing applicants
- CV-based job recommendations using TF-IDF and cosine similarity
- Career advice chatbot powered by Google Gemini

## Project Structure

```text
ApplyRush_A_Smart_job_Portal/
├── Backend/
│   ├── index.js
│   ├── controllers/
│   ├── dbconnection/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── utils/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── public/
│   └── vite.config.js
├── recommendation-engine/
│   ├── app.py
│   └── requirement.txt
├── package.json
└── README.md
```

- `Backend/` contains the Express API, authentication, database connection, upload handling, Cloudinary integration, and email/chatbot routes.
- `Frontend/` contains the React application, reusable UI components, Redux store, hooks, and client-side routing.
- `recommendation-engine/` contains the Flask service that analyzes uploaded CVs and returns ranked job recommendations.

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, Tailwind CSS, Radix UI
- Backend: Node.js, Express, MongoDB, Mongoose
- Recommendation service: Python, Flask, PyMuPDF, MongoDB
- Integrations: Cloudinary, Nodemailer, Google Gemini

## Prerequisites

- Node.js 18+ and npm
- Python 3.10+ for the recommendation engine
- MongoDB connection string
- Cloudinary account credentials
- Gmail SMTP credentials or another SMTP provider
- Google Gemini API key

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Pukar77/ApplyRush_A_Smart_job_Portal.git
cd ApplyRush_A_Smart_job_Portal
```

### 2. Configure the backend

Install backend dependencies:

```bash
cd Backend
npm install
```

Create a Backend/.env file with the required variables:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
API_KEY1=your_gemini_api_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email_address
SMTP_PASS=your_app_password
```

### 3. Configure the frontend

Install frontend dependencies:

```bash
cd ../Frontend
npm install
```

The frontend is configured to call the backend at http://localhost:8000 through the constants in Frontend/utils/api.js.

### 4. Configure the recommendation engine

Install Python dependencies:

```bash
cd ../recommendation-engine
pip install -r requirement.txt
```

The recommendation service reads from the MongoDB database job-portal on mongodb://localhost:27017/ and runs on port 5000.

## Running the project

Run each service in a separate terminal:

```bash
# Backend
cd Backend
npm start
```

```bash
# Frontend
cd Frontend
npm run dev
```

```bash
# Recommendation engine
cd recommendation-engine
python app.py
```

## Default Local Ports

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Recommendation engine: http://localhost:5000

## API Overview

- /api/v1/user
- /api/v1/company
- /api/v1/job
- /api/v1/application
- /api/genai
- /recommend for the Python recommendation service

## Notes

- The backend serves uploaded files from /uploads.
- The frontend uses Redux Persist for session state.
- The recommendation engine expects PDF CV uploads.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Open a pull request

## Author

Pukar Rimal

- Email: pukarrimal11@gmail.com
- LinkedIn: https://www.linkedin.com/in/pukar-rimal/
