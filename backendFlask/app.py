from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model # type: ignore
import re
import numpy as np
import pickle

# Initialize Flask app
app = Flask(__name__)

# Load the pre-trained ANN model (in .keras format)
model = load_model("mental_health_ann_model.keras")

# Load the TF-IDF vectorizer (saved during training)
with open("tfidf_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

# Define custom stopwords (same as used during training)
custom_stopwords = set([
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours",
    "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself",
    "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this",
    "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have",
    "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if",
    "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against",
    "between", "into", "through", "during", "before", "after", "above", "below", "to", "from",
    "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once"
])

# Function to preprocess text (same as used during training)
def preprocess_text(text):
    text = text.lower()  # Convert to lowercase
    text = re.sub(r'\\W+', ' ', text)  # Remove special characters & punctuation
    words = text.split()  # Tokenization
    words = [word for word in words if word not in custom_stopwords]  # Remove stopwords
    return " ".join(words)

# Define the API endpoint
@app.route("/predict", methods=["POST"])
def predict():
    # Get the input text from the request
    data = request.json
    user_text = data.get("text", "")

    # Preprocess the text
    clean_text = preprocess_text(user_text)

    # Convert text to TF-IDF vector
    text_tfidf = vectorizer.transform([clean_text]).toarray()

    # Make prediction using the ANN model
    prediction = model.predict(text_tfidf)[0]  # Extract first row (1D array)

    # Define class labels
    class_labels = ["Stress", "Depression", "Bipolar Disorder", "Personality Disorder", "Anxiety"]

    # Create confidence scores dictionary
    confidence_scores = {class_labels[i]: round(float(prediction[i]), 4) for i in range(len(class_labels))}

    # Get the predicted class and corresponding label
    predicted_class_idx = int(np.argmax(prediction))  # Index of highest confidence score
    predicted_label = class_labels[predicted_class_idx]  # Get class name

    # Return the formatted response as JSON
    return jsonify({
        "input_text": user_text,
        "confidence_scores": confidence_scores,
        "predicted_label": predicted_label
    })

# Run the Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)
