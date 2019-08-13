//Require .env file
require("dotenv").config();

//require fs 
const fs = require('fs');

//Require .key file
const keys = require("./keys.js");

//require axios
const axios = require('axios');

// Require Moment to format date & time --------------------------------
const moment = require('moment');

//APIS
//Chasing spotify key----------------------------------------
const Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);
//Chasing OMDb key
let omdb = (keys.omdb);
//Chasing BandsInTown key
let bandsintown = (keys.bandsintown);

//Defining variables efficiently
let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");


//Different usage of the user commands
function commands(userInput, userQuery) {
    switch (userInput) {
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
        default:
            console.log("\n ------------- \n \n I don't understand that command \n Please try the following commands: ");
            console.log("\n concert-this \n spotify-this-song \n movie-this \n do-what-it-says \n");
            console.log("After the commands just type the kind of bands/movies/music you are looking for :) \n \n------------\n");
            break;
    }
};

commands(userInput, userQuery);

//Concert this Axios
function concertThis() {
    console.log("Searching for " + userQuery);
    var queryUrl = "https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + bandsintown
    axios.get(queryUrl).then(function(resp) {
        // console.log(resp);
        var userBand = resp.data;
        if(!err){
        //This loop will find all the data found one by one 
        for (var i = 0; i < userBand.length; i++) {
            // console.log(userBand[i]);
            console.log("\n")
            console.log('Artist: ' + userBand[i].lineup[0]);
            console.log('Artist: ' + userBand[i].venue.name);
            //FORMAT THE DATE & TIME WITH MOMENT
            let concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
            console.log("Date & Time: " + concertDate);
            console.log("\n--------------------\n")
        }
    }
    }).catch(function(err) {
        console.log("Band or concert not found, Try with something cool like Of Monsters and Men!")
    })
};

//SPOTIFY API :D
function spotifyThisSong() {
    console.log(`\n---------\n\nSEARCHING FOR MUSIC!`);

    // If user doesn't provide a query, I'll just chase the value of "Wonderwall" 
    if (!userQuery) {
        userQuery = "wonderwall"
        console.log("Add a song or an Artist and discover more music!")
    };

    // SPOTIFY SEARCH QUERY FORMAT
    spotify.search({
        type: 'track',
        query: userQuery,
        limit: 1
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        //Simplifying the object
        let spotifyArr = data.tracks.items;
        //Looking thru the results. I'll print just 1 tracks because of the limit above
        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\nThis is for you! \n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n ----------`)
        };
    });
}