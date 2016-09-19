// Steps to complete:
/*
1. Create Firebase link
2. Create button for adding new trains - then update the html + update the database
3. Create a way to retrieve trains from the employee database.
4. Create a way to calculate the next arrival and minutes away time. Using difference between start and current time. Then use moment.js formatting to set difference in minutes
*/
// 1. Link to Firebase
  var config = {
    apiKey: "AIzaSyBYZF9LQJ0oeZrwsbd_buYJK6MUK1KHSHg",
    authDomain: "stfirebaseproject-4d75d.firebaseapp.com",
    databaseURL: "https://stfirebaseproject-4d75d.firebaseio.com",
    storageBucket: "stfirebaseproject-4d75d.appspot.com",
  };

  // Initialize Firebase
  firebase.initializeApp(config);

// 1. Link to Firebase
// var trainData = new Firebase("https://stfirebaseproject-4d75d.firebaseio.com/");

	var database = firebase.database();

// Variables
	// Update HTML table with user inputs & initial time related values
	var tName;
	var tDesti;
	var tFreq = 10;
	var firstTime = "3:30";

	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	// Current Time
	var currentTime = moment().format ("LT");
	// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % tFreq;
	console.log(tRemainder);

	// Minute Until Train
	var tMinutesTillTrain = tFreq - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


// 2. Functions
//    Button for adding trains
$("#addTrainBtn").on("click", function(){

	// Get user inputs
	tName = $("#inputTrain").val().trim();
	tDesti = $("#inputDestination").val().trim();
	firstTime =  "12:00"; //moment($("#inputStartTime").val().trim());
	tFreq = $("#inputFrequency").val().trim();

	// Create local "temporary" object for holding train data
	var newTrain = {
		train:  tName,
		destination: tDesti,
		time: firstTime,
		frequency: tFreq,
	};

	// $("#inputTrain").html(tName);
	// $("#inputDestination").html(tDesti);	
	// $("#trainStartTime").html(firstTime);	
	// $("#inputFrequency").html(tFreq);



	// Upload train data to the database
	firebase.database().ref().push(newTrain);

	// Logs everything to console
	console.log(newTrain.train);
	console.log(newTrain.destination);
	console.log(newTrain.time);
	console.log(newTrain.frequency);

	// Clears all of the text-boxes
	$("#inputTrain").val("");
	$("#inputDestination").val("");
	$("#inputStartTime").val("");
	$("#inputFrequency").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log("childSnapshot=",childSnapshot.val());

	// Store everything into a variable.
	var tName = childSnapshot.val().train;
	var tDesti = childSnapshot.val().destination;
	var firstTime = childSnapshot.val().time;
	var tFreq = childSnapshot.val().frequency;

	// Train Info
	console.log(tName);
	console.log(tDesti);
	console.log(firstTime);
	console.log(tFreq);

	var trainRow = "<td>" + tName + "</td>" + "<td>" + tDesti + "</td>" + "<td>" + firstTime + "</td>" + "<td>" + tFreq + "</td>" + "<td>" + tMinutesTillTrain + "</td>";
	// $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destiName + "</td><td>" + freqMin + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

	var newRow = $('<tr>').html(trainRow);
   	$("#trainTable").append(newRow);


   	database.ref("addTrainBtn").set(null);

});  //end database call
	
	



