function radioPage() {
	window.myId = "radioPage"
	main();

	if ($(window).width() > 700){
		showStats();
	}

	getOutput('counter.php'     , 'output'      , ''                     , 1);
	getOutput('unique.php'      , 'ucount'      , ''                     , 1);
	getOutput('longest.php'     , 'onetruefig'  , ''                     , 1);
	getOutput('time.php'        , 'outtime'     , 'mode=1&currenttime=0' , 2);
	getOutput('radiothread.php' , 'radiothread' , ''                     , 1);

	loopstarter(
		true, //reloadLoop_do
		true,  //tildeLoop_do
		true,  //timeLog_do
		true,  //timeShow_do
		true,  //stylechanger_do
		true, //pauseChecker_do
		'' //prefix
	);
}
function peoplePage() {
	window.myId = "peoplePage";
	main();
	loopstarter(false,false,false,false,true,true,'../');
}
function mapPage() {
	window.myId = "manPage";
	main();
	loopstarter(false,false,false,false,true,true,'../');
}
function playerPage() {
	window.myId = "playerPage";
	main();
	sstyle = getCookie("style");
	setStyle(sstyle, '');
	loopstarter(false,false,false,false,true,true,'');
}
function streamPage() {
	window.myId = "streamPage";
	//main();
	sstyle = getCookie("style");
	setStyle(sstyle, '');
	loopstarter(false,false,false,false,true,false,'');
}
function main(){
	console.log("initilized");

	window.currentstyle = "futaba";
	var seconds = new Date();
	window.startTime = seconds.getTime() / 1000;
	
	checkCookie();
	sstyle = getCookie("style");
	document.getElementById("styleSelector").value = sstyle;

	window.isMuted = true;
	window.ircShown = false;
	window.ircLaunched = false;

	playpause();
	document.getElementById('audio_stream_element').play();
	localStorage.pause = true;
	localStorage.pauserId = window.myId;

	$("#slide").on("change mousemove", function() {
		document.getElementById('audio_stream_element').volume = this.value;
	});
}
function loopstarter(reloadLoop_do=true,tildeLoop_do=true,timeLog_do=true,timeShow_do=true,stylechanger_do=true,pauseChecker_do=true,prefix) {
	if (reloadLoop_do){
		//this loop makes sure that the stats are updated every second
		reloadLoop();
		console.log("reload  loop initialized");
	}
	if (tildeLoop_do){
		//this loop makes a tilde animation
		tildeLoop(1, 4, "");
		console.log("tildeloop  loop initialized");
	}
	if (timeLog_do){
		//this loop keeps track of the time that has been spent on the page
		timeLog();
		console.log("timelog  loop initialized");
	}
	if (timeShow_do){
		timeShow();
		console.log("timeshow  loop initialized");
	}
	if (stylechanger_do){
		stylechanger(prefix);
		console.log("stylechanger loop initialized")
	}
	if (pauseChecker_do){
		pauseChecker();
		console.log("pauseChecker loop initialized")
	}
}
function disclaimer(){
	alerts=[
		"Warning: this site uses cookies, by using this le site your agreeing to be analy probed by a jewush banker",
		"Warning: Using this site submits your personal information to a government database where it will be held until the dawn of the coming purge.",
		"Warning: This site monitored by ILLuminati lizard's. Every moment on this site fuels their hunger, and lust for power.",
		"Nice Radio is funded through the proud sponsorship of the Drug and Human Trafficking Organization of America."
	];
	alert(alerts[Math.floor(Math.random() * alerts.length)]);
}
function pad(num, size){
	//Taken from stackoverflow.com
	//Pads with zeros from the left
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}
function timeResolve(time){
	time = time * 1000
	//converts a time in seconds to clock format eg. (07:30:00)
	hours = Math.floor( time / 3600000 );
	minutes = Math.floor( ( time - ( hours * 3600000 ) ) / 60000 );
	seconds = Math.floor( ( time - ( ( minutes * 60000 ) + ( hours * 3600000 ) ) ) / 1000);               //adjust to change how many digits 
	milliseconds = Math.floor( ( time - ( (minutes * 60000 ) + ( hours * 3600000 ) + (seconds * 1000) ) ) / 1 );//of milliseconds are showing, dont for get to change pad setting |
	return pad(hours.toString(), 2) + ":" + pad(minutes.toString(), 2) + ":" + pad(seconds.toString(), 2); //+ ":" + pad(milliseconds.toString(), 3); // <---------------------------+
}
function reloadLoop() {
	setTimeout(function () {
		reloadStats();
		reloadLoop();
	}, 1000);
}
function pauseChecker(){
	setTimeout(function () {
		if (localStorage.pause == "true" && localStorage.pauserId != window.myId){
			document.getElementById('audio_stream_element').muted = true;
			document.getElementById('controls').innerHTML = "Muted :^)";
			window.isMuted = true;
			localStorage.pause = false;
		}
		pauseChecker()
	}, 100);
}
function timeLog() {
	setTimeout(function () {
		if (!isNaN(parseInt(window.phpOut, 10))){
			var seconds = new Date().getTime() / 1000;
			sessionTime = seconds - window.startTime;
			totalTime = parseInt(window.phpOut, 10) + sessionTime;
			getOutput('time.php', 'blank', 'mode=2&currenttime=' + totalTime, 1);
			timeLog();
		}
	}, 2000);
}
function stylechanger(prefix) {
	setTimeout(function () {
		var newstyle = document.getElementById("styleSelector").value;
		if (window.currentstyle != newstyle){
			console.log("change style to " + newstyle);
			window.currentstyle=newstyle;
			setStyle(newstyle, prefix);
			setCookie("style", newstyle, 365);
		}
		stylechanger(prefix);
	}, 100);
}
function setStyle(newstyle, prefix){
	if (newstyle == "blue"){
		addcss("yotsubab", prefix);
		document.getElementById("mainlogo").src = prefix + "img/nr.png";
	}else if (newstyle == "red"){
		addcss("futaba", prefix);
		document.getElementById("mainlogo").src = prefix + "img/nr.png";
	}else if (newstyle == "rusebird"){
		addcss("rusebird", prefix);
		document.getElementById("mainlogo").src = prefix + "img/nr-bird.png";
	}else if (newstyle == "kek"){
		addcss("kek", prefix);
		document.getElementById("mainlogo").src = prefix + "img/nr-kek.png";
	}else if (newstyle == "dark"){
		addcss("dark", prefix);
		document.getElementById("mainlogo").src = prefix + "img/spook_radio.png";
	}else if (newstyle == "obama"){
		addcss("obama", prefix);
		document.getElementById("mainlogo").src = prefix + "img/nr-obama.png";
	}
}
function timeShow() {
	setTimeout(function () {
		if (!isNaN(parseInt(window.phpOut, 10))){
			var seconds = new Date().getTime() / 1000;
			sessionTime = seconds - window.startTime;
			totalTime = parseInt(window.phpOut, 10) + sessionTime;
			timetext = "current session: " + timeResolve(sessionTime) + " | all time: " + timeResolve(totalTime)
			document.getElementById('timetext').innerHTML = timetext;
			document.getElementById('timerank').innerHTML = timeRank(totalTime);
			//console.log(timetext);
			//getOutput('longest.php', 'onetruefig','', 1);
			timeShow();
		}else{
			timeShow();
		}
	}, 250);
}
function timeRank(time){
	if (time < 3600){
		return "fignewton";
	}else if (time < 10800){
		return "namefig";
	}else if (time < 18000){
		return "funposter";
	}else if (time < 36000){
		return "pseudo-philosopher";
	}else if (time < 72000){
		return "oldfig";
	}else if (time < 108000){
		return "ancient fig";
	}else{
		return "original fig";
	}
}
function powerLevel(){
	setTimeout(function () {
		var ct = Date.now();
		//document.getElementById('audio_stream_element').volume = document.getElementById('slide').value;
		adjustVol()
	}, 25);
}
function playSound() {
	document.getElementById('stinger').play();
	localStorage.pause = true;
	localStorage.pauserId = window.myId
}
function tildeLoop(onLoop, tc, toprint) {
	setTimeout(function () {
		if ($(window).width() > 499){
			if (!window.isMuted){
				for (var i = 0; i < onLoop; i++) {
					toprint = toprint + "~";
				};
				onLoop++;
				if (onLoop >= tc){
					onLoop = 1;
				}
			}else if (window.isMuted){
				for (var i = onLoop; i > 1; i--) {
					toprint = toprint + "~";
				};
				onLoop--;
				if (onLoop <= 1){
					onLoop = tc;
				}
			}
		}else{
			toprint = "";
		}
		var lelements = document.getElementsByClassName('tilde');
		for (var i = lelements.length - 1; i >= 0; i--) {
			lelements[i].innerHTML = toprint; 
		};
		if (!window.isMuted){
			tildeLoop(onLoop, tc, "");
		}else{
			tildeLoop(onLoop, tc, "");
		}
	}, 250);
}
function reloadStats() {
	var docHeadObj = document.getElementById("streamStats");
	var dynamicScript = document.createElement("script");
	dynamicScript.type = "text/javascript";
	dynamicScript.src = "https://cp8.shoutcheap.com:2199/system/streaminfo.js";
	docHeadObj.appendChild(dynamicScript);
}
function playpause() {
	if (window.isMuted === true){
		document.getElementById('audio_stream_element').muted = false;
		document.getElementById('controls').innerHTML = "♫Tuned In♫";
		window.isMuted = false;
	}else{
		document.getElementById('audio_stream_element').muted = true;
		document.getElementById('controls').innerHTML = "Muted :^)";
		window.isMuted = true;
	}
}
function showStats() {
	document.getElementById("stats").style.visibility="visible";
	document.getElementById("statsshower").style.visibility="hidden";
}
function hideStats() {
	document.getElementById("stats").style.visibility="hidden";
	document.getElementById("statsshower").style.visibility="visible";
}
function chatButton() {
	if (window.ircShown === true){
		if ($(window).width() > 700){
			showStats();
		}
		document.getElementById('le-irc').style.visibility = "hidden";
		document.getElementById('irc-controls').innerHTML = "embed irc";
		document.getElementById('ircshowhide').style.borderBottomLeftRadius = "4px";
		document.getElementById('ircshowhide').style.borderBottomRightRadius = "4px";
		window.ircShown = false;
	}else{
		if (!window.ircLaunched){
			launchIrc();
			window.ircLaunched=true;
		}
		hideStats();
		document.getElementById('le-irc').style.visibility = "visible";
		document.getElementById('irc-controls').innerHTML = "hide irc";
		document.getElementById('ircshowhide').style.borderBottomLeftRadius = "0px";
		document.getElementById('ircshowhide').style.borderBottomRightRadius = "0px";
		window.ircShown = true;
	}
}
function reloadAudio(){
	console.log("reloading audio")
	document.getElementById('audio_stream_element').pause();
	document.getElementById('audio_stream_element').play();
}
function remove(id) {
    return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}
function addcss(newstyle, prefix) {
	var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = "style";
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = prefix + 'styles/' + newstyle + '.css';
    link.media = 'all';
    head.appendChild(link);
}
function launchIrc() {
	channel = "leradiochat";
	var docHeadObj = document.getElementById("irc");
	var iframe = document.createElement("iframe");
	iframe.width = "80%";
	iframe.height = "300px";
	iframe.scrolling="no";
	iframe.style.visibility = "hidden";
	iframe.id = "le-irc"
	iframe.src="http://widget.mibbit.com/?settings=ca3341d6aa8b873c29053e42b580d0e9&server=irc.mibbit.net%3A%2B6697&channel=%23" + channel;
	docHeadObj.appendChild(iframe);
}
function getDiscordJson(){
	$.getJson("https://discordapp.com/api/guilds/218557375387402240/widget.json")
}
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
	}
	return "";
}
function checkCookie() {
	var cke=getCookie("style");
	if (cke === "") {
		setCookie("style", "red", 365);
	}
}
