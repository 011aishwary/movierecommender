import sys
import json

# Read input from stdin
input_data = sys.stdin.read().strip()

# Prepare dummy response
response = {
    "status": "success",
    "message": "Hello from Python!",
    "your_input": input_data,
    "recommendations": [
        {"id": 1, "title": "The Avengers", "score": 0.98},
        {"id": 2, "title": "Avengers: Age of Ultron", "score": 0.95},
        {"id": 3, "title": "Avengers: Infinity War", "score": 0.97}
    ]
}

# Print response to stdout
print(json.dumps(response))

# Debug output to stderr
print("DEBUG: Python script executed successfully", file=sys.stderr)