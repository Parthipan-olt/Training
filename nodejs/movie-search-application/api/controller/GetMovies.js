const service = require('../services/service')

const loadIndex = (req, res) => {
    res.render('index');
}
const movieData = async (req, res) => {
    const searchQuery = req.params.id;
    const page = req.params.page;
    console.log(searchQuery);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=b31738b39a9616ae7b1e0f4528fb1985&query=${searchQuery}&page=${page}`;

    service.getApi(url, (error, data) => {
        if (error) {
            res.status(500).json({
                error: 'An error occurred'
            });
        } else {
            res.json(data);
        }
    });
}



const searchGenre = async (req, res) => {
    const page = req.params.page;
    const genre = req.params.id;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=b31738b39a9616ae7b1e0f4528fb1985&with_genres=${genre}&page=${page}`

    service.getApi(url, (error, data) => {
        if (error) {
            res.status(500).json({
                error: 'An error occurred'
            });
        } else {
            res.json(data);
        }
    });
}
const redirectToDetails = async (req, res) => {
    const movieId = req.params.id;
    res.redirect('www.google.com')
    const url = `https://api.themoviedb.org/3/movie/${movieId}?&api_key=b31738b39a9616ae7b1e0f4528fb1985`
    service.getApi(url, (error, data) => {
        if (error) {
            res.status(500).json({
                error: 'An error occurred'
            });
        } else {
            res.json(data);
        }
    });
}

module.exports = {
    loadIndex,
    movieData,
    searchGenre,
    redirectToDetails
};