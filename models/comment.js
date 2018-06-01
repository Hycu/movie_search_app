var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie"
        },
    text: String
});

module.exports = mongoose.model("Comment", commentSchema);