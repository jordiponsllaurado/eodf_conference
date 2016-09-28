
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

function saveToList(event) {
	if (event.which == 13 || event.keyCode == 13) { // as the user presses the enter key, we will attempt to save the data
		var movieName = document.getElementById('movieName').value.trim();
		if (movieName.length > 0) {
			saveToFB(movieName);
		}
		document.getElementById('movieName').value = '';
		return false;
	}
};


function saveToFB(movieName) {
	// this will save data to Firebase
  	firebase.database().ref('movies/').push({ //movies/userID
    	movie: movieName
  	});
};