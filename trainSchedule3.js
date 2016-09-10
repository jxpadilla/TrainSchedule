// Steps to complete:
/*
1. Create Firebase link
2. Create button for adding new trains - then update the html + update the database
3. Create a way to retrieve trains from the employee database.
4. Create a way to calculate the next arrival and minutes away time. Using difference between start and current time. Then use moment.js formatting to set difference in minutes
*/
// 1. Link to Firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBYZF9LQJ0oeZrwsbd_buYJK6MUK1KHSHg",
    authDomain: "stfirebaseproject-4d75d.firebaseapp.com",
    databaseURL: "https://stfirebaseproject-4d75d.firebaseio.com",
    storageBucket: "stfirebaseproject-4d75d.appspot.com",
  };
  firebase.initializeApp(config);

// 1. Link to Firebase
// var trainData = new Firebase("https://stfirebaseproject-4d75d.firebaseio.com/");

var database = firebase.database();
var trainName, destiName, trainStart, freqMin;
// 2. Button for adding trains
$("#addTrainBtn").on("click", function(){

	// Get user input
	var trainName = $("#inputTrain").val().trim();
	var destiName = $("#inputDestination").val().trim();
	var trainStart = moment($("#inputStartTime").val().trim().format("hh:mm:ss"));
	var freqMin = $("#inputFrequency").val().trim();

	// Create local "temporary" object for holding train data
	var newTrain = {
		name:  trainName,
		destination: destiName,
		start: trainStart,
		frequency: freqMin
		// created: firebase.database.ServerValue.TIMESTAMP,
		// modified: firebase.database.ServerValue.TIMESTAMP
	};

	$(#inputTrain).html(trainName);
	$(#inputDestination).html(destiName);	
	$(#trainStartTime).html(trainStart);	
	$(#inputFrequency).html(freqMin);



	// Upload train data to the database
	firebase.database.().ref().push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.start);
	console.log(newTrain.frequency);

	// Alert
	alert("Train successfully added");	

	// Clears all of the text-boxes
	$("#inputTrain").val("");
	$("#inputDestination").val("");
	$("#inputStartTime").val("");
	$("#inputFrequency").val("");

	// Determine when the next train arrives.
	return false;	

});


// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var destiName = childSnapshot.val().destination;
	var trainStart = childSnapshot.val().start;
	var freqMin = childSnapshot.val().frequency;

	// Train Info
	console.log(trainName);
	console.log(destiName);
	console.log(trainStart);
	console.log(freqMin);

	// Prettify the train start
	// To calculate the next arrival
 //  var todaysDate = moment();
	// var nextArrival = todaysDate.diff(oldStart, "minutes");
	// console.log('Minutes: ' + trainMinutes);

	// // To calculate the minutes away
	// var minutesAway = trainMinutes * freqMin;
	// console.log(minutesAway);

	// // Add each train's data into the table

	var newTrain = "<td>" + trainName + "</td>" + "<td>" + destiName + "</td>" + "<td>" + trainStart + "</td>" + "<td>" + freqMin + "</td>" + "<td>" + trainMinutes + "</td>"
	// $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destiName + "</td><td>" + freqMin + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");


	var newRow = $("<tr>").append(newTrain);
   	$("#trainTable").append(newRow);
   	
   	return false;

});


// Example Time Math
// -----------------------------------------------------------------------------
// Assume train start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
