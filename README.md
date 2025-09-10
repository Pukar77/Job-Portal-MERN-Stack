ApplyRush is a MERN stack job portal that simplifies the job-seeking process by providing personalized job recommendations, career guidance, and easy online applications. With smart recommendations through CV analysis using TF-IDF and cosine similarity algorithm. ApplyRush helps users land their dream job faster.

Features

Job Recommendations – Smart matching of jobs based on TF-IDF and cosine similarity.

CV Analysis – Upload CVs to get skill-based job suggestions.

Career Advice Chatbot – Get instant career guidance using Gemini API.

Applicant Status Tracking – Get notified about your application status via Nodemailer.

User Authentication – Secure login & signup with JWT-based authentication.

🛠️ Tech Stack

Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Algorithms: TF-IDF, Cosine Similarity
AI Integration: Gemini API (Career Advice)

⚙️ Installation & Setup (For installation of this project in your devices)

Clone the Repository

git clone https://github.com/yourusername/applyrush.git
cd applyrush


Install Dependencies  (see dependencies from package.json)

For Backend

cd server
npm install


For Frontend

cd client
npm install


Environment Variables
Create a .env file in the server folder with:

MONGO_URI = your_mongodb_connection_url

PORT = port_number

SECRET_KEY = your_secrete_key

CLOUD_NAME = your_cloude_name

API_KEY = your_api_key

API_SECRET = your_api_secrete_key

API_KEY1 = your_api_keys

SMTP_HOST=smtp_host

SMTP_PORT=587

SMTP_USER=emailid_from_where_mail_is_sent

SMTP_PASS=app_password_from_google

Run the Project

Backend:

cd server
npm run dev


Frontend:

cd client
npm start


📊 Algorithms Used

TF-IDF + Cosine Similarity → Finds the best job matches based on text similarity between CV skills and job descriptions.


🔮 Future Enhancements

AI-powered interview preparation module

Resume auto-improvement suggestions

Multi-language support for wider accessibility

🤝 Contributing

Contributions are welcome!

Fork the repo

Create a new branch

Commit changes

Open a pull request



👨‍💻 Author

Pukar Rimal

[pukarrimal11@gmail.com]

[https://www.linkedin.com/in/pukar-rimal/]


