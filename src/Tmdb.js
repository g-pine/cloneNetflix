const API_KEY = '0e291d8a192595762f61916d9bbcb1b8';
const API_BASE = 'https://api.themoviedb.org/3';

/*
original de netflix
recomendados
alta(mejor ranking)
comedia
terror
romance
documentales
*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug:'originals',
                title: 'Original de netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=en&api_key=${API_KEY}`)
            },
            {
                slug:'trending',
                title: 'Recomendados para ti',
                items: await basicFetch(`/trending/all/week?lenguage=en&api_key=${API_KEY}`)
            },
            {
                slug:'topranking',
                title: 'Recomendados por la comunidad',
                items: await basicFetch(`/movie/top_rated?lenguage=en&api_key=${API_KEY}`)
            },
            {
                slug:'action',
                title: 'Action',
                items: await basicFetch(`/discover/movie?with_genres=28&lenguage=en&api_key=${API_KEY}`)
            },
            {
                slug:'Comedia',
                title: 'Comedia',
                items: await basicFetch(`/discover/movie?with_genres=35&lenguage=en&api_key=${API_KEY}`)
            },
            {
                slug:'Terror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&lenguage=en&api_key=${API_KEY}`)
            },
            {
                slug:'Romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&lenguage=en&api_key=${API_KEY}`)
            },
            {
                slug:'Documentales',
                title: 'Documentales',
                items: await basicFetch(`/discover/movie?with_genres=99&lenguage=en&api_key=${API_KEY}`)
            },
        ];
    },
    getMovieInfo: async(movieId, type) => {
        let info = {};

        if(movieId){
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?lenguage=en&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?lenguage=en&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break;
            }
        }
    return info;
    }
}