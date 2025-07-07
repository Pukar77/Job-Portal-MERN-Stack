from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
import fitz  # PyMuPDF
import re

app = Flask(__name__)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/job-portal")
db = client.get_default_database();           
jobs_collection = db["jobs"]                

# Clean text function
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)  # Replace punctuation with space
    text = re.sub(r'\s+', ' ', text)      # Replace multiple spaces with single space
    return text.strip()

# Extract text from uploaded PDF
def extract_text_from_pdf(pdf_file):
    doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

@app.route('/recommend', methods=['POST'])
def recommend():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']

    if not file.filename.endswith('.pdf'):
        return jsonify({"error": "Only PDF files are supported"}), 400

    # Extract and clean user CV text
    user_text = extract_text_from_pdf(file)
    print("Extracted raw text:", repr(user_text[:300]))

    user_text = clean_text(user_text)
    print("Cleaned user text:", user_text[:300])

    if len(user_text) < 10:
        return jsonify({"error": "Extracted text from PDF is too short or empty"}), 400

    # Fetch jobs from MongoDB
    jobs = list(jobs_collection.find({}, {"_id": 1, "title": 1, "description": 1}))

    # ✅ Log each job to confirm
    print("\n📋 Fetched jobs from MongoDB:")
    for job in jobs:
        print("ID:", job["_id"], "| Title:", job.get("title"), "| Description:", job.get("description"))

    if not jobs:
        return jsonify({"error": "No jobs found in database"}), 404

    job_descriptions = [clean_text(job["description"]) for job in jobs]
    job_ids = [str(job["_id"]) for job in jobs]  # Convert ObjectId to string

    # TF-IDF and cosine similarity
    vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
    vectors = vectorizer.fit_transform([user_text] + job_descriptions)

    cosine_sim = cosine_similarity(vectors[0:1], vectors[1:]).flatten()
    print("Cosine similarity scores:", cosine_sim)

    # Sort by similarity
    top_indices = cosine_sim.argsort()[::-1]
    results = [{"job_id": job_ids[i], "score": float(cosine_sim[i])} for i in top_indices]

    return jsonify(results)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
