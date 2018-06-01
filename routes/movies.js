var Movie   = require("../models/movie.js"),
    express = require("express"),
    request = require("request"),
    router  = express.Router();

router.get("/", function(req, res){
    Movie.find({}, function(err, movies){
        if(err){
            res.render("./movies/new", {error: "Error during searching the db."});
        } else {
            res.send(movies);
        }
    });
});

router.get("/new", function(req, res){
    res.render("./movies/new");
});

router.post("/", function(req, res){
    if(req.body.Title || req.query.Title){
        var title = req.body.Title || req.query.Title;
        request("http://omdbapi.com/?s=" + title + "&apikey=" + process.env.APIKEY, function(error, response, body){
            var data = JSON.parse(body);
            if(data.Response == "True"){
                var newMovie = data["Search"]["0"];
                Movie.find({Title: newMovie.Title}, function(err, foundMovie){
                    if(!err && foundMovie.length == 0){
                        Movie.create(newMovie, function(err, createdMovie){
                            if(err){
                                res.render("./movies/new", {error: "Error during adding movie to the DB."});
                            } else {
                                res.send(createdMovie);
                            }
                        });
                    } else {
                        res.render("./movies/new", {error: "Movie already in db."});
                    }
                });
            } else {
                res.render("./movies/new", {error: "Movie not found."});
            }
        });
    } else {
        res.render("./movies/new", {error: "Fill 'Title' field."});
    }
});

module.exports = router;