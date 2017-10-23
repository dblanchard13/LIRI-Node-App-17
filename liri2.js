var request = require("request");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var keys = require("./keys.js")

var argOne = process.argv[2];
var argTwo = process.argv[3];

// twitter

function myTweets (){
	var client = new Twitter(keys.twitterKeys)
	var params = {screen_name: "katiekpang"};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
 		if (!error) {
 			tweets.forEach(function(stuff){

 				
 				var display = {
	 				name: stuff.user.name,
	 				location: stuff.user.location,
	 				message: stuff.text.toString() + "\n",
	 				time: stuff.created_at,
	 				url: stuff.user.url
 				}

 				console.log("==================")
		 		console.log("")
		 		console.log(display)
		 		console.log("")
		 		console.log("==================")

 			});
 		};
	});

};
myTweets();

// Spotify

function spotifyMe(songName) {
	var client = new Spotify(keys.spotifyKeys)
	var searchQuery = {type: 'track', query: songName, limit: 10}

	if (songName == ""){
		client
			.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
				.then (function(data){
					console.log("==================")
					console.log("Artist: " + data.artist[0].name)
					console.log("Song Name: " + data.name)
					console.log("Album: " + data.album.name)
					console.log("URL: " + data.previous_url)
					console.log("==================")
				})
				.catch(function(err){
					console.log(err)
				})
	}
	else {
		client.search(searchQuery, function(err, data){
			if (err){
				console.log(err)
			}
			data.tracks.items.forEach(function(stuff){
				var songDisplay = {
					artist: ("Artist: " + data.artist[0].name),
					song: ("Song Name: " + data.name),
					album: ("Album: " + data.album.name),
					url: ("URL: " + data.previous_url)
				}
				console.log("==================")
		 		console.log("")
		 		console.log(songDisplay)
		 		console.log("")
		 		console.log("==================")
			})
		})
	}

}
spotifyMe();

// omdb

function movieNow( movieName) {
	var movieData, title, imdb, tomatoes, country, language, plot, actors;
	console.log(movieName)

	if(movieName == ""){
		request("http://wwww.omdbapi.com/?apikey=40e9cece&type=movie&t=Mr.+Nobody", function(err, reponse, data){
			if(err) { 
				console.log(err)
			}
			else {
				request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece",function(err, response, data){
					
					movieData = JSON.parse(body);
					
					var movieDisplay = {
						title: movieData.Title,
						year: movieData.Year,
						imdb: movieData.Ratings[0].Value,
						tomatoes: movieData.Ratings[1].Value,
						country: movieData.Country,
						language: movieData.Language,
						plot: movieData.Plot,
						actors: movieData.Actors
					}

				console.log("==================")
		 		console.log("")
		 		console.log(movieDisplay)
		 		console.log("")
		 		console.log("==================")
				});
			}
		})
	}

}
movieNow();

function doAny(select, query){
	fs.readFile("./random.txt", "utf8", function(err, data){
		if (err){
			console.log(err)
		}
		var input = data.split(",")[0]
		var query = data.split(",")[1]

		if (input === 'my-tweets') {
			myTweets();
		} else if (input === 'spotify-this-song') {
			spotifyMe(query);
		} else if (input === 'movie-this') {
			movieNow(query);
		} else if(input === 'do-what-it-says') {
			console.log("byeeeee felicia")
		}

	});
};

doAny();

//



