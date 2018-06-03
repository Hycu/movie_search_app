App uses:
"api-easy" for tests,
"body-parser" as a middleware which allows to parse the body of request, 
"ejs" to allow using embedded JavaScript (".ejs" files),
"express" as a server-side framework,
"mongoose" a MongoDB object modeling tool,
"request" for simplified HTTP calls.

Send requests to https://agile-thicket-51610.herokuapp.com

action="/movies" method="GET" --> will return a list of all movies contained in DB.

action="/movies" method="POST" --> requires parameter "Title" to be filled, it posts a movie into the database with additional information from http://www.omdbapi.com/, and responds with the movie object.

action="/comments" method="GET" --> will return a list of all comments contained in DB.

action="/comments" method="POST" --> requires parameters:
- "movieId" which is an "_id" of a movie already contained in a DB,
- "text" which is a content of a comment.

The response is a single comment object.

action="/movies/:movieId/comments" method="GET" --> will return a list of all comments assigned to the movie with "_id" equal to "movieId".

----------------------------------------------------------------------------------------------------------
IMPORTANT NOTE:

If you want to get response in JSON format, add parameter "responseType" equal to "JSON" to your request.
Otherwise, response will be consumed by a frontend solution.

----------------------------------------------------------------------------------------------------------

Object movie contains:
- "_id" - id of the movie in DB,
- "Title" - title of the movie,
- "Year" - year the movie was released,
- "imdbID" - IMDB id of the movie,
- "Poster" - url to the poster of the movie.

Example:
{
    "_id":"5b12cfdfd3c8d40f1d2a9f4c",
    "Title":"Forrest Gump",
    "Year":"1994",
    "imdbID":"tt0109830",
    "Poster":"https://ia.media-imdb.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    "__v":0
}

Object comment contains:
- "_id" - id of the comment in DB,
- "movieId" - id of the movie, the comment is assigned to,
- "text" - content of the comment.

Example:
{
    "_id":"5b138cf3f99d3d00143bf5f4",
    "movieId":"5b12cfdfd3c8d40f1d2a9f4c",
    "text":"Test comment",
    "__v":0
}
