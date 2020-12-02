Vue.config.devtools = true


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
        searchForm : 0,


    },
    mounted() {
        this.genrelist()
    },
    methods: {
        genrelist: function () {
            axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                params: {
                    api_key: this.api_key,
                }
            })
                .then((genreResponse) => {

                    root.genres = genreResponse.data.genres;
                    root.genres.forEach(element => {

                        axios.get('https://api.themoviedb.org/3/discover/movie', {
                            params: {
                                api_key: this.api_key,
                                with_genres: element.id
                            }
                        })
                            .then((movieResponse) => {
                                root.moviesgenre.push({
                                    genrename: element.name,
                                    genreID: element.id,
                                    movies: movieResponse.data.results
                                });
                            })
                    });

                })
        },
        searchMovie: function () {
            if(this.searchMovieInput){
            this.searchForm = 1;
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: root.api_key,
                    query: root.searchMovieInput
                }
            })
                .then((movieResponse) => {
                    root.movies = movieResponse.data.results;0
                    

                })}else{
                    this.searchForm = 0;
                }
        },
    }

});