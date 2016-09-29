
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
/*function drawChart(list) {

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
  var options = {'title':'Games', 'width':400, 'height':300};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);

  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses', 'Profit'],
    ['2014', 1000, 400, 200],
    ['2015', 1170, 460, 250],
    ['2016', 660, 1120, 300],
    ['2017', 1030, 540, 350]
  ]);

  var options2 = {
    chart: {
      title: 'Company Performance',
      subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    }
  };

  var barchart = new google.charts.Bar(document.getElementById('columnchart_material'));

  barchart.draw(data, options2);
};*/

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

  var piechart_options = {'title':'Pie Chart: How Much Pizza I Ate Last Night',
                 'width':400,
                 'height':300};

  var piechart = new google.visualization.PieChart(document.getElementById('piechart_div'));
  piechart.draw(data, piechart_options);

  var barchart_options = {'title':'Barchart: How Much Pizza I Ate Last Night',
                 'width':400,
                 'height':300,
                 'legend': 'none'};
  var barchart = new google.visualization.BarChart(document.getElementById('barchart_div'));
  barchart.draw(data, barchart_options);
}

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