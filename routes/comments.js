var Comment = require("../models/comment.js"),
    Movie   = require("../models/movie.js"),
    express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    Comment.find({}, function(err, comments){
        if(err){
            if(req.body){
                res.render("./comments/new", {error: "Error during searching for comments."});
            } else {
                res.send({error: "Error during searching for comments."});
            }
        } else {
            if(req.isThisQuery){
                res.send(comments);
            } else {
                Movie.find({}, function(err, foundMovies){
                    if(err){
                        res.render("./comments/new", {error: "Error during searching for movies associated with comments."});
                    } else {
                        res.render("./comments/index", {movies: foundMovies, comments: comments})
                    }
                });
            }
        }
    });
});

router.get("/new", function(req, res){
    Movie.find({}, function(err, foundMovies){
        if(err || foundMovies.length == 0){
            res.render("./movies/new", {error: "There are no movies in db. Add a movie first."});
        } else {
            res.render("./comments/new");
        }
    });
});

router.post("/", function(req, res){
    var newComment;
    var goOn = false;
    if(req.isThisQuery){
        newComment = {
            movieId: req.query.movieId,
            text: req.query.text
        };
        if(req.query.movieId && req.query.text){
            goOn = true;
        }
    } else {
        newComment = {
            movieId: req.body.comment.ID,
            text: req.body.comment.content
        };
        if(req.body.comment.ID && req.body.comment.content){
            goOn = true;
        }
    }
    if(goOn)
    {
        Comment.create(newComment, function(err, createdComment){
            if(err){
                if(req.isThisQuery){
                    res.send({error: "Error during comment creation."});
                } else {
                    res.render("./comments/new", {error: "Error during comment creation."});
                }
            } else {
                if(req.isThisQuery){
                    res.send(createdComment);
                } else {
                    Movie.findById(createdComment.movieId, function(err, foundMovie){
                        if(err){
                            res.render("./comments/new", {error: "Error while searching for a movie during comment creation."});
                        } else {
                            res.render("./comments/show", {comment: createdComment, movie: foundMovie});
                        }
                    });
                    
                }
            }
        });
    } else {
        if(req.isThisQuery){
            res.send({error: "Fill movieId and text field."});
        } else {
            res.render("./comments/new", {error: "Fill movieId and text field."});
        }
    }
});

router.get("/:commentId", function(req, res){
    Comment.findById(req.params.commentId, function(err, foundComment){
        if(err){
            if(req.isThisQuery){
                res.send({error: "Can't find such comment."});
            } else {
                res.render("./comments/index", {error: "Can't find such comment."});
            }
        } else {
            if(req.isThisQuery){
                res.send(foundComment);
            } else {
                res.render("./comments/show", {comment: foundComment});
            }
        }
    });
});

module.exports = router;