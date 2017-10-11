var dbClient = require("./Model/dbClient.js");
var user = dbClient.getCurrentUser();

var difficulty_id = "difficulty-selector";
var language_id = "language-selector";

var set_game_difficulty = function() {
	var difficulty = document.getElementById(difficulty_id).value;
	if (difficulty === "easy") { 
		user.spacerace.difficulty = "easy";
		dbClient.saveUser(user);
	} else if (difficulty === "medium") { 
		user.spacerace.difficulty = "medium";
		dbClient.saveUser(user);
	} else if (difficulty === "hard") { 
		user.spacerace.difficulty = "hard";
		dbClient.saveUser(user);
	} else {
		throw new Error("html value was not of type 'easy', 'medium', or 'hard");
	}
}

var set_game_language = function() {
	var language = document.getElementById(language_id).value;
	if (language === "english") {
		user.spacerace.language = "english";
		dbClient.saveUser(user);
	} else if(language === "tagalog") {
		user.spacerace.language = "tagalog"
		dbClient.saveUser(user);
	}
}