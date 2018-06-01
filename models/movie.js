var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
    Title: String,
    Year: String,
    imdbID: String,
    Poster: String
});

module.exports = mongoose.model("Movie", movieSchema);