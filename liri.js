require("dotenv").config();
let fs     = require("fs");
let axios  = require("axios");
let keys   = require("./keys.js");
let moment = require('moment');
moment().format();
let omdb            = keys.omdb;
let bandsintown     = keys.bandsintown;
let spotify         = keys.spotify;
const client_id     = spotify.id;
const client_secret = spotify.secret;

let operator = process.argv[2];
let queryArr = process.argv.slice(3);
let logIt    = "[" + moment().format("MM/DD/YYYY h:mm:ss a") + "] " + process.argv.slice(2).join(" ");
doSomething();

function doSomething(){
    if (operator == "do-what-it-says"){
        let random = fs.readFileSync("./random.txt", "utf8");
        random   = random.trim().split(",");
        operator = random[0];
        queryArr = [random[1]];
        logIt   += " = " + operator + " " + queryArr;
    }
    if (operator == "concert-this"){
        concertSearch();
    } else if (operator == "spotify-this-song"){
        getSpotifyData(client_id, client_secret);
    } else if (operator == "movie-this"){
        movieSearch();
    } else {
        console.log(`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`);
        console.log("To use liri type an operater in the command line");
        console.log("(concert-this, spotify-this-song, movie-this, do-what-it-says)");
        console.log("followed by your search term.");
        console.log('example "node liri movie-this toy story"');
        console.log(`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`);
    }
    logIt += "\n";
    fs.appendFile("./log.txt", logIt, err=>{if(err)console.log(err)});
}
