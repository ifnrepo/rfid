$(document).ready(function () {
	function blink_text() {
		$(".blink").fadeOut(500);
		$(".blink").fadeIn(500);
	}
	setInterval(blink_text, 1000);
	$("#file_browser").click(function (e) {
		e.preventDefault();
		$("#file").click();
	});
	$("#file_path").click(function () {
		$("#file_browser").click();
	});
	$("#file").change(function () {
		$("#file_path").val($(this).val());
	});

	$("#onprogress").click(function () {
		pesan("Dalam tahap pembuatan, Tunggu konfirmasi !", "info");
	});
	$("#belum").click(function () {
		pesan("Fasilitas belum ada, Hubungi Programmer Untuk Diskusi !", "error");
	});

	modalBoxSm();
	modalBoxLg();
	modalBoxLg2();
	modalBoxXl();
	modalBoxSc();
	modalBoxlgSc();
	modalBoxlgSc2();
	modalBoxFull();
	cancelTask();
	verifTask();
	canvasoff();

	$(".tglpilih").datepicker({
		autoclose: true,
		format: "dd-mm-yyyy",
	});

	$(".tglpilih2").datepicker({
		autoclose: true,
		format: "dd-mm-yyyy",
		endDate: "+1d",
	});
	// $(".tglpilih3").datepicker({
	// 	autoclose: true,
	// 	format: 'dd-mm-yyyy',
	// 	startDate: '-1d'
	// })
	$(".datatableasli").DataTable({
		language: {
			paginate: {
				first: "<<",
				last: ">>",
				next: ">",
				previous: "<",
			},
			search: "Cari:",
			zeroRecords: "Tidak ditemukan data",
			info: "Baris _START_ sampai _END_ dari _TOTAL_ entri",
			infoEmpty: "Data kosong",
			lengthMenu: "Tampilkan _MENU_ baris",
		},
		paging: true,
		searching: true,
		info: true,
		ordering: false,
		scrollY: false,
		responsive: true,
	});
	$(".datatableasli2").DataTable({
		language: {
			paginate: {
				first: "<<",
				last: ">>",
				next: ">",
				previous: "<",
			},
			search: "Cari:",
			zeroRecords: "Tidak ditemukan data",
			info: "Baris _START_ sampai _END_ dari _TOTAL_ entri",
			infoEmpty: "Data kosong",
			lengthMenu: "Tampilkan _MENU_ baris",
		},
		paging: true,
		searching: true,
		info: true,
		ordering: false,
		scrollY: true,
		responsive: true,
		pageLength: 50,
	});
	$(".datatableasli2fix").DataTable({
		language: {
			paginate: {
				first: "<<",
				last: ">>",
				next: ">",
				previous: "<",
			},
			search: "Cari:",
			zeroRecords: "Tidak ditemukan data",
			info: "Baris _START_ sampai _END_ dari _TOTAL_ entri",
			infoEmpty: "Data kosong",
			lengthMenu: "Tampilkan _MENU_ baris",
		},
		fixedHeader: true,
		paging: true,
		searching: true,
		info: true,
		ordering: false,
		scrollY: true,
		responsive: true,
		pageLength: 50,
	});
	$(".datatableasli3").DataTable({
		language: {
			paginate: {
				first: "<<",
				last: ">>",
				next: ">",
				previous: "<",
			},
			search: "Cari:",
			zeroRecords: "Tidak ditemukan data",
			info: "Baris _START_ sampai _END_ dari _TOTAL_ entri",
			infoEmpty: "Data kosong",
			lengthMenu: "Tampilkan _MENU_ baris",
		},
		paging: true,
		searching: true,
		info: true,
		ordering: false,
		scrollY: true,
		responsive: true,
		pageLength: 100,
	});
	$(".datatableasli3fix").DataTable({
		language: {
			paginate: {
				first: "<<",
				last: ">>",
				next: ">",
				previous: "<",
			},
			search: "Cari:",
			zeroRecords: "Tidak ditemukan data",
			info: "Baris _START_ sampai _END_ dari _TOTAL_ entri",
			infoEmpty: "Data kosong",
			lengthMenu: "Tampilkan _MENU_ baris",
		},
		fixedHeader: true,
		paging: true,
		searching: true,
		info: true,
		ordering: false,
		scrollY: true,
		responsive: true,
		pageLength: 100,
	});
	$(".datatable").DataTable({
		responsive: true,
		pageLength: 50,
		// ordering: false,
		dom: '<"pull-left"l><"pull-right"f>t<"bottom-left"i><"bottom-right"p>',
	});
	$(".datatable2").DataTable({
		paging: true,
		searching: false,
		info: true,
		ordering: false,
		scrollY: false,
	});
	$(".datatable3").DataTable({
		paging: true,
		searching: false,
		info: true,
		scrollY: false,
		ordering: false,
		pageLength: 50,
	});
	$(".datatable4").DataTable({
		paging: false,
		searching: false,
		info: true,
		scrollY: false,
		ordering: false,
	});
	$(".datatable5").DataTable({
		paging: false,
		searching: true,
		info: false,
		scrollY: false,
	});
	$(".datatable6").DataTable({
		paging: false,
		searching: false,
		info: false,
		scrollY: false,
		pageLength: 50,
		responsive: true,
	});
	$(".datatable7").DataTable({
		paging: false,
		searching: false,
		info: false,
		scrollY: false,
		pageLength: 50,
		scrollY: 500,
		dom: '<"pull-left"l><"pull-right"f>t<"bottom-left"i><"bottom-right"p>',
	});
	$(".datatable8").DataTable({
		responsive: true,
		pageLength: 50,
		// order: [[0, "desc"]],
		ordering: false,
		dom: '<"pull-left"l><"pull-right"f>t<"bottom-left"i><"bottom-right"p>',
	});
	$(".datatable9").DataTable({
		pageLength: 50,
		order: [[1, "asc"]],
		dom: '<"pull-left"l><"pull-right"f>t<"bottom-left"i><"bottom-right"p>',
	});
	$("#modal-danger").on("show.bs.modal", function (e) {
		document.getElementById("message").innerHTML = $(e.relatedTarget).data(
			"message",
		);
		document.getElementById("btn-ok").innerHTML = $(e.relatedTarget).data(
			"tombol",
		);
		if ($(e.relatedTarget).data("tombol") == undefined) {
			document.getElementById("btn-ok").innerHTML = "Hapus";
		}
		$(this).find("#btn-ok").attr("href", $(e.relatedTarget).data("href"));
	});
	$("#modal-info").on("show.bs.modal", function (e) {
		document.getElementById("message-info").innerHTML = $(e.relatedTarget).data(
			"message",
		);
		$(this).find("#btn-ok").attr("href", $(e.relatedTarget).data("href"));
	});
	$("#modal-pilihan").on("show.bs.modal", function (e) {
		document.getElementById("isipesan").innerHTML = $(e.relatedTarget).data(
			"message",
		);
		$(this).find("#btn-ok").attr("href", $(e.relatedTarget).data("href"));
		$(this).find("#btn-no").attr("href", $(e.relatedTarget).data("hrefno"));
	});

	$("#confirm-delete").on("show.bs.modal", function (e) {
		var string = document.getElementById("confirm-delete").innerHTML;
		var hasil = string.replace(
			"fa fa-text-width text-yellow",
			"fa fa-exclamation-triangle text-red",
		);
		document.getElementById("confirm-delete").innerHTML = hasil;

		var string2 = document.getElementById("confirm-delete").innerHTML;
		var hasil2 = string2.replace("Konfirmasi", "&nbspKonfirmasi");
		document.getElementById("confirm-delete").innerHTML = hasil2;
		$(this).find(".btn-ok").attr("href", $(e.relatedTarget).data("href"));
	});
	$("#confirm-task").on("show.bs.modal", function (e) {
		var string2 = document.getElementById("confirm-delete").innerHTML;
		var hasil2 = string2.replace("Konfirmasi", "&nbspKonfirmasi");
		document.getElementById("confirm-delete").innerHTML = hasil2;
		document.getElementById("test").innerHTML = $(e.relatedTarget).data("news");
		$(this).find(".btn-oke").attr("href", $(e.relatedTarget).data("href"));
	});
	$("#confirm-taskx").on("show.bs.modal", function (e) {
		var string2 = document.getElementById("confirm-delete").innerHTML;
		var hasil2 = string2.replace("Konfirmasi", "&nbspKonfirmasi");
		document.getElementById("confirm-delete").innerHTML = hasil2;
		document.getElementById("testi").innerHTML = $(e.relatedTarget).data(
			"news",
		);
		$(this).find(".btn-oke").attr("href", $(e.relatedTarget).data("href"));
	});
	$("#confirm-tasu").on("show.bs.modal", function (e) {
		var string2 = document.getElementById("confirm-delete").innerHTML;
		var hasil2 = string2.replace("Konfirmasi", "&nbspKonfirmasi");
		document.getElementById("confirm-delete").innerHTML = hasil2;
		document.getElementById("test").innerHTML = $(e.relatedTarget).data("news");
		$(this).find(".btn-oke").attr("href", $(e.relatedTarget).data("href"));
	});
	$("#viewpass").mousedown(function () {
		$("#password").attr("type", "text");
	});
	$("#viewpass").mouseup(function () {
		$("#password").attr("type", "password");
	});
	$("#batal-xxx").click(function () {
		document.location.reload();
	});

	// 	new DataTable("#pbtabel", {
	// 		fixedColumns: {
	// 			start: 1,
	// 			end: 1,
	// 		},
	// 		paging: false,
	// 		searching: false,
	// 		info: false,
	// 		scrollCollapse: true,
	// 		scrollX: true,
	// 		scrollY: 500,
	// 		ordering: false,
	// 	});
	cekNotif();
});
var preloader = $("#preloader");
$(window).on("load", function () {
	setTimeout(function () {
		preloader.fadeOut("slow", function () {
			$(this).remove();
		});
	}, 300);
});
function cekcik() {
	var x = $(this).val();
	alert("OKE");
}

function formAction(formname, action) {
	$("#" + formname).attr("action", action);
	$("#" + formname).submit();
}

function modalBoxSm() {
	$("#modal-simple").on("show.bs.modal", function (e) {
		var link = $(e.relatedTarget);
		var title = link.data("title");
		var modal = $(this);
		modal.find(".modal-title").text(title);
		$(this).find(".fetched-data").load(link.attr("href"));
	});
	return false;
}

function modalBoxLg() {
	$("#modal-large").on("show.bs.modal", function (e) {
		var link = $(e.relatedTarget);
		var title = link.data("title");
		var modal = $(this);
		modal.find(".modal-title").text(title);
		$(this).find(".fetched-data").load(link.attr("href"));
	});
	return false;
}

function modalBoxSc() {
	$("#modal-scroll").on("show.bs.modal", function (e) {
		var link = $(e.relatedTarget);
		var title = link.data("title");
		var modal = $(this);
		modal.find(".modal-title").text(title);
		$(this).find(".fetched-data").load(link.attr("href"));
	});
	return false;
}

function modalBoxlgSc() {
	$("#modal-largescroll").on("show.bs.modal", function (e) {
		var link = $(e.relatedTarget);
		var title = link.data("title");
		var modal = $(this);
		modal.find(".modal-title").text(title);
		$(this).find(".fetched-data").load(link.attr("href"));
	});
	return false;
}

function modalBoxlgSc2() {
	$("#modal-largescroll2").on("show.bs.modal", function (e) {
		var link = $(e.relatedTarget);
		var title = link.data("title");
		var modal = $(this);
		modal.find(".modal-title").text(title);
		$(this).find(".fetched-data").load(link.attr("href"));
	});
	return false;
}

function modalBoxLg2() {
	$("#modalBox-lg2").on("show.bs.modal", function (e) {
		var link = $(e.relatedTarget);
		var title = link.data("title");
		var modal = $(this);
		modal.find(".modal-title").text(title);
		$(this).find(".fetched-data").load(link.attr("href"));
	});
	return false;
}

function modalBoxXl() {
	$("#modalBox-xl").on("show.bs.modal", function (e) {
		var link = $(e.relatedTarget);
		var title = link.data("title");
		var modal = $(this);
		modal.find(".modal-title").text(title);
		$(this).find(".fetched-data").load(link.attr("href"));
	});
	return false;
}

function modalBoxFull() {
	$("#modal-full").on("show.bs.modal", function (e) {
		var link = $(e.relatedTarget);
		var title = link.data("title");
		var modal = $(this);
		modal.find(".modal-title").text(title);
		$(this).find(".fetched-data").load(link.attr("href"));
	});
	return false;
}

function cancelTask() {
	$("#canceltask").on("show.bs.modal", function (e) {
		var link = $(e.relatedTarget);
		var title = link.data("title");
		var modal = $(this);
		modal.find(".modal-title").text(title);
		$(this).find(".fetched-data").load(link.attr("href"));
	});
	return false;
}
function verifTask() {
	$("#veriftask").on("show.bs.modal", function (e) {
		var link = $(e.relatedTarget);
		var title = link.data("title");
		var modal = $(this);
		modal.find(".modal-title").text(title);
		$(this).find(".fetched-data").load(link.attr("href"));
	});
	return false;
}

function canvasoff() {
	$("#canvasdet").on("show.bs.offcanvas", function (e) {
		var link = $(e.relatedTarget);
		var title = link.data("title");
		var modal = $(this);
		modal.find(".offcanvas-title").text(title);
		$(this).find(".fetched-data").load(link.attr("href"));
	});
	return false;
}
// $("#canvasdet").on("show.bs.offcanvas", function (e) {
// 	var x = $(e.relatedTarget).data("title");
// 	document.getElementById("offcanvasEndLabel").innerHTML = x;
// 	document.getElementById("fetched-data").innerHTML = $(e.relatedTarget).data(
// 		"href"
// 	);
// 	// $(this).find("#btn-ok").attr("href", $(e.relatedTarget).data("href"));
// });
function angkaJam(evt) {
	var charCode = evt.which ? evt.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 58)) return false;
	return true;
}

$(".inputangka").on("change click keyup input paste", function (event) {
	$(this).val(function (index, value) {
		return value
			.replace(/(?!\.)\D/g, "")
			.replace(/(?<=\..*)\./g, "")
			.replace(/(?<=\.\d\d).*/g, "")
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	});
});

function pesan(pesan, jenis) {
	if (jenis == "info") {
		var head = "Information";
		var bek = "#17A2B8";
		var teksColor = "white";
	} else {
		if (jenis == "success") {
			var head = "Success";
			var bek = "#1cc88a";
			var teksColor = "black";
		} else {
			if (jenis == "warning") {
				var head = "Warning";
				var bek = "#F7B233";
				var teksColor = "black";
			} else {
				var head = "Error";
				var bek = "#ff6f69";
				var teksColor = "black";
			}
		}
	}
	$.toast({
		heading: head,
		text: pesan,
		showHideTransition: "fade", //slide, fade, plain
		icon: jenis,
		hideAfter: 4000,
		position: "bottom-right",
		bgColor: bek,
		textColor: teksColor,
		loader: false,
	});
}

function ceklamahari(tglawal, tglakhir, angka, elm1, elm2) {
	var jmhari = 0;
	var hasilnya = "";
	if (tglawal == "" || tglakhir == "") {
		var jmhari = 0;
	} else {
		var satuhari = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
		var pisah1 = tglawal.split("-");
		var pisah2 = tglakhir.split("-");
		var tgl1 = new Date(pisah1[2], pisah1[1], pisah1[0]);
		var tgl2 = new Date(pisah2[2], pisah2[1], pisah2[0]);
		var diffDays = Math.round(
			Math.round((tgl1.getTime() - tgl2.getTime()) / satuhari) - 1,
		);
		if (diffDays >= 0) {
			// var x = $(elm1).val();
			$(elm1).val("");
			$(elm2).val("");
			alert("Tgl dari harus lebih kecil dari tgl sampai");
		} else {
			var hasil = diffDays * -1;
			if (hasil > 7) {
				$(elm2).val("");
				alert("Maksimal Izin Dokter adalah 7 Hari");
			}
			var hasilnya = hasil;
		}
	}
	return hasilnya;
}

function validasitgl(tgl, elm, ket) {
	var pattern = /^([0-9]{2})\-([0-9]{2})\-([0-9]{4})$/;
	if (pattern.test(tgl)) {
		return true;
	} else {
		pesan(ket + " bukan format tanggal, format harus (dd-mm-yyyy)");
		$(elm).val("");
		return false;
	}
}

let rotateAngle = 90;

function rotate(image) {
	image.setAttribute("style", "transform: rotate(" + rotateAngle + "deg)");
	rotateAngle = rotateAngle + 90;
	$("#fotodok").css("height", "auto");
	$("#fotodok").css("width", "100%");
	$("#fotodok").css("object-fit", "cover");
}

function ponodis(po, item, dis, brg) {
	var pat = "";
	if (po == "" && brg != "") {
		pat = brg;
	} else {
		pat = po + " # " + item;
		if (dis != "0" || dis != "") {
			pat = pat + " dis " + dis;
		}
	}
	return pat;
}

function rupiah(amount, decimalSeparator, thousandsSeparator, nDecimalDigits) {
	if (amount == 0) {
		return "0";
	} else {
		var num = parseFloat(amount); //convert to float
		//default values
		decimalSeparator = decimalSeparator || ".";
		thousandsSeparator = thousandsSeparator || ",";
		nDecimalDigits = nDecimalDigits == null ? 2 : nDecimalDigits;

		var fixed = num.toFixed(nDecimalDigits); //limit or add decimal digits
		//separate begin [$1], middle [$2] and decimal digits [$4]
		var parts = new RegExp(
			"^(-?\\d{1,3})((?:\\d{3})+)(\\.(\\d{" + nDecimalDigits + "}))?$",
		).exec(fixed);

		if (parts) {
			//num >= 1000 || num < = -1000
			return (
				parts[1] +
				parts[2].replace(/\d{3}/g, thousandsSeparator + "$&") +
				(parts[4] ? decimalSeparator + parts[4] : "")
			);
		} else {
			return fixed.replace(".", decimalSeparator);
		}
	}
}

function toAngka(rp) {
	if (rp == "" || rp.trim() == "-") {
		return 0;
	} else {
		return rp.replace(/,*|\D/g, "");
	}
}

function adaspasi(str) {
	return /\s/.test(str);
}

function checkNumber(event) {
	var aCode = event.which ? event.which : event.keyCode;
	if (aCode != 46 && aCode > 31 && (aCode < 48 || aCode > 57)) return false;
	return true;
}

function roundTo(n, place) {
	return +(Math.round(n + "e+" + place) + "e-" + place);
}

function tglmysql(str) {
	var c = str.split("-");
	return c[2] + "-" + c[1] + "-" + c[0];
}
let cachedIP = null;
async function getIP() {
	if (cachedIP) {
		return cachedIP;
	}
	const response = await fetch("https://api.ipify.org?format=json");
	const data = await response.json();
	cachedIP = data.ip;
	return cachedIP;
}
setInterval(() => {
	cekNotif();
}, 10000);
function cekNotif() {
	$.ajax({
		url: base_url + "main/ceknotif",
		type: "POST",
		success: function (data, textStatus, jqXHR) {
			if (data != 0) {
				$("#notiftask").removeClass("hilang");
			} else {
				$("#notiftask").addClass("hilang");
			}
			document.getElementById("notiftask").innerHTML = data;
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(textStatus);
		},
	});
}
function pushNotify() {
	if (!("Notification" in window)) {
		// checking if the user's browser supports web push Notification
		alert("Web browser does not support desktop notification");
	}
	if (Notification.permission !== "granted") Notification.requestPermission();
	else {
		$.ajax({
			url: base_url + "/push-notify.php",
			type: "POST",
			success: function (data, textStatus, jqXHR) {
				// if PHP call returns data process it and show notification
				// if nothing returns then it means no notification available for now
				if ($.trim(data)) {
					var data = jQuery.parseJSON(data);
					console.log(data);
					notification = createNotification(
						data.title,
						data.icon,
						data.body,
						data.url,
					);
					// closes the web browser notification automatically after 5 secs
					setTimeout(function () {
						notification.close();
					}, 5000);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {},
		});
	}
}

function createNotification(title, icon, body, url) {
	var notification = new Notification(title, {
		icon: icon,
		body: body,
	});
	// url that needs to be opened on clicking the notification
	// finally everything boils down to click and visits right
	notification.onclick = function () {
		window.open(url);
	};
	return notification;
}
