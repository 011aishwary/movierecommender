# 🎬 Movie Recommender System

Welcome to the **Movie Recommender System**, a sleek and intelligent application designed to help you discover your next favorite film. Whether you're a cinephile or just looking for something to watch on a Friday night, our AI-powered engine has you covered.

![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.x-3776ab?style=for-the-badge&logo=python&logoColor=white)

---

## 🌟 Overview

This project is a hybrid web application that combines a modern, responsive frontend with a powerful machine learning backend. It uses **Content-Based Filtering** to analyze movie metadata (like genres, keywords, cast, and crew) and recommend films similar to the one you love.

When you search for a movie (e.g., *"Inception"*), the system:
1.  **Finds** the movie in our extensive database.
2.  **Calculates** similarity scores against thousands of other films.
3.  **Returns** the top 5 closest matches.
4.  **Fetches** their official posters dynamically from OMDb.

---

## ✨ Key Features

*   **Smart Search**: Type any movie name, and the auto-suggestion feature will help you find the exact title.
*   **AI-Powered Recommendations**: Utilizes a pre-trained cosine similarity matrix to deliver highly accurate suggestions.
*   **Dynamic Visuals**: Automatically fetches and displays high-quality movie posters for every recommendation.
*   **Premium UI/UX**: Built with a "dark mode" aesthetic, featuring glassmorphism, smooth animations (Framer Motion), and responsive design.
*   **Interactive Elements**: Hover effects, floating particles, and fluid transitions make the experience engaging.

---

## 🛠️ Tech Stack

### Frontend
*   **Next.js 15 (App Router)**: The React framework for production, handling routing, API endpoints, and server-side rendering.
*   **React 19**: The latest version of the library for building user interfaces.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
*   **Framer Motion**: For complex, fluid animations and gestures.
*   **Lucide React**: Beautiful, consistent icons.

### Backend & Machine Learning
*   **Python**: Handles the core recommendation logic.
*   **Pandas**: For efficient data manipulation.
*   **Joblib**: For loading the pre-trained machine learning models (`.pkl` files).
*   **Next.js API Routes**: Acts as a bridge, executing Python scripts via `python-shell` to serve recommendations to the frontend.
*   **OMDb API**: External service used to fetch real-time movie posters.

---

## 📂 Project Structure

Here's a quick look at how the code is organized:

```bash
movierecommender/
├── lib/               # Utility scripts
├── ml/                # Machine learning development scripts
├── model/             # Pre-trained ML models (The "Brain")
│   ├── movie_df.pkl   # Database of movies
│   └── similarity.pkl # Similarity matrix
├── public/            # Static assets
├── pyth/              # Python scripts for production
│   └── predict.py     # Main script called by the API
├── src/
│   └── app/
│       ├── api/       # API Routes (Backend logic)
│       │   ├── poster/   # Fetches movie posters
│       │   └── predict/  # Runs the recommendation engine
│       ├── components/   # Reusable UI components (Search, Loader, etc.)
│       └── predict/      # The main recommendation page
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
*   **Node.js** (v18 or higher)
*   **Python** (3.8 or higher) installed and added to your PATH.
*   **npm** or **yarn**

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/movierecommender.git
    cd movierecommender
    ```

2.  **Install Frontend Dependencies**:
    ```bash
    npm install
    ```

3.  **Install Python Dependencies**:
    Ensure you have the required Python libraries installed:
    ```bash
    pip install pandas joblib
    ```

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```

5.  **Open in Browser**:
    Navigate to `http://localhost:3000` to see the app in action!

---

## 💡 How It Works

1.  **Data Loading**: The app loads a pre-processed dataset of metadata for thousands of movies.
2.  **Vectorization**: (Pre-step) Text data (tags, genres, overview) is converted into vectors using techniques like *CountVectorizer*.
3.  **Similarity Calculation**: We use **CMS (Cosine Similarity)** to measure the angle between these vectors. A smaller angle means higher similarity.
4.  **Inference**: When you request a movie, the Python script (`predict.py`) looks up the movie's vector and finds the 5 nearest neighbors in the multi-dimensional space.

---



---

Made with ❤️ by [Aishwary](https://github.com/011aishwary)
