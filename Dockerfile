# 1. Start with a Python base image (the "OS" for your app)
FROM python:3.9-slim

# 2. Set the working directory inside the container
WORKDIR /code

# 3. Copy the requirements file first (this makes builds faster)
COPY ./requirements.txt /code/requirements.txt

# 4. Install the Python libraries
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 5. Copy your Python script and your 170MB model into the container
COPY . .

# 6. Set the command to run your FastAPI app
# Note: Hugging Face specifically looks for port 7860
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]