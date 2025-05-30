from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


state = {
    "prediction": None,
    "features": None,
    "query": None
}
# Load the model
try:
    model = joblib.load("crop_recommendation_model.pkl")
    print("✅ Model Loaded Successfully!")
except Exception as e:
    print("❌ Error loading model:", str(e))


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        features_array = [
            float(data.get("nitrogen", 0)),
            float(data.get("phosphorus", 0)),
            float(data.get("potassium", 0)),
            float(data.get("temperature", 0)),
            float(data.get("humidity", 0)),
            float(data.get("pH_Level", 0)),
            float(data.get("rainfall", 0))
        ]

        features = np.array(features_array).reshape(1, -1)
        prediction = model.predict(features).tolist()

        state["prediction"] = prediction
        state["features"] = features_array

        return jsonify({"message": "Prediction stored", "prediction": prediction})
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/userQuery", methods=["POST"])
def userQuery():
    try:
        data = request.json
        query = data.get("text", "")

        state["query"] = query

        n, p, k, temperature, humidity, ph, rainfall = state["features"]

        formatted_inputs = f"N: {n}, P: {p}, K: {k}, Temperature: {temperature}, Humidity: {humidity}, PH: {ph}, Rainfall: {rainfall}"

        prompt = f"Retrieve precise agricultural recommendations from the vector database based on the user inputs: {formatted_inputs}. The response should be strictly aligned with the predicted model output: {state['prediction']} and should also address the user's additional query: {state['query']}. The answer must be clear, well-structured, and formatted for readability. Provide insights on the best irrigation practices suitable for the crop, considering soil type, climate, and water requirements. Include secondary crop recommendations that improve soil health and productivity. Specify the appropriate fertilizers, their dosage, and application frequency for optimal growth. Offer detailed care and maintenance tips, including pest control methods, pruning techniques, and disease prevention strategies. Additionally, provide any other relevant agronomic insights that enhance crop yield and sustainability. Ensure that all information is sourced strictly from the vector database and avoid generating answers beyond retrieved data."

        return jsonify({ "prompt": prompt })
    except Exception as e:
        return jsonify({ "error": str(e) })

    
      

if __name__ == "__main__":
    app.run(debug=True,port=5001)