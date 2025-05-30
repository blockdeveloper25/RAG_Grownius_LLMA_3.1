import os
import json
import requests
from flask import Flask, request, jsonify
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow all origins

# Embedding model and vector store setup
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vector_store = Chroma(persist_directory="./grownius_vDb", embedding_function=embedding_model)

def retrieve_context(query, top_k=3):
    """Retrieve relevant knowledge from ChromaDB."""
    results = vector_store.similarity_search(query, k=top_k)
    return "\n\n".join([doc.page_content for doc in results]) if results else "No relevant information found."

def call_llama_ollama(prompt):
    """Call Ollama's local LLaMA API to generate a response."""
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3.1:8b",  # Use the exact Ollama model name
            "prompt": prompt,
            "stream": False
        }
    )
    if response.status_code == 200:
        return response.json()["response"]
    else:
        raise Exception(f"Ollama API Error: {response.text}")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_query = data.get("prompt")
    
    if not user_query:
        return jsonify({"error": "User query is required!"}), 400
    
    # Retrieve knowledge context
    context = retrieve_context(user_query)
    
    # Compose prompt with context for LLaMA
    modified_prompt = f"""
You are an agriculture expert and AI assistant. Provide accurate and relevant information only.

User Query:
{user_query}

### Retrieved Knowledge:
{context}
"""
    
    try:
        ai_response = call_llama_ollama(modified_prompt)
        return jsonify({"rag_response": ai_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5002)
