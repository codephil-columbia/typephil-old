var dbClient = require("./Model/dbClient.js");
var user = dbClient.getCurrentUser();

var difficulty_id = "difficulty-selector";
var language_id = "language-selector";
var car_color_id = "car-selector";

var set_game_difficulty = function() {
	var difficulty = document.getElementById(difficulty_id).value;
	if (difficulty === "easy") { 
		user.typeracer.difficulty = "easy";
		dbClient.saveUser(user);
	} else if (difficulty === "medium") { 
		user.typeracer.difficulty = "medium";
		dbClient.saveUser(user);
	} else if (difficulty === "hard") { 
		user.typeracer.difficulty = "hard";
		dbClient.saveUser(user);
	} else {
		throw new Error("html value was not of type 'easy', 'medium', or 'hard");
	}
}

var set_game_language = function() {
	var language = document.getElementById(language_id).value;
	if (language === "english") {
		user.typeracer.language = "english";
		dbClient.saveUser(user);
	} else if(language === "tagalog") {
		user.typeracer.language = "tagalog"
		dbClient.saveUser(user);
	}
}

var set_car_color = function() {
	var color = document.getElementById(car_color_id).value;
	if (color === "red") {
		user.typeracer.car_color = "red";
		dbClient.saveUser(user);
	} else if(color === "green") {
		user.typeracer.car_color = "green"
		dbClient.saveUser(user);
	} else if(color === "golden") {
		user.typeracer.car_color = "golden"
		dbClient.saveUser(user);
	}
}