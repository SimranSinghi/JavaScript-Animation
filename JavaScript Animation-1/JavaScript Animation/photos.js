var pause = false;
var message;
var photos = [];


function initialize() {
	message = document.getElementById("message");
	photoIntervals();
}

function resumeAction () {
	pause = !pause;
	pause ? ResumeSuspend() : photoIntervals();
}
//When you click on the court, the animation is suspended, when you click again, the animation resumes
function ResumeSuspend () {
	message.innerHTML += '<br>Animation paused'
	photos.forEach(photo => {
		clearInterval(photo.interval);
	});
}

photoIntervals = function () {

	message.innerHTML += '<br>Start the Animation';
	var id = 1;

	Array.from(document.getElementById("photos").children).forEach(element => {
		//dt to calculate the new x/y coordinates from the current
		const dt = Math.random() * (10 - 1) + 1;
		var photo = {
			vx: Math.random() + 1, 
			vy: Math.random() + 1, 
			id: id,
			htmlElement: element,
			dt: dt,
			interval: null
		}
		//To animate an element, it must be moved by small amounts, many times, in rapid succession
		photo.interval = setInterval(function () { animatePhotos(photo) }, dt);
		photos.unshift(photo);
		id++;
	});
}

function animatePhotos(photo) {

	var photoT = photo.htmlElement.offsetTop + photo.vy;
	var photoB = photoT + photo.htmlElement.height;
	var photoL = photo.htmlElement.offsetLeft + photo.vx;
	var photoR = photoL + photo.htmlElement.width;

	photo.htmlElement.style.top = photoT + 'px';
	photo.htmlElement.style.left = photoL + 'px';

	// check collision with court
	var  court = document.getElementById("court");
	var courtL = court.offsetLeft;
	var courtT = court.offsetTop;
	var courtR = court.offsetLeft + parseInt(court.style.width.slice(0, -2));
	var courtB = court.offsetTop + parseInt(court.style.height.slice(0, -2));

	if (photoB >= courtB || photoT <= courtT) {
		//photo must be bounced
		photo.vy = -photo.vy;
		if (photoB >= courtB) {
			photo.htmlElement.style.top = courtB - photo.htmlElement.height - 1 + 'px';
		}
		else {
			photo.htmlElement.style.top = courtT + 1 + 'px';
		}
	}



	if (courtR <=photoR || photoL <= courtL) {
		//photo must be bounced
		photo.vx = -photo.vx;
		if (photoR >= courtR) {
			photo.htmlElement.style.left = courtR - photo.htmlElement.width - 1 + 'px';
		}
		else {
			photo.htmlElement.style.left = courtL + 1 + 'px';
		}
	}

	// check collision with other photos
	photos.forEach(ph => {
		//get the top coordinate of a regular element using x.getBoundingClientRect()
		var photo1 = ph.htmlElement.getBoundingClientRect();
		var photo2 = photo.htmlElement.getBoundingClientRect();

		if (!(photo1.right < photo2.left || photo2.right < photo1.left || photo2.top > photo1.bottom || photo2.bottom < photo1.top) && ph.id != photo.id) {
		//When two photos touch (their frames intersect), then they bounce by exchanging their vx and their vy
			var t = ph.vx;
			ph.vx = photo.vx;
			photo.vx = t;

			t = ph.vy;
			ph.vy = photo.vy;
			photo.vy = t;

			if (photo2.left < photo1.right && photo2.right > photo1.right) {
				photo.htmlElement.style.left = photo1.right + 2 + 'px';
			}
		}
	});
}
