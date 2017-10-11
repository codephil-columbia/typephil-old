var db = require('./Model/dbClient.js');
var editedUsers = new Set();

var editPassword = function() {
	var selectedPasswordCell = $(event.srcElement);
	var correspondingUsernameCell = getUsernameCell(selectedPasswordCell);
	var editablePasswordCell = makeCellEditable(selectedPasswordCell);
	var username = extractCellInfo(correspondingUsernameCell);

	editedUsers.add(username);
}

var makeCellEditable = function(cell) {
	cell.prop('contenteditable', true);
	return cell;
}

var getUsernameCell = function(selectedPasswordCell) {
	return selectedPasswordCell.prev();
}

var extractCellInfo = function(cell) {
	return fixedEncodeURIComponent(cell.text());
}

function fixedEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, escape);
}

var updateUserPassword = function() {
	var table = $('.table-body');
	var rows = table.find('tr').each(function() {
		var row = this;
		var cells = row.cells;
		if(cells.length != 0) {
			if(editedUsers.has(cells[0].textContent)) {
				submitNewUserInfo(cells);
			}
		}
	})
	alert('Your updates have been saved!');
}

var submitNewUserInfo = function(cells) {
	var usernameCellValue = cells[0].textContent;
	var passwordCellValue = cells[1].textContent;

	dispatchDbUpdate(usernameCellValue, passwordCellValue);
}

var dispatchDbUpdate = function(username, password) {
	db.updateUserPassword(username, password);
}

function searchUsernames() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("tableSearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("password-table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}