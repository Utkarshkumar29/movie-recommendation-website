import threading
import time
import pickle
import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS
from urllib.parse import unquote, quote
import streamlit as st
import requests

# ================= STREAMLIT CONFIG (MUST BE FIRST) =================
st.set_page_config(page_title="Movie Recommender", layout="centered")

# ================= LOAD DATA =================
movies_dict = pickle.load(open("movie_dict.pkl", "rb"))
movies = pd.DataFrame(movies_dict)
movies["title"] = movies["title"].astype(str)

similarity = pickle.load(open("similarity.pkl", "rb"))

popular_movies = pickle.load(open("popular.pkl", "rb"))
popular_movies = pd.DataFrame(popular_movies)
popular_movies["id"] = popular_movies["id"].astype(str)

# ================= FLASK APP =================
app = Flask(__name__)
CORS(app)

@app.route("/")
def health():
    return jsonify({"status": "Flask API running"})

# IMPORTANT: path converter
@app.route("/home/<path:movie>")
def recommend(movie):
    movie = unquote(movie).strip().lower()
    movies["title"] = movies["title"].str.strip().str.lower()

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
        "popular_movies": popular_movies["title"].tolist()[:10],
        "popular_ids": popular_movies["id"].tolist()[:10]
    })

def run_flask():
    app.run(host="127.0.0.1", port=5001, debug=False, use_reloader=False)

# ================= START FLASK ONLY ONCE =================
if "flask_started" not in st.session_state:
    threading.Thread(target=run_flask, daemon=True).start()
    time.sleep(1)
    st.session_state.flask_started = True

# ================= STREAMLIT UI =================
st.title("🎬 Movie Recommender System")

selected_movie = st.selectbox(
    "Choose a movie:",
    sorted(movies["title"].unique())
)

if st.button("Get Recommendations"):
    safe_movie = quote(selected_movie)
    url = f"http://127.0.0.1:5001/home/{safe_movie}"

    try:
        response = requests.get(url, timeout=5)

        if response.headers.get("Content-Type", "").startswith("application/json"):
            data = response.json()

            if response.status_code == 200:
                st.subheader("Recommended Movies")
                for title in data["recommended_movies"]:
                    st.write(f"• {title}")
            else:
                st.error("Movie not found")
                if "suggestions" in data:
                    st.info("Did you mean?")
                    for s in data["suggestions"]:
                        st.write(f"• {s}")
        else:
            st.error("Flask returned invalid response")
            st.code(response.text)

    except Exception as e:
        st.error(f"API Error: {e}")

if st.button("Show Popular Movies"):
    try:
        response = requests.get("http://127.0.0.1:5001/popular", timeout=5)
        data = response.json()
        st.subheader("Popular Movies")
        for title in data["popular_movies"]:
            st.write(f"• {title}")
    except Exception as e:
        st.error(f"API Error: {e}")
