var API_KEY = 'b617b7c4';

onload = (window, event) => {
    getMovieDetails();
}

getMovieDetails = () => {
    id = window.location.search.split('imdb-id=')[1];
    fetchMovie(id);
}

fetchMovie = id => {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
    .then(res => res.json())
    .then(handleFetch)
    .catch(err => handleError(err['Error']));
}

handleFetch = res => {
    if(res['Response'] == "True") {
        let sMovie = ShowMovie.fromJson(res);
        console.log(sMovie);
        let resultContainer = document.getElementById('result-container-show');
        resultContainer.innerHTML = `
        <div class="wrapper bg-white">
            <div id="left-container" class="left">
                <h2>${sMovie.title}</h2>
                <span>${sMovie.rated} | <b>IMDB: </b> ${sMovie.imdbRating}</span>

                <div class="mt-5"></div>
                <div id="genre-container">
                    ${sMovie.genre}
                </div>

                <div class="mt-5">
                    <h3 style="display: inline">Language: </h3>${sMovie.language}
                    <br />
                    <br />
                    <h3>Plot</h3>
                    <p>${sMovie.plot}</p>
                    <br />
                    <h3>Directors</h3>
                    <p>${sMovie.directors}</p>
                    <br />
                    <h3>Cast</h3>
                    <p>${sMovie.casts}</p>
                    <br />
                    <h3>Writers</h3>
                    <p>${sMovie.writers}</p>
                </div>
            </div>
        </div>
        <div class="right">
                <img class="movie-poster"
                    src="${sMovie.poster}" />
                <div style="margin-top: 1.2rem">
                    <p><b>Run time: </b>${sMovie.runTime}</p>
                    <p><b>Released on: </b>${sMovie.releasedAt}</p>
                    <span><strong>Box Office: </strong>${sMovie.boxOffice}</span>
                </div>
        </div>
        `;
    } else {
        handleError(res['Error']);
    }
}

handleError = message => {
    let errContainer = document.getElementById("error-container");
    let resultContainer = document.getElementById("result-container-show");

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
}

