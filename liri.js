//Require .env file (installed)
require("dotenv").config();

//require fs 
const fs = require('fs');

//Require .key file 
const keys = require("./keys.js");

//require axios (installed)
const axios = require('axios'); 

// Require Moment to format date & time (installed)
const moment = require('moment');

//APIS
//Chasing spotify key (installed)
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

//FUNCTIONS 
//Concert this Axios --------------------------------------------------------------------------------------------------------------------------------
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

//SPOTIFY SEARCH :D ---------------------------------------------------------------------------------------------------------------------------------
function spotifyThisSong() {
    console.log(`\n---------\n\nDRUM ROLL...`);

    // If user doesn't provide a query, I'll just chase the value of "Wonderwall" 
    if (!userQuery) {
        userQuery = "wonderwall"
    };

    // Spotify search format used
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
            console.log(`\nThis is for you! \n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n----------`)
        };
    });
}

//THIS IS A MIRACLE. THIS ONE WORKS!!!!
// function movieThis() {
//     // var queryUrl = "http://www.omdbapi.com/?t=shrek&apikey=ade4141a"
//     var queryUrl = "http://www.omdbapi.com/?t=" + userQuery + "&apikey=ade4141a"
//     axios.get(queryUrl).then(function(err, resp) {

//         if(err) {
//             return console.error(err);
//         }else{
//             console.log(resp.data)
//         }
//     })
// }


// function movieThis() {
//     // var queryUrl = "http://www.omdbapi.com/?t=shrek&apikey=ade4141a"
//     var queryUrl = "http://www.omdbapi.com/?t=" + userQuery + "&apikey=ade4141a"
//     axios.get(queryUrl).then(function(err, resp, body) {

//         // if(err) {
//         //     return console.error(err);
//         // }
//         if(userQuery){			
// 			console.log("Movie: " + body.data.Title);
// 			// console.log("Release Year: " + body.Year);
// 			// console.log("IMDB Rating: " + body.imdbRating);
// 			// console.log("Rotten Tomatoes Ratings: " + body.Ratings[1].Value);
// 			// console.log("Country: " + body.Country);
// 			// console.log("Language: " + body.Language);
// 			// console.log("Plot: " + body.Plot);
// 			// console.log("Actors: " + body.Actors);
// 		}else{
//             console.log("meehh")
//         }
//     })
// }


function movieThis() {
    console.log(`\n - - - - -\n\nSEARCHING FOR..."${userQuery}"`);
    // if (!userQuery) {
    //     userQuery = "mr nobody";
    // };
    // REQUEST USING OMDB API
    var queryUrl = "http://www.omdbapi.com/?t=" + userQuery + "&apikey=ade4141a"
    axios.get(queryUrl).then(function (error, response, body) {
        console.log(response);
        let userMovie = body;

        // // BECAUSE THE ROTTEN TOMATOES RATING WAS NESTED IT WAS NECESSARY TO CAPTURE ITS VALUES IN AN ARRAY TO CREATE A PATH
        // let ratingsArr = userMovie.Ratings;
        // if (ratingsArr.length > 2) {}

        // if (!error && response.statusCode === 200) {
        //     console.log(`\nBA DA BOP!  That's for you...\n\nTitle: ${userMovie.Title}\nCast: ${userMovie.Actors}\nReleased: ${userMovie.Year}\nIMDb Rating: ${userMovie.imdbRating}\nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}\nCountry: ${userMovie.Country}\nLanguage: ${userMovie.Language}\nPlot: ${userMovie.Plot}\n\n- - - - -`)
        // } else {
        //     return console.log("Movie able to be found. Error:" + error)
        // };
    })
};