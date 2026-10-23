
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "success",
        "application": "HealthMate AI",
        "message": "Backend is running!",
        "version": "1.0.0"
    })

@app.route("/api/meals", methods=["GET"])
def meals():
    return jsonify({
        "meals": [
            {
                "time": "8:00 AM",
                "name": "Breakfast",
                "food": "Poha, milk, and a seasonal fruit"
            },
            {
                "time": "1:00 PM",
                "name": "Lunch",
                "food": "Roti, dal, sabzi, and curd"
            },
            {
                "time": "7:30 PM",
                "name": "Dinner",
                "food": "Vegetable khichdi and curd"
            }
        ],
        "notice": "Sample suggestions only. Individual nutrition needs vary."
    })

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
