class ShowMovie {
    constructor(title, rated, language, poster, imdbRating, plot, directors, casts, writers, runTime, releasedAt, boxOffice, production, genre = []) {
        this.title = title;
        this.rated = rated;
        this.language = language;
        this.poster = poster;
        this.imdbRating = imdbRating;
        this.plot = plot;
        this.directors = directors;
        this.casts = casts;
        this.writers = writers;
        this.runTime = runTime;
        this.releasedAt = releasedAt;
        this.boxOffice = boxOffice;
        this.production = production;
        this.genre = genre;
    }

 

    static fromJson(res) {
        console.log(res['Title'],
            res['Rated'],
            res['Language'],
            res['Poster'],
            res['imdbRating'],
            res['Plot'],
            res['Director'],
            res['Actors'],
            res['Writer'],
            res['Runtime'],
            res['Released'],
            res['BoxOffice'],
            res['Production'],
            res['Genre'].split(","),
        );
        return new ShowMovie(
            res['Title'],
            res['Rated'],
            res['Language'],
            res['Poster'],
            res['imdbRating'],
            res['Plot'],
            res['Director'],
            res['Actors'],
            res['Writer'],
            res['Runtime'],
            res['Released'],
            res['BoxOffice'],
            res['Production'],
            res['Genre'].split(","),
        );
    }

    splitGenre(genres) {
        return genres.split(",");
    }
}