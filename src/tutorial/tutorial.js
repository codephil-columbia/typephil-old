var tutorial = require(__dirname + '/tutorial/tutorialLessons.js');
var maxLines = 0;
var characterCounter = 0;
var totalErrors = 0;
var keyboardSwappedToSpecialValues = false;

var dbClient = require("./Model/dbClient.js");
var currentUser = dbClient.getCurrentUser();

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

$(document).ready(function () {
  $('#myModal').modal('show')
    .on('hide.bs.modal', function (e) {
      initTutorial();
    });

  $(this).keydown(function(e) {
    if(e.keyCode === 16) {
      if(keyboardSwappedToSpecialValues !== true)
        swapKeyboardToSpecialValues();
    }
  });

  $(this).keyup(function(e) {
    if(e.keyCode === 16 && keyboardSwappedToSpecialValues !== false) {
        swapKeyboardToOldValues();
    }
  });

  $(this).on('keypress', function(e) {
    swapKeyboardToOldValues();
    var tutorialLines = $('.screen').children();
    maxLines = tutorialLines.children().length;
    maxLines--;
    unHighlightPrevKey(tutorialLines);
    validateKeyPress(e.key, tutorialLines);
    highlightCurrentKey(tutorialLines);
    highlightFinger();
  })
});

var initTutorial = function()  {
  setTutorialContent();
  highlightFirstCharacter();
  highlightFirstKey();
  highlightFinger();
};

var showTutorialDebrief = function(totalErrors, totalCharacters) {
  $('#myModalDebrief').modal('show');

  var percentage = (characterCounter - totalErrors) / characterCounter;
  percentage = Math.round(percentage * 100);

  $('.percentage-correct').html(percentage + '%');
  $('.number-correct').html(characterCounter - totalErrors);
  $('.number-incorrect').html(totalErrors);

  shouldContinueToNextTutorial(percentage);
};

var shouldContinueToNextTutorial = function(percentage) {
  if(percentage >= 80) {
    $('.debrief-body').html('You passed, congratulations!');
    $('.debrief-button').bind('click', function() {
      var lessonTitle = $('#myModalLabel').html();
      var lessonDifficulty = $('#difficulty').html();
      unlockTutorial(lessonTitle, lessonDifficulty);
      route_tutorial_config();
    })
  } else {
    $('.debrief-body').html('Unfortunately, you did not achieve the 80% accuracy rate needed to pass. Try again from the tutorial menu.');
    $('.debrief-button').bind('click', function() {
      route_tutorial_config();
    })
  }
}

var unlockTutorial = function(tutorialName, difficulty) {
  var lessons = tutorial[difficulty].buttonDropDownLessons;
  var lessonIndex = lessons.indexOf(tutorialName);
  var nextDifficulty = "";

  lessonIndex++;
  if((lessons.length > lessonIndex) && !(currentUser.tutorial.completed[difficulty].includes(lessons[lessonIndex]))) {
    alert("You have unlocked the next tutorial! Access it from the tutorial menu.");
    currentUser.tutorial.completed[difficulty].push(lessons[lessonIndex]);
  } else {
    var difficulties = tutorial.modes;
    var difficultyIndex = difficulties.indexOf(difficulty);
    var equal = true;
    for (var i of lessons) {
      if (! currentUser.tutorial.completed[difficulty].includes(i)) {
        equal = false;
      }
    }
    if((difficulties.length - 1 >= (difficultyIndex + 1))) {
      if(equal && (currentUser.tutorial.completed[difficulties[difficultyIndex + 1]].length === 0)) {
        alert("You have unlocked a new difficulty level! Access it from the tutorial menu.");
        nextDifficulty = difficulties[difficultyIndex++];
        currentUser.tutorial.completed[nextDifficulty].push(tutorial[nextDifficulty].buttonDropDownLessons[0]);
      }
    }
    else if (!(lessons.length > lessonIndex)){
      alert("Congratulations, you have completed Tutorial Mode! You can continue to hone your typing skills through TypePhil's Typing Games! Access them from the Main Menu.");
    }
  }
  dbClient.saveUser(currentUser);
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

var validateKeyPress = function(keyPressed, lines) {
  if(maxLines > characterCounter) {
    var currentLine = lines.children();
    var currentCharacter = currentLine.eq(characterCounter);
    $("#lesson-content").scrollTop(currentCharacter.offset().top - currentCharacter.parent().parent().offset().top - currentCharacter.height());

    //Empty string in DOM is encoded as &nbsp;, so check for that case first
    if(keyPressed === " " || keyPressed == ",") {
      if(currentCharacter.html() === '&nbsp;') {
        currentCharacter.removeClass('active');
        currentCharacter.addClass('typed');
      } else if(currentCharacter.html() === ",") {
        currentCharacter.removeClass('active');
        currentCharacter.addClass('typed');
      } else {
        currentCharacter.removeClass('active');
        currentCharacter.addClass('typed');
        currentCharacter.addClass('error');
        totalErrors++;
      }
    } else {
      if (keyPressed === currentCharacter.html()) {
        currentCharacter.removeClass('active');
        currentCharacter.addClass('typed');
      } else {
        currentCharacter.removeClass('active');
        currentCharacter.addClass('typed');
        currentCharacter.addClass('error');
        totalErrors++;
      }
    }
    characterCounter++;
    currentLine.eq(characterCounter).addClass('active');
  } else {
    if ($('#myModal:visible').length == 0) {
      showTutorialDebrief(totalErrors, characterCounter);
    }
  }
};

var returnBackToNormalKeys = function (map) {
  var tmp = {};
  for(var key in map) {
    tmp[map[key]] = key;
  }
  return tmp;
};

var highlightFirstCharacter = function() {
  var currentLine = $('.screen').children().children();
  var currentCharacter = currentLine.eq(characterCounter);
  currentCharacter.addClass('active');
};

var highlightFirstKey = function () {
  var currentLine = $('.screen').children().children();
  var currentCharacter = currentLine.eq(characterCounter);
  var id = convertCharToValidId(currentCharacter.html());
  $('#' + id).addClass('active');
};

var highlightFinger = function () {
  var currentLine = $('.screen').children().children();
  var currentCharacter = currentLine.eq(characterCounter);
  var id = currentCharacter.html();
  $('#outer').removeClass();
  if(fingerHighlightMap[id]) {
    $('#outer').addClass(fingerHighlightMap[id]);
  }
}

var setTutorialContent = function()  {
  difficulty = $('#difficulty')[0].innerHTML;
  const lesson = $('#myModalLabel')[0].innerHTML;
  const lessonContent = tutorial[difficulty].lessons[lesson].lessonContent;
  setTutorialScreen(lessonContent);
};

var setTutorialScreen = function(lessonContent) {
  var lines = [];
  lessonContent.forEach(function(content) {
    var anchor = $('<div class="line"></div>');
    content.forEach(function(character) {
      for(var i = 0; i < character.length; i++) {
        var element = $('<span class="letter"></span>');
        if(character[i] !== " ") {
          element.html(character[i]);
        } else if(character[i] === " ") {
          element.html("&nbsp;")
        }
        anchor.append(element);
      }
    });
    lines.push(anchor);
  });
  lines.forEach(function(line) {
    $('.screen').append(line);
  })
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

var highlightCurrentKey = function (lines) {
  var currentLine = lines.children();
  var currentCharacter = currentLine.eq(characterCounter);
  var id = convertCharToValidId(currentCharacter.html());
  var keyToHighlight = $('#' + id);
  keyToHighlight.addClass('active');
};

var unHighlightPrevKey = function (lines) {
  var currentLine = lines.children();
  var currentCharacter = currentLine.eq(characterCounter);
  var id = convertCharToValidId(currentCharacter.html());
  var keyToHighlight = $('#' + id);
  keyToHighlight.removeClass('active');
};