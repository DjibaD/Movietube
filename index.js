const API_KEY = 'a5035759f1fe71a6fd596a87600d36d2';
const apiURL = 'https://api.themoviedb.org/3/search/movie?api_key=88449d803a568a37169bac400f61bdee'
const imgPath = 'https://image.tmdb.org/t/p/w1280'
const popularURL = "https://api.themoviedb.org/3/movie/popular?api_key=88449d803a568a37169bac400f61bdee"
const upcomingURL = "https://api.themoviedb.org/3/movie/upcoming?api_key=88449d803a568a37169bac400f61bdee"
const genreURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=88449d803a568a37169bac400f61bdee"

//grab the elements and assign a variable 

const inputValue = document.querySelector('#inputValue');  
const searchBtn = document.querySelector('#searchBtn')
const genreBtn = document.querySelector("#genreBtn")
const searchResults = document.querySelector('#search-results')
const form = document.querySelector('#search-form')
const modal = document.querySelector("#modal")
const displayTitle = modal.querySelector("#detail-title")  
const displayImage = modal.querySelector(".detail-img")     
const overView = modal.querySelector("#overview")
const votes = modal.querySelector("#votes")
const trailer = modal.querySelector("trailer")
const releaseDate = modal.querySelector("#release_date")
const closeBtn = document.querySelector('#close')
const popularMovies = document.querySelector('#popular-movies')
const upcomingMovies = document.querySelector('#upcoming-movies')
const likedMovies = document.querySelector("#liked-movies");
const header = document.querySelector('h1')
const searchText = document.querySelector("#search-text")
const searchedMovie = searchText.querySelector("#form-p")
const genreResults = document.querySelector("#genre-results")



