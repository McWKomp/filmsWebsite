$(document).ready(function () {
    $('.form').on('submit', function (e) {
        let searchText = $('.search').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    // console.log(searchText);
    axios.get('http://www.omdbapi.com/?s=' + searchText + '&apikey=817e1a94')
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, function (index, movie) {
                console.log(movie)
                output += `
            <div class="film-container">
                <div class="film-container-body">
                    <img src="${movie.Poster}" class="film-poster">
                    <div class="film-info">

                        <div class="short-info">
                            <h3>${movie.Title}</h3>
                            <p>${movie.Year}</p>
                        </div>
                        
                        <a onclick="movieSelected('${movie.imdbID}')" class="film-button" href="#">
                            Дивитись
                        </a>
                    </div>
                </div>
            </div>
            `;
            });

            $('.film-list').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieID', id);
    window.location = 'film.html';
    return false;
}

function getMovie() {
    let movieID = sessionStorage.getItem('movieID');

    axios.get('http://www.omdbapi.com/?i=' + movieID + '&apikey=817e1a94')
        .then((response) => {
            console.log(response);
            let movie = response.data;
            // console.log(movie.imdbID);
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
                            <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="button">Трейлер на IMDB</a>
                            <a href="index.html" class="button">На головну сторінку</a>
                        </div>
                    </div>
                </div>
            </div>
            
            `;
            $('.film-list').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}
