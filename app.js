
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDwzNPvrlIkLNXsjHSkiD23ZpsaZzVYLnk",
  authDomain: "eodftest.firebaseapp.com",
  databaseURL: "https://eodftest.firebaseio.com",
  storageBucket: "eodftest.appspot.com",
  messagingSenderId: "791815518792"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

firebase.auth().signInWithEmailAndPassword("test@gmail.com", "adminadmin").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);


function saveToList(event) {
	if (event.which == 13 || event.keyCode == 13) { // as the user presses the enter key, we will attempt to save the data
		var inputValue = document.getElementById('inputValue').value.trim();
		if (inputValue.length > 0) {
			saveToFB(inputValue);
		}
		document.getElementById('inputValue').value = '';
		return false;
	}
};

function saveToFB(inputValue) {
  // this will save data to Firebase
  firebase.database().ref('results/').push({
    result: inputValue
  });
};

function refreshUI(list) {
   var lis = '';
   for (var i = 0; i < list.length; i++) {
       lis += '<tr data-key="' + list[i].key + '"><td>' + list[i].game + '</td><td>' + list[i].number + '</td></tr>';
   };
  document.getElementById('tableValues').innerHTML = lis;
};

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart(list) {

  // Create the data table.
  var data = new google.visualization.DataTable();
  var lis = [];
  for (var i = 0; i < list.length; i++) {
    var value = [list[i].game, parseInt(list[i].number, 10)];
    lis.push(value);
  };

  data.addColumn('string', 'Game');
  data.addColumn('number', 'Pass');
  data.addRows(lis);

  // Set chart options
  var options = {'title':'Games',
                 'width':400,
                 'height':300};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
};


function getFromFB() {
  var results = firebase.database().ref('results/');
  results.on('value', function(snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
          number = data[key].result ? data[key].result : '';
          game = data[key].game ? data[key].game : '';
          if (number.trim().length > 0) {
              list.push({
                  number: number,
                  game: game,
                  key: key
              })
          }
      }
    }
    // refresh the UI
    refreshUI(list);
    drawChart(list);
  });
};

getFromFB();