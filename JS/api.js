//when document will be ready we would have access to getMovies() by pressing Enter on keyboard
$(document).ready(function () {
    $('.form').on('submit', function (e) {

        //variable searchText have text value from <input> with "search" as a class
        let searchText = $('.search').val();

        //getMovies() is start working at that point with var searchText setted as parameter
        getMovies(searchText);
        e.preventDefault();
    });
});


//here we have function getMovies() which have 1 required parameter (searchText)
function getMovies(searchText) {

    //with help of the Axios we get film that have searched keyword from <input class="search">
    axios.get('http://www.omdbapi.com/?s=' + searchText + '&apikey=817e1a94')
        .then((response) => {

            //here we get movies which accords to our .search value
            let movies = response.data.Search;

            //here we create empty variable output
            let output = '';

            //for each movie in movies we make an HTML structure (you can see it right under)
            $.each(movies, function (index, movie) {

                //structure itself
                output += `
            <div class="film-container">
                <div class="film-container-body">
                    <img src="${movie.Poster}" class="film-poster">
                    <div class="film-info">

                        <div class="short-info">
                            <h3>${movie.Title}</h3>
                            <p>${movie.Year}</p>
                        </div>
                        
                        <!--here we have button and its "onclick" summons a function movieSelected(id) and "id" parameter of this function is "imdbID" of "movie" object-->
                        <a onclick="movieSelected('${movie.imdbID}')" class="film-button" href="#">
                            Дивитись
                        </a>
                    </div>
                </div>
            </div>
            `;
            });

            //here we append an output to HTML element .film-list as a HTML structure, not as such a text
            $('.film-list').html(output);
        })
        // .catch() helps us to catch the errors and if would be errors the .catch() will say it
        .catch((err) => {
            console.log(err);
        });
}


//here we have function movieSelected() which have 1 required parameter (id)
function movieSelected(id) {

    // as a new item we set a key "movieID" with value "id" to sessionStorage
    sessionStorage.setItem('movieID', id);

    // window.location opens a new window
    window.location = 'film.html';
    return false;
}

function getMovie() {

    // variable right under gets "movieID" from sessionStorage so movieId = 'movieId' now
    let movieID = sessionStorage.getItem('movieID');

    //with help of the Axios we get film that we clicked on and new window opens with full description of that film
    axios.get('http://www.omdbapi.com/?i=' + movieID + '&apikey=817e1a94')
        .then((response) => {

            //movie is an object with values
            let movie = response.data;

            //another output but that one will go to the "film.html", not to the "index.html"
            let output = `
            <div class="film">
                <div class="film-body">
                    <div class="poster-container">
                        <img src="${movie.Poster}" class="film-poster">
                    </div>
                    <div class="film-description">
                        <div class="film-info">
                            <h3>${movie.Title}</h3>
                            <ul class="info-list">
                                <li class="list-item"><strong>Жанр: </strong>${movie.Genre}</li>
                                <li class="list-item"><strong>Актори: </strong>${movie.Actors}</li>
                                <li class="list-item"><strong>Режисер: </strong>${movie.Director}</li>
                                <li class="list-item"><strong>Сценарист: </strong>${movie.Writer}</li>
                                <li class="list-item"><strong>Сюжет: </strong>${movie.Plot}</li>
                            </ul>
                        </div>
                        <div class="button-container">

                            <!--that button will send us to IMDbs official website. To get film that we need that link requires "imdbID" of "movie" object-->
                            <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="button">Трейлер на IMDB</a>

                            <!--that button will return us to the start page-->
                            <a href="index.html" class="button">На головну сторінку</a>
                        </div>
                    </div>
                </div>
            </div>
            
            `;

            //here we append an output to HTML element .film-list as a HTML structure, not as such a text
            $('.film-list').html(output);
        })

        // .catch() helps us to catch the errors and if would be errors the .catch() will say it
        .catch((err) => {
            console.log(err);
        });
}
