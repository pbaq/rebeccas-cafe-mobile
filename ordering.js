$('document').ready(function() {

$('#dropdown-menu').on({
  "click":function(e){
    e.stopPropagation();
  }
});

var selected1 = [];
var selected2 = [];
var selected3 = [];
var selected4 = [];
var selected5 = [];
//$('#dropdown-menu input:checked').each(function() {
//   selected.push($(this).attr('label'));
//});

$(document.body).click(function() {
	$('.check1').each(function() {
        if($(this).is(":checked")) {
            selected1.push($(this).val());
            console.log(selected1);
        }
        else {
        }   
    });
    });
    
    $(document.body).click(function() {
	$('.check2').each(function() {
        if($(this).is(":checked")) {
            selected2.push($(this).val());
            console.log(selected2);
        }
        else {
        }   
    });
    });

$(document.body).click(function() {
	$('.check3').each(function() {
        if($(this).is(":checked")) {
            selected3.push($(this).val());
            console.log(selected3);
        }
        else {
        }   
    });
    });

$(document.body).click(function() {
	$('.check4').each(function() {
        if($(this).is(":checked")) {
            selected4.push($(this).val());
            console.log(selected4);
        }
        else {
        }   
    });
    });


$(document.body).click(function() {
	$('.check5').each(function() {
        if($(this).is(":checked")) {
            selected5.push($(this).val());
            console.log(selected5);
        }
        else {
        }   
    });
    });



//function fillIngreds() {
//  $("#ingred1").html(selected);
//}

$('.done-turkey').click(function() {
	$('.ingred1').html(function() {
		return selected1.toString().split(",").join(", ");
	});
	console.log(selected);
});

$('.done-bbq').click(function() {
	$('.ingred2').html(function() {
		return selected2.toString().split(",").join(", ");
	});
	console.log(selected);
});

$('.done-caprese').click(function() {
	$('.ingred3').html(function() {
		return selected3.toString().split(",").join(", ");
	});
	console.log(selected);
});

$('.done-spicy').click(function() {
	$('.ingred4').html(function() {
		return selected4.toString().split(",").join(", ");
	});
	console.log(selected);
});

$('.done-create').click(function() {
	$('.ingred5').html(function() {
		return selected5.toString().split(",").join(", ");
	});
	console.log(selected);
});

var sandwich;
var cart_count = 0;


$('#tuscan').click(function() {
	sandwich = "Tuscan Turkey";
	cart_count = cart_count + 1;
	$('.cart-btn').html('Cart (' + cart_count + ')');
	console.log(sandwich);
});

$('#bbq').click(function() {
	sandwich = "BBQ Pork";
	cart_count = cart_count + 1;
	$('.cart-btn').html('Cart (' + cart_count + ')');
});

$('#caprese').click(function() {
	sandwich = "Caprese";
	cart_count = cart_count + 1;
	$('.cart-btn').html('Cart (' + cart_count + ')');
});

$('#spicyham').click(function() {
	sandwich = "Spicy Ham";
	cart_count = cart_count + 1;
	$('.cart-btn').html('Cart (' + cart_count + ')');
	console.log('test');
});

$('#create').click(function() {
	sandwich = "Create Your Own";
	cart_count = cart_count + 1;
	$('.cart-btn').html('Cart (' + cart_count + ')');
});

});