const axios = require('axios');

function getApi(url, callback) {
    console.log(url)
    axios.get(url)
        .then(response => {
            callback(null, response.data);
        })
        .catch(error => {
            console.error('An error occurred:', error);
            callback(error, null);
        });
}

module.exports = {
    getApi
};