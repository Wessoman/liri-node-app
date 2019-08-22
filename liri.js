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