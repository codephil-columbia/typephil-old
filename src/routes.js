var path      = require('path');
var dbClient  = require('./Model/dbClient.js');
var ejs       = require('ejs');

var route_ejs = function(file_path, context) {
    var html = ejs.renderFile(file_path, context, {}, {}, function(err, str){
      console.log()
      document.open("text/html");
      document.write(str);
      document.close();
    });
}

/********** Start Screen and Log-In/ Sign-Up **********/

var route_start_screen = function() {
    route_ejs(path.join(__dirname, "/app.ejs"));
}

var go_to_signup = function() {
    route_ejs(path.join(__dirname, "/signup.ejs"));
}

var route_login = function(){
    event.preventDefault();
    var loginData = get_form_object("login");
    var username  = loginData.username;
    var password  = loginData.password;

    if (!dbClient.userExists(username)){
      alert("The username/password combination you entered does not match an existing TypePhil account. Please try again!");
      throw new Error("user doesn't exist");
    }

    if (dbClient.authenticateUser(username, password)){
      dbClient.setCurrentUser(username);
      route_main_menu();
    } else {
      alert("The username/password combination you entered does not match an existing TypePhil account. Please try again!");
      throw new Error("incorrect password");
    }
}

var route_signup = function(){
    event.preventDefault();
    var signupData = get_form_object("signup");
    var username   = signupData.username;
    var password   = signupData.password;

    if (!dbClient.userExists(username)){
      dbClient.storeUser(username, password);
      dbClient.setCurrentUser(username);
      alert("Welcome to TypePhil! Please record your username and password for future logins.");
      dbClient.setCurrentUser(username);
      route_main_menu();
    } else {
      alert("The username you have selected is unavailable. Please choose a different username to sign up.");
      go_to_signup();
    }
}

var route_password_recovery = function() {
  route_ejs(path.join(__dirname, '/recover_password.ejs'))
}

var validateAdmin = function() {
  event.preventDefault();
  var adminLogin = get_form_object('adminLogin');
  var username = adminLogin.adminUsername;
  var password = adminLogin.adminPassword;

  if(dbClient.authenticateAdmin(username, password)) {
    route_user_passwords();
  } else {
    alert('The admin username or password you entered was incorrect.');
    throw new Error("username/password does not exist");
  }
}

var route_user_passwords = function() {
  var users = dbClient.getAllUserPasswordPairs();
  var sortedUsers = sortUsers(users);

  route_ejs(path.join(__dirname, '/password-list.ejs'), { userList: sortedUsers });
}

var sortUsers = function(users) {
  var sortedUsers = {};
  var keysMap = Object.keys(users);
  var tmpArray = keysMap.sort();
  tmpArray.map(function(key) {
    var value = users[key];
    sortedUsers[key] = value;
  })
  return sortedUsers;
}

/********** Main Menu Navigation **********/

var route_main_menu = function() {
    route_ejs(path.join(__dirname, '/main_menu.ejs'), { user : dbClient.getCurrentUser() });
}

var route_game = function() {
    route_ejs(path.join(__dirname, '/game', '/game.ejs'), { user : dbClient.getCurrentUser() });
}

var route_summary = function() {
    route_ejs(path.join(__dirname, '/summary.ejs'), { user : dbClient.getCurrentUser() });
}

var route_notepad = function() {
    route_ejs(path.join(__dirname, '/notepad.ejs'), { user : dbClient.getCurrentUser() });
}

/********** Tutorial Routes **********/

var tutorialConfig = require('./tutorial/tutorialLessons');

var route_tutorial_config = function () {
  route_ejs(path.join(__dirname, '/tutorial', '/tutorialConfig.ejs'), { user : dbClient.getCurrentUser(), config: tutorialConfig, dbClient: dbClient });
};

var route_tutorial_debrief = function(lesson, diff) {
  route_ejs(path.join(__dirname, '/tutorial', '/tutorial.ejs'),
    { 
      currentUser: dbClient.getCurrentUser(),
      debriefMessage: tutorialConfig[diff].lessons[lesson].debriefMessage, 
      title: lesson, 
      lesson: tutorialConfig[diff].lessons[lesson].lessonContent, 
      diff: diff
    })
};

/********** Challenge Routes **********/

var route_challenge = function() {
  route_ejs(path.join(__dirname, '/game', '/challenge', '/challenge.ejs'), { user: dbClient.getCurrentUser() })
}

var route_config_challenge = function() {
  route_ejs(path.join(__dirname, '/game', '/challenge', '/challengeConfig.ejs'), { user: dbClient.getCurrentUser() })
}

/********** SpaceRace Routes **********/

var route_spacerace = function() {
  route_ejs(path.join(__dirname, '/game', '/spacerace', '/spacerace.ejs'), { user: dbClient.getCurrentUser() })
}

var route_config_spacerace = function() {
  route_ejs(path.join(__dirname, '/game', '/spacerace', '/spaceraceConfig.ejs'), { user: dbClient.getCurrentUser() })
}

/********** TypeRacer Routes **********/

var route_typeracer = function() {
  route_ejs(path.join(__dirname, '/game', '/typeracer', '/typeracer.ejs'), { user: dbClient.getCurrentUser() })
}

var route_config_typeracer = function() {
  route_ejs(path.join(__dirname, '/game', '/typeracer', '/typeracerConfig.ejs'), { user: dbClient.getCurrentUser() })
}


/********** General Functions **********/

var get_form_object = function(formId){
    var obj = {};
    var elements = document.getElementById(formId).elements

    for(var i = 0, element; element = elements[i++];){
      obj[element.name] = element.value;
    }

    return obj;
}
