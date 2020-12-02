var root = new Vue({
    el: '#root',
    data: {
        searchMovieInput: '',
        api_key: 'eed15619f0e837e25c551edaf248397f',
        movies: [],
        baseURL:'https://image.tmdb.org/t/p/w500',

    },
    created() {
        

    },
    methods: {
        searchMovie:function(){
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: root.api_key,
                    query: root.searchMovieInput
                }
            })
            .then((movieResponse)=>{
                root.movies = movieResponse.data.results;
            
            })
            }
    }

});