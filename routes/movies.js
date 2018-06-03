var Comment = require("../models/comment.js"),
    Movie   = require("../models/movie.js"),
    express = require("express"),
    request = require("request"),
    router  = express.Router();

router.get("/", function(req, res){
    Movie.find({}, function(err, movies){
        if(err){
            res.render("./movies/new", {error: "Error during searching the db."});
        } else {
            if(req.isThisQuery){
                res.send(movies);
            } else {
                res.render("./movies/index");
            }
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
                                if(req.isThisQuery){
                                    res.send({error: "Error during adding movie to the DB."});
                                } else {
                                    res.render("./movies/new", {error: "Error during adding movie to the DB."});
                                }
                            } else {
                                if(req.isThisQuery){
                                    res.send(createdMovie);
                                } else {
                                    res.render("./movies/show", {movie: createdMovie});
                                }
                            }
                        });
                    } else {
                        if(req.isThisQuery){
                            res.send("error: 'Movie already in db.'");
                        } else {
                            res.render("./movies/new", {error: "Movie already in db."});
                        }
                    }
                });
            } else {
                if(req.isThisQuery){
                    res.send({error: "Movie not found."});
                } else {
                    res.render("./movies/new", {error: "Movie not found."});
                }
            }
        });
    } else {
        if(req.isThisQuery){
            res.send({error: "Fill 'Title' field."});
        } else {
            res.render("./movies/new", {error: "Fill 'Title' field."});
        }
    }
});

router.get("/:movieId", function(req, res){
    Movie.findById(req.params.movieId, function(err, foundMovie){
        if(err){
            if(req.isThisQuery){
                    res.send({error: "Movie not found."});
                } else {
                    res.render("./movies", {error: "Movie not found."});
                }
        } else {
            if(req.isThisQuery){
                res.send(foundMovie);
            } else {
                res.render("./movies/show", {movie: foundMovie});
            }
        }
    });
});

router.get("/:movieId/comments", function(req, res){
    Comment.find({movieId: req.params.movieId}, function(err, foundComments){
        if(err || foundComments.length == 0){
            if(req.isThisQuery){
                res.send({error: "No comments of this movie found."})
            } else {
                res.render("./comments/new", {error: "No comments of this movie found."});
            }
            
        } else {
            if(req.isThisQuery){
                res.send(foundComments);
            } else {
                Movie.findById(req.params.movieId, function(err, foundMovie){
                    if(err){
                        res.render("./comments/index", {error: "No comments associated with that movie found."});
                    } else {
                        Movie.find({}, function(err, foundMovies){
                            if(!err){
                                res.render("./comments/index", {movies: foundMovies, comments: foundComments});
                            }
                        });
                        
                    }
                });
            }
            
        }
    })
});

module.exports = router;