// The following draws sentences from the challenge mode; this needs to be updated with a database for spacerace sentences/ paragraphs.
var sentences = require("./game/spacerace/spaceraceData.js");
var difficulty = user.spacerace.difficulty;
var difficulty_modifier = 1;
var keyboardSwappedToSpecialValues = false;

function setDifficultyModifier() {
  if (difficulty === "easy") {
    difficulty_modifier = 1;
  }
  else if(difficulty === "medium") {
    difficulty_modifier = 2;
  }
  else if(difficulty === "hard") {
    difficulty_modifier = 3;
  }
}

var language = user.spacerace.language;

var Word = class Word {
  constructor() {
    this.element = spawnWord();
    this.handle = runWord(this);
  }
}

function pauseSpacerace() {
  clearInterval(spaceraceGo);
  spaceraceGo = null;
  for (var i = 0; i < infiniteList.length; i++) {
    clearInterval(infiniteList[i].handle);
    infiniteList[i].handle = null;
  }
}

function restartSpacerace() {
  for (var i = 0; i < infiniteList.length; i++) {
    infiniteList[i].handle = runWord(infiniteList[i]);
  }
  spaceraceGo = setInterval(function () { try { infiniteList = wordUp(infiniteList);} catch(err) { clearInterval(spaceraceGO) } }, parseInt(6000/(difficulty_modifier*Math.sqrt(level))));
}

function endSpacerace() {
  if (score > user.spacerace.score[difficulty].points) {
    alert("You just beat your high score! Congrats! Your overall score was " + score + "!");
    user.spacerace.score[difficulty].points = score;
    dbClient.saveUser(user);
  }
  else {
    alert("Sorry, but you didn't beat your high score of " + user.spacerace.score[difficulty].points + ". Try again next time!")
  }
  route_game();
}

function checkMissedWord(input, reference) {
  var result = findDifference(input, reference)
  document.getElementById('correct').textContent = result[1];
  document.getElementById('incorrect').textContent = result[2];
  if(result[0]) {
    document.getElementById('missedWordModal').style.display = "none";
    document.getElementById('correct').textContent = "";
    document.getElementById('incorrect').textContent = "";
    unHighlightPrevAndForwardKey();
    highlightCurrentKey();
    highlightFinger();
    clearText('missedword-input');
    clearText('missedword-display');
    if (lives <= 0) {
      setTimeout(endSpacerace, 500);
    }
    else {
      clearText('spacerace-input');
      restartSpacerace();
      document.getElementById('spacerace-input').focus() 
    }
  }
}

function findDifference(input, reference) {
  var longerLength = Math.max(input.length, reference.length);
  //console.log(shorterLength);
  for (var i = 0; i < longerLength; i++) {
    if (input[i] !== reference[i]) {
      return [false, input.slice(0, i), input.slice(i)];
    }
  }
  return [true, input, ""];
}

function vh() {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return 100/h;
}

function vw() {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return 100/w;
}

function vmin() {
  return Math.min(vh(), vw());
}

function vmax() {
  return Math.max(vh(), vw());
}

function spawnWord() {
  var word = document.createElement('div');
  word.className = 'word';
  word.style.left = '0px';
  document.getElementById("spacebox").appendChild(word);
  word.style.top = Math.floor(Math.random()* (document.getElementById("spacebox").clientHeight - 30)*vmin()) +'vmin';

  // Should be based on height of spacebox (more intuitive)
  
  var length = sentences[language][difficulty].length;
  var new_index = Math.floor(Math.random() * (length));
  word.textContent = sentences[language][difficulty][new_index];

  return word;
}

function populateLives() {
    var canister = document.getElementById('lives');
    while(canister.firstChild) {
      canister.removeChild(canister.firstChild);
    }
    for (i = 0; i < lives; i ++) {
      var heart = document.createElement('span');
      heart.className = 'fa fa-heart withmargin';
      document.getElementById('lives').appendChild(heart);
    }
}

function populateLevel() {
    var display = document.getElementById('level');
    display.textContent = level;
}

function populateScore() {
    var display = document.getElementById('score');
    display.textContent = score;
}

// Stops word object from moving and makes word invisible (however, the word div still exists)
function endWord(input, target) {
  if (input) {
    clearInterval(target.handle);
    target.element.style.display = 'none';
    function getSpliceIndex(element) {
      if (element.handle === target.handle) {
        return true;
      }
    }
    var index = infiniteList.findIndex(getSpliceIndex);
    infiniteList.splice(index, 1);
    if (input === -1) {
      lives -= 1;
      populateLives();
      pauseSpacerace();
      document.getElementById('missedword-display').value = target.element.textContent;
      document.getElementById('missedWordModal').style.display = "block";
      unHighlightPrevAndForwardKey();
      highlightCurrentKey();
      highlightFinger();
      document.getElementById('missedword-input').focus();
    }
    else {
      count += 1;
      score += 100*(difficulty_modifier * level);
      populateScore();
      if(count === 8) {
        count -= 8;
        level += 1;
        // Resets interval of word spawning
        pauseSpacerace();
        restartSpacerace();
        populateLevel();
        if(lives < 4) {
          lives += 1;
          populateLives();
        }
      }
    }
  }
}

function moveWord(word, limit) {
  pos = parseInt(word.style.left, 10);
  if (pos >= limit) {
    return -1;
  }
  else {
    pos ++;
    word.style.left = pos + 'px';
    return null;
  }
}

function runWord(word) {
  var wordBound = parseInt(word.element.parentElement.clientWidth);
  var go = setInterval(function() { try { endWord(moveWord(word.element, wordBound), word); } catch(err) { clearInterval(go) }}, parseInt(10000/(word.element.parentElement.clientWidth)));
  return go;
}

function clearText(id) {
  var sentence = document.getElementById(id);
  sentence.value = "";
};

function matchWords(words, input) {
  var matched = false;
  for (var i = words.length - 1; i > -1; i --) {
    if (words[i].element.textContent === input) {
      endWord(2, words[i]);
      matched = true;
    }
  }
  if (matched) {
    clearText("spacerace-input");
  }
}

function wordUp(words) {
  console.log(infiniteList);
  var word = new Word();
  words.push(word);
  return words;
}

function findDifferenceIndex(input, reference) {
  var longerLength = Math.max(input.length, reference.length);
  //console.log(shorterLength);
  for (var i = 0; i < longerLength; i++) {
    if (input[i] !== reference[i]) {
      return i;
    }
  }
  return longerLength;
}

var fingerHighlightMap = {
  "A": "finger-1 finger-10",
  "a": "finger-1",
  "B": "finger-10 finger-4",
  "b": "finger-4",
  "C": "finger-4 finger-10",
  "c": "finger-4",
  "D": "finger-3 finger-10",
  "d": "finger-3",
  "E": "finger-3 finger-10",
  "e": "finger-3",
  "F": "finger-4 finger-10",
  "f": "finger-4",
  "G": "finger-4 finger-10",
  "g": "finger-4",
  "H": "finger-1 finger-7",
  "h": "finger-7",
  "I": "finger-8 finger-1",
  "i": "finger-8",
  "J": "finger-7 finger-1",
  "j": "finger-7",
  "K": "finger-8 finger-1",
  "k": "finger-8",
  "L": "finger-1 finger-9",
  "l": "finger-9",
  "M": "finger-1 finger-7",
  "m": "finger-7",
  "N": "finger-1 finger-7",
  "n": "finger-7",
  "O": "finger-1 finger-9",
  "o": "finger-9",
  "P": "finger-1 finger-10",
  "p": "finger-10",
  "Q": "finger-1 finger-10",
  "q": "finger-1",
  "R": "finger-10 finger-4",
  "r": "finger-4",
  "S": "finger-2 finger-10",
  "s": "finger-2",
  "T": "finger-10 finger-4",
  "t": "finger-4",
  "U": "finger-1 finger-7",
  "u": "finger-7",
  "V": "finger-10 finger-4",
  "v": "finger-4",
  "W": "finger-10 finger-2",
  "w": "finger-2",
  "X": "finger-10 finger-3",
  "x": "finger-3",
  "Y": "finger-1 finger-7",
  "y": "finger-7",
  "Z": "finger-1 finger-10",
  "z": "finger-1",
  "&nbsp;": "finger-6",
  "comma": "finger-8",
  "period": "finger-10",
  "apostrophe": "finger-10",
  "semicolon": "finger-10",
  "f-slash": "finger-10",
  "questionmark": "finger-1 finger-10",
  "exclamationmark": "finger-3, finger-10"
};

// Keyboard
var mapToSpecialKeys = {
  "`": "~",
  "1": "!",
  "2": "@",
  "3": "#",
  "4": "$",
  "5": "%",
  "6": "^",
  "7": "&amp;",
  "8": "*",
  "9": "(",
  "0": ")",
  "-": "_",
  "=": "+",
  "\\": "|",
  "[": "{",
  "]": "}",
  ";": ":",
  "'": '"',
  ",": "&lt;",
  ".": "&gt;",
  "/": "?"
};

var returnBackToNormalKeys = function (map) {
  var tmp = {};
  for(var key in map) {
    tmp[map[key]] = key;
  }
  return tmp;
};

var convertCharToValidId = function(character) {
  var id = "";
  switch (character) {
    case '&nbsp;':
      id = "space";
      break;
    case ',':
      id = "comma"
      break;
    case '.':
      id = "period"
      break;
    case ';':
      id = "semicolon"
      break;
    case "'":
      id = "apostrophe"
      break; 
    case '?':
      id = "f-slash"
      break;
    case '!':
      id = "1";
      break;
    default:
      id = character;
      break;
  }
  return id;
}


var swapKeyboardToSpecialValues = function () {
  keyboardSwappedToSpecialValues = true;
  var specialKeys = $('.symbol');
  for(var i = 0; i < specialKeys.length; i++) {
    var specialKey = specialKeys[i];
    var keyValue = specialKey.innerHTML;
    var newValue = mapToSpecialKeys[keyValue];
    specialKey.innerHTML = newValue;
  }
};

var swapKeyboardToOldValues = function () {
  if(keyboardSwappedToSpecialValues) {
    keyboardSwappedToSpecialValues = false;
    var specialKeys = $('.symbol');
    var normalKeys = returnBackToNormalKeys(mapToSpecialKeys);
    for(var i = 0; i < specialKeys.length; i++) {
      var specialKey = specialKeys[i];
      var keyValue = specialKey.innerHTML;
      var newValue = normalKeys[keyValue];
      specialKey.innerHTML = newValue;
    }
  }
};

var unHighlightPrevAndForwardKey = function (lines) {
  var i = findDifferenceIndex($('#missedword-input').val(), $('#missedword-display').val());
  var prevCharacter = $('#missedword-display').val().substring(i, i-1);
  var forwardCharacter = $('#missedword-display').val().substring(i+1, i+2);
  var id = convertCharToValidId(prevCharacter);
  var id2 = convertCharToValidId(forwardCharacter);
  if(id) {
    var keyToHighlight = $('#' + id);
    keyToHighlight.removeClass('active');
  }
  if(id2) {
    var keyToHighlight = $('#' + id2);
    keyToHighlight.removeClass('active');
  }
};

var unHighlightCurrentKey = function (lines) {
  var i = findDifferenceIndex($('#missedword-input').val(), $('#missedword-display').val());
  var currentCharacter = $('#missedword-display').val().substring(i, i+1);
  var id = convertCharToValidId(currentCharacter);
  if(id) {
    var keyToHighlight = $('#' + id);
    keyToHighlight.removeClass('active');
  }
};

var highlightCurrentKey = function () {
  var i = findDifferenceIndex($('#missedword-input').val(), $('#missedword-display').val());
  var currentCharacter = $('#missedword-display').val().substring(i, i+1);
  var id = convertCharToValidId(currentCharacter);
  if(id) {
    var keyToHighlight = $('#' + id);
    keyToHighlight.addClass('active');
  }
};

var highlightFinger = function () {
  var i = findDifferenceIndex($('#missedword-input').val(), $('#missedword-display').val());
  var currentCharacter = $('#missedword-display').val().substring(i, i+1);
  var id = currentCharacter;
  $('#outer').removeClass();
  if(id) {
    if(fingerHighlightMap[id]) {
      $('#outer').addClass(fingerHighlightMap[id]);
    }
  }
}
