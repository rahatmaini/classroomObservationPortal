/**
 * 
 */
var hasStarted = false;
var itimer = 30;
var myInterval;
var delay;

function setAllDefaultValues() {
	hasStarted = false;
	var inputs = document.getElementsByClassName("quadrant");
	for (var i = 0; i < inputs.length; i++) {
	    inputs[i].style.display = "flex";
	}
	inputs = document.getElementsByClassName("quadrant_inputs");
	for (var i = 0; i < inputs.length; i++) {
	    inputs[i].style.display = "none";
	}
	// Reset forms
	inputs = document.getElementsByTagName("FORM");
	for (var i = 0; i < inputs.length; i++) {
	    inputs[i].reset();
	}
	// Disable checkboxes and other inputs other than the increment buttons
	inputs = document.getElementsByTagName("INPUT");
	for (var i = 0; i < inputs.length; i++) {
		if(inputs[i].className != "inS" && inputs[i].className != "inS_text")
			inputs[i].disabled = true;
	}
	
	inputs = document.getElementsByClassName("increment_stud");
	for (var i = 0; i < inputs.length; i++) {
	    inputs[i].style.display = "grid";
	}
	
	inputs = document.getElementById("timer");
	inputs.innerHTML = "";
	
	var startButton = document.getElementById("start_button");
	startButton.innerHTML = "<span class='ti-control-play' style='vertical-align: -2px'></span>";
	startButton.className="pulse-button"
	startButton.style.backgroundColor = "";
}

function start_or_stop() {
	if(!hasStarted){
		hasStarted = true;
		
		var modal = document.getElementsByClassName("modal-body");
		var content = document.createTextNode("Observation Started.");
		var br = document.createElement("br");
		date = new Date();
		var timeStamp = document.createTextNode("[" + twoDigits(date.getHours()) + ":" + twoDigits(date.getMinutes()) + ":" + twoDigits(date.getSeconds()) + "] ");
		modal[0].appendChild(timeStamp);
		modal[0].appendChild(content);
		modal[0].appendChild(br);
		
		var inputs = document.getElementsByTagName("INPUT");
		for (var i = 0; i < inputs.length; i++) {
			if(inputs[i].className != "inS" && inputs[i].className != "inS_text")
				inputs[i].disabled = false;
		}
		
		var startButton = document.getElementById("start_button");
		if (startButton.className=="pulse-button") startButton.className="circularButton";
		startButton.innerHTML = "<span class='ti-control-stop' style='vertical-align: -2px'></span>";
		startButton.style.backgroundColor = "red";
		myInterval = setInterval(runIntervalTimer, 1000);
	}
	else {
		reload();
	}
}

function reload() {
	setAllDefaultValues();
	var myNode = document.getElementsByClassName("modal-body");
	while (myNode[0].firstChild) {
	    myNode[0].removeChild(myNode[0].firstChild);
	}
	clearInterval(myInterval);
	itimer = 30;
}

/*function setAllDefaultValues() {
	var inputs = document.getElementsByClassName("quadrant");
	for (var i = 0; i < inputs.length; i++) {
	    inputs[i].style.display = "flex";
	}
	inputs = document.getElementsByClassName("quadrant_inputs");
	for (var i = 0; i < inputs.length; i++) {
	    inputs[i].style.display = "none";
	}
	
	inputs = document.getElementsByTagName("FORM");
	for (var i = 0; i < inputs.length; i++) {
	    inputs[i].reset();
	}
	
	inputs = document.getElementsByClassName("increment_stud");
	for (var i = 0; i < inputs.length; i++) {
	    inputs[i].style.display = "grid";
	}
}*/

function dataToFeed(event, obj) {
	if(hasStarted){
		var myNode = document.getElementsByClassName("fadingFeed");
		while (myNode[0].firstChild) {
	    myNode[0].removeChild(myNode[0].firstChild);
	}
	    $(".fadingFeed").fadeIn()
		var modal = document.getElementsByClassName("modal-body");
		var notification = document.getElementsByClassName("fadingFeed");
		var content = document.createTextNode(obj.textContent);
		var notificationContent = document.createTextNode(obj.textContent);
		var br = document.createElement("br");
		date = new Date();
		var timeStamp = document.createTextNode("[" + twoDigits(date.getHours()) + ":" + twoDigits(date.getMinutes()) + ":" + twoDigits(date.getSeconds()) + "] ");
		modal[0].appendChild(timeStamp);
		modal[0].appendChild(content);
		modal[0].appendChild(br);
		notification[0].appendChild(notificationContent);
		$(".fadingFeed").delay(2000).fadeOut()
		
		//openFeed(event);
	}
}


function openFeed(event) 
{
	// Get the modal
	clearTimeout(delay);
	var modal = document.getElementById('feed');
	// Get the button that opens the modal
	var btn = document.getElementById("feed_button");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	var displaySetting = modal.style.display;
	// When the user clicks the button, open the modal 
	//btn.onclick = function() {
		modal.style.display = "block";
	//}
	// When the user clicks on <span> (x), close the modal
	//span.onclick = function() {
		//modal.style.display = "none";
	//}

	// When the user clicks anywhere outside of the modal, close it
	/*if(displaySetting == "block"){
		window.onclick = function(event) {
		//if (event.target == modal) {
			modal.style.display = "none";
		//}
		}
	}
	else {
		modal.style.display = "block";
	}*/
	updateScroll();
	console.log(event.toElement.tagName);
	if(event.toElement.tagName != "SPAN" && event.toElement.tagName != "BUTTON")
		delay = setTimeout(function(){ modal.style.display = "none"; }, 3000);
	event.stopPropagation();
	
}

function runIntervalTimer() {
	if(hasStarted){
		var min = Math.floor(itimer / 60);
		var sec = twoDigits(itimer % 60);
		document.getElementById("timer").innerHTML = "";
		if(itimer <= 100 && itimer != 0)
			document.getElementById("timer").innerHTML = "Next in: " + min + ":" + sec;
		if(itimer == 0){
			/* Submit interval readings every time timer reaches 0*/
			intervalSubmit();
			document.getElementById("timer").innerHTML = "Interval submitted!";
			itimer = 30;
		}
		else {
			itimer = itimer -1;
		}
	}
}

window.onclick = function(event) {
	//if (event.target == modal) {
		var modal = document.getElementById('feed');
		modal.style.display = "none";
		
	//}
}

function updateScroll(){
    var element = document.getElementsByClassName("modal-body");
    element[0].scrollTop = element[0].scrollHeight;
}

function twoDigits(x) {
	return ("0" + x).slice(-2);
}

function intervalSubmit() {
	var intForm = document.getElementById("interval_readings_form");
	intForm.submit();
	intForm.reset();
	
	var modal = document.getElementsByClassName("modal-body");
	var content = document.createTextNode("Interval submitted.");
	var br = document.createElement("br");
	date = new Date();
	var timeStamp = document.createTextNode("[" + twoDigits(date.getHours()) + ":" + twoDigits(date.getMinutes()) + ":" + twoDigits(date.getSeconds()) + "] ");
	modal[0].appendChild(timeStamp);
	modal[0].appendChild(content);
	modal[0].appendChild(br);
}

function showSubmenu() {
	document.getElementsByClassName("dropdown2-content")[0].style.display = "inline-block";
	//console.log("done")
}

function hideSubmenu() {
	document.getElementsByClassName("dropdown2-content")[0].style.display = "none";
	//console.log("done")
}