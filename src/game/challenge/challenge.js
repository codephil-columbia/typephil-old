var Log = require('log');
var log = new Log('info');

var dbClient = require("./Model/dbClient.js");
var sentences = require("./game/challenge/sentences.js");

var user = dbClient.getCurrentUser();
var difficulty = user.challenge.difficulty;
var language = user.challenge.language;

console.log(difficulty);

var sentence_holder = "sentence-holder";
var user_input = "sentence-input";
var clock_id = "countdown-clock";
var counter_id = "counter";

var streak = 0;
var countdown_value;
var interval;


function setInitialCountdown() {
  countdown_value = 10;
  if (difficulty === "medium") {
    countdown_value = 15;
  }
  else if (difficulty === "hard") {
    countdown_value = 20;
  }
}
var start = function() {
  setInitialCountdown();
  set_clock_value(countdown_value);
  get_new_word();
  start_countdown();
  check();
};

var get_new_word = function() {
  var length = sentences[language][difficulty].length;
  var new_index = Math.floor(Math.random() * (length));
  var sentence = document.getElementById(sentence_holder);
  sentence.innerHTML = sentences[language][difficulty][new_index];
};

var clear_current_word = function(id) {
  var sentence = document.getElementById(id);
  sentence.value = "";
};

var add_time = function() {
  var extra = 3;
  if (difficulty === "medium") {
    extra = 5;
  }
  else if (difficulty === "hard") {
    extra = 10;
  }
  set_clock_value(get_clock_value() + extra);
};

var check = function() {
  var sentence = document.getElementById(sentence_holder).innerHTML;
  var userSentence = document.getElementById(user_input).value;
  if(sentence === userSentence) {
    clear_current_word(user_input);
    get_new_word();
    add_time();
    set_num_correct(get_num_correct() + 1);
  }
};

var get_db_high_score = function() {
  return user.challenge.score[difficulty].streak;
};

var get_num_correct = function() {
  return streak;
};

var set_num_correct = function(num){
  streak = num;
  document.getElementById(counter_id).innerHTML = streak;
};

var set_db_high_score = function() {
  user.challenge.score[difficulty].streak = get_num_correct();
  dbClient.saveUser(user);
};

var set_clock_value = function(val) {
  countdown_value = val;
  var clock = document.getElementById(clock_id);
  clock.textContent = val;
  clock.style.color = "white";
  if (countdown_value <= 5) {
    clock.style.color = "red";
  }
  console.log(document.getElementById(clock_id).innerHTML);
  if (countdown_value <= 0) {	
    reset_countdown();
    setTimeout(function() {
      if (get_num_correct() > get_db_high_score()) {
        set_db_high_score();
        alert("You just beat your high score! Congrats! Your overall score was " + get_num_correct() + "!");
      }
      else {
        alert("Sorry, but you didn't beat your high score of " + get_db_high_score() + ". Try again next time!");
      }
      route_config_challenge(); }, 100);
  }
};

var get_clock_value = function(){
  return countdown_value;
};

var reset_countdown = function(){
  clearInterval(interval);
};

var start_countdown = function(){
  interval = setInterval( function() { try { set_clock_value(get_clock_value() - 1); } catch(err) { clearInterval(interval) } }, 1000);
};

$( document ).ready(function() {
  $( "#sentence-input" ).focus();
  $(document).keyup(function () {
    $( "#sentence-input" ).focus();
  });
});