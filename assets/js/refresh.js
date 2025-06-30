/* If you want to refresh the page if there is no activity then you need to figure out how to define activity. 
Let's say we refresh the page every minute unless someone presses a key or moves the mouse. 
This uses jQuery for event binding: */

var time = new Date().getTime();
$(document.body).bind("mousemove keypress", function (e) {
	time = new Date().getTime();
});

function refresh() {
	//14400000 = 2 Jam
	if (new Date().getTime() - time >= 1800000) window.location.reload(true);
	else setTimeout(refresh, 10000);
}

setTimeout(refresh, 10000);
