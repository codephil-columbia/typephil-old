var difficulties = ["Beginner", "Intermediate", "Advanced"];

$(document).ready(function() {
  var dropdownContent = $('.btn-group');
  iterateAndValidateTutorials(dropdownContent);
})

var iterateAndValidateTutorials = function(dropdownContent) {
  var userTutorialModeMetadata = user.tutorial.completed;
  var buttons = dropdownContent.children();
  var completedLessons = {};

  for(var i = 0; i < buttons.length; i+=2 ) {
    var difficulty = $(buttons[i]).text().trim();
    var lessons = $(buttons[i+1]);

    completedLessons[difficulty] = { completed: new Set(), diff: difficulty };

    var lessonsList = lessons.children();
    
    for(var j = 0; j < lessonsList.length; j++) {
      var lesson = $(lessonsList[j]);
      var lessonName = lesson.text();
      if(userTutorialModeMetadata[difficulty].includes(lessonName)) {
        completedLessons[difficulty].completed.add(lessonName);
      }
    }
  }
  lockUnfinishedTutorials(completedLessons);
}

var lockUnfinishedTutorials = function(completedLessons) {
  var lessons = $('.lessonTitle');
  lessons.each(function(i) {
    var lesson = lessons[i];
    var lessonTitle = $(lesson).text();
    var diff = $(lesson).data('diff');
    console.log(diff);
    if(!completedLessons[diff].completed.has(lessonTitle)) {
      $(lesson).addClass('disabled');
    }
  })
}