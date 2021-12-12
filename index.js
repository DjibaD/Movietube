const API_KEY = 'a5035759f1fe71a6fd596a87600d36d2';
const apiURL = 'https://api.themoviedb.org/3/search/movie?api_key=88449d803a568a37169bac400f61bdee'
const imgPath = 'https://image.tmdb.org/t/p/w1280'
const popularURL = "https://api.themoviedb.org/3/movie/popular?api_key=a5035759f1fe71a6fd596a87600d36d2"
const upcomingURL = "https://api.themoviedb.org/3/movie/upcoming?api_key=a5035759f1fe71a6fd596a87600d36d2"
const genreURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=a5035759f1fe71a6fd596a87600d36d2"

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

// When header is clicked, go back one page 

header.addEventListener('click', () => window.history.go(-1))

// search by genre 
genreBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    searchedMovie.innerHTML = `Showing results for: ${inputValue.value}`;
    
    fetch(genreURL)
    .then(res=> res.json())
    .then(genres =>{
        genreResults.innerHTML = " ";
        genres.genres.forEach(genre => {
        // Check if input is a valid genre 
        if(inputValue.value === genre.name){
            fetch(popularURL)
            .then(res =>res.json())
            .then(movies =>{
                genreResults.innerHTML = " ";
                movies.results.forEach(movie => {
                    // For each movie check if the genre_ids array include the searched genre id
                    const genreMatch = movie.genre_ids.includes(genre.id);
                    // If match found(true), create elements and add to the genre-results div
                    if(genreMatch){
                        console.log(movie.title)
                        const movieResult = document.createElement('div')
                        const movieImage = document.createElement('img')
                        const movieTitle = document.createElement('span')
                        const likeBtn = document.createElement('button')
                        movieResult.classList.add('each-movie');
                        // If no poster, don't assign/display the movie 
                        if(movie.poster_path !== null){
                            movieTitle.innerText = movie.title;
                            movieTitle.classList.add('title');
                            movieImage.src = imgPath + movie.poster_path;
                            likeBtn.textContent = "♡";
                            movieResult.append(movieImage, movieTitle, likeBtn);
                            genreResults.append(movieResult);
                        }
                        // Add functionality to the like button
                        likeBtn.addEventListener('click', () =>{
                            likeBtn.textContent = "♥️";
                            likedMovies.style.dispaly = "inline-block";
                        })
                    }     
                })
            })
        }     
        }); 
    })
        // Once the genreBtn is clicked, hide the other movie divs
        popularMovies.style.dispaly = 'none';
        upcomingMovies.style.display = 'none';
        likedMovies.style.display = 'none';  
    })

        // Search and display results
        searchBtn.addEventListener('click', (e) =>{
            e.preventDefault()

            searchedMovie.textContent = `Showing results for: ${inputValue.value}`;

            if(inputValue.value === ""){
                alert("Please enter a movie title");
            } else{
                const newURL = `${apiURL}&query=${inputValue.value}`

                fetch(newURL)
                .then(res =>res.json())
                .then(movies => {
                    searchResults.innerHTML = " ";
                    movies.results.forEach(movie => {
                        console.log(movies);
                        showMovies(movie);
                    })
                    // Clear the input box after search button is clicked
                    form.reset();
                })
                    // Hide popular and upcoming movies when search movie is shown
                    popularMovies.style.dispaly = "none";
                    upcomingMovies.style.display = "none";
                    likedMovies.style.display = "none";
            }
        })

        // show results of searched movie
        function showMovies(movie){

            const movieResult = document.createElement('div')
            const movieImage = document.createElement('img')
            const movieTitle = document.createElement('span')
            const likeBtn = document.createElement('button')
            movieResult.classList.add('each-movie');
            // if no poster, do not assign/display the movie
            if(movie.poster_path !== null){
                movieTitle.innerText = movie.title;
                movieTitle.classList.add('title');
                movieImage.src = imgPath + movie.poster_path;
                likeBtn.textContent = "♡";

                movieResult.append(movieImage, movieTitle, likeBtn);
                searchResults.appendChild(movieResult);
            }
            // On click calls showDetails function
            movieImage.addEventListener('click', () => showDetails(movie))
            likeBtn.addEventListener('click', () => {
                likeBtn.textContent = "♥️";
                likedMovies.style.display = "inline-block";
                showLikedMovies(movie)
            })
        }
        // On click display the details
        function showDetails(movie){

            displayTitle.textContent = movie.title;
            displayImage.src = imgPath + movie.poster_path;
            overView.textContent = movie.overview;
            releaseDate.textContent = 'Rlease Date: ' + movie.release_date;
            votes.textContent = 'Rating: ' + movie.vote_average + '/10';
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none'
            })
            modal.style.display = 'block';
        }