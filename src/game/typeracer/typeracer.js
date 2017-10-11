// The following draws sentences from the challenge mode; this needs to be updated with a database for typeracer sentences/ paragraphs.
var sentences = require("./game/typeracer/typeracerData.js");
var typeracerData = require("./game/typeracer/typeracerData.js");
var difficulty = user.typeracer.difficulty;
var language = user.typeracer.language;

// Starts TypeRacer game.
function startTypeRacer() {
  // Add three roads
  var userroad = spawnRoad();
  var opponent1road = spawnRoad();
  var opponent2road = spawnRoad();

  // Set initial speeds (based off of wpm)
  var userWPM = 0;
  var opponent1WPM = 0;
  var opponent2WPM = 0;

  // Set opponent max speed and acceleration based on difficulty
  var maxSpeed;
  var acceleration;
  if(difficulty === "easy") {
    maxSpeed = 20;
    acceleration = 1;
  }
  else if(difficulty === "medium") {
    maxSpeed = 40;
    acceleration = 2;
  }
  else {
    maxSpeed = 80;
    acceleration = 3;
  }

  // Set ending times as 0 initially
  var elapsedUserTime = 0;
  var elapsedOpponent1Time = 0;
  var elapsedOpponent2Time = 0;
  
  // Add three racecars
  var usercarbox = spawnRacecarbox(car_color, userroad, username, userWPM);

  var namesLength = typeracerData.racernames.length;
  var colorsLength = typeracerData.colors.length;

  var randname1 = Math.floor(Math.random() * (namesLength));
  var randcol1 = Math.floor(Math.random() * colorsLength);
  var oppcol1 = typeracerData.colors[randcol1]
  var oppname1 = typeracerData.racernames[randname1];
  var opponent1carbox = spawnRacecarbox(oppcol1, opponent1road, oppname1, opponent1WPM);

  var randname2 = Math.floor(Math.random() * (namesLength));
  var randcol2 = Math.floor(Math.random() * colorsLength);
  var oppcol2 = typeracerData.colors[randcol2];
  var oppname2 = typeracerData.racernames[randname2];
  var opponent2carbox = spawnRacecarbox(oppcol2, opponent2road, oppname2, opponent2WPM);

  var opponent1WPMgo = setInterval(function() {
                                           try {
                                             opp1end = new Date();
                                             elapsedOpponent1Time = (opp1end.getTime() - start.getTime())/(60*1000);
                                             if(opponent1WPM < maxSpeed - 10) {
                                               opponent1WPM += acceleration;
                                             }
                                             else {
                                               opponent1WPM = Math.floor(Math.random() * 10) + maxSpeed - 10;
                                             }
                                             document.getElementsByClassName('wpmdisplay')[1].textContent = opponent1WPM + ' wpm';
                                           }
                                           catch(err) {
                                             clearInterval(opponent1WPMgo);
                                           }
                                         }, 300);

  var opponent1Interval = 1000;
  var opponent1Handler = new Handler(opponent1carbox, setTimeout(opponent1move, opponent1Interval));

  function opponent1move() {
    try {
      opponent1Interval = 1000/(opponent1WPM + 2);
      if(moveRacecarbox(opponent1Handler, document.getElementById('typeracerbox').clientWidth) === -1) {
        clearInterval(opponent1WPMgo);
        if(parseInt(opponent1Handler.racecarbox.style.left) > parseInt(userhandler.racecarbox.style.left)) {
          alert("You lost the race to "+ oppname1+"! Try again next time.");
          user.typeracer.score[difficulty].losses += 1;
          dbClient.saveUser(user);
          route_config_typeracer();
        }
        return;
      }
      opponent1Handler = new Handler(opponent1carbox, setTimeout(opponent1move, opponent1Interval));
    }
    catch(err) {
    }
  }

  var opponent2WPMgo = setInterval(function() {
                                           try {
                                             opp2end = new Date();
                                             elapsedOpponent2Time = (opp2end.getTime() - start.getTime())/(60*1000);
                                             if(opponent2WPM < maxSpeed - 10) {
                                               opponent2WPM += acceleration;
                                             }
                                             else {
                                               opponent2WPM = Math.floor(Math.random() * 10) + maxSpeed - 10;
                                             }
                                             document.getElementsByClassName('wpmdisplay')[2].textContent = opponent2WPM + ' wpm';
                                           }
                                           catch(err) {
                                             clearInterval(opponent2WPMgo);
                                           }
                                         }, 300);

  var opponent2Interval = 1000;
  var opponent2Handler = new Handler(opponent2carbox, setTimeout(opponent2move, opponent2Interval));

  function opponent2move() {
    try {
      opponent2Interval = 1000/(opponent2WPM + 2);
      if(moveRacecarbox(opponent2Handler, document.getElementById('typeracerbox').clientWidth) === -1) {
        clearInterval(opponent2WPMgo);
        if(parseInt(opponent2Handler.racecarbox.style.left) <= parseInt(userhandler.racecarbox.style.left)) {
          alert("You lost the race to " + oppname2 +"! Try again next time.");
          user.typeracer.score[difficulty].losses += 1;
          dbClient.saveUser(user);
          route_config_typeracer();
        }
        return;
      }
      opponent2Handler = new Handler(opponent2carbox, setTimeout(opponent2move, opponent2Interval));
    }
    catch(err) {
    } 
  }

  /***** This chunk is the heart of how the adjustable speed of the racer works - should be translated into a replicable function, perhaps.*****/
  var interval = 1000;
  var userhandler = new Handler(usercarbox, setTimeout(usermove, interval));
  function usermove() {
    try {
      interval = 1000/(userWPM + 2);
      if(moveRacecarbox(userhandler, document.getElementById('typeracerbox').clientWidth) === -1) {
        clearInterval(userWPMgo);
        // Note: this 0.01 minute margin accounts for the difference in start time between the opponents and the user; instead of using this arbitrary margin, it would perhaps be better to actually account for the time difference using more Date() objects
        if(parseInt(userhandler.racecarbox.style.left) >= Math.max(parseInt(opponent1Handler.racecarbox.style.left), parseInt(opponent2Handler.racecarbox.style.left))) {
          if(userWPM > user.typeracer.score[difficulty].wpm) {
            alert("Congratulations! You won the race and also beat your record words per minute (WPM) rate! Your new top WPM rate is " + userWPM + ".");
            user.typeracer.score[difficulty].wpm = userWPM;
            user.typeracer.score[difficulty].wins += 1;
            dbClient.saveUser(user);
          }
          else {
            alert("Congratulations, you won the race! You had an average words per minute (WPM) rate of " + userWPM + ". Next time, try to beat your record of " + user.typeracer.score[difficulty].wpm + " WPM!");
            user.typeracer.score[difficulty].wins += 1;
            dbClient.saveUser(user);
          }
        }
        route_config_typeracer();
        return;
      }
      userhandler = new Handler(usercarbox, setTimeout(usermove, interval));
    }
    catch(err) {
    }
  }

  var userWPMgo = setInterval(function() {
                                           try {
                                             userend = new Date();
                                             elapsedUserTime = (userend.getTime() - start.getTime())/(60*1000);
                                             check = getWPM(totalentries, totalinc, previnc, elapsedUserTime, document.getElementById('typeracer-input').value, document.getElementById('typeracer-display').value);
                                             userWPM = check[0];
                                             document.getElementById('correct').textContent = check[1];
                                             document.getElementById('incorrect').textContent = check[2];
                                             document.getElementsByClassName('wpmdisplay')[0].textContent = userWPM + ' wpm';
                                           }
                                           catch(err) {
                                             clearInterval(userWPMgo);
                                           }
                                         }, 10);
  /***** End chunk.*****/
  
  //This call loads the first sentence to be typed.
  loadDisplay();
}

// A (very generic) class that defines a racecarbox and its associated setTimeout handle
var Handler = class Handler {
  constructor(racecarbox, handle) {
    this.racecarbox = racecarbox;
    this.handle = handle;
  }
}

// Spawns road on which racecarboxes may be placed.
function spawnRoad() {
  var road = document.createElement('div');
  road.className = 'road';
  document.getElementById('typeracerbox').appendChild(road);
  return road;
}

// Creates new racecarbox element, complete, with racecar, racername and racerWPM.
function spawnRacecarbox(color, road, racer, WPM) {
  var racecarbox = document.createElement('div');
  racecarbox.className = 'racecarbox';
  
  var racecar = document.createElement('img');
  racecar.className = 'racecar';
  racecar.src = './public/images/' + color + 'car.png';
  
  var racername = document.createElement('div');
  racername.textContent = racer;
  racername.className = 'racername';
  
  var wpm = document.createElement('div');
  wpm.textContent = WPM + ' wpm';
  wpm.className = 'wpmdisplay'; 
  
  racecarbox.appendChild(racecar);
  racecarbox.appendChild(racername);
  racecarbox.appendChild(wpm);
  road.appendChild(racecarbox);

  return racecarbox;
  
}

// Moves a racecarbox attached to a handler forward by 1px. Also, stops movement when racecarbox hits limit value.
function moveRacecarbox(handler, limit) {
  pos = parseFloat(handler.racecarbox.style.left, 10);
  if (isNaN(pos)) {
    pos = 0;
  }
  if (pos + handler.racecarbox.clientWidth >= limit) {
    clearTimeout(handler.handle);
    console.log('done');
    return -1;
  }
  else {
    var posRate;
    if(difficulty === "easy") {
      posRate = 1;
    }
    else if(difficulty === "medium") {
      posRate = 0.5;
    }
    else {
      posRate = 0.35;
    }
    pos += posRate;
    handler.racecarbox.style.left = pos + 'px';
  }
}

// Calculates WPM of user over totaltime, with a penalty for typing errors.
function getWPM(total, totalincorrect, previncorrect, totaltime, input, reference) {
  var wpm;
  var longerLength = Math.max(input.length, reference.length);
  //console.log(shorterLength);
  for (var i = 0; i < longerLength; i++) {
    if (input[i] !== reference[i]) {
      if(input.length === 0) {
        previncorrect = 0;
      }
      else {
        totalincorrect = totalincorrect - previncorrect + (input.length-i);
      }
      previncorrect = input.length-i;
      wpm = parseInt(Math.max(0, ((total/5) - totalincorrect)/(totaltime)));
      //console.log(total);
      //console.log(totalincorrect);
      //console.log(previncorrect);
      //console.log(totaltime);
      //console.log(wpm);
      return [wpm, input.slice(0, i), input.slice(i)];
    }

  }
  clearText('typeracer-input');
  loadDisplay();
  wpm = parseInt(Math.max(0, ((total/5) - totalincorrect)/(totaltime)));
  //console.log(previncorrect);
  //console.log(wpm);
  return [wpm, input, ""];
}

// Ensures that the 'typeracer-display' textarea is large enough to hold the loaded sentence.
function auto_size(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

// Loads a sentence into the 'typeracer-display' textarea.
function loadDisplay() {
  var length = sentences[language][difficulty].length;
  var new_index = Math.floor(Math.random() * (length));
  document.getElementById('typeracer-display').value = sentences[language][difficulty][new_index];
  //$('#typeracer-display').scrollTop($('#typeracer-input').scrollTop());
  //$('#typeracer-match').scrollTop($('#typeracer-input').scrollTop());
  //$('#typeracer-input').scrollTop($('#typeracer-input').scrollTop());
  $('#typeracer-display').animate({scrollTop: 0}, "fast");
  $('#typeracer-match').animate({scrollTop: 0}, "fast");
  $('#typeracer-input').animate({scrollTop: 0}, "fast");
}

// Detects backspace keystrokes (so that they aren't counted in WPM calculation) (now obsolete)
function backspaceKeyCode(event) {
  var x = event.keyCode;
  if (x === 8) {
    return true;
  }
  return false;
}

// Sets wins and losses
function setWLs() {
  document.getElementsByClassName('wins')[0].textContent = user.typeracer.score[difficulty].wins;
  document.getElementsByClassName('losses')[0].textContent = user.typeracer.score[difficulty].losses;
}

// 
function clearText(id) {
  var sentence = document.getElementById(id);
  sentence.value = "";
};