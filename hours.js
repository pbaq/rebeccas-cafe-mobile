onload = function loadHours() {
	var currentDate = new Date();
	var currentWeekDay = currentDate.getDay();
	var currentHours = currentDate.getHours();
	if (currentWeekDay == 0 || currentWeekDay == 6 || currentHours < 7 || currentHours > 15) {
		$(".open-times .now").text("Closed");
	}
	console.log("loaded");
}