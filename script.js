/* 
	on load find if the screen height is greater 
	than width, (this means its a mobile device 
	or similar ratio) then ill do something
	with this special info regarding how
	the site looks.

	find the mainpage and add a releaseBlock to it
	with the releaseBlock(release) function
	repeat this function for the amount of release's
	there is.
*/
var csIndex = 0;


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function switchIcon(icon) {
	releaseBlockLike(icon.closest(".releaseBlock"));
	if(icon.style.backgroundColor!="rgb(192, 192, 192)"){
		icon.style.backgroundColor = "rgb(192, 192, 192)";
	} else {
		icon.style.backgroundColor = "#5f5f5f";
	}
}

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

var unfocus = function(e) {
	if (e.target !== comments){
		submit.style.backgroundColor = "#7d7d7d";
		submit.style.pointerEvents = "none";
	}
}

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

function commentsClicked(submitElement){
	submitElement.style.backgroundColor = "#1DB954"
	submit.style.pointerEvents = "all";
}

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
		});//
		comments.addEventListener('focus', function() {
			document.addEventListener('click', unfocus, false);
			commentsClicked(submit);
		});//
	}
	if(screen.height>screen.width){
		longDevice = true;
	}
	if(longDevice){
		var navbar = document.getElementById("navbar");
		navbar.innerHTML = "<ul><li><a class='btn'><i class='fa fa-bars'></i></a></li></ul>";
		mainPage.style.width = "95%";
	} else {
		console.log("");
	}
	for(var i=0;i<releases.length;i++){
		createReleaseBlock(release);
	}
}