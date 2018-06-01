var Movie      = require("./models/movie.js"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    app        = express();


var commentRoutes = require("./routes/comments"),
    moviesRoutes  = require("./routes/movies"),
    miscRoutes    = require("./routes/misc");

var url = process.env.DATABASEURL || "mongodb://localhost/moviesdb";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next){
    Movie.find({}, function(err, foundMovies){
        if(err){
            res.send("Unexpected error.");
        } else {
            res.locals.movies = foundMovies;
            res.locals.error = "";
            res.locals.success = "";
            next();
        }
    });
});

app.use("/movies", moviesRoutes);
app.use("/comments", commentRoutes);
app.use(miscRoutes);

app.listen(process.env.PORT, process.env.IP);