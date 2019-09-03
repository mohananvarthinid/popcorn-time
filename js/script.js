let movies = [];
let currPage = 0;

var API_KEY = 'b617b7c4';

onload = (window, event) => {
    var input = document.querySelector('.search-form');
    var search = document.querySelector('input')
    var button = document.querySelector('button');
    button.addEventListener('click', function (e) {
        e.preventDefault();
        if (input.classList.contains('active')) {
            if (search.value.length > 0)
                fetchMovie();
            else
                input.classList.toggle('active');
        } else {
            input.classList.toggle('active');
        }
    })
    search.addEventListener('focus', function () {
        input.classList.add('focus');
    })

    search.addEventListener('blur', function () {
        search.value.length != 0 ? input.classList.add('focus') : input.classList.remove('focus');
        if (search.value.length <= 0) input.classList.toggle('active');
    });
}

fetchMovie = () => {
    movies = [];
    currPage = 0;
    currPage++;
    fetchMovieByPage(currPage);
}

fetchMovieByPage = page => {
    let resultStat = document.getElementById("result-stats");
    let movieTitle = document.getElementById("search-input[movie]").value;
    movieTitle = movieTitle.trim().replace(' ', "+");
    resultStat.innerHTML = `<p>Showing results for "<b>${movieTitle}</b>"</p>`;
    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieTitle}&page=${page}`;
    fetch(url).then(res => res.json()).then(res => handleMovieList(res)).catch(err => fetchError(err['Error']));
}



handleMovieList = res => {
    if (res['Response'] == "True") {
        let resultContainer = document.getElementById("result-container");
        let getMoreEl = document.getElementById("getMore");
        let searchResults = res['Search'];


        if (searchResults && searchResults.length > 0) {
            searchResults.forEach(result => {
                movies.push(Movie.fromJson(result));
            });
        }

        if(movies.length < res['totalResults']) {
            getMoreEl.style.display = 'block';
            getMoreEl.innerHTML = `Load more`;
        } else {
            getMoreEl.style.display = 'none';
        }

        let gridItems = [];
        movies.forEach(movie => {
            let poster = movie.poster == "N/A" ? "https://via.placeholder.com/121x179" :movie.poster;
            gridItems.push(
                `<a class="grid-item" href="show.html?imdb-id=${movie.imdbID}">
                    <div class="card">
                        <img src="${poster}"
                            width="100%" />
                        <div class="card-footer">
                            <div><b>${movie.title}</b></div>
                            <span>
                                <span>${movie.year}</span>
                            </span>
                        </div>
                    </div>
                </a>`
            );
        });

        resultContainer.innerHTML = gridItems.join("");
    } else {
        fetchError(res['Error']);
    }
}

fetchError = message => {
    let getMoreEl = document.getElementById("getMore");
    let errContainer = document.getElementById("error-container");
    let resultContainer = document.getElementById("result-container");

    resultContainer.innerHTML =
        `
        <div></div>
        <div style="margin: auto">${message}</div>
        <div></div>
    `;
    errContainer.innerHTML = '';
    html = `<div class="notification">
        <div class="content">
            <div class="text">${message}</div>
        </div>
    </div>`;

    errContainer.style.display = 'block';
    errContainer.innerHTML = html;
    setTimeout(() => {
        errContainer.style.display = 'none';
    }, 4000);

    getMoreEl.style.display = 'none';
}

getMore = () => {
    fetchMovieByPage(currPage++);
}

navigateToShowPage = id => {
    window.location.href = `show.html?id=${id}`;
}
