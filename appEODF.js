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

function transformResultsData(snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            game_1 = data[key].game_1 ? data[key].game_1 : 0;
            game_2 = data[key].game_2 ? data[key].game_2 : 0;
            game_3 = data[key].game_3 ? data[key].game_3 : 0;
            name = data[key].name ? data[key].name : '';
            list.push({
                    name: name,
                    game1: game_1,
                    game2: game_2,
                    game3: game_3
                })
        }
    }
    return list;
}

function drawChartA() {
    var results = firebase.database().ref('results/');
    results.on('value', function(snapshot) {
        var list = transformResultsData(snapshot);
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Game')
        data.addColumn('number', 'Game points');

        var lis = [];
        for (var i = 0; i < list.length; i++) {
            var value = [list[i].name, parseInt(list[i].game3)];
            lis.push(value);
        };
        data.addRows(lis);
        var options = {'title':'Game 3 Results'};
        var material =  new google.visualization.ColumnChart(document.getElementById('ChartA'));
        material.draw(data, options);
    });
}
google.load('visualization', '1', {packages:['corechart'], callback: drawChartA});

function drawTable() {
    var results = firebase.database().ref('results/');
    results.on('value', function(snapshot) {
        var list = transformResultsData(snapshot);
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Image');
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Surname');
        data.addColumn('number', 'Total points');

        var lis = [];
        console.log(list)
        for (var i = 0; i < list.length; i++) {
            var totalPoints = parseInt(list[i].game1) + parseInt(list[i].game2) + parseInt(list[i].game3);
            var value = ["<img src='guilty_cat.jpg' alt='Mark Otto' class='img-circle img-responsive' style='object-fit: cover; border-radius:50%;width:100px;height:100px;'/>", list[i].name, "Doe", totalPoints];
            lis.push(value);
        };
        data.addRows(lis);

        // Create a view that shows top 20
        var view = new google.visualization.DataView(data);
        view.setRows(view.getFilteredRows([{column: 0, maxValue: 20}]));
        view.setRows(data.getSortedRows({column: 3, desc: true}));


        var table = new google.visualization.Table(document.getElementById('ChartB'));
        table.draw(view, {showRowNumber: true, allowHtml: true, pageSize: 20, width: '100%', height: '100%'});
  });
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
