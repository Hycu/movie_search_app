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
            res.send(comments);
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
    var isThisQuery = false;
    if(Object.keys(req.body).length === 0){
        isThisQuery = true;
    }
    if(req.query.movieId && req.query.text || req.body.comment.ID && req.body.comment.content)
    {
        var newComment = {
            movieId: req.query.movieId || req.body.comment.ID,
            text: req.query.text || req.body.comment.content
        };
        Comment.create(newComment, function(err, createdComment){
            if(err){
                if(isThisQuery){
                    res.send({error: "Error during comment creation."});
                } else {
                    res.render("./comments/new", {error: "Error during comment creation."});
                }
            } else {
                res.send(createdComment);
            }
        });
    } else {
        if(isThisQuery){
            res.send({error: "Fill movieId and text field."});
        } else {
            res.render("./comments/new", {error: "Fill movieId and text field."});
        }
    }
});

router.get("/:movieId", function(req, res){
    Comment.find({movieId: req.params.movieId}, function(err, foundComments){
        if(err || foundComments.length == 0){
            res.render("./comments/new", {error: "No comments found."});
        } else {
            res.send(foundComments);
        }
    })
});

module.exports = router;