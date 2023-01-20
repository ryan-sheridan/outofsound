// global variables that may need to be used in more than one place
var csIndex = 0;
var accordionToggled = 0;
var mapInitialized = 0;
var fps = 60;

// a sleep function i had to implement to time things correctly that change css wise.
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// this function simply updates our map in our where.html page to a x, y coordinate
function updateMap(x, y) {
	map.setView([x, y, 18]);
}

// display a alert when the contact submit button is clicked, also change the colour and
// the border at the bottom of the button, then replace the current window with index.html
// ../ means we go back one folder.
function contactClick() {
	button = document.getElementById('contactSubmit');
	button.style.borderBottom = '3px solid #eb7c15';


	alert("submitted! going home!");
	window.location.replace('../index.html')
}

// toggles the visibility of our hidden about section on our index.html page, works if clicked
async function toggleVisibility() {
	var about = document.getElementById('about');
	if(!accordionToggled){
		about.style.display = 'block';

		for(var i=0;i<=450;i++){
			about.style.height = i + "px";
			if (!(i % 3.5)) {
				await sleep(1);
			}
		}
		about.style.opacity = '1';
		accordionToggled = !(accordionToggled);
		return;
	}
	about.style.opacity = '0';
	await sleep(500);
	for(var i=450;i>=0;i--){
		about.style.height = i + "px";
		if (!(i % 3.5)) {
			await sleep(1);
		}
	}
	about.style.display = 'none';
	accordionToggled = !(accordionToggled);
	return;
}

function setQuestionMark(toggled) {
	const questionMark = document.getElementById('questionMark');
	if(toggled){
		questionMark.style.opacity = 1;
		return;
	}
	questionMark.style.opacity = 0;

}

setInterval(function() {
  if(getComputedStyle(document.getElementById('hiddenAbout')).getPropertyValue('--hovered') == 1) {
  	setQuestionMark(1);
  } else {
  	setQuestionMark(0);
  };
}, 1000 / fps);

// find the closest .releaseBlock icon then change the background colour, border
// depending in what state it is in.
function switchIcon(icon) {
	releaseBlockLike(icon.closest(".releaseBlock"));
	if(icon.style.backgroundColor!="rgb(0, 0, 0)"){
		icon.style.backgroundColor = "rgb(0, 0, 0)";
		icon.style.borderTop = "2px solid #1DB954"
	} else {
		icon.style.backgroundColor = "#5f5f5f";
		icon.style.borderTop = "3px solid #5f5f5f"
	}
}

/* this is the main like functionality for the releaseBlock, when you click the heart
the heart changes its background colour but the releaseBlock also changes in height,
with the css translate function, we can add a delay to that keyframe and make it slow
or fast, but if we want a bounce effect i had the idea of implementing some
javascript, basically, there is different points the releaseBlock can move too,
and each of them points are moved to with a delay in between, this delay, depending on how
long or short the delay is, makes it seem like the element is bouncing.

another thing it does is changes the background colour of the releaseBlockContainer to green
but if its green already, it changes it back to grey (symbolicating a liked or unliked)

this was something i wanted to implement in a small amount of time but actually ended up taking 
me alot longer than it did but i found it to interesting to give up so i just kept continuing 
with what i was doing, im sureee there is a better way to replicate this with less code.*/

async function releaseBlockLike(releaseBlock) {
	var liked;
	var releaseBlockContainer = releaseBlock.closest('.releaseBlockContainer');

	if(releaseBlockContainer.style.backgroundColor=="rgb(23, 181, 80)") liked = true;

	if(releaseBlock.style.transition!=="top ease 0.5s"){
		releaseBlock.style.transition="top ease 0.5s";
	}

    releaseBlock.style.top="-65px";

	await sleep(500);

	if(!liked){
		releaseBlockContainer.style.backgroundColor = "#17b550";
	} else {
		releaseBlockContainer.style.backgroundColor = "#333";
	}
	await sleep(300);
	releaseBlock.style.transition = "top ease 0.2s"
	releaseBlock.style.top="-28px";
	await sleep(150);
	releaseBlock.style.top="-42.5px";
	await sleep(100);
	releaseBlock.style.top="-28px";
}

// depending if you are clicked into the comment box or not, the submit button will be clickable/unclickable 
var unfocus = function(e) {
	if (e.target !== comments){
		submit.style.backgroundColor = "#7d7d7d";
		submit.style.pointerEvents = "none";
	}
}

// if the submit button is clicked successfully, check if there is anything inside the box, and if so, 
// display a warning message that lets the user know that they have to enter something inside the box.

// if everything goes to plan, the submit button will change colours and add a little box at the end of 
// the page with the users entered comment,

// i wrote this code a while ago and dont rememeber exactly how it works so i wont explain, but if im 
// ever reading back on these comments a message for myself is to try something different as im sure 
// this way of doing things isnt the way to go.

function submitClicked() {
	if(submit.style.backgroundColor == "#7d7d7d") {
		return; // dont do anything, just dont ...
	}
	// check if submit box has anything in it AND is less than 100 characters
	if(comments.value && comments.value.length <= 100){
		var currentdate = new Date(); 
		var datetime = currentdate.getDate() + "/"
		                + (currentdate.getMonth()+1)  + "/" 
		                + currentdate.getFullYear() + " || "  
		                + currentdate.getHours() + ":"  
		                + currentdate.getMinutes() + ":" 
		                + currentdate.getSeconds();

		var csc = document.getElementById("commentSectionContainer");
		var csdate = document.getElementById("date");

		csc.innerHTML = csc.innerHTML +
		               "<div class='commentSection'><span id='user'>user69420</span>\
		            	<span style='color:#9d9d9d;'>@</span>\
		            	<span id='date'>"+datetime+"</span>\
		            	<br>\
		            	<span id='comment'>"+comments.value+"</span></div>";
		comments.value = null;
		var cs = document.getElementsByClassName("commentSection");
		cs[csIndex].style.display = "block";
		csIndex++;
		// comment should have appeared by this point, now were going to increase the size of mainRelease
		increaseMainRelease();
	} else {
		var specialTag = document.getElementById("specialTag");
		specialTag.innerHTML = "<div style='\
									color: red;\
									text-align: center;\
									background-color: #3d3d3d;\
									padding: 5px;\
									width: 100%;\
								'>please enter something in the comment box before submitting.</div>"
	}
}

// i dont even know what this is but it does something.
function commentsClicked(submitElement){
	submitElement.style.backgroundColor = "#1DB954"
	submit.style.pointerEvents = "all";
}

// this function was never finished but i wanted to implement some reactive css depending on what device the 
// user is viewing on, this would require alot of extra work so i never included it.
function onbodyload(){
	var longDevice = false;
	const mainPage = document.getElementById("mainPage");
	const submit = document.getElementById("submit");
	const comments = document.getElementById("comments");//
	if(submit && comments){
		submit.style.width = comments.clientWidth.toString()+"px";
		submit.style.display = "block";//
		submit.addEventListener('focus', function() {
			submitClicked();
		});
		comments.addEventListener('focus', function() {
			document.addEventListener('click', unfocus, false);
			commentsClicked(submit);
		});
	}
	if(screen.height>screen.width){
		longDevice = true;
	}
	if(longDevice){
		var navbar = document.getElementById("navbar");
		navbar.innerHTML = "<ul><li><a class='btn'><i class='fa fa-bars'></i></a></li></ul>";
		mainPage.style.width = "95%";
	}
}