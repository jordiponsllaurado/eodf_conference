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
            surname = data[key].surname ? data[key].surname : '';
            country = data[key].country ? data[key].country : '';
            image = data[key].image ? data[key].image : '';
            list.push({
                    name: name,
                    surname: surname,
                    country: country,
                    game1: game_1,
                    game2: game_2,
                    game3: game_3,
                    image: image
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
        data.addColumn('number', 'Played');
        data.addColumn('number', 'Total players');

        var lis = [];
        var game1 = 0;
        var game2 = 0;
        var game3 = 0;
        for (var i = 0; i < list.length; i++) {
            if (list[i].game1 != 0) ++game1;
            if (list[i].game2 != 0) ++game2;
            if (list[i].game3 != 0) ++game3;
        };
        var value1 = ["Game 1", game1, list.length];
        lis.push(value1);
        var value2 = ["Game 2", game2, list.length];
        lis.push(value2);
        var value3 = ["Game 3", game3, list.length];
        lis.push(value3);
        data.addRows(lis);
        var options = {'title':'Games'};
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
        for (var i = 0; i < list.length; i++) {
            var totalPoints = parseInt(list[i].game1) + parseInt(list[i].game2) + parseInt(list[i].game3);
            var value = ["<img src='images/" + list[i].image + ".jpg' alt='images/default.jpg' " + list[i].surname + "' class='img-circle img-responsive' style='object-fit: cover; border-radius:50%;width:50px;height:50px;'/>", list[i].name, list[i].surname, totalPoints];
            lis.push(value);
        };
        data.addRows(lis);

        // Create a view that shows top 20
        var view = new google.visualization.DataView(data);
        view.setRows(view.getFilteredRows([{column: 0, maxValue: 20}]));
        view.setRows(data.getSortedRows({column: 3, desc: true}));


        var table = new google.visualization.Table(document.getElementById('ChartB'));
        table.draw(view, {showRowNumber: true, allowHtml: true, pageSize: 10, width: '100%', height: '100%'});
  });
}
google.load('visualization', '1', {packages:['table'], callback: drawTable});


function drawChartC() {
    var results = firebase.database().ref('results/');
    results.on('value', function(snapshot) {
        var list = transformResultsData(snapshot);

        var dictionary = {};
        for (var i = 0; i < list.length; i++) {
            var country = list[i].country;
            if (country in dictionary) dictionary[country] = dictionary[country] + 1;
            else dictionary[country] = dictionary[country] = 1;
        };
        var lis = [['Country', 'Attendees'],];
        for (var i in dictionary) {
            var country = [];
            country.push(i);
            country.push(dictionary[i]);
            lis.push(country);
        }
        var data = google.visualization.arrayToDataTable(lis);

        var options = {width: '100%', height: '100%'};

        var chart = new google.visualization.GeoChart(document.getElementById('ChartC'));

        chart.draw(data, options);
    });
}
google.load('visualization', '1', {packages:['geochart'], callback: drawChartC});


var title = setInterval(function() {
    var text = '';
    if (document.getElementById('title').innerHTML.indexOf('<h1>#EODF16</h1>') != -1) {
        text = '<h1>#SparklingGames</h1>';
    } else {
        text = '<h1>#EODF16</h1>';
    }
    document.getElementById('title').innerHTML = text;
}, 5000);

// Tab Pane continue moving
var tabCarousel = setInterval(function() {
    var tabs = $('.nav-tabs > li'),
    active = tabs.filter('.active'),
    next = active.next('li'),
    toClick = next.length ? next.find('a') : tabs.eq(0).find('a');
    toClick.trigger('click');
}, 5000);
