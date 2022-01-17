const mongoose = require('mongoose');

const MoviesSchema = mongoose.Schema({
    img: String,
    title: String,
    actor: String,
    description: String
});

const MoviesModel = mongoose.model("movies",MoviesSchema);

module.exports = MoviesModel;