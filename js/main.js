Vue.config.devtools = true;

var root = new Vue({
    el: '#root',
    data: {
        searchMovieInput: '',
        api_key: 'eed15619f0e837e25c551edaf248397f',
        movies: [],
        baseURL: 'https://image.tmdb.org/t/p/w500',
        genres: [],
        release_date_movies: [],
        moviesgenre: [],
        arr: [],
        searchForm: 0,
        singleItem: 0,
        listMovies: 0,
        selectFilmTv: 1,
        filmTv: '',
        currentMovie: [{
            title: '',
        }],

    },
    mounted() {

    },
    computed: {},
    methods: {
        genrelist: function() {
            axios.get('https://api.themoviedb.org/3/genre/' + this.filmTv + '/list', {
                    params: {
                        api_key: this.api_key,
                        language: 'it',
                    }
                })
                .then((genreResponse) => {

                    root.genres = genreResponse.data.genres;
                    root.genres.forEach(element => {

                        axios.get('https://api.themoviedb.org/3/discover/' + this.filmTv, {
                                params: {
                                    api_key: this.api_key,
                                    with_genres: element.id,
                                    language: 'it',
                                    region: 'it',
                                }
                            })
                            .then((movieResponse) => {
                                root.moviesgenre.push({
                                    genrename: element.name,
                                    genreID: element.id,
                                    movies: movieResponse.data.results,
                                });
                            })
                    })



                })
        },
        voteStar: function(vote) {

            var fullStar = "<i class=\"fas fa-star\"></i>";
            var emptyStar = "<i class=\"far fa-star\"></i>";
            var newVote = Math.round(vote / 2);
            var starsVote = "";
            for (var i = 0; i < newVote; i++) {
                starsVote += fullStar;
            }
            for (var i = 0; i < (5 - newVote); i++) {
                starsVote += emptyStar;
            }
            return starsVote;

        },
        searchMovie: function() {
            if (this.searchMovieInput) {
                this.searchForm = 1;
                this.singleItem = 0;
                this.listMovies = 0;
                axios.get('https://api.themoviedb.org/3/search/' + this.filmTv, {
                        params: {
                            api_key: root.api_key,
                            query: root.searchMovieInput,
                            language: 'it'
                        }
                    })
                    .then((movieResponse) => {
                        root.movies = movieResponse.data.results;
                        0


                    })
            } else {
                this.searchForm = 0;
                this.singleItem = 0;
                this.listMovies = 1;
            }
        },
        selectMovie: function(movie) {

            this.currentMovie = movie;
            this.searchForm = 0;
            this.singleItem = 1;
            this.listMovies = 0;
        },
        selectGenre: function() {
            console.log("movie");
        },
        resetPage: function() {
            this.searchForm = 0;
            this.singleItem = 0;
            this.listMovies = 1;
        },
        selectGenreMovie: function(select) {
            this.filmTv = select;
            this.genrelist();
            this.selectFilmTv = 0;
            this.searchForm = 0;
            this.singleItem = 0;
            this.listMovies = 1;
        }
    }

});