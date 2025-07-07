from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import fitz  # PyMuPDF
import re

app = Flask(__name__)

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)  # replace punctuation with space
    text = re.sub(r'\s+', ' ', text)      # replace multiple spaces with single space
    return text.strip()

def extract_text_from_pdf(pdf_file):
    doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

jobs = [
    {"_id": "1", "title": "Javascript developer", "description": "React developer with JavaScript, CSS"},
    {"_id": "2", "title": "Backend Developer", "description": "Node.js and Express with MongoDB"},
    {"_id": "3", "title": "Data Analyst", "description": "Microsoft Excel or google sheets"},
]

@app.route('/recommend', methods=['POST'])
def recommend():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']

    if not file.filename.endswith('.pdf'):
        return jsonify({"error": "Only PDF files are supported"}), 400

    # Extract text and clean
    user_text = extract_text_from_pdf(file)
    print("Extracted text (raw):", repr(user_text[:300]))  # print first 300 chars

    user_text = clean_text(user_text)
    print("Cleaned user text:", user_text[:300])

    # If user text is empty after cleaning, return error
    if len(user_text) < 10:
        return jsonify({"error": "Extracted text from PDF is too short or empty"}), 400

    job_descriptions = [clean_text(job["description"]) for job in jobs]
    job_ids = [job["_id"] for job in jobs]

    # Use TF-IDF with stop words removed, unigrams + bigrams
    vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1,2))

    # Fit and transform
    vectors = vectorizer.fit_transform([user_text] + job_descriptions)
    print("TF-IDF feature names:", vectorizer.get_feature_names_out())

    cosine_sim = cosine_similarity(vectors[0:1], vectors[1:]).flatten()
    print("Cosine similarity scores:", cosine_sim)

    # Return sorted by highest similarity
    top_indices = cosine_sim.argsort()[::-1]
    results = [{"job_id": job_ids[i], "score": float(cosine_sim[i])} for i in top_indices]

    return jsonify(results)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
