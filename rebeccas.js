// VARIABLES

//[[SandwichName, Price, Ingredient1, Ingredient2, ...]]
var sandwiches = [
	["Tuscan Turkey", "9.20", "Focaccia", "Turkey", "Mozzarella", "Peppers", "Pesto"],
	["Spicy Ham", "8", "Italian", "Ham", "Swiss", "Onions", "Pickles", "Mustard"],
	["Caprese", "7.99", "Focaccia", "Mozzarella", "Tomato", "Pesto"],
	["BBQ Pork", "8.37", "Focaccia", "Pulled Pork", "Cheddar", "Onions"],
	["Create Your Own", "9.50"]
];
	
//[[SandwichName, Price, Quantity, Drink, Side, Ingredients]]
var cart = [];
var loadedInCart = [];

var orderingLoaded = false;

var currentSandwichCustomize = "";

var currentDrinkSideSelect = "";

function findSandwich(name, array) {
	for (i = 0; i < array.length; i++) {
		var sandwich = array[i];
		if (sandwich[0] === name) {
			return sandwich;
		}
	}
}

function findIndex(name, array) {
	for (i = 0; i < array.length; i++) {
		var sandwich = array[i];
		if (sandwich[0] === name) {
			return i;
		}
	}
}

function loadHours() {
	var currentDate = new Date();
	var currentWeekDay = currentDate.getDay();
	var currentHours = currentDate.getHours();
	if (currentWeekDay == 0 || currentWeekDay == 6 || currentHours < 7 || currentHours > 15) {
		$(".open-times .now").text("Closed");
	}
	console.log("loaded")
}

function loadOrdering() {
	if (!orderingLoaded) {
		for (i = 0; i < sandwiches.length; i++) {
			var sandwich = sandwiches[i];
			var name = sandwich[0];
			var price = sandwich[1] ? "$" + sandwich[1] : "";
			var ingredients = sandwich[2] || "";
			for (j = 3; j < sandwiches[i].length; j++) {
				ingredients = ingredients + ", " + sandwich[j];
			}
			
			var div = document.createElement("div");
			div.className = "thumbnail";
			div.innerHTML = '<div class="row">\
								<div class="col-xs-8 sandwich-row">\
									<h3 class="sandwich-name">' + name + '</h3>\
									<span class="sandwich-ingredients ingred5">' + ingredients + '</span>\
								</div>\
								<div class="col-xs-2 price-col">\
									<h4 class="sandwich-price">' + price + '</h4>\
								</div>\
							</div>\
							<div class="row order-btns">\
							<div class="col-xs-12">\
								<a class="btn btn-primary float-right add-to-cart" name="' + name + '" onclick="addToCart(event)">Add to Cart</a>\
								<a class="btn btn-primary" data-toggle="modal" data-target=".customize" name="' + name + '" onclick="showCustomize(event)">Customize</a>\
							</div>'
			$("#sandwichList").prepend(div);
		}
		orderingLoaded = true;
	}
}

function showCustomize(event) {
	var sandwichName = event.target.name;
	currentSandwichCustomize = findSandwich(sandwichName, sandwiches);
	$(".sandwich-name-modal").text(sandwichName);
	
	var checkboxes = $(".modal.customize li input");
	for (i = 0; i < checkboxes.length; i++) {
		var thisCheckbox = checkboxes[i];
		if (currentSandwichCustomize.indexOf(thisCheckbox.value) > -1) {
			thisCheckbox.checked = true; 
			thisCheckbox.setAttribute("checked", "true");
		} else {
			thisCheckbox.checked = false;
			thisCheckbox.removeAttribute("checked");
		}
	}
}

function addToCart(event) {
	var sandwich = "";
	var quantity = 1;
	if (event) {
		var sandwichName = event.target.name;
		var sandwich = new Array().concat(findSandwich(sandwichName, sandwiches));
		sandwich = new Array().concat(sandwiches[i]);
		
	} else {
		sandwich = new Array().concat(currentSandwichCustomize);
		if (sandwich) {
			var checkboxes = $(".modal.customize li input:checked");
			var ingredients = [];
			checkboxes[0] ? ingredients.push(checkboxes[0].value) : "";
			for (i = 1; i < checkboxes.length; i++) {
				ingredients.push(checkboxes[i].value);
			}
			sandwich = sandwich.slice(0,2);
			sandwich = sandwich.concat(ingredients);
		}
	}
	sandwich.splice(2, 0, quantity);
	sandwich.splice(3, 0, "No drink");
	sandwich.splice(4, 0, "No side");
	cart.push(sandwich);
	updateCartBtnText();
}

function updateCartBtnText(cartLength) {
	$(".cart-btn").text("Cart (" + cart.length + ")");
}

function loadCart() {
	// remove cart items so that they're not rendered twice
	var sandwichesAndTotal = $("#cartList .sandwiches-and-total");
	sandwichesAndTotal.empty();
	for (i = 0; i < cart.length; i++) {
		var sandwich = new Array().concat(cart[i]);
		var name = sandwich[0];
		var price = sandwich[1];
		var quantity = sandwich[2];
		var drink = sandwich[3];
		var side = sandwich[4];
		var ingredients = sandwich.splice(5, sandwich.length).join(", ");
		var div = document.createElement('div');
		div.className = "cart-sandwich-row";
		div.innerHTML = '<div class="row">\
							<div class="col-xs-5 item">\
								' + name + ' </br>\
								<small class="ordered-ingredients">' + ingredients + '</small>\
							</div>\
							<div class="col-xs-3">$<span name="' + name + '" class="price">' + price + '</span></div>\
							<div class="col-xs-2">\
								<input type="number" class="quantity" name="' + name + '" value="' + quantity + '" min="1" max="20" oninput="changeQuantity(event)">\
							</div>\
							<div class="col-xs-2">\
								<a href="#" class="cart-delete" name="' + name + '" onclick="deleteCartItem(event)">[x]</a> \
							</div>\
						</div>\
						<div class="row add-side-drink" name="' + name + '">\
							<div class="col-xs-6">\
								<small><span class="drink">' + drink + '</span>, <span class="side">' + side + '</span><small>\
							</div>\
							<div class="col-xs-6">\
								<a class="btn btn-primary btn-sm add-drink-side" name="' + name + '" data-toggle="modal" data-target="#drinkSideModal" onclick="addDrinkSide(event)">Add Drink/Side</a>\
							</div>\
						</div>';
		sandwichesAndTotal.append(div);
	}
	var totalPrice = calcTotalPrice();
	var totalDiv = document.createElement("div");
	totalDiv.className = "row";
	totalDiv.innerHTML = '<div class="col-xs-5"><span class="total">Total</span></div>\
					<div class="col-xs-3"><b>$</b><span class="total-price">' + totalPrice + '</span></div>\
					<div class="col-xs-4"></div>'
	sandwichesAndTotal.append(totalDiv);
}

function changeQuantity(event) {
	var newQuantity = event.target.value;
	var sandwich = findSandwich(event.target.name, cart);
	sandwich[2] = newQuantity;
	calcTotalPrice();
}

function deleteCartItem(event) {
	var sandwichName = event.target.name;
	var sandwichIndex = findIndex(sandwichName, cart);
	cart.splice(sandwichIndex, 1); //remove item from cart
	var sandwichDiv = $(event.target).closest(".cart-sandwich-row");
	sandwichDiv.remove();
	calcTotalPrice();
	updateCartBtnText();
}

function addDrinkSide(event) {
	currentDrinkSideSelect = findSandwich(event.target.name, cart);
}

function updateDrinkSide(event) {
	var drink = $(".modal input[name=drinks]:checked")[0].value;
	var side = $(".modal input[name=sides]:checked")[0].value;
	var sandwichName = "'" + currentDrinkSideSelect[0] + "'";
	currentDrinkSideSelect[3] = drink;
	currentDrinkSideSelect[4] = side;
	$("#cartList .add-side-drink[name=" + sandwichName + "] span.drink").text(drink);
	$("#cartList .add-side-drink[name=" + sandwichName + "] span.side").text(side);
}

function calcTotalPrice() {
	var priceRows = $("#cartList .price");
	var quantityRows = $("#cartList .quantity");
	var totalPrice = 0;
	for (i = 0; i < priceRows.length; i++) {
		var price = parseFloat($(priceRows[i]).text());
		var quantity = parseInt($(quantityRows[i]).val());
		totalPrice = totalPrice + (price * quantity);
	}
	totalPrice = parseFloat(totalPrice).toFixed(2);
	var div = document.createElement("div");
	div.className = "row";
	$(".total-price").text(totalPrice);
	return totalPrice;
}

function isCartEmpty() {
	return cart.length === 0;
}

function loadCheckout() {
	// remove items so that they're not rendered twice
	var sandwichesAndTotal = $("#checkoutList .sandwiches-and-total");
	sandwichesAndTotal.empty();
	for (i = 0; i < cart.length; i++) {
		var sandwich = new Array().concat(cart[i]);
		var name = sandwich[0];
		var price = sandwich[1];
		var quantity = sandwich[2];
		var drink = sandwich[3];
		var side = sandwich[4];
		var ingredients = sandwich.splice(5, sandwich.length).join(", ");
		var div = document.createElement('div');
		div.className = "checkout-sandwich-row";
		div.innerHTML = '<div class="row">\
							<div class="col-xs-6 item">\
								' + name + ' </br>\
								<small class="ordered-ingredients">' + ingredients + '</small></br>\
								<small><span class="drink">' + drink + '</span>, <span class="side">' + side + '</span></small>\
							</div>\
							<div class="col-xs-3">$<span name="' + name + '" class="price">' + price + '</span></div>\
							<div class="col-xs-3">\
								<div class="center">' + quantity + '</div>\
							</div>\
						</div>';
		sandwichesAndTotal.append(div);
	}
	var totalPrice = calcTotalPrice();
	var totalDiv = document.createElement("div");
	totalDiv.className = "row";
	totalDiv.innerHTML = '<div class="col-xs-6"><span class="total">Total</span></div>\
					<div class="col-xs-3"><b>$</b><span class="total-price bold">' + totalPrice + '</span></div>\
					<div class="col-xs-3"></div>'
	sandwichesAndTotal.append(totalDiv);
}

function togglePayment(event) {
	var paymentType = $("#checkoutPage .payment-form .payment-type");
	if (event.target.value === "online") {
		paymentType.removeClass("hidden");
	} else {
		paymentType.addClass("hidden");
	}
	toggleCardType();
}

function toggleCardType(event) {
	var paymentType = $("#checkoutPage .payment-form #paymentType").val();
	var huskyForm = $("#checkoutPage .payment-form .husky-form");
	var creditDebitForm = $("#checkoutPage .payment-form .credit-debit-form");
	if (paymentType === "husky") {
		creditDebitForm.hide();
		huskyForm.show();
	} else {
		huskyForm.hide();
		creditDebitForm.show();
	}
}

function emptyCart() {
	cart = [];
	updateCartBtnText();
}

/*
function validateOrder() {
	// the idea is to check that the fields that need to be populated have something
	// and return true is it's all in order, false otherwise. We could have a modal
	// saying what the problem is when we encounter one, though we should only show
	// the modal for the first problem. The modal would have to be different from the
	// others to show that it's an error.
	return validatePayment(); // && validatePickup && validate....
}

function validatePayment() {
	var paymentForm = $("#checkoutPage .payment-form");
	var onSitePayChecked = paymentForm.find(".payment-type [value=location]")[0].checked;
	if (paymentForm.find("#cardName").val() !== "") {  // Check if name on card is valid
		if (!onSitePayChecked) { // paying online
			var paymentType = $("#checkoutPage .payment-form #paymentType").val();
			if (paymentType === "husky") {
				var huskyID = paymentForm.find(".husky-form #huskyID").val();
				if (huskyID.length > 0 && !isNaN(huskyID)) {
					return true;
				} else {
					// show modal saying husky id is invalid
				}
			} else { // paying with credit or debit
				var cardNumber = paymentForm.find("#cardNumber");
				var expDate = paymentForm.find("#expDate");
				var securityCode = paymentForm.find("#securityCode");
				if (cardNumber.length > 0 && expDate.length > 0 && securityCode.length > 0) {
					return true;
				} else {
					// modal saying some card info is invalid
				}
			}
		}
	} else {
		// show modal that says there needs to be a name for the card
	}
}
*/

function showHome() {
	$("#hoursPage").addClass("hidden");
	$("#orderingPage").addClass("hidden");
	$("#cartPage").addClass("hidden");
	$("#checkoutPage").addClass("hidden");
	$("#homePage").removeClass("hidden");
	$("div.navbar-brand").text("Home");
}

function showHours() {
	$("#homePage").addClass("hidden");
	$("#orderingPage").addClass("hidden");
	$("#cartPage").addClass("hidden");
	$("#checkoutPage").addClass("hidden");
	$("#hoursPage").removeClass("hidden");
	$("div.navbar-brand").text("Hours");
	loadHours();
}

function showOrdering() {
	$("#homePage").addClass("hidden");
	$("#hoursPage").addClass("hidden");
	$("#cartPage").addClass("hidden");
	$("#checkoutPage").addClass("hidden");
	$("#orderingPage").removeClass("hidden");
	$("div.navbar-brand").text("Order");
	loadOrdering();
}

function showCart() {
	$("#hoursPage").addClass("hidden");
	$("#orderingPage").addClass("hidden");
	$("#homePage").addClass("hidden");
	$("#checkoutPage").addClass("hidden");
	$("#cartPage").removeClass("hidden");
	$("div.navbar-brand").text("Cart");
	loadCart();
}

function showCheckout() {
	if (isCartEmpty()) {
		$("#zeroCartCheckout").modal("show");
		return;
	}
	$("#hoursPage").addClass("hidden");
	$("#orderingPage").addClass("hidden");
	$("#cartPage").addClass("hidden");
	$("#homePage").addClass("hidden");
	$("#checkoutPage").removeClass("hidden");
	$("div.navbar-brand").text("Checkout");
	loadCheckout();
}

