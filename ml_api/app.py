import pickle
import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS
from urllib.parse import unquote

# ================= LOAD DATA =================

with open("movie_dict.pkl", "rb") as f:
    movies_dict = pickle.load(f)

movies = pd.DataFrame(movies_dict)
movies["title"] = movies["title"].astype(str).str.strip().str.lower()

with open("similarity.pkl", "rb") as f:
    similarity = pickle.load(f)

with open("popular.pkl", "rb") as f:
    popular_movies = pickle.load(f)

popular_movies = pd.DataFrame(popular_movies)
popular_movies["id"] = popular_movies["id"].astype(str)

# ================= FLASK APP =================

app = Flask(__name__)
CORS(app)

@app.route("/")
def health():
    return jsonify({"status": "Flask ML API running"})

# IMPORTANT: path converter to handle spaces & special chars
@app.route("/home/<path:movie>")
def recommend(movie):
    movie = unquote(movie).strip().lower()

    movie_row = movies[movies["title"] == movie]

    if movie_row.empty:
        suggestions = (
            movies[movies["title"].str.contains(movie[:3], na=False)]
            ["title"]
            .tolist()[:5]
        )
        return jsonify({
            "error": "Movie not found",
            "suggestions": suggestions
        }), 404

    index = movie_row.index[0]

    distances = sorted(
        list(enumerate(similarity[index])),
        reverse=True,
        key=lambda x: x[1]
    )

    recommended_movies = [
        movies.iloc[i[0]].title for i in distances[1:6]
    ]

    id_list = [
        str(movies.iloc[i[0]].id) for i in distances[1:6]
    ]

    return jsonify({
        "recommended_movies": recommended_movies,
        "id_list": id_list
    })

@app.route("/popular")
def popular():
    return jsonify({
        "popular_movies": popular_movies["title"].tolist()[:20],
        "popular_ids": popular_movies["id"].tolist()[:20]
    })

# ================= ENTRY POINT =================

if __name__ == "__main__":
    # Required for Render / production
    app.run(host="0.0.0.0", port=5001)
