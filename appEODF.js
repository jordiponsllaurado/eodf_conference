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

        var lis = [];
        for (var i = 0; i < list.length; i++) {
            var value = [list[i].name, parseInt(list[i].game)];
            lis.push(value);
        };
        data.addRows(lis);
        var options = {'title':'Game 3 Results'};
        var material =  new google.visualization.ColumnChart(document.getElementById('ChartA'));
        material.draw(data, options);
    });
}
google.load('visualization', '1', {packages:['corechart'], callback: drawChartA});

/*function drawTable() {
    var name = "Mark"
    var surname = "Otto"
    var lis = '';
    lis = "<tr><th scope=`row`>1</th><td><img src=`" + name.toLowerCase() + "_" + surname.toLowerCase() + ".jpg` alt=`" + name + " " + surname +"` class=`img-circle img-responsive`></td><td>" + name + "</td><td>" + surname + "</td></tr>"
    document.getElementById('tableValues').innerHTML = lis;
}
$("a[href='#B']").on('shown.bs.tab', function (e) {
    drawTable
});*/

function drawTable() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Image');
  data.addColumn('string', 'Name');
  data.addColumn('string', 'Surname');
  data.addRows([
    ["<img src='guilty_cat.jpg' alt='Mark Otto' class='img-circle img-responsive' style='object-fit: cover; border-radius:50%;width:100px;height:100px;'/>", 'Mike',  'Doe'],
    ["<img src='guilty_cat.jpg' alt='Mark Otto' class='img-circle img-responsive' style='object-fit: cover; border-radius:50%;width:100px;height:100px;'/>", 'Jim',   'Doe'],
    ["<img src='guilty_cat.jpg' alt='Mark Otto' class='img-circle img-responsive' style='object-fit: cover; border-radius:50%;width:100px;height:100px;'/>", 'Alice', 'Doe'],
    ["<img src='guilty_cat.jpg' alt='Mark Otto' class='img-circle img-responsive' style='object-fit: cover; border-radius:50%;width:100px;height:100px;'/>", 'Bob',   'Doe']
  ]);

  var table = new google.visualization.Table(document.getElementById('ChartB'));

  table.draw(data, {showRowNumber: true, allowHtml: true, width: '100%', height: '100%'});
}
google.load('visualization', '1', {packages:['table'], callback: drawTable});


function drawChartC() {
    var data = google.visualization.arrayToDataTable([
        ['Country', 'Popularity'],
        ['Germany', 200],
        ['United States', 300],
        ['Brazil', 400],
        ['Canada', 500],
        ['France', 600],
        ['RU', 700]
    ]);

    var options = {};

    var chart = new google.visualization.GeoChart(document.getElementById('ChartC'));

    chart.draw(data, options);
}
google.load('visualization', '1', {packages:['geochart'], callback: drawChartC});

// Tab Pane continue moving
/*var tabCarousel = setInterval(function() {
    var tabs = $('.nav-tabs > li'),
    active = tabs.filter('.active'),
    next = active.next('li'),
    toClick = next.length ? next.find('a') : tabs.eq(0).find('a');
    toClick.trigger('click');
}, 5000);*/
