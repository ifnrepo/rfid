const selectAlat = document.getElementById("alat");
const selectButtonConnect = document.getElementById("button-connect");
selectButtonConnect.setAttribute("onclick", "connectSerial()");
const selectButtonClear = document.getElementById("button-clear");
const inputField = document.getElementById("inputrfid");
// const textarea = document.getElementById('tagListArea');
// const tagList = document.getElementById('tagList');
// const tagList = document.getElementById("tampungan");
// textarea.style.display = "none";

selectAlat.addEventListener("change", function () {
	const alatTerpilih = selectAlat.value;
	if (alatTerpilih === "handheld") {
		selectButtonConnect.setAttribute("disabled", "true");
		inputField.removeAttribute("disabled");
		inputField.focus();
		$("#inputanrf").removeClass("hilang");
		// Menyembunyikan elemen
		// tagList.style.display = "none";
		// textarea.style.display = "block";
	} else if (alatTerpilih === "fixedreader") {
		selectButtonConnect.removeAttribute("disabled");
		// document.getElementById('inputanrf').addClass('hilang');
		$("#inputanrf").addClass("hilang");
		// inputField.setAttribute("disabled", "true");
		// Menampilkan elemen
		// tagList.style.display = "block";
		// textarea.style.display = "none";
	}
});

// Procedure HandHeld
// const arrayData = [];
// const arrayHandheld = [];
let urut = 0; // Inisialisasi variabel urut
let databaru = 0; // Inisialisasi ada databaru
let databarufix = 0; // Inisialisasi ada databaru
let docek = 0; // Inisialisasi ada databaru
let loopint = 1000; // interval loop pengecekan data

// Looping Cek penggunaan Handheld
var timerHandheld = setInterval(validateHandheld, 2000);

function simulateRFIDReading() {
	const rfidData = document.getElementById("inputrfid").value;
	document.getElementById("inputrfid").value = "";

	if (arrayData.includes(rfidData)) {
	} else {
		arrayData.push(rfidData); // Menambahkan data ke array
		if (rfidData != "") {
			document.getElementById("posex").innerHTML = "Retrieve Data Tags ..";
			urut = urut + 1;
			databaru = 1;
			loopint = 2000;
			arr = {
				key: urut,
				value: rfidData,
			};
			arrayHandheld.push(arr);
			const text = urut.toLocaleString("id-ID"); // Format lokal Indonesia
			// textarea.value += text + ". " + rfidData + "\n"; // Menambahkan data RFID ke textarea
			const el = document.createElement("div");
			el.className = "tag-item";
			el.id = `${urut}`;
			el.style.marginTop = "1px";
			// el.innerHTML = `${urut}.${rfidData}<span class="bg-success px-2" style="float: right; color: white;">OK</span>`;
			el.innerHTML = `${urut}.${rfidData}`;
			tagList.append(el);
			document.getElementById("posex").innerHTML = "Done ..";
			clearInterval(timerHandheld);
			timerHandheld = setInterval(validateHandheld, 2000);
		}
	}
}

// selectButtonClear.addEventListener('click', () => {
//     const output = document.getElementById('tagListArea');
//     output.value = "";
//     arrayData.length = 0;
//     urut = 0; // Mengatur ulang urut
// });

// Procedure FixedReader
// const tagList = document.getElementById("tagList");
const tagSet = new Set();
let count = 0;
let port, writer;

// Hitung checksum seperti di server.js
function calculateChecksum(data) {
	return data.slice(0, 9).reduce((cs, byte) => cs ^ byte, 0);
}

// Command ke RFID reader
function getInventoryCommand() {
	let cmd = [0x7c, 0xff, 0xff, 0x12, 0x32, 0x03, 0x03, 0x06, 0x04, 0x00];
	cmd[9] = calculateChecksum(cmd);
	return new Uint8Array(cmd);
}

function parseEPC(buffer) {
	const tags = [];
	const bytes = Array.from(buffer);
	for (let i = 0; i <= bytes.length - 12; i++) {
		if (bytes[i] === 0xe2) {
			const epc = bytes.slice(i, i + 12);
			if (epc.length === 12) {
				const tag = epc
					.map((b) => b.toString(16).padStart(2, "0"))
					.join("")
					.toUpperCase();
				tags.push(tag);
				i += 11;
			}
		}
	}
	return tags;
}

// Looping Cek penggunaan Fixreader
var timerFixreader = setInterval(validateFixreader, 2000);

async function connectSerial() {
	try {
		port = await navigator.serial.requestPort();
		await port.open({
			baudRate: 57600,
		});

		writer = port.writable.getWriter();
		const reader = port.readable.getReader();

		// Loop kirim command setiap detik
		setInterval(() => {
			writer.write(getInventoryCommand());
			console.log("ðŸ“¤ Command sent");
		}, 1000);

		// Buffer parsing EPC Gen2
		let buffer = [];

		while (true) {
			const { value, done } = await reader.read();
			if (done) break;
			if (value) {
				const bytes = new Uint8Array(value);
				buffer = buffer.concat(Array.from(bytes));

				// Limit buffer
				if (buffer.length > 200) buffer = buffer.slice(-200);

				const tags = parseEPC(buffer);
				tags.forEach((tag) => {
					if (!tagSet.has(tag)) {
						tagSet.add(tag);
						document.getElementById("posex").innerHTML =
							"Retrieve Data Tags ..";
						count++;

						databarufix = 1;
						loopint = 2000;
						arr = {
							key: count,
							value: tag,
						};
						arrayHandheld.push(arr);

						const el = document.createElement("div");
						el.className = "tag-item";
						el.id = count;
						el.innerHTML = `<span>${count}.</span> ${tag}`;
						tagList.prepend(el);

						console.log("Tag baru ditemukan: " + tag);

						clearInterval(timerFixreader);
						timerFixreader = setInterval(validateFixreader, 2000);
					}
				});
			}
		}
	} catch (err) {
		alert("Gagal koneksi ke RFID: " + err);
		console.error(err);
	}
}

// Procedure FixedReader 4 Ant
// const tagList = document.getElementById("tagList");
let tagSet2 = new Set();
let count2 = 0;
let port2,
	writer2,
	reader,
	readLoopRunning = false;

function crc16(data) {
	const POLY = 0x8408;
	let crc = 0xffff;

	for (let byte of data) {
		crc ^= byte;
		for (let i = 0; i < 8; i++) {
			if (crc & 0x0001) {
				crc = (crc >> 1) ^ POLY;
			} else {
				crc = crc >> 1;
			}
		}
	}
	return crc & 0xffff;
}

function getStartRealTimeInventoryCommand() {
	const frame = [0x00, 0x76, 0x01]; // Adr + Cmd + Mode
	const len = frame.length + 2;
	frame.unshift(len);
	const crc = crc16(frame);
	frame.push(crc & 0xff);
	frame.push((crc >> 8) & 0xff);
	return new Uint8Array(frame);
}

function parseEPC(buffer) {
	const tags = [];
	const bytes = Array.from(buffer);

	for (let i = 0; i < bytes.length - 16; i++) {
		if (
			bytes[i + 1] === 0xee &&
			bytes[i + 2] === 0x00 &&
			bytes[i + 3] === 0x01 &&
			bytes[i + 4] === 0x0c
		) {
			const epcBytes = bytes.slice(i + 5, i + 17);
			const epc = epcBytes
				.map((b) => b.toString(16).padStart(2, "0"))
				.join("")
				.toUpperCase();

			if (!tags.includes(epc)) {
				tags.push(epc);
			}

			i += 16;
		}
	}

	return tags;
}

async function connectSerial(useExistingPort2 = false) {
	try {
		if (!useExistingPort2 || !port2) {
			port2 = await navigator.serial.requestPort();
		}

		await port2.open({
			baudRate: 57600,
		});
		writer2 = port2.writable.getWriter();
		reader = port2.readable.getReader();

		// Aktifkan real-time inventory mode
		await writer2.write(getStartRealTimeInventoryCommand());

		readLoopRunning = true;
		let buffer = [];

		while (readLoopRunning) {
			const { value, done } = await reader.read();
			if (done || !readLoopRunning) break;
			if (value) {
				const bytes = new Uint8Array(value);
				buffer = buffer.concat(Array.from(bytes));
				if (buffer.length > 500) buffer = buffer.slice(-500);

				const tags = parseEPC(buffer);
				tags.forEach((tag) => {
					if (!tagSet2.has(tag)) {
						tagSet2.add(tag);
						count2++;

						const el = document.createElement("div");
						el.className = "tag-item";
						el.innerHTML = `<span>${count2}.</span> ${tag}`;
						tagList.prepend(el);
					}
				});
			}
		}
	} catch (err) {
		alert("Gagal koneksi ke RFID: " + err);
		console.error(err);
	}
}

async function resetTags() {
	console.log("🧹 Reset dimulai...");
	readLoopRunning = false;
	try {
		if (reader) await reader.cancel();
		if (reader) await reader.releaseLock();
		if (writer2) await writer2.releaseLock();
		if (port2 && port2.readable) await port2.close();
	} catch (e) {
		console.warn("⚠️ Gagal menutup port:", e);
	}

	tagList.innerHTML = "";
	tagSet2 = new Set();
	count2 = 0;

	console.log("🔄 Menghubungkan ulang otomatis...");
	await connectSerial(true);
}

function validateHandheld() {
	if (arrayHandheld.length > 0 && databaru == 1) {
		document.getElementById("posex").innerHTML = "Done ..";
		console.log("Pengecekan Data");
		databaru = 0;
		docek = 0;
		$.ajax({
			dataType: "json",
			type: "POST",
			url: base_url + "page/validateHandheld",
			data: {
				data: arrayHandheld,
			},
			success: function (data) {
				// alert(data);
				data.forEach((data) => {
					let hasil = data.value;
					let key = data.key;
					let stat = data.status;
					console.log(hasil);
					var isi = document.getElementById(key);
					isi.innerHTML = key + ". " + hasil;
					var sp = document.createElement("span");
					sp.style.float = "right";
					sp.style.color = "white";
					if (stat == "OK") {
						sp.className = "bg-success px-2";
						var no = document.createTextNode("OK");
					} else {
						sp.className = "bg-danger px-2";
						var no = document.createTextNode("NG");
					}
					var itm = document.getElementById(key);
					sp.appendChild(no);
					itm.appendChild(sp);
					// x.appendChild(textnode);
				});
				// window.location.reload();
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log(xhr.status);
				console.log(thrownError);
			},
		});
	}
}

function validateFixreader() {
	if (tagSet.size > 0 && databarufix == 1) {
		document.getElementById("posex").innerHTML = "Done ..";
		console.log("Pengecekan Data");
		databaru = 0;
		docek = 0;
		$.ajax({
			dataType: "json",
			type: "POST",
			url: base_url + "page/validateHandheld",
			data: {
				data: arrayHandheld,
			},
			success: function (data) {
				// alert(data);
				data.forEach((data) => {
					let hasil = data.value;
					let key = data.key;
					let stat = data.status;
					console.log(hasil);
					var isi = document.getElementById(key);
					isi.innerHTML = key + ". " + hasil;
					var sp = document.createElement("span");
					sp.style.float = "right";
					sp.style.color = "white";
					if (stat == "OK") {
						sp.className = "bg-success px-2";
						var no = document.createTextNode("OK");
					} else {
						sp.className = "bg-danger px-2";
						var no = document.createTextNode("NG");
					}
					var itm = document.getElementById(key);
					sp.appendChild(no);
					itm.appendChild(sp);
					// x.appendChild(textnode);
				});
				// window.location.reload();
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log(xhr.status);
				console.log(thrownError);
			},
		});
	}
}
