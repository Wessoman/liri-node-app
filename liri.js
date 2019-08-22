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

function concertSearch(){
    let query = "";
    for (let c in queryArr){
        query += queryArr[c].replace(/\s/g, "%20");
        query += "%20";
    }
    query = query.replace(/%20\b/, "");
    let queryURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=" + bandsintown.id;
    
    axios.get(queryURL).then(function(response){
        // console.log(response.data);
        console.log(`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`);
        if (response.data[0] == undefined){
            console.log("INVALID ARTIST OR NO UPCOMING SHOWS");
            console.log(`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`);
        } else {
            for (let d=0; d<3; d++){
                let date = moment(response.data[d].datetime).format("LL");
                console.log(`Venue | ${response.data[d].venue.name}`);
                console.log(`City  | ${response.data[d].venue.city}, ${response.data[d].venue.region}, ${response.data[d].venue.country}`);
                console.log(`Date  | ${date}`);
                console.log(`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`);
            }
        }
    });
}

function getToken(client_id, client_secret){
    return axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        params: {
            grant_type: 'client_credentials'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
            username: client_id,
            password: client_secret
        }
   });
}

async function getSpotifyData(client_id, client_secret){
    const tokenData = await getToken(client_id, client_secret);
    const token = tokenData.data.access_token;
    
    let query = "";
    for (let s in queryArr){
        query += queryArr[s].replace(/\s/g, "%20");
        query += "%20";
    }
    query = query.replace(/%20\b/, "");
    let queryURL = "https://api.spotify.com/v1/search?q=" + query + "&type=track&limit=3";
    