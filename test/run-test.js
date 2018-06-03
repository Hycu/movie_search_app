var APIeasy = require("api-easy");

var scopes = ["When using the Test API", "myMoviesDatabase"];

var suite = APIeasy.describe("api/test");

scopes.forEach(function (text) {
  suite.discuss(text);
});

suite.use("agile-thicket-51610.herokuapp.com", 80)
     .setHeader("Content-Type", "application/json")
     .followRedirect(false)
     
     .get("/movies/5b12cfdfd3c8d40f1d2a9f4c", {responseType: "JSON"})
     .expect(200, {
           _id: "5b12cfdfd3c8d40f1d2a9f4c", 
          Title: "Forrest Gump", 
          Year: "1994", 
          imdbID: "tt0109830", 
          Poster: "https://ia.media-imdb.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg", 
          __v: 0 
       })
       
     .post("/movies", {Title: "Forrest Gump"})
     .expect(200, {error: "Movie already in db."})
     
    //  .get("/comments")
    //  .expect(200, { ok: true })
    
    //  .post("/comments", { dynamic: true })
    //  .expect(200, { dynamic: true })
     .export(module);