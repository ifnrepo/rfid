/*!
 * Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
 */
//
// Scripts
//
$(document).ready(function () {
	$("#inputrfid").focus();
	$("#select-alat").change();
})

window.addEventListener("DOMContentLoaded", (event) => {
	// Activate Bootstrap scrollspy on the main nav element
	const sideNav = document.body.querySelector("#sideNav");
	if (sideNav) {
		new bootstrap.ScrollSpy(document.body, {
			target: "#sideNav",
			rootMargin: "0px 0px -40%",
		});
	}

	// Collapse responsive navbar when toggler is visible
	const navbarToggler = document.body.querySelector(".navbar-toggler");
	const responsiveNavItems = [].slice.call(
		document.querySelectorAll("#navbarResponsive .nav-link")
	);
	responsiveNavItems.map(function (responsiveNavItem) {
		responsiveNavItem.addEventListener("click", () => {
			if (window.getComputedStyle(navbarToggler).display !== "none") {
				navbarToggler.click();
			}
		});
	});
});

window.setTimeout("waktu()", 1000);

function waktu() {
	var waktu = new Date();
	var bulan = waktu.getMonth() + 1;
	setTimeout("waktu()", 1000);
	var jam = parseFloat(waktu.getHours) <= 9 ? '0' + waktu.getHours() : waktu.getHours();
	document.getElementById("jam").innerHTML =
		waktu.getDate() + '.' + bulan + '.' + waktu.getFullYear() + ' Jam ' + jam + ":" + waktu.getMinutes() + ":" + waktu.getSeconds();
	// document.getElementById("menit").innerHTML = waktu.getMinutes();
	// document.getElementById("detik").innerHTML = waktu.getSeconds();
	// var hasil =
	// 	waktu.getHours() + ":" + waktu.getMinutes() + ":" + waktu.getSeconds();
	// $("#jam").innerHTML = waktu.getHours();
}

$("#button-clear").click(function () {
	// alert("WOW");
	$("#tampungan").html("");
});
