// Node Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan"); // for debugging

// Scraping tools
var request = require("request"); // for web-scraping
var cheerio = require("cheerio"); // for web-scraping

// Requiring the Comment and Article models
var Comment = require("./models/Comment.js");
var Article = require("./models/Article.js");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Serve Static Content
app.use(express.static(process.cwd() + "/public"));
// OR
// Make public a static dir
//app.use(express.static("public"));

// Express-Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// Database Configuration with Mongoose
// ---------------------------------------------------------------------------------------------------------------
// Connect to localhost if not a production environment
if(process.env.NODE_ENV === "production"){
    mongoose.connect("mongodb://heroku_5r5gzm39:lfiilgmhj976dq6ek0a7qtl1q5@ds121674.mlab.com:21674/heroku_5r5gzm39");

}else{
    mongoose.connect("mongodb://localhost/news-scraper");
}

var db = mongoose.connection;

// Show any Mongoose errors
db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});


// ---------------------------------------------------------------------------------------------------------------

// DROP DATABASE (FOR MY PERSONAL REFERENCE ONLY - YOU CAN IGNORE)
// Article.remove({}, function(err) {
//    console.log("collection removed")
// });

// Import Routes/Controller
var router = require("./controllers/controller.js");
app.use("/", router);


// Launch App
var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("App Server Running on port: " + PORT);
});