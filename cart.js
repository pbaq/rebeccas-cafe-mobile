var totalPrice = 0;

onload = function totalPrice() {
	var priceRows = $(".row .price");
	var quantityRows = $("[name=quantity]");
	//var totalPrice = 0;
	for (i = 0; i < priceRows.length; i++) {
		var price = parseFloat($(priceRows[i]).text());
		var quantity = parseInt($(quantityRows[i]).val());
		totalPrice = totalPrice + (price * quantity);
	}
	$(".total-price").text(totalPrice);
}

$('document').ready(function() {
$('.cartDelete1').click(function() {
	$('.item1, .price1, .ordered-ingredients1').html('');
	$('.quantity1').val(1);
	$('.item1, .price1, .ordered-ingredients1, .quantity1, .cartDelete1').hide();
	totalPrice = totalPrice - $('.price1').val();
	$('.total-price').text(totalPrice);
	
});

$('.cartDelete2').click(function() {
	$('.item2, .price2, .ordered-ingredients2').html('');
	$('.quantity2').val(1);
	$('.item2, .price2, .ordered-ingredients2, .quantity2, .cartDelete2').hide();
	totalPrice = totalPrice - $('.price2').val();
	$('.total-price').text(totalPrice);
	
});

});