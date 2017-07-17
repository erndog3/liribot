var action = process.argv[2];
// var value = process.argv[3]; (THIS ONLY TAKES IN ONE NODE ARGUMENT FOR THE 3RD NODE SO ADDED CODE BELOW)

// STORE ALL OF THE ARGUMENTS IN AN ARRAY
var nodeArgs = process.argv;

// CREATE AN EMPTY VARIABLE FOR HOLDING USERS INPUT VALUE
var value = "";

// LOOPS THROUGH ALL THE WORDS/STRINGS IN THE NODE ARGUMENT 
// DO A FOR LOOP TO GET EVERYTHING AFTER THE INDEX OF 2 NODE ARGUMENT
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

        value = value + "+" + nodeArgs[i]; 

    } else {

        value = value + nodeArgs[i];
    }
}

// SWITCH STATEMENT FOR RUNNING DIFFERENT APPS 
// THIS WILL DIRECT WHICH FUNCTION TO RUN
switch (action) {
    case 'my-tweets':
        twitter();
        break;

    case 'spotify-this-song':
        spotify();
        break;

    case 'movie-this':
        omdb();
        break;

    case 'do-what-it-says':
        dwis();
        break;
}



//TWITTER

function twitter() {
    //FS IS AN NPM PACKAGE FOR READING AND WRITING FILES 
    var fs = require('fs');

    //GETS THE TWITTER KEYS FROM THE "keys.js" file
    var twitterKey = require('./keys.js');
    // console.log(twitterKey.twitterKeys) THIS IS A TEST TO CONSOLE LOG THE KEYS. 

    //GRAB THE TWITTER PACKAGE 
    var Twitter = require('twitter');

    //TWITTER CALL WHICH PASSES THROUGH THE TWITTER KEYS FROM VARIABLE TWITTERKEY
    var client = new Twitter(twitterKey.twitterKeys);

    //THIS GRABS THE SECOND NODE FOR USERNAME ARGUMENT AND PASSES IT THROUGH
    // var userInput = process.argv[3];

    //NODE FUNCTION THAT GRABS THE TWITTER INFROMATION 
    var params = { screen_name: value, count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            console.log("=============================================");
            console.log("Here are the 20 most recent tweets");

            for (var i = 0; i < tweets.length; i++) {

                console.log("_____________________________________________");
                console.log("Tweeted on: " + tweets[i].created_at);
                console.log(tweets[i].text);

            }
        }
    });
}





//SPOTIFY

// function spotify()






//OMDB

function omdb() {

    // INCLUDE THE REQUEST NPM PACKAGE (DONT FORGET TO RUN "NPM INSTALL REQUEST" IN THIS FOLDER FIRST!) 
    var request = require('request');

    // RUN A REQUEST TO THE OMDB API WITH THE MOVIE SPECIFIED (CAN BE MULTI WORD MOVIES)
    request('http://www.omdbapi.com/?t=' + value + '&y=plot=short&apikey=40e9cece', function(error, response, body) {

        // IF THE REQUEST IS SUCCESFUL (i.e. IF THE RESPONSE STATUS CODE IS 200)
        if (!error && response.statusCode == 200) {
        

            // PARSE THE BODY OF THE SITE W DOT NOTATION
            console.log("======================================================================");
            console.log("The movie's name is: " + JSON.parse(body).Title);
            console.log("");
            console.log("The movie was released in: " + JSON.parse(body).Year);
            console.log("");
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            console.log("");
            console.log("This movie was produced in the: " + JSON.parse(body).Country);
            console.log("");
            console.log("The language for this movie is in: " + JSON.parse(body).Language);
            console.log("");
            console.log("The movie's Plot: " + JSON.parse(body).Plot);
            console.log("");
            console.log("The movie's Actor's: " + JSON.parse(body).Actors);
            console.log("");
            console.log("The Rotten Tomato rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("");
            console.log("The Rotten Tomato URL is: " + JSON.parse(body).tomatoURL);
            console.log("");      
        }
    });
}