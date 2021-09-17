var homeV = 0;
var secondV = 0;

function hpcenter() {
    var w = document.getElementById("hugeplayers").offsetWidth;
    var windowWidth = window.innerWidth;
    var v = (windowWidth / 2) - (w / 2) + "px";
    document.getElementById("hugeplayers").style.marginLeft = v;
}

function ftcenter() {
    if (location.hash == "" || location.hash == "#home" || location.hash === "#index") {
        var w = document.getElementById("footer").offsetWidth;
        var windowWidth = window.innerWidth;
        var v = (windowWidth / 2) - (w / 2) + "px";
        document.getElementById("footer").style.marginLeft = v;
    }
}

function loadPage(page) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("container").style.opacity = "0";
            var y = this.responseText;
            setTimeout(function() {
                document.getElementById("container").innerHTML = y;
                document.getElementById("container").style.opacity = "1";
                ftcenter();
				vidHeight();
            }, 400);
        }
        if (this.status == 404) {
            location.hash = "";
        }
    };
    xhr.open("GET", page + ".html", true);
    xhr.send();
}

function toPage(page) {
    location.hash = page;
}

function pageSelect() {
    var url = window.location.href;
    var urlSplit = url.split("#");
    var currentPage = urlSplit[1];
    if (location.hash === "" || location.hash === "#home" || location.hash === "#index") {
        loadPage("home");
        document.getElementById('videotwo').style.opacity = "0";
    } else {
        loadPage(currentPage);
    }
}

function videoSelect() {
	console.log("selecting video");
	var vidS = location.hash.split("#")[1];
	if (location.hash === "" || location.hash === "#home" || location.hash === "#index") { 
		var video = document.getElementById('videothing');
		var source = "<source src='video/bg9.mp4'></source>";
		video.innerHTML=source;
		if (homeV===0) {
			homeV = 1;
			video.oncanplaythrough = function () {
				if (location.hash === "" || location.hash === "#home" || location.hash === "#index") { 
					document.getElementById('videothing').style.opacity = "1";
					document.getElementById('videotwo').style.opacity = "0";
				}
			} ;
		} else {
			document.getElementById('videothing').style.opacity = "1";
			document.getElementById('videotwo').style.opacity = "0";
			}
    } else {
		var vid = document.getElementById('videotwo');
		vid.pause();
		var sourcetwo = "<source src='video/"+vidS+".mp4'></source>";
		vid.load();
		vid.play();
		vid.innerHTML=sourcetwo;
		if (secondV!=location.hash) {
			secondV = location.hash;
			console.log(secondV);
			vid.oncanplaythrough = function () {
				if (location.hash === "" || location.hash === "#home" || location.hash === "#index") { 
				} else {
					document.getElementById('videotwo').style.opacity = "1";
				}
				};
		} else {
			document.getElementById('videotwo').style.opacity = "1";
		}
    }
}

function vidHeight(){
	if (location.hash == "" || location.hash == "#home" || location.hash === "#index") {
	} else if (location.hash == "#dhevin" || location.hash == "#treelo") {
		var pageVideo = document.getElementsByClassName("pagevideo");
		for (i = 0; i < pageVideo.length; i++) {
			var w = pageVideo[i].offsetWidth;
			var h = (w/16)*9;
			pageVideo[i].height=h;
		}	
	}
}

function execInit() {
    pageSelect();
    hpcenter();
    videoSelect();
}

function execRes() {
    ftcenter();
    hpcenter();
	vidHeight();
}

window.onhashchange = execInit;
window.onload = execInit;
window.onresize = execRes;