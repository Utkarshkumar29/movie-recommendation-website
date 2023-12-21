import streamlit as st
import pickle
import pandas as pd
from flask import Flask,jsonify,make_response
from flask_cors import CORS

movies_dict=pickle.load(open('movie_dict.pkl','rb'))
movies=pd.DataFrame(movies_dict)

similarity=pickle.load(open('similarity.pkl','rb'))

selected_movie_names=st.selectbox('Movie??',(movies['title'].values))

app=Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!!!!!'

@app.route('/home/<movie>')  
def home(movie):  
    index = movies[movies['title'] == movie].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended_movie = []
    id_list = []
    for i in distances[1:6]:
        recommended_movie.append(movies.iloc[i[0]].title)
        id_list.append(str(movies.iloc[i[0]].id)) # convert id to string
    
    response_data = {
        'recommended_movies': recommended_movie,
        'recommended_ids': id_list
    }
    response = make_response(jsonify(response_data))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Movie Recommendation Based on Popularity Method

popular_movies=pickle.load(open('popular.pkl','rb'))
popular_movies=pd.DataFrame(popular_movies)
popular_movies['id'] = popular_movies['id'].astype(str) # convert id column to string data type

@app.route('/popular')
def popular():
    list=[]
    list_ids=[]
    for i in range(0,10):
        list.append(popular_movies['title'][i])
        list_ids.append(str(popular_movies.iloc[i].id))
    
    popular_data = {
        'popular_movies': list,
        'popular_ids': list_ids
    }
    response = make_response(jsonify(popular_data))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    
if __name__=="__main__":
    app.run(debug=True)
