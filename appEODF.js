
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDzVFtqSeQBld5UoPtTARd4htrf3WqZVj4",
  authDomain: "eodf-5abd7.firebaseapp.com",
  databaseURL: "https://eodf-5abd7.firebaseio.com",
  storageBucket: "eodf-5abd7.appspot.com",
  messagingSenderId: "939762145540"
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

function drawChart() {

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['Mushrooms', 3],
    ['Onions', 1],
    ['Olives', 1],
    ['Zucchini', 1],
    ['Pepperoni', 2]
  ]);

  var piechart_options = {title:'Games', width:400, height:300};
  var piechart = new google.visualization.PieChart(document.getElementById('piechart_div'));
  var piechart = new google.visualization.PieChart(document.getElementById('piechart_div'));
  piechart.draw(data, piechart_options);

  var barchart_options = {title:'Barchart: How Much Pizza I Ate Last Night',
                 width:400,
                 height:300,
                 legend: 'none'};
  var barchart = new google.visualization.BarChart(document.getElementById('barchart_div'));
  barchart.draw(data, barchart_options);
}
