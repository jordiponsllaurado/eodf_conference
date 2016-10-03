$('#myCarousel').carousel();

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

function drawChartA() {
    var data = new google.visualization.DataTable();
      data.addColumn('timeofday', 'Time of Day');
      data.addColumn('number', 'Played');
      data.addColumn('number', 'Total Gamers');

      data.addRows([  
        [{v: [15, 0, 0], f: '3 pm'}, 8, 5.25],
        [{v: [16, 0, 0], f: '4 pm'}, 9, 7.5],
        [{v: [17, 0, 0], f: '5 pm'}, 10, 10],
      ]);

      var options = {
        chart: {
          title: 'Motivation and Energy Level Throughout the Day',
          subtitle: 'Based on a scale of 1 to 10'
        },
        axes: {
          x: {
            0: {side: 'top'}
          }
        },
        hAxis: {
          title: 'Time of Day',
          format: 'h:mm a',
          viewWindow: {
            min: [7, 30, 0],
            max: [17, 30, 0]
          }
        },
        vAxis: {
          title: 'Rating (scale of 1-10)'
        }
      };

      var material = new google.charts.Bar(document.getElementById('ChartA'));
      material.draw(data, options);
}
google.load('visualization', '1', {packages:['corechart'], callback: drawChartA});

function drawChartB() {
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

  var barchart_options = {title:'Barchart: How Much Pizza I Ate Last Night',width:400,height:300,legend: 'none'};
  var barchart = new google.visualization.BarChart(document.getElementById('ChartB'));
  barchart.draw(data, barchart_options);
}
google.load('visualization', '1', {packages:['corechart', 'bar'], callback: drawChartB});


$("a[href='#1']").on('shown.bs.tab', function (e) {
    google.load('visualization', '1', {
        packages: ['timeline'],
        callback: drawChart
    });
});

$("a[href='#2']").on('shown.bs.tab', function (e) {
    google.load('visualization', '1', {
        packages: ['timeline'],
        callback: drawChartA
    });
});

$("a[href='#3']").on('shown.bs.tab', function (e) {
    google.load('visualization', '1', {
        packages: ['timeline'],
        callback: drawChartC
    });
});

// Tab Pane continue moving
    var tabCarousel = setInterval(function() {
      var tabs = $('.nav-tabs > li'),
          active = tabs.filter('.active'),
          next = active.next('li'),
          toClick = next.length ? next.find('a') : tabs.eq(0).find('a');

      toClick.trigger('click');
  }, 5000);
