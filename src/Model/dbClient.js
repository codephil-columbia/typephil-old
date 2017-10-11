var pw = require('password-hash');

var dbClient = function(){
  var client = Object.create(dbClient);

  store('tpAdmin', { password: 'tpAdmin', username: 'tpAdmin' });

  client.updateUserPassword = function(username, newPassword) {
    var user = get(username);
    console.log('extracted', user);
    console.log('removing user', username);
    localStorage.removeItem(username);

    user.password = newPassword;
    console.log('storing user', user);
    store(username, user);
  }

  client.authenticateAdmin = function(adminUsername, adminPassword) {
    return verify(adminPassword, get(adminUsername).password);
  }

  client.authenticateUser = function(username, password){
    return verify(password, get(username).password)
  }

  client.getAllUserPasswordPairs = function() {
    var userObjects = {};

    for(var key in localStorage) {
      var user = JSON.parse(localStorage.getItem(key));
      var username = user.username;
      var password = user.password;
      userObjects[username] = password;
    }

    return userObjects;
  }

  client.storeUser = function(username, password){
    store(username, { 
      password : password,
      username : username,
      language : "English",
      challenge: { score     : { easy: { wpm: 0, streak: 0}, medium: { wpm: 0, streak: 0}, hard: { wpm: 0, streak: 0} }, difficulty: null, language: null },
      tutorial : { completed: { Beginner: ["J, F, and Space"], Intermediate: [], Advanced: [] } },
      spacerace     : { score     : { easy: { wpm: 0, points: 0}, medium: { wpm: 0, points: 0}, hard: { wpm: 0, points: 0} }, difficulty: null, language: null },
      typeracer     : { score     : { easy: { wpm: 0, wins: 0, losses: 0}, medium: { wpm: 0, wins: 0, losses: 0}, hard: { wpm: 0, wins: 0, losses: 0} }, difficulty: null, language: null, car_color: 'red'},
      notepad: ""
    }); 
  }

  client.setCurrentUser = function(username){
    store("CURRENT_USER", get(username));
  }

  client.getCurrentUser = function(){
    return get("CURRENT_USER");
  }

  client.userExists = function(username){
    return get(username) !== null;
  }

  client.getUserAttributes = function(username){
    return get(username)
  }

  client.setUserAttribute = function(username, key, val){
    var user = get(username);
    user[key] = val;
    store(username, user);
  }

  client.saveUser = function(user){
    store(user.username, user);
    // propagate the update to the current user as well.
    if (client.getCurrentUser().username === user.username){
      store("CURRENT_USER", get(user.username));
    }
  }

  Object.freeze(client);
  return client;
}

var verify = function(a, b) {
  if(a === b) {
    return true;
  } else {
    return false;
  }
}

var store = function(key, val){
  localStorage.setItem(key, JSON.stringify(val))
}

var get = function(key){
  return JSON.parse(localStorage.getItem(key));
}

var db = dbClient();
module.exports = db;
