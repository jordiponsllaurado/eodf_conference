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
  var results = firebase.database().ref('results/');
  results.on('value', function(snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
          game_3 = data[key].game_3 ? data[key].game_3 : '';
          name = data[key].name ? data[key].name : '';
          list.push({
                  name: name,
                  game: game_3,
              })
      }
    }

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Game')
    data.addColumn('number', 'Game points');
    //data.addColumn('number', 'Total');

    var lis = [];
    for (var i = 0; i < list.length; i++) {
      //var value = ["Game 3", parseInt(list[i]), 85];
      var value = [list[i].name, parseInt(list[i].game)];
      lis.push(value);
    };
    data.addRows(lis);
    var options = {'title':'Game 3 Results'};
    //var material = new google.charts.Bar(document.getElementById('ChartA'));
    var material =  new google.visualization.ColumnChart(document.getElementById('ChartA'));
    material.draw(data, options);
  });
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
