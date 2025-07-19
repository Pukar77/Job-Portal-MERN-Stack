from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import fitz  # PyMuPDF
import math
import re
from collections import Counter
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["job-portal"]
jobs_collection = db["jobs"]

# ------------------------- Utility Functions ------------------------- #

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_text_from_pdf(file):
    doc = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def tokenize(text):
    return clean_text(text).split()

def compute_tf(tokens):
    tf = Counter(tokens)
    total = sum(tf.values())
    return {word: count / total for word, count in tf.items()}

def compute_idf(doc_tokens_list):
    N = len(doc_tokens_list)
    df = {}
    for tokens in doc_tokens_list:
        unique_tokens = set(tokens)
        for token in unique_tokens:
            df[token] = df.get(token, 0) + 1
    return {word: math.log(N / (df[word])) for word in df}

def compute_tfidf(tf, idf):
    return {word: tf[word] * idf[word] for word in tf if word in idf}

def cosine_similarity_manual(vec1, vec2):
    common_words = set(vec1.keys()) & set(vec2.keys())
    dot_product = sum(vec1[word] * vec2[word] for word in common_words)
    mag1 = math.sqrt(sum(val ** 2 for val in vec1.values()))
    mag2 = math.sqrt(sum(val ** 2 for val in vec2.values()))
    if mag1 == 0 or mag2 == 0:
        return 0.0
    return dot_product / (mag1 * mag2)

def convert_objectids(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, list):
        return [convert_objectids(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: convert_objectids(v) for k, v in obj.items()}
    return obj

# ------------------------- Main API ------------------------- #

@app.route("/recommend", methods=["POST"])
def recommend():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']

    if not file.filename.lower().endswith('.pdf'):
        return jsonify({"error": "Only PDF files are supported"}), 400

    file.stream.seek(0)
    try:
        user_text = extract_text_from_pdf(file)
    except Exception as e:
        return jsonify({"error": "Failed to extract text from PDF", "details": str(e)}), 400

    user_text = clean_text(user_text)
    if len(user_text) < 10:
        return jsonify({"error": "Extracted text from PDF is too short or empty"}), 400

    # Get all jobs
    jobs = list(jobs_collection.find({}))
    if not jobs:
        return jsonify({"error": "No jobs found in database"}), 404

    # Tokenize resume and job descriptions
    user_tokens = tokenize(user_text)
    job_tokens_list = [tokenize(job.get("description", "")) for job in jobs]

    # TF and IDF
    all_docs_tokens = [user_tokens] + job_tokens_list
    idf = compute_idf(all_docs_tokens)

    user_tf = compute_tf(user_tokens)
    user_tfidf = compute_tfidf(user_tf, idf)

    results = []
    for i, tokens in enumerate(job_tokens_list):
        job_tf = compute_tf(tokens)
        job_tfidf = compute_tfidf(job_tf, idf)
        sim = cosine_similarity_manual(user_tfidf, job_tfidf)
        job = convert_objectids(jobs[i])
        job["similarity_score"] = round(sim, 4)
        results.append(job)

    # Sort results by similarity
    results.sort(key=lambda x: x["similarity_score"], reverse=True)

    return jsonify(results)

# ------------------------- Run App ------------------------- #

if __name__ == "__main__":
    app.run(debug=True, port=5000, use_reloader=False)
