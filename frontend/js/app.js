(function ($) {
	$(function () {
		$('.button-collapse').sideNav();
	});
})(jQuery);

// Check Code
function compileCode() {
	var code = document.getElementById("code").value;
	console.log(encodeURIComponent(code))
	Materialize.toast('Started Compiling !!', 4000, "blue lighten-2 rounded");
	$.ajax({
		type: "POST",
		url: "http://localhost:3000/",
		data: 'code=' + encodeURIComponent(code),
		success: function (data) {
			console.log(data)
			if (data.status == true) {
				Materialize.toast(data.msg, 5000, "green lighten-2 rounded");
				document.getElementById('out').innerHTML = data.out;
			} else
				Materialize.toast("Failed to  Compile", 5000, "red lighten-2 rounded");
		},
		error: function (data) {
			Materialize.toast("Some error occurred, try again after reloading !!", 5000, "red lighten-2 rounded");
		}
	});
}
