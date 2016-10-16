	function checkLogin() {
	var email = $("[name=email]");
	var password = $("[name=password]");
	var incorrectLogin = $(".incorrect-login");
	if (email.val() == "" || password.val == "") {
		incorrectLogin.css("display", "block");
		return false;
	} else {
		return true;
	}
} 