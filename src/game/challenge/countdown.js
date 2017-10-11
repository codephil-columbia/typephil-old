var dbClient           = require('./Model/dbClient.js');
var sentence_templates = require('./challenge/challenge_templates.js');
var sentence_gen       = require('./sentence_gen/sentence_gen.js');
var route              = require('./routes.js');

var clock_id = "countdown-clock";

var input_id   = "sentence-input";
var holder_id  = "sentence-holder";
var mode_id    = "game-mode";

var countdown_duration = 20;

var interval;
var start_countdown = function(){
    interval = setInterval(function(){
	set_clock_value(get_clock_value() - 1);
    }, 1000);
}

var reset_countdown = function(){
    clearInterval(interval);
    set_clock_value(countdown_duration);
}

var reset_start_countdown = function(){
    reset_countdown();
    start_countdown();
}

var add_time = function(){
    var input_val  = document.getElementById(input_id).value;
    var holder_val = document.getElementById(holder_id).innerHTML;
    var mode = document.getElementById(mode_id).value;

    if (input_val === holder_val){
      if (mode === "easy"){
          set_clock_value(get_clock_value() - (-5));
      }
      if (mode === "medium"){
          set_clock_value(get_clock_value() - (-4));
      }
      if (mode === "hard"){
          set_clock_value(get_clock_value() - (-3));
      }
    }
}

var get_clock_value = function(){
    return document.getElementById(clock_id).innerHTML;
}

var set_clock_value = function(val){
    if (val < 0){
	clearInterval(interval);
	end_challenge();
    } else {
	document.getElementById(clock_id).innerHTML = val;
    }
}
