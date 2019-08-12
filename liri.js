//Require .env file
require("dotenv").config();

//Require .key file
var keys = require("./keys.js");

//require fs system
const fs = require('fs');

// Require Moment --------------------------------
const moment = require('moment');

//APIS
//Chasing spotify key----------------------------------------
var spotify = new Spotify(keys.spotify);

// OMDB && Bands in Town API ---------------------------------
let omdb = (keys.omdb);
let bandsintown = (keys.bandsintown);

//Defining variables efficiently
let userInput = process.argv[2];
let userQuery = process.argv[3];


//Different usage of the user commands
function commands(userInput, userQuery) {
    switch(userInput){
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}

commands(userInput, userQuery);

function concertThis() {
    console.log("Searching for " + userQuery);
    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + bandsintown, function(err, resp, body) {
        if(!err){
            var userBand = JSON.parse(body);
            for (i = 0; i < 1; i++){
                console.log('This is for you...');
                console.log('Artist: ' + userband[i].lineup[0]);
                console.log('Venue: ' + userBand[i].venue.name);
                console.log('')
            }

        }
    })
};


function spotifyThisSong() {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}