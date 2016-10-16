
$(document).ready(function(){
	$('.sandwich-ordered').html(sandwich);
	console.log(sandwich);
});

onload = function load() {
	var pickupTime = $("[name=pickup-time]");
	var currentDate = new Date();
	var currentHours = currentDate.getHours();
	var currentMins = currentDate.getMinutes();
	currentDate.setMinutes(currentMins + 20);
	var newTime = currentDate.getHours() + ":" + currentDate.getMinutes();
	pickupTime[0].setAttribute("value", newTime);
	pickupTime[0].setAttribute("min", newTime);
}

